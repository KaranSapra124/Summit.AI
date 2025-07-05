import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaShield } from "react-icons/fa6";
import { UserContext } from "../../Utils/UserContext";
import { UserAction } from "../../Utils/UserReducer";
import jscookie from "js-cookie";
import { toast } from "react-toastify";

interface loginProps {
  isLogin: Boolean;
}

const Login: React.FC<loginProps> = ({ isLogin }) => {
  interface UserContextType {
    theme: string;
    userData: object; // You can be more specific about this type if needed
    dispatch: React.Dispatch<UserAction>;
  }
  const Navigate = useNavigate();
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
    // console.log(e);
    const { name, value } = e.target as HTMLInputElement;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    // console.log(user)
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
    res?.data?.message !== "Password Incorrect!" && Navigate("/user");

    // setIsOpen(true);
  };

  useEffect(() => {
    const cookie = document.cookie
    if (cookie.includes("userToken") && !cookie.includes("userToken=undefined") ) Navigate("/user");
  }, []);

  return (
    <>
      <div className="h-full max-[600px]:flex-col flex bg-black/90 ">
        <div className="w-1/2 max-[600px]:px-5 max-[600px]:mx-1 max-[600px]:my-5 mx-4 max-[600px]:w-full flex flex-col justify-center items-center">
          <h1 className="text-5xl max-[600px]:text-xl font-bold text-white">
            Create An{" "}
            <span className="text-emerald-500 font-extrabold">Free</span>{" "}
            Account
          </h1>
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
          {!isLogin && (
            <label className="input border border-emerald-500 rounded-md w-full p-2 my-4 input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="white"
                className="h-4 w-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                className="grow p-2 max-[600px]:text-sm focus:outline-0 text-white"
                placeholder="Username"
              />
            </label>
          )}
          <label className="input border border-emerald-500 rounded-md w-full p-2 my-4 input-bordered flex items-center gap-2">
            <FaShield className="text-gray-400" />
            <input
              type="password"
              className="grow max-[600px]:text-sm text-white p-2 focus:outline-0"
              name="password"
              onChange={handleChange}
              placeholder="Enter Your Password..."
            />
          </label>
          <div className="flex justify-between w-full items-center">
            <button
              onClick={handleSubmit}
              className="bg-emerald-500 mr-auto cursor-pointer font-bold p-2 rounded-md text-white"
            >
              {isLogin ? "Login" : "Register"}
            </button>
            <Link className="text-sm text-emerald-400 hover:underline font-semibold" to={"/forgot-password"}>Forgot Password?</Link>
          </div>
          {isLogin ? (
            <Link
              to="/register"
              className="text-sm text-emerald-400 hover:underline mt-4"
            >
              Don’t have an account?{" "}
              <span className="font-semibold">Create one</span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="text-sm text-emerald-400 hover:underline mt-4"
            >
              Already have an account?{" "}
              <span className="font-semibold">Login</span>
            </Link>
          )}
        </div>
        <img
          className="w-1/2 max-[600px]:w-full max-[600px]:h-full h-screen"
          src="https://img.freepik.com/free-vector/man-reading-concept-illustration_114360-8515.jpg?ga=GA1.1.1152584770.1732648307&semt=ais_hybrid"
          alt="No Image"
        />
      </div>
      {/* </Container> */}
    </>
  );
};

export default Login;
