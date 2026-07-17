const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

function getAccessToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("accessToken");
}

async function request(
  path,
  { method = "GET", body, headers = {}, auth = false } = {},
) {
  const finalHeaders = { "Content-Type": "application/json", ...headers };
  if (auth) {
    const token = getAccessToken();
    if (token) finalHeaders.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    credentials: "include",
    headers: finalHeaders,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const error = new Error(data?.message || "Something went wrong");
    error.status = res.status;
    error.details = data?.details;
    throw error;
  }

  return data;
}

export const authApi = {
  // POST /auth/register  body: { name, email, password }
  register: ({ name, email, password }) =>
    request("/auth/register", {
      method: "POST",
      body: { name, email, password },
    }),

  // POST /auth/login  body: { email, password }
  login: ({ email, password }) =>
    request("/auth/login", { method: "POST", body: { email, password } }),

  // POST /auth/google  body: { idToken }
  googleLogin: ({ idToken }) =>
    request("/auth/google", { method: "POST", body: { idToken } }),

  // POST /auth/verify-email  body: { email, code }
  verifyEmail: ({ email, code }) =>
    request("/auth/verify-email", { method: "POST", body: { email, code } }),

  // POST /auth/resend-verification  body: { email }
  resendVerification: ({ email }) =>
    request("/auth/resend-verification", { method: "POST", body: { email } }),

  // POST /auth/forgot-password  body: { email }
  forgotPassword: ({ email }) =>
    request("/auth/forgot-password", { method: "POST", body: { email } }),

  // POST /auth/reset-password  body: { email, code, newPassword }
  resetPassword: ({ email, code, newPassword }) =>
    request("/auth/reset-password", {
      method: "POST",
      body: { email, code, newPassword },
    }),

  // GET /auth/me  (requires Bearer token)
  me: () => request("/auth/me", { auth: true }),
};

export const productsApi = {
  // GET /products?category=&min=&max=&brands=&materials=&colors=&rating=&sort=&page=&pageSize=
  list: (params) => {
    const qs = new URLSearchParams(
      Object.entries(params).filter(([, v]) => v != null && v !== ""),
    ).toString();
    return request(`/products?${qs}`);
  },
  filters: () => request("/products/filters"),
  getBySlug: (slug) => request(`/products/${slug}`),
  getById: (id) => request(`/products/id/${id}`),
  getRelated: (slug) => request(`/products/${slug}/related`),
  create: (data) => request("/products", { method: "POST", body: data, auth: true }),
  update: (id, data) => request(`/products/${id}`, { method: "PUT", body: data, auth: true }),
  delete: (id) => request(`/products/${id}`, { method: "DELETE", auth: true }),
  adjustStock: (id, data) => request(`/products/${id}/adjust-stock`, { method: "POST", body: data, auth: true }),
};

export const cartApi = {
  get: () => request("/cart"),
  addItem: ({ productId, quantity }) =>
    request("/cart/items", { method: "POST", body: { productId, quantity } }),
  updateItem: (productId, quantity) =>
    request(`/cart/items/${productId}`, {
      method: "PATCH",
      body: { quantity },
    }),
  removeItem: (productId) =>
    request(`/cart/items/${productId}`, { method: "DELETE" }),
  clear: () => request("/cart", { method: "DELETE" }),
  applyCoupon: (code) =>
    request("/cart/coupon", { method: "POST", body: { code } }),
  removeCoupon: () => request("/cart/coupon", { method: "DELETE" }),
  merge: (items) =>
    request("/cart/merge", { method: "POST", body: { items }, auth: true }),
};

export const categoriesApi = {
  list: () => request("/categories"),
  getById: (id) => request(`/categories/${id}`),
  create: (data) => request("/categories", { method: "POST", body: data, auth: true }),
  update: (id, data) => request(`/categories/${id}`, { method: "PUT", body: data, auth: true }),
  delete: (id) => request(`/categories/${id}`, { method: "DELETE", auth: true }),
};

export const ordersApi = {
  list: (params = {}) => {
    const qs = new URLSearchParams(
      Object.entries(params).filter(([, v]) => v != null && v !== ""),
    ).toString();
    return request(`/orders?${qs}`, { auth: true });
  },
  getById: (id) => request(`/orders/${id}`, { auth: true }),
  create: (data) => request("/orders", { method: "POST", body: data }),
  updateStatus: (id, data) => request(`/orders/${id}/status`, { method: "PUT", body: data, auth: true }),
};

export const customersApi = {
  list: (params = {}) => {
    const qs = new URLSearchParams(
      Object.entries(params).filter(([, v]) => v != null && v !== ""),
    ).toString();
    return request(`/customers?${qs}`, { auth: true });
  },
  getById: (id) => request(`/customers/${id}`, { auth: true }),
};

export const notificationsApi = {
  list: (params = {}) => {
    const qs = new URLSearchParams(
      Object.entries(params).filter(([, v]) => v != null && v !== ""),
    ).toString();
    return request(`/notifications?${qs}`, { auth: true });
  },
  markRead: (id) => request(`/notifications/${id}/read`, { method: "PATCH", auth: true }),
  markAllRead: () => request(`/notifications/read-all`, { method: "POST", auth: true }),
};

export const uploadsApi = {
  uploadImage: async (file) => {
    // Note: This requires FormData, so we handle it specially instead of using request() directly for body
    const token = getAccessToken();
    const formData = new FormData();
    formData.append("image", file);
    
    const res = await fetch(`${API_BASE_URL}/uploads/single`, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    });
    
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Upload failed");
    return data;
  },
};