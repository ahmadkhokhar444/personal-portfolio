import React from "react";
import { motion } from "framer-motion";

// Variants for the main container to orchestrate child animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Delay between each child animation
      when: "beforeChildren", // Parent animation finishes before children start
    },
  },
};

// Variants for individual items (headings and cards)
const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.8 }, // Start slightly scaled down and below
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring", // Add a spring-like feel
      damping: 10,
      stiffness: 100,
    },
  },
  hover: {
    scale: 1.05,
    x: 5,
    y: -5,
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
};

const Services = () => {
  return (
    <motion.div
      // Main container animation triggered when in view
      variants={containerVariants}
      initial="hidden"
      whileInView="visible" // Animate when this component comes into view
      viewport={{ once: true, amount: 0.3 }} // Only animate once, when 30% of the component is visible
      className="w-full min-h-screen flex flex-col items-center justify-center bg-[#f7f7ff] dark:bg-gray-800 text-center py-16 xs:py-20 sm:py-24"
    >
      <div className="w-full max-w-[90rem] mx-auto px-4 xs:px-6 sm:px-8 lg:px-12">
        <motion.h2
          variants={itemVariants} // Apply item variants
          className="text-3xl xs:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6"
        >
          What I Do?
        </motion.h2>

        <motion.p
          variants={itemVariants} // Apply item variants
          className="text-sm xs:text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-[90%] xs:max-w-md md:max-w-2xl mx-auto mb-12 sm:mb-16"
        >
          From custom development to performance optimization, I offer a
          complete range of services.
        </motion.p>

        <motion.div
          // This div groups the cards and uses staggerChildren from containerVariants
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {/* Each card now uses itemVariants for entry animation and cardHoverVariants for hover */}
          <motion.div
            variants={itemVariants}
            whileHover="hover"
            className="bg-[#f2f6fa] dark:bg-gray-900 p-6 sm:p-8 rounded-xl shadow-lg backdrop-blur-sm dark:backdrop-blur-sm dark:bg-opacity-50 cursor-pointer"
          >
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-[#0b0b13] dark:text-[#ffffff] mb-3 sm:mb-4">
              Web Development
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Building responsive, scalable, and modern websites from scratch.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover="hover"
            className="bg-[#f2f6fa] dark:bg-gray-900 p-6 sm:p-8 rounded-xl shadow-lg backdrop-blur-sm dark:backdrop-blur-sm dark:bg-opacity-50"
          >
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-[#0b0b13] dark:text-[#ffffff] mb-3 sm:mb-4">
              UI/UX Design
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Creating clean, intuitive, and user-friendly interface designs.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover="hover"
            className="bg-[#f2f6fa] dark:bg-gray-900 p-6 sm:p-8 rounded-xl shadow-lg backdrop-blur-sm dark:backdrop-blur-sm dark:bg-opacity-50"
          >
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-[#0b0b13] dark:text-[#ffffff] mb-3 sm:mb-4">
              E-commerce Solutions
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Developing powerful and scalable online stores that drive sales.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover="hover"
            className="bg-[#f2f6fa] dark:bg-gray-900 p-6 sm:p-8 rounded-xl shadow-lg backdrop-blur-sm dark:backdrop-blur-sm dark:bg-opacity-50"
          >
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-[#0b0b13] dark:text-[#ffffff] mb-3 sm:mb-4">
              SEO Optimization
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Boosting your website's visibility on search engines to attract
              more traffic.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover="hover"
            className="bg-[#f2f6fa] dark:bg-gray-900 p-6 sm:p-8 rounded-xl shadow-lg backdrop-blur-sm dark:backdrop-blur-sm dark:bg-opacity-50"
          >
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-[#0b0b13] dark:text-[#ffffff] mb-3 sm:mb-4">
              Consultation
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Providing expert strategy & guidance for your digital projects.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover="hover"
            className="bg-[#f2f6fa] dark:bg-gray-900 p-6 sm:p-8 rounded-xl shadow-lg backdrop-blur-sm dark:backdrop-blur-sm dark:bg-opacity-50"
          >
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-[#0b0b13] dark:text-[#ffffff] mb-3 sm:mb-4">
              Maintenance & Support
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Keeping your website secure, updated, and performing optimally.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Services;
