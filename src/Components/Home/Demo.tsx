import { useState } from "react";
import Container from "../Global/Container";
import Divider from "../../Utils/Divider";

const Demo = () => {
  const [formData, setFormData] = useState({
    para: "",
    selectedVal: "Select value",
  });

  const [values] = useState(["correct", "summarize"]);

  const handleSubmit = async (data: typeof formData) => {
    setFormData((prev) => ({
      ...prev,
      para: "Loading...",
    }));
    const url: string = `https://textgears-textgears-v1.p.rapidapi.com/${data?.selectedVal}`;
    const options: object = {
      method: "POST",
      headers: {
        "x-rapidapi-key": import.meta.env.VITE_API_KEY,
        "x-rapidapi-host": "textgears-textgears-v1.p.rapidapi.com",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        text: data?.para,
        max_sentences: "3",
      }),
    };
    try {
      const res = await fetch(url, options);
      const result = await res.text();
      const { response } = JSON.parse(result);
      handleUpdateState(formData?.selectedVal, response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateState = (
    endpoint: string,
    data: { summary: []; corrected: "" }
  ) => {
    setFormData((prev) => ({
      ...prev,
      para: endpoint === "summarize" ? data.summary.join("") : data?.corrected,
    }));
  };

  return (
    <Container className="px-8 py-12 sm:px-16 lg:px-20 text-center bg-gradient-to-tr  from-black/60 via-gray-900/90 to-black/90">
      <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
        Try Out The Capabilities{" "}
        <span className="text-emerald-500 font-extrabold">Of Our App!</span>
      </h1>
      <p className="text-sm sm:text-xs my-4 font-semibold text-gray-300">
        Get a hand on <strong>SUPERPOWERS </strong>of <strong>summit.AI</strong>{" "}
        (For Just Once)
      </p>
      <Divider className="h-1 w-12 mx-auto bg-emerald-500 rounded-full my-4" />

      <div className="flex flex-col sm:flex-row justify-center  space-y-4 sm:space-x-4 sm:space-y-0">
        <textarea
          cols={10}
          rows={10}
          placeholder="Enter Your Paragraph..."
          className="p-4  rounded-lg border-2 border-emerald-500 shadow-md w-full text-gray-200 focus:outline-none "
          value={formData?.para}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              para: e.target.value,
            }))
          }
        ></textarea>

        {/* <div className="dropdown dropdown-bottom w-full sm:w-auto mx-auto">
          <div tabIndex={0} role="button" className="btn w-full sm:w-52 m-1 text-lg font-semibold text-white bg-emerald-500 hover:bg-emerald-600 focus:ring-2 focus:ring-emerald-500 rounded-md">
            {formData?.selectedVal}
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-emerald-500 text-white rounded-box z-[1] w-full sm:w-52 p-2 shadow-xl"
          >
            {values?.map((elem: string, index: number) => {
              return (
                <li
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      selectedVal: elem,
                    }))
                  }
                  className="m-0.5 text-md font-semibold hover:bg-white/70 duration-200 transition-all w-full p-2 rounded cursor-pointer text-center hover:text-black"
                  key={index}
                >
                  {elem}
                </li>
              );
            })}
          </ul>
        </div> */}
        <div>
          <select
            name=""
            className="bg-emerald-500 border-none text-white text-lg font-semibold rounded-md p-2"
            id=""
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                selectedVal: e.target.value,
              }))
            }
          >
            {values?.map((elem: string, index: number) => {
              return (
                <option
                  className="m-0.5 text-md font-semibold hover:bg-white/70 duration-200 transition-all w-full p-2 rounded cursor-pointer text-center hover:text-black"
                  key={index}
                  value={elem}
                >
                  {elem}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <button
        onClick={() => handleSubmit(formData)}
        className="mt-6 p-3 text-lg font-semibold text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 transition-all duration-300 shadow-md focus:ring-2 focus:ring-emerald-500"
      >
        Generate
      </button>
    </Container>
  );
};

export default Demo;
