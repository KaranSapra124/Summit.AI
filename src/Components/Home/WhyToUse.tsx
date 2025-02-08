import Divider from "../../Utils/Divider";
import Container from "../Global/Container";

const WhyToUse = () => {
  return (
    <>
      <Container id="Features"  className="text-center bg-gradient-to-br  from-black/60 via-gray-900/90 to-black/90">
        <h1  className="text-white text-5xl max-[600px]:text-xl font-bold">
          Why To Use{" "}
          <strong className="text-emerald-500 font-extrabold">
            Summit.AI ?
          </strong>
        </h1>
        <p className="text-xs font-bold text-gray-300 my-6 max-[600px]:my-4">
          <strong>Summit.AI</strong> has got immense powers to help you improve
          your overall personality!
        </p>
        <Divider className="h-1 w-12 mx-auto bg-emerald-500 rounded-full my-2"/>
        <div >
          <DisplayPoints />
        </div>
      </Container>
    </>
  );
};

const DisplayPoints = () => {
  type dataType = { title: string; description: string };
  const data: dataType[] = [
    {
      title: "Automatic Correction",
      description:
        "Automatically detects and corrects common grammar and spelling mistakes in your text.",
    },
    {
      title: "Grammar Check",
      description:
        "Identifies grammatical errors and provides suggestions to improve sentence structure.",
    },
    {
      title: "Language Check",
      description:
        "Analyzes your text for consistency in tone, style, and language usage.",
    },
    {
      title: "Readability",
      description:
        "Evaluates the readability of your content and suggests improvements for better clarity.",
    },
    {
      title: "Spell Checker",
      description:
        "Quickly identifies spelling errors and offers correct alternatives.",
    },
    {
      title: "Summarization & Keyword Extraction",
      description:
        "Generates concise summaries and extracts important keywords from your text.",
    },
  ];
  return (
    <>
      <ul className="flex gap-2 max-[600px]:flex-col">
        {data?.map((elem, index) => {
          return (
            <>
              <li key={index} className="w-64 max-[600px]:w-full ">
                <div className="shadow border-l-2 max-[600px]:h-fit max-[600px]:p-5 max-[600px]:rounded-lg border-b-2 my-4  border-emerald-500 bg-gradient-to-br from-black/50 to-black/90 shadow-black  rounded-sm h-28 p-2 ">
                  <h2 className="text-sm  line-clamp-1 text-gray-200 font-extrabold">
                    {elem?.title}
                  </h2>
                  <Divider className="h-1 w-12 bg-emerald-500 rounded-full my-3 mx-auto"/>
                  <p className="text-xs text-center font-light  text-white">
                    {elem?.description}
                  </p>
                </div>
              </li>
            </>
          );
        })}
      </ul>
    </>
  );
};

export default WhyToUse;
