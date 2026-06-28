const API = '/api';

const translations = {
  en: {
    brand_sub: 'Smart Retail', nav_pos: 'POS / Sales', nav_dashboard: 'Dashboard', nav_products: 'Products',
    nav_vendors: 'Vendors', nav_sales: 'Sales History', nav_admin: 'Admin', nav_lowstock: 'Low Stock',
    nav_orders: 'Orders', nav_backup: 'Backup', nav_settings: 'Settings',
    pos_title: 'Point of Sale', barcode_ph: '🔍 Scan or type barcode & press Enter',
    search_ph: 'Search products...', current_sale: 'Current Sale',
    subtotal: 'Subtotal', discount: 'Discount', tax: 'Tax', grand_total: 'Grand Total', payment: 'Payment',
    amount_paid: 'Amount Paid', change: 'Change', clear: 'Clear', checkout: 'Checkout',
    dashboard_title: 'Dashboard', today_sales: "Today's Sales", today_orders: "Today's Orders",
    total_products: 'Total Products', low_stock_items: 'Low Stock', vendors: 'Vendors',
    sales_7days: 'Sales - Last 7 Days', top_5_products: 'Top 5 Products', revenue_category: 'Revenue by Category',
    products_title: 'Products', add_product: 'Add Product',
    barcode: 'Barcode', name: 'Name', category: 'Category', vendor: 'Vendor',
    cost: 'Cost', price: 'Price', stock: 'Stock', unit: 'Unit', actions: 'Actions',
    vendors_title: 'Vendors', add_vendor: 'Add Vendor',
    contact: 'Contact', email: 'Email', address: 'Address',
    sales_title: 'Sales History', print_report: 'Print Report', quick_filter: 'Filter:', all: 'All',
    apply: 'Apply', invoice: 'Invoice', date: 'Date', items: 'Items', total: 'Total', grand: 'Grand', action: 'Action',
    lowstock_title: '⚠️ Low Stock', orders_title: '📤 Order List',
    product: 'Product', current_stock: 'Stock', order_qty: 'Order Qty', vendor_contact: 'Contact',
    store_name: 'Store Name', phone: 'Phone',
    out_of_stock: 'Out of stock!', not_enough_stock: 'Not enough stock',
    cart_empty: 'Cart is empty', sale_completed: '✅ Sale completed! Invoice: ',
    confirm_clear: 'Clear cart?', confirm_delete: 'Delete this item?',
    confirm_delete_sale: 'Delete sale? Stock will be restored.',
    enter_qty: 'Enter quantity:', enter_product_id: 'Enter product ID:',
    product_not_found: 'Product not found', name_required: 'Name and price required',
    name_req: 'Name required', no_sales: 'No sales yet', all_stock_ok: '✅ All stock OK',
    no_products: 'No products', no_low_stock: 'No low stock',
    order_list_title: 'PURCHASE ORDER', generated_on: 'Generated on',
    total_items: 'Total Items', total_qty: 'Total Qty',
    sales_report_title: 'SALES REPORT', period: 'Period',
    total_sales: 'Total Sales', total_orders: 'Total Orders',
    import_success: '✅ Import successful!', import_failed: '❌ Import failed: ',
    settings_saved: '✅ Settings saved!', no_items: 'Add at least one item',
    password_mismatch: '❌ Passwords do not match!', invalid_password: '❌ Invalid password!',
    confirm_db_upload: '⚠️ Replace current database?', db_uploaded: '✅ Database uploaded!',
    logout_confirm: 'Logout?', qr_scanning: 'Scanning...', qr_stopped: 'Stopped',
    edit: 'Edit', delete: 'Delete', view: 'View',
    testing_connection: '🔄 Testing...', connection_success: '✅ Connected!',
    connection_failed: '❌ Failed: ', connecting: '🔄 Connecting...',
    connected: '✅ Connected to ', disconnecting: '🔄 Disconnecting...',
    disconnected: '✅ Switched to local.', fill_all_fields: '❌ Fill all fields!'
  },
  ur: {
    brand_sub: 'سمارٹ ریٹیل', nav_pos: 'پوز', nav_dashboard: 'ڈیش بورڈ', nav_products: 'پروڈکٹس',
    nav_vendors: 'وینڈرز', nav_sales: 'سیلز', nav_admin: 'ایڈمن', nav_lowstock: 'کم اسٹاک',
    nav_orders: 'آرڈرز', nav_backup: 'بیک اپ', nav_settings: 'سیٹنگز',
    pos_title: 'پوائنٹ آف سیل', barcode_ph: '🔍 بارکوڈ اسکین',
    search_ph: 'تلاش...', current_sale: 'موجودہ سیل',
    subtotal: 'ذیلی کل', discount: 'ڈسکاؤنٹ', tax: 'ٹیکس', grand_total: 'کل رقم', payment: 'ادائیگی',
    amount_paid: 'ادا رقم', change: 'واپسی', clear: 'صاف', checkout: 'چیک آؤٹ',
    dashboard_title: 'ڈیش بورڈ', today_sales: 'آج کی سیلز', today_orders: 'آج کے آرڈرز',
    total_products: 'کل پروڈکٹس', low_stock_items: 'کم اسٹاک', vendors: 'وینڈرز',
    sales_7days: 'سیلز - 7 دن', top_5_products: 'ٹاپ 5', revenue_category: 'کیٹیگری آمدنی',
    products_title: 'پروڈکٹس', add_product: 'شامل',
    barcode: 'بارکوڈ', name: 'نام', category: 'کیٹیگری', vendor: 'وینڈر',
    cost: 'لاگت', price: 'قیمت', stock: 'اسٹاک', unit: 'یونٹ', actions: 'عمل',
    vendors_title: 'وینڈرز', add_vendor: 'شامل',
    contact: 'رابطہ', email: 'ای میل', address: 'پتہ',
    sales_title: 'سیلز', print_report: 'پرنٹ', quick_filter: 'فلٹر:', all: 'سب',
    apply: 'لاگو', invoice: 'انوائس', date: 'تاریخ', items: 'آئٹمز', total: 'کل', grand: 'کل رقم', action: 'عمل',
    lowstock_title: '⚠️ کم اسٹاک', orders_title: '📤 آرڈر',
    product: 'پروڈکٹ', current_stock: 'اسٹاک', order_qty: 'مقدار', vendor_contact: 'رابطہ',
    store_name: 'اسٹور نام', phone: 'فون',
    out_of_stock: 'ختم!', not_enough_stock: 'کافی نہیں',
    cart_empty: 'کارٹ خالی', sale_completed: '✅ مکمل! ',
    confirm_clear: 'صاف؟', confirm_delete: 'ڈیلیٹ؟',
    confirm_delete_sale: 'ڈیلیٹ؟ اسٹاک بحال',
    enter_qty: 'مقدار:', enter_product_id: 'ID:',
    product_not_found: 'نہیں ملی', name_required: 'نام ضروری',
    name_req: 'نام ضروری', no_sales: 'کوئی نہیں', all_stock_ok: '✅ ٹھیک',
    no_products: 'کوئی نہیں', no_low_stock: 'کوئی نہیں',
    order_list_title: 'آرڈر', generated_on: 'تاریخ',
    total_items: 'کل', total_qty: 'کل مقدار',
    sales_report_title: 'رپورٹ', period: 'مدت',
    total_sales: 'کل سیلز', total_orders: 'کل آرڈرز',
    import_success: '✅ کامیاب!', import_failed: '❌ ناکام: ',
    settings_saved: '✅ محفوظ!', no_items: 'آئٹم شامل',
    password_mismatch: '❌ مماثل نہیں!', invalid_password: '❌ غلط!',
    confirm_db_upload: '⚠️ تبدیل؟', db_uploaded: '✅ ہو گیا!',
    logout_confirm: 'لاگ آؤٹ؟', qr_scanning: 'اسکین...', qr_stopped: 'رکا',
    edit: 'ترمیم', delete: 'ڈیلیٹ', view: 'دیکھیں',
    testing_connection: '🔄 ٹیسٹ...', connection_success: '✅ کامیاب!',
    connection_failed: '❌ ناکام: ', connecting: '🔄 جوڑ رہے...',
    connected: '✅ جوڑا ', disconnecting: '🔄 الگ...',
    disconnected: '✅ لوکل', fill_all_fields: '❌ سب بھریں!'
  }
};

