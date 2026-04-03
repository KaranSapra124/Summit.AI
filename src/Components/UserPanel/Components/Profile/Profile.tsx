import { FaEdit, FaUserCircle, FaEnvelope, FaIdCard, FaChartBar, FaCalendarCheck } from "react-icons/fa";
import { useContext, useState } from "react";
import Modal from "../../../Helper/Modal";
import { UserContext } from "../../../../Utils/UserContext";
import {
  UserContextType,
  userDataInterface,
} from "../../../../Utils/UserReducer";
import axios from "axios";
import { RxCross1 } from "react-icons/rx";

interface profileDetails {
  name: string;
  email: string;
}

function Profile() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const context = useContext(UserContext);
  const { userData, dispatch } = context as UserContextType;
  const { name, email, purchasePlan } = userData as userDataInterface;

  const [details, setDetails] = useState<profileDetails>({
    name: name || "User",
    email: email || "user@example.com",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (name: string, email: string) => {
    try {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/update-profile`,
          { name, email },
          { withCredentials: true }
        );
        await fetchUser();
    } catch (error) {
        console.error("Error updating profile:", error);
    }
  };

  const fetchUser = async () => {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/get-user`,
      {},
      { withCredentials: true }
    );
    dispatch({ type: "SET_USER", payload: res?.data?.user });
  };

  const profileModalData = (
    <div className="relative glass p-8 md:p-12 rounded-[2.5rem] border-white/10 shadow-2xl animate-in zoom-in duration-300 max-w-md w-full text-center">
        <header className="mb-8">
            <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">Update <span className="gradient-text">Profile</span></h2>
            <p className="text-white/40 text-sm italic">Keep your credentials up to date.</p>
        </header>

        <div className="space-y-6 mb-10">
            <div className="group relative">
               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/30 group-focus-within:text-primary-light">
                 <FaUserCircle size={18} />
               </div>
               <input
                 type="text"
                 name="name"
                 value={details.name}
                 onChange={handleChange}
                 className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/5 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                 placeholder="Full Name"
               />
            </div>

            <div className="group relative">
               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/30 group-focus-within:text-primary-light">
                 <FaEnvelope size={18} />
               </div>
               <input
                 type="email"
                 name="email"
                 value={details.email}
                 onChange={handleChange}
                 className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/5 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all font-inter"
                 placeholder="Email Address"
               />
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
             <button
              onClick={() => setIsOpen(false)}
              className="py-4 rounded-2xl glass text-white font-bold hover:bg-white/10 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                await handleSubmit(details.name, details.email);
                setIsOpen(false);
              }}
              className="py-4 rounded-2xl bg-linear-to-r from-primary to-secondary text-white font-black hover:glow-indigo transition-all shadow-lg"
            >
              Save Changes
            </button>
        </div>

        <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 w-10 h-10 glass rounded-full flex items-center justify-center text-white/50 hover:text-white transition-all font-bold"
        >
            <RxCross1 size={18} />
        </button>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto py-8">
      {isOpen && <Modal data={profileModalData} />}
      
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
          <header className="mb-12">
             <h1 className="text-4xl md:text-5xl font-black text-white mb-4">My <span className="gradient-text">Profile</span></h1>
             <p className="text-white/40 text-lg font-medium">Manage your personal settings and subscription details.</p>
          </header>

          <div className="relative glass p-8 md:p-12 rounded-[3.5rem] border-white/5 flex flex-col md:flex-row items-center gap-12 mb-12 shadow-2xl overflow-hidden">
             {/* Backdrop Effect */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full -z-10" />

             <div className="relative group">
                <img
                    className="w-32 h-32 md:w-44 md:h-44 rounded-[3rem] border-4 border-white/5 p-2 object-cover shadow-2xl transition-transform duration-500 group-hover:scale-105"
                    src="https://i.pinimg.com/236x/cd/4b/d9/cd4bd9b0ea2807611ba3a67c331bff0b.jpg"
                    alt="User"
                />
                <button 
                    onClick={() => setIsOpen(true)}
                    className="absolute -bottom-2 -right-2 w-12 h-12 bg-linear-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-white shadow-xl hover:glow-indigo transition-all transform hover:scale-110 active:scale-95"
                >
                    <FaEdit size={20} />
                </button>
             </div>

             <div className="flex-grow space-y-6">
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-widest flex items-center gap-2">
                        <FaIdCard className="text-primary-light" /> Full Identity
                    </span>
                    <h2 className="text-3xl font-black text-white tracking-tight">{name}</h2>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-widest flex items-center gap-2">
                        <FaEnvelope className="text-secondary" /> Secure Email
                    </span>
                    <p className="text-xl font-bold text-white/60">{email}</p>
                </div>
             </div>
          </div>

          <div className="space-y-6">
             <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black text-white px-2">Subscription <span className="gradient-text">Overview</span></h3>
                <div className="h-px flex-grow mx-8 bg-white/5" />
             </div>

            {purchasePlan ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="group p-8 rounded-[2.5rem] glass hover:bg-white/5 transition-all text-center">
                    <FaChartBar className="text-3xl text-primary-light mx-auto mb-4 grayscale group-hover:grayscale-0 transition-all duration-500" />
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-widest block mb-2">Plan Name</span>
                    <p className="text-2xl font-black text-white group-hover:text-primary-light transition-colors">{purchasePlan.name}</p>
                </div>

                <div className="group p-8 rounded-[2.5rem] glass hover:bg-white/5 transition-all text-center">
                    <FaCalendarCheck className="text-3xl text-secondary mx-auto mb-4 grayscale group-hover:grayscale-0 transition-all duration-500" />
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-widest block mb-2">Max Summaries</span>
                    <p className="text-2xl font-black text-white group-hover:text-secondary transition-colors">
                      {purchasePlan.name === "Pro Plan" ? 50 : purchasePlan.name === "Free Plan" ? 5 : 100}
                    </p>
                </div>

                <div className="group p-8 rounded-[2.5rem] glass hover:bg-white/5 transition-all text-center border-emerald-500/10 hover:border-emerald-500/30">
                    <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                    </div>
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-widest block mb-2">Daily Usage</span>
                    <p className="text-2xl font-black text-emerald-400">{purchasePlan.summariesPerDay}</p>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center glass rounded-[3rem] border border-white/5">
                <p className="text-white/30 font-bold italic tracking-wide lowercase">Subscription data unavailable or no active plan found.</p>
              </div>
            )}
          </div>
      </div>
    </div>
  );
}

export default Profile;
