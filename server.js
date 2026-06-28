const express = require('express');
const cors = require('cors');
const path = require('path');
const { initDatabase, saveNow, reloadFromFile, testConnection, connectCloud, disconnectCloud } = require('./db');

let db; // Active database

async function start() {
  db = await initDatabase();
  console.log('✅ Database ready (Local SQLite)');

  const app = express();
  app.use(cors());
  app.use(express.json({ limit: '100mb' }));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use('/data', express.static(path.join(__dirname, 'data')));

  // ========== SETTINGS ==========
  app.get('/api/settings', async (req, res) => {
    try {
      const rows = await db.prepare('SELECT * FROM settings').all();
      const obj = {};
      rows.forEach(r => {
        if (r.key === 'admin_password') {
          obj.has_password = r.value && r.value.length > 0;
        } else if (r.key === 'db_credentials') {
          try { obj.db_credentials = JSON.parse(r.value || '{}'); } catch (e) { obj.db_credentials = {}; }
        } else {
          obj[r.key] = r.value;
        }
      });
      res.json(obj);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post('/api/settings', async (req, res) => {
    try {
      for (const [k, v] of Object.entries(req.body)) {
        const value = k === 'db_credentials' ? JSON.stringify(v) : String(v);
        await db.prepare('INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value').run(k, value);
      }
      res.json({ ok: true });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  // ========== DATABASE CONNECTION ==========
  app.post('/api/database/test', async (req, res) => {
    const { mode, credentials } = req.body;
    const result = await testConnection(mode, credentials);
    res.json(result);
  });

  app.post('/api/database/connect', async (req, res) => {
    const { mode, credentials } = req.body;
    try {
      const newDb = await connectCloud(mode, credentials);
      
      // Initialize schema for cloud DB
      if (mode === 'mysql') {
        await newDb.exec(`
          CREATE TABLE IF NOT EXISTS settings (k VARCHAR(255) PRIMARY KEY, v TEXT);
          CREATE TABLE IF NOT EXISTS vendors (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), contact VARCHAR(255), email VARCHAR(255), address TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP);
          CREATE TABLE IF NOT EXISTS categories (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) UNIQUE);
          CREATE TABLE IF NOT EXISTS products (id INT AUTO_INCREMENT PRIMARY KEY, barcode VARCHAR(255) UNIQUE, name VARCHAR(255), category_id INT, vendor_id INT, cost_price DECIMAL(10,2), selling_price DECIMAL(10,2), stock INT, low_stock_threshold INT DEFAULT 10, unit VARCHAR(50), created_at DATETIME DEFAULT CURRENT_TIMESTAMP);
          CREATE TABLE IF NOT EXISTS sales (id INT AUTO_INCREMENT PRIMARY KEY, invoice_no VARCHAR(255) UNIQUE, total DECIMAL(10,2), discount DECIMAL(10,2) DEFAULT 0, tax DECIMAL(10,2) DEFAULT 0, grand_total DECIMAL(10,2), payment_method VARCHAR(50), amount_paid DECIMAL(10,2), change_amount DECIMAL(10,2) DEFAULT 0, created_at DATETIME DEFAULT CURRENT_TIMESTAMP);
          CREATE TABLE IF NOT EXISTS sale_items (id INT AUTO_INCREMENT PRIMARY KEY, sale_id INT, product_id INT, product_name VARCHAR(255), quantity INT, price DECIMAL(10,2), total DECIMAL(10,2));
        `);
      } else if (mode === 'postgresql') {
        await newDb.exec(`
          CREATE TABLE IF NOT EXISTS settings (key VARCHAR(255) PRIMARY KEY, value TEXT);
          CREATE TABLE IF NOT EXISTS vendors (id SERIAL PRIMARY KEY, name VARCHAR(255), contact VARCHAR(255), email VARCHAR(255), address TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
          CREATE TABLE IF NOT EXISTS categories (id SERIAL PRIMARY KEY, name VARCHAR(255) UNIQUE);
          CREATE TABLE IF NOT EXISTS products (id SERIAL PRIMARY KEY, barcode VARCHAR(255) UNIQUE, name VARCHAR(255), category_id INT, vendor_id INT, cost_price DECIMAL(10,2), selling_price DECIMAL(10,2), stock INT, low_stock_threshold INT DEFAULT 10, unit VARCHAR(50), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
          CREATE TABLE IF NOT EXISTS sales (id SERIAL PRIMARY KEY, invoice_no VARCHAR(255) UNIQUE, total DECIMAL(10,2), discount DECIMAL(10,2) DEFAULT 0, tax DECIMAL(10,2) DEFAULT 0, grand_total DECIMAL(10,2), payment_method VARCHAR(50), amount_paid DECIMAL(10,2), change_amount DECIMAL(10,2) DEFAULT 0, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
          CREATE TABLE IF NOT EXISTS sale_items (id SERIAL PRIMARY KEY, sale_id INT, product_id INT, product_name VARCHAR(255), quantity INT, price DECIMAL(10,2), total DECIMAL(10,2));
        `);
      } else if (mode === 'mongodb') {
        await newDb.exec('');
      }
      
      db = newDb;
      await db.prepare('INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value').run('db_mode', mode);
      await db.prepare('INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value').run('db_credentials', JSON.stringify(credentials));
      
      res.json({ success: true, message: `Connected to ${mode.toUpperCase()}` });
    } catch (e) {
      res.status(500).json({ success: false, message: e.message });
    }
  });

  app.post('/api/database/disconnect', async (req, res) => {
    try {
      await disconnectCloud();
      db = await initDatabase();
      res.json({ success: true, message: 'Switched to local database' });
    } catch (e) {
      res.status(500).json({ success: false, message: e.message });
    }
  });

  // ========== ADMIN ==========
  app.post('/api/admin/verify', async (req, res) => {
    const { password } = req.body;
    const row = await db.prepare("SELECT value FROM settings WHERE key='admin_password'").get();
    const stored = row ? row.value : '';
    if (!stored || stored === '') return res.json({ ok: true, no_password: true });
    if (stored === password) return res.json({ ok: true });
    res.status(401).json({ error: 'Invalid password' });
  });

  app.post('/api/admin/db/upload', (req, res) => {
    try {
      const { data } = req.body;
      if (!data) throw new Error('No data');
      const buffer = Buffer.from(data, 'base64');
      fs.writeFileSync(path.join(__dirname, 'data', 'pos.db'), buffer);
      res.json({ ok: true });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  });

  app.post('/api/admin/db/reload', async (req, res) => {
    try {
      await reloadFromFile();
      res.json({ ok: true });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  // ========== VENDORS ==========
  app.get('/api/vendors', async (req, res) => {
    try { res.json(await db.prepare('SELECT * FROM vendors ORDER BY name').all()); }
    catch (e) { res.status(500).json({ error: e.message }); }
  });
  app.post('/api/vendors', async (req, res) => {
    try {
      const { name, contact, email, address } = req.body;
      const r = await db.prepare('INSERT INTO vendors (name, contact, email, address) VALUES (?, ?, ?, ?)').run(name, contact || '', email || '', address || '');
      res.json({ id: r.lastInsertRowid });
    } catch (e) { res.status(400).json({ error: e.message }); }
  });
  app.put('/api/vendors/:id', async (req, res) => {
    try {
      const { name, contact, email, address } = req.body;
      await db.prepare('UPDATE vendors SET name=?, contact=?, email=?, address=? WHERE id=?').run(name, contact || '', email || '', address || '', req.params.id);
      res.json({ ok: true });
    } catch (e) { res.status(400).json({ error: e.message }); }
  });
  app.delete('/api/vendors/:id', async (req, res) => {
    try {
      await db.prepare('DELETE FROM vendors WHERE id=?').run(req.params.id);
      res.json({ ok: true });
    } catch (e) { res.status(400).json({ error: e.message }); }
  });

  // ========== CATEGORIES ==========
  app.get('/api/categories', async (req, res) => {
    try { res.json(await db.prepare('SELECT * FROM categories ORDER BY name').all()); }
    catch (e) { res.status(500).json({ error: e.message }); }
  });
  app.post('/api/categories', async (req, res) => {
    try {
      const r = await db.prepare('INSERT OR IGNORE INTO categories (name) VALUES (?)').run(req.body.name);
      res.json({ id: r.lastInsertRowid });
    } catch (e) { res.status(400).json({ error: e.message }); }
  });

  // ========== PRODUCTS ==========
  app.get('/api/products', async (req, res) => {
    try {
      const rows = await db.prepare(`
        SELECT p.*, c.name AS category_name, v.name AS vendor_name
        FROM products p
        LEFT JOIN categories c ON c.id = p.category_id
        LEFT JOIN vendors v ON v.id = p.vendor_id
        ORDER BY p.name
      `).all();
      res.json(rows);
    } catch (e) { res.status(500).json({ error: e.message }); }
  });

  app.get('/api/products/low-stock', async (req, res) => {
    try {
      const rows = await db.prepare(`
        SELECT p.*, c.name AS category_name, v.name AS vendor_name, v.contact AS vendor_contact
        FROM products p
        LEFT JOIN categories c ON c.id = p.category_id
        LEFT JOIN vendors v ON v.id = p.vendor_id
        WHERE p.stock <= p.low_stock_threshold
        ORDER BY p.stock ASC
      `).all();
      res.json(rows);
    } catch (e) { res.status(500).json({ error: e.message }); }
  });

  app.get('/api/products/barcode/:code', async (req, res) => {
    try {
      const row = await db.prepare(`
        SELECT p.*, c.name AS category_name, v.name AS vendor_name
        FROM products p
        LEFT JOIN categories c ON c.id = p.category_id
        LEFT JOIN vendors v ON v.id = p.vendor_id
        WHERE p.barcode = ?
      `).get(req.params.code);
      res.json(row || null);
    } catch (e) { res.status(500).json({ error: e.message }); }
  });

  app.post('/api/products', async (req, res) => {
    try {
      const { barcode, name, category_id, vendor_id, cost_price, selling_price, stock, unit, low_stock_threshold } = req.body;
      const r = await db.prepare(`
        INSERT INTO products (barcode, name, category_id, vendor_id, cost_price, selling_price, stock, unit, low_stock_threshold)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        barcode || null, name,
        category_id ? Number(category_id) : null,
        vendor_id ? Number(vendor_id) : null,
        Number(cost_price) || 0, Number(selling_price),
        Number(stock) || 0, unit || 'pcs',
        Number(low_stock_threshold) || 10
      );
      res.json({ id: r.lastInsertRowid });
    } catch (e) { res.status(400).json({ error: e.message }); }
  });

  app.put('/api/products/:id', async (req, res) => {
    try {
      const { barcode, name, category_id, vendor_id, cost_price, selling_price, stock, unit, low_stock_threshold } = req.body;
      await db.prepare(`
        UPDATE products SET barcode=?, name=?, category_id=?, vendor_id=?, cost_price=?, selling_price=?, stock=?, unit=?, low_stock_threshold=?
        WHERE id=?
      `).run(
        barcode || null, name,
        category_id ? Number(category_id) : null,
        vendor_id ? Number(vendor_id) : null,
        Number(cost_price) || 0, Number(selling_price),
        Number(stock) || 0, unit || 'pcs',
        Number(low_stock_threshold) || 10,
        req.params.id
      );
      res.json({ ok: true });
    } catch (e) { res.status(400).json({ error: e.message }); }
  });

  app.delete('/api/products/:id', async (req, res) => {
    try {
      await db.prepare('DELETE FROM products WHERE id=?').run(req.params.id);
      res.json({ ok: true });
    } catch (e) { res.status(400).json({ error: e.message }); }
  });

  // ========== PRODUCTS CSV ==========
  app.get('/api/products/export/csv', async (req, res) => {
    try {
      const rows = await db.prepare(`
        SELECT p.barcode, p.name, c.name AS category, v.name AS vendor,
               p.cost_price, p.selling_price, p.stock, p.unit, p.low_stock_threshold
        FROM products p
        LEFT JOIN categories c ON c.id = p.category_id
        LEFT JOIN vendors v ON v.id = p.vendor_id
      `).all();
      const headers = ['barcode', 'name', 'category', 'vendor', 'cost_price', 'selling_price', 'stock', 'unit', 'low_stock_threshold'];
      let csv = headers.join(',') + '\n';
      rows.forEach(r => {
        csv += headers.map(h => {
          const v = r[h] === null || r[h] === undefined ? '' : String(r[h]);
          return /[,"\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
        }).join(',') + '\n';
      });
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', 'attachment; filename=products_backup.csv');
      res.send('\uFEFF' + csv);
    } catch (e) { res.status(500).json({ error: e.message }); }
  });

  app.post('/api/products/import/csv', async (req, res) => {
    try {
      const { rows } = req.body;
      if (!Array.isArray(rows) || !rows.length) throw new Error('No rows');
      const tx = db.transaction(() => {
        const findCat = db.prepare('SELECT id FROM categories WHERE name=?');
        const findVen = db.prepare('SELECT id FROM vendors WHERE name=?');
        const insCat = db.prepare('INSERT INTO categories (name) VALUES (?)');
        const insVen = db.prepare('INSERT INTO vendors (name, contact, email, address) VALUES (?, ?, ?, ?)');
        const insProd = db.prepare(`INSERT INTO products (barcode, name, category_id, vendor_id, cost_price, selling_price, stock, unit, low_stock_threshold) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`);
        const updProd = db.prepare(`UPDATE products SET name=?, category_id=?, vendor_id=?, cost_price=?, selling_price=?, stock=?, unit=?, low_stock_threshold=? WHERE barcode=?`);

        let imported = 0, updated = 0;
        for (const r of rows) {
          if (!r.name) continue;
          let catId = null;
          if (r.category) {
            const c = findCat.get(r.category);
            if (c) catId = c.id;
            else { const nr = insCat.run(r.category); catId = nr.lastInsertRowid; }
          }
          let venId = null;
          if (r.vendor) {
            const v = findVen.get(r.vendor);
            if (v) venId = v.id;
            else { const nr = insVen.run(r.vendor, '', '', ''); venId = nr.lastInsertRowid; }
          }
          if (r.barcode) {
            const existing = db.prepare('SELECT id FROM products WHERE barcode=?').get(r.barcode);
            if (existing) {
              updProd.run(r.name, catId, venId, Number(r.cost_price) || 0, Number(r.selling_price) || 0, Number(r.stock) || 0, r.unit || 'pcs', Number(r.low_stock_threshold) || 10, r.barcode);
              updated++;
              continue;
            }
          }
          insProd.run(r.barcode || null, r.name, catId, venId, Number(r.cost_price) || 0, Number(r.selling_price) || 0, Number(r.stock) || 0, r.unit || 'pcs', Number(r.low_stock_threshold) || 10);
          imported++;
        }
        return { imported, updated };
      });
      res.json(await tx());
    } catch (e) { res.status(400).json({ error: e.message }); }
  });

  // ========== SALES ==========
  function generateInvoice() {
    const d = new Date();
    const stamp = d.getFullYear().toString().slice(-2) + String(d.getMonth() + 1).padStart(2, '0') + String(d.getDate()).padStart(2, '0');
    return `INV-${stamp}-${Math.floor(Math.random() * 9000 + 1000)}`;
  }

  app.post('/api/sales', async (req, res) => {
    const { items, discount = 0, taxRate = 0, payment_method = 'cash', amount_paid } = req.body;
    if (!items || !items.length) return res.status(400).json({ error: 'No items' });

    try {
      const tx = db.transaction(async () => {
        for (const it of items) {
          const p = await db.prepare('SELECT stock FROM products WHERE id=?').get(it.product_id);
          if (!p || p.stock < it.quantity) throw new Error(`Insufficient stock for product ${it.product_id}`);
        }

        let subtotal = 0;
        for (const it of items) subtotal += it.price * it.quantity;
        const tax = +(subtotal * taxRate / 100).toFixed(2);
        const grand_total = +(subtotal - discount + tax).toFixed(2);
        const change = +(amount_paid - grand_total).toFixed(2);
        const invoice_no = generateInvoice();

        const saleRes = await db.prepare(`INSERT INTO sales (invoice_no, total, discount, tax, grand_total, payment_method, amount_paid, change_amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`).run(invoice_no, subtotal, discount, tax, grand_total, payment_method, amount_paid, change);
        const sale_id = saleRes.lastInsertRowid;

        const insItem = db.prepare(`INSERT INTO sale_items (sale_id, product_id, product_name, quantity, price, total) VALUES (?, ?, ?, ?, ?, ?)`);
        const updStock = db.prepare('UPDATE products SET stock = stock - ? WHERE id = ?');
        for (const it of items) {
          const p = await db.prepare('SELECT name FROM products WHERE id=?').get(it.product_id);
          await insItem.run(sale_id, it.product_id, p.name, it.quantity, it.price, +(it.price * it.quantity).toFixed(2));
          await updStock.run(it.quantity, it.product_id);
        }

        return { id: sale_id, invoice_no, subtotal, discount, tax, grand_total, payment_method, amount_paid, change, items };
      });

      res.json(await tx());
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  });

  app.get('/api/sales', async (req, res) => {
    try {
      const { period, from, to } = req.query;
      let where = '';
      const params = [];
      if (period === 'hour') where = "WHERE s.created_at >= DATETIME('now', '-1 hour')";
      else if (period === 'day') where = "WHERE DATE(s.created_at) = DATE('now')";
      else if (period === 'week') where = "WHERE s.created_at >= DATETIME('now', '-7 days')";
      else if (period === 'month') where = "WHERE strftime('%Y-%m', s.created_at) = strftime('%Y-%m', 'now')";
      else if (period === 'year') where = "WHERE strftime('%Y', s.created_at) = strftime('%Y', 'now')";
      else if (from && to) { where = "WHERE DATE(s.created_at) BETWEEN ? AND ?"; params.push(from, to); }

      const rows = await db.prepare(`
        SELECT s.*, (SELECT COUNT(*) FROM sale_items WHERE sale_id = s.id) AS item_count
        FROM sales s ${where}
        ORDER BY s.created_at DESC LIMIT 500
      `).all(...params);
      res.json(rows);
    } catch (e) { res.status(500).json({ error: e.message }); }
  });

  app.get('/api/sales/:id', async (req, res) => {
    try {
      const sale = await db.prepare('SELECT * FROM sales WHERE id=?').get(req.params.id);
      if (!sale) return res.status(404).json({ error: 'Not found' });
      const items = await db.prepare('SELECT * FROM sale_items WHERE sale_id=?').all(req.params.id);
      res.json({ ...sale, items });
    } catch (e) { res.status(500).json({ error: e.message }); }
  });

  app.put('/api/sales/:id', async (req, res) => {
    const { items, discount = 0, taxRate = 0, payment_method = 'cash', amount_paid } = req.body;
    try {
      const tx = db.transaction(async () => {
        const sale = await db.prepare('SELECT * FROM sales WHERE id=?').get(req.params.id);
        if (!sale) throw new Error('Sale not found');

        const oldItems = await db.prepare('SELECT * FROM sale_items WHERE sale_id=?').all(req.params.id);
        const updStock = db.prepare('UPDATE products SET stock = stock + ? WHERE id = ?');
        for (const oi of oldItems) await updStock.run(oi.quantity, oi.product_id);

        await db.prepare('DELETE FROM sale_items WHERE sale_id=?').run(req.params.id);

        let subtotal = 0;
        for (const it of items) {
          const p = await db.prepare('SELECT stock, name FROM products WHERE id=?').get(it.product_id);
          if (!p || p.stock < it.quantity) throw new Error(`Insufficient stock for ${p?.name || it.product_id}`);
          subtotal += it.price * it.quantity;
        }
        const tax = +(subtotal * taxRate / 100).toFixed(2);
        const grand_total = +(subtotal - discount + tax).toFixed(2);
        const change = +(amount_paid - grand_total).toFixed(2);

        const insItem = db.prepare(`INSERT INTO sale_items (sale_id, product_id, product_name, quantity, price, total) VALUES (?, ?, ?, ?, ?, ?)`);
        const decStock = db.prepare('UPDATE products SET stock = stock - ? WHERE id = ?');
        for (const it of items) {
          const p = await db.prepare('SELECT name FROM products WHERE id=?').get(it.product_id);
          await insItem.run(req.params.id, it.product_id, p.name, it.quantity, it.price, +(it.price * it.quantity).toFixed(2));
          await decStock.run(it.quantity, it.product_id);
        }

        await db.prepare(`UPDATE sales SET total=?, discount=?, tax=?, grand_total=?, payment_method=?, amount_paid=?, change_amount=? WHERE id=?`).run(subtotal, discount, tax, grand_total, payment_method, amount_paid, change, req.params.id);

        return { id: req.params.id, invoice_no: sale.invoice_no, subtotal, discount, tax, grand_total, payment_method, amount_paid, change };
      });
      res.json(await tx());
    } catch (e) { res.status(400).json({ error: e.message }); }
  });

  app.delete('/api/sales/:id', async (req, res) => {
    try {
      const tx = db.transaction(async () => {
        const items = await db.prepare('SELECT * FROM sale_items WHERE sale_id=?').all(req.params.id);
        const updStock = db.prepare('UPDATE products SET stock = stock + ? WHERE id = ?');
        for (const it of items) await updStock.run(it.quantity, it.product_id);
        await db.prepare('DELETE FROM sale_items WHERE sale_id=?').run(req.params.id);
        await db.prepare('DELETE FROM sales WHERE id=?').run(req.params.id);
      });
      await tx();
      res.json({ ok: true });
    } catch (e) { res.status(400).json({ error: e.message }); }
  });

  // ========== SALES CSV ==========
  app.get('/api/sales/export/csv', async (req, res) => {
    try {
      const sales = await db.prepare('SELECT * FROM sales ORDER BY created_at DESC').all();
      const headers = ['invoice_no', 'created_at', 'total', 'discount', 'tax', 'grand_total', 'payment_method', 'amount_paid', 'change_amount', 'items_json'];
      let csv = headers.join(',') + '\n';
      for (const s of sales) {
        const items = await db.prepare('SELECT product_id, product_name, quantity, price, total FROM sale_items WHERE sale_id=?').all(s.id);
        const row = [s.invoice_no, s.created_at, s.total, s.discount, s.tax, s.grand_total, s.payment_method, s.amount_paid, s.change_amount, JSON.stringify(items)];
        csv += row.map(v => {
          const str = String(v ?? '');
          return /[,"\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
        }).join(',') + '\n';
      }
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', 'attachment; filename=sales_backup.csv');
      res.send('\uFEFF' + csv);
    } catch (e) { res.status(500).json({ error: e.message }); }
  });

  app.post('/api/sales/import/csv', async (req, res) => {
    try {
      const { rows } = req.body;
      if (!Array.isArray(rows) || !rows.length) throw new Error('No rows');
      const tx = db.transaction(async () => {
        const insSale = db.prepare(`INSERT INTO sales (invoice_no, total, discount, tax, grand_total, payment_method, amount_paid, change_amount, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`);
        const insItem = db.prepare(`INSERT INTO sale_items (sale_id, product_id, product_name, quantity, price, total) VALUES (?, ?, ?, ?, ?, ?)`);
        let imported = 0;
        for (const r of rows) {
          if (!r.invoice_no) continue;
          const existing = await db.prepare('SELECT id FROM sales WHERE invoice_no=?').get(r.invoice_no);
          if (existing) continue;
          const saleRes = await insSale.run(r.invoice_no, Number(r.total) || 0, Number(r.discount) || 0, Number(r.tax) || 0, Number(r.grand_total) || 0, r.payment_method || 'cash', Number(r.amount_paid) || 0, Number(r.change_amount) || 0, r.created_at || new Date().toISOString());
          const sale_id = saleRes.lastInsertRowid;
          let items = [];
          try { if (r.items_json) items = JSON.parse(r.items_json); } catch (e) {}
          for (const it of items) {
            await insItem.run(sale_id, Number(it.product_id) || null, it.product_name || 'Item', Number(it.quantity) || 1, Number(it.price) || 0, Number(it.total) || 0);
          }
          imported++;
        }
        return { imported };
      });
      res.json(await tx());
    } catch (e) { res.status(400).json({ error: e.message }); }
  });

  // ========== ANALYTICS ==========
  app.get('/api/analytics/dashboard', async (req, res) => {
    try {
      const today = new Date().toISOString().slice(0, 10);
      const todaySales = await db.prepare(`SELECT COALESCE(SUM(grand_total),0) AS total, COUNT(*) AS count FROM sales WHERE DATE(created_at) = ?`).get(today);
      const totalProducts = (await db.prepare('SELECT COUNT(*) AS c FROM products').get()).c;
      const lowStock = (await db.prepare('SELECT COUNT(*) AS c FROM products WHERE stock <= low_stock_threshold').get()).c;
      const totalVendors = (await db.prepare('SELECT COUNT(*) AS c FROM vendors').get()).c;
      const last7 = await db.prepare(`SELECT DATE(created_at) AS day, SUM(grand_total) AS total, COUNT(*) AS count FROM sales WHERE created_at >= DATE('now', '-6 days') GROUP BY DATE(created_at) ORDER BY day`).all();
      const topProducts = await db.prepare(`SELECT p.name, SUM(si.quantity) AS qty, SUM(si.total) AS revenue FROM sale_items si JOIN products p ON p.id = si.product_id GROUP BY si.product_id ORDER BY revenue DESC LIMIT 5`).all();
      const categories = await db.prepare(`SELECT c.name, SUM(si.total) AS revenue FROM sale_items si JOIN products p ON p.id = si.product_id JOIN categories c ON c.id = p.category_id GROUP BY c.id ORDER BY revenue DESC`).all();
      res.json({ todaySales: todaySales.total, todayCount: todaySales.count, totalProducts, lowStock, totalVendors, last7, topProducts, categories });
    } catch (e) { res.status(500).json({ error: e.message }); }
  });

  // ========== SHUTDOWN ==========
  process.on('SIGINT', () => { saveNow(); process.exit(0); });
  process.on('SIGTERM', () => { saveNow(); process.exit(0); });

  app.listen(3000, () => {
    console.log('🛒 Grocery POS v2.0 running at http://localhost:3000');
  });
}

start().catch(err => {
  console.error('❌ Failed to start:', err);
  process.exit(1);
});