let state = {
  products: [], vendors: [], categories: [], cart: [], charts: {},
  settings: {
    store_name: 'GROCERY POS', store_address: '', store_phone: '',
    currency_symbol: 'RS-', theme: 'dark', language: 'en', has_password: false,
    receipt_footer: 'Thank you for your purchase!',
    app_footer: 'Powered by Grocery POS v2.0',
    db_mode: 'local', db_credentials: {}
  },
  currentSalesFilter: { period: '', from: '', to: '' },
  adminAuthenticated: false,
  posQRScanner: null, adminQRScanner: null
};

const CUR = () => state.settings.currency_symbol || 'RS-';
const money = (n) => CUR() + Number(n || 0).toFixed(2);
const t = (key) => translations[state.settings.language]?.[key] || translations.en[key] || key;

function applyLanguage() {
  const lang = state.settings.language;
  const dir = lang === 'ur' ? 'rtl' : 'ltr';
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', dir);
  document.body.setAttribute('dir', dir);
  document.querySelectorAll('[data-i18n]').forEach(el => el.textContent = t(el.getAttribute('data-i18n')));
  document.querySelectorAll('[data-i18n-ph]').forEach(el => el.setAttribute('placeholder', t(el.getAttribute('data-i18n-ph'))));
  document.querySelectorAll('.cur-label').forEach(el => el.textContent = CUR());
  document.getElementById('langToggle').textContent = lang === 'ur' ? 'اردو' : 'EN';
  document.getElementById('brandName').textContent = state.settings.store_name || 'GroceryPOS';
  document.title = (state.settings.store_name || 'Grocery POS') + ' - POS';
  const footer = document.getElementById('appFooterText');
  if (footer) footer.textContent = state.settings.app_footer || '';
}

function applyTheme() {
  document.body.classList.remove('dark', 'light');
  document.body.classList.add(state.settings.theme || 'dark');
  document.getElementById('themeToggle').textContent = state.settings.theme === 'light' ? '☀️' : '🌙';
}

function updateDbStatus() {
  const el = document.getElementById('dbStatusIndicator');
  if (!el) return;
  const mode = state.settings.db_mode || 'local';
  const names = { local: 'Local DB', mongodb: 'MongoDB', mysql: 'MySQL', postgresql: 'PostgreSQL' };
  el.innerHTML = `<span class="db-dot ${mode}"></span><span>${names[mode] || 'Local DB'}</span>`;
}

document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    item.classList.add('active');
    const view = item.dataset.view;
    document.getElementById('view-' + view).classList.add('active');
    loadView(view);
  });
});

function loadView(view) {
  const map = {
    pos: loadPOS, dashboard: loadDashboard, products: loadProducts,
    vendors: loadVendors, sales: loadSales, admin: loadAdmin,
    lowstock: loadLowStock, orders: loadOrders, settings: loadSettings
  };
  if (map[view]) map[view]();
}

async function api(path, opts = {}) {
  const res = await fetch(API + path, {
    headers: { 'Content-Type': 'application/json' },
    ...opts,
    body: opts.body ? JSON.stringify(opts.body) : undefined
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

async function loadSettingsFromServer() {
  try {
    const s = await api('/settings');
    state.settings = { ...state.settings, ...s };
    applyTheme();
    applyLanguage();
    updateDbStatus();
  } catch (e) { console.error(e); }
}

function loadSettings() {
  document.getElementById('set_store_name').value = state.settings.store_name || '';
  document.getElementById('set_store_address').value = state.settings.store_address || '';
  document.getElementById('set_store_phone').value = state.settings.store_phone || '';
  document.getElementById('set_currency').value = state.settings.currency_symbol || 'RS-';
  document.getElementById('set_theme').value = state.settings.theme || 'dark';
  document.getElementById('set_language').value = state.settings.language || 'en';
  document.getElementById('set_admin_password').value = '';
  document.getElementById('set_admin_password_confirm').value = '';
  document.getElementById('set_receipt_footer').value = state.settings.receipt_footer || '';
  document.getElementById('set_app_footer').value = state.settings.app_footer || '';
  document.getElementById('set_db_mode').value = state.settings.db_mode || 'local';
  const creds = state.settings.db_credentials || {};
  document.getElementById('db_host').value = creds.host || '';
  document.getElementById('db_port').value = creds.port || '';
  document.getElementById('db_username').value = creds.username || '';
  document.getElementById('db_password').value = creds.password || '';
  document.getElementById('db_name').value = creds.database || '';
  document.getElementById('db_uri').value = creds.uri || '';
  toggleDbForm();
  updateDisconnectBtn();
}

function toggleDbForm() {
  const mode = document.getElementById('set_db_mode').value;
  const form = document.getElementById('dbCredentialsForm');
  const mongoUri = document.querySelector('.mongodb-only');
  if (mode === 'local') {
    form.style.display = 'none';
  } else {
    form.style.display = 'block';
    if (mongoUri) mongoUri.style.display = mode === 'mongodb' ? 'block' : 'none';
    const portInput = document.getElementById('db_port');
    portInput.placeholder = mode === 'mongodb' ? '27017' : mode === 'mysql' ? '3306' : '5432';
  }
}

function updateDisconnectBtn() {
  const btn = document.getElementById('btnDisconnectDb');
  if (btn) btn.style.display = (state.settings.db_mode || 'local') !== 'local' ? 'inline-block' : 'none';
}

document.getElementById('set_db_mode').addEventListener('change', toggleDbForm);

document.getElementById('btnSaveSettings').addEventListener('click', async () => {
  const pwd = document.getElementById('set_admin_password').value;
  const pwd2 = document.getElementById('set_admin_password_confirm').value;
  if (pwd !== pwd2) return alert(t('password_mismatch'));

  const newSettings = {
    store_name: document.getElementById('set_store_name').value.trim() || 'GROCERY POS',
    store_address: document.getElementById('set_store_address').value.trim(),
    store_phone: document.getElementById('set_store_phone').value.trim(),
    currency_symbol: document.getElementById('set_currency').value.trim() || 'RS-',
    theme: document.getElementById('set_theme').value,
    language: document.getElementById('set_language').value,
    admin_password: pwd,
    receipt_footer: document.getElementById('set_receipt_footer').value.trim(),
    app_footer: document.getElementById('set_app_footer').value.trim()
  };
  try {
    await api('/settings', { method: 'POST', body: newSettings });
    state.settings = { ...state.settings, ...newSettings };
    state.settings.has_password = pwd && pwd.length > 0;
    applyTheme();
    applyLanguage();
    alert(t('settings_saved'));
  } catch (e) { alert('Error: ' + e.message); }
});

function getDbCreds() {
  return {
    host: document.getElementById('db_host').value.trim(),
    port: document.getElementById('db_port').value.trim(),
    username: document.getElementById('db_username').value.trim(),
    password: document.getElementById('db_password').value,
    database: document.getElementById('db_name').value.trim(),
    uri: document.getElementById('db_uri').value.trim()
  };
}

document.getElementById('btnTestDbConnection').addEventListener('click', async () => {
  const mode = document.getElementById('set_db_mode').value;
  if (mode === 'local') return alert('Local DB always connected!');
  const creds = getDbCreds();
  if (!creds.host || !creds.database) return alert(t('fill_all_fields'));
  const box = document.getElementById('dbConnectionStatus');
  box.className = 'db-status-box show info';
  box.textContent = t('testing_connection');
  try {
    const r = await api('/database/test', { method: 'POST', body: { mode, credentials: creds } });
    box.className = 'db-status-box show ' + (r.success ? 'success' : 'error');
    box.textContent = r.success ? t('connection_success') : t('connection_failed') + r.message;
  } catch (e) {
    box.className = 'db-status-box show error';
    box.textContent = t('connection_failed') + e.message;
  }
});

document.getElementById('btnConnectDb').addEventListener('click', async () => {
  const mode = document.getElementById('set_db_mode').value;
  if (mode === 'local') {
    try {
      await api('/database/disconnect', { method: 'POST' });
      state.settings.db_mode = 'local';
      await api('/settings', { method: 'POST', body: { db_mode: 'local' } });
      updateDbStatus();
      updateDisconnectBtn();
      alert(t('disconnected'));
    } catch (e) { alert('Error: ' + e.message); }
    return;
  }
  const creds = getDbCreds();
  if (!creds.host || !creds.database) return alert(t('fill_all_fields'));
  const box = document.getElementById('dbConnectionStatus');
  box.className = 'db-status-box show info';
  box.textContent = t('connecting');
  try {
    const r = await api('/database/connect', { method: 'POST', body: { mode, credentials: creds } });
    if (r.success) {
      state.settings.db_mode = mode;
      state.settings.db_credentials = creds;
      await api('/settings', { method: 'POST', body: { db_mode: mode, db_credentials: creds } });
      box.className = 'db-status-box show success';
      box.textContent = t('connected') + mode.toUpperCase();
      updateDbStatus();
      updateDisconnectBtn();
    } else {
      box.className = 'db-status-box show error';
      box.textContent = t('connection_failed') + r.message;
    }
  } catch (e) {
    box.className = 'db-status-box show error';
    box.textContent = t('connection_failed') + e.message;
  }
});

document.getElementById('btnDisconnectDb').addEventListener('click', async () => {
  if (!confirm('Switch to local DB?')) return;
  const box = document.getElementById('dbConnectionStatus');
  box.className = 'db-status-box show info';
  box.textContent = t('disconnecting');
  try {
    await api('/database/disconnect', { method: 'POST' });
    state.settings.db_mode = 'local';
    await api('/settings', { method: 'POST', body: { db_mode: 'local' } });
    box.className = 'db-status-box show success';
    box.textContent = t('disconnected');
    updateDbStatus();
    updateDisconnectBtn();
  } catch (e) {
    box.className = 'db-status-box show error';
    box.textContent = 'Error: ' + e.message;
  }
});

document.getElementById('themeToggle').addEventListener('click', async () => {
  state.settings.theme = state.settings.theme === 'dark' ? 'light' : 'dark';
  applyTheme();
  await api('/settings', { method: 'POST', body: { theme: state.settings.theme } });
});

document.getElementById('langToggle').addEventListener('click', async () => {
  state.settings.language = state.settings.language === 'en' ? 'ur' : 'en';
  applyLanguage();
  await api('/settings', { method: 'POST', body: { language: state.settings.language } });
});

// ============ CONTINUED IN PART 2 ============
// Type "continue" to get Part 2 of app.js
// ========== POS ==========
async function loadPOS() {
  const [products, vendors, categories] = await Promise.all([api('/products'), api('/vendors'), api('/categories')]);
  state.products = products; state.vendors = vendors; state.categories = categories;
  renderProductGrid();
}

function renderProductGrid(filter = '') {
  const grid = document.getElementById('productGrid');
  const f = filter.toLowerCase();
  const list = state.products.filter(p => !f || p.name.toLowerCase().includes(f) || (p.barcode && p.barcode.includes(f)));
  grid.innerHTML = list.map(p => `
    <div class="product-card ${p.stock <= 0 ? 'out' : ''}" data-id="${p.id}">
      <div class="pname">${p.name}</div>
      <div class="pprice">${money(p.selling_price)}</div>
      <div class="pstock ${p.stock <= p.low_stock_threshold ? 'low' : ''}">${t('stock')}: ${p.stock} ${p.unit}</div>
    </div>
  `).join('') || `<p style="color:var(--muted);padding:20px;">${t('no_products')}</p>`;
  grid.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => {
      if (card.classList.contains('out')) return alert(t('out_of_stock'));
      addToCart(parseInt(card.dataset.id));
    });
  });
}

