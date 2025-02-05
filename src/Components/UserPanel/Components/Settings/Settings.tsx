import { useState } from "react";
import Container from "../../../Global/Container";
import Modal from "../../../Helper/Modal";

const Settings = () => {
  const [theme, setTheme] = useState<Boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [isPass, setIsPass] = useState<Boolean>(false);
  const passwordModal = (
    <div className="fixed inset-0 flex justify-center items-center bg-black/90 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm text-center">
        <h2 className="text-xl font-bold text-left  mb-4 text-gray-700">
          Enter Your Email
        </h2>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          value={email}
          className="w-full p-3 mb-4 border border-gray-500 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter Your Email..."
        />
        <div className="flex justify-between gap-4">
          <button className="w-1/2 font-semibold py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 cursor-pointer transition-all focus:outline-none">
            Send
          </button>
          <button
            onClick={() => setIsPass(false)}
            className="w-1/2 py-2 font-semibold cursor-pointer bg-red-500 text-white rounded-md transition-all hover:bg-red-600 focus:outline-none"
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
      <Container className="p-20 w-full">
        <h1 className="text-3xl font-bold text-gray-100">Settings</h1>
        <div className="my-4">
          <div className="flex p-2 items-center justify-between w-full shadow-sm shadow-white">
            <h1 className="text-white text-xl font-semibold">
              Change Account Password
            </h1>
            <button
              onClick={() => setIsPass(true)}
              className="bg-red-500 cursor-pointer hover:bg-red-600 transition-all duration-150 text-white font-bold p-2 rounded-sm"
            >
              Change Password
            </button>
          </div>
          <div className="flex p-2 items-center  justify-between w-full shadow-sm shadow-white">
            <h1 className="text-white text-xl font-semibold">Theme</h1>
            {/* <button className="bg-red-500 text-white font-semibold p-2 rounded-sm">Dark</button> */}
            <label className="inline-flex items-center cursor-pointer">
              <input
                onClick={() => setTheme(!theme)}
                type="checkbox"
                checked={!theme ? false : true}
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
