// import React from 'react'

import { useNavigate, Outlet, useLocation } from "react-router-dom";
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
  // console.log()
  return (
    <>
      <div className="m-0 w-full flex justify-center">
        <div className="flex z-50 py-2 fixed top-1  w-full   items-center   shadow-sm p-4 rounded-lg bg-gray-900 text-white font-semibold shadow-black max-w-screen-xl  justify-between">
          <h2 className="text-emerald-500 text-xl font-extrabold">SummIt.AI</h2>
          <div className="flex gap-4 justify-between">
            {navLinks?.map((elem: string, index: number) => {
              return (
                <>
                  <a
                    key={index}
                    href={`${elem.includes("Home") ? `/` : `#${elem}`}`}
                    className={`${
                      hash.includes(elem)
                        ? "text-emerald-500 font-extrabold"
                        : "text-white"
                    } list-none hover:font-extrabold  transition-all duration-100 cursor-pointer `}
                  >
                    {elem}
                  </a>
                </>
              );
            })}
            <button
              className="bg-emerald-500 p-1 px-2 rounded-md shadow shadow-white"
              onClick={() => Navigate("/Login")}
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
