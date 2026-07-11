const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

async function request(path, { method = "GET", body, headers = {} } = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    credentials: "include",
    headers: { "Content-Type": "application/json", ...headers },
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
  // POST /api/v1/auth/register  body: { name, email, password }
  register: ({ name, email, password }) =>
    request("/auth/register", {
      method: "POST",
      body: { name, email, password },
    }),

  // POST /api/v1/auth/login  body: { email, password }
  login: ({ email, password }) =>
    request("/auth/login", {
      method: "POST",
      body: { email, password },
    }),

  // POST /api/v1/auth/verify-email  body: { email, code }
  verifyEmail: ({ email, code }) =>
    request("/auth/verify-email", {
      method: "POST",
      body: { email, code },
    }),
};
