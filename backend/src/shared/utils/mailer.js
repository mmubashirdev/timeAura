const nodemailer = require("nodemailer");
const env = require("../../../config/env");

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: Number(env.SMTP_PORT),
  secure: Number(env.SMTP_PORT) === 465,
  auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
});

async function sendMail({ to, subject, html, text }) {
  return transporter.sendMail({
    from: env.EMAIL_FROM,
    to,
    subject,
    html,
    text,
    // Helps some providers when clients show a plain-text fallback.
  });
}

module.exports = { sendMail };
