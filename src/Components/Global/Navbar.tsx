import { useState } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const navLinks = [
    { label: "Home", hash: "/" },
    { label: "Features", hash: "#features" },
    { label: "About", hash: "#about" },
    { label: "Benefits", hash: "#benefits" },
    { label: "Pricing", hash: "#pricing" },
    { label: "Contact", hash: "#contact" },
  ];
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname, hash } = location;

  const [isOpen, setIsOpen] = useState(false);

  const isActive = (linkHash: string) => {
    if (linkHash === "/") return pathname === "/" && !hash;
    return hash === linkHash;
  };

  return (
    <>
      <div className="w-full flex justify-center sticky top-0 z-50 px-4 py-4">
        <nav className="glass w-full max-w-7xl mx-auto rounded-3xl p-4 flex items-center justify-between border border-white/5 shadow-2xl backdrop-blur-2xl">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigate("/")}
          >
            <div className="w-12 h-12 bg-linear-to-br from-primary to-secondary rounded-[1rem] flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
              <span className="text-white font-black text-2xl tracking-tighter">S</span>
            </div>
            <div>
                <h2 className="text-2xl font-black gradient-text tracking-tighter uppercase leading-none">SummIt.AI</h2>
                <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em]">Horizon Intelligence</span>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((elem, index) => (
              <a
                key={index}
                href={elem.hash}
                className={`${
                  isActive(elem.hash)
                    ? "text-primary-light font-black"
                    : "text-white/40 font-bold hover:text-white"
                } transition-all duration-300 text-sm uppercase tracking-widest relative py-2 group`}
              >
                {elem.label}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-primary-light transition-all duration-300 ${isActive(elem.hash) ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              className="hidden lg:block px-8 py-3 rounded-2xl bg-linear-to-r from-primary to-secondary text-white font-black hover:glow-indigo transition-all duration-300 transform hover:scale-105 active:scale-95 uppercase tracking-widest text-[10px]"
              onClick={() => navigate("/login")}
            >
              Access Portal
            </button>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden w-12 h-12 glass rounded-2xl flex items-center justify-center text-white/70 hover:text-white transition-all shadow-lg"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-surface-base/98 backdrop-blur-3xl pt-32 px-10 flex flex-col gap-8 animate-in fade-in zoom-in duration-500">
             <div className="flex flex-col gap-6">
                {navLinks.map((elem, index) => (
                    <a
                        key={index}
                        href={elem.hash}
                        className="text-4xl font-black text-white italic hover:text-primary-light transition-colors uppercase tracking-tight"
                        onClick={() => setIsOpen(false)}
                    >
                        {elem.label}
                    </a>
                ))}
             </div>
             
             <button
               className="mt-10 py-6 rounded-3xl bg-linear-to-r from-primary to-secondary text-white text-xl font-black shadow-2xl shadow-primary/20 uppercase tracking-[0.2em]"
               onClick={() => {
                 setIsOpen(false);
                 navigate("/login");
               }}
             >
               Access Portal
             </button>
             
             <button 
               className="absolute top-10 right-10 w-16 h-16 glass rounded-[2rem] flex items-center justify-center text-white/70 shadow-2xl transition-transform active:scale-90"
               onClick={() => setIsOpen(false)}
             >
               <FaTimes size={24} />
             </button>

             <p className="mt-auto mb-10 text-center text-[10px] font-black text-white/10 uppercase tracking-[0.5em]">Summit Operations Suite v4.0</p>
          </div>
        )}
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
