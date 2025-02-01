// import React from 'react'

import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Navbar = () => {
  const navLinks: string[] = [
    "Home",
    "Features",
    "Pricing",
    "About Us",
    "Contact Us",
  ];
  return (
    <>
      <div className="flex  justify-center  m-0">
        <div className="flex z-50 py-2 fixed top-1  w-full  items-center  shadow-sm p-4 rounded-lg bg-gray-900 text-white font-semibold shadow-black max-w-screen-md justify-between">
          <h2 className="text-emerald-500 text-xl font-extrabold">SummIt.AI</h2>
          <div className="flex w-96 justify-between">
            {navLinks?.map((elem: string, index: number) => {
              return (
                <>
                  <li
                    key={index}
                    className="list-none hover:font-extrabold  transition-all duration-100 cursor-pointer "
                  >
                    {elem}
                  </li>
                </>
              );
            })}
          </div>
        </div>
      </div>
      <Outlet/>
      <Footer/>
    </>
  );
};

export default Navbar;
