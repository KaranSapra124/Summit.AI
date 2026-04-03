import Benefits from "../Components/Home/Benefits";
import Hero from "../Components/Home/Hero";
import Plans from "../Components/Home/Plans";
import WhyToUse from "../Components/Home/WhyToUse";
import AboutUs from "../Components/Home/AboutUs";
import ContactUs from "../Components/Home/ContactUs";

const Home = () => {
  return (
    <div className="radial-bg min-h-screen">
      <Hero />
      <WhyToUse />
      <AboutUs />
      <Benefits />
      <Plans />
      <ContactUs />
    </div>
  );
};

export default Home;
