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
    <footer className=" border-gray-500 bg-gradient-to-tr  from-black/60 via-gray-900/90 to-black/90 text-white py-8">
      <Container className="flex flex-col space-y-8 items-center justify-center md:justify-between md:flex-row py-8 px-6 max-w-screen-xl mx-auto">
        {/* Logo and App Name */}
        <div className="text-2xl font-bold text-center md:text-left">
          <span className="text-emerald-400 font-extrabold">Summit</span>
          <span className="text-emerald-400 font-extrabold">.AI</span>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-4 text-sm md:gap-6 md:text-base">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href="#"
              className="text-gray-300 hover:text-blue-500 transition-colors whitespace-nowrap"
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Social Media Links */}
        <div className="flex space-x-4 justify-center">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-blue-500 transition-colors text-xl"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </Container>
      <hr className="max-w-screen-xl mx-auto border-gray-600" />
      {/* Copyright Notice */}
      <div className="text-center text-gray-400 mt-6 text-sm px-4">
        &copy; {new Date().getFullYear()} Summit.AI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
