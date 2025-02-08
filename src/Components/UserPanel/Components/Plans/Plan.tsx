import Container from "../../../Global/Container";
import {  PricingPlanType } from "../../../../Utils/PlanData";
import Divider from "../../../../Utils/Divider";
import { useEffect, useState } from "react";
import axios from "axios";
import { RxCross1 } from "react-icons/rx";
import Modal from "../../../Helper/Modal";
const Plan = () => {
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [response, setResponse] = useState<String>("");
  const [plans, setPlans] = useState<[]>([]);
  const isFeatureAvailable = (val: boolean, feature: string) => {
    return val ? `✔️ ${feature}` : `❌ ${feature}`;
  };
  const handlePurchase = async (item: PricingPlanType) => {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/purchase-plan`,
      { item },
      { withCredentials: true }
    );
    setResponse(res?.data?.message);
    setIsOpen(true);
  };
  const modalData = (
    <div>
      <h1 >{response}</h1>
      <RxCross1
        onClick={() => setIsOpen(false)}
        className="bg-emerald-500 p-1 text-xl rounded-md"
      />
    </div>
  );
  useEffect(() => {
    const fetchPlans = async () => {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/get-plans`,
        {},
        {
          withCredentials: true,
        }
      );
      setPlans(res?.data?.plans);
    };
    fetchPlans();
  }, []);
  return (
    <>
      {isOpen && <Modal data={modalData} />}
      <Container className="bg-black/95 relative h-full">
        <h1 className="text-5xl text-white font-bold text-center my-4">
          Explore Our{" "}
          <span className="text-emerald-500 font-extrabold">Pocket</span>{" "}
          Friendly Plans!
        </h1>
        <p className="text-center text-gray-300 font-semibold text-xs my-6">
          Wanna Try our product , but low on 💵 , don't worry!
        </p>
        <Divider className="h-1 w-12 mx-auto bg-emerald-500 rounded-full my-4" />
        <div className="flex justify-center gap-4">
          {plans
            ?.filter((elem: PricingPlanType) => elem?.name !== "Free Plan")
            ?.map((elem: PricingPlanType, index: number) => {
              return (
                <div
                  key={index}
                  className="border-l-2 border-b-2 border-emerald-500 p-2  bg-gradient-to-br from-black/50 to-black/90 w-96 rounded"
                >
                  <h2 className="text-xl text-white font-medium">
                    {elem?.name}
                  </h2>
                  <p className="text-white text-2xl my-2 font-bold">
                    {elem?.price === "Custom Pricing"
                      ? elem?.price
                      : `₹ ${elem?.price}`}
                  </p>
                  <Divider className="h-1 w-12 bg-emerald-500 rounded-full my-4" />
                  <button
                    onClick={() => handlePurchase(elem)}
                    className="bg-emerald-500 cursor-pointer  hover:scale-[102%] transition-all w-full text-white font-medium py-2 rounded-sm text-lg "
                  >
                    {elem?.price === 0 ? "Try Now" : "Buy Now"}
                  </button>
                  <div className="py-2 ">
                    <p
                      className={`${
                        elem?.fileUploads
                          ? "text-emerald-800 py-1.5 brightness-200 font-extrabold"
                          : "text-red-500 line-through py-1.5 brightness-200 font-extrabold"
                      }`}
                    >
                      {isFeatureAvailable(elem?.fileUploads, "File Uploads")}
                    </p>
                    <p
                      className={`${
                        elem?.fileUploads
                          ? "text-emerald-800 py-1.5 brightness-200 font-extrabold"
                          : "text-red-500 line-through py-1.5 brightness-200 font-extrabold"
                      }`}
                    >
                      {isFeatureAvailable(
                        elem?.prioritySupport,
                        "Priority Support"
                      )}
                    </p>
                    <p
                      className={`${
                        elem?.customization
                          ? "text-emerald-800 py-1.5 brightness-200 font-extrabold"
                          : "text-red-500 line-through py-1.5 brightness-200 font-extrabold"
                      }`}
                    >
                      {isFeatureAvailable(elem?.customization, "Customization")}
                    </p>
                    <p className="text-white  font-light   text-sm">
                      Summaries Limit :{" "}
                      <span className="text-emerald-500 px-1 font-extrabold">
                        {elem?.summariesPerDay}
                      </span>
                    </p>
                    <p className="text-white  font-light   text-sm">
                      Text Limit :{" "}
                      <span className="text-emerald-500 px-1 font-extrabold">
                        {elem?.textLimit}
                      </span>
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </Container>
    </>
  );
};

export default Plan;