document.getElementById('productSearch').addEventListener('input', e => renderProductGrid(e.target.value));

const barcodeInput = document.getElementById('barcodeInput');
barcodeInput.addEventListener('keydown', async e => {
  if (e.key === 'Enter') {
    const code = barcodeInput.value.trim();
    if (!code) return;
    const product = await api('/products/barcode/' + encodeURIComponent(code));
    if (product) { addToCart(product.id); barcodeInput.value = ''; }
    else alert(t('product_not_found') + ': ' + code);
  }
});
document.getElementById('btnFocusBarcode').addEventListener('click', () => barcodeInput.focus());
document.getElementById('btnQRScan').addEventListener('click', openPosQRScanner);

async function openPosQRScanner() {
  document.getElementById('qrScanModal').classList.add('open');
  document.getElementById('pos-qr-status').textContent = t('qr_scanning');
  try {
    state.posQRScanner = new Html5Qrcode("pos-qr-reader");
    await state.posQRScanner.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: { width: 250, height: 250 } },
      async (text) => {
        const product = await api('/products/barcode/' + encodeURIComponent(text));
        if (product) {
          addToCart(product.id);
          document.getElementById('pos-qr-status').textContent = '✅ ' + product.name;
          setTimeout(() => closePosQRScanner(), 800);
        } else {
          document.getElementById('pos-qr-status').textContent = '❌ ' + t('product_not_found');
        }
      }, () => {}
    );
  } catch (e) {
    document.getElementById('pos-qr-status').textContent = '❌ ' + e.message;
  }
}

window.closePosQRScanner = async function() {
  if (state.posQRScanner) { try { await state.posQRScanner.stop(); } catch (e) {} state.posQRScanner = null; }
  document.getElementById('qrScanModal').classList.remove('open');
};

function addToCart(productId) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;
  const existing = state.cart.find(c => c.product_id === productId);
  if (existing) {
    if (existing.quantity + 1 > product.stock) return alert(t('not_enough_stock'));
    existing.quantity++;
  } else {
    state.cart.push({ product_id: product.id, name: product.name, price: product.selling_price, quantity: 1, maxStock: product.stock });
  }
  renderCart();
}

function renderCart() {
  const cart = document.getElementById('cart');
  if (!state.cart.length) {
    cart.innerHTML = `<p style="padding:20px;text-align:center;color:var(--muted);">${t('cart_empty')}</p>`;
  } else {
    cart.innerHTML = state.cart.map((it, i) => `
      <div class="cart-item">
        <div><div class="cname">${it.name}</div><div class="cprice">${money(it.price)} × ${it.quantity}</div></div>
        <input type="number" value="${it.quantity}" min="1" max="${it.maxStock}" data-idx="${i}" class="qty-input" />
        <div class="ctotal">${money(it.price * it.quantity)}</div>
        <button class="cremove" data-idx="${i}">✕</button>
      </div>
    `).join('');
    cart.querySelectorAll('.qty-input').forEach(inp => {
      inp.addEventListener('change', e => {
        const idx = parseInt(e.target.dataset.idx);
        state.cart[idx].quantity = Math.max(1, Math.min(parseInt(e.target.value) || 1, state.cart[idx].maxStock));
        renderCart();
      });
    });
    cart.querySelectorAll('.cremove').forEach(btn => {
      btn.addEventListener('click', e => { state.cart.splice(parseInt(e.target.dataset.idx), 1); renderCart(); });
    });
  }
  updateTotals();
}

function updateTotals() {
  const subtotal = state.cart.reduce((s, it) => s + it.price * it.quantity, 0);
  const discount = parseFloat(document.getElementById('discountInput').value) || 0;
  const taxRate = parseFloat(document.getElementById('taxInput').value) || 0;
  const tax = subtotal * taxRate / 100;
  const grand = subtotal - discount + tax;
  const paid = parseFloat(document.getElementById('amountPaid').value) || 0;
  document.getElementById('sumSubtotal').textContent = money(subtotal);
  document.getElementById('sumTotal').textContent = money(grand);
  document.getElementById('sumChange').textContent = money(paid - grand);
}

['discountInput', 'taxInput', 'amountPaid'].forEach(id => {
  document.getElementById(id).addEventListener('input', updateTotals);
});

document.getElementById('btnClearCart').addEventListener('click', () => {
  if (state.cart.length && !confirm(t('confirm_clear'))) return;
  state.cart = []; renderCart();
});

document.getElementById('btnCheckout').addEventListener('click', async () => {
  if (!state.cart.length) return alert(t('cart_empty'));
  const subtotal = state.cart.reduce((s, it) => s + it.price * it.quantity, 0);
  const discount = parseFloat(document.getElementById('discountInput').value) || 0;
  const taxRate = parseFloat(document.getElementById('taxInput').value) || 0;
  const payment_method = document.getElementById('paymentMethod').value;
  const amount_paid = parseFloat(document.getElementById('amountPaid').value) || 0;
  const grand = subtotal - discount + (subtotal * taxRate / 100);
  if (amount_paid < grand && !confirm(`${t('amount_paid')} < ${t('grand_total')}. Continue?`)) return;
  try {
    const sale = await api('/sales', {
      method: 'POST',
      body: {
        items: state.cart.map(it => ({ product_id: it.product_id, quantity: it.quantity, price: it.price })),
        discount, taxRate, payment_method, amount_paid
      }
    });
    // Reset cart
    state.cart = [];
    document.getElementById('discountInput').value = 0;
    document.getElementById('taxInput').value = 0;
    document.getElementById('amountPaid').value = 0;
    renderCart();
    await loadPOS();
    
    // ✅ NEW: Show sale complete popup instead of alert
    showSaleCompletePopup(sale);
  } catch (e) { alert('Error: ' + e.message); }
});

