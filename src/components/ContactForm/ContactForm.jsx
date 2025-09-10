"use client";
import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState(""); // 'success' | 'error' | 'sending'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    // Clear any previous status
    setStatus("");

    // Validate required fields
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus("Please fill all fields.");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setStatus("Please enter a valid email address.");
      return;
    }

    // Show sending status
    setStatus("Sending message...");
    setStatusType("sending");

    try {
      const res = await fetch(
        "http://localhost/personal-portfolio/send_email.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            message: message.trim(),
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setStatus(data.message || "Message sent successfully!");
        setStatusType("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus(data.error || "Failed to send message. Please try again.");
        setStatusType("error");
      }
    } catch (err) {
      console.error("Contact form error:", err);
      setStatus(
        "Network error. Please check your internet connection and try again."
      );
      setStatusType("error");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 bg-white dark:bg-[#0d0d0d] text-gray-900 dark:text-white">
      <div className="w-full max-w-md bg-white dark:bg-[#1a1a1a] border border-green-500 dark:border-green-500 p-8 rounded-lg">
        <h2 className="text-3xl font-bold text-center text-green-500 mb-6">
          Contact Me
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded bg-gray-50 dark:bg-black border border-green-500 text-gray-900 dark:text-white"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded bg-gray-50 dark:bg-black border border-green-500 text-gray-900 dark:text-white"
          />
          <textarea
            rows="5"
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded bg-gray-50 dark:bg-black border border-green-500 text-gray-900 dark:text-white"
          />

          {status && (
            <p
              className={`text-center text-sm ${
                statusType === "success"
                  ? "text-green-500"
                  : statusType === "sending"
                  ? "text-blue-400"
                  : "text-red-500"
              }`}
            >
              {status}
            </p>
          )}

          <button
            type="submit"
            className="btn w-full py-3 rounded-full bg-green-500 text-white font-semibold hover:shadow-lg dark:bg-green-500 dark:text-black"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
