import axios from "axios";
import { useEffect, useState } from "react";
import Divider from "../../../../Utils/Divider";
import { SkeletonLoader } from "../Users/Users";
import { FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { PricingPlanType } from "../../../../Utils/PlanData";
import Modal from "../../../Helper/Modal";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";

const Plans = () => {
  const [plans, setPlans] = useState<PricingPlanType[]>([]);
  const [isEdit, setIsEdit] = useState<Boolean>(false);
  const [isAdd, setIsAdd] = useState<Boolean>(false);

  const [item, setItem] = useState<PricingPlanType | null>(null);
  const [addItem, setAddItem] = useState<PricingPlanType | null>({
    name: "",
    price: 0,
    currency: "",
    textLimit: "",
    summariesPerDay: 0,
    fileUploads: false,
    customization: false,
    prioritySupport: false,
    apiAccess: false,
  });
  const handleEdit = (item: PricingPlanType) => {
    setIsEdit(true);
    setItem(item);
  };

  const handleChangeItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItem((prev) => prev && { ...prev, [e.target.name]: e.target.value });
  };
  const handleChangeAddItem = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAddItem((prev) => prev && { ...prev, [e.target.name]: e.target.value });

  const handleSave = async () => {
    isAdd
      ? (async () => {
          //   console.log(item, "ITEM");
          const res = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/add-plan`,
            { ...addItem },
            { withCredentials: true }
          );
          toast.success(res?.data?.message);
          setIsAdd(false);
          (async () => {
            const res = await axios.get(
              `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/plans`,
              { withCredentials: true }
            );
            setPlans(res?.data?.plans);
          })();
        })()
      : (async () => {
          const res = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/edit-plan`,
            { ...item },
            { withCredentials: true }
          );
          toast.success(res?.data?.message);
          setIsEdit(false);
          (async () => {
            const res = await axios.get(
              `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/plans`,
              { withCredentials: true }
            );
            setPlans(res?.data?.plans);
          })();
        })();
  };
  const modalData = (
    <div className="p-6 bg-white max-[600px]:mx-10 rounded-xl mx-auto mt-10 shadow-lg max-w-lg space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">
          Edit Pricing Plan
        </h2>
        <RxCross1
          onClick={() => setIsEdit(false)}
          className="cursor-pointer text-gray-500 hover:text-gray-800 transition duration-200"
        />
      </div>

      <div className="grid max-[600px]:grid-cols-1  grid-cols-2 gap-2">
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
          checked={item?.fileUploads}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setItem(
              (prev) => prev && { ...prev, [e.target.name]: e.target.checked }
            )
          }
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setItem(
              (prev) => prev && { ...prev, [e.target.name]: e.target.checked }
            )
          }
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setItem(
              (prev) => prev && { ...prev, [e.target.name]: e.target.checked }
            )
          }
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setItem(
              (prev) => prev && { ...prev, [e.target.name]: e.target.checked }
            )
          }
          className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="apiAccess" className="text-gray-700">
          API Access
        </label>
      </div>

      <button
        onClick={handleSave}
        className="w-full py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition duration-200"
      >
        Save
      </button>
    </div>
  );

  const addData = (
    <div
      key={isAdd ? 1 : 2}
      className="p-6 bg-white max-[600px]:mx-10 rounded-xl mx-auto mt-10 shadow-lg max-w-lg space-y-4"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">
          Add Pricing Plan
        </h2>
        <RxCross1
          onClick={() => setIsAdd(false)}
          className="cursor-pointer text-gray-500 hover:text-gray-800 transition duration-200"
        />
      </div>

      <div className="grid max-[600px]:grid-cols-1  grid-cols-2 gap-2">
        <input
          type="text"
          name="name"
          value={addItem?.name}
          onChange={handleChangeAddItem}
          placeholder="Plan Name"
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          name="price"
          value={item?.price}
          onChange={handleChangeAddItem}
          placeholder="Price"
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="currency"
          value={item?.currency}
          onChange={handleChangeAddItem}
          placeholder="Currency (e.g., USD, INR)"
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="textLimit"
          value={item?.textLimit}
          onChange={handleChangeAddItem}
          placeholder="Text Limit (e.g., 1000 words)"
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          name="summariesPerDay"
          value={item?.summariesPerDay}
          onChange={handleChangeAddItem}
          placeholder="Summaries Per Day (e.g., Unlimited)"
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="fileUploads"
          checked={item?.fileUploads}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAddItem(
              (prev) => prev && { ...prev, [e.target.name]: e.target.checked }
            )
          }
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAddItem(
              (prev) => prev && { ...prev, [e.target.name]: e.target.checked }
            )
          }
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAddItem(
              (prev) => prev && { ...prev, [e.target.name]: e.target.checked }
            )
          }
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAddItem(
              (prev) => prev && { ...prev, [e.target.name]: e.target.checked }
            )
          }
          className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="apiAccess" className="text-gray-700">
          API Access
        </label>
      </div>

      <button
        onClick={handleSave}
        className="w-full py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition duration-200"
      >
        Save
      </button>
    </div>
  );

  const handleDelete = async (id: string) => {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/delete-plan/${id}`,
      { withCredentials: true }
    );
    toast.success(res?.data?.message);
    (async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/plans`,
        { withCredentials: true }
      );
      setPlans(res?.data?.plans);
    })();
  };

  useEffect(() => {
    (async () => {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/plans`,
        {},
        { withCredentials: true }
      );
      setPlans(res?.data?.plans);
    })();
  }, []);

  return (
    <>
      {isAdd && <Modal data={addData} />}

      {isEdit && <Modal data={modalData} />}
      <div className="h-full w-full max-[600px]:mt-12 flex flex-col justify-center ">
        <div className="relative  px-4 py-10  shadow-lg  h-full">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold text-white text-left max-[600px]:text-sm">
              Plans
            </h1>
            <button
              onClick={() => {
                setItem(null);
                setIsAdd(true);
              }}
              className="bg-emerald-500 hover:bg-emerald-600 transition-all p-2 text-white font-semibold  rounded-sm"
            >
              + Add New
            </button>
          </div>
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
                          onClick={() => handleDelete(user?._id || "")}
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