function printReceipt(sale) {
  const area = document.getElementById('receiptPrintArea');
  const d = new Date();
  const itemsHtml = sale.items.map(it => `
    <tr><td>${it.name || 'Item'}</td><td style="text-align:center">${it.quantity}</td>
    <td style="text-align:right">${money(it.price)}</td><td style="text-align:right">${money(it.price * it.quantity)}</td></tr>
  `).join('');
  const footer = state.settings.receipt_footer || 'Thank you for your purchase!';
  area.className = 'print-area';
  area.innerHTML = `
    <div class="receipt">
      <h2>${state.settings.store_name}</h2>
      <div class="center">${state.settings.store_address}<br>Tel: ${state.settings.store_phone}</div>
      <div class="line"></div>
      <div>${t('invoice')}: <b>${sale.invoice_no}</b></div>
      <div>${t('date')}: ${d.toLocaleString()}</div>
      <div>${t('payment')}: ${sale.payment_method.toUpperCase()}</div>
      <div class="line"></div>
      <table><tr><th style="text-align:left">Item</th><th>Qty</th><th>Price</th><th>Total</th></tr>${itemsHtml}</table>
      <div class="line"></div>
      <table>
        <tr><td>${t('subtotal')}</td><td style="text-align:right">${money(sale.subtotal)}</td></tr>
        <tr><td>${t('discount')}</td><td style="text-align:right">-${money(sale.discount)}</td></tr>
        <tr><td>${t('tax')}</td><td style="text-align:right">${money(sale.tax)}</td></tr>
        <tr class="total-row"><td>${t('grand_total')}</td><td style="text-align:right">${money(sale.grand_total)}</td></tr>
        <tr><td>${t('amount_paid')}</td><td style="text-align:right">${money(sale.amount_paid)}</td></tr>
        <tr><td>${t('change')}</td><td style="text-align:right">${money(sale.change)}</td></tr>
      </table>
      <div class="line"></div>
      <div class="receipt-footer">${footer}</div>
    </div>
  `;
  window.print();
}

// ========== SALE COMPLETE POPUP ==========
let currentSaleForPopup = null;

function showSaleCompletePopup(sale) {
  currentSaleForPopup = sale;
  const body = document.getElementById('saleCompleteBody');
  const d = new Date();
  const footer = state.settings.receipt_footer || 'Thank you for your purchase!';
  
  const itemsHtml = sale.items.map(it => `
    <tr>
      <td>${it.name || 'Item'}</td>
      <td style="text-align:center">${it.quantity}</td>
      <td style="text-align:right">${money(it.price)}</td>
      <td style="text-align:right">${money(it.price * it.quantity)}</td>
    </tr>
  `).join('');

  body.innerHTML = `
    <div style="background:white;color:black;padding:20px;border-radius:8px;font-family:'Courier New',monospace;font-size:12px;">
      <h2 style="text-align:center;font-size:18px;margin-bottom:4px;">${state.settings.store_name}</h2>
      <div style="text-align:center;font-size:11px;margin-bottom:8px;">
        ${state.settings.store_address}<br/>
        Tel: ${state.settings.store_phone}
      </div>
      <div style="border-top:1px dashed #000;margin:8px 0;"></div>
      <div><b>Invoice:</b> ${sale.invoice_no}</div>
      <div><b>Date:</b> ${d.toLocaleString()}</div>
      <div><b>Payment:</b> ${sale.payment_method.toUpperCase()}</div>
      <div style="border-top:1px dashed #000;margin:8px 0;"></div>
      <table style="width:100%;border-collapse:collapse;">
        <tr style="font-weight:bold;"><td>Item</td><td style="text-align:center">Qty</td><td style="text-align:right">Price</td><td style="text-align:right">Total</td></tr>
        ${itemsHtml}
      </table>
      <div style="border-top:1px dashed #000;margin:8px 0;"></div>
      <table style="width:100%;">
        <tr><td>Subtotal</td><td style="text-align:right">${money(sale.subtotal)}</td></tr>
        <tr><td>Discount</td><td style="text-align:right">-${money(sale.discount)}</td></tr>
        <tr><td>Tax</td><td style="text-align:right">${money(sale.tax)}</td></tr>
        <tr style="font-weight:bold;font-size:14px;"><td>TOTAL</td><td style="text-align:right">${money(sale.grand_total)}</td></tr>
        <tr><td>Paid</td><td style="text-align:right">${money(sale.amount_paid)}</td></tr>
        <tr><td>Change</td><td style="text-align:right">${money(sale.change)}</td></tr>
      </table>
      <div style="border-top:1px dashed #000;margin:8px 0;"></div>
      <div style="text-align:center;font-style:italic;margin-top:8px;">${footer}</div>
    </div>
  `;

  document.getElementById('saleCompleteModal').classList.add('open');

  // Button handlers
  document.getElementById('btnReprintReceipt').onclick = () => printReceipt(sale);
  document.getElementById('btnEditSale').onclick = () => {
    closeSalePopup();
    adminEditSale(sale.id);
  };
  document.getElementById('btnDeleteSale').onclick = async () => {
    if (!confirm('Delete this sale? Stock will be restored.')) return;
    try {
      await api('/sales/' + sale.id, { method: 'DELETE' });
      closeSalePopup();
      alert('✅ Sale deleted. Stock restored.');
      await loadPOS();
    } catch (e) { alert('Error: ' + e.message); }
  };
}

