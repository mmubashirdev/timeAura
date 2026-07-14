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
        image: product.image,
        qty,
      });
    write(items);
  },
  remove: (id) => write(read().filter((i) => i.id !== id)),
  subscribe: (cb) => {
    if (typeof window === "undefined") return () => {};
    const handler = () => cb(read());
    window.addEventListener(EVENT, handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener(EVENT, handler);
      window.removeEventListener("storage", handler);
    };
  },
};
