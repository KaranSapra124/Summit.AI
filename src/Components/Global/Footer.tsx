import React from "react";
import Container from "./Container";
import { FaTwitter, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const navLinks: string[] = [
    "Home",
    "Features",
    "Pricing",
    "About Us",
    "Contact Us",
  ];

  const socialLinks = [
    { icon: <FaTwitter />, url: "https://twitter.com" },
    { icon: <FaLinkedin />, url: "https://linkedin.com" },
    { icon: <FaGithub />, url: "https://github.com" },
    { icon: <FaInstagram />, url: "https://instagram.com" },
  ];

  return (
    <footer className="bg-gradient-to-br border-t-2 border-gray-500   from-black/60 via-gray-900/90 to-black/90 text-white py-8">
      <Container className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0 py-10 px-12">
        {/* Logo and App Name */}
        <div className="text-2xl font-bold">
          <span className="text-emerald-400 font-extrabold ">Summit</span>
          <span className="text-emerald-400 font-extrabold ">.AI</span>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center space-x-6">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href="#"
              className="text-gray-300 hover:text-blue-500 transition-colors"
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Social Media Links */}
        <div className="flex space-x-4">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-blue-500 transition-colors"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </Container>
        <hr className="max-w-screen-xl mx-auto text-gray-500" />
      {/* Copyright Notice */}
      <div className="text-center text-gray-400 mt-6">
        &copy; {new Date().getFullYear()} Summit.AI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
