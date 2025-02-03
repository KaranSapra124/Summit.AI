import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./Components/Auth/Login";
import Footer from "./Components/Global/Footer";
import Navbar from "./Components/Global/Navbar";
import Benefits from "./Components/Home/Benefits";
import Demo from "./Components/Home/Demo";
import Hero from "./Components/Home/Hero";
import Plans from "./Components/Home/Plans";
import WhyToUse from "./Components/Home/WhyToUse";
import Home from "./Pages/Home";
import Dashboard from "./Components/UserPanel/Dashboard";
import Profile from "./Components/UserPanel/Components/Profile/Profile";

function App() {
  const appRoutes = createBrowserRouter([
    {
      element: <Navbar />,
      path: "/",
      children: [
        {
          element: <Home />,
          path: "/",
        },
      ],
    },
    {
      element: <Login />,
      path: "/login",
    },
    {
      element: <Dashboard />,
      path: "/user",
      children: [
        {
          element:<Profile/>,
          path:"/user/profile"
        },
      ],
    },
  ]);
  return (
    <>
      {/* <Navbar />
      <Hero />
      <WhyToUse />
      <Demo />
      <Benefits />
      <Plans />
      <Footer /> */}
      {/* <Login /> */}
      <RouterProvider router={appRoutes} />
    </>
  );
}

export default App;
