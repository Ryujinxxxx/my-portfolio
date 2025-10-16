const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

// 🔐 Use Firebase config for credentials (set via CLI later)
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

exports.sendContactEmail = functions.https.onRequest((req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const { name, email, message } = req.body;

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: gmailEmail,
    subject: "📩 New Contact Form Submission",
    html: `
      <h2>You've got a new message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>
      <hr/>
      <p><small>Sent on ${new Date().toLocaleString()}</small></p>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Email send failed:", error);
      return res.status(500).send("Failed to send email.");
    }
    return res.status(200).send("Email sent successfully.");
  });
});
