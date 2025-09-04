// components/Services/Services.jsx

import React from "react";
import { motion } from "framer-motion";

// Animation variants (no changes needed here)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
};
const textItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const cardGridVariants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};
const cardItemVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const Services = () => {
  return (
    // --- UI CORRECTION IS HERE ---
    // 1. 'w-full': Ensures the section takes up 100% of its parent's width, no more.
    // 2. 'box-border': Makes sure padding is included inside the width, not added to it.
    // 3. 'overflow-hidden': A safeguard that clips any content that might overflow horizontally.
    <motion.div
      className="w-full box-border flex flex-col items-center justify-center bg-[#f7f7ff] dark:bg-gray-800 text-center px-6 sm:px-12 py-24 sm:py-32 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1 }}
    >
      <motion.h2
        variants={textItemVariants}
        className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
      >
        What I Do?
      </motion.h2>

      <motion.p
        variants={textItemVariants}
        className="text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-md md:max-w-2xl"
      >
        From custom development to performance optimization, I offer a complete
        range of services.
      </motion.p>

      {/* The grid is correctly constrained by its parent now */}
      <motion.div
        variants={cardGridVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 w-full max-w-6xl"
      >
        {/* Card 1 */}
        <motion.div
          variants={cardItemVariants}
          whileHover={{ scale: 1.05, y: -8 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-[#f9fafb] dark:bg-gray-900 p-8 rounded-xl shadow-lg"
        >
          <h3 className="text-xl md:text-2xl font-semibold text-[#0b0b13] dark:text-[#ffffff] mb-4">
            Web Development
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Building responsive, scalable, and modern websites from scratch.
          </p>
        </motion.div>

        {/* ... (The rest of your cards are the same) ... */}
        <motion.div
          variants={cardItemVariants}
          whileHover={{ scale: 1.05, y: -8 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-[#f9fafb] dark:bg-gray-900 p-8 rounded-xl shadow-lg"
        >
          <h3 className="text-xl md:text-2xl font-semibold text-[#0b0b13] dark:text-[#ffffff] mb-4">
            UI/UX Design
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Creating clean, intuitive, and user-friendly interface designs.
          </p>
        </motion.div>
        <motion.div
          variants={cardItemVariants}
          whileHover={{ scale: 1.05, y: -8 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-[#f9fafb] dark:bg-gray-900 p-8 rounded-xl shadow-lg"
        >
          <h3 className="text-xl md:text-2xl font-semibold text-[#0b0b13] dark:text-[#ffffff] mb-4">
            E-commerce Solutions
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Developing powerful and scalable online stores that drive sales.
          </p>
        </motion.div>
        <motion.div
          variants={cardItemVariants}
          whileHover={{ scale: 1.05, y: -8 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-[#f9fafb] dark:bg-gray-900 p-8 rounded-xl shadow-lg"
        >
          <h3 className="text-xl md:text-2xl font-semibold text-[#0b0b13] dark:text-[#ffffff] mb-4">
            SEO Optimization
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Boosting your website's visibility on search engines to attract more
            traffic.
          </p>
        </motion.div>
        <motion.div
          variants={cardItemVariants}
          whileHover={{ scale: 1.05, y: -8 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-[#f9fafb] dark:bg-gray-900 p-8 rounded-xl shadow-lg"
        >
          <h3 className="text-xl md:text-2xl font-semibold text-[#0b0b13] dark:text-[#ffffff] mb-4">
            Consultation
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Providing expert strategy & guidance for your digital projects.
          </p>
        </motion.div>
        <motion.div
          variants={cardItemVariants}
          whileHover={{ scale: 1.05, y: -6 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-[#f9fafb] dark:bg-gray-900 p-8 rounded-xl shadow-lg"
        >
          <h3 className="text-xl md:text-2xl font-semibold text-[#0b0b13] dark:text-[#ffffff] mb-4">
            Maintenance & Support
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Keeping your website secure, updated, and performing optimally.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Services;
