import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "../../../Helper/Modal";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import JsCookie from "js-cookie";

const AdminLogin = () => {
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const Navigate = useNavigate();
  const [response, setResponse] = useState<string>("");
  interface adminCredentials {
    email: string;
    password: string;
  }
  const [formData, setFormData] = useState<adminCredentials>({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/login`,
      { formData },
      {
        withCredentials: true,
      }
    );
    setResponse(res?.data?.message);
    JsCookie.set("adminToken", res?.data?.token, {
      secure: true,
    });

    if (
      res?.data?.message !== "Invalid Credentials" &&
      res?.data?.message !== "Admin Not Found!"
    ) {
      Navigate("/admin");
    } else {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    if (document.cookie.includes("adminToken")) {
      // console.log("EXECUTED")
      Navigate("/admin");
    }
  }, []);
  const modalData = (
    <div className="flex h-screen   w-full justify-end relative  ">
      <div className="flex   absolute  items-center gap-8  top-2 right-2   h-fit my-auto justify-center bg-white p-2  rounded-lg shadow-md max-w-sm mx-auto">
        <h1 className="text-lg font-bold text-gray-800 ">{response}</h1>
        <RxCross1
          onClick={() => setIsOpen(false)}
          className=" py-2 bg-emerald-500  text-white text-3xl font-medium rounded-full cursor-pointer shadow-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
        />
      </div>
    </div>
  );
  return (
    <>
      {isOpen && <Modal data={modalData} />}
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col  justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl  sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold text-gray-700">
                  Admin Login
                </h1>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  {/* Email Input */}
                  <div className="relative">
                    <input
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFormData((prev) => ({
                          ...prev,
                          [e.target.name]: e.target.value,
                        }))
                      }
                      autoComplete="off"
                      id="email"
                      name="email"
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-emerald-500"
                      placeholder="Email address"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Enter Your Email...
                    </label>
                  </div>

                  {/* Password Input */}
                  <div className="relative">
                    <input
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFormData((prev) => ({
                          ...prev,
                          [e.target.name]: e.target.value,
                        }))
                      }
                      autoComplete="off"
                      id="password"
                      name="password"
                      type="password"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-emerald-500"
                      placeholder="Password"
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Enter Your Password...
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="relative">
                    <button
                      onClick={handleSubmit}
                      className="bg-emerald-500 hover:cursor-pointer hover:bg-emerald-600 text-white font-medium rounded-md px-4 py-2 w-full"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