window.closeSalePopup = function() {
  document.getElementById('saleCompleteModal').classList.remove('open');
  currentSaleForPopup = null;
};
// ========== DASHBOARD ==========
async function loadDashboard() {
  const data = await api('/analytics/dashboard');
  document.getElementById('stTodaySales').textContent = money(data.todaySales);
  document.getElementById('stTodayCount').textContent = data.todayCount;
  document.getElementById('stProducts').textContent = data.totalProducts;
  document.getElementById('stLowStock').textContent = data.lowStock;
  document.getElementById('stVendors').textContent = data.totalVendors;
  renderChart('chartSales', 'line', {
    labels: data.last7.map(d => d.day.slice(5)),
    datasets: [{ label: t('sales_7days'), data: data.last7.map(d => d.total), borderColor: '#3b82f6', backgroundColor: 'rgba(59,130,246,0.1)', fill: true, tension: 0.3 }]
  });
  renderChart('chartTop', 'bar', {
    labels: data.topProducts.map(p => p.name.length > 15 ? p.name.slice(0, 15) + '…' : p.name),
    datasets: [{ label: t('top_5_products'), data: data.topProducts.map(p => p.revenue), backgroundColor: '#10b981' }]
  });
  renderChart('chartCat', 'doughnut', {
    labels: data.categories.map(c => c.name),
    datasets: [{ data: data.categories.map(c => c.revenue), backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6'] }]
  });
}

function renderChart(id, type, data) {
  if (state.charts[id]) state.charts[id].destroy();
  const ctx = document.getElementById(id);
  const tc = state.settings.theme === 'light' ? '#0f172a' : '#e2e8f0';
  const mc = state.settings.theme === 'light' ? '#64748b' : '#94a3b8';
  const gc = state.settings.theme === 'light' ? '#e2e8f0' : '#334155';
  state.charts[id] = new Chart(ctx, {
    type, data,
    options: {
      responsive: true,
      plugins: { legend: { labels: { color: tc } }, tooltip: { callbacks: { label: (ctx) => ctx.dataset.label + ': ' + money(ctx.parsed.y ?? ctx.parsed) } } },
      scales: type === 'doughnut' ? {} : {
        x: { ticks: { color: mc }, grid: { color: gc } },
        y: { ticks: { color: mc, callback: (v) => CUR() + v }, grid: { color: gc } }
      }
    }
  });
}

// ========== PRODUCTS ==========
async function loadProducts() {
  const [products, vendors, categories] = await Promise.all([api('/products'), api('/vendors'), api('/categories')]);
  state.products = products; state.vendors = vendors; state.categories = categories;
  document.querySelector('#productsTable tbody').innerHTML = products.map(p => `
    <tr>
      <td><code>${p.barcode || '-'}</code></td><td>${p.name}</td>
      <td>${p.category_name || '-'}</td><td>${p.vendor_name || '-'}</td>
      <td>${money(p.cost_price)}</td><td>${money(p.selling_price)}</td>
      <td style="${p.stock <= p.low_stock_threshold ? 'color:var(--warning);font-weight:600' : ''}">${p.stock}</td>
      <td>${p.unit}</td>
      <td>
        <button class="btn btn-sm btn-secondary" onclick="editProduct(${p.id})">${t('edit')}</button>
        <button class="btn btn-sm btn-danger" onclick="deleteProduct(${p.id})">✕</button>
      </td>
    </tr>
  `).join('');
}

document.getElementById('btnNewProduct').addEventListener('click', () => editProduct(null));

window.editProduct = function(id) {
  const p = id ? state.products.find(x => x.id === id) : { barcode: '', name: '', category_id: '', vendor_id: '', cost_price: 0, selling_price: 0, stock: 0, unit: 'pcs', low_stock_threshold: 10 };
  openModal(id ? t('edit') : t('add_product'), `
    <div class="form-row"><label>${t('barcode')}</label><input id="f_barcode" value="${p.barcode || ''}"/></div>
    <div class="form-row"><label>${t('name')} *</label><input id="f_name" value="${p.name || ''}"/></div>
    <div class="form-grid">
      <div class="form-row"><label>${t('category')}</label>
        <select id="f_category"><option value="">--</option>${state.categories.map(c => `<option value="${c.id}" ${p.category_id == c.id ? 'selected' : ''}>${c.name}</option>`).join('')}</select>
      </div>
      <div class="form-row"><label>${t('vendor')}</label>
        <select id="f_vendor"><option value="">--</option>${state.vendors.map(v => `<option value="${v.id}" ${p.vendor_id == v.id ? 'selected' : ''}>${v.name}</option>`).join('')}</select>
      </div>
    </div>
    <div class="form-grid">
      <div class="form-row"><label>${t('cost')}</label><input type="number" step="0.01" id="f_cost" value="${p.cost_price}"/></div>
      <div class="form-row"><label>${t('price')} *</label><input type="number" step="0.01" id="f_price" value="${p.selling_price}"/></div>
    </div>
    <div class="form-grid">
      <div class="form-row"><label>${t('stock')}</label><input type="number" id="f_stock" value="${p.stock}"/></div>
      <div class="form-row"><label>${t('unit')}</label><input id="f_unit" value="${p.unit}"/></div>
    </div>
    <div class="form-row"><label>${t('threshold')}</label><input type="number" id="f_threshold" value="${p.low_stock_threshold}"/></div>
  `, async () => {
    const body = {
      barcode: document.getElementById('f_barcode').value.trim(),
      name: document.getElementById('f_name').value.trim(),
      category_id: document.getElementById('f_category').value || null,
      vendor_id: document.getElementById('f_vendor').value || null,
      cost_price: parseFloat(document.getElementById('f_cost').value) || 0,
      selling_price: parseFloat(document.getElementById('f_price').value),
      stock: parseInt(document.getElementById('f_stock').value) || 0,
      unit: document.getElementById('f_unit').value || 'pcs',
      low_stock_threshold: parseInt(document.getElementById('f_threshold').value) || 10
    };
    if (!body.name || !body.selling_price) return alert(t('name_required'));
    if (id) await api('/products/' + id, { method: 'PUT', body });
    else await api('/products', { method: 'POST', body });
    closeModal(); loadProducts();
  });
};

window.deleteProduct = async function(id) {
  if (!confirm(t('confirm_delete'))) return;
  await api('/products/' + id, { method: 'DELETE' });
  loadProducts();
};

// ========== VENDORS ==========
async function loadVendors() {
  state.vendors = await api('/vendors');
  document.querySelector('#vendorsTable tbody').innerHTML = state.vendors.map(v => `
    <tr>
      <td>${v.name}</td><td>${v.contact || '-'}</td><td>${v.email || '-'}</td><td>${v.address || '-'}</td>
      <td>
        <button class="btn btn-sm btn-secondary" onclick="editVendor(${v.id})">${t('edit')}</button>
        <button class="btn btn-sm btn-danger" onclick="deleteVendor(${v.id})">✕</button>
      </td>
    </tr>
  `).join('');
}

document.getElementById('btnNewVendor').addEventListener('click', () => editVendor(null));

window.editVendor = function(id) {
  const v = id ? state.vendors.find(x => x.id === id) : { name: '', contact: '', email: '', address: '' };
  openModal(id ? t('edit') : t('add_vendor'), `
    <div class="form-row"><label>${t('name')} *</label><input id="v_name" value="${v.name}"/></div>
    <div class="form-row"><label>${t('contact')}</label><input id="v_contact" value="${v.contact || ''}"/></div>
    <div class="form-row"><label>${t('email')}</label><input id="v_email" value="${v.email || ''}"/></div>
    <div class="form-row"><label>${t('address')}</label><input id="v_address" value="${v.address || ''}"/></div>
  `, async () => {
    const body = {
      name: document.getElementById('v_name').value.trim(),
      contact: document.getElementById('v_contact').value.trim(),
      email: document.getElementById('v_email').value.trim(),
      address: document.getElementById('v_address').value.trim()
    };
    if (!body.name) return alert(t('name_req'));
    if (id) await api('/vendors/' + id, { method: 'PUT', body });
    else await api('/vendors', { method: 'POST', body });
    closeModal(); loadVendors();
  });
};

window.deleteVendor = async function(id) {
  if (!confirm(t('confirm_delete'))) return;
  await api('/vendors/' + id, { method: 'DELETE' });
  loadVendors();
};

// ========== SALES ==========
document.getElementById('salesPeriod').addEventListener('change', e => {
  document.getElementById('customDateRange').style.display = e.target.value === 'custom' ? 'flex' : 'none';
});

document.getElementById('btnApplyFilter').addEventListener('click', () => {
  state.currentSalesFilter = {
    period: document.getElementById('salesPeriod').value,
    from: document.getElementById('salesFrom').value,
    to: document.getElementById('salesTo').value
  };
  loadSales();
});

async function loadSales() {
  const { period, from, to } = state.currentSalesFilter;
  let url = '/sales?';
  if (period && period !== 'custom') url += 'period=' + period;
  else if (period === 'custom' && from && to) url += `from=${from}&to=${to}`;
  const sales = await api(url);
  const totalSales = sales.reduce((s, x) => s + x.grand_total, 0);
  const totalDiscount = sales.reduce((s, x) => s + x.discount, 0);
  const totalTax = sales.reduce((s, x) => s + x.tax, 0);
  document.getElementById('salesSummary').innerHTML = `
    <div class="sum-item"><div class="sum-label">${t('total_orders')}</div><div class="sum-value">${sales.length}</div></div>
    <div class="sum-item"><div class="sum-label">${t('total_sales')}</div><div class="sum-value">${money(totalSales)}</div></div>
    <div class="sum-item"><div class="sum-label">${t('discount')}</div><div class="sum-value" style="color:var(--warning)">${money(totalDiscount)}</div></div>
    <div class="sum-item"><div class="sum-label">${t('tax')}</div><div class="sum-value">${money(totalTax)}</div></div>
  `;
  document.querySelector('#salesTable tbody').innerHTML = sales.map(s => `
    <tr>
      <td><code>${s.invoice_no}</code></td>
      <td>${new Date(s.created_at).toLocaleString()}</td>
      <td>${s.item_count}</td>
      <td>${money(s.total)}</td><td>${money(s.discount)}</td><td>${money(s.tax)}</td>
      <td><b>${money(s.grand_total)}</b></td>
      <td>${s.payment_method}</td>
      <td><button class="btn btn-sm btn-secondary" onclick="viewSale(${s.id})">${t('view')}</button></td>
    </tr>
  `).join('') || `<tr><td colspan="9" style="text-align:center;color:var(--muted);padding:30px;">${t('no_sales')}</td></tr>`;
}

window.printSalesReport = function() {
  const rows = Array.from(document.querySelectorAll('#salesTable tbody tr')).map(tr =>
    Array.from(tr.querySelectorAll('td')).map(c => c.textContent.trim())
  );
  const summary = document.getElementById('salesSummary').textContent;
  const period = document.getElementById('salesPeriod').value || t('all');
  const area = document.getElementById('salesReportPrintArea');
  area.className = 'print-area';
  area.innerHTML = `
    <div class="sales-report">
      <h2>${state.settings.store_name} - ${t('sales_report_title')}</h2>
      <div class="meta">${t('period')}: ${period} | ${t('generated_on')}: ${new Date().toLocaleString()}</div>
      <table>
        <thead><tr><th>${t('invoice')}</th><th>${t('date')}</th><th>${t('items')}</th><th>${t('total')}</th><th>${t('discount')}</th><th>${t('tax')}</th><th>${t('grand')}</th><th>${t('payment')}</th></tr></thead>
        <tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>
      </table>
      <div class="summary">${summary}</div>
    </div>
  `;
  window.print();
};

window.viewSale = async function(id) {
  const s = await api('/sales/' + id);
  openModal(t('invoice') + ' ' + s.invoice_no, `
    <p><b>${t('date')}:</b> ${new Date(s.created_at).toLocaleString()}</p>
    <p><b>${t('payment')}:</b> ${s.payment_method}</p>
    <hr style="margin:10px 0;border-color:var(--border)"/>
    <table style="width:100%;font-size:13px;">
      <tr><th>${t('product')}</th><th>Qty</th><th>${t('price')}</th><th>${t('total')}</th></tr>
      ${s.items.map(it => `<tr><td>${it.product_name}</td><td>${it.quantity}</td><td>${money(it.price)}</td><td>${money(it.total)}</td></tr>`).join('')}
    </table>
    <hr style="margin:10px 0;border-color:var(--border)"/>
    <p>${t('subtotal')}: ${money(s.total)}</p>
    <p>${t('discount')}: -${money(s.discount)}</p>
    <p>${t('tax')}: ${money(s.tax)}</p>
    <p><b style="font-size:16px;color:var(--success)">${t('grand_total')}: ${money(s.grand_total)}</b></p>
    <p>${t('amount_paid')}: ${money(s.amount_paid)} | ${t('change')}: ${money(s.change_amount)}</p>
  `, () => {
    printReceipt({
      invoice_no: s.invoice_no,
      items: s.items.map(it => ({ name: it.product_name, quantity: it.quantity, price: it.price })),
      subtotal: s.total, discount: s.discount, tax: s.tax, grand_total: s.grand_total,
      payment_method: s.payment_method, amount_paid: s.amount_paid, change: s.change_amount
    });
    closeModal();
  }, '🖨 Print');
};

// ========== ADMIN ==========
async function loadAdmin() {
  if (!state.settings.has_password) state.adminAuthenticated = true;
  updateAdminUI();
  if (state.adminAuthenticated) { loadAdminSales(); loadQRProductList(); }
}

function updateAdminUI() {
  document.getElementById('adminLoginBox').style.display = state.adminAuthenticated ? 'none' : 'block';
  document.getElementById('adminContent').style.display = state.adminAuthenticated ? 'block' : 'none';
  const logoutBtn = document.getElementById('btnAdminLogout');
  logoutBtn.style.display = state.adminAuthenticated && state.settings.has_password ? 'inline-block' : 'none';
}

document.getElementById('btnAdminLogin').addEventListener('click', async () => {
  const pwd = document.getElementById('adminPasswordInput').value;
  try {
    const r = await api('/admin/verify', { method: 'POST', body: { password: pwd } });
    if (r.ok) {
      state.adminAuthenticated = true;
      document.getElementById('adminPasswordInput').value = '';
      updateAdminUI();
      loadAdminSales();
      loadQRProductList();
    }
  } catch (e) { alert(t('invalid_password')); }
});

document.getElementById('btnAdminLogout').addEventListener('click', () => {
  if (!confirm(t('logout_confirm'))) return;
  state.adminAuthenticated = false;
  updateAdminUI();
});

document.querySelectorAll('.admin-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('panel-' + tab.dataset.tab).classList.add('active');
  });
});

