import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState<String>("")
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = e.target as HTMLInputElement;
        setEmail(value)
    };

    const handleSubmit = async () => {
        const res = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/forgot-password`,
            { email: email },
            {
                withCredentials: true,
            }
        )
        const { data } = res;
       toast.success(data?.message)
    }
    return (
        <>

            <div className="h-full max-[600px]:flex-col  flex bg-black/90 ">


                <div className=" max-[600px]:px-5 max-[600px]:mx-1 max-[600px]:my-5 mx-4 max-[600px]:w-full flex flex-col justify-center items-center w-1/2">
                    <h1 className="text-5xl max-[600px]:text-xl font-bold text-white">
                        Forgot{" "}
                        <span className="text-emerald-500 font-extrabold">    Password</span>{" "}

                    </h1>
                    <p className='text-gray-200 my-2 text-sm font-semibold'>Enter the registered email to reset password!</p>
                    <div className="h-1 w-12 bg-emerald-500 rounded-full my-4"></div>
                    <label className="input border border-emerald-500 rounded-md w-full p-2 my-4 input-bordered flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="white"
                            className="h-4 w-4 opacity-70"
                        >
                            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                        </svg>
                        <input
                            type="email"
                            className="grow text-white max-[600px]:text-sm p-2 focus:outline-0"
                            name="email"
                            onChange={handleChange}
                            placeholder="Email"

                        />
                    </label>


                    <div className="flex justify-between w-full items-center">
                        <button
                            onClick={handleSubmit}
                            className="bg-emerald-500 mr-auto cursor-pointer font-bold p-2 rounded-md text-white"
                        >
                            Send
                        </button>


                    </div>
                </div>
                <img
                    className="w-1/2 max-[600px]:w-full max-[600px]:h-full h-screen"
                    src="forgot-password-image.jpg"
                    alt="No Image"
                />


            </div>

        </>
    )
}

export default ForgotPassword
