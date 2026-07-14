const KEY = "ta:wishlist";
const EVENT = "ta:wishlist:change";

function read() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

function write(ids) {
  localStorage.setItem(KEY, JSON.stringify(ids));
  window.dispatchEvent(new CustomEvent(EVENT));
}

export const wishlistStore = {
  get: read,
  has: (id) => read().includes(id),
  toggle: (id) => {
    const ids = read();
    const next = ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];
    write(next);
    return next.includes(id);
  },
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
