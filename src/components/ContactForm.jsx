import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !message) {
      setErrorMessage("Please include your email and a short message.");
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        setErrorMessage(errJson?.error || "Failed to send message. Try again later.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error("Contact submit error:", err);
      setErrorMessage("Network error. Please try again.");
      setStatus("error");
    } finally {
      // Optional: return to idle after a short delay
      setTimeout(() => setStatus("idle"), 3500);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md">
      <label className="block text-sm text-gray-300 mb-2">
        Name
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-sm text-white"
          placeholder="Your name (optional)"
        />
      </label>

      <label className="block text-sm text-gray-300 mb-2">
        Email *
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-sm text-white"
          placeholder="you@example.com"
          required
        />
      </label>

      <label className="block text-sm text-gray-300 mb-4">
        Message *
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-1 w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-sm text-white min-h-[110px]"
          placeholder="How can I help?"
          required
        />
      </label>

      {errorMessage && <p className="text-sm text-red-400 mb-3">{errorMessage}</p>}

      <div className="text-right">
        <button
          type="submit"
          disabled={status === "sending"}
          className={`inline-flex items-center gap-2 ${
            status === "sending" ? "bg-blue-500" : "bg-blue-600 hover:bg-blue-700"
          } text-white font-semibold py-2 px-4 rounded-md transition`}
        >
          {status === "sending" ? "Sending..." : status === "success" ? "Sent ✓" : "Send Message"}
        </button>
      </div>
    </form>
  );
}