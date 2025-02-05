import { useState } from "react";
import Container from "../../../Global/Container";

const Settings = () => {
  const [theme, setTheme] = useState<Boolean>(false);
  return (
    <>
      <Container className="p-20 w-full">
        <h1 className="text-3xl font-bold text-gray-100">Settings</h1>
        <div>
          <div className="flex p-2 items-center justify-between w-full shadow-sm shadow-white">
            <h1 className="text-white text-xl font-semibold">
              Change Account Password
            </h1>
            <button className="bg-red-500 text-white font-semibold p-2 rounded-sm">
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
