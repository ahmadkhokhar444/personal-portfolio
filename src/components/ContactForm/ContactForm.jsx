"use client";
import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    if (!name || !email || !message) {
      setStatus("Please fill all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("Please enter a valid email.");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost/personal-portfolio/send_email.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, message }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setStatus(data.message || "Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus(data.error || "Failed to send message.");
      }
    } catch (err) {
      console.error(err);
      setStatus("Something went wrong. Please try again later.");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 bg-[#0d0d0d] text-white">
      <div className="w-full max-w-md bg-[#1a1a1a] border border-green-500 p-8 rounded-lg">
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
            className="w-full px-4 py-3 rounded bg-black border border-green-500 text-white"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded bg-black border border-green-500 text-white"
          />
          <textarea
            rows="5"
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded bg-black border border-green-500 text-white"
          />

          {status && (
            <p className="text-center text-sm text-green-500">
              {status}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-green-500 text-white font-semibold hover:shadow-lg"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
