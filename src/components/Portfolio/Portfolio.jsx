// components/Portfolio/Portfolio.jsx

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

console.log("Portfolio component loaded");

// Import images properly from src/assets
import drupal from "../../assets/drupal.png";
import drupal2 from "../../assets/drupal(2).png";
import webApp from "../../assets/web-app.png";
import webApp2 from "../../assets/web-app(2).png";
import webApp3 from "../../assets/web-app3.png"; // Added
import ecommerce from "../../assets/ecommerce.png";
import ecommerce2 from "../../assets/ecommerce(2).png";
import companyWeb from "../../assets/company-web.png";
import wordpress from "../../assets/wordpress.png";
import wordpress2 from "../../assets/wordpress2.png";
import wordpress3 from "../../assets/wordpress3.png"; // Added
import shopify from "../../assets/shopify.png"; // Added

// --- Static Arrow Icon ---
const RightArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 12h16m-7-5l7 5-7 5"
    />
  </svg>
);

// --- Animated Button Component (unchanged) ---
const LivePreviewButton = ({ liveLink }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={liveLink}
      target="_blank"
      rel="noopener noreferrer"
      className="relative group inline-flex items-center gap-3 px-6 py-3 text-sm font-semibold text-gray-800 dark:text-gray-200"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.svg
            className="absolute inset-0 w-full h-full"
            width="100%"
            height="100%"
            fill="transparent"
          >
            <motion.rect
              width="100%"
              height="100%"
              rx="25"
              stroke="currentColor"
              strokeWidth="1.9"
              pathLength="1"
              strokeDasharray="0.5 0.5"
              initial={{ strokeDashoffset: 0.5 }}
              animate={{ strokeDashoffset: -0.5 }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.svg>
        )}
      </AnimatePresence>
      <span className="relative z-10">Live Preview</span>
      <div className="relative z-10 transition-transform duration-300 ease-in-out group-hover:translate-x-1">
        <RightArrowIcon />
      </div>
    </motion.a>
  );
};

// --- Project Data ---
const projects = [
  {
    id: 1,
    title: "Drupal School CMS",
    image: drupal,
    category: "Drupal",
    liveLink: "https://www.evansvilledayschool.org/",
  },
  {
    id: 2,
    title: "Drupal Events Project",
    image: drupal2,
    category: "Drupal",
    liveLink: "https://www.cvent.com/",
  },
  {
    id: 3,
    title: "Driving Web App",
    image: webApp,
    category: "Web Apps",
    liveLink: "https://www.omnitracs.com/",
  },
  {
    id: 4,
    title: "Ai Web App",
    image: webApp2,
    category: "Web Apps",
    liveLink: "https://www.atera.com/",
  },
  {
    id: 5,
    title: "E-commerce Store",
    image: ecommerce,
    category: "E-commerce Web",
    liveLink: "https://luxhijabs.com/",
  },
  {
    id: 6,
    title: "E-commerce Website",
    image: ecommerce2,
    category: "E-commerce Web",
    liveLink: "https://broadco.com.sa/",
  },
  {
    id: 7,
    title: "Company Website",
    image: companyWeb,
    category: "Company Websites",
    liveLink: "https://www.ohwetlands.org/",
  },
  {
    id: 8,
    title: "Wordpress Website",
    image: wordpress,
    category: "Wordpress/Shopify",
    liveLink: "https://www.adbrandmanagement.com/",
  },
  {
    id: 9,
    title: "Wordpress Website",
    image: wordpress2,
    category: "Wordpress/Shopify",
    liveLink: "https://myfloridagreen.com/",
  },
  {
    id: 10,
    title: "Wordpress Website",
    image: wordpress3, // New Image
    category: "Wordpress/Shopify",
    liveLink: "https://goprowildliferemoval.com/",
  },
  {
    id: 11,
    title: "Custom Boxes Website", // Renamed title for clarity based on image
    image: webApp3, // New Image
    category: "Web Apps",
    liveLink: "https://www.icustomboxes.com/",
  },
  {
    id: 13,
    title: "MAPAL Website", // Renamed title for clarity based on link
    image: shopify, // New Image
    category: "Company Websites",
    liveLink: "https://www.mapal.net/",
  },
];

// --- Filter Categories ---
const categories = [
  "All",
  "Web Apps",
  "E-commerce Web",
  "Company Websites",
  "Drupal",
  "Wordpress/Shopify",
];

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [showAll, setShowAll] = useState(false); // State to control showing all projects

  useEffect(() => {
    if (activeFilter === "All") {
      setFilteredProjects(projects);
    } else {
      const newFiltered = projects.filter((project) =>
        project.category.includes(activeFilter)
      );
      setFilteredProjects(newFiltered);
    }
    setShowAll(false); // Reset to show only 6 when filter changes
  }, [activeFilter]);

  // Determine which projects to display based on showAll state
  const displayedProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, 6);

  return (
    <div className="w-full box-border flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-center px-6 sm:px-12 py-24 sm:py-32 overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false, amount: 0.2 }}
        className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-12"
      >
        My Portfolio
      </motion.h2>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveFilter(category)}
            className={`relative px-1 py-2 text-sm sm:text-base font-medium transition-colors duration-300 ${
              activeFilter === category
                ? "text-green-500"
                : "text-gray-600 dark:text-gray-300 hover:text-green-500 hover:scale-105"
            }`}
          >
            {category}
            {activeFilter === category && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Portfolio Grid */}
      <motion.div
        layout // Enables layout animations for items entering/exiting
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl"
      >
        <AnimatePresence>
          {displayedProjects.map((project) => (
            <motion.div
              key={project.id}
              layout // Animate changes in size/position
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-slate-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg flex flex-col"
            >
              {/* Image */}
              <div className="w-full h-55 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Card Body (Title + Button below image) */}
              <div className="p-5 flex flex-col items-center justify-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {project.title}
                </h3>
                <LivePreviewButton liveLink={project.liveLink} />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Show More / Show Less Button */}
      {filteredProjects.length > 6 && ( // Only show button if there are more than 6 projects
        <div className="mt-10">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-3 bg-[#2fbf71] text-white rounded-xl shadow-md hover:bg-[#28a862] transition-all duration-300"
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
