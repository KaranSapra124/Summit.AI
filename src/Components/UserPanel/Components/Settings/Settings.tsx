import { useContext, useState } from "react";
import Container from "../../../Global/Container";
import Modal from "../../../Helper/Modal";
import { UserContext } from "../../../../Utils/UserContext";
import { UserAction } from "../../../../Utils/UserReducer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const Navigate = useNavigate();
  const context = useContext(UserContext);
  const { theme, dispatch } = context as UserContextType;
  interface UserContextType {
    theme: string;
    userData: object; // You can be more specific about this type if needed
    dispatch: React.Dispatch<UserAction>;
  }

  const [email, setEmail] = useState<string>("");
  const [isPass, setIsPass] = useState<Boolean>(false);

  const sendOTP = async (email: string) => {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/change-password/${email}`,
      {},
      {
        withCredentials: true,
      }
    );
    Navigate("/user/otp-form", {
      state: res?.data?.OTP,
    });
  };

  const passwordModal = (
    <div className="fixed inset-0 flex justify-center items-center bg-black/90 bg-opacity-50 z-50">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-11/12 max-w-sm sm:max-w-md text-center">
        <h2 className="text-lg md:text-xl font-bold text-left mb-4 text-gray-700">
          Enter Your Email
        </h2>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          value={email}
          className="w-full p-3 mb-4 border border-gray-500 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter Your Email..."
        />
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <button
            onClick={() => sendOTP(email)}
            className="w-full md:w-1/2 font-semibold py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 cursor-pointer transition-all focus:outline-none"
          >
            Send
          </button>
          <button
            onClick={() => setIsPass(false)}
            className="w-full md:w-1/2 py-2 font-semibold cursor-pointer bg-red-500 text-white rounded-md transition-all hover:bg-red-600 focus:outline-none"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {isPass && <Modal data={passwordModal} />}
      <Container className="p-4 sm:p-6 md:p-10 w-full h-screen">
        <h1
          className={`text-lg md:text-3xl font-bold ${
            theme === "Dark" ? "text-gray-100" : "text-gray-900"
          }`}
        >
          Settings
        </h1>
        <div className="my-4">
          {/* Change Password Section */}
          <div
            className={`flex flex-col max-[600px]:flex-row sm:flex-row p-4 items-center rounded-md my-4 border-l-4 border-emerald-500 justify-between w-full shadow-sm ${
              theme === "Dark" ? "shadow-white" : "shadow-gray-900"
            }`}
          >
            <h1
              className={`mb-2 sm:mb-0 ${
                theme === "Dark" ? "text-white" : "text-black"
              } text-xs md:text-xl font-semibold`}
            >
              Change Account Password
            </h1>
            <button
              onClick={() => setIsPass(true)}
              className="bg-red-500 cursor-pointer hover:bg-red-600 transition-all duration-150 text-white max-[600px]:p-0.5 max-[600px]:text-xs font-bold p-2 rounded-sm"
            >
              Change Password
            </button>
          </div>
          {/* Theme Toggle Section */}
          <div
            className={`flex flex-col max-[600px]:flex-row sm:flex-row p-4 items-center rounded-md my-4 border-l-4 border-emerald-500 justify-between w-full shadow-sm ${
              theme === "Dark" ? "shadow-white" : "shadow-gray-900"
            }`}
          >
            <h1
              className={`mb-2 sm:mb-0 ${
                theme === "Dark" ? "text-white" : "text-black"
              } text-lg md:text-xl max-[600px]:text-sm font-semibold`}
            >
              Theme
            </h1>
            <label className="inline-flex  items-center cursor-pointer">
              <input
                onChange={(e) => {
                  const isChecked = (e.target as HTMLInputElement).checked;
                  dispatch({
                    type: "SET_THEME",
                    payload: isChecked ? "Dark" : "Light",
                  });
                }}
                type="checkbox"
                checked={theme === "Dark" ? true : false}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
            </label>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Settings;
