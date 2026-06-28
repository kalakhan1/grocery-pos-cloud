const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
const DB_PATH = path.join(dataDir, 'pos.db');

let SQL_INSTANCE = null;
let rawDb = null;
let saveTimer = null;
let currentMode = 'local'; // 'local' | 'mongodb' | 'mysql' | 'postgresql'
let cloudConnection = null;

// ========== SAVE HELPERS ==========
function scheduleSave() {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try {
      if (rawDb) {
        const data = rawDb.export();
        fs.writeFileSync(DB_PATH, Buffer.from(data));
      }
    } catch (e) { console.error('Save error:', e); }
  }, 250);
}

function saveNow() {
  if (saveTimer) clearTimeout(saveTimer);
  try {
    if (rawDb) {
      const data = rawDb.export();
      fs.writeFileSync(DB_PATH, Buffer.from(data));
    }
  } catch (e) { console.error('Save error:', e); }
}

// ========== LOCAL SQLITE WRAPPER ==========
function wrapLocalDb() {
  return {
    mode: 'local',
    exec(sql) { rawDb.run(sql); saveNow(); },
    prepare(sql) {
      return {
        run(...params) {
          const flat = params.length === 1 && Array.isArray(params[0]) ? params[0] : params;
          rawDb.run(sql, flat);
          const lastIdRes = rawDb.exec("SELECT last_insert_rowid() as id");
          const lastId = lastIdRes.length ? lastIdRes[0].values[0][0] : 0;
          scheduleSave();
          return { lastInsertRowid: Number(lastId), changes: rawDb.getRowsModified() };
        },
        get(...params) {
          const flat = params.length === 1 && Array.isArray(params[0]) ? params[0] : params;
          const stmt = rawDb.prepare(sql);
          try {
            if (flat.length) stmt.bind(flat);
            if (stmt.step()) return stmt.getAsObject();
            return undefined;
          } finally { stmt.free(); }
        },
        all(...params) {
          const flat = params.length === 1 && Array.isArray(params[0]) ? params[0] : params;
          const stmt = rawDb.prepare(sql);
          const rows = [];
          try {
            if (flat.length) stmt.bind(flat);
            while (stmt.step()) rows.push(stmt.getAsObject());
          } finally { stmt.free(); }
          return rows;
        }
      };
    },
    transaction(fn) {
      return (...args) => {
        rawDb.run("BEGIN TRANSACTION");
        try {
          const result = fn(...args);
          rawDb.run("COMMIT");
          saveNow();
          return result;
        } catch (e) {
          try { rawDb.run("ROLLBACK"); } catch (err) {}
          throw e;
        }
      };
    }
  };
}

// ========== MYSQL WRAPPER ==========
function wrapMySQL(pool) {
  return {
    mode: 'mysql',
    exec: async (sql) => { await pool.query(sql); },
    prepare(sql) {
      return {
        run: async (...params) => {
          const [result] = await pool.query(sql, params);
          return { lastInsertRowid: result.insertId || 0, changes: result.affectedRows || 0 };
        },
        get: async (...params) => {
          const [rows] = await pool.query(sql, params);
          return rows[0] || undefined;
        },
        all: async (...params) => {
          const [rows] = await pool.query(sql, params);
          return rows;
        }
      };
    },
    transaction(fn) {
      return async (...args) => {
        const conn = await pool.getConnection();
        try {
          await conn.beginTransaction();
          const result = await fn(...args);
          await conn.commit();
          return result;
        } catch (e) {
          await conn.rollback();
          throw e;
        } finally {
          conn.release();
        }
      };
    }
  };
}

// ========== POSTGRESQL WRAPPER ==========
function wrapPostgres(pool) {
  return {
    mode: 'postgresql',
    exec: async (sql) => { await pool.query(sql); },
    prepare(sql) {
      let idx = 0;
      const pgSql = sql.replace(/\?/g, () => `$${++idx}`);
      return {
        run: async (...params) => {
          const result = await pool.query(pgSql, params);
          const lastId = result.rows[0]?.id || result.rowCount || 0;
          return { lastInsertRowid: lastId, changes: result.rowCount || 0 };
        },
        get: async (...params) => {
          const result = await pool.query(pgSql, params);
          return result.rows[0] || undefined;
        },
        all: async (...params) => {
          const result = await pool.query(pgSql, params);
          return result.rows;
        }
      };
    },
    transaction(fn) {
      return async (...args) => {
        const client = await pool.connect();
        try {
          await client.query('BEGIN');
          const result = await fn(...args);
          await client.query('COMMIT');
          return result;
        } catch (e) {
          await client.query('ROLLBACK');
          throw e;
        } finally {
          client.release();
        }
      };
    }
  };
}

