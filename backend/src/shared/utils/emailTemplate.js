const env = require("../../../config/env");

function otpTemplate({ title, heading, message, code, footer }) {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
</head>

<body style="margin:0;padding:0;background:#fafafa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#fafafa;padding:40px 20px;">
<tr>
<td align="center">

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 16px rgba(128,0,32,0.08);">

<!-- Header -->
<tr>
<td style="background:linear-gradient(135deg, #800020 0%, #5c0016 100%);padding:48px 40px;text-align:center;">
<h1 style="margin:0;color:#ffffff;font-size:28px;letter-spacing:2px;font-weight:700;text-transform:uppercase;">Time Aura</h1>
<p style="margin:12px 0 0 0;color:#f0d9e0;font-size:14px;letter-spacing:0.5px;">Luxury Watches • Wallets • Perfumes</p>
</td>
</tr>

<!-- Content -->
<tr>
<td style="padding:48px 40px;">

<h2 style="margin:0 0 20px 0;font-size:24px;color:#1a1a1a;font-weight:600;">${heading}</h2>

<p style="font-size:15px;line-height:24px;color:#4a4a4a;margin:0 0 32px 0;">${message}</p>

<!-- OTP Code -->
<table width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td align="center" style="padding:32px 0;">
<table cellpadding="0" cellspacing="0" border="0" style="background:#f8f4f5;border:2px dashed #800020;border-radius:12px;padding:24px 40px;">
<tr>
<td align="center">
<div style="font-size:36px;font-weight:700;color:#800020;letter-spacing:8px;font-family:'Courier New',monospace;">${code}</div>
</td>
</tr>
</table>
</td>
</tr>
</table>

<p style="text-align:center;font-size:13px;color:#666666;margin:0 0 32px 0;">Valid for <strong>${env.OTP_TTL_MINUTES} minutes</strong></p>

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#fff7f9;border-left:4px solid #800020;border-radius:8px;padding:16px 20px;margin-bottom:32px;">
<tr>
<td>
<p style="margin:0;font-size:13px;color:#666666;line-height:20px;">${footer}</p>
</td>
</tr>
</table>

<p style="font-size:13px;color:#999999;line-height:20px;margin:0;">Questions? Contact our support team at <a href="mailto:timeaura.online@gmail.com" style="color:#800020;text-decoration:none;">timeaura.online@gmail.com</a></p>

</td>
</tr>

<!-- Footer -->
<tr>
<td style="background:#1a1a1a;padding:32px 40px;text-align:center;">
<p style="margin:0 0 8px 0;color:#ffffff;font-size:14px;font-weight:600;letter-spacing:1px;">TIME AURA</p>
<p style="margin:0 0 16px 0;font-size:12px;color:#999999;">Timeless Style. Precision You Trust.</p>
<p style="margin:0;font-size:11px;color:#666666;">© ${new Date().getFullYear()} Time Aura. All rights reserved.</p>
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;
}

// Plain text version for spam prevention
function otpPlainText({ heading, message, code, footer }) {
  return `
${heading}

${message}

Your verification code: ${code}

This code expires in ${env.OTP_TTL_MINUTES} minutes.

${footer}

---
TIME AURA
Timeless Style. Precision You Trust.

Questions? Reply to this email.
© ${new Date().getFullYear()} Time Aura. All rights reserved.
`;
}

module.exports = { otpTemplate, otpPlainText };
