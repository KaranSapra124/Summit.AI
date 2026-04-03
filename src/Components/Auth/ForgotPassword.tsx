import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = e.target;
        setEmail(value);
    };

    const handleSubmit = async () => {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/forgot-password`,
                { email: email },
                {
                    withCredentials: true,
                }
            );
            const { data } = res;
            toast.success(data?.message || "Password reset link sent!");
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to send reset link");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center radial-bg p-6 relative overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[120px] rounded-full -z-10" />
            
            <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
                <div className="glass p-8 md:p-10 rounded-[2.5rem] border-white/10 shadow-2xl text-center">
                    {/* Header */}
                    <div className="mb-10">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-linear-to-br from-primary to-secondary mb-4 shadow-lg shadow-primary/20">
                            <span className="text-white font-black text-xl">S</span>
                        </div>
                        <h1 className="text-3xl font-black text-white tracking-tight uppercase mb-2">
                            Forgot Password
                        </h1>
                        <p className="text-white/40 text-sm">
                            Enter your registered email and we'll send you a link to reset your password.
                        </p>
                    </div>

                    {/* Form */}
                    <div className="space-y-6">
                        <div className="group relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/30 group-focus-within:text-primary-light">
                                <FaEnvelope size={18} />
                            </div>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={handleChange}
                                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/5 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all font-inter"
                                placeholder="Email Address"
                            />
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="w-full py-4 rounded-2xl bg-linear-to-r from-primary to-secondary text-white font-black text-lg hover:glow-indigo transition-all duration-300 transform active:scale-95 shadow-xl shadow-primary/10"
                        >
                            Send Reset Link
                        </button>
                    </div>

                    {/* Back to Login */}
                    <div className="mt-10">
                        <Link
                            to="/login"
                            className="inline-flex items-center gap-2 text-sm text-primary-light font-black hover:underline"
                        >
                            <FaArrowLeft size={12} />
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
