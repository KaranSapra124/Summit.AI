import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Divider from "../../../../Utils/Divider";
import { userDataInterface } from "../../../../Utils/UserReducer";
import Modal from "../../../Helper/Modal";

const Users = () => {
  const [users, setUsers] = useState<userDataInterface[]>([]);
  const [isEdit, setIsEdit] = useState<Boolean>(false);
  const [editItem, setEditItem] = useState<React.ReactNode>(<></>);
  const [finalEditItem, setFinalEditItem] = useState<
    userDataInterface | undefined
  >(undefined);
  const fetchUsers = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/get-users`,
        {},
        { withCredentials: true }
      );
      setUsers(res.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = async (item: userDataInterface) => {
    setIsEdit(true);
    setFinalEditItem((prev) => ({ ...prev, ...item }));
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!name) return; // Ensure 'name' exists

    setFinalEditItem((prev) => {
      if (!prev) return undefined; // Handle the case where 'prev' might be undefined

      return {
        ...prev,
        [name]: value || "N/A", // Ensure 'value' is always a string
      };
    });
  };
  const handleEditSubmit = async () => {
    await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/edit-user`,
      { ...finalEditItem },
      { withCredentials: true }
    );
    setIsEdit(false);
    fetchUsers();
  };

  useEffect(() => {
    setEditItem(
      <div className="overflow-y-scroll max-h-lvh p-4 md:p-6">
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="p-6 md:p-8">
            {/* Header */}
            <h1 className="text-2xl text-left md:text-3xl font-bold text-gray-800 mb-8">
              Edit User Profile
            </h1>

            {/* User Info Section */}
            <div className="space-y-6 mb-8">
              <div className="space-y-2">
                <label className="text-sm text-left font-semibold text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                  value={finalEditItem?.name || "N/A"}
                  onChange={handleChange}
                  placeholder="Enter user name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-left font-semibold text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                  value={finalEditItem?.email || "N/A"}
                  placeholder="Enter email address"
                />
              </div>
            </div>

            {/* Purchase Plan Section */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-200">
              <h2 className="text-xl text-left font-bold text-gray-800 mb-6">
                Purchase Plan Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-left font-semibold text-gray-700">
                    Plan Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-500 cursor-pointer"
                    value={
                      finalEditItem?.purchasePlan?.name !== undefined
                        ? finalEditItem.purchasePlan.name
                        : "N/A"
                    }
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const { name, value } = e.target;
                      if (!name) return; // Ensure 'name' exists
                      setFinalEditItem((prev) => {
                        if (!prev) return undefined; // Handle the case where 'prev' might be undefined

                        return {
                          ...prev,
                          purchasePlan: {
                            ...prev.purchasePlan,
                            [name]: value, // Allow an empty string as a valid value
                          },
                        };
                      });
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-left font-semibold text-gray-700">
                    Price
                  </label>
                  <input
                    type="text"
                    name="price"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-500 cursor-pointer"
                    value={
                      finalEditItem?.purchasePlan?.price !== undefined
                        ? finalEditItem?.purchasePlan?.price
                        : "N/A"
                    }
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const { name, value } = e.target;
                      if (!name) return; // Ensure 'name' exists
                      setFinalEditItem((prev) => {
                        if (!prev) return undefined; // Handle the case where 'prev' might be undefined

                        return {
                          ...prev,
                          purchasePlan: {
                            ...prev.purchasePlan,
                            [name]: value, // Allow an empty string as a valid value
                          },
                        };
                      });
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-left font-semibold text-gray-700">
                    Currency
                  </label>
                  <input
                    type="text"
                    name="currency"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-500 cursor-pointer"
                    value={
                      finalEditItem?.purchasePlan?.currency !== undefined
                        ? finalEditItem?.purchasePlan?.currency
                        : "N/A"
                    }
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const { name, value } = e.target;
                      if (!name) return; // Ensure 'name' exists
                      setFinalEditItem((prev) => {
                        if (!prev) return undefined; // Handle the case where 'prev' might be undefined

                        return {
                          ...prev,
                          purchasePlan: {
                            ...prev.purchasePlan,
                            [name]: value, // Allow an empty string as a valid value
                          },
                        };
                      });
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-left font-semibold text-gray-700">
                    Text Limit
                  </label>
                  <input
                    type="text"
                    name="textLimit"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-500 cursor-pointer"
                    value={
                      finalEditItem?.purchasePlan?.textLimit !== undefined
                        ? finalEditItem?.purchasePlan?.textLimit
                        : "N/A"
                    }
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const { name, value } = e.target;
                      if (!name) return; // Ensure 'name' exists
                      setFinalEditItem((prev) => {
                        if (!prev) return undefined; // Handle the case where 'prev' might be undefined

                        return {
                          ...prev,
                          purchasePlan: {
                            ...prev.purchasePlan,
                            [name]: value, // Allow an empty string as a valid value
                          },
                        };
                      });
                    }}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm text-left font-semibold text-gray-700">
                    Summaries Per Day
                  </label>
                  <input
                    type="text"
                    name="summariesPerDay"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-500 cursor-pointer"
                    value={
                      finalEditItem?.purchasePlan?.summariesPerDay !== undefined
                        ? finalEditItem?.purchasePlan?.summariesPerDay
                        : "N/A"
                    }
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const { name, value } = e.target;
                      if (!name) return; // Ensure 'name' exists
                      setFinalEditItem((prev) => {
                        if (!prev) return undefined; // Handle the case where 'prev' might be undefined

                        return {
                          ...prev,
                          purchasePlan: {
                            ...prev.purchasePlan,
                            [name]: value, // Allow an empty string as a valid value
                          },
                        };
                      });
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Active Status */}
            <div className="flex items-center space-x-3 mb-8">
              <label className="text-sm font-semibold text-gray-700">
                Active Status
              </label>
              <input
                type="checkbox"
                name="isActive"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  // console.log(e.target.checked);
                  setFinalEditItem((prev) => {
                    if (!prev) return undefined;
                    return {
                      ...prev,
                      isActive: e.target.checked,
                    };
                  });
                }}
                className="w-5 h-5 text-emerald-500 border-gray-300 rounded focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors cursor-pointer"
                checked={finalEditItem?.isActive ? true : false}
              />
            </div>

            {/* Save Button */}
            <div className="flex gap-2">
              <button
                onClick={handleEditSubmit}
                className="w-full py-4 bg-emerald-500 text-white text-lg font-semibold rounded-lg hover:bg-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEdit(false)}
                className="w-full py-4 bg-red-500 text-white text-lg font-semibold rounded-lg hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }, [finalEditItem]);

  const handleDelete = async (id: userDataInterface) => {
    await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/delete-user/${id?._id}`,
      {},
      { withCredentials: true }
    );
    await fetchUsers();
  };

  return (
    <>
      {isEdit && <Modal data={editItem} />}
      <div className="h-full w-full max-[600px]:mt-12 flex flex-col justify-center ">
        <div className="relative  px-4 py-10  shadow-lg  h-full">
          <h1 className="text-2xl font-bold text-white text-left max-[600px]:text-sm">
            Users
          </h1>
          <Divider className="h-1 w-12 bg-emerald-500 my-4 rounded-full" />
          {users?.length > 0 ? (
            <div className="overflow-x-auto overflow-y-auto bg-white">
              <table className="w-full  table-auto border-collapse border border-gray-300 mx-auto">
                <thead className="bg-gray-900 text-white">
                  <tr>
                    <th className="px-6 py-3 text-center text-sm font-medium border border-gray-300">
                      Name
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-medium border border-gray-300">
                      Email
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-medium border border-gray-300">
                      Plan
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-medium border border-gray-300">
                      Usage
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-medium border border-gray-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {users.map((user) => (
                    <tr
                      key={user._id}
                      className="border-t border-gray-300 even:bg-gray-50 hover:bg-gray-200"
                    >
                      <td className="px-6 py-3 text-center border border-gray-300">
                        {user.name}
                      </td>
                      <td className="px-6 py-3 text-center border border-gray-300">
                        {user.email}
                      </td>
                      <td className="px-6 py-3 text-center capitalize border border-gray-300">
                        {user?.purchasePlan?.name || "N/A"}
                      </td>
                      <td className="px-6 py-3 text-center border border-gray-300">
                        {user?.purchasePlan?.summariesPerDay || "N/A"}
                      </td>
                      <td className="p-6 flex justify-center items-center space-x-4 border border-gray-300">
                        <button
                          onClick={() => handleEdit(user)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(user)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <SkeletonLoader />
          )}
        </div>
      </div>
    </>
  );
};
export const SkeletonLoader: React.FC = () => {
  return (
    <svg
      className="animate-spin my-52 h-16 w-16 mx-auto"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="nonzero"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="green"
        stroke-width="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};

export default Users;