// ========== MONGODB WRAPPER ==========
function wrapMongo(client, mongoDb) {
  return {
    mode: 'mongodb',
    exec: async () => {
      const cols = ['settings', 'vendors', 'categories', 'products', 'sales', 'sale_items'];
      for (const c of cols) {
        try { await mongoDb.createCollection(c); } catch (e) {}
      }
    },
    prepare(sql) {
      const sqlLower = sql.toLowerCase().trim();
      return {
        run: async (...params) => {
          // INSERT operations
          if (sqlLower.startsWith('insert')) {
            let collection, doc;
            if (sqlLower.includes('settings')) {
              collection = 'settings';
              doc = { key: params[0], value: params[1] };
              await mongoDb.collection(collection).updateOne({ key: params[0] }, { $set: doc }, { upsert: true });
              return { lastInsertRowid: 0, changes: 1 };
            }
            if (sqlLower.includes('vendors')) {
              collection = 'vendors';
              doc = { name: params[0], contact: params[1], email: params[2], address: params[3], created_at: new Date().toISOString() };
            } else if (sqlLower.includes('categories')) {
              collection = 'categories';
              doc = { name: params[0] };
            } else if (sqlLower.includes('products') && !sqlLower.includes('sale')) {
              collection = 'products';
              doc = {
                barcode: params[0], name: params[1], category_id: params[2], vendor_id: params[3],
                cost_price: params[4], selling_price: params[5], stock: params[6], unit: params[7],
                low_stock_threshold: params[8], created_at: new Date().toISOString()
              };
            } else if (sqlLower.includes('sales') && !sqlLower.includes('sale_items')) {
              collection = 'sales';
              doc = {
                invoice_no: params[0], total: params[1], discount: params[2], tax: params[3],
                grand_total: params[4], payment_method: params[5], amount_paid: params[6],
                change_amount: params[7], created_at: new Date().toISOString()
              };
            } else if (sqlLower.includes('sale_items')) {
              collection = 'sale_items';
              doc = {
                sale_id: params[0], product_id: params[1], product_name: params[2],
                quantity: params[3], price: params[4], total: params[5]
              };
            }
            if (collection && doc) {
              const result = await mongoDb.collection(collection).insertOne(doc);
              return { lastInsertRowid: result.insertedId.toString(), changes: 1 };
            }
          }
          // UPDATE operations
          else if (sqlLower.startsWith('update')) {
            let collection = null, filter = {}, update = {};
            if (sqlLower.includes('settings')) {
              collection = 'settings';
              const whereMatch = sql.match(/where\s+(\w+)\s*=\s*\?/i);
              if (whereMatch) filter[whereMatch[1]] = params[params.length - 1];
              const setMatch = sql.match(/set\s+([\s\S]+?)\s+where/i);
              if (setMatch) {
                const sets = setMatch[1].split(',').map(s => s.trim().split('=')[0].trim());
                sets.forEach((key, i) => update[key] = params[i]);
              }
            } else if (sqlLower.includes('vendors')) {
              collection = 'vendors';
              filter = { _id: params[params.length - 1] };
              update = { name: params[0], contact: params[1], email: params[2], address: params[3] };
            } else if (sqlLower.includes('products') && !sqlLower.includes('sale')) {
              collection = 'products';
              filter = { _id: params[params.length - 1] };
              update = {
                barcode: params[0], name: params[1], category_id: params[2], vendor_id: params[3],
                cost_price: params[4], selling_price: params[5], stock: params[6], unit: params[7],
                low_stock_threshold: params[8]
              };
            } else if (sqlLower.includes('sales') && !sqlLower.includes('sale_items')) {
              collection = 'sales';
              filter = { _id: params[params.length - 1] };
              update = {
                total: params[0], discount: params[1], tax: params[2], grand_total: params[3],
                payment_method: params[4], amount_paid: params[5], change_amount: params[6]
              };
            }
            if (collection) {
              const result = await mongoDb.collection(collection).updateOne(filter, { $set: update });
              return { lastInsertRowid: 0, changes: result.modifiedCount };
            }
          }
          // DELETE operations
          else if (sqlLower.startsWith('delete')) {
            let collection = null, filter = {};
            if (sqlLower.includes('vendors')) {
              collection = 'vendors';
              filter = { _id: params[0] };
            } else if (sqlLower.includes('categories')) {
              collection = 'categories';
              filter = { _id: params[0] };
            } else if (sqlLower.includes('products') && !sqlLower.includes('sale')) {
              collection = 'products';
              filter = { _id: params[0] };
            } else if (sqlLower.includes('sale_items')) {
              collection = 'sale_items';
              filter = { sale_id: params[0] };
            } else if (sqlLower.includes('sales')) {
              collection = 'sales';
              filter = { _id: params[0] };
            }
            if (collection) {
              const result = await mongoDb.collection(collection).deleteMany(filter);
              return { lastInsertRowid: 0, changes: result.deletedCount };
            }
          }
          return { lastInsertRowid: 0, changes: 0 };
        },
        get: async (...params) => {
          const sqlLower = sql.toLowerCase();
          if (sqlLower.includes('from settings')) {
            if (params.length > 0) return await mongoDb.collection('settings').findOne({ key: params[0] });
            return await mongoDb.collection('settings').findOne({});
          }
          if (sqlLower.includes('from vendors') && sqlLower.includes('where')) {
            return await mongoDb.collection('vendors').findOne({ _id: params[0] });
          }
          if (sqlLower.includes('from products')) {
            if (sqlLower.includes('barcode')) return await mongoDb.collection('products').findOne({ barcode: params[0] });
            if (sqlLower.includes('where id')) return await mongoDb.collection('products').findOne({ _id: params[0] });
          }
          if (sqlLower.includes('from sales') && sqlLower.includes('where')) {
            return await mongoDb.collection('sales').findOne({ _id: params[0] });
          }
          return undefined;
        },
        all: async (...params) => {
          const sqlLower = sql.toLowerCase();
          let collection = null, filter = {}, options = {};
          
          if (sqlLower.includes('from settings')) collection = 'settings';
          else if (sqlLower.includes('from vendors')) collection = 'vendors';
          else if (sqlLower.includes('from categories')) collection = 'categories';
          else if (sqlLower.includes('from products') && !sqlLower.includes('sale_items')) collection = 'products';
          else if (sqlLower.includes('from sales') && !sqlLower.includes('sale_items')) collection = 'sales';
          else if (sqlLower.includes('from sale_items')) collection = 'sale_items';
          
          if (!collection) return [];
          
          // Handle WHERE clauses
          if (sqlLower.includes('where')) {
            if (sqlLower.includes('sale_id = ?')) filter.sale_id = params[0];
            if (sqlLower.includes('barcode = ?')) filter.barcode = params[0];
            if (sqlLower.includes('stock <=')) {
              const threshold = params[0];
              const all = await mongoDb.collection(collection).find({}).toArray();
              return all.filter(p => p.stock <= (p.low_stock_threshold || threshold));
            }
            if (sqlLower.includes('date(created_at)')) {
              // Date filtering - simplified
              const all = await mongoDb.collection(collection).find({}).toArray();
              return all;
            }
          }
          
          // Handle LIMIT
          const limitMatch = sql.match(/limit\s+(\d+)/i);
          if (limitMatch) options.limit = parseInt(limitMatch[1]);
          
          // Handle ORDER BY
          const orderMatch = sql.match(/order by\s+([\w.]+)\s*(asc|desc)?/i);
          if (orderMatch) {
            const field = orderMatch[1].includes('.') ? orderMatch[1].split('.')[1] : orderMatch[1];
            options.sort = { [field]: orderMatch[2]?.toLowerCase() === 'desc' ? -1 : 1 };
          }
          
          return await mongoDb.collection(collection).find(filter, options).toArray();
        }
      };
    },
    transaction(fn) {
      return async (...args) => {
        const session = client.startSession();
        try {
          let result;
          await session.withTransaction(async () => {
            result = await fn(...args);
          });
          return result;
        } finally {
          await session.endSession();
        }
      };
    }
  };
}

