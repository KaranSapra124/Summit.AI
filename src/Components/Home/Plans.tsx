import Container from "../Global/Container";
import { pricingPlans, PricingPlanType } from "../../Utils/PlanData";
const Plans = () => {
  const isFeatureAvailable = (val: boolean, feature: string) => {
    return val ? `✔️ ${feature}` : `❌ ${feature}`;
  };
  return (
    <>
      <Container className="">
        <h1 className="text-5xl font-bold text-center my-4">
          Explore Our{" "}
          <span className="text-emerald-500 font-extrabold">Pocket</span>{" "}
          Friendly Plans!
        </h1>
        <p className="text-center text-gray-700 font-bold my-6">Wanna Try our product , but low on 💵 , don't worry!</p>
        <div className="flex justify-around">
          {pricingPlans?.map((elem: PricingPlanType, index: number) => {
            return (
              <div key={index} className=" p-4 bg-black/80 w-96 rounded">
                <h2 className="text-xl text-white font-medium">{elem?.name}</h2>
                <p className="text-white text-2xl my-2 font-bold">
                  {elem?.price === "Custom Pricing"
                    ? elem?.price
                    : `₹ ${elem?.price}`}
                </p>
                <button className="bg-emerald-500 cursor-pointer hover:scale-105 transition-all w-full text-white font-medium py-2 rounded-sm text-lg ">
                  {elem?.price === 0 ? "Try Now" : "Buy Now"}
                </button>
                <div className="py-4 ">
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

export default Plans;
