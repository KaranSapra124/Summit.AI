import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // Importing icons from react-icons
import JsCookie from "js-cookie";
const AdminDashboard = () => {
  const Navigate = useNavigate();
  interface linkType {
    title: string;
    link: string;
  }

  const links: linkType[] = [
    { title: "Dashboard", link: "/admin" },
    { title: "Users", link: "/admin/users" },
    { title: "Plans", link: "/admin/plans" },
    // { title: "Plans", link: "/admin/plans" },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!document.cookie.includes("adminToken")) {
      Navigate("/admin/login");
    }
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row bg-black/80 h-screen w-full text-center">
        {/* Sidebar */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } fixed md:relative top-0 left-0 z-50 md:block bg-gray-900 p-10 h-full w-64 transition-transform md:translate-x-0`}
        >
          <h1 className="text-xl font-bold text-emerald-500">Summit.AI</h1>
          <div className="my-4">
            <img
              className="w-20 mx-auto shadow-white shadow-sm rounded-full"
              src="https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg"
              alt="No Image"
            />
            <h2 className="text-white my-2 font-bold">Admin</h2>
          </div>
          <div className="flex flex-col gap-4">
            {links.map((elem, index: number) => (
              <Link
                className="text-white hover:bg-white hover:text-black transition-all shadow-white shadow w-full text-center font-semibold rounded-md p-2"
                to={elem.link}
                key={index}
                onClick={() => setIsMenuOpen(false)} // Close menu on link click
              >
                {elem.title}
              </Link>
            ))}
            <button
              onClick={() => {
                JsCookie.remove("adminToken");
                Navigate("/admin/login");
              }}
              className="bg-red-500 text-white font-bold p-2 rounded-sm hover:bg-red-600 transition-all cursor-pointer shadow-sm shadow-white"
            >
              Log Out
            </button>
          </div>
        </div>

        {/* Hamburger Button */}
        <button
          className="absolute top-4 left-4 z-50 md:hidden p-2 text-white bg-gray-900 rounded-md shadow-lg"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
