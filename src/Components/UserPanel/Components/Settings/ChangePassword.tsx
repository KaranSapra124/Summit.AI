import React, { useState } from "react";
import Container from "../../../Global/Container";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const Navigate = useNavigate();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    password === confirmPassword
      ? (async () => {
          try {
            await axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/alter-password`,
              { password: password },
              {
                withCredentials: true,
              }
            );
            setIsLoading(false);
            Navigate("/user");
          } catch (err) {
            alert("Password Not Changed!");
          }
        })()
      : alert("Not matching!");
  };

  return (
    <Container className="flex flex-col   mx-auto p-4">
      <div className="w-96 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-emerald-600 mb-6 text-center">
          Change Password
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label
              htmlFor="new-password"
              className="text-sm font-medium text-gray-700"
            >
              Enter New Password:
            </label>
            <input
              autoFocus
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              type="password"
              id="new-password"
              className="mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Enter new password"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="confirm-password"
              className="text-sm font-medium text-gray-700"
            >
              Confirm Password:
            </label>
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setConfirmPassword(e.target.value)
              }
              type="password"
              id="confirm-password"
              className="mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Confirm password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-emerald-600 text-white font-semibold py-2 rounded-lg hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          >
            {!isLoading ? (
              "Submit"
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="w-12 mx-auto h-6 animate-spin"
                viewBox="0 0 16 16"
              >
                <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
                <path
                  fillRule="evenodd"
                  d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
                />
              </svg>
            )}
          </button>
        </form>
      </div>
    </Container>
  );
};

export default ChangePassword;
