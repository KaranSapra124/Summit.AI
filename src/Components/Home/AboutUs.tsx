import { FaQuoteLeft, FaRocket, FaBullseye } from "react-icons/fa";

const AboutUs = () => {
  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden">
      {/* Decorative Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-5 duration-700">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-light mb-4 block">Our Origin Story</span>
          <h2 className="text-4xl md:text-6xl font-black text-main mb-6 uppercase tracking-tight">The Horizon of <span className="gradient-text">Intelligence</span></h2>
          <p className="max-w-2xl mx-auto text-muted text-lg font-medium leading-relaxed">
            Born from the chaos of the information age, Summit.AI was created to bridge the widening gap between massive text data and actionable human insights.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="glass p-10 md:p-14 rounded-[3.5rem] border-white/5 shadow-2xl relative group">
             <FaQuoteLeft className="absolute top-8 right-10 text-main/5 text-6xl group-hover:text-primary/10 transition-colors" />
             <h3 className="text-2xl font-black text-main mb-6 uppercase tracking-tight">Our <span className="gradient-text">Mission</span></h3>
             <p className="text-muted text-lg leading-relaxed font-medium mb-10">
               At Summit, we believe that complexity is the enemy of progress. Our mission is to democratize high-level understanding by distilling thousands of words into pure, mathematical essence. We don't just shorten text; we amplify meaning.
             </p>
             <div className="flex gap-6">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20">
                        <FaRocket className="text-primary-light" />
                    </div>
                    <span className="text-[8px] font-black text-white/20 uppercase tracking-widest leading-none">Speed</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center border border-secondary/20">
                        <FaBullseye className="text-accent" />
                    </div>
                    <span className="text-[8px] font-black text-white/20 uppercase tracking-widest leading-none">Precision</span>
                </div>
             </div>
          </div>

          <div className="space-y-8">
             <div className="p-8 rounded-[2.5rem] bg-white/2 border border-white/5 hover:bg-white/5 transition-all">
                <h4 className="text-xl font-black text-main mb-3 uppercase tracking-tight">Radical Efficiency</h4>
                <p className="text-muted text-sm font-medium">We optimize for the most valuable asset in the modern world: your time. Every summary is a masterclass in lexical economy.</p>
             </div>
             <div className="p-8 rounded-[2.5rem] bg-white/2 border border-white/5 hover:bg-white/5 transition-all">
                <h4 className="text-xl font-black text-main mb-3 uppercase tracking-tight">Neural Integrity</h4>
                <p className="text-muted text-sm font-medium">Our architecture preserves the nuance, tone, and intent of the original source material, ensuring zero cognitive loss.</p>
             </div>
             <div className="p-8 rounded-[2.5rem] bg-white/2 border border-white/5 hover:bg-white/5 transition-all">
                <h4 className="text-xl font-black text-main mb-3 uppercase tracking-tight">Accessible Mastery</h4>
                <p className="text-muted text-sm font-medium">From students to executive leadership, our interface is built for those who refuse to be overwhelmed by information.</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
