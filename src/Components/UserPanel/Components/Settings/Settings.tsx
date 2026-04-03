import { useContext, useState } from "react";
import Modal from "../../../Helper/Modal";
import { UserContext } from "../../../../Utils/UserContext";
import { UserAction } from "../../../../Utils/UserReducer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaLock, FaPalette, FaEnvelope, FaShieldAlt } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";

const Settings = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  
  interface UserContextType {
    theme: string;
    userData: object;
    dispatch: React.Dispatch<UserAction>;
  }
  
  const { theme, dispatch } = context as UserContextType;

  const [email, setEmail] = useState<string>("");
  const [isPass, setIsPass] = useState<boolean>(false);

  const sendOTP = async (email: string) => {
    try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/change-password/${email}`,
          {},
          {
            withCredentials: true,
          }
        );
        navigate("/user/otp-form", {
          state: res?.data?.OTP,
        });
    } catch (error) {
        console.error("Error sending OTP:", error);
    }
  };

  const passwordModal = (
    <div className="relative glass p-8 md:p-12 rounded-[2.5rem] border-white/10 shadow-2xl animate-in zoom-in duration-300 max-w-md w-full text-center">
        <header className="mb-8">
            <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-red-500/20">
                <FaLock className="text-red-400 text-2xl" />
            </div>
            <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">Security Check</h2>
            <p className="text-white/40 text-sm">Enter your registered email to receive a password reset code.</p>
        </header>

        <div className="space-y-6 mb-10">
            <div className="group relative">
               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/30 group-focus-within:text-primary-light">
                 <FaEnvelope size={18} />
               </div>
               <input
                 type="email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/5 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all font-inter"
                 placeholder="Email Address"
               />
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
             <button
              onClick={() => setIsPass(false)}
              className="py-4 rounded-2xl glass text-white font-bold hover:bg-white/10 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={() => sendOTP(email)}
              className="py-4 rounded-2xl bg-linear-to-r from-red-500 to-orange-500 text-white font-black hover:glow-red transition-all shadow-lg"
            >
              Send OTP
            </button>
        </div>

        <button
            onClick={() => setIsPass(false)}
            className="absolute top-6 right-6 w-10 h-10 glass rounded-full flex items-center justify-center text-white/50 hover:text-white transition-all"
        >
            <RxCross1 size={18} />
        </button>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {isPass && <Modal data={passwordModal} />}
      
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
          <header className="mb-12">
             <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Account <span className="gradient-text">Settings</span></h1>
             <p className="text-white/40 text-lg font-medium">Configure your account preferences and security options.</p>
          </header>

          <div className="space-y-8">
              {/* Security Section */}
              <section className="group glass p-8 md:p-10 rounded-[2.5rem] border-white/5 hover:bg-white/5 transition-all duration-500">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                      <div className="flex items-center gap-6">
                          <div className="w-16 h-16 bg-linear-to-br from-red-500/20 to-orange-500/10 rounded-2xl flex items-center justify-center border border-red-500/20">
                              <FaShieldAlt className="text-red-400 text-2xl" />
                          </div>
                          <div>
                              <h2 className="text-xl font-black text-white mb-1 uppercase tracking-tight">Login Credentials</h2>
                              <p className="text-white/30 text-sm font-medium italic">Update your password regularly to keep your account secure.</p>
                          </div>
                      </div>
                      <button
                        onClick={() => setIsPass(true)}
                        className="px-8 py-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 font-bold hover:bg-red-500 hover:text-white transition-all transform hover:scale-105 active:scale-95"
                      >
                        Change Password
                      </button>
                  </div>
              </section>

              {/* Personalization Section */}
              <section className="group glass p-8 md:p-10 rounded-[2.5rem] border-white/5 hover:bg-white/5 transition-all duration-500">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                      <div className="flex items-center gap-6">
                          <div className="w-16 h-16 bg-linear-to-br from-primary/20 to-secondary/10 rounded-2xl flex items-center justify-center border border-primary/20">
                              <FaPalette className="text-primary-light text-2xl" />
                          </div>
                          <div>
                              <h2 className="text-xl font-black text-white mb-1 uppercase tracking-tight">Visual Theme</h2>
                              <p className="text-white/30 text-sm font-medium italic">Switch between light and dark mode for your workspace.</p>
                          </div>
                      </div>
                      
                      <div className="flex items-center gap-4 py-3 px-6 glass rounded-2xl border-white/5">
                          <span className={`text-xs font-black uppercase tracking-widest ${theme === 'Light' ? 'text-white' : 'text-white/20'}`}>Light</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    dispatch({
                                        type: "SET_THEME",
                                        payload: isChecked ? "Dark" : "Light",
                                    });
                                }}
                                type="checkbox"
                                checked={theme === "Dark"}
                                className="sr-only peer"
                            />
                            <div className="w-14 h-8 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white/20 after:border-white/10 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary/50"></div>
                          </label>
                          <span className={`text-xs font-black uppercase tracking-widest ${theme === 'Dark' ? 'text-primary-light' : 'text-white/20'}`}>Dark</span>
                      </div>
                  </div>
              </section>
          </div>
          
          <footer className="mt-16 text-center">
              <p className="text-[10px] font-black text-white/10 uppercase tracking-[0.4em]">Summit.AI Control Panel v2.1.0</p>
          </footer>
      </div>
    </div>
  );
};

export default Settings;
