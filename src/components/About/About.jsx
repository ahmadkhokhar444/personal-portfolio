// components/About/About.jsx

import React from "react";
import { motion } from "framer-motion"; // Import motion for animations

// Define animation variants for the container to orchestrate the children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // This will make each child animate 0.3s after the previous one
      delayChildren: 0.2, // A small delay before the first child starts animating
    },
  },
};

// Define animation variants for the individual text elements
const itemVariants = {
  hidden: { opacity: 0, y: 20 }, // Start invisible and slightly lower
  visible: {
    opacity: 1,
    y: 0, // Animate to full opacity and original position
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const About = () => {
  return (
    // Wrap the main div with motion and apply the container variants
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-center px-6 sm:px-12 pt-20 md:pt-0"
      variants={containerVariants}
      initial="hidden"
      // The parent 'AnimatedSection' will trigger this 'visible' state when it's in view
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }} // This ensures the animation can repeat
    >
      <motion.h2
        variants={itemVariants} // Apply the item animation
        className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-16"
      >
        About Me
      </motion.h2>

      <motion.h4
        variants={itemVariants} // Apply the item animation
        className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-6 break-words"
      >
        Expert Full Stack Web Developer
      </motion.h4>

      <motion.p
        variants={itemVariants} // Apply the item animation
        className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-md md:max-w-3xl"
      >
        My name is Syed Shah Nawaz. With 5+ years of dedicated experience and
        over 100+ successful projects, my specialization is clear: custom
        WordPress theme and plugin development.
      </motion.p>

      <motion.p
        variants={itemVariants} // Apply the item animation
        className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-md md:max-w-3xl mt-4"
      >
        My deep background in backend scripting and automation forms the
        foundation of my work. Instead of fighting with bloated page builders or
        modifying restrictive themes, I architect clean, efficient, and scalable
        code. This approach ensures your website is fast, secure, and does
        exactly what you need it to do, without compromise.
      </motion.p>
    </motion.div>
  );
};

export default About;