async function loadAdminSales() {
  const sales = await api('/sales');
  document.querySelector('#adminSalesTable tbody').innerHTML = sales.map(s => `
    <tr>
      <td><code>${s.invoice_no}</code></td>
      <td>${new Date(s.created_at).toLocaleString()}</td>
      <td>${s.item_count}</td>
      <td><b>${money(s.grand_total)}</b></td>
      <td>${s.payment_method}</td>
      <td>
        <button class="btn btn-sm btn-primary" onclick="adminEditSale(${s.id})">${t('edit')}</button>
        <button class="btn btn-sm btn-danger" onclick="adminDeleteSale(${s.id})">${t('delete')}</button>
      </td>
    </tr>
  `).join('') || `<tr><td colspan="6" style="text-align:center;color:var(--muted);padding:30px;">${t('no_sales')}</td></tr>`;
}

window.adminEditSale = async function(id) {
  const s = await api('/sales/' + id);
  const products = await api('/products');
  const cartItems = s.items.map(it => ({
    product_id: it.product_id, name: it.product_name, price: it.price, quantity: it.quantity,
    maxStock: (products.find(p => p.id === it.product_id)?.stock || 0) + it.quantity
  }));
  openModal('Edit ' + s.invoice_no, `
    <div id="editCartItems"></div>
    <button class="btn btn-sm btn-secondary" onclick="addEditCartItem()">+ ${t('add_product')}</button>
    <hr style="margin:12px 0;border-color:var(--border)"/>
    <div class="form-grid">
      <div class="form-row"><label>${t('discount')}</label><input type="number" step="0.01" id="e_discount" value="${s.discount}"/></div>
      <div class="form-row"><label>${t('tax')} (%)</label><input type="number" step="0.01" id="e_tax" value="${(s.tax / s.total * 100).toFixed(2)}"/></div>
    </div>
    <div class="form-grid">
      <div class="form-row"><label>${t('payment')}</label>
        <select id="e_payment">
          <option value="cash" ${s.payment_method === 'cash' ? 'selected' : ''}>Cash</option>
          <option value="card" ${s.payment_method === 'card' ? 'selected' : ''}>Card</option>
          <option value="mobile" ${s.payment_method === 'mobile' ? 'selected' : ''}>Mobile</option>
        </select>
      </div>
      <div class="form-row"><label>${t('amount_paid')}</label><input type="number" step="0.01" id="e_paid" value="${s.amount_paid}"/></div>
    </div>
  `, async () => {
    const items = [];
    document.querySelectorAll('.edit-cart-row').forEach(row => {
      items.push({
        product_id: parseInt(row.dataset.pid),
        quantity: parseInt(row.querySelector('.eq').value),
        price: parseFloat(row.querySelector('.ep').value)
      });
    });
    if (!items.length) return alert(t('no_items'));
    try {
      await api('/sales/' + id, {
        method: 'PUT',
        body: {
          items,
          discount: parseFloat(document.getElementById('e_discount').value) || 0,
          taxRate: parseFloat(document.getElementById('e_tax').value) || 0,
          payment_method: document.getElementById('e_payment').value,
          amount_paid: parseFloat(document.getElementById('e_paid').value) || 0
        }
      });
      closeModal(); loadAdminSales();
    } catch (e) { alert('Error: ' + e.message); }
  }, t('save'));
  window._editCartItems = cartItems;
  window._allProducts = products;
  renderEditCart();
};

window.renderEditCart = function() {
  document.getElementById('editCartItems').innerHTML = window._editCartItems.map((it, i) => `
    <div class="edit-cart-row" data-pid="${it.product_id}" style="display:grid;grid-template-columns:2fr 1fr 1fr auto;gap:6px;margin-bottom:6px;">
      <input value="${it.name}" disabled />
      <input type="number" class="eq" value="${it.quantity}" min="1" />
      <input type="number" class="ep" value="${it.price}" step="0.01" />
      <button class="btn btn-sm btn-danger" onclick="removeEditCartItem(${i})">✕</button>
    </div>
  `).join('');
};

window.addEditCartItem = function() {
  const pid = prompt(t('enter_product_id'));
  if (!pid) return;
  const p = window._allProducts.find(x => x.id == pid || x.barcode === pid);
  if (!p) return alert(t('product_not_found'));
  window._editCartItems.push({ product_id: p.id, name: p.name, price: p.selling_price, quantity: 1, maxStock: p.stock });
  renderEditCart();
};

