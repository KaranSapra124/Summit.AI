import axios from "axios";
import { useEffect, useState } from "react";
import Divider from "../../../../Utils/Divider";
import { SkeletonLoader } from "../Users/Users";
import { FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { PricingPlanType } from "../../../../Utils/PlanData";
import Modal from "../../../Helper/Modal";
import { RxCross1 } from "react-icons/rx";

const Plans = () => {
  const [plans, setPlans] = useState<PricingPlanType[]>([]);
  const [isEdit, setIsEdit] = useState<Boolean>(false);
  const [item, setItem] = useState<PricingPlanType | null>(null);
  const [isChangeItem, setIsChangeItem] = useState<Boolean>(false);
  const handleEdit = (item: PricingPlanType) => {
    setIsEdit(true);
    setItem(item);
  };
  const handleChangeItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItem((prev) => prev && { ...prev, [e.target.name]: e.target.value });
    setIsChangeItem((prev) => !prev);
  };
  const modalData = (
    <div
      key={isChangeItem}
      className="p-6 bg-white rounded-xl shadow-lg max-w-lg space-y-4"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">
          Edit Pricing Plan
        </h2>
        <RxCross1
          onClick={() => setIsEdit(false)}
          className="cursor-pointer text-gray-500 hover:text-gray-800 transition duration-200"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <input
          type="text"
          name="name"
          value={item?.name}
          onChange={handleChangeItem}
          placeholder="Plan Name"
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          name="price"
          value={item?.price}
          onChange={handleChangeItem}
          placeholder="Price"
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="currency"
          value={item?.currency}
          onChange={handleChangeItem}
          placeholder="Currency (e.g., USD, INR)"
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="textLimit"
          value={item?.textLimit}
          onChange={handleChangeItem}
          placeholder="Text Limit (e.g., 1000 words)"
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          name="summariesPerDay"
          value={item?.summariesPerDay}
          onChange={handleChangeItem}
          placeholder="Summaries Per Day (e.g., Unlimited)"
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="fileUploads"
          checked={item?.fileUploads ? true : false}
          onChange={handleChangeItem}
          className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="fileUploads" className="text-gray-700">
          File Uploads
        </label>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="customization"
          checked={item?.customization}
          onChange={handleChangeItem}
          className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="customization" className="text-gray-700">
          Customization
        </label>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="prioritySupport"
          checked={item?.prioritySupport}
          onChange={handleChangeItem}
          className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="prioritySupport" className="text-gray-700">
          Priority Support
        </label>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="apiAccess"
          checked={item?.apiAccess}
          onChange={handleChangeItem}
          className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="apiAccess" className="text-gray-700">
          API Access
        </label>
      </div>

      <button
        // onClick={handleSave}
        className="w-full py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition duration-200"
      >
        Save
      </button>
    </div>
  );

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
      {isEdit && <Modal data={modalData} />}
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
                          onClick={() => handleEdit(user)}
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
