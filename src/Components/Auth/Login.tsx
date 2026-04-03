import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaShieldAlt, FaEnvelope, FaUser, FaGoogle, FaGithub } from "react-icons/fa";
import { UserContext } from "../../Utils/UserContext";
import { UserAction } from "../../Utils/UserReducer";
import jscookie from "js-cookie";
import { toast } from "react-toastify";

interface loginProps {
  isLogin: boolean;
}

const Login: React.FC<loginProps> = ({ isLogin }) => {
  interface UserContextType {
    theme: string;
    userData: object;
    dispatch: React.Dispatch<UserAction>;
  }

  const navigate = useNavigate();
  type UserType = {
    name: string;
    email: string;
    password: string;
  };

  const [user, setUser] = useState<UserType>({
    name: "",
    email: "",
    password: "",
  });

  const context = useContext(UserContext);
  const { dispatch } = context as UserContextType;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/login`,
        user,
        {
          withCredentials: true,
        }
      );

      dispatch({
        type: "SET_USER",
        payload:
          res?.data?.newUser !== undefined && res?.data?.newUser !== null
            ? res?.data?.newUser
            : res?.data?.exisitingUser,
      });
      
      toast.success(res?.data?.message);
      jscookie.set("userToken", res?.data?.token);
      
      if (res?.data?.message !== "Password Incorrect!") {
        navigate("/user");
      }
    } catch (error: any) {
        toast.error(error?.response?.data?.message || "Authentication failed");
    }
  };

  useEffect(() => {
    const cookie = document.cookie;
    if (cookie.includes("userToken") && !cookie.includes("userToken=undefined")) {
      navigate("/user");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center radial-bg p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 blur-[120px] rounded-full -z-10" />

      <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
        <div className="glass p-8 md:p-10 rounded-[2.5rem] border-white/10 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-10">
             <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-linear-to-br from-primary to-secondary mb-4 shadow-lg shadow-primary/20">
                <span className="text-white font-black text-xl">S</span>
             </div>
             <h1 className="text-3xl font-black text-white tracking-tight uppercase mb-2">
                {isLogin ? "Welcome Back" : "Join Summit.AI"}
             </h1>
             <p className="text-white/40 text-sm">
                {isLogin ? "Enter your credentials to access your account" : "Start your journey to smarter content processing"}
             </p>
          </div>

          {/* Form */}
          <div className="space-y-5">
             {!isLogin && (
               <div className="group relative">
                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/30 group-focus-within:text-primary-light">
                   <FaUser size={18} />
                 </div>
                 <input
                   type="text"
                   name="name"
                   onChange={handleChange}
                   className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/5 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                   placeholder="Your Name"
                 />
               </div>
             )}

             <div className="group relative">
               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/30 group-focus-within:text-primary-light">
                 <FaEnvelope size={18} />
               </div>
               <input
                 type="email"
                 name="email"
                 onChange={handleChange}
                 className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/5 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                 placeholder="Email Address"
               />
             </div>

             <div className="group relative">
               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/30 group-focus-within:text-primary-light">
                 <FaShieldAlt size={18} />
               </div>
               <input
                 type="password"
                 name="password"
                 onChange={handleChange}
                 className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/5 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                 placeholder="Password"
               />
             </div>

             {isLogin && (
               <div className="flex justify-end">
                 <Link 
                    to="/forgot-password" 
                    className="text-xs font-bold text-primary-light hover:text-white transition-colors"
                 >
                   Forgot Password?
                 </Link>
               </div>
             )}

             <button
               onClick={handleSubmit}
               className="w-full py-4 rounded-2xl bg-linear-to-r from-primary to-secondary text-white font-black text-lg hover:glow-indigo transition-all duration-300 transform active:scale-95 shadow-xl shadow-primary/10 mt-4"
             >
               {isLogin ? "Login Now" : "Create Account"}
             </button>
          </div>

          {/* Divider */}
          <div className="relative my-8">
             <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
             </div>
             <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-transparent px-2 text-white/20 font-bold tracking-widest leading-none">Or continue with</span>
             </div>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-4">
             <button className="flex items-center justify-center gap-2 py-3 rounded-2xl glass hover:bg-white/10 transition-all text-white/70 hover:text-white text-sm font-bold">
                <FaGoogle className="text-red-400" /> Google
             </button>
             <button className="flex items-center justify-center gap-2 py-3 rounded-2xl glass hover:bg-white/10 transition-all text-white/70 hover:text-white text-sm font-bold">
                <FaGithub /> GitHub
             </button>
          </div>

          {/* Footer Link */}
          <div className="mt-10 text-center">
            <p className="text-sm text-white/40">
              {isLogin ? "New to Summit.AI?" : "Already have an account?"}
              <Link
                to={isLogin ? "/register" : "/login"}
                className="ml-2 text-primary-light font-black hover:underline"
              >
                {isLogin ? "Create Account" : "Login Here"}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
