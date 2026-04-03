import { PricingPlanType } from "../../Utils/PlanData";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Plans = () => {
  const [pricingPlans, setPricingPlans] = useState<PricingPlanType[]>([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/get-plans`,
          {},
          {
            withCredentials: true,
          }
        );
        setPricingPlans(res?.data?.plans);
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };
    fetchPlans();
  }, []);

  return (
    <section id="pricing" className="py-24 relative overflow-hidden transition-colors duration-300">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full -z-10" />
      
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-5 duration-700">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-light mb-4 block">Pricing Matrix</span>
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-main uppercase">
            Flexible <span className="gradient-text">Pricing</span> Plans
          </h2>
          <div className="h-1.5 w-24 bg-linear-to-r from-primary to-secondary mx-auto rounded-full mb-8 shadow-lg shadow-primary/20" />
          <p className="text-lg text-muted leading-relaxed font-medium">
            Choose the perfect plan that fits your needs. From personal use to professional scales, we've got you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-stretch">
          {pricingPlans
            ?.filter((elem) => elem.name !== "Free Plan")
            .map((elem: PricingPlanType, index: number) => {
              const isPremium = elem.name.toLowerCase().includes("premium") || elem.name.toLowerCase().includes("pro");
              
              return (
                <div
                  key={index}
                  className={`relative flex flex-col p-10 rounded-[3rem] glass transition-all duration-500 hover:scale-[1.02] border-white/5 ${
                    isPremium ? 'border-primary/30 ring-1 ring-primary/30 bg-surface-highest/50 shadow-2xl shadow-primary/20' : ''
                  }`}
                >
                  {isPremium && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-linear-to-r from-primary to-secondary text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-xl">
                      Most Popular
                    </div>
                  )}

                  <div className="mb-10 text-center md:text-left">
                    <h3 className="text-xl font-black text-main mb-3 uppercase tracking-tight">{elem.name}</h3>
                    <div className="flex items-baseline justify-center md:justify-start gap-1">
                      <span className="text-5xl font-black text-main tracking-tighter">
                        {elem.price === "Custom Pricing" ? "" : "₹"}
                        {elem.price}
                      </span>
                      {elem.price !== "Custom Pricing" && <span className="text-muted text-xs font-bold uppercase tracking-widest">/ Month</span>}
                    </div>
                  </div>

                  <div className="h-px w-full bg-white/5 mb-10" />

                  <div className="flex-grow flex flex-col gap-6 mb-12">
                    <FeatureItem available={elem.fileUploads} label="File Uploads" />
                    <FeatureItem available={elem.prioritySupport} label="Priority Support" />
                    <FeatureItem available={elem.customization} label="Customization" />
                    
                    <div className="mt-4 p-6 rounded-3xl bg-white/5 flex flex-col gap-4 border border-white/5 shadow-inner">
                       <div className="flex justify-between items-center text-xs">
                          <span className="text-muted font-bold uppercase tracking-widest leading-none">Daily Extraction</span>
                          <span className="text-primary-light font-black uppercase tracking-tighter">{elem.summariesPerDay} Units</span>
                       </div>
                       <div className="flex justify-between items-center text-xs">
                          <span className="text-muted font-bold uppercase tracking-widest leading-none">Neural Capacity</span>
                          <span className="text-primary-light font-black uppercase tracking-tighter">{elem.textLimit}</span>
                       </div>
                    </div>
                  </div>

                  <button 
                    className={`w-full py-5 rounded-2xl font-black text-lg transition-all duration-300 transform active:scale-95 uppercase tracking-widest text-xs ${
                      isPremium 
                        ? 'bg-linear-to-r from-primary to-secondary text-white hover:glow-indigo shadow-xl' 
                        : 'glass text-main hover:bg-white/10'
                    }`}
                  >
                    {elem.price === 0 ? "Initiate Terminal" : "Ascend Now"}
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

const FeatureItem = ({ available, label }: { available: boolean; label: string }) => (
  <div className={`flex items-center gap-4 text-xs font-bold uppercase tracking-widest ${available ? "text-main" : "text-muted opacity-30"}`}>
    {available ? (
      <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center border border-primary-light/20">
        <FaCheckCircle className="text-primary-light" />
      </div>
    ) : (
      <div className="w-6 h-6 bg-white/5 rounded-lg flex items-center justify-center border border-white/5">
        <FaTimesCircle className="text-muted" />
      </div>
    )}
    <span className={available ? "" : "line-through"}>{label}</span>
  </div>
);

export default Plans;
