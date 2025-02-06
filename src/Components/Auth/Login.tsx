import { useState } from "react";
import Container from "../Global/Container";
import axios from "axios";
import Modal from "../Helper/Modal";
import { useNavigate } from "react-router-dom";
import { FaShield } from "react-icons/fa6";

const Login = () => {
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
  const [isOpen, setIsOpen] = useState(false);
  const [response, SetResponse] = useState("");
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
      user
    );
    SetResponse(res?.data?.message);

    setIsOpen(true);
  };

  const ModalData = (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-800/20 bg-opacity-50 fixed inset-0 z-50">
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 space-y-4">
          <p className="text-black text-lg font-semibold">{response}</p>
          <div className="flex justify-end">
            <button
              onClick={() => {
                setIsOpen(false);
                Navigate("/user");
              }}
              className="px-4 py-2 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-800 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* <Container > */}
      {isOpen && <Modal data={ModalData} />}
      <div className="h-full flex bg-black/90 ">
        <div className="w-1/2 mx-4 flex flex-col justify-center items-center">
          <h1 className="text-5xl font-bold text-white">
            Create A{" "}
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
              type="text"
              className="grow text-white p-2 focus:outline-0"
              name="name"
              onChange={handleChange}
              placeholder="Email"
            />
          </label>
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
              name="email"
              onChange={handleChange}
              className="grow p-2 focus:outline-0 text-white"
              placeholder="Username"
            />
          </label>
          <label className="input border border-emerald-500 rounded-md w-full p-2 my-4 input-bordered flex items-center gap-2">
            <FaShield className="text-gray-400" />
            <input
              type="password"
              className="grow text-white p-2 focus:outline-0"
              name="password"
              onChange={handleChange}
              placeholder="Enter Your Password..."
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
          className="w-1/2 h-screen"
          src="https://img.freepik.com/free-vector/man-reading-concept-illustration_114360-8515.jpg?ga=GA1.1.1152584770.1732648307&semt=ais_hybrid"
          alt="No Image"
        />
      </div>
      {/* </Container> */}
    </>
  );
};

export default Login;
