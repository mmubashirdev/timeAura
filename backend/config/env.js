const { z } = require("zod");

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.string().default("5000"),
  DATABASE_URL: z.string().min(1),
  ACCESS_TOKEN_SECRET: z
    .string()
    .min(32, "ACCESS_TOKEN_SECRET must be at least 32 chars"),
  REFRESH_TOKEN_SECRET: z
    .string()
    .min(32, "REFRESH_TOKEN_SECRET must be at least 32 chars"),
  ACCESS_TOKEN_TTL: z.string().default("15m"),
  REFRESH_TOKEN_TTL: z.string().default("7d"),
  BCRYPT_SALT_ROUNDS: z.string().default("12"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables:");
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1); // crash on boot, not on the first request that needs the missing var
}

module.exports = parsed.data;
