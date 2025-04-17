import { useNavigate } from "react-router-dom";
import Container from "../Global/Container";


const Hero = () => {
  const Navigate = useNavigate()
  return (
    <>
      <Container
        className={` bg-gradient-to-tr  from-black/60 via-gray-900/90 to-black/90  h-full  flex flex-col justify-center items-center `}
      >
        <div className="flex flex-col justify-center max-[600px]:pt-10">
          <h1 className="text-5xl max-[600px]:text-xl text-center font-bold  text-white">
            Summarize Your Content With
            <br />
            <span className="text-emerald-500  font-extrabold">Summit.AI</span>
          </h1>
          <p className="my-10 max-[600px]:w-80 max-[600px]:my-4 max-[600px]:text-xs max-w-screen-sm mx-auto text-sm font-bold text-gray-700 dark:text-gray-200 text-center">
            <strong>Summit.AI</strong>, is a modern and efficient way of
            summarizing Your huge paragraphs into smaller and concised form
            which helps you to save your time and energy.
          </p>
          <button onClick={()=>Navigate("/login")} className="border border-gray-300 w-fit mx-auto  max-[600px]:text-xs   hover:bg-gray-300   text-gray-200 cursor-pointer duration-200 hover:font-bold font-semibold p-2 rounded-lg">
            Try Now, It's Free!
          </button>
          <SubComponent />
        </div>
          
      </Container>
    </>
  );
};

const SubComponent = () => {
  return (
    <>
      <video
        autoPlay
        loop
        muted
        className="max-w-screen-sm max-[600px]:w-52 my-4 mx-auto rounded-lg"
        src="https://videos.pexels.com/video-files/2887463/2887463-sd_640_360_25fps.mp4"
      ></video>
    </>
  );
};

export default Hero;
