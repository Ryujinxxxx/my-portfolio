// Next.js API route that sends contact messages via SMTP (nodemailer).
// Requires environment variables (see instructions below).

import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { name = "Visitor", email, message } = req.body || {};

  if (!email || !message) {
    return res.status(400).json({ error: "Missing required fields 'email' or 'message'." });
  }

  // Recommended: set these in production environment (Vercel/Netlify/etc.) or .env.local for local dev
  const SMTP_USER = process.env.SMTP_USER || "mfahmiebasri@gmail.com"; // e.g. your Gmail address
  const SMTP_PASS = process.env.SMTP_PASS || "ggmkgspcluzmnfjn"; // e.g. Gmail app password
  const TO_EMAIL = process.env.TO_EMAIL || "mfahmiebasri@gmail.com";

  if (!SMTP_USER || !SMTP_PASS) {
    console.error("SMTP credentials missing. Set SMTP_USER and SMTP_PASS in environment.");
    return res.status(500).json({ error: "Server email configuration is missing." });
  }

  // Use explicit SMTP settings (Gmail)
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"${name}" <${SMTP_USER}>`, // from must often match authenticated account; we set Reply-To below
    replyTo: email,
    to: TO_EMAIL,
    subject: `📩 Portfolio contact from ${name}`,
    html: `
      <h3>New message from portfolio contact form</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>From:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <div style="white-space:pre-wrap;">${String(message).replace(/</g, "&lt;")}</div>
      <hr/>
      <p style="font-size:12px;color:#666">Sent on ${new Date().toLocaleString()}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Error sending contact email:", err);
    return res.status(500).json({ error: "Failed to send email." });
  }
}