// ========== CONNECTION TEST ==========
async function testConnection(mode, credentials) {
  try {
    if (mode === 'mongodb') {
      const { MongoClient } = require('mongodb');
      const uri = credentials.uri || `mongodb://${credentials.username}:${credentials.password}@${credentials.host}:${credentials.port || 27017}/${credentials.database}`;
      const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
      await client.connect();
      await client.db(credentials.database).command({ ping: 1 });
      await client.close();
      return { success: true, message: 'MongoDB connected successfully' };
    }
    if (mode === 'mysql') {
      const mysql = require('mysql2/promise');
      const conn = await mysql.createConnection({
        host: credentials.host,
        port: credentials.port || 3306,
        user: credentials.username,
        password: credentials.password,
        database: credentials.database,
        connectTimeout: 5000
      });
      await conn.ping();
      await conn.end();
      return { success: true, message: 'MySQL connected successfully' };
    }
    if (mode === 'postgresql') {
      const { Pool } = require('pg');
      const pool = new Pool({
        host: credentials.host,
        port: credentials.port || 5432,
        user: credentials.username,
        password: credentials.password,
        database: credentials.database,
        connectionTimeoutMillis: 5000
      });
      const client = await pool.connect();
      client.release();
      await pool.end();
      return { success: true, message: 'PostgreSQL connected successfully' };
    }
    return { success: false, message: 'Invalid mode' };
  } catch (e) {
    return { success: false, message: e.message };
  }
}

