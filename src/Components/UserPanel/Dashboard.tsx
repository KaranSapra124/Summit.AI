import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Container from "../Global/Container";
import { FaHome, FaUser, FaCog, FaSignOutAlt, FaBars } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Utils/UserContext";
import axios from "axios";
import { UserAction } from "../../Utils/UserReducer";
import Cookies from "js-cookie";
import { FaBook } from "react-icons/fa6";

const Dashboard = () => {
  interface UserContextType {
    theme: string;
    userData: object; // You can be more specific about this type if needed
    dispatch: React.Dispatch<UserAction>;
  }
  type userDetails = {
    name: string;
    email: string;
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false); // Hamburger menu state
  const links = [
    {
      title: "Home",
      link: "/user",
      icon: <FaHome />,
    },
    {
      title: "My Profile",
      link: "/user/profile",
      icon: <FaUser />,
    },
    {
      title: "Main Editor",
      link: "/user/main-interface",
      icon: <FaBook />,
    },
    {
      title: "Settings",
      link: "/user/settings",
      icon: <FaCog />,
    },
  ];

  const location = useLocation();
  const { pathname } = location;
  const context = useContext(UserContext);
  const { theme, userData, dispatch } = context as UserContextType;
  const { name } = userData as userDetails;
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/get-user`,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch({ type: "SET_USER", payload: res?.data?.user });
    };
    fetchUser();
  }, []);

  return (
    <Container
      className={`${
        theme === "Dark"
          ? "bg-gradient-to-tr from-black/60 via-gray-900/90 to-black/90"
          : "bg-gray-100"
      } flex h-screen`}
    >
      {/* Hamburger Menu */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-2xl p-2 bg-gray-800 text-white rounded-full"
        >
          <FaBars />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } fixed top-0 left-0 z-40 w-64 h-full bg-gray-800 text-white p-4 transform transition-transform duration-300 md:relative md:translate-x-0`}
      >
        <h2 className="text-emerald-500 text-3xl font-extrabold">Summit.AI</h2>
        <div className="flex flex-col gap-2 items-center mt-6">
          <img
            className="w-20 rounded-full"
            src="https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg"
            alt="User Avatar"
          />
          <p className="py-4 font-bold">{name}</p>
        </div>
        <ul>
          {links.map((elem, index) => (
            <Link
              key={index}
              className="flex gap-2 items-center text-md p-1 shadow-sm w-full bg-gray-700 rounded-md my-2 hover:bg-gray-600 transition-all"
              to={elem.link}
              onClick={() => setIsMenuOpen(false)} // Close menu after navigation
            >
              {elem.icon} <span>{elem.title}</span>
            </Link>
          ))}
          <div
            onClick={() => {
              Navigate("/login");
              Cookies.remove("userToken");
            }}
            className="flex gap-2 items-center bg-red-500 p-2 rounded-md text-white font-bold cursor-pointer hover:bg-red-600 transition-all"
          >
            <FaSignOutAlt />
            <span>Log Out</span>
          </div>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-0  p-4">
        {pathname === "/user" ? (
          <div className="grid sm:grid-cols-3 gap-4 h-fit mx-auto">
            {/* Dashboard Cards */}
            {/* Add your card rendering logic here */}
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </Container>
  );
};

export default Dashboard;
