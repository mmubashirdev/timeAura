const nodemailer = require("nodemailer");
const dns = require("dns");
const env = require("../../../config/env");

dns.setDefaultResultOrder("ipv4first"); // fixes the ENETUNREACH you just hit

const port = Number(env.SMTP_PORT) || 465;
const isGmail = env.SMTP_HOST?.toLowerCase().includes("gmail");

const transportOptions = isGmail
  ? {
      service: "gmail",
      auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
      family: 4,
      connectionTimeout: 20_000,
      greetingTimeout: 20_000,
      socketTimeout: 20_000,
    }
  : {
      host: env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
      family: 4,
      connectionTimeout: 20_000,
      greetingTimeout: 20_000,
      socketTimeout: 20_000,
    };

const transporter = nodemailer.createTransport(transportOptions);

async function sendMail({ to, subject, html, text }) {
  if (env.RESEND_API_KEY) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.EMAIL_FROM.includes("resend.dev") ? env.EMAIL_FROM : "Time Aura <onboarding@resend.dev>",
        to: [to],
        subject,
        html,
        text,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Resend API Error: ${response.status} ${JSON.stringify(errorData)}`);
    }

    return response.json();
  }

  return transporter.sendMail({
    from: env.EMAIL_FROM,
    to,
    subject,
    html,
    text,
  });
}

module.exports = { sendMail };
