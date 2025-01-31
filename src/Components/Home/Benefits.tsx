import Container from "../Global/Container";

const Benefits = () => {
  type imageData = {
    icon: string;
    description: string;
  };
  const benefits: imageData[] = [
    {
      icon: "https://cdn-icons-gif.flaticon.com/14463/14463855.gif",
      description: "Saves time by summarizing long documents instantly.",
    },
    {
      icon: "https://cdn-icons-gif.flaticon.com/16675/16675755.gif",
      description: "Helps students, professionals, and researchers.",
    },
    {
      icon: "https://cdn-icons-gif.flaticon.com/16678/16678440.gif",
      description: "Extracts key insights without losing context.",
    },
  ];

  return (
    <>
      <Container className="">
        <div>
          <h1 className="text-center my-2 text-5xl font-bold">
            How{" "}
            <span className="text-emerald-500 font-extrabold">
              Summit.AI
            </span>{" "}
            Helps To Get Your Tasks Done ?
          </h1>
          <p className="text-center text-gray-700 font-extrabold text-xs my-4">Make use of our AI to get your tasks done on time!</p>
          <div className="flex  justify-between">
            {benefits?.map((elem: imageData, index: number) => {
              return (
                <>
                  <div
                    className="border-l-4 rounded-lg h-fit shadow-md shadow-gray-400 p-5 flex flex-col justify-center items-center border-b-4 border-emerald-500"
                    key={index}
                  >
                    <img className="w-20" src={elem?.icon} alt="No Image" />
                    <p className="text-justify  text-sm font-semibold text-gray-700">
                      {elem?.description}
                    </p>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Benefits;
