const bcrypt = require("bcrypt");
const env = require("../../../config/env");

const SALT_ROUNDS = parseInt(env.BCRYPT_SALT_ROUNDS, 10);

async function hash(plainText) {
  return bcrypt.hash(plainText, SALT_ROUNDS);
}

async function compare(plainText, hashedValue) {
  return bcrypt.compare(plainText, hashedValue);
}

module.exports = { hash, compare };
