const Benefits = () => {
  const benefits = [
    {
      icon: "https://cdn-icons-gif.flaticon.com/14463/14463855.gif",
      title: "Time Efficiency",
      description: "Saves hours of reading by summarizing long documents into clear, digestible insights instantly.",
    },
    {
      icon: "https://cdn-icons-gif.flaticon.com/16675/16675755.gif",
      title: "Universal Utility",
      description: "Perfect for students, busy professionals, and researchers who need to grasp complex data fast.",
    },
    {
      icon: "https://cdn-icons-gif.flaticon.com/16678/16678440.gif",
      title: "Context Retention",
      description: "Advanced AI ensures you get the most important points without losing the core context.",
    },
  ];

  return (
    <section id="benefits" className="py-24 bg-surface-low relative overflow-hidden transition-colors duration-300">
      {/* Decorative radial gradient */}
      <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-secondary/10 blur-[120px] rounded-full -z-10" />
      
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-5 duration-700">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-light mb-4 block">Productivity Layer</span>
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-main uppercase">
             Unlock Massive <span className="gradient-text">Productivity.</span>
          </h2>
          <div className="h-1.5 w-24 bg-linear-to-r from-primary to-secondary mx-auto rounded-full mb-8 shadow-lg shadow-primary/20" />
          <p className="text-lg text-muted leading-relaxed font-medium">
            Harness the power of AI to streamline your workflow and master information at unprecedented speeds.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {benefits.map((elem, index) => (
            <div 
              key={index} 
              className="group flex flex-col items-center text-center p-10 rounded-[3.5rem] glass hover:bg-surface-highest/60 transition-all duration-500 border-white/5"
            >
              <div className="relative mb-10">
                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-150" />
                <div className="relative w-28 h-28 p-4 bg-white/5 rounded-[2rem] border border-white/10 group-hover:border-primary/30 transition-all duration-500 flex items-center justify-center">
                    <img 
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110" 
                      src={elem.icon} 
                      alt={elem.title} 
                    />
                </div>
              </div>
              
              <h3 className="text-2xl font-black mb-4 text-main uppercase tracking-tight group-hover:text-primary-light transition-colors">
                {elem.title}
              </h3>
              
              <div className="h-1 w-10 bg-primary/30 rounded-full mb-8 group-hover:w-24 group-hover:bg-primary-light transition-all duration-500" />
              
              <p className="text-muted text-sm md:text-base leading-relaxed group-hover:text-main transition-colors font-medium">
                {elem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
