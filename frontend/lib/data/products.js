// Mock catalog. When the backend exposes GET /products, swap this for
// a TanStack useQuery. Shape mirrors what we expect the API to return.

const WATCH_NAMES = [
  "TA Heritage Chronograph",
  "TA Chrono Classic",
  "TA Minimal Black",
  "TA Royal Gold",
  "TA Sport Titanium",
  "TA Aviator Steel",
  "TA Vintage Bronze",
  "TA Automatic 40",
  "TA Skeleton Ivory",
  "TA Diver 200",
  "TA Field Watch",
  "TA Chrono Racing",
  "TA Moonphase",
  "TA Slim Dress",
  "TA Dual Time",
  "TA Solar Explorer",
];
const WALLET_NAMES = [
  "TA Leather Wallet",
  "TA Bifold Wallet",
  "TA Card Holder",
  "TA Long Wallet",
  "TA Coin Pouch",
  "TA Slim Wallet",
  "TA Zip Wallet",
  "TA Money Clip",
  "TA Trifold",
  "TA Passport Holder",
  "TA Travel Organizer",
  "TA RFID Bifold",
  "TA Vintage Wallet",
  "TA Executive Wallet",
  "TA Card Sleeve",
  "TA Handmade Bifold",
];
const PERFUME_NAMES = [
  "Oud Prestige",
  "Noir Intense",
  "Amber Luxe",
  "Bleu Elite",
  "Rose Reserve",
  "Vanilla Noir",
  "Musk Royal",
  "Citrus Bloom",
  "Leather Cognac",
  "Sandalwood Deep",
  "Iris Silver",
  "Vetiver Storm",
  "Amber Woods",
  "Oud Attar",
  "Jasmine Nuit",
  "White Tea",
];

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
];

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function pick(arr, i) {
  return arr[i % arr.length];
}

// Deterministic — same seed = same list every render (avoids hydration mismatches)
function make(category, names, priceRange, image, materials) {
  return names.map((name, i) => {
    const basePrice =
      priceRange[0] + ((i * 733) % (priceRange[1] - priceRange[0]));
    const rounded = Math.round(basePrice / 100) * 100;
    const onSale = i % 5 === 2;
    const isNew = i % 7 === 0;
    return {
      id: `${category}-${i + 1}`,
      slug: slugify(`${name}-${i + 1}`),
      name,
      category, // "watches" | "wallets" | "perfumes"
      categoryLabel: category.toUpperCase(),
      brand: pick(BRANDS, i),
      material: pick(materials, i),
      color: pick(COLORS, i).name,
      colorHex: pick(COLORS, i).hex,
      price: onSale ? Math.round((rounded * 0.8) / 100) * 100 : rounded,
      compareAtPrice: onSale ? rounded : null,
      rating: 3 + ((i * 13) % 20) / 10, // 3.0 – 4.9
      reviewCount: 5 + ((i * 3) % 40),
      image,
      isNew,
      isSale: onSale,
    };
  });
}

export const PRODUCTS = [
  ...make(
    "watches",
    WATCH_NAMES,
    [12000, 65000],
    "/images/products/watch.png",
    ["Stainless Steel", "Gold Plated", "Leather"],
  ),
  ...make(
    "wallets",
    WALLET_NAMES,
    [3500, 18000],
    "/images/products/wallet.png",
    ["Leather", "Leather", "Leather"],
  ),
  ...make(
    "perfumes",
    PERFUME_NAMES,
    [5500, 22000],
    "/images/products/perfume.png",
    ["Glass", "Glass", "Glass"],
  ),
];

export const CATEGORIES = [
  { key: "all", label: "All Products" },
  { key: "watches", label: "Watches" },
  { key: "wallets", label: "Wallets" },
  { key: "perfumes", label: "Perfumes" },
];

export const BRANDS_LIST = BRANDS;
export const MATERIALS_LIST = [
  "Leather",
  "Stainless Steel",
  "Gold Plated",
  "Glass",
];
export const COLORS_LIST = COLORS;