window.removeEditCartItem = function(i) {
  window._editCartItems.splice(i, 1);
  renderEditCart();
};

window.adminDeleteSale = async function(id) {
  if (!confirm(t('confirm_delete_sale'))) return;
  try {
    await api('/sales/' + id, { method: 'DELETE' });
    loadAdminSales();
    alert('✅ Sale deleted. Stock restored.');
  } catch (e) { alert('Error: ' + e.message); }
};

window.adminImportSales = function() {
  document.querySelector('.admin-tab[data-tab="admin-import"]').click();
  setTimeout(() => document.getElementById('adminImportSalesFile').click(), 100);
};

// QR Scanner
document.getElementById('btnStartQRScan').addEventListener('click', async () => {
  try {
    state.adminQRScanner = new Html5Qrcode("qr-reader");
    await state.adminQRScanner.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: { width: 300, height: 300 } },
      async (text) => {
        const product = await api('/products/barcode/' + encodeURIComponent(text));
        const result = document.getElementById('qr-result');
        if (product) {
          result.innerHTML = `
            <div class="qr-product-name">✅ ${product.name}</div>
            <div class="qr-product-info">
              <b>${t('barcode')}:</b> ${product.barcode}<br/>
              <b>${t('price')}:</b> ${money(product.selling_price)}<br/>
              <b>${t('stock')}:</b> ${product.stock} ${product.unit}
            </div>
            <button class="btn btn-sm btn-primary" onclick="addToCart(${product.id}); document.querySelector('[data-view=pos]').click();">🛒 Add to Cart</button>
          `;
          result.classList.add('show');
        } else {
          result.innerHTML = `<div class="qr-product-name">❌ ${t('product_not_found')}</div>`;
          result.classList.add('show');
        }
      }, () => {}
    );
    document.getElementById('btnStartQRScan').style.display = 'none';
    document.getElementById('btnStopQRScan').style.display = 'inline-block';
  } catch (e) { alert('Camera error: ' + e.message); }
});

document.getElementById('btnStopQRScan').addEventListener('click', async () => {
  if (state.adminQRScanner) { try { await state.adminQRScanner.stop(); } catch (e) {} state.adminQRScanner = null; }
  document.getElementById('btnStartQRScan').style.display = 'inline-block';
  document.getElementById('btnStopQRScan').style.display = 'none';
});

async function loadQRProductList() {
  const products = await api('/products');
  document.getElementById('qrProductSelect').innerHTML = '<option value="">-- Select Product --</option>' +
    products.map(p => `<option value="${p.id}" data-barcode="${p.barcode || ''}" data-name="${p.name}" data-price="${p.selling_price}">${p.name} ${p.barcode ? '(' + p.barcode + ')' : ''}</option>`).join('');
}

