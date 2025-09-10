// components/Navbar/Navbar.jsx

import React, { useState, useEffect } from "react";
import profilePic from "../../assets/profile.jpg"; // Correct image import

// Hamburger Icon Component
const HamburgerIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

// Close Icon Component
const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("#home");
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "services", "portfolio"];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (
          element &&
          scrollPosition >= element.offsetTop &&
          scrollPosition < element.offsetTop + element.offsetHeight
        ) {
          setActiveSection(`#${section}`);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Hamburger Button (Mobile Only) */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md text-gray-800 dark:text-white bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm"
        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
      </button>

      {/* Navbar Container */}
      <div
        className={`fixed top-0 left-0 h-full bg-slate-100 dark:bg-[#0c0c14] p-8 flex flex-col justify-between overflow-y-hidden overflow-x-hidden z-40
                   transition-transform duration-300 ease-in-out
                   md:translate-x-0 md:w-72
                   ${
                     isMobileMenuOpen
                       ? "translate-x-0 w-[80%]"
                       : "-translate-x-full w-[80%]"
                   }
                  `}
      >
        {/* Profile Section */}
        <div className="relative">
          <div className="absolute -top-20 left-24 -translate-x-1/2 w-[360px] h-[170px] bg-[#2fbf71] rounded-b-full -z-10"></div>
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-white mt-8 mb-3">
              <img
                src={profilePic}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="profile-name mb-0 text-gray-900 dark:text-white">
              Syed Shah Nawaz
            </h2>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="mt-12 flex-1">
          <ul className="space-y-2">
            {["home", "about", "services", "portfolio"].map(
              (item, index, arr) => (
                <React.Fragment key={item}>
                  <li>
                    <a
                      href={`#${item}`}
                      onClick={handleLinkClick}
                      className={`nav-link flex items-center transform origin-left transition-all duration-300 ease-in-out text-gray-700 dark:text-white hover:text-[#2fbf71]
                    ${
                      activeSection === `#${item}`
                        ? "!text-[#2fbf71] scale-110"
                        : "scale-100"
                    }`}
                    >
                      <i
                        className={`ri-${
                          {
                            home: "home-4",
                            about: "user-3",
                            services: "briefcase-4",
                            portfolio: "folder-2",
                          }[item]
                        }-line text-xl`}
                      ></i>
                      <span className="nav-text">
                        {item.toUpperCase().replace("ABOUT", "ABOUT ME")}
                      </span>
                    </a>
                  </li>
                  {index < arr.length - 1 && (
                    <hr className="hr border-gray-300 dark:border-gray-700" />
                  )}
                </React.Fragment>
              )
            )}
          </ul>
        </nav>

        {/* Contact Me Button at Bottom */}
        <div className="mt-8">
          <a
            href="#contact"
            onClick={handleLinkClick}
            className="block w-full text-center bg-[#2fbf71] text-white py-2 px-4 rounded-xl shadow-md hover:bg-[#28a862] transition-all duration-300"
          >
            Contact Me
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
