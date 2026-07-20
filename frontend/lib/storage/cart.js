const KEY = "ta:cart";
const EVENT = "ta:cart:change";

function read() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

function write(items) {
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent(EVENT));
}

export const cartStore = {
  get: read,
  count: () => read().reduce((sum, i) => sum + i.qty, 0),

  add: (product, qty = 1) => {
    const items = read();
    const existing = items.find((i) => i.id === product.id);
    if (existing) existing.qty += qty;
    else
      items.push({
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        // Backend DTO uses thumbnailImage; fall back to image for legacy data
        image: product.thumbnailImage || product.image || "",
        color: product.color || "",
        material: product.material || "",
        brand: product.brand || "",
        categoryLabel: product.categoryLabel || "",
        compareAtPrice: product.discountPrice || product.compareAtPrice || null,
        qty,
      });
    write(items);
  },

  remove: (id) => write(read().filter((i) => i.id !== id)),

  update: (id, qty) => {
    const safeQty = Math.max(1, parseInt(qty, 10) || 1);
    const items = read().map((i) => (i.id === id ? { ...i, qty: safeQty } : i));
    write(items);
  },

  increment: (id) => {
    const items = read().map((i) =>
      i.id === id ? { ...i, qty: i.qty + 1 } : i,
    );
    write(items);
  },

  decrement: (id) => {
    const items = read().map((i) =>
      i.id === id ? { ...i, qty: Math.max(1, i.qty - 1) } : i,
    );
    write(items);
  },

  clear: () => write([]),

  subscribe: (cb) => {
    if (typeof window === "undefined") return () => {};
    const handler = () => cb(read());
    window.addEventListener(EVENT, handler);
    window.addEventListener("storage", handler);
    // Immediately push current state so the consumer doesn't start empty
    handler();
    return () => {
      window.removeEventListener(EVENT, handler);
      window.removeEventListener("storage", handler);
    };
  },
};
