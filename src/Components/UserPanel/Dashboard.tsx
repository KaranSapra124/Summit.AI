import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaUser, FaCog, FaSignOutAlt, FaBars, FaBookReader } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Utils/UserContext";
import axios from "axios";
import { UserAction, userDataInterface } from "../../Utils/UserReducer";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const Dashboard = () => {
  interface UserContextType {
    theme: string;
    userData: object;
    dispatch: React.Dispatch<UserAction>;
  }

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const links = [
    {
      title: "Dashboard",
      link: "/user",
      icon: <FaHome size={18} />,
    },
    {
      title: "Profile",
      link: "/user/profile",
      icon: < FaUser size={18} />,
    },
    {
      title: "Main Interface",
      link: "/user/main-interface",
      icon: <FaBookReader size={18} />,
    },
    {
      title: "Settings",
      link: "/user/settings",
      icon: <FaCog size={18} />,
    },
  ];

  const location = useLocation();
  const { pathname } = location;
  const context = useContext(UserContext);
  const { theme, userData, dispatch } = context as UserContextType;
  const { name = "Guest", purchasePlan = { summariesPerDay: 0, name: "N/A" } } =
    userData as userDataInterface;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/get-user`,
          {},
          {
            withCredentials: true,
          }
        );
        dispatch({ type: "SET_USER", payload: res?.data?.user });
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [dispatch]);

  const dashboardStats = [
    {
      title: "Theme Mode",
      value: theme,
      icon: "🎨",
      color: "from-blue-500/20 to-indigo-500/10",
    },
    {
      title: "Active Plan",
      value: purchasePlan?.name,
      icon: "💎",
      color: "from-purple-500/20 to-pink-500/10",
    },
    {
      title: "Plan Limit",
      value: purchasePlan?.name === "Pro Plan" ? 50 : purchasePlan?.name === "Free Plan" ? 5 : 100,
      icon: "📈",
      color: "from-emerald-500/20 to-teal-500/10",
    },
    {
      title: "Remaining",
      value: purchasePlan?.summariesPerDay,
      icon: "🔋",
      color: "from-orange-500/20 to-amber-500/10",
    },
    {
      title: "Status",
      value: purchasePlan.summariesPerDay !== 0 ? "Active" : "Inactive",
      icon: "✅",
      color: "from-cyan-500/20 to-blue-500/10",
    },
    {
      title: "Renewal",
      value: purchasePlan?.summariesPerDay !== 0 ? "Not Required" : "Required",
      icon: "⚡",
      color: "from-indigo-500/20 to-violet-500/10",
    }
  ];

  const handleLogout = () => {
    Cookies.remove("userToken");
    toast.info("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-surface-base text-white overflow-hidden radial-bg">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden fixed top-6 left-6 z-50 p-3 glass rounded-2xl text-white/70 hover:text-white transition-all shadow-lg"
      >
        <FaBars size={20} />
      </button>

      {/* Sidebar */}
      <aside
        className={`${isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } fixed inset-y-0 left-0 z-40 w-72 glass border-r border-white/5 p-8 transition-transform duration-500 ease-in-out md:relative md:translate-x-0 flex flex-col`}
      >
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-linear-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="text-white font-black text-xl">S</span>
          </div>
          <h1 className="text-2xl font-black gradient-text tracking-tighter uppercase">SummIt.AI</h1>
        </div>

        <div className="mb-10 p-6 rounded-3xl bg-white/5 border border-white/5 flex flex-col items-center text-center">
          <div className="relative mb-4">
            <img
              className="w-20 h-20 rounded-[2rem] border-2 border-primary/20 p-1 object-cover"
              src="https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg"
              alt="User"
            />
            <div className="absolute bottom-0 right-0 w-5 h-5 bg-emerald-500 border-4 border-surface-container rounded-full" />
          </div>
          <h3 className="font-black text-lg text-white mb-1">{name}</h3>
          <p className="text-xs text-white/30 uppercase tracking-widest font-bold">Pro Member</p>
        </div>

        <nav className="flex-grow space-y-2">
          {links.map((elem, index) => (
            <Link
              key={index}
              to={elem.link}
              onClick={() => setIsMenuOpen(false)}
              className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${pathname === elem.link
                  ? "bg-linear-to-r from-primary to-secondary text-white shadow-lg shadow-primary/20"
                  : "text-white/40 hover:text-white hover:bg-white/5"
                }`}
            >
              <span className={`${pathname === elem.link ? "text-white" : "group-hover:text-primary-light"} transition-colors`}>
                {elem.icon}
              </span>
              <span className="font-bold text-sm">{elem.title}</span>
            </Link>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto flex items-center gap-4 px-6 py-4 rounded-2xl text-red-400 hover:bg-red-500/10 transition-all font-bold text-sm"
        >
          <FaSignOutAlt />
          <span>Log Out</span>
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-6 md:p-12 relative">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-white mb-2">
              Welcome back, <span className="gradient-text">{name}</span>
            </h1>
            <p className="text-white/40 text-sm font-medium">Here's what's happening with your summaries today.</p>
          </div>
          <div className="flex items-center gap-4 px-6 py-3 glass rounded-2xl border-white/5">
            <div className="text-right">
              <p className="text-[10px] text-white/30 uppercase font-black tracking-widest">Server Speed</p>
              <p className="text-xs font-bold text-emerald-400">99.9% Optimal</p>
            </div>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          </div>
        </header>

        <div className="max-w-7xl mx-auto">
          {pathname === "/user" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
              {dashboardStats.map((stat, index) => (
                <div
                  key={index}
                  className={`group relative p-8 rounded-[2.5rem] glass hover:glass-glow transition-all duration-500 transform hover:-translate-y-2`}
                >
                  <div className={`absolute inset-0 bg-linear-to-br ${stat.color} opacity-0 group-hover:opacity-100 rounded-[2.5rem] transition-opacity duration-500 -z-10`} />

                  <div className="flex justify-between items-start mb-6">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-black text-white/20 uppercase tracking-widest">{stat.title}</span>
                      <h3 className="text-3xl font-black text-white group-hover:text-primary-light transition-colors">{stat.value}</h3>
                    </div>
                    <span className="text-4xl filter grayscale group-hover:grayscale-0 transition-all duration-500">{stat.icon}</span>
                  </div>

                  <div className="h-1 w-12 bg-white/5 rounded-full group-hover:w-full group-hover:bg-primary/30 transition-all duration-500" />
                </div>
              ))}
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
