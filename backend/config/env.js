const { z } = require("zod");

// config/env.js
const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.string().default("5000"),
  DATABASE_URL: z.string().min(1),
  ACCESS_TOKEN_SECRET: z.string().min(32),
  REFRESH_TOKEN_SECRET: z.string().min(32),
  ACCESS_TOKEN_TTL: z.string().default("15m"),
  REFRESH_TOKEN_TTL: z.string().default("7d"),
  BCRYPT_SALT_ROUNDS: z.string().default("12"),
  SMTP_HOST: z.string().min(1),
  SMTP_PORT: z.string().default("587"),
  SMTP_USER: z.string().min(1),
  SMTP_PASS: z.string().min(1),
  EMAIL_FROM: z.string().default("'Time Aura' <${env.SMTP_USER}>"),
  OTP_TTL_MINUTES: z.string().default("10"),
  OTP_MAX_ATTEMPTS: z.string().default("5"),
  GOOGLE_CLIENT_ID: z.string().min(1), // Web client ID from Google Cloud Console
});
const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables:");
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1); // crash on boot, not on the first request that needs the missing var
}

module.exports = parsed.data;
