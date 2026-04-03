import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { FaEdit, FaTrash, FaUserShield, FaEnvelope, FaIdCard, FaChartPie, FaCheckCircle } from "react-icons/fa";
import { userDataInterface } from "../../../../Utils/UserReducer";
import Modal from "../../../Helper/Modal";
import { RxCross1 } from "react-icons/rx";

const Users = () => {
  const [users, setUsers] = useState<userDataInterface[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [finalEditItem, setFinalEditItem] = useState<userDataInterface | undefined>(undefined);

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

  const handleEdit = (item: userDataInterface) => {
    setFinalEditItem({ ...item });
    setIsEdit(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!name) return;

    setFinalEditItem((prev) => {
      if (!prev) return undefined;
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handlePlanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFinalEditItem((prev) => {
      if (!prev) return undefined;
      return {
        ...prev,
        purchasePlan: {
          ...prev.purchasePlan,
          [name]: value
        }
      };
    });
  };

  const handleEditSubmit = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/edit-user`,
        { ...finalEditItem },
        { withCredentials: true }
      );
      setIsEdit(false);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async (user: userDataInterface) => {
    if (window.confirm(`Are you sure you want to delete user ${user.name}?`)) {
      try {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/delete-user/${user._id}`,
          {},
          { withCredentials: true }
        );
        await fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const editModalContent = useMemo(() => (
    <div className="glass p-8 md:p-12 rounded-[3.5rem] border-white/10 shadow-2xl animate-in zoom-in duration-500 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
      <header className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">Authority <span className="gradient-text-emerald">Override</span></h2>
          <p className="text-white/40 text-sm font-medium">Modifying user privileges and subscription parameters.</p>
        </div>
        <button
          onClick={() => setIsEdit(false)}
          className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-white/50 hover:text-white transition-all"
        >
          <RxCross1 size={20} />
        </button>
      </header>

      <div className="space-y-10">
        {/* Core Identity Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="group relative">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-white/20 group-focus-within:text-emerald-400">
              <FaIdCard size={18} />
            </div>
            <input
              type="text"
              name="name"
              value={finalEditItem?.name || ""}
              onChange={handleChange}
              className="w-full pl-14 pr-6 py-5 bg-white/5 border border-white/5 rounded-2xl text-white placeholder:text-white/10 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all font-inter"
              placeholder="User Display Name"
            />
          </div>

          <div className="group relative">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-white/20 group-focus-within:text-emerald-400">
              <FaEnvelope size={18} />
            </div>
            <input
              type="email"
              name="email"
              value={finalEditItem?.email || ""}
              onChange={handleChange}
              readOnly
              className="w-full pl-14 pr-6 py-5 bg-white/5 border border-white/5 rounded-2xl text-white/40 cursor-not-allowed font-inter"
              placeholder="User Email Address"
            />
          </div>
        </div>

        {/* Plan Details Section */}
        <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/5">
          <h3 className="text-lg font-black text-white/40 mb-8 uppercase tracking-widest flex items-center gap-2">
            <FaChartPie className="text-emerald-400" /> Subscription Matrix
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-4">Plan Name</label>
              <input
                type="text"
                name="name"
                value={finalEditItem?.purchasePlan?.name || ""}
                onChange={handlePlanChange}
                className="w-full px-6 py-4 bg-surface-base/50 border border-white/5 rounded-2xl text-white text-sm font-bold focus:outline-none focus:border-emerald-500/30 transition-all font-inter"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-4">Price Pnt</label>
              <input
                type="text"
                name="price"
                value={String(finalEditItem?.purchasePlan?.price || "")}
                onChange={handlePlanChange}
                className="w-full px-6 py-4 bg-surface-base/50 border border-white/5 rounded-2xl text-white text-sm font-bold focus:outline-none focus:border-emerald-500/30 transition-all font-inter"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-4">Text Cap</label>
              <input
                type="text"
                name="textLimit"
                value={String(finalEditItem?.purchasePlan?.textLimit || "")}
                onChange={handlePlanChange}
                className="w-full px-6 py-4 bg-surface-base/50 border border-white/5 rounded-2xl text-white text-sm font-bold focus:outline-none focus:border-emerald-500/30 transition-all font-inter"
              />
            </div>
          </div>
          <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <FaCheckCircle className="text-emerald-400" />
              </div>
              <div>
                <p className="text-xs font-black text-white uppercase tracking-tight">Active Operations</p>
                <p className="text-[10px] text-white/30 font-medium">Toggle user system access status.</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={!!finalEditItem?.isActive}
                onChange={(e) => setFinalEditItem(prev => prev ? { ...prev, isActive: e.target.checked } : undefined)}
                className="sr-only peer"
              />
              <div className="w-14 h-8 bg-white/10 rounded-full peer peer-checked:bg-emerald-500/50 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white/30 after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:after:translate-x-full"></div>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-6">
          <button
            onClick={() => setIsEdit(false)}
            className="py-5 rounded-2xl glass text-white font-bold hover:bg-white/10 transition-all uppercase tracking-widest text-xs"
          >
            Discard Changes
          </button>
          <button
            onClick={handleEditSubmit}
            className="py-5 rounded-2xl bg-linear-to-r from-emerald-500 to-teal-500 text-white font-black hover:glow-emerald transition-all shadow-xl shadow-emerald-500/20 uppercase tracking-widest text-xs"
          >
            Commit Updates
          </button>
        </div>
      </div>
    </div>
  ), [finalEditItem]);

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {isEdit && <Modal data={editModalContent} />}

      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-4 border-emerald-500/20">
            <FaUserShield size={10} className="text-emerald-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Database Administration</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white">System <span className="gradient-text-emerald">Users</span></h1>
        </div>
        <div className="flex items-center gap-4 px-6 py-3 glass rounded-2xl border-white/5">
          <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Total Entities</span>
          <span className="text-2xl font-black text-white">{users.length}</span>
        </div>
      </header>

      <div className="glass rounded-[3rem] border-white/5 shadow-2xl overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/2">
                <th className="px-8 py-6 text-[10px] font-black text-white/20 uppercase tracking-widest">Identified User</th>
                <th className="px-8 py-6 text-[10px] font-black text-white/20 uppercase tracking-widest">Digital Address</th>
                <th className="px-8 py-6 text-[10px] font-black text-white/20 uppercase tracking-widest">Subscription</th>
                <th className="px-8 py-6 text-[10px] font-black text-white/20 uppercase tracking-widest">Usage Stat</th>
                <th className="px-8 py-6 text-[10px] font-black text-white/20 uppercase tracking-widest text-right">Directives</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/2">
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id} className="group hover:bg-white/2 transition-all">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center font-black text-xs text-emerald-400 group-hover:bg-emerald-500/10 transition-colors">
                          {user.name ? user.name[0].toUpperCase() : 'U'}
                        </div>
                        <span className="font-bold text-white tracking-tight">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 font-medium text-white/40 group-hover:text-white/60 transition-colors font-inter text-sm">{user.email}</td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${user?.purchasePlan?.name === 'Pro Plan' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                        {user?.purchasePlan?.name || "No Plan"}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="flex-grow w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-500/50 rounded-full"
                            style={{ width: `${Math.min((Number(user?.purchasePlan?.summariesPerDay || 0) / 50) * 100, 100)}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-white/40">{user?.purchasePlan?.summariesPerDay || 0}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(user)}
                          className="w-10 h-10 glass rounded-xl flex items-center justify-center text-white/20 hover:text-emerald-400 hover:border-emerald-500/30 transition-all shadow-sm"
                          title="Edit Configuration"
                        >
                          <FaEdit size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(user)}
                          className="w-10 h-10 glass rounded-xl flex items-center justify-center text-white/20 hover:text-red-400 hover:border-red-500/30 transition-all shadow-sm"
                          title="Purge Identity"
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
                      <div className="w-12 h-12 bg-white/5 rounded-full mx-auto" />
                      <p className="text-xs font-black text-white/10 uppercase tracking-[0.5em]">Synchronizing Registry...</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <footer className="px-8 text-[10px] text-white/10 font-black uppercase tracking-[0.2em] flex justify-between">
        <span>Encrypted Administrative Interface</span>
        <span>Security Protocol v4.0.1</span>
      </footer>
    </div>
  );
};

export default Users;
