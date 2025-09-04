// App.jsx

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Services from "./components/Services/Services.jsx";
import Portfolio from "./components/Portfolio/Portfolio.jsx";
import ContactForm from "./components/ContactForm/ContactForm.jsx";

// --- REUSABLE ANIMATED SECTION COMPONENT ---
const AnimatedSection = ({ children, id }) => {
  const ref = useRef(null);
  // --- THE ONLY CHANGE IS HERE: 'once: true' has been removed ---
  // Now, the animation will trigger every time the section enters the viewport.
  const isInView = useInView(ref, { amount: 0.2 });

  return (
    <section ref={ref} id={id}>
      <motion.div
        initial={{ opacity: 0, y: 75 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 75 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </section>
  );
};

// Icons (no change)
const SunIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-white"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    dark-stroke="[#111827]"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);
const MoonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-white"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    />
  </svg>
);

function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark"
  );
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex bg-white dark:bg-[#111827]">
      <Navbar />

      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 z-50 p-3 rounded-full bg-gray-800 shadow-lg hover:scale-110 transition-transform duration-200"
        aria-label="Toggle theme"
      >
        {theme === "light" ? <MoonIcon /> : <SunIcon />}
      </button>

      <main className="ml-0 md:ml-72 w-full">
        <div id="home">
          <Home />
        </div>

        <AnimatedSection id="about">
          <About />
        </AnimatedSection>

        <AnimatedSection id="services">
          <Services />
        </AnimatedSection>

        <AnimatedSection id="portfolio">
          <Portfolio />
        </AnimatedSection>

        <AnimatedSection id="contact">
          <ContactForm />
        </AnimatedSection>
        {/* Remember to wrap your other sections in <AnimatedSection> as well! */}
      </main>
    </div>
  );
}

export default App;
