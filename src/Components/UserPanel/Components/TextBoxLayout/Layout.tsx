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
    correction: string,
    issue: string
  }

  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [formData, setFormData] = useState({
    para: "",
    selectedVal: "Select value",
  });
  const context = useContext(UserContext);
  const { userData, theme } = context as userState;
  const { purchasePlan } = userData as userDataInterface;

  const [grammarMistakes, setGrammarMistakes] = useState<grammarType[]>([]);
  const [isGrammarMistkesOpen, setIsGrammarMistakes] = useState<Boolean>(false);
  const [isLoading, setIsLoading] = useState<Boolean>(false)

  const [values] = useState(["correct", "summarize", "grammar", "detect", "Enhance My Writing"]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);


  const handleSubmit = async (data: typeof formData) => {
    setIsLoading(true)
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/get-result`,
      { data },
      { withCredentials: true }
    );
    if (formData?.selectedVal === "Enhance My Writing") {
      const rawData = res?.data?.result;
      const cleanJson = rawData?.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleanJson);
      console.log(parsed)

      setGrammarMistakes([]); // reset old
      setGrammarMistakes(parsed.grammarIssues || []);
      setFormData((prev) => ({
        ...prev,
        para: parsed?.correctedEssay,
      }));
      setSuggestions(parsed.suggestions || []);
      setIsGrammarMistakes(true);
    }

    else {
      console.log("I am here!!!")
      setFormData((prev) => ({
        ...prev,
        para:
          formData?.selectedVal !== "grammar"
            ? res?.data?.result
            : (() => {
              res?.data?.result?.map((elem: ElemType) => {
                // return setGrammarMistakes((prev) => [
                //   ...prev,
                //   {
                //     error: elem.bad,
                //     correct: elem?.better.map((elem) => elem),
                //   },
                // ]);
              });
              setIsGrammarMistakes(true);
            })(),
      }));
    }
    setIsLoading(false)
  };

  const modalData = (
    <>
      <Plan />
      <RxCross1
        onClick={() => setIsOpen(false)}
        className="absolute text-black top-4 right-4 bg-white p-1 text-2xl cursor-pointer hover:scale-110 transition-all rounded-full"
      />
    </>
  );

  const grammarModalData = (
    <>
      {/* Corrected Essay */}
      <div className=" max-h-96   overflow-x-scroll m-20">
        <div className="bg-white p-4 rounded shadow ">
          <h2 className="text-lg font-bold text-emerald-600 mb-2">✅ Corrected Essay</h2>
          <p className="text-gray-800 whitespace-pre-wrap">{formData?.para}</p>
        </div>

        {/* Grammar Issues Table */}
        <div className=" bg-white">
          <h2 className="text-lg font-bold text-red-500 ">🐞 Grammar Issues</h2>
          <table className="w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Issue</th>
                <th className="px-4 py-2 border">Correction</th>
              </tr>
            </thead>
            <tbody>
              {grammarMistakes.map((elem, index) => (
                <tr key={index} className="odd:bg-white even:bg-gray-50">
                  <td className="px-4 py-2 border">{elem.issue}</td>
                  <td className="px-4 py-2 border">
                    {elem?.correction}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Suggestions Section */}
        <div className="bg-gray-50 p-4 rounded shadow">
          <h2 className="text-lg font-bold text-purple-600 mb-2">💡 Suggestions</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            {suggestions.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>

        {/* Close Button */}
        <RxCross1
          onClick={() => setIsGrammarMistakes(false)}
          className="absolute text-black top-4 right-4 bg-white p-1 text-2xl cursor-pointer hover:scale-110 transition-all rounded-full"
        />
      </div>

    </>

  );

  return (
    <>
      {isOpen && <Modal data={modalData} />}
      {isGrammarMistkesOpen && <Modal data={grammarModalData} />}

      <Container className="px-4 py-6  text-center mx-auto h-screen">
        {purchasePlan !== undefined &&
          purchasePlan !== null &&
          purchasePlan?.summariesPerDay !== 0 ? (
          <>
            <h1
              className={`${theme === "Dark" ? "text-white" : "text-gray-800"
                } text-3xl max-[600px]:text-sm max-[600px]:mb-2 sm:text-4xl font-extrabold  mb-4`}
            >
              Welcome Back! Enjoy Your{" "}
              <span className="text-emerald-500">Premium Plan</span>
            </h1>
            <p
              className={`${theme === "Dark" ? "text-gray-300" : "text-gray-800"
                } text-sm sm:text-base max-[600px]:text-xs max-[600px]:mb-2 font-medium  mb-6`}
            >
              Experience the full <span className="font-bold">Superpowers</span>{" "}
              of Summit.AI. We're glad to have you!
            </p>
            <Divider className="h-1 w-12 mx-auto bg-emerald-500 rounded-full mb-6" />

            <div className="flex flex-col-reverse sm:flex-row justify-center gap-4">
              <textarea
                cols={10}
                rows={6}
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

              <div className="relative w-fit sm:w-40 max-[600px]:mx-auto">
                <button
                  className="w-full max-[600px]:text-xs bg-emerald-500 text-white font-semibold rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 flex items-center justify-between"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {formData.selectedVal}
                  <svg
                    className={`w-4 h-4 ml-2 transform transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""
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
                  <ul
                    aria-disabled={purchasePlan.summariesPerDay === 0}
                    className="absolute left-0 right-0 bg-white shadow-lg rounded-md mt-2 z-10"
                  >
                    {purchasePlan.summariesPerDay !== 0 &&
                      values?.map((elem: string, index: number) => (
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
              disabled={purchasePlan.summariesPerDay === 0}
              onClick={() => handleSubmit(formData)}
              className="mt-6 px-6 py-3 max-[600px]:text-xs text-base sm:text-lg font-semibold text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 transition-all duration-300 shadow-lg focus:ring-2 focus:ring-emerald-500"
            >
              {isLoading ? <>
                {/* <button disabled type="button" className="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"> */}
                <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                </svg>
                Loading...
                {/* </button> */}
              </> : "Generate"}
            </button>
          </>
        ) : (
          <>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
              You Got No Plan 😔
            </h1>
            <p className="text-sm sm:text-base font-medium text-gray-300 mb-6">
              Don't miss out! Purchase a plan now to access the{" "}
              <span className="text-emerald-500 font-bold">
                Premium Features
              </span>{" "}
              and unlock the full power of Summit.AI!
            </p>
            <button
              onClick={() => setIsOpen(true)}
              className="px-6 cursor-pointer py-3 text-base sm:text-lg font-semibold text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 transition-all duration-300 shadow-lg focus:ring-2 focus:ring-emerald-500"
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
