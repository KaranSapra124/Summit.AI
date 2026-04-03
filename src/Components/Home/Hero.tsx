import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden radial-bg">
      {/* Decorative backdrop elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-secondary/10 blur-[100px] rounded-full -z-10" />

      <div className="container mx-auto px-6 text-center z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
           <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-light opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-light"></span>
          </span>
          <span className="text-xs font-bold uppercase tracking-widest text-primary-light">AI Powered Intelligence</span>
        </div>

        <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
          Summarize the <br />
          <span className="gradient-text">World's Knowledge</span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/50 mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          Summit.AI transforms complex information into clear, actionable insights. Save time, boost productivity, and master any content in seconds.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
          <button 
            onClick={() => navigate("/login")}
            className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-linear-to-r from-primary to-secondary text-white font-black text-lg hover:glow-indigo transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            Start For Free
          </button>
          <button 
            className="w-full sm:w-auto px-10 py-5 rounded-2xl glass text-white font-bold text-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            Watch Demo
          </button>
        </div>

        {/* Video / Preview Section */}
        <div className="relative max-w-5xl mx-auto p-4 glass rounded-[2.5rem] shadow-2xl animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
          <div className="relative overflow-hidden rounded-[1.5rem] bg-surface-base">
             <video
              autoPlay
              loop
              muted
              className="w-full aspect-video object-cover opacity-80"
              src="https://videos.pexels.com/video-files/2887463/2887463-sd_640_360_25fps.mp4"
            />
            {/* Overlay Gradient to make video feel integrated */}
            <div className="absolute inset-0 bg-linear-to-t from-surface-base via-transparent to-transparent opacity-60" />
          </div>
          
          {/* Decorative Glint */}
          <div className="absolute -top-px left-20 right-20 h-px bg-linear-to-r from-transparent via-primary-light/50 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
