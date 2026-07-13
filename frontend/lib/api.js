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
