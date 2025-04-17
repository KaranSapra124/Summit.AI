import { FaEdit } from "react-icons/fa";
import Divider from "../../../../Utils/Divider";
import Container from "../../../Global/Container";
import { useContext, useState } from "react";
import Modal from "../../../Helper/Modal";
import { UserContext } from "../../../../Utils/UserContext";
import {
  UserContextType,
  userDataInterface,
  // userState,
} from "../../../../Utils/UserReducer";
import axios from "axios";

interface profileDetails {
  name: string;
  email: string;
  // PurchasePlan: planDetail;
}
function Profile() {
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const context = useContext(UserContext);
  const { theme, userData, dispatch } = context as UserContextType;
  const { name, email, purchasePlan } = userData as userDataInterface;

  const [details, setDetails] = useState<profileDetails>({
    name: name || "John Doe",
    email: email || "john.doe@example.com",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    console.log(name, value);

    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (name: string, email: string) => {
    await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/update-profile`,
      { name: name, email: email },
      { withCredentials: true }
    );
    await fetchUser();
  };

  const fetchUser = async () => {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/get-user`,
      {},
      { withCredentials: true }
    );
    dispatch({ type: "SET_USER", payload: res?.data?.user });
  };

  const profileModalData = (
    <div
      className={`p-6 bg-white flex flex-col relative mt-52  rounded-2xl shadow-xl w-96 mx-auto space-y-6`}
    >
      <h1 className="text-2xl font-bold text-gray-800">Update Profile</h1>
      <div className="space-y-4">
        <input
          onChange={handleChange}
          type="text"
          name="name"
          value={details?.name}
          placeholder="Enter Your Name..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          onChange={handleChange}
          type="email"
          name="email"
          value={details?.email}
          placeholder="Enter Your Email..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex justify-between space-x-4">
        <button
          onClick={async () => {
            await handleSubmit(details?.name, details?.email);
            setIsOpen(false);
          }}
          className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all"
        >
          Submit
        </button>
        <button
          onClick={() => {
            setIsOpen(false);
          }}
          className="w-full cursor-pointer px-4 py-2 font-semibold text-gray-800 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all"
        >
          Cancel
        </button>
      </div>
    </div>
  );
  // console.log(userData);

  return (
    <>
      {isOpen && <Modal data={profileModalData} />}
      <Container className="w-full">
        <div
          className={`flex justify-between items-center max-[600px]:flex-col shadow-sm ${
            theme === "Dark" ? "bg-gray-100/40" : "bg-gray-900"
          } rounded-lg p-2 `}
        >
          <img
            className="w-22 max-[600px]:w-10 rounded-full mx-5"
            src="https://i.pinimg.com/236x/cd/4b/d9/cd4bd9b0ea2807611ba3a67c331bff0b.jpg"
            alt="No Image"
          />
          <div>
            <FaEdit
              onClick={() => setIsOpen(true)}
              className="text-white text-3xl cursor-pointer max-[600px]:text-[1.5rem] hover:bg-black transition-all duration-200 ml-auto  border p-1 rounded-full"
            />
            <h1
              className={`text-xl max-[600px]:text-xs font-bold ${
                theme === "Dark" ? "text-black" : "text-white/60"
              }`}
            >
              <span className="text-gray-200 font-extrabold ">
                Owner Name :{" "}
              </span>
              {name}
            </h1>
            <Divider className="h-0.5  w-full bg-black rounded-full my-2 " />
            <h2
              className={`text-xl max-[600px]:text-xs font-bold ${
                theme === "Dark" ? "text-black" : "text-white/60"
              }`}
            >
              {" "}
              <span className="text-gray-200 font-extrabold ">
                Owner Email :{" "}
              </span>
              {email}
            </h2>
          </div>
        </div>
        <div
          className={`shadow-sm  ${
            theme === "Dark" ? "shadow-white" : "shadow-gray-900"
          } bg-gray-100/40 my-2  p-2 w-full justify-center rounded-md items-center`}
        >
          <h2 className="text-gray-900 max-[600px]:text-sm my-2 text-2xl font-extrabold">
            Plan Details:
          </h2>
          <Divider className="h-0.5 w-12 bg-emerald-500 my-2 rounded-full"/>
          <div className="flex justify-between">
            {purchasePlan ? (
              <table
                className={`flex justify-between w-full rounded-sm max-[600px]:flex-col  border ${
                  theme === "Dark" ? "border-gray-100 " : "border-gray-900"
                }`}
              >
                <td
                  className={`border ${
                    theme === "Dark" ? "border-gray-100" : "border-gray-900"
                  }  w-full  p-2 font-bold`}
                >
                  <tr
                    className={`text-lg max-[600px]:text-sm  border-b-2 ${
                      theme === "Dark" ? "border-white" : "border-gray-900"
                    }`}
                  >
                    Plan Name
                  </tr>
                  <td
                    className={`text-xl max-[600px]:text-sm font-extrabold ${
                      theme === "Dark" ? "text-gray-100" : "text-gray-900"
                    } py-4`}
                  >
                    {purchasePlan.name}
                  </td>
                </td>
                <td
                  className={`border ${
                    theme === "Dark" ? "border-gray-100" : "border-gray-900"
                  }  w-full  p-2 font-bold`}
                >
                  <tr
                    className={`text-lg max-[600px]:text-sm  border-b-2 ${
                      theme === "Dark" ? "border-white" : "border-gray-900"
                    }`}
                  >
                    Plan Limit
                  </tr>
                  <td
                    className={`text-xl max-[600px]:text-sm font-extrabold ${
                      theme === "Dark" ? "text-gray-100" : "text-gray-900"
                    } py-4`}
                  >
                    {purchasePlan.name == "Pro Plan"
                      ? 50
                      : purchasePlan.name === "Free Plan"
                      ? 5
                      : 100}
                  </td>
                </td>
                <td
                  className={`border ${
                    theme === "Dark" ? "border-gray-100" : "border-gray-900"
                  }  w-full  p-2 font-bold`}
                >
                  <tr
                    className={`text-lg max-[600px]:text-sm  border-b-2 ${
                      theme === "Dark" ? "border-white" : "border-gray-900"
                    }`}
                  >
                    Plan Usage
                  </tr>
                  <td
                    className={`text-xl max-[600px]:text-sm font-extrabold ${
                      theme === "Dark" ? "text-gray-100" : "text-gray-900"
                    } py-4`}
                  >
                    {purchasePlan.summariesPerDay}
                  </td>
                </td>
              </table>
            ) : (
              <h1 className="text-center text-white font-extrabold">
                No Plan Exists
              </h1>
            )}
            {/* <h1>{details.plan.type}</h1>
            <p>{details.plan.limit}</p>
            <p>{details.plan.usage}</p> */}
          </div>
        </div>
      </Container>
    </>
  );
}

export default Profile;
