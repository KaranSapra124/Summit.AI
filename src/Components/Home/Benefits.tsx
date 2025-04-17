import Divider from "../../Utils/Divider";
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
      <Container className=" bg-gradient-to-tr  from-black/60 via-gray-900/90 to-black/90">
        <div>
          <h1 className="text-center max-[600px]:text-xl my-2 text-5xl text-white font-bold">
            How{" "}
            <span className="text-emerald-500 font-extrabold">Summit.AI</span>{" "}
            Helps To Get Your Tasks Done ?
          </h1>
          <p className="text-center  text-gray-300 font-semibold text-xs my-4">
            Make use of our AI to get your tasks done on time!
          </p>
          <Divider className="h-1 w-12 mx-auto bg-emerald-500 rounded-full my-4"/>
          <div className="flex max-[600px]:flex-col max-[600px]:gap-4 justify-evenly ">
            {benefits?.map((elem: imageData, index: number) => {
              return (
                <>
                  <div
                    className="border-l-2 max-[600px]:w-full  bg-gradient-to-br  from-black/50 to-black/90 rounded-lg  h-fit w-fit   p-5 flex flex-col justify-center items-center border-b-2 border-emerald-500"
                    key={index}
                  >
                    <img className="w-12 max-[600px]:w-8 rounded-full" src={elem?.icon} alt="No Image" />
                    <Divider className="h-1 w-12 mx-auto bg-emerald-500 rounded-full my-4"/>
                    <p className="text-center max-[600px]:text-xs text-sm font-light text-gray-200">
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
