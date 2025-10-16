import React, { useState } from "react";
import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_xna84q5";
const TEMPLATE_TO_ME = "template_to_me_v4";
const TEMPLATE_REPLY = "template_auto_reply_v4";
const PUBLIC_KEY = "kPQtDDETESjIlwS93";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      sent_date: new Date().toLocaleString(),
    };

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_TO_ME, templateParams, PUBLIC_KEY);
      await emailjs.send(SERVICE_ID, TEMPLATE_REPLY, templateParams, PUBLIC_KEY);
      setStatus("✅ Message sent successfully!");
    } catch (error) {
      console.error("❌ Email send failed:", error);
      setStatus("Failed to send message. Try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
      <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required />
      <button type="submit">Send Message</button>
      <p>{status}</p>
    </form>
  );
}