// ========== CONNECT TO CLOUD DB ==========
async function connectCloud(mode, credentials) {
  try {
    if (mode === 'mongodb') {
      const { MongoClient } = require('mongodb');
      const uri = credentials.uri || `mongodb://${credentials.username}:${credentials.password}@${credentials.host}:${credentials.port || 27017}/${credentials.database}`;
      const client = new MongoClient(uri);
      await client.connect();
      const mongoDb = client.db(credentials.database);
      cloudConnection = { client, mode };
      currentMode = mode;
      return wrapMongo(client, mongoDb);
    }
    if (mode === 'mysql') {
      const mysql = require('mysql2/promise');
      const pool = mysql.createPool({
        host: credentials.host,
        port: credentials.port || 3306,
        user: credentials.username,
        password: credentials.password,
        database: credentials.database,
        waitForConnections: true,
        connectionLimit: 10
      });
      // Test
      const conn = await pool.getConnection();
      conn.release();
      cloudConnection = { pool, mode };
      currentMode = mode;
      return wrapMySQL(pool);
    }
    if (mode === 'postgresql') {
      const { Pool } = require('pg');
      const pool = new Pool({
        host: credentials.host,
        port: credentials.port || 5432,
        user: credentials.username,
        password: credentials.password,
        database: credentials.database,
        max: 10
      });
      const client = await pool.connect();
      client.release();
      cloudConnection = { pool, mode };
      currentMode = mode;
      return wrapPostgres(pool);
    }
    throw new Error('Invalid mode');
  } catch (e) {
    throw e;
  }
}

// ========== DISCONNECT ==========
async function disconnectCloud() {
  if (cloudConnection) {
    try {
      if (cloudConnection.mode === 'mongodb') {
        await cloudConnection.client.close();
      } else if (cloudConnection.mode === 'mysql') {
        await cloudConnection.pool.end();
      } else if (cloudConnection.mode === 'postgresql') {
        await cloudConnection.pool.end();
      }
    } catch (e) {}
    cloudConnection = null;
  }
  currentMode = 'local';
}

