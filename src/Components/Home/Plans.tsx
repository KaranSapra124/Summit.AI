import Container from "../Global/Container";
import { PricingPlanType } from "../../Utils/PlanData";
import Divider from "../../Utils/Divider";
import { useEffect, useState } from "react";
import axios from "axios";
const Plans = () => {
  const [pricingPlans, setPricingPlans] = useState<PricingPlanType[]>([]);

  const isFeatureAvailable = (val: boolean, feature: string) => {
    return val ? `✔️ ${feature}` : `❌ ${feature}`;
  };

  useEffect(() => {
    const fetchPlans = async () => {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/get-plans`,
        {},
        {
          withCredentials: true,
        }
      );
      setPricingPlans(res?.data?.plans);
    };
    fetchPlans();
  },[]);
  return (
    <>
      <Container className="bg-gradient-to-br  from-black/60 via-gray-900/90 to-black/90">
        <h1 className="text-5xl max-[600px]:text-xl text-white font-bold text-center my-4 max-[600px]:my-2">
          Explore Our{" "}
          <span className="text-emerald-500 font-extrabold">Pocket</span>{" "}
          Friendly Plans!
        </h1>
        <p className="text-center text-gray-300 font-semibold text-xs my-6 max-[600px]:my-3.5">
          Wanna Try our product , but low on 💵 , don't worry!
        </p>
        <Divider className="h-1 w-12 mx-auto bg-emerald-500 rounded-full my-4" />
        <div className="flex max-[600px]:flex-col justify-around max-[600px]:gap-4">
          {pricingPlans
            ?.filter((elem) => elem.name !== "Free Plan")
            .map((elem: PricingPlanType, index: number) => {
              return (
                <div
                  key={index}
                  className="border-l-2 border-b-2 border-emerald-500 p-2 max-[600px]:w-full max-[600px]:rounded-lg bg-gradient-to-br from-black/50 to-black/90 w-96 rounded"
                >
                  <h2 className="text-xl text-white font-medium max-[600px]:text-xs">
                    {elem?.name}
                  </h2>
                  <p className="text-white text-2xl max-[600px]:text-xl max-[600px]:my-4 my-2 font-bold">
                    {elem?.price === "Custom Pricing"
                      ? elem?.price
                      : `₹ ${elem?.price}`}
                  </p>
                  <Divider className="h-1 w-12 bg-emerald-500 rounded-full my-4" />
                  <button className="bg-emerald-500 cursor-pointer max-[600px]:text-sm  hover:scale-[102%] transition-all w-full text-white font-medium py-2 rounded-sm text-lg ">
                    {elem?.price === 0 ? "Try Now" : "Buy Now"}
                  </button>
                  <div className="py-2 ">
                    <p
                      className={`${
                        elem?.fileUploads
                          ? "text-emerald-800 max-[600px]:text-xs py-1.5 max-[600px]:py-2 brightness-200 font-extrabold"
                          : "text-red-500 line-through max-[600px]:text-xs py-1.5 max-[600px]:py-2 brightness-200 font-extrabold"
                      }`}
                    >
                      {isFeatureAvailable(elem?.fileUploads, "File Uploads")}
                    </p>
                    <p
                      className={`${
                        elem?.fileUploads
                          ? "text-emerald-800 max-[600px]:text-xs max-[600px]:py-2  py-1.5 brightness-200 font-extrabold"
                          : "text-red-500 line-through  max-[600px]:text-xs max-[600px]:py-2 py-1.5 brightness-200 font-extrabold"
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
                          ? "text-emerald-800 max-[600px]:text-xs max-[600px]:py-2 py-1.5 brightness-200 font-extrabold"
                          : "text-red-500 line-through max-[600px]:text-xs max-[600px]:py-2 py-1.5 brightness-200 font-extrabold"
                      }`}
                    >
                      {isFeatureAvailable(elem?.customization, "Customization")}
                    </p>
                    <p className="text-white  font-light max-[600px]:text-xs max-[600px]:my-2  text-sm">
                      Summaries Limit :{" "}
                      <span className="text-emerald-500 px-1 font-extrabold">
                        {elem?.summariesPerDay}
                      </span>
                    </p>
                    <p className="text-white max-[600px]:text-xs font-light   text-sm">
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

export default Plans;