// QR Generate using qrcodejs library
document.getElementById('btnGenerateQR').addEventListener('click', () => {
  const sel = document.getElementById('qrProductSelect');
  const opt = sel.options[sel.selectedIndex];
  if (!opt || !opt.value) return alert('Select a product!');
  const barcode = opt.dataset.barcode;
  const name = opt.dataset.name;
  const price = opt.dataset.price;
  const output = document.getElementById('qr-output');
  if (!barcode) {
    output.innerHTML = '<p style="color:#c00;">❌ No barcode! Add in Products page first.</p>';
    output.classList.add('show');
    return;
  }
  output.innerHTML = '';
  output.classList.add('show');
  const container = document.createElement('div');
  container.style.cssText = 'display:inline-block;padding:20px;background:white;border-radius:8px;text-align:center;';
  output.appendChild(container);
  const qrDiv = document.createElement('div');
  qrDiv.id = 'qr-target-' + Date.now();
  container.appendChild(qrDiv);
  try {
    new QRCode(qrDiv, {
      text: barcode, width: 200, height: 200,
      colorDark: "#000000", colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
    const info = document.createElement('div');
    info.style.cssText = 'margin-top:12px;color:#000;';
    info.innerHTML = `
      <div style="font-size:16px;font-weight:bold;">${name}</div>
      <div style="color:#333;font-size:13px;margin-top:4px;">Barcode: ${barcode}</div>
      <div style="font-size:18px;font-weight:bold;margin-top:4px;">${CUR()}${Number(price).toFixed(2)}</div>
    `;
    container.appendChild(info);
    const btns = document.createElement('div');
    btns.style.cssText = 'margin-top:16px;display:flex;gap:10px;justify-content:center;';
    btns.innerHTML = `
      <button class="btn btn-sm btn-primary" onclick="downloadQR('${barcode}', '${name.replace(/'/g, "\\'")}')">⬇ Download</button>
      <button class="btn btn-sm btn-secondary" style="background:#6c757d;color:white;" onclick="printQR()">🖨 Print</button>
    `;
    output.appendChild(btns);
  } catch (e) {
    output.innerHTML = '<p style="color:#c00;">❌ Error: ' + e.message + '</p>';
  }
});

window.downloadQR = function(barcode, name) {
  const output = document.getElementById('qr-output');
  const canvas = output.querySelector('canvas');
  const img = output.querySelector('img');
  const dataUrl = canvas ? canvas.toDataURL('image/png') : (img ? img.src : null);
  if (dataUrl) {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `QR_${name}_${barcode}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } else {
    alert('QR image not ready. Wait a moment and try again.');
  }
};

window.printQR = function() {
  const output = document.getElementById('qr-output');
  const canvas = output.querySelector('canvas');
  const img = output.querySelector('img');
  const dataUrl = canvas ? canvas.toDataURL('image/png') : (img ? img.src : '');
  const info = output.querySelector('div[style*="margin-top:12px"]');
  const pw = window.open('', '_blank');
  pw.document.write(`
    <!DOCTYPE html><html><head><title>Print QR</title>
    <style>body{font-family:Arial;text-align:center;padding:20px;}.box{display:inline-block;border:2px solid #000;padding:20px;background:white;}
    @media print{.noprint{display:none;}}</style>
    </head><body>
    <div class="box">
      <img src="${dataUrl}" style="width:200px;height:200px;">
      ${info ? info.outerHTML : ''}
    </div>
    <div class="noprint" style="margin-top:20px;">
      <button onclick="window.print()" style="padding:10px 20px;font-size:16px;margin:5px;">🖨 Print</button>
      <button onclick="window.close()" style="padding:10px 20px;font-size:16px;margin:5px;">✕ Close</button>
    </div>
    <script>setTimeout(()=>window.print(),500);<\/script></body></html>
  `);
  pw.document.close();
};

window.batchGenerateQR = function() {
  const products = Array.from(document.getElementById('qrProductSelect').options).filter(o => o.value && o.dataset.barcode);
  if (!products.length) return alert('No products with barcodes!');
  const pw = window.open('', '_blank');
  const data = products.map(p => ({ barcode: p.dataset.barcode, name: p.dataset.name, price: p.dataset.price }));
  const cur = CUR();
  pw.document.write(`
    <!DOCTYPE html><html><head><title>Batch QR</title>
    <script src="https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js"><\/script>
    <style>body{font-family:Arial;padding:20px;}.grid{display:flex;flex-wrap:wrap;gap:15px;justify-content:center;}
    .item{border:2px solid #000;padding:15px;text-align:center;width:220px;background:white;page-break-inside:avoid;}
    .label{font-size:14px;font-weight:bold;margin-top:8px;}.barcode{font-size:11px;color:#333;margin-top:4px;}
    .price{font-size:16px;font-weight:bold;margin-top:4px;}.noprint{text-align:center;margin-bottom:20px;}
    .noprint button{padding:10px 20px;margin:5px;font-size:16px;cursor:pointer;}@media print{.noprint{display:none;}}</style>
    </head><body>
    <div class="noprint"><h2>Batch QR - ${products.length} Products</h2>
    <button onclick="window.print()">🖨 Print All</button>
    <button onclick="window.close()">✕ Close</button></div>
    <div class="grid" id="grid"></div>
    <script>
      const data = ${JSON.stringify(data)};
      const cur = '${cur}';
      const grid = document.getElementById('grid');
      data.forEach((p, i) => {
        const item = document.createElement('div');
        item.className = 'item';
        const qrDiv = document.createElement('div');
        qrDiv.id = 'qr-'+i;
        qrDiv.style.cssText = 'display:inline-block;';
        item.appendChild(qrDiv);
        item.innerHTML += '<div class="label">'+p.name+'</div><div class="barcode">'+p.barcode+'</div><div class="price">'+cur+Number(p.price).toFixed(2)+'</div>';
        grid.appendChild(item);
        setTimeout(() => {
          try {
            new QRCode(document.getElementById('qr-'+i), {text:p.barcode,width:150,height:150,colorDark:"#000",colorLight:"#fff"});
          } catch(e) { console.error(e); }
        }, i*100);
      });
      setTimeout(() => { if(confirm('Print now?')) window.print(); }, data.length*100+1000);
    <\/script></body></html>
  `);
  pw.document.close();
};

// CSV Import
document.getElementById('adminImportProductsFile').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const text = (await file.text()).replace(/^\uFEFF/, '');
  const rows = parseCSV(text);
  if (rows.length < 2) return alert('Empty CSV');
  const headers = rows[0].map(h => h.trim().toLowerCase());
  const data = rows.slice(1).map(r => { const o = {}; headers.forEach((h, i) => o[h] = r[i]); return o; });
  try {
    const r = await api('/products/import/csv', { method: 'POST', body: { rows: data } });
    alert(`${t('import_success')}\nImported: ${r.imported}\nUpdated: ${r.updated}`);
    loadProducts();
  } catch (err) { alert(t('import_failed') + err.message); }
  e.target.value = '';
});

document.getElementById('adminImportSalesFile').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  if (!confirm('Import sales?')) { e.target.value = ''; return; }
  const text = (await file.text()).replace(/^\uFEFF/, '');
  const rows = parseCSV(text);
  if (rows.length < 2) return alert('Empty CSV');
  const headers = rows[0].map(h => h.trim().toLowerCase());
  const data = rows.slice(1).map(r => { const o = {}; headers.forEach((h, i) => o[h] = r[i]); return o; });
  try {
    const r = await api('/sales/import/csv', { method: 'POST', body: { rows: data } });
    alert(`${t('import_success')}\nImported: ${r.imported}`);
    loadAdminSales();
  } catch (err) { alert(t('import_failed') + err.message); }
  e.target.value = '';
});

function parseCSV(text) {
  const rows = []; let row = [], cell = '', inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) {
      if (c === '"' && text[i+1] === '"') { cell += '"'; i++; }
      else if (c === '"') inQ = false;
      else cell += c;
    } else {
      if (c === '"') inQ = true;
      else if (c === ',') { row.push(cell); cell = ''; }
      else if (c === '\n') { row.push(cell); rows.push(row); row = []; cell = ''; }
      else if (c !== '\r') cell += c;
    }
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows.filter(r => r.length > 1 || r[0]);
}

// DB Download/Upload
document.getElementById('btnDownloadDb').addEventListener('click', downloadDb);
document.getElementById('btnDownloadDb2').addEventListener('click', downloadDb);

async function downloadDb() {
  try {
    const res = await fetch('/data/pos.db?t=' + Date.now());
    if (!res.ok) throw new Error('DB not found');
    const blob = await res.blob();
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'pos_database_' + new Date().toISOString().slice(0, 10) + '.db';
    a.click();
  } catch (e) { alert('Error: ' + e.message); }
}

document.getElementById('adminUploadDbFile').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  if (!confirm(t('confirm_db_upload'))) { e.target.value = ''; return; }
  const reader = new FileReader();
  reader.onload = async () => {
    const base64 = btoa(new Uint8Array(reader.result).reduce((d, b) => d + String.fromCharCode(b), ''));
    try {
      await api('/admin/db/upload', { method: 'POST', body: { data: base64 } });
      await api('/admin/db/reload', { method: 'POST' });
      alert(t('db_uploaded'));
      await loadSettingsFromServer();
      state.adminAuthenticated = false;
      updateAdminUI();
    } catch (err) { alert('Error: ' + err.message); }
  };
  reader.readAsArrayBuffer(file);
  e.target.value = '';
});

// ========== LOW STOCK ==========
async function loadLowStock() {
  const items = await api('/products/low-stock');
  document.querySelector('#lowStockTable tbody').innerHTML = items.map(p => `
    <tr>
      <td><code>${p.barcode || '-'}</code></td><td>${p.name}</td>
      <td>${p.category_name || '-'}</td><td>${p.vendor_name || '-'}</td>
      <td style="color:var(--warning);font-weight:600">${p.stock}</td>
      <td>${p.low_stock_threshold}</td>
      <td><button class="btn btn-sm btn-primary" onclick="restock(${p.id})">Restock</button></td>
    </tr>
  `).join('') || `<tr><td colspan="7" style="text-align:center;color:var(--muted);padding:30px;">${t('all_stock_ok')}</td></tr>`;
}

window.restock = async function(id) {
  const qty = prompt(t('enter_qty'));
  if (!qty || isNaN(qty)) return;
  const p = state.products.find(x => x.id === id) || (await api('/products')).find(x => x.id === id);
  await api('/products/' + id, { method: 'PUT', body: { ...p, stock: p.stock + parseInt(qty) } });
  loadLowStock();
};

// ========== ORDERS ==========
async function loadOrders() {
  const items = await api('/products/low-stock');
  document.getElementById('orderInfo').innerHTML = `<b>${t('total_items')}:</b> ${items.length} | <b>${t('generated_on')}:</b> ${new Date().toLocaleString()}`;
  document.querySelector('#ordersTable tbody').innerHTML = items.map((p, i) => {
    const qty = Math.max(p.low_stock_threshold * 2 - p.stock, p.low_stock_threshold);
    return `
      <tr>
        <td>${i + 1}</td><td>${p.name}</td>
        <td style="color:var(--warning);font-weight:600">${p.stock}</td>
        <td>${p.low_stock_threshold}</td>
        <td><input type="number" class="order-qty-input" data-id="${p.id}" value="${qty}" min="1" style="width:80px"/></td>
        <td>${p.vendor_name || '-'}</td><td>${p.vendor_contact || '-'}</td>
      </tr>
    `;
  }).join('') || `<tr><td colspan="7" style="text-align:center;color:var(--muted);padding:30px;">${t('no_low_stock')}</td></tr>`;
  window._orderItems = items;
}

window.printOrderList = function() {
  const items = window._orderItems || [];
  const rows = [];
  document.querySelectorAll('.order-qty-input').forEach(inp => {
    const p = items.find(x => x.id == inp.dataset.id);
    if (p) rows.push({ ...p, orderQty: parseInt(inp.value) || 0 });
  });
  const totalQty = rows.reduce((s, r) => s + r.orderQty, 0);
  const area = document.getElementById('orderPrintArea');
  area.className = 'print-area';
  area.innerHTML = `
    <div class="order-print">
      <h2>${state.settings.store_name} - ${t('order_list_title')}</h2>
      <div class="meta">${t('generated_on')}: ${new Date().toLocaleString()} | ${t('total_items')}: ${rows.length} | ${t('total_qty')}: ${totalQty}</div>
      <table>
        <thead><tr><th>#</th><th>${t('product')}</th><th>${t('barcode')}</th><th>${t('current_stock')}</th><th>${t('order_qty')}</th><th>${t('vendor')}</th><th>${t('vendor_contact')}</th></tr></thead>
        <tbody>${rows.map((r, i) => `<tr><td>${i+1}</td><td>${r.name}</td><td>${r.barcode||'-'}</td><td>${r.stock}</td><td><b>${r.orderQty}</b></td><td>${r.vendor_name||'-'}</td><td>${r.vendor_contact||'-'}</td></tr>`).join('')}</tbody>
      </table>
    </div>
  `;
  window.print();
};

// ========== MODAL ==========
let modalSaveHandler = null;
function openModal(title, bodyHtml, onSave, saveText) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalBody').innerHTML = bodyHtml;
  document.getElementById('modalSave').textContent = saveText || t('save');
  modalSaveHandler = onSave;
  document.getElementById('modal').classList.add('open');
}
function closeModal() {
  document.getElementById('modal').classList.remove('open');
  modalSaveHandler = null;
}
window.closeModal = closeModal;
document.getElementById('modalSave').addEventListener('click', () => { if (modalSaveHandler) modalSaveHandler(); });

// ========== INIT ==========
(async function init() {
  await loadSettingsFromServer();
  loadPOS();
})();