import { useContext, useState } from "react";
import { UserContext } from "../../../../Utils/UserContext";
import { userDataInterface, userState } from "../../../../Utils/UserReducer";
import Modal from "../../../Helper/Modal";
import Plan from "../Plans/Plan";
import { RxCross1 } from "react-icons/rx";
import { FaMagic, FaExclamationCircle, FaLightbulb, FaCheckCircle, FaChevronDown, FaSpinner } from "react-icons/fa";
import axios from "axios";

const Layout = () => {
  interface grammarType {
    correction: string;
    issue: string;
  }

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    para: "",
    selectedVal: "Select Value",
  });
  const context = useContext(UserContext);
  const { userData } = context as userState;
  const { purchasePlan } = userData as userDataInterface;

  const [grammarMistakes, setGrammarMistakes] = useState<grammarType[]>([]);
  const [isGrammarMistkesOpen, setIsGrammarMistakes] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [values] = useState(["correct", "summarize", "grammar", "detect", "Enhance My Writing"]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleSubmit = async (data: typeof formData) => {
    if (!formData.para || formData.selectedVal === "Select Value") {
        return;
    }
    setIsLoading(true);
    try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/get-result`,
          { data },
          { withCredentials: true }
        );
        
        if (formData?.selectedVal === "Enhance My Writing") {
          const rawData = res?.data?.result;
          const cleanJson = rawData?.replace(/```json|```/g, '').trim();
          const parsed = JSON.parse(cleanJson);
    
          setGrammarMistakes(parsed.grammarIssues || []);
          setFormData((prev) => ({
            ...prev,
            para: parsed?.correctedEssay,
          }));
          setSuggestions(parsed.suggestions || []);
          setIsGrammarMistakes(true);
        } else {
          setFormData((prev) => ({
            ...prev,
            para: res?.data?.result || "",
          }));
        }
    } catch (error) {
        console.error("Error processing text:", error);
    } finally {
        setIsLoading(false);
    }
  };

  const modalData = (
    <div className="relative glass p-10 rounded-[2.5rem] border-white/10 shadow-2xl animate-in zoom-in duration-300 max-w-2xl w-full">
      <Plan />
      <button
        onClick={() => setIsOpen(false)}
        className="absolute top-6 right-6 w-10 h-10 glass rounded-full flex items-center justify-center text-white/50 hover:text-white transition-all"
      >
        <RxCross1 size={18} />
      </button>
    </div>
  );

  const grammarModalData = (
    <div className="glass p-8 md:p-12 rounded-[3rem] border-white/10 shadow-2xl animate-in slide-in-from-bottom-8 duration-500 max-w-4xl w-full max-h-[85vh] overflow-y-auto">
        <header className="flex items-center justify-between mb-10">
            <div>
                <h2 className="text-3xl font-black text-white mb-2">Enhancement <span className="gradient-text">Results</span></h2>
                <p className="text-white/40 text-sm">Review the AI-powered improvements and suggestions for your content.</p>
            </div>
            <button
                onClick={() => setIsGrammarMistakes(false)}
                className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-white/50 hover:text-white transition-all"
            >
                <RxCross1 size={20} />
            </button>
        </header>

        <div className="space-y-10">
            {/* Corrected Text */}
            <div className="group p-8 rounded-[2rem] bg-emerald-500/5 border border-emerald-500/10 hover:border-emerald-500/30 transition-all">
                <div className="flex items-center gap-3 mb-6">
                    <FaCheckCircle className="text-emerald-400 text-xl" />
                    <h3 className="text-xl font-bold text-white">Corrected Version</h3>
                </div>
                <p className="text-white/80 leading-relaxed font-medium bg-surface-base/50 p-6 rounded-2xl border border-white/5">
                    {formData?.para}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Grammar Issues */}
                <div className="p-8 rounded-[2rem] bg-red-500/5 border border-red-500/10">
                    <div className="flex items-center gap-3 mb-6 text-red-400">
                        <FaExclamationCircle className="text-xl" />
                        <h3 className="text-xl font-bold">Grammar Issues</h3>
                    </div>
                    <div className="space-y-4">
                        {grammarMistakes.map((elem, index) => (
                            <div key={index} className="p-4 rounded-xl bg-surface-base/50 border border-white/5 flex flex-col gap-1">
                                <span className="text-xs font-black uppercase tracking-widest text-white/20">Issue</span>
                                <p className="text-red-300 font-bold text-sm mb-2">{elem.issue}</p>
                                <span className="text-xs font-black uppercase tracking-widest text-white/20">Correction</span>
                                <p className="text-emerald-400 font-bold text-sm">{elem.correction}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Suggestions */}
                <div className="p-8 rounded-[2rem] bg-purple-500/5 border border-purple-500/10">
                    <div className="flex items-center gap-3 mb-6 text-purple-400">
                        <FaLightbulb className="text-xl" />
                        <h3 className="text-xl font-bold">Suggestions</h3>
                    </div>
                    <ul className="space-y-4">
                        {suggestions.map((tip, index) => (
                            <li key={index} className="flex gap-3 text-sm text-white/70 leading-relaxed group">
                                <span className="text-primary-light font-bold">0{index + 1}.</span>
                                <span className="group-hover:text-white transition-colors">{tip}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      {isOpen && <Modal data={modalData} />}
      {isGrammarMistkesOpen && <Modal data={grammarModalData} />}

      {purchasePlan?.summariesPerDay !== 0 ? (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
          <header className="mb-12">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-4">
                <span className="w-2 h-2 rounded-full bg-primary-light animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-primary-light">AI Neural Interface Active</span>
             </div>
             <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                Transform Your <span className="gradient-text">Content.</span>
             </h1>
             <p className="text-white/40 text-lg font-medium max-w-2xl">
                Experience the pure power of Summit.AI. Select an action and let our intelligence do the heavy lifting.
             </p>
          </header>

          <div className="relative glass p-4 md:p-8 rounded-[3rem] border-white/5 flex flex-col md:flex-row gap-8 items-stretch mb-8 shadow-2xl">
             <textarea
                cols={10}
                rows={10}
                placeholder="Paste or type your content here to begin processing..."
                className="flex-grow p-8 text-lg rounded-[2rem] glass bg-surface-base/30 text-white placeholder:text-white/10 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary-light/30 transition-all resize-none font-inter"
                value={formData?.para}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    para: e.target.value,
                  }))
                }
             />

             <div className="md:w-64 flex flex-col gap-4">
                <p className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-4">Select AI Skill</p>
                <div className="relative">
                    <button
                        className="group w-full py-5 px-6 glass rounded-2xl border border-white/10 text-white text-sm font-black flex items-center justify-between hover:border-primary/50 transition-all"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <span className={formData.selectedVal === "Select Value" ? "text-white/20" : "text-white uppercase tracking-tight"}>
                            {formData.selectedVal}
                        </span>
                        <FaChevronDown className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-primary-light' : 'text-white/20'}`} />
                    </button>
                    
                    {isDropdownOpen && (
                        <div className="absolute top-full left-0 right-0 mt-4 p-2 glass rounded-2xl border-white/10 z-50 animate-in fade-in slide-in-from-top-2 duration-300 shadow-2xl">
                            {values.map((elem, index) => (
                                <button
                                    key={index}
                                    className="w-full text-left px-4 py-3 rounded-xl text-sm font-bold text-white/50 hover:text-white hover:bg-white/5 transition-all uppercase tracking-tight"
                                    onClick={() => {
                                        setFormData((prev) => ({ ...prev, selectedVal: elem }));
                                        setIsDropdownOpen(false);
                                    }}
                                >
                                    {elem}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="mt-auto space-y-4">
                    <button
                        disabled={isLoading || !formData.para || formData.selectedVal === "Select Value"}
                        onClick={() => handleSubmit(formData)}
                        className="w-full py-6 rounded-[2rem] bg-linear-to-r from-primary to-secondary text-white font-black text-xl hover:glow-indigo transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:grayscale flex items-center justify-center gap-3 shadow-xl shadow-primary/20"
                    >
                        {isLoading ? (
                            <>
                                <FaSpinner className="animate-spin" />
                                <span>Processing</span>
                            </>
                        ) : (
                            <>
                                <FaMagic />
                                <span>Generate</span>
                            </>
                        )}
                    </button>
                    <p className="text-[10px] text-center text-white/20 font-black uppercase tracking-[0.2em]">Summit Processing Unit v3.4</p>
                </div>
             </div>
          </div>
          
          <div className="flex items-center justify-between px-8 text-white/20 font-black tracking-widest text-[10px] uppercase">
              <div className="flex gap-6">
                <span>Characters: {formData.para.length}</span>
                <span>Words: {formData.para.trim().split(/\s+/).filter(Boolean).length}</span>
              </div>
              <span>Status: {isLoading ? 'Summarizing...' : 'Idle'}</span>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 glass rounded-[3rem] border-white/5 animate-in zoom-in duration-700">
          <div className="w-20 h-20 bg-linear-to-br from-red-500/20 to-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-red-500/10 border border-red-500/20">
              <RxCross1 className="text-red-400 text-3xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">No Active Plan Found</h1>
          <p className="text-white/40 text-lg font-medium max-w-xl mx-auto mb-10 leading-relaxed">
            Upgrade your account to unlock the full power of Summit.AI and start processing content like a pro.
          </p>
          <button
            onClick={() => setIsOpen(true)}
            className="px-10 py-5 rounded-2xl bg-linear-to-r from-primary to-secondary text-white font-black text-xl hover:glow-indigo transition-all duration-300 transform active:scale-95 shadow-xl shadow-primary/20"
          >
            Upgrade Now
          </button>
        </div>
      )}
    </div>
  );
};

export default Layout;
