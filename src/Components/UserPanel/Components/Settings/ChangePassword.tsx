import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaLock, FaCheckCircle, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password || !confirmPassword) {
        return toast.error("Please fill in both password fields");
    }
    
    if (password !== confirmPassword) {
        return toast.error("Passwords do not match!");
    }

    setIsLoading(true);
    try {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/alter-password`,
          { password: password },
          {
            withCredentials: true,
          }
        );
        toast.success("Password changed successfully!");
        navigate("/user");
    } catch (err) {
        toast.error("Failed to change password. Please try again.");
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="glass p-10 md:p-14 rounded-[3.5rem] border-white/5 shadow-2xl max-w-lg w-full text-center animate-in zoom-in duration-500">
        <header className="mb-12">
            <div className="w-16 h-16 bg-linear-to-br from-emerald-500/20 to-teal-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-emerald-500/20 shadow-xl shadow-emerald-500/10">
                <FaLock className="text-emerald-400 text-2xl" />
            </div>
            <h1 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">Security <span className="gradient-text">Protocol</span></h1>
            <p className="text-white/40 text-sm font-medium">Update your account with a new secure password.</p>
        </header>

        <form className="space-y-6 mb-10" onSubmit={handleSubmit}>
          <div className="group relative">
               <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-white/30 group-focus-within:text-emerald-400 transition-colors">
                 <FaLock size={18} />
               </div>
               <input
                 autoFocus
                 type="password"
                 onChange={(e) => setPassword(e.target.value)}
                 className="w-full pl-14 pr-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/10 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all font-inter"
                 placeholder="Enter New Password"
               />
          </div>

          <div className="group relative">
               <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-white/30 group-focus-within:text-emerald-400 transition-colors">
                 <FaCheckCircle size={18} />
               </div>
               <input
                 type="password"
                 onChange={(e) => setConfirmPassword(e.target.value)}
                 className="w-full pl-14 pr-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/10 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all font-inter"
                 placeholder="Confirm New Password"
               />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-6 rounded-2xl bg-linear-to-r from-emerald-500 to-teal-500 text-white font-black text-xl hover:glow-emerald transition-all transform active:scale-95 shadow-xl shadow-emerald-500/10 flex items-center justify-center gap-3"
          >
            {isLoading ? (
                <>
                    <FaSpinner className="animate-spin" />
                    <span>Updating...</span>
                </>
            ) : "Update Password"}
          </button>
        </form>

        <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.2em]">Secure Encryption Layer Active</p>
      </div>
    </div>
  );
};

export default ChangePassword;
