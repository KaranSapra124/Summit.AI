import Container from "../Global/Container";

const WhyToUse = () => {
  return (
    <>
      <Container className="text-center">
        <h1 className="text-gray-900 text-5xl font-bold">
          Why To Use{" "}
          <strong className="text-emerald-500 font-extrabold">
            Summit.AI ?
          </strong>
        </h1>
        <p className="text-xs font-bold text-gray-800 my-4">
          <strong>Summit.AI</strong> has got immense powers to help you improve
          your overall personality!
        </p>
        <div>
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
      <ul className="steps ">
        {data?.map((elem, index) => {
          return (
           <>
             <li key={index} className="step m-1  step-success ">
              <div className="shadow border-l-4 border-b-4 my-4 border-emerald-500 bg-gray-100 shadow-black  rounded-sm h-28 p-2 ">
                <h2 className="text-sm line-clamp-1 text-emerald-500 font-extrabold">{elem?.title}</h2>
                <p className="text-xs text-justify font-medium py-2">{elem?.description}</p>
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
