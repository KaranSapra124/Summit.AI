import { FaMagic, FaSpellCheck, FaGlobe, FaReadme, FaSearch, FaKeyboard } from "react-icons/fa";

const WhyToUse = () => {
  return (
    <section id="features" className="py-24 relative overflow-hidden transition-colors duration-300">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full -z-10" />
        
        <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-5 duration-700">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-light mb-4 block">Core Capabilities</span>
                <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-main uppercase">
                    Why Choose <span className="gradient-text">Summit.AI?</span>
                </h2>
                <div className="h-1.5 w-24 bg-linear-to-r from-primary to-secondary mx-auto rounded-full mb-8 shadow-lg shadow-primary/20" />
                <p className="text-lg text-muted leading-relaxed font-medium">
                    Experience the future of content processing with our comprehensive suite of AI tools designed to elevate your productivity.
                </p>
            </div>

            <DisplayPoints />
        </div>
    </section>
  );
};

const DisplayPoints = () => {
  const data = [
    {
      title: "Automatic Correction",
      description: "Intelligently identifies and fixes grammar and spelling errors instantly.",
      icon: <FaMagic className="text-3xl text-primary-light" />,
    },
    {
      title: "Grammar Excellence",
      description: "Sophisticated sentence structure analysis for professional writing.",
      icon: <FaSpellCheck className="text-3xl text-secondary" />,
    },
    {
      title: "Language Consistency",
      description: "Maintain a flawless tone and style across all your documents.",
      icon: <FaGlobe className="text-3xl text-primary" />,
    },
    {
      title: "Readability Insights",
      description: "Optimize your content for maximum impact and clarity.",
      icon: <FaReadme className="text-3xl text-accent" />,
    },
    {
       title: "Deep Search",
       description: "Extract core meanings and keywords from any text source.",
       icon: <FaSearch className="text-3xl text-primary-light" />,
    },
    {
      title: "Smart Summarization",
      description: "Condense massive paragraphs into clear, concise summaries.",
      icon: <FaKeyboard className="text-3xl text-secondary" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {data.map((elem, index) => (
        <div 
            key={index} 
            className="group relative p-10 rounded-[2.5rem] glass hover:glass-glow transition-all duration-500 transform hover:-translate-y-2 border-white/5"
        >
          <div className="mb-8 p-5 w-fit rounded-2xl bg-white/5 group-hover:bg-primary/20 transition-all duration-500 shadow-inner">
            {elem.icon}
          </div>
          <h3 className="text-xl font-black mb-4 text-main group-hover:text-primary-light transition-colors uppercase tracking-tight">
            {elem.title}
          </h3>
          <p className="text-muted text-sm leading-relaxed group-hover:text-main transition-colors font-medium">
            {elem.description}
          </p>
          
          <div className="absolute bottom-0 left-10 right-10 h-1 bg-linear-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      ))}
    </div>
  );
};

export default WhyToUse;
