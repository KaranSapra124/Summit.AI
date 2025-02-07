import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Container from "../Global/Container";
import { FaHome, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import Cards from "./Components/Dashboard/Cards";
import { useContext, useEffect } from "react";
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

    // {
    //   title: "Log Out",
    //   link: "/user/log-out",
    //   icon: <FaSignOutAlt />,
    // },
  ];
  const aiTextSummarizerDashboardData = [
    {
      title: "Total Summaries Processed",
      value: 0,
      description: "Number of text summaries you have processed so far.",
      icon: "📝",
      status: "completed", // Can be 'completed', 'in-progress'
      color: "bg-green-500",
    },
    {
      title: "Summary Characters Count",
      value: 0,
      description:
        "Total number of characters processed against your usage limit.",
      icon: "🔠",
      status: "in-progress",
      color: "bg-yellow-500",
    },
    {
      title: "Remaining Summaries",
      value: 0,
      description:
        "Summaries you can still process with your current plan this month.",
      icon: "📊",
      status: "in-progress",
      color: "bg-blue-500",
    },
    {
      title: "Subscription Plan",
      value: "Premium",
      description:
        "You are currently subscribed to the Premium plan with no usage limits.",
      icon: "💳",
      status: "active", // Can be 'active', 'inactive'
      color: "bg-purple-500",
    },
    {
      title: "Account Status",
      value: "Active",
      description: "Your account is active and ready to use.",
      icon: "✅",
      status: "active",
      color: "bg-teal-500",
    },
    {
      title: "Upgrade Plan",
      value: "Not Upgraded",
      description:
        "Consider upgrading to unlock more features and higher usage limits.",
      icon: "⚡",
      status: "pending",
      color: "bg-gray-500",
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
      }   flex h-screen`}
    >
      <div>
        <div className="flex flex-col gap-5 w-fit p-2 ">
          <h2 className="text-emerald-500 text-3xl font-extrabold">
            Summit.AI
          </h2>
          <div className="flex flex-col gap-2">
            <img
              className="w-20 rounded-full"
              src="https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?t=st=1738491064~exp=1738494664~hmac=227c279bbb497e946449214b64803fb9dfe4435e29fee1c2f2ca296f3b892000&w=740"
              alt=""
            />
            <p
              className={`${
                theme === "Dark" ? "text-white" : "text-black"
              } py-4 font-bold`}
            >
              {name}
            </p>
          </div>
          <ul>
            {links?.map((elem, index) => {
              return (
                <Link
                  key={index}
                  className={`flex gap-2 items-center ${
                    theme === "Dark" ? "text-white" : "text-black"
                  } text-md p-1 shadow-sm w-40 bg-gray-100/10 rounded-md my-2`}
                  to={elem?.link}
                >
                  {elem?.icon} <span>{elem?.title}</span>
                </Link>
              );
            })}
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
      </div>
      {pathname === "/user" ? (
        <div
          // key={isChanged}
          className="grid sm:grid-cols-3 gap-4 h-fit mx-auto "
        >
          {aiTextSummarizerDashboardData?.map((elem, index) => {
            return (
              <div
                key={index}
                className={`${
                  theme === "Dark"
                    ? "text-white bg-emerald-500 "
                    : "text-black bg-gray-200 "
                } p-4 w-full rounded-2xl h-52 shadow-lg flex flex-col `}
              >
                <Cards title={elem?.title} value={elem?.value} />
              </div>
            );
          })}
        </div>
      ) : (
        <Outlet />
      )}
    </Container>
  );
};

export default Dashboard;
