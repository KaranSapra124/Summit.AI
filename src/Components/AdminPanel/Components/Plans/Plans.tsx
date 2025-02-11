import axios from "axios";
import { useEffect, useState } from "react";
import Divider from "../../../../Utils/Divider";
import { SkeletonLoader } from "../Users/Users";
import { FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { PricingPlanType } from "../../../../Utils/PlanData";

const Plans = () => {
  const [plans, setPlans] = useState<PricingPlanType[]>([]);

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/plans`,
        { withCredentials: true }
      );
      setPlans(res?.data?.plans);
    })();
  }, []);
  return (
    <>
      <div className="h-full w-full max-[600px]:mt-12 flex flex-col justify-center ">
        <div className="relative  px-4 py-10  shadow-lg  h-full">
          <h1 className="text-2xl font-bold text-white text-left max-[600px]:text-sm">
            Plans
          </h1>
          <Divider className="h-1 w-12 bg-emerald-500 my-4 rounded-full" />
          {plans?.length > 0 ? (
            <div className="overflow-x-auto overflow-y-auto bg-white">
              <table className="w-full  table-auto border-collapse border border-gray-300 mx-auto">
                <thead className="bg-gray-900 text-white">
                  <tr>
                    <th className="px-6 py-3 text-center text-sm font-medium border border-gray-300">
                      Name
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-medium border border-gray-300">
                      Price
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-medium border border-gray-300">
                      Usage
                    </th>
                    {/* <th className="px-6 py-3 text-center text-sm font-medium border border-gray-300"></th> */}
                    <th className="px-6 py-3 text-center text-sm font-medium border border-gray-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {plans.map((user) => (
                    <tr
                      key={user._id}
                      className="border-t border-gray-300 even:bg-gray-50 hover:bg-gray-200"
                    >
                      <td className="px-6 py-3 text-center border border-gray-300">
                        {user.name}
                      </td>
                      <td className="px-6 py-3 text-center border border-gray-300">
                        {user.price}
                      </td>
                      <td className="px-6 py-3 text-center capitalize border border-gray-300">
                        {user?.summariesPerDay || "N/A"}
                      </td>
                      {/* <td className="px-6 py-3 text-center border border-gray-300">
                        {user?. || "N/A"}
                      </td> */}
                      <td className="p-6 flex justify-center items-center space-x-4 border border-gray-300">
                        <button
                          //   onClick={() => handleEdit(user)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <FaEdit />
                        </button>
                        <button
                          //   onClick={() => handleDelete(user)}
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

export default Plans;
