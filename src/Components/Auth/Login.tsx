import { useState } from "react";
import Container from "../Global/Container";
import axios from "axios";

const Login = () => {
  type UserType = {
    name: string;
    email: string;
  };
  const [user, setUser] = useState<UserType>({ name: "", email: "" });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    // console.log(e);
    const { name, value } = e.target as HTMLInputElement;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/login`,
      user
    );
    console.log(res);
  };
  return (
    <>
      <Container className="h-screen py-10 px-10">
        <div className="flex">
          <div className="w-1/2 mx-4 flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold text-gray-700">
              Create A{" "}
              <span className="text-emerald-500 font-extrabold">Free</span>{" "}
              Account
            </h1>
            <div className="h-1 w-12 bg-emerald-500 rounded-full my-4"></div>
            <label className="input w-full p-2 my-4 input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                className="grow"
                name="name"
                onChange={handleChange}
                placeholder="Email"
              />
            </label>
            <label className="input w-full p-2 my-4 input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                name="email"
                onChange={handleChange}
                className="grow"
                placeholder="Username"
              />
            </label>
            <button
              onClick={handleSubmit}
              className="bg-emerald-500 mr-auto cursor-pointer font-bold p-2 rounded-md text-white"
            >
              Login
            </button>
          </div>
          <img
            className="w-1/2 "
            src="https://img.freepik.com/free-vector/man-reading-concept-illustration_114360-8515.jpg?ga=GA1.1.1152584770.1732648307&semt=ais_hybrid"
            alt="No Image"
          />
        </div>
      </Container>
    </>
  );
};

export default Login;
