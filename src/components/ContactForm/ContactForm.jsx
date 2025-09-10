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
        import.meta.env.VITE_CONTACT_FORM_URL || "/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add any additional headers your hosting provider requires
            // "Authorization": "Bearer your-api-key", // Uncomment if needed
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            message: message.trim(),
            // Add any additional fields your hosting provider requires
            // subject: "Contact Form Submission", // Uncomment if needed
            // website: window.location.hostname, // Uncomment if needed
          }),
        }
      );

      let data;
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        data = { message: await res.text() };
      }

      if (res.ok) {
        setStatus(data.message || "Message sent successfully!");
        setStatusType("success");
        setFormData({ name: "", email: "", message: "" });

        // Optional: Trigger analytics
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("event", "contact_form_submission", {
            event_category: "engagement",
            event_label: "success",
          });
        }
      } else {
        const errorMessage =
          data.error ||
          data.message ||
          "Failed to send message. Please try again.";
        setStatus(errorMessage);
        setStatusType("error");

        // Optional: Log error to console in development
        if (import.meta.env.DEV) {
          console.error("Contact form submission failed:", data);
        }
      }
    } catch (err) {
      console.error("Contact form error:", err);
      setStatus(
        "Unable to send message at this time. Please try again later or contact us directly."
      );
      setStatusType("error");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 xs:px-6 bg-white dark:bg-[#0d0d0d] text-gray-900 dark:text-white">
      <div className="w-full max-w-[90%] xs:max-w-md bg-white dark:bg-[#1a1a1a] border border-green-500 dark:border-green-500 p-6 xs:p-8 rounded-lg shadow-xl">
        <h2 className="text-2xl xs:text-3xl font-bold text-center text-green-500 mb-4 xs:mb-6">
          Contact Me
        </h2>
        <form className="space-y-4 xs:space-y-5" onSubmit={handleSubmit}>
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
