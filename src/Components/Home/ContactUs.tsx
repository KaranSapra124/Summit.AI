import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaPaperPlane, FaShieldAlt } from "react-icons/fa";

const ContactUs = () => {
    return (
        <section id="contact" className="py-24 px-6 relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[150px] pointer-events-none translate-x-1/2 translate-y-1/2" />
            
            <div className="max-w-7xl mx-auto relative z-10">
                <header className="text-center mb-16 animate-in fade-in slide-in-from-bottom-5 duration-700">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-light mb-4 block">Reach Out</span>
                    <h2 className="text-4xl md:text-6xl font-black text-main mb-6 uppercase tracking-tight">Direct <span className="gradient-text">Channels</span></h2>
                    <p className="max-w-xl mx-auto text-muted text-sm font-medium leading-relaxed uppercase tracking-widest">
                       The Summit.AI team is standing by to resolve your inquiries across all security and support vectors.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Information Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="glass p-8 rounded-[2.5rem] border-white/5 shadow-xl hover:bg-white/5 transition-all">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center border border-primary-light/10">
                                    <FaEnvelope className="text-primary-light" />
                                </div>
                                <div>
                                    <h4 className="text-xs font-black text-main uppercase tracking-widest leading-none">Email Matrix</h4>
                                    <p className="text-xs text-muted font-medium">response@summit.ai</p>
                                </div>
                            </div>
                        </div>

                        <div className="glass p-8 rounded-[2.5rem] border-white/5 shadow-xl hover:bg-white/5 transition-all">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center border border-accent/10">
                                    <FaPhoneAlt className="text-accent" />
                                </div>
                                <div>
                                    <h4 className="text-xs font-black text-main uppercase tracking-widest leading-none">Security Hotline</h4>
                                    <p className="text-xs text-muted font-medium">+1 (555) SUMMIT-A</p>
                                </div>
                            </div>
                        </div>

                        <div className="glass p-8 rounded-[2.5rem] border-white/5 shadow-xl hover:bg-white/5 transition-all">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                                    <FaMapMarkerAlt className="text-white/50" />
                                </div>
                                <div>
                                    <h4 className="text-xs font-black text-main uppercase tracking-widest leading-none">Command Center</h4>
                                    <p className="text-xs text-muted font-medium">San Francisco, CA</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 rounded-[2.5rem] bg-emerald-500/5 border border-emerald-500/10 flex items-center gap-4">
                            <FaShieldAlt className="text-emerald-400 text-2xl" />
                            <div>
                               <p className="text-[10px] font-black text-main uppercase tracking-widest mb-1">Encrypted Support</p>
                               <p className="text-[8px] text-muted font-black uppercase tracking-widest">TLS 1.3 Active Layer</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form Container */}
                    <div className="lg:col-span-2">
                        <div className="glass p-10 md:p-14 rounded-[3.5rem] border-white/5 shadow-2xl relative overflow-hidden group">
                           <form className="space-y-6">
                               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                   <div className="space-y-2">
                                       <label className="text-[10px] font-black text-muted uppercase tracking-widest ml-4">Full Identity</label>
                                       <input 
                                           type="text" 
                                           placeholder="Enter Name" 
                                           className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-main font-medium focus:outline-none focus:border-primary-light/50 transition-all font-inter"
                                       />
                                   </div>
                                   <div className="space-y-2">
                                       <label className="text-[10px] font-black text-muted uppercase tracking-widest ml-4">Core Email</label>
                                       <input 
                                           type="email" 
                                           placeholder="Enter Email" 
                                           className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-main font-medium focus:outline-none focus:border-primary-light/50 transition-all font-inter"
                                       />
                                   </div>
                               </div>

                               <div className="space-y-2">
                                   <label className="text-[10px] font-black text-muted uppercase tracking-widest ml-4">Subject Matter</label>
                                   <input 
                                       type="text" 
                                       placeholder="Inquiry Subject" 
                                       className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-main font-medium focus:outline-none focus:border-primary-light/50 transition-all font-inter"
                                   />
                               </div>

                               <div className="space-y-2">
                                   <label className="text-[10px] font-black text-muted uppercase tracking-widest ml-4">Message Vector</label>
                                   <textarea 
                                       rows={5} 
                                       placeholder="Provide context..." 
                                       className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-main font-medium focus:outline-none focus:border-primary-light/50 transition-all font-inter resize-none"
                                   />
                               </div>

                               <button 
                                   className="w-full py-6 rounded-2xl bg-linear-to-r from-primary to-secondary text-white font-black hover:glow-indigo transition-all transform active:scale-[0.98] shadow-xl shadow-primary/20 flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-xs"
                               >
                                   <FaPaperPlane size={14} />
                                   Dispatch Inquiry
                               </button>
                           </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;
