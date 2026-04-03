import axios from "axios";
import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaPlus, FaMoneyBillWave, FaTrophy, FaLayerGroup } from "react-icons/fa";
import { PricingPlanType } from "../../../../Utils/PlanData";
import Modal from "../../../Helper/Modal";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";

const Plans = () => {
  const [plans, setPlans] = useState<PricingPlanType[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isAdd, setIsAdd] = useState<boolean>(false);

  const [item, setItem] = useState<PricingPlanType | null>(null);
  const [addItem, setAddItem] = useState<PricingPlanType | null>({
    name: "",
    price: 0,
    currency: "USD",
    textLimit: "",
    summariesPerDay: 0,
    fileUploads: false,
    customization: false,
    prioritySupport: false,
    apiAccess: false,
  });

  const fetchPlans = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/plans`,
        {},
        { withCredentials: true }
      );
      setPlans(res?.data?.plans);
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleEdit = (item: PricingPlanType) => {
    setItem({ ...item });
    setIsEdit(true);
  };

  const handleSave = async () => {
    const payload = isAdd ? addItem : item;
    const endpoint = isAdd ? "add-plan" : "edit-plan";

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/${endpoint}`,
        { ...payload },
        { withCredentials: true }
      );
      toast.success(res?.data?.message || "Plan synchronized successfully");
      setIsAdd(false);
      setIsEdit(false);
      fetchPlans();
    } catch (error) {
      toast.error("Critical synchronization error");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Purge this pricing tier from reality?")) {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/delete-plan/${id}`,
          { withCredentials: true }
        );
        toast.success(res?.data?.message || "Plan purged");
        fetchPlans();
      } catch (error) {
        toast.error("Decline: Plan protection active");
      }
    }
  };

  const PlanForm = ({ data, setData }: { data: PricingPlanType | null, setData: React.Dispatch<React.SetStateAction<PricingPlanType | null>> }) => (
    <div className="glass p-8 md:p-12 rounded-[3.5rem] border-white/10 shadow-2xl animate-in zoom-in duration-500 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
      <header className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">Tier <span className="gradient-text-emerald">Architecture</span></h2>
          <p className="text-white/40 text-sm font-medium">Configuring service boundaries and financial parameters.</p>
        </div>
        <button
          onClick={() => { setIsEdit(false); setIsAdd(false); }}
          className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-white/50 hover:text-white transition-all"
        >
          <RxCross1 size={20} />
        </button>
      </header>

      <div className="space-y-10">
        {/* Economic Strategy Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="group relative">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-white/20 group-focus-within:text-emerald-400">
              <FaLayerGroup size={18} />
            </div>
            <input
              name="name"
              value={data?.name || ""}
              onChange={(e) => setData(prev => prev ? { ...prev, name: e.target.value } : null)}
              className="w-full pl-14 pr-6 py-5 bg-white/5 border border-white/5 rounded-2xl text-white placeholder:text-white/10 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all font-inter"
              placeholder="Plan Nomenclature"
            />
          </div>

          <div className="group relative flex gap-3">
            <input
              name="price"
              type="number"
              value={data?.price || 0}
              onChange={(e) => setData(prev => prev ? { ...prev, price: Number(e.target.value) } : null)}
              className="w-full pl-6 pr-6 py-5 bg-white/5 border border-white/5 rounded-2xl text-white placeholder:text-white/10 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all font-inter"
              placeholder="Price Value"
            />
            <input
              name="currency"
              value={data?.currency || ""}
              onChange={(e) => setData(prev => prev ? { ...prev, currency: e.target.value } : null)}
              className="w-32 px-6 py-5 bg-white/5 border border-white/5 rounded-2xl text-white text-center font-black focus:outline-none focus:border-emerald-500/50 transition-all uppercase"
              placeholder="Unit"
            />
          </div>
        </div>

        {/* Operational Boundaries */}
        <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/5">
          <h3 className="text-lg font-black text-white/40 mb-8 uppercase tracking-widest flex items-center gap-2">
            <FaMoneyBillWave className="text-emerald-400" /> Resource Allocation
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-4">Neural Capacity (Limit)</label>
              <input
                name="textLimit"
                value={data?.textLimit || ""}
                onChange={(e) => setData(prev => prev ? { ...prev, textLimit: e.target.value } : null)}
                placeholder="e.g., 50k Characters"
                className="w-full px-6 py-4 bg-surface-base/50 border border-white/5 rounded-2xl text-white text-sm font-bold focus:outline-none focus:border-emerald-500/30 transition-all font-inter"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-4">Daily Extraction Unit</label>
              <input
                name="summariesPerDay"
                type="number"
                value={data?.summariesPerDay || 0}
                onChange={(e) => setData(prev => prev ? { ...prev, summariesPerDay: Number(e.target.value) } : null)}
                className="w-full px-6 py-4 bg-surface-base/50 border border-white/5 rounded-2xl text-white text-sm font-bold focus:outline-none focus:border-emerald-500/30 transition-all font-inter"
              />
            </div>
          </div>
        </div>

        {/* Enterprise Protocols */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "File Uploads", key: "fileUploads" },
            { label: "Deep Custom", key: "customization" },
            { label: "Priority Sup", key: "prioritySupport" },
            { label: "N-API Access", key: "apiAccess" }
          ].map((proto) => (
            <div key={proto.key} className="p-5 rounded-2xl bg-white/2 border border-white/5 hover:border-emerald-500/20 transition-all group flex flex-col items-center">
              <label className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-4">{proto.label}</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!(data as any)?.[proto.key]}
                  onChange={(e) => setData(prev => prev ? { ...prev, [proto.key]: e.target.checked } : null)}
                  className="sr-only peer"
                />
                <div className="w-10 h-6 bg-white/5 border border-white/10 rounded-full peer peer-checked:bg-emerald-500/40 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white/20 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full" />
              </label>
            </div>
          ))}
        </div>

        {/* Commit Shell */}
        <button
          onClick={handleSave}
          className="w-full py-6 rounded-2xl bg-linear-to-r from-emerald-500 to-teal-500 text-white font-black hover:glow-emerald transition-all shadow-xl shadow-emerald-500/20 uppercase tracking-widest text-xs"
        >
          Synchronize Configuration
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {isAdd && <Modal data={<PlanForm data={addItem} setData={setAddItem} />} />}
      {isEdit && <Modal data={<PlanForm data={item} setData={setItem} />} />}

      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-4 border-emerald-500/20">
            <FaTrophy size={10} className="text-emerald-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Enterprise Pricing Matrix</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white">Service <span className="gradient-text-emerald">Tiers</span></h1>
        </div>
        <button
          onClick={() => {
            setAddItem({
              name: "",
              price: 0,
              currency: "USD",
              textLimit: "",
              summariesPerDay: 0,
              fileUploads: false,
              customization: false,
              prioritySupport: false,
              apiAccess: false,
            });
            setIsAdd(true);
          }}
          className="flex items-center gap-3 px-8 py-4 bg-emerald-500 text-white rounded-2xl font-black hover:glow-emerald transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-emerald-500/20 uppercase tracking-widest text-xs"
        >
          <FaPlus /> Deploy New Tier
        </button>
      </header>

      <div className="glass rounded-[3rem] border-white/5 shadow-2xl overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/2">
                <th className="px-8 py-6 text-[10px] font-black text-white/20 uppercase tracking-widest">Nomenclature</th>
                <th className="px-8 py-6 text-[10px] font-black text-white/20 uppercase tracking-widest">Financial Load</th>
                <th className="px-8 py-6 text-[10px] font-black text-white/20 uppercase tracking-widest">Capacity</th>
                <th className="px-8 py-6 text-[10px] font-black text-white/20 uppercase tracking-widest">Capabilities</th>
                <th className="px-8 py-6 text-[10px] font-black text-white/20 uppercase tracking-widest text-right">Directive</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/2">
              {plans.length > 0 ? (
                plans.map((plan) => (
                  <tr key={plan._id} className="group hover:bg-white/2 transition-all font-inter">
                    <td className="px-8 py-6 uppercase font-black tracking-tight text-white/80 group-hover:text-white transition-colors">{plan.name}</td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-white/40">{plan.currency}</span>
                        <span className="text-xl font-black text-white">{plan.price}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-white tracking-tight">{plan.summariesPerDay} Daily Units</span>
                        <span className="text-[10px] text-white/20 font-black uppercase tracking-widest">{plan.textLimit}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex gap-2">
                        {plan.apiAccess && <div className="w-2 h-2 rounded-full bg-emerald-500" title="API Access" />}
                        {plan.prioritySupport && <div className="w-2 h-2 rounded-full bg-purple-500" title="Priority Support" />}
                        {plan.fileUploads && <div className="w-2 h-2 rounded-full bg-blue-500" title="File Uploads" />}
                        {!plan.apiAccess && !plan.prioritySupport && !plan.fileUploads && <span className="text-[10px] text-white/10 font-bold uppercase italic tracking-widest">Basic Limits</span>}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(plan)}
                          className="w-10 h-10 glass rounded-xl flex items-center justify-center text-white/20 hover:text-emerald-400 hover:border-emerald-500/30 transition-all shadow-sm"
                          title="Recalibrate Tier"
                        >
                          <FaEdit size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(plan._id || "")}
                          className="w-10 h-10 glass rounded-xl flex items-center justify-center text-white/20 hover:text-red-400 hover:border-red-500/30 transition-all shadow-sm"
                          title="Purge Operation"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-20 text-center">
                    <div className="animate-pulse space-y-4">
                      <div className="w-12 h-12 bg-white/2 rounded-2xl mx-auto border border-white/5" />
                      <p className="text-xs font-black text-white/10 uppercase tracking-[0.5em]">Synchronizing Tier Registry...</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <footer className="px-8 text-[10px] text-white/10 font-black uppercase tracking-[0.4em] flex justify-between">
        <span>Global Commerce Matrix</span>
        <span>Security Protocol v4.0.1</span>
      </footer>
    </div>
  );
};

export default Plans;
