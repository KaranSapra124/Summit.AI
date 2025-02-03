import { Link, Outlet } from "react-router-dom";
import Container from "../Global/Container";
import { FaHome, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import Cards from "./Components/Dashboard/Cards";

const Dashboard = () => {
  const links = [
    {
      title: "Home",
      link: "/",
      icon: <FaHome />,
    },
    {
      title: "My Profile",
      link: "/my-profile",
      icon: <FaUser />,
    },
    {
      title: "Settings",
      link: "/settings",
      icon: <FaCog />,
    },
    {
      title: "Log Out",
      link: "/log-out",
      icon: <FaSignOutAlt />,
    },
  ];
  const aiTextSummarizerDashboardData = [
    {
      title: "Total Summaries Processed",
      value: 120,
      description: "Number of text summaries you have processed so far.",
      icon: "📝",
      status: "completed", // Can be 'completed', 'in-progress'
      color: "bg-green-500",
    },
    {
      title: "Summary Characters Count",
      value: "45,000/50,000",
      description:
        "Total number of characters processed against your usage limit.",
      icon: "🔠",
      status: "in-progress",
      color: "bg-yellow-500",
    },
    {
      title: "Remaining Summaries",
      value: 8,
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

  return (
    <Container
      className={` bg-gradient-to-tr from-black/60 via-gray-900/90 to-black/90  flex h-screen`}
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
            <p className="text-white py-4 font-bold">Karan Sapra</p>
          </div>
          <ul>
            {links?.map((elem, index) => {
              return (
                <Link
                  key={index}
                  className="flex gap-2 items-center text-white text-md p-1 shadow-sm w-40 bg-gray-100/10 rounded-md my-2"
                  to={elem?.link}
                >
                  {elem?.icon} <span>{elem?.title}</span>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
      {window.location.pathname.includes("/user") ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  mx-auto gap-4 p-4">
          {aiTextSummarizerDashboardData?.map((elem, index) => {
            return (
              <div
                key={index}
                className="bg-emerald-500 text-white p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center"
              >
                <Cards
                  title={elem?.title}
                  icon={elem?.icon}
                  value={elem?.value}
                />
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
