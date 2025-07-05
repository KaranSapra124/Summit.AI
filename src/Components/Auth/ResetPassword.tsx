import axios from 'axios';
import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom';

interface formDataInterface {
    email: string | null,
    token: string | null,
    newPassword: string | null,
    confirmPassword: string | null
}
const ResetPassword: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [formData, setFormData] = useState<formDataInterface>({
        email: searchParams?.get("email"),
        token: searchParams?.get("token"),
        newPassword: "",
        confirmPassword: ""
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target as HTMLInputElement;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    };

    const handleSubmit = async () => {
        const res = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/reset-password`,
            formData,
            {
                withCredentials: true,
            }
        )
    }
    return (
        <div className="h-full max-[600px]:flex-col flex flex-row-reverse bg-black/90">

            <div className="max-[600px]:px-5 max-[600px]:mx-1 max-[600px]:my-5 mx-4 max-[600px]:w-full flex flex-col justify-center items-center w-1/2">
                <h1 className="text-5xl max-[600px]:text-xl font-bold text-white">
                    Reset{" "}
                    <span className="text-emerald-500 font-extrabold">Password</span>
                </h1>

                <p className='text-gray-200 my-2 text-sm font-semibold'>
                    Enter your new password below. Make sure it's strong and something you’ll remember.
                </p>

                <div className="h-1 w-12 bg-emerald-500 rounded-full my-4"></div>

                {/* New Password */}
                <label className="input border border-emerald-500 rounded-md w-full p-2 my-4 input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="white"
                        className="h-4 w-4 opacity-70"
                    >
                        <path d="M8 1a4 4 0 0 0-4 4v3H3.5A1.5 1.5 0 0 0 2 9.5v4A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5v-4A1.5 1.5 0 0 0 12.5 8H12V5a4 4 0 0 0-4-4Zm-2.5 4a2.5 2.5 0 1 1 5 0v3h-5V5Z" />
                    </svg>
                    <input
                        type="password"
                        name="password"
                        className="grow text-white max-[600px]:text-sm p-2 focus:outline-0"
                        onChange={handleChange}
                        placeholder="New Password"
                    />
                </label>

                {/* Confirm Password */}
                <label className="input border border-emerald-500 rounded-md w-full p-2 my-4 input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="white"
                        className="h-4 w-4 opacity-70"
                    >
                        <path d="M8 1a4 4 0 0 0-4 4v3H3.5A1.5 1.5 0 0 0 2 9.5v4A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5v-4A1.5 1.5 0 0 0 12.5 8H12V5a4 4 0 0 0-4-4Zm-2.5 4a2.5 2.5 0 1 1 5 0v3h-5V5Z" />
                    </svg>
                    <input
                        type="password"
                        name="confirmPassword"
                        className="grow text-white max-[600px]:text-sm p-2 focus:outline-0"
                        onChange={handleChange}
                        placeholder="Confirm Password"
                    />
                </label>

                <div className="flex justify-between w-full items-center">
                    <button
                        onClick={handleSubmit}
                        className="bg-emerald-500 mr-auto cursor-pointer font-bold p-2 rounded-md text-white"
                    >
                        Reset Password
                    </button>
                </div>
            </div>

            <img
                className="w-1/2 max-[600px]:w-full max-[600px]:h-full h-screen"
                src="reset-password-image.jpg"
                alt="No Image"
            />
        </div>

    )
}

export default ResetPassword
