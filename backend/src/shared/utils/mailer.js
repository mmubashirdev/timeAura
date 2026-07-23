const nodemailer = require("nodemailer");
const dns = require("dns");
const env = require("../../../config/env");

dns.setDefaultResultOrder("ipv4first"); // fixes the ENETUNREACH you just hit

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: Number(env.SMTP_PORT),
  secure: true,
  auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
  connectionTimeout: 10_000,
  greetingTimeout: 10_000,
  socketTimeout: 10_000,
});

async function sendMail({ to, subject, html, text }) {
  return transporter.sendMail({
    from: env.EMAIL_FROM,
    to,
    subject,
    html,
    text,
  });
}

module.exports = { sendMail };
