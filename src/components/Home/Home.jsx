"use client";
import React from "react";
import profilePic from "../../assets/profile.jpg";

const Home = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-[#eaeaeb] dark:bg-gray-900 px-10 overflow-hidden"
    >
      <div
        className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-white dark:bg-[#0b0b13] rounded-full transform translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      ></div>

      <div className="relative z-10 max-w-7xl w-full flex flex-col md:flex-row items-center justify-between pt-20 md:pt-0">
        <div className="text-left md:w-1/2 space-y-6">
          <h2 className="text-2xl text-[#0b0b13] dark:text-gray-300">
            Hello, I am
          </h2>

          <h1 className="text-5xl md:text-6xl font-extrabold text-black dark:text-white">
            <span className="text-[#0b0b13] dark:text-[#fff]">
              Syed Shah Nawaz{" "}
            </span>
          </h1>

          <h3 className="text-xl font-semibold text-[#0b0b13] dark:text-gray-200">
            I Am Passionate
          </h3>

          <p className="text-lg text-[#555555] dark:text-[#b2b2b5] max-w-md leading-relaxed">
            I design and develop services for customers of all sizes,
            specializing in creating stylish, modern websites, web services, and
            online stores.
          </p>

          <a
            href="https://www.upwork.com/freelancers/~0120e14e89f9d53c09"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-8 bg-[#2fbf71] hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg shadow-lg transition duration-300"
          >
            Upwork Profile
          </a>
        </div>
        <div className="hidden md:flex md:w-1/2 justify-center mt-10 md:mt-0">
          <div className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-green-500 flex items-center justify-center overflow-hidden shadow-lg">
            <img
              src={profilePic}
              alt="Syed Shah Nawaz "
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
