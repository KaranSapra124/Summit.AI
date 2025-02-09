import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Divider from "../../../../Utils/Divider";
import { userDataInterface } from "../../../../Utils/UserReducer";

// interface User {
//   id: string;
//   name: string;
//   email: string;

//   createdAt: string;
// }

const Users = () => {
  const [users, setUsers] = useState<userDataInterface[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/get-users`,
          { withCredentials: true }
        );
        setUsers(res.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleEdit = (item: userDataInterface) => {
    // console.log(item);
    // Add your edit logic here
  };

  //   const handleDelete = (id: string) => {
  //     console.log(`Delete user with ID: ${id}`);
  //     // Add your delete logic here
  //   };

  return (
    <div className="h-full w-full flex flex-col justify-center ">
      <div className="relative  px-4 py-10  shadow-lg  h-full">
        <h1 className="text-2xl font-bold text-white text-left">Users</h1>
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
                    className="border-t border-gray-300 even:bg-gray-100 hover:bg-gray-200"
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
                        //   onClick={() => handleDelete(user.id)}
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
          <h1>Loading..</h1>
        )}
      </div>
    </div>
  );
};

export default Users;
