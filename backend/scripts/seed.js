const { PrismaClient } = require("../src/generated/prisma");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

// ─── HELPERS ────────────────────────────────────────────────────────────────

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function pick(arr, i) {
  return arr[i % arr.length];
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ─── STATIC DATA ─────────────────────────────────────────────────────────────

const BRANDS = [
  "Time Aura",
  "Oud Prestige",
  "Leather Craft",
  "Aura Collection",
  "Maison Luxe",
];

const COLORS = [
  { name: "Black", hex: "#000000" },
  { name: "Brown", hex: "#5c3a1e" },
  { name: "Maroon", hex: "#800020" },
  { name: "Navy", hex: "#1a2a4a" },
  { name: "Green", hex: "#1f4d3a" },
  { name: "Silver", hex: "#c8c8c8" },
  { name: "Gold", hex: "#d4af37" },
  { name: "White", hex: "#f5f5f5" },
];

const CATEGORIES = [
  {
    name: "Watches",
    slug: "watches",
    description: "Luxury and sport timepieces for every occasion.",
  },
  {
    name: "Wallets",
    slug: "wallets",
    description: "Premium leather wallets crafted for the modern gentleman.",
  },
  {
    name: "Perfumes",
    slug: "perfumes",
    description: "Exclusive fragrances inspired by the finest ingredients.",
  },
];

// ─── PRODUCTS ────────────────────────────────────────────────────────────────

const WATCH_PRODUCTS = [
  { name: "TA Heritage Chronograph", price: 45000, discountPrice: 38000 },
  { name: "TA Chrono Classic", price: 32000, discountPrice: null },
  { name: "TA Minimal Black", price: 18000, discountPrice: 14500 },
  { name: "TA Royal Gold", price: 65000, discountPrice: null },
  { name: "TA Sport Titanium", price: 28000, discountPrice: 23000 },
  { name: "TA Aviator Steel", price: 22000, discountPrice: null },
  { name: "TA Vintage Bronze", price: 19000, discountPrice: 15000 },
  { name: "TA Automatic 40", price: 35000, discountPrice: null },
  { name: "TA Skeleton Ivory", price: 48000, discountPrice: 42000 },
  { name: "TA Diver 200", price: 27000, discountPrice: null },
  { name: "TA Field Watch", price: 15000, discountPrice: null },
  { name: "TA Chrono Racing", price: 30000, discountPrice: 26000 },
  { name: "TA Moonphase", price: 55000, discountPrice: null },
  { name: "TA Slim Dress", price: 24000, discountPrice: null },
  { name: "TA Dual Time", price: 38000, discountPrice: 32000 },
  { name: "TA Solar Explorer", price: 21000, discountPrice: null },
];

const WALLET_PRODUCTS = [
  { name: "TA Leather Bifold", price: 4500, discountPrice: null },
  { name: "TA Slim Card Holder", price: 2800, discountPrice: 2200 },
  { name: "TA Long Wallet", price: 6500, discountPrice: null },
  { name: "TA Zip Wallet", price: 5000, discountPrice: 4200 },
  { name: "TA Money Clip", price: 3200, discountPrice: null },
  { name: "TA Trifold Classic", price: 4800, discountPrice: null },
  { name: "TA Passport Holder", price: 5500, discountPrice: 4800 },
  { name: "TA Travel Organizer", price: 8000, discountPrice: null },
  { name: "TA RFID Bifold", price: 6000, discountPrice: null },
  { name: "TA Vintage Wallet", price: 5200, discountPrice: 4500 },
  { name: "TA Executive Wallet", price: 9500, discountPrice: null },
  { name: "TA Card Sleeve", price: 2500, discountPrice: null },
  { name: "TA Handmade Bifold", price: 7200, discountPrice: 6000 },
  { name: "TA Coin Pouch", price: 3000, discountPrice: null },
  { name: "TA Premium Trifold", price: 5800, discountPrice: null },
  { name: "TA Canvas Slim", price: 3500, discountPrice: 2900 },
];

const PERFUME_PRODUCTS = [
  { name: "Oud Prestige 100ml", price: 12000, discountPrice: null },
  { name: "Noir Intense 75ml", price: 9500, discountPrice: 8000 },
  { name: "Amber Luxe 50ml", price: 8000, discountPrice: null },
  { name: "Bleu Elite 100ml", price: 11000, discountPrice: 9500 },
  { name: "Rose Reserve 50ml", price: 7500, discountPrice: null },
  { name: "Vanilla Noir 75ml", price: 8800, discountPrice: null },
  { name: "Musk Royal 100ml", price: 13000, discountPrice: 11000 },
  { name: "Citrus Bloom 50ml", price: 6500, discountPrice: null },
  { name: "Leather Cognac 75ml", price: 9000, discountPrice: 7500 },
  { name: "Sandalwood Deep 100ml", price: 14000, discountPrice: null },
  { name: "Iris Silver 50ml", price: 7200, discountPrice: null },
  { name: "Vetiver Storm 75ml", price: 8500, discountPrice: 7200 },
  { name: "Amber Woods 100ml", price: 11500, discountPrice: null },
  { name: "Oud Attar 3ml", price: 5500, discountPrice: null },
  { name: "Jasmine Nuit 50ml", price: 7800, discountPrice: 6500 },
  { name: "White Tea 75ml", price: 7000, discountPrice: null },
];

const WATCH_DESCRIPTIONS = [
  "A masterpiece of Swiss-inspired engineering featuring a refined automatic movement with 42-hour power reserve. The sapphire crystal glass ensures scratch-free clarity while the genuine calfskin strap conforms to your wrist over time.",
  "Timeless elegance meets contemporary precision. This chronograph features tachymeter scale, three subdials, and a sturdy stainless steel case finished to museum quality.",
  "Stripped back to essentials — a minimalist face with only the most necessary details. Water-resistant to 50m and powered by a reliable Japanese quartz movement.",
];

const WALLET_DESCRIPTIONS = [
  "Full-grain vegetable-tanned leather ages beautifully, developing a unique patina with use. Holds 6 cards comfortably with a dedicated bill compartment and coin pocket.",
  "RFID-blocking lining protects your cards from digital theft. Premium cowhide exterior with micro-stitched edges for lasting durability.",
  "A travel essential crafted from waxed canvas and genuine leather trim. Multiple pockets for passports, cards, boarding passes, and currency.",
];

const PERFUME_DESCRIPTIONS = [
  "A bold oriental composition built on a foundation of precious Oud wood, warmed with amber and a heart of spiced rose. Long-lasting 12+ hour projection.",
  "An intimate fragrance for the modern man. Opening notes of bergamot give way to a rich heart of vetiver and leather, drying to a sensual musk base.",
  "A fresh, aquatic composition perfect for daytime wear. Sea salt, white tea, and green fig open into a clean cedar and white musk dry-down.",
];

const WATCH_MATERIALS = [
  "Stainless Steel",
  "Gold Plated",
  "Titanium",
  "Bronze",
  "Carbon Fiber",
];
const WALLET_MATERIALS = [
  "Full-Grain Leather",
  "Waxed Canvas",
  "Suede Leather",
  "Nubuck",
  "Crocodile-Embossed",
];
const PERFUME_MATERIALS = ["Glass", "Crystal", "Frosted Glass", "Ceramic"];

const WATCH_TAGS = ["watch", "luxury", "timepiece", "chronograph", "automatic"];
const WALLET_TAGS = ["wallet", "leather", "bifold", "slim", "accessories"];
const PERFUME_TAGS = ["perfume", "fragrance", "oud", "luxury", "scent"];

const COUPONS = [
  {
    code: "AURA10",
    type: "PERCENT",
    value: 10,
    label: "10% off sitewide",
    isActive: true,
  },
  {
    code: "FIRST100",
    type: "FLAT",
    value: 1000,
    label: "PKR 1000 off first order",
    isActive: true,
  },
  {
    code: "LUXURY20",
    type: "PERCENT",
    value: 20,
    label: "20% off luxury watches",
    isActive: true,
  },
  {
    code: "SUMMER15",
    type: "PERCENT",
    value: 15,
    label: "Summer sale 15% off",
    isActive: false,
  },
];

// ─── CUSTOMERS ───────────────────────────────────────────────────────────────

const CUSTOMER_DATA = [
  {
    name: "Ahmed Khan",
    phone: "03001234567",
    email: "ahmed.khan@example.com",
    address: "House 12, Street 4",
    city: "Lahore",
  },
  {
    name: "Sara Ali",
    phone: "03211234568",
    email: "sara.ali@example.com",
    address: "Flat 3B, Gulshan",
    city: "Karachi",
  },
  {
    name: "Bilal Raza",
    phone: "03451234569",
    email: "bilal.raza@example.com",
    address: "G-9/3, Markaz",
    city: "Islamabad",
  },
  {
    name: "Ayesha Noor",
    phone: "03101234570",
    email: "ayesha.noor@example.com",
    address: "Defence Phase 5",
    city: "Lahore",
  },
  {
    name: "Umar Farooq",
    phone: "03331234571",
    email: "umar.farooq@example.com",
    address: "Tariq Road",
    city: "Karachi",
  },
  {
    name: "Zainab Mirza",
    phone: "03061234572",
    email: "zainab.mirza@example.com",
    address: "F-7/2",
    city: "Islamabad",
  },
  {
    name: "Hassan Sheikh",
    phone: "03461234573",
    email: "hassan.sheikh@example.com",
    address: "Model Town",
    city: "Lahore",
  },
  {
    name: "Fatima Siddiqui",
    phone: "03221234574",
    email: "fatima.siddiqui@example.com",
    address: "Clifton Block 5",
    city: "Karachi",
  },
  {
    name: "Omar Malik",
    phone: "03151234575",
    email: "omar.malik@example.com",
    address: "E-11/3",
    city: "Islamabad",
  },
  {
    name: "Nadia Butt",
    phone: "03021234576",
    email: "nadia.butt@example.com",
    address: "DHA Phase 6",
    city: "Lahore",
  },
];

const ORDER_STATUSES = [
  "Order Placed",
  "Payment Confirmed",
  "Processing",
  "Shipped",
  "Delivered",
];

const COURIERS = ["TCS", "Leopards", "Postex", "M&P", "BlueEx"];

// ─── MAIN ────────────────────────────────────────────────────────────────────

async function main() {
  console.log("🌱 Starting seed...\n");

  // 1. ADMIN USER
  console.log("👤 Seeding admin user...");
  const hash = await bcrypt.hash("admin123", 12);
  await prisma.user.upsert({
    where: { email: "admin@timeaura.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@timeaura.com",
      passwordHash: hash,
      role: "ADMIN",
      isEmailVerified: true,
    },
  });
  console.log("   ✓ admin@timeaura.com / admin123\n");

  // 2. CATEGORIES
  console.log("📂 Seeding categories...");
  const categoryMap = {};
  for (const c of CATEGORIES) {
    const cat = await prisma.category.upsert({
      where: { slug: c.slug },
      update: {},
      create: { name: c.name, slug: c.slug },
    });
    categoryMap[c.slug] = cat.id;
    console.log(`   ✓ ${c.name}`);
  }
  console.log();

  // 3. PRODUCTS
  console.log("📦 Seeding products...");

  const buildProducts = (items, categorySlug, materials, descArr, tagArr) =>
    items.map((item, i) => ({
      name: item.name,
      slug: slugify(`${item.name}`),
      description: pick(descArr, i),
      shortDescription: `${item.name} — premium quality craftsmanship.`,
      categoryId: categoryMap[categorySlug],
      brand: pick(BRANDS, i),
      sku: `${categorySlug.substring(0, 3).toUpperCase()}-${1000 + i}`,
      price: item.price,
      discountPrice: item.discountPrice,
      stockQuantity: i === 0 ? 0 : 5 + ((i * 3) % 40),
      status: i === 0 ? "OUT_OF_STOCK" : "PUBLISHED",
      featuredProduct: i % 4 === 0,
      thumbnailImage: `/images/products/${categorySlug.slice(0, -1)}.png`,
      tags: [
        pick(tagArr, i),
        pick(BRANDS, i).toLowerCase().replace(/\s+/g, ""),
      ],
      color: pick(COLORS, i).name,
      colorHex: pick(COLORS, i).hex,
      material: pick(materials, i),
      weight: 100 + ((i * 15) % 300),
      dimensions: "12x10x5 cm",
      warranty: i % 3 === 0 ? "2 Year International" : "1 Year International",
      isActive: true,
    }));

  const allProducts = [
    ...buildProducts(
      WATCH_PRODUCTS,
      "watches",
      WATCH_MATERIALS,
      WATCH_DESCRIPTIONS,
      WATCH_TAGS,
    ),
    ...buildProducts(
      WALLET_PRODUCTS,
      "wallets",
      WALLET_MATERIALS,
      WALLET_DESCRIPTIONS,
      WALLET_TAGS,
    ),
    ...buildProducts(
      PERFUME_PRODUCTS,
      "perfumes",
      PERFUME_MATERIALS,
      PERFUME_DESCRIPTIONS,
      PERFUME_TAGS,
    ),
  ];

  const productIds = [];
  for (const p of allProducts) {
    const { tags, colorHex, ...productData } = p;
    const created = await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: { ...productData, tags, colorHex },
    });
    productIds.push(created.id);
  }
  console.log(`   ✓ ${allProducts.length} products seeded\n`);

  // 4. COUPONS
  console.log("🏷️  Seeding coupons...");
  for (const c of COUPONS) {
    await prisma.coupon.upsert({
      where: { code: c.code },
      update: {},
      create: c,
    });
    console.log(`   ✓ ${c.code} — ${c.label}`);
  }
  console.log();

  // 5. CUSTOMERS
  console.log("👥 Seeding customers...");
  const customerIds = [];
  for (const c of CUSTOMER_DATA) {
    const customer = await prisma.customer.upsert({
      where: { phone: c.phone },
      update: {},
      create: c,
    });
    customerIds.push(customer.id);
  }
  console.log(`   ✓ ${CUSTOMER_DATA.length} customers seeded\n`);

  // 6. ORDERS
  console.log("🛒 Seeding orders...");

  // Published product IDs only for orders
  const publishedProductIds = productIds.slice(1); // skip first (out-of-stock)

  let totalOrders = 0;
  for (let ci = 0; ci < customerIds.length; ci++) {
    const customerId = customerIds[ci];
    const numOrders = 1 + (ci % 3); // 1-3 orders per customer

    for (let oi = 0; oi < numOrders; oi++) {
      const statusIndex = (ci + oi) % ORDER_STATUSES.length;
      const currentStatus = ORDER_STATUSES[statusIndex];

      // Pick 1-3 products for this order
      const numItems = 1 + ((ci * 3 + oi) % 3);
      const orderProductIds = [];
      for (let ii = 0; ii < numItems; ii++) {
        const pId =
          publishedProductIds[
            (ci * 5 + oi * 3 + ii) % publishedProductIds.length
          ];
        if (!orderProductIds.includes(pId)) orderProductIds.push(pId);
      }

      // Look up product prices
      const products = await prisma.product.findMany({
        where: { id: { in: orderProductIds } },
        select: { id: true, price: true, discountPrice: true },
      });

      const items = products.map((p) => ({
        productId: p.id,
        quantity: 1 + (oi % 2),
        unitPrice: p.discountPrice ?? p.price,
      }));

      const totalAmount = items.reduce(
        (sum, it) => sum + it.unitPrice * it.quantity,
        0,
      );

      // Build status history up to currentStatus
      const historyEntries = ORDER_STATUSES.slice(0, statusIndex + 1).map(
        (s) => ({ status: s }),
      );

      await prisma.order.create({
        data: {
          customerId,
          status: currentStatus,
          paymentMethod: pick(
            ["COD", "JAZZCASH", "EASYPAISA", "CARD"],
            ci + oi,
          ),
          totalAmount,
          courier:
            currentStatus === "Shipped" || currentStatus === "Delivered"
              ? pick(COURIERS, ci)
              : null,
          trackingNumber:
            currentStatus === "Shipped" || currentStatus === "Delivered"
              ? `TRK${100000 + ci * 10 + oi}`
              : null,
          items: { create: items },
          statusHistory: { create: historyEntries },
        },
      });

      totalOrders++;
    }
  }
  console.log(`   ✓ ${totalOrders} orders seeded\n`);

  // 7. NOTIFICATIONS
  console.log("🔔 Seeding notifications...");
  const notificationTemplates = [
    {
      title: "New Order Received",
      message: "Customer placed a new order. Review it in the orders panel.",
    },
    {
      title: "Low Stock Alert",
      message: "One or more products are running low on stock.",
    },
    {
      title: "Payment Confirmed",
      message: "A payment has been successfully confirmed for an order.",
    },
    {
      title: "Order Shipped",
      message:
        "An order has been dispatched and is on its way to the customer.",
    },
    {
      title: "New Customer Sign-up",
      message: "A new customer has registered on the platform.",
    },
  ];

  for (let i = 0; i < 10; i++) {
    const tmpl = pick(notificationTemplates, i);
    await prisma.notification.create({
      data: {
        customerId: pick(customerIds, i),
        title: tmpl.title,
        message: tmpl.message,
        isRead: i % 3 === 0,
      },
    });
  }
  console.log(`   ✓ 10 notifications seeded\n`);

  // ─── SUMMARY ──────────────────────────────────────────────────────────────
  console.log("─────────────────────────────────────────────");
  console.log("✅ Seed complete!\n");
  console.log(`   📦 Products    : ${allProducts.length}`);
  console.log(`   📂 Categories  : ${CATEGORIES.length}`);
  console.log(`   🏷️  Coupons     : ${COUPONS.length}`);
  console.log(`   👥 Customers   : ${CUSTOMER_DATA.length}`);
  console.log(`   🛒 Orders      : ${totalOrders}`);
  console.log(`   🔔 Notifications: 10`);
  console.log("\n   🔑 Admin credentials:");
  console.log("      Email   : admin@timeaura.com");
  console.log("      Password: admin123");
  console.log("─────────────────────────────────────────────\n");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
