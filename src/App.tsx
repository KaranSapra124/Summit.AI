import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./Components/Auth/Login";
import Navbar from "./Components/Global/Navbar";
import Home from "./Pages/Home";
import Dashboard from "./Components/UserPanel/Dashboard";
import Profile from "./Components/UserPanel/Components/Profile/Profile";
import Settings from "./Components/UserPanel/Components/Settings/Settings";
import { UserContext } from "./Utils/UserContext";
import { useContext, useReducer } from "react";
import { initialState, UserReducers } from "./Utils/UserReducer";
import OTPForm from "./Components/UserPanel/Components/Settings/OTPForm";

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
          element: <Profile />,
          path: "/user/profile",
        },
        {
          element: <Settings />,
          path: "/user/settings",
        },
        {
          path: "/user/otp-form",
          element: <OTPForm />,
        },
      ],
    },
  ]);
  const [state, dispatch] = useReducer(UserReducers, initialState);
  const { theme, userData } = state;
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
      <UserContext.Provider
        value={{ theme: theme, userData: userData, dispatch: dispatch }}
      >
        <RouterProvider router={appRoutes} />
      </UserContext.Provider>
    </>
  );
}

export default App;
