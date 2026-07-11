// src/shared/utils/googleAuth.js
const { OAuth2Client } = require("google-auth-library");
const env = require("../../../config/env");
const { UnauthorizedError } = require("../errors/AppError");

const client = new OAuth2Client(env.GOOGLE_CLIENT_ID);

// Verifies the token's signature, audience, issuer, and expiry against
// Google's public keys — never trust a client-supplied payload without this.
async function verifyGoogleIdToken(idToken) {
  let ticket;
  try {
    ticket = await client.verifyIdToken({
      idToken,
      audience: env.GOOGLE_CLIENT_ID,
    });
  } catch {
    throw new UnauthorizedError("Invalid Google token");
  }

  const payload = ticket.getPayload();
  if (!payload) {
    throw new UnauthorizedError("Invalid Google token");
  }

  return {
    googleId: payload.sub,
    email: payload.email,
    emailVerified: payload.email_verified,
    name: payload.name,
  };
}

module.exports = { verifyGoogleIdToken };
