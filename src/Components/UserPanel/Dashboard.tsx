import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Container from "../Global/Container";
import { FaHome, FaUser, FaCog, FaSignOutAlt, FaBars } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Utils/UserContext";
import axios from "axios";
import { UserAction, userDataInterface } from "../../Utils/UserReducer";
import Cookies from "js-cookie";
import { FaBook } from "react-icons/fa6";
import Cards from "./Components/Dashboard/Cards";
import { toast } from "react-toastify";

const Dashboard = () => {
  interface UserContextType {
    theme: string;
    userData: object; // You can be more specific about this type if needed
    dispatch: React.Dispatch<UserAction>;
  }

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
  // const [isLoading, setIsLoading] = useState<Boolean>(false);
  const context = useContext(UserContext);
  const { theme, userData, dispatch } = context as UserContextType;
  const { name = "Guest", purchasePlan = { summariesPerDay: 0, name: "N/A" } } =
    userData as userDataInterface;
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

  const aiTextSummarizerDashboardData = [
    {
      title: "Theme",
      value: theme,
      description: "Number of text summaries you have processed so far.",
      icon: "📝",
      status: "completed", // Can be 'completed', 'in-progress'
      color: "bg-green-500",
    },
    {
      title: "Current Plan",
      value: purchasePlan?.name,
      description:
        "Total number of characters processed against your usage limit.",
      icon: "🔠",
      status: "in-progress",
      color: "bg-yellow-500",
    },
    {
      title: "Plan Total Usage",
      value:
        purchasePlan?.name === "Pro Plan"
          ? 50
          : purchasePlan?.name === "Free Plan"
          ? 5
          : 100,
      description:
        "Summaries you can still process with your current plan this month.",
      icon: "📊",
      status: "in-progress",
      color: "bg-blue-500",
    },
    {
      title: "Remaining Usage",
      value: purchasePlan?.summariesPerDay,
      description:
        "You are currently subscribed to the Premium plan with no usage limits.",
      icon: "💳",
      status: "active", // Can be 'active', 'inactive'
      color: "bg-purple-500",
    },
    {
      title: "Account Status",
      value: purchasePlan.summariesPerDay !== 0 ? "Active" : "InActive",
      description: "Your account is active and ready to use.",
      icon: "✅",
      status: "active",
      color: "bg-teal-500",
    },
    {
      title: "Plan Renewal",
      value: purchasePlan?.summariesPerDay !== 0 ? "Not Required" : "Required!",
      description:
        "Consider upgrading to unlock more features and higher usage limits.",
      icon: "⚡",
      status: "pending",
      color: "bg-gray-500",
    },
  ];

  return (
    <Container
      className={`${
        theme === "Dark"
          ? "bg-gradient-to-tr from-black/60 via-gray-900/90 to-black/90"
          : "bg-gray-100"
      } flex h-screen max-[600px]:h-screen`}
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
        } fixed top-0 left-0 z-40 w-64 h-full max-[600px]:bg-gray-800/95   text-white p-4 transform transition-transform duration-300 md:relative md:translate-x-0`}
      >
        <h2 className="text-emerald-500 text-3xl font-extrabold max-[600px]:text-center max-[600px]:text-xl">
          Summit.AI
        </h2>
        <div className="flex flex-col gap-2 items-center mt-6">
          <img
            className="w-20 max-[600px]:w-12 rounded-full"
            src="https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg"
            alt="User Avatar"
          />
          <p className="py-4 font-bold">{name}</p>
          {/* console.log(name,'VALUE') */}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 max-w-6xl max-[600px]:w-full max-[600px]:grid-cols-2 mx-auto">
            {aiTextSummarizerDashboardData?.map((elem, index) => (
              <div
                key={index}
                className={`${
                  theme === "Dark"
                    ? "text-white bg-emerald-600"
                    : "text-gray-800 bg-gray-100"
                } p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-start justify-between`}
              >
                <Cards title={elem?.title} value={elem?.value} />
              </div>
            ))}
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </Container>
  );
};

export default Dashboard;
