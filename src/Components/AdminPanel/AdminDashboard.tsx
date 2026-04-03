import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaBars, FaTimes, FaUsers, FaChartLine, FaCogs, FaSignOutAlt, FaShieldAlt } from "react-icons/fa";
import JsCookie from "js-cookie";

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  interface linkType {
    title: string;
    link: string;
    icon: JSX.Element;
  }

  const links: linkType[] = [
    { title: "Overview", link: "/admin", icon: <FaChartLine size={18} /> },
    { title: "User Management", link: "/admin/users", icon: <FaUsers size={18} /> },
    { title: "Plan Configuration", link: "/admin/plans", icon: <FaCogs size={18} /> },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!document.cookie.includes("adminToken")) {
      navigate("/admin/login");
    }
  }, [navigate]);

  return (
    <div className="flex h-screen bg-surface-base text-white overflow-hidden radial-bg-admin">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden fixed top-6 right-6 z-50 p-3 glass rounded-2xl text-white/70 hover:text-white transition-all shadow-lg"
      >
        {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Admin Sidebar */}
      <aside
        className={`${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-40 w-72 glass border-r border-white/5 p-8 transition-transform duration-500 ease-in-out md:relative md:translate-x-0 flex flex-col`}
      >
        <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-linear-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <FaShieldAlt className="text-white text-xl" />
            </div>
            <div>
                <h1 className="text-2xl font-black gradient-text-emerald tracking-tighter uppercase leading-none">SummIt</h1>
                <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Admin Suite</span>
            </div>
        </div>

        <div className="mb-10 p-6 rounded-3xl bg-white/5 border border-white/5 flex flex-col items-center text-center group">
            <div className="relative mb-4">
                <div className="w-20 h-20 rounded-[2rem] border-2 border-emerald-500/20 p-1 object-cover overflow-hidden bg-gradient-to-br from-gray-800 to-black">
                     <img
                        className="w-full h-full object-cover rounded-[1.8rem] opacity-80 group-hover:opacity-100 transition-opacity"
                        src="https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg"
                        alt="Admin"
                    />
                </div>
                <div className="absolute bottom-0 right-0 w-5 h-5 bg-emerald-500 border-4 border-surface-container rounded-full animate-pulse" />
            </div>
            <h3 className="font-black text-lg text-white mb-1">System Master</h3>
            <div className="px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                <p className="text-[8px] text-emerald-400 uppercase tracking-widest font-black">Authorized Admin</p>
            </div>
        </div>

        <nav className="flex-grow space-y-2">
          {links.map((elem, index) => (
            <Link
              key={index}
              to={elem.link}
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-4 px-6 py-4 rounded-2xl text-white/40 hover:text-white hover:bg-white/5 transition-all duration-300 group"
            >
              <span className="group-hover:text-emerald-400 transition-colors">
                {elem.icon}
              </span>
              <span className="font-bold text-sm">{elem.title}</span>
            </Link>
          ))}
        </nav>

        <button
          onClick={() => {
                JsCookie.remove("adminToken");
                navigate("/admin/login");
          }}
          className="mt-auto flex items-center gap-4 px-6 py-4 rounded-2xl text-red-400 hover:bg-red-500/10 transition-all font-bold text-sm"
        >
          <FaSignOutAlt />
          <span>Exit Suite</span>
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-6 md:p-12 relative">
          <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
