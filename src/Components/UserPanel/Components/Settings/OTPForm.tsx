import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaShieldAlt, FaArrowLeft } from "react-icons/fa";

const OTPForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);

  const handleChange = (val: string, ind: number) => {
    if (val.length > 1) return;
    const newOtp = [...otp];
    newOtp[ind] = val;
    setOtp(newOtp);
    
    if (val && ind < otp.length - 1) {
      (document.getElementById(`otp-${ind + 1}`) as HTMLInputElement)?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, ind: number) => {
    if (e.key === "Backspace" && !otp[ind] && ind > 0) {
      (document.getElementById(`otp-${ind - 1}`) as HTMLInputElement)?.focus();
    }
  };

  const handleSubmit = () => {
    const combinedOtp = otp.join("");
    if (state == combinedOtp) {
      navigate("/user/change-password");
    } else {
      alert("Incorrect OTP code. Please check and try again.");
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="glass p-10 md:p-14 rounded-[3rem] border-white/5 shadow-2xl max-w-md w-full text-center animate-in zoom-in duration-500">
        <header className="mb-10">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary/20">
                <FaShieldAlt className="text-primary-light text-2xl" />
            </div>
            <h1 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">Verify <span className="gradient-text">Identity</span></h1>
            <p className="text-white/40 text-sm font-medium">We've sent a 6-digit code to your email. Enter it below to proceed.</p>
        </header>

        <div className="flex justify-center gap-3 mb-10">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              autoFocus={index === 0}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-14 md:w-14 md:h-16 text-center text-2xl font-black bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-primary-light/50 focus:ring-1 focus:ring-primary-light/30 transition-all font-inter"
            />
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-5 rounded-2xl bg-linear-to-r from-primary to-secondary text-white font-black text-lg hover:glow-indigo transition-all transform active:scale-95 shadow-xl shadow-primary/20 mb-8"
        >
          Verify Code
        </button>

        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center gap-2 mx-auto text-white/30 text-xs font-bold hover:text-white transition-colors uppercase tracking-widest"
        >
          <FaArrowLeft size={10} />
          Back to settings
        </button>
      </div>
    </div>
  );
};

export default OTPForm;
