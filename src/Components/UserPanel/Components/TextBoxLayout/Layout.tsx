import { useContext, useState } from "react";
import Container from "../../../Global/Container";
import Divider from "../../../../Utils/Divider";
import { UserContext } from "../../../../Utils/UserContext";
import { userDataInterface, userState } from "../../../../Utils/UserReducer";
import Modal from "../../../Helper/Modal";
import Plan from "../Plans/Plan";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";

const Layout = () => {
  interface ElemType {
    bad: string;
    better: [];
  }

  interface grammarType {
    error: string;
    correct?: string[];
  }

  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [formData, setFormData] = useState({
    para: "",
    selectedVal: "Select value",
  });
  const context = useContext(UserContext);
  const { userData } = context as userState;
  const { name, email, plan, purchasePlan } = userData as userDataInterface;
  const [grammarMistakes, setGrammarMistakes] = useState<grammarType[]>([]);
  const [isGrammarMistkesOpen, setIsGrammarMistakes] = useState<Boolean>(false);

  const [values] = useState([
    "correct",
    "summarize",
    "grammar",
    "detect",
    // "readability",
    // "spelling",
  ]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSubmit = async (data: typeof formData) => {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/get-result`,
      { data },
      { withCredentials: true }
    );
    setFormData((prev) => ({
      ...prev,
      para:
        formData?.selectedVal !== "grammar"
          ? res?.data?.result
          : (() => {
              res?.data?.result?.map((elem: ElemType, index: number) => {
                console.log(elem, "elem");
                return setGrammarMistakes((prev) => [
                  ...prev,
                  {
                    error: elem.bad,
                    correct: elem?.better.map((elem, index) => elem),
                  },
                ]);
              });
              setIsGrammarMistakes(true);
            })(),
    }));
  };
  const modalData = (
    <>
      <Plan />
      <RxCross1
        onClick={() => setIsOpen(false)}
        className="absolute text-black top-4 right-96 bg-white p-1 text-2xl cursor-pointer hover:scale-110 transition-all rounded-full "
      />
    </>
  );
  const grammarModalData = (
    <>
      <div className="overflow-x-auto">
        <table className="max-w-screen-md mx-auto my-52  border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border">Mistake</th>
              <th className="px-4 py-2 border">Suggestions</th>
            </tr>
          </thead>
          <tbody>
            {grammarMistakes?.map((elem: grammarType, index: number) => (
              <tr key={index} className="odd:bg-white even:bg-gray-50">
                <td className="px-4 py-2 border">{elem.error}</td>
                <td className="px-4 py-2 border">
                  {elem.correct &&
                    elem.correct.map((suggestion, i) => (
                      <span
                        key={i}
                        className="inline-block bg-blue-100 text-blue-600 rounded px-2 py-1 m-1"
                      >
                        {suggestion}
                      </span>
                    ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <RxCross1
        onClick={() => setIsGrammarMistakes(false)}
        className="absolute text-black top-4 right-96 bg-white p-1 text-2xl cursor-pointer hover:scale-110 transition-all rounded-full "
      />
    </>
  );

  const handleUpdateState = (
    endpoint: string,
    data: { summary: []; corrected: "" }
  ) => {
    setFormData((prev) => ({
      ...prev,
      para: endpoint === "summarize" ? data.summary.join(" ") : data?.corrected,
    }));
  };

  return (
    <>
      {isOpen && <Modal data={modalData} />}
      {isGrammarMistkesOpen && <Modal data={grammarModalData} />}
      <Container className="px-6 py-10 sm:px-12 lg:px-16 text-center mx-auto ">
        {purchasePlan !== undefined && purchasePlan !== null ? (
          <>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
              Welcome Back! Enjoy Your{" "}
              <span className="text-emerald-500">Premium Plan</span>
            </h1>
            <p className="text-sm sm:text-base font-medium text-gray-300 mb-6">
              Experience the full <span className="font-bold">Superpowers</span>{" "}
              of Summit.AI. We're glad to have you!
            </p>
            <Divider className="h-1 w-16 mx-auto bg-emerald-500 rounded-full mb-8" />

            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <textarea
                cols={10}
                rows={8}
                placeholder="Enter your paragraph here..."
                className="p-4 text-sm rounded-lg border border-emerald-500 shadow-md w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none bg-gray-100"
                value={formData?.para}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    para: e.target.value,
                  }))
                }
              ></textarea>

              <div className="relative w-52">
                <button
                  className="w-full bg-emerald-500 text-white font-semibold rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 flex items-center justify-between"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {formData.selectedVal}
                  <svg
                    className={`w-4 h-4 ml-2 transform transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <ul className="absolute  left-0 right-0 bg-white shadow-lg rounded-md mt-2 z-10">
                    {values?.map((elem: string, index: number) => (
                      <li
                        key={index}
                        className="px-4 py-2 text-gray-800 hover:bg-emerald-100 cursor-pointer"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            selectedVal: elem,
                          }));
                          setIsDropdownOpen(false);
                        }}
                      >
                        {elem}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <button
              onClick={() => handleSubmit(formData)}
              className="mt-8 px-6 py-3 text-lg font-semibold text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 transition-all duration-300 shadow-lg focus:ring-2 focus:ring-emerald-500"
            >
              Generate
            </button>
          </>
        ) : (
          <>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
              You Got No Plan 😔
            </h1>
            <p className="text-base sm:text-lg font-medium text-gray-300 mb-6">
              Don't miss out! Purchase a plan now to access the{" "}
              <span className="text-emerald-500 font-bold">
                Premium Features
              </span>{" "}
              and unlock the full power of Summit.AI!
            </p>
            <button
              onClick={() => setIsOpen(true)}
              className="px-6 cursor-pointer py-3 text-lg font-semibold text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 transition-all duration-300 shadow-lg focus:ring-2 focus:ring-emerald-500"
            >
              Upgrade Now
            </button>
          </>
        )}
      </Container>
    </>
  );
};

export default Layout;
