import { useEffect, useState } from "react";
import Container from "../../../Global/Container";

const OTPForm = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const handleChange = (val: string, ind: number) => {
    const newOtp = [...otp];
    newOtp[ind] = val;
    setOtp(newOtp);
    if (val && ind < otp.length - 1) {
      (document.getElementById(`${ind + 1}`) as HTMLInputElement)?.focus();
    } else if (val === "" && ind < otp.length) {
      (document.getElementById(`${ind - 1}`) as HTMLInputElement)?.focus();
    }
  };

  const handleSubmit = () => {
    alert(otp.join(""));
  };

  return (
    <>
      <Container className=" mx-auto  h-fit rounded-md">
        <div className="bg-white p-10 flex flex-col  rounded-sm">
          <h1 className="text-xl font-bold text-center my-2">
            Verify OTP Here
          </h1>
          <div className="flex h-fit gap-2">
            {otp?.map((_, index: number) => {
              return (
                <>
                  <input
                    autoFocus
                    onChange={(e) => handleChange(e.target.value, index)}
                    className=" bg-white shadow shadow-black p-2    w-10 text-right rounded appearance-none"
                    key={index}
                    type="number"
                    id={`${index}`}
                    value={otp[index]}
                    placeholder="0"
                  />
                </>
              );
            })}
          </div>
          <button
            className="bg-emerald-500 w-fit mx-auto text-white font-bold p-1 rounded-sm my-2"
            onClick={() => handleSubmit()}
          >
            Verify
          </button>
        </div>
      </Container>
    </>
  );
};

export default OTPForm;
