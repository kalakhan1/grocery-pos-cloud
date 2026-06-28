first create an "data" folder in root folder 
install node js : Node Version: v22.23.1 (Tested)
Status: Production Ready ✅
run commands : npm install &
npm start 


/* ========== 80MM THERMAL PRINTER SUPPORT ========== */
@page {
  size: 80mm auto;
  margin: 0;
}

@media print {
  body * { visibility: hidden; }
  .print-area, .print-area * { visibility: visible; }
  .print-area {
    display: block !important;
    position: absolute;
    left: 0;
    top: 0;
    width: 80mm;
    padding: 3mm;
    font-family: 'Courier New', monospace;
    color: black !important;
    background: white !important;
    margin: 0;
  }
  .receipt {
    font-size: 11px;
    width: 74mm;
    margin: 0 auto;
  }
  .receipt h2 { text-align: center; font-size: 14px; margin-bottom: 2px; }
  .receipt .center { text-align: center; font-size: 10px; }
  .receipt .line { border-top: 1px dashed #000; margin: 4px 0; }
  .receipt table { width: 100%; border-collapse: collapse; }
  .receipt td { padding: 1px 0; font-size: 10px; word-wrap: break-word; }
  .receipt .total-row { font-weight: bold; font-size: 12px; }
  .receipt-footer {
    margin-top: 8px;
    padding-top: 4px;
    border-top: 1px dashed #000;
    text-align: center;
    font-size: 10px;
    font-style: italic;
  }
  /* Hide modal buttons when printing from popup */
  .modal-foot, .modal-head { display: none !important; }
}
```

---
## 📷 PART 3: Barcode/QR Scanner Setup Guide

### 🔌 Type 1: USB Barcode Scanner (Recommended for Shops)

**Yeh sabse best aur fast hai!**

#### Setup:
1. **USB scanner** kharido (₹1500-3000):
   - **Recommended**: TVS Electronics, Godex, Zebra, Honeywell
   - **Budget**: Netum, Nadya, Eyoyo (₹1000-1500)
2. **USB port** mein plug karo
3. Windows automatically driver install karega
4. **Bas! Setup complete** ✅

#### Kaise Kaam Karta Hai:
- Scanner **keyboard emulator** ki tarah kaam karta hai
- Barcode scan karo → Number type hota hai → Enter dabta hai
- POS system automatically product detect kar leta hai

#### POS Mein Use:
1. POS page pe jao
2. **Barcode input box** pe click karo (ya 📷 button dabao)
3. Product ka barcode scan karo
4. Product turant cart mein add ho jayega ✅

#### Company Ke Barcodes:
- ✅ EAN-13 (13 digits — standard retail)
- ✅ UPC-A (12 digits — North America)
- ✅ Code 128, Code 39
- ✅ QR Code (2D square)
- **Koi bhi standard barcode chalega!**

### 📱 Type 2: Camera QR Scanner (Already Built-in)

**Aapke project mein already hai!**

#### Kaise Use Karein:
1. POS page pe **📱 QR** button dabao
2. Camera permission allow karo
3. QR/barcode camera ke saamne lao
4. Product automatically add ho jayega

#### Tips:
- **Achi lighting** mein scan karo
- Camera **15-30 cm** doori pe rakho
- Barcode **straight** rakho (tedha mat)

### 📶 Type 3: Bluetooth Scanner (Wireless)

1. Bluetooth scanner kharido (₹2500-5000)
2. Laptop/phone se **pair** karo
3. Keyboard ki tarah kaam karega
4. USB scanner jaisa hi use karo

### 🏷️ Apne Khud Ke QR Codes Banane Ke Liye:

1. Admin → QR Scanner tab
2. Product select karo
3. **"Generate QR"** dabao
4. QR code download/print karo
5. Product pe sticker laga do
6. Ab scanner se scan kar sakte ho!

### 🧪 Test Karne Ke Steps:

1. POS page kholo
2. Barcode box mein click karo
3. Koi product scan karo (jaise Apples: `8901234567890`)
4. Product cart mein add hoga ✅
5. Agar product nahi hai toh:
   - Products page jao
   - Add Product karo
   - Barcode field mein woh number paste karo
   - Save karo
   - Ab scan karne pe milega ✅

---

## 🎯 Complete Workflow (Shop Mein)

### 🏪 Shop Setup:
```
1. Thermal printer connect karo (USB)
2. Barcode scanner connect karo (USB)
3. Laptop pe browser kholo: localhost:3000
4. Products add karo with barcodes
5. QR codes generate karke products pe lagao
```

### 🛒 Daily Operation:
```
1. Customer aaya → POS page kholo
2. Product scan karo (USB scanner se) → Turant add hoga
3. Quantity change karo (agar zarurat ho)
4. Checkout dabao → Receipt popup aayega
5. Print karo → Thermal printer se 80mm bill niklega
6. Customer ko do
7. Galti ho gayi? → Popup mein Edit/Delete button se fix karo
```

### 📊 End of Day:
```
1. Dashboard → Sales summary dekho
2. Sales History → Filter by Today → Print Report
3. Low Stock → Order list print karo
4. Backup → CSV export karo
```

---

