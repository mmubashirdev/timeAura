const nodemailer = require("nodemailer");
const dns = require("dns");
const env = require("../../../config/env");

dns.setDefaultResultOrder("ipv4first"); // fixes the ENETUNREACH you just hit

const port = Number(env.SMTP_PORT);
const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port,
  secure: port === 465, // true only for 465 (implicit TLS); false lets STARTTLS upgrade on 587
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