// ========== INIT LOCAL DB ==========
async function initDatabase() {
  SQL_INSTANCE = await initSqlJs();

  if (fs.existsSync(DB_PATH)) {
    try {
      const buffer = fs.readFileSync(DB_PATH);
      rawDb = new SQL_INSTANCE.Database(buffer);
    } catch (e) {
      console.warn('⚠️  Corrupt DB, creating new one');
      rawDb = new SQL_INSTANCE.Database();
    }
  } else {
    rawDb = new SQL_INSTANCE.Database();
  }

  rawDb.run("PRAGMA foreign_keys = ON");
  const db = wrapLocalDb();

  // Schema
  db.exec(`
    CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT);
    CREATE TABLE IF NOT EXISTS vendors (
      id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL,
      contact TEXT, email TEXT, address TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL UNIQUE
    );
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT, barcode TEXT UNIQUE, name TEXT NOT NULL,
      category_id INTEGER, vendor_id INTEGER, cost_price REAL DEFAULT 0,
      selling_price REAL NOT NULL, stock INTEGER DEFAULT 0,
      low_stock_threshold INTEGER DEFAULT 10, unit TEXT DEFAULT 'pcs',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS sales (
      id INTEGER PRIMARY KEY AUTOINCREMENT, invoice_no TEXT UNIQUE,
      total REAL, discount REAL DEFAULT 0, tax REAL DEFAULT 0,
      grand_total REAL, payment_method TEXT DEFAULT 'cash',
      amount_paid REAL, change_amount REAL DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS sale_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT, sale_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL, product_name TEXT,
      quantity INTEGER, price REAL, total REAL
    );
  `);

  // Default settings
  const defaults = {
    store_name: 'GROCERY POS',
    store_address: '123 Market Street, City',
    store_phone: '555-0100',
    currency_symbol: 'RS-',
    theme: 'dark',
    language: 'en',
    admin_password: '',
    receipt_footer: 'Thank you for your purchase!',
    app_footer: 'Powered by Grocery POS v2.0',
    db_mode: 'local',
    db_credentials: '{}'
  };
  const setSetting = db.prepare('INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)');
  for (const [k, v] of Object.entries(defaults)) {
    setSetting.run(k, v);
  }

  // Seed data
  const vendorCount = db.prepare('SELECT COUNT(*) AS c FROM vendors').get().c;
  if (vendorCount === 0) {
    const insV = db.prepare('INSERT INTO vendors (name, contact, email, address) VALUES (?, ?, ?, ?)');
    const tx1 = db.transaction(() => {
      insV.run('Fresh Farms Ltd', '555-0101', 'sales@freshfarms.com', '12 Market St');
      insV.run('Dairy Delight Co', '555-0102', 'info@dairydelight.com', '88 Dairy Ave');
      insV.run('Grain Masters', '555-0103', 'orders@grainmasters.com', '45 Wheat Rd');
      insV.run('Beverage World', '555-0104', 'contact@bevworld.com', '99 Drink Blvd');
    });
    tx1();

    const insC = db.prepare('INSERT OR IGNORE INTO categories (name) VALUES (?)');
    ['Fruits', 'Vegetables', 'Dairy', 'Bakery', 'Beverages', 'Snacks', 'Grains'].forEach(c => insC.run(c));

    const insP = db.prepare(`INSERT INTO products (barcode, name, category_id, vendor_id, cost_price, selling_price, stock, unit) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
    const tx2 = db.transaction(() => {
      insP.run('8901234567890', 'Fresh Apples 1kg', 1, 1, 2.5, 4.0, 50, 'kg');
      insP.run('8901234567891', 'Bananas 1 dozen', 1, 1, 1.8, 3.0, 40, 'dz');
      insP.run('8901234567892', 'Tomatoes 1kg', 2, 1, 1.5, 2.5, 60, 'kg');
      insP.run('8901234567893', 'Onions 1kg', 2, 1, 1.0, 1.8, 80, 'kg');
      insP.run('8901234567894', 'Whole Milk 1L', 3, 2, 1.2, 2.0, 100, 'L');
      insP.run('8901234567895', 'Cheddar Cheese 250g', 3, 2, 3.5, 5.5, 30, 'pcs');
      insP.run('8901234567896', 'White Bread', 4, 3, 1.0, 1.8, 25, 'pcs');
      insP.run('8901234567897', 'Croissants 4pk', 4, 3, 2.5, 4.0, 20, 'pk');
      insP.run('8901234567898', 'Cola 1.5L', 5, 4, 1.2, 2.0, 70, 'btl');
      insP.run('8901234567899', 'Orange Juice 1L', 5, 4, 2.0, 3.5, 45, 'L');
      insP.run('8901234567900', 'Potato Chips 150g', 6, 4, 1.5, 2.5, 55, 'pcs');
      insP.run('8901234567901', 'Basmati Rice 5kg', 7, 3, 8.0, 12.0, 35, 'kg');
      insP.run('8901234567902', 'Whole Wheat Flour 2kg', 7, 3, 2.5, 4.0, 40, 'kg');
      insP.run('8901234567903', 'Yogurt 500g', 3, 2, 1.8, 3.0, 8, 'pcs');
      insP.run('8901234567904', 'Eggs 12pk', 3, 2, 2.5, 4.5, 6, 'pk');
    });
    tx2();
  }

  return db;
}

async function reloadFromFile() {
  if (!SQL_INSTANCE) throw new Error('SQL not initialized');
  if (saveTimer) clearTimeout(saveTimer);
  if (fs.existsSync(DB_PATH)) {
    const buffer = fs.readFileSync(DB_PATH);
    rawDb = new SQL_INSTANCE.Database(buffer);
    rawDb.run("PRAGMA foreign_keys = ON");
    return true;
  }
  return false;
}

module.exports = {
  initDatabase, saveNow, reloadFromFile,
  testConnection, connectCloud, disconnectCloud,
  getCurrentMode: () => currentMode
};