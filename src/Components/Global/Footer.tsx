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
    <footer className="bg-surface-low border-t border-white/5 text-white/70 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
             <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-linear-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <span className="text-white font-black text-sm">S</span>
                </div>
                <h2 className="text-xl font-black gradient-text tracking-tight uppercase">SummIt.AI</h2>
              </div>
              <p className="text-sm leading-relaxed text-white/50">
                Revolutionizing text summarization with advanced AI. Simple, fast, and high-quality results at your fingertips.
              </p>
          </div>

          {/* Quick Links */}
          <div className="md:ml-auto">
            <h3 className="text-white font-bold mb-6">Quick Links</h3>
            <nav className="flex flex-col gap-4 text-sm">
              {navLinks.slice(0, 3).map((link, index) => (
                <a key={index} href={`#${link}`} className="hover:text-primary-light transition-colors">
                  {link}
                </a>
              ))}
            </nav>
          </div>

          {/* Company */}
          <div className="md:ml-auto">
            <h3 className="text-white font-bold mb-6">Company</h3>
            <nav className="flex flex-col gap-4 text-sm">
              {navLinks.slice(3).map((link, index) => (
                <a key={index} href={`#${link}`} className="hover:text-primary-light transition-colors">
                  {link}
                </a>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div className="md:ml-auto">
            <h3 className="text-white font-bold mb-6">Connect</h3>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl glass flex items-center justify-center text-white/50 hover:text-white hover:border-primary-light/50 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-white/40">
          <p>&copy; {new Date().getFullYear()} Summit.AI. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
