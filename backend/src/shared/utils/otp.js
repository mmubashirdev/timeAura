const crypto = require("crypto");

function generateOtp() {
  // 6-digit numeric code, zero-padded
  return crypto.randomInt(0, 1_000_000).toString().padStart(6, "0");
}

function hashOtp(code) {
  return crypto.createHash("sha256").update(code).digest("hex");
}

function compareOtp(code, hash) {
  return hashOtp(code) === hash;
}

module.exports = { generateOtp, hashOtp, compareOtp };
