import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaLock, FaCheckCircle } from 'react-icons/fa';

interface formDataInterface {
    email: string | null;
    token: string | null;
    newPassword: string | null;
    confirmPassword: string | null;
}

const ResetPassword: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<formDataInterface>({
        email: searchParams?.get("email"),
        token: searchParams?.get("token"),
        newPassword: "",
        confirmPassword: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        if (!formData.newPassword || !formData.confirmPassword) {
            return toast.error("Please fill in all fields");
        }
        if (formData.newPassword !== formData.confirmPassword) {
            return toast.error("Passwords do not match!");
        }

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/reset-password`,
                formData,
                {
                    withCredentials: true,
                }
            );
            const { data } = res;
            toast.success(data?.message || "Password reset successful!");
            navigate("/login");
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to reset password");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center radial-bg p-6 relative overflow-hidden">
             {/* Background Orbs */}
             <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full -z-10" />
             
            <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
                <div className="glass p-8 md:p-10 rounded-[2.5rem] border-white/10 shadow-2xl text-center">
                    {/* Header */}
                    <div className="mb-10">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-linear-to-br from-primary to-secondary mb-4 shadow-lg shadow-primary/20">
                            <span className="text-white font-black text-xl">S</span>
                        </div>
                        <h1 className="text-3xl font-black text-white tracking-tight uppercase mb-2">
                            Reset Password
                        </h1>
                        <p className="text-white/40 text-sm">
                            Create a new secure password for your Summit.AI account.
                        </p>
                    </div>

                    {/* Form */}
                    <div className="space-y-6">
                        <div className="group relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/30 group-focus-within:text-primary-light">
                                <FaLock size={18} />
                            </div>
                            <input
                                type="password"
                                name="newPassword"
                                onChange={handleChange}
                                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/5 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all font-inter"
                                placeholder="New Password"
                            />
                        </div>

                        <div className="group relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/30 group-focus-within:text-primary-light">
                                <FaCheckCircle size={18} />
                            </div>
                            <input
                                type="password"
                                name="confirmPassword"
                                onChange={handleChange}
                                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/5 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all font-inter"
                                placeholder="Confirm New Password"
                            />
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="w-full py-4 rounded-2xl bg-linear-to-r from-primary to-secondary text-white font-black text-lg hover:glow-indigo transition-all duration-300 transform active:scale-95 shadow-xl shadow-primary/10"
                        >
                            Update Password
                        </button>
                    </div>

                    <div className="mt-8">
                        <p className="text-xs text-white/20 leading-relaxed font-medium">
                            Make sure your password is at least 8 characters long and includes a mix of letters, numbers, and symbols.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
