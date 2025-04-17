import { useState } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import Footer from "./Footer";

const Navbar = () => {
  const navLinks: string[] = [
    "Home",
    "Features",
    "Pricing",
    "About Us",
    "Contact Us",
  ];
  const location = useLocation();
  const Navigate = useNavigate();
  const { hash } = location;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="m-0 w-full flex justify-center">
        <div className="flex z-50 py-2 fixed top-1 w-full items-center shadow-sm p-4 rounded-lg bg-gray-900 text-white font-semibold shadow-black max-w-screen-xl justify-between">
          <h2 className="text-emerald-500 text-xl font-extrabold">SummIt.AI</h2>
          {/* Hamburger Icon */}
          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
              {isOpen ? (
                <FaTimes className="text-2xl text-white" />
              ) : (
                <FaBars className="text-2xl text-white" />
              )}
            </button>
          </div>
          {/* Links */}
          <div
            className={`${
              isOpen ? "flex" : "hidden"
            } flex-col absolute top-16 left-0 w-full bg-gray-900  lg:flex lg:flex-row lg:items-center lg:gap-4 lg:w-auto lg:bg-transparent lg:static`}
          >
            {navLinks?.map((elem: string, index: number) => {
              return (
                <a
                  key={index}
                  href={`${elem.includes("Home") ? `/` : `#${elem}`}`}
                  className={`${
                    hash.includes(elem)
                      ? "text-emerald-500 font-extrabold"
                      : "text-white"
                  } list-none p-4 lg:p-0 text-center lg:text-left hover:font-extrabold transition-all duration-100 cursor-pointer`}
                  onClick={() => setIsOpen(false)} // Close menu on click
                >
                  {elem}
                </a>
              );
            })}
            <button
              className="bg-emerald-500 p-1 px-2 rounded-md shadow shadow-white lg:ml-4"
              onClick={() => {
                setIsOpen(false);
                Navigate("/Login");
              }}
            >
              Login
            </button>
          </div>
        </div>
      </div>
      <Outlet />
      <Footer />
    </>
  );
};

export default Navbar;
