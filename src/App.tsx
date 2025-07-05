import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./Components/Auth/Login";
import Navbar from "./Components/Global/Navbar";
import Home from "./Pages/Home";
import Dashboard from "./Components/UserPanel/Dashboard";
import Profile from "./Components/UserPanel/Components/Profile/Profile";
import Settings from "./Components/UserPanel/Components/Settings/Settings";
import { UserContext } from "./Utils/UserContext";
import { useReducer } from "react";
import { initialState, UserReducers } from "./Utils/UserReducer";
import OTPForm from "./Components/UserPanel/Components/Settings/OTPForm";
import ChangePassword from "./Components/UserPanel/Components/Settings/ChangePassword";
import Layout from "./Components/UserPanel/Components/TextBoxLayout/Layout";
import {
  AdminContext,
  adminInitialState,
  adminReducer,
} from "./Utils/AdminReducer";
import AdminDashboard from "./Components/AdminPanel/AdminDashboard";
import DashboardLayout from "./Components/AdminPanel/Components/Dashboard/DashboardLayout";
import AdminLogin from "./Components/AdminPanel/Components/Auth/AdminLogin";
import Users from "./Components/AdminPanel/Components/Users/Users";
import Plans from "./Components/AdminPanel/Components/Plans/Plans";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ForgotPassword from "./Components/Auth/ForgotPassword";
import ResetPassword from "./Components/Auth/ResetPassword";

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
      element: <Login isLogin={true} />,
      path: "/login",
    },
    {
      element: <Login isLogin={false} />,
      path: "/register",
    },
    {
      element: <ForgotPassword />,
      path: "/forgot-password"
    },
    {
      element: <ResetPassword />,
      path: "/reset-password"
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
        {
          path: "/user/change-password",
          element: <ChangePassword />,
        },
        {
          path: "/user/main-interface",
          element: <Layout />,
        },
      ],
    },
    {
      path: "/admin",
      element: <AdminDashboard />,
      children: [
        {
          path: "/admin",
          element: <DashboardLayout />,
        },
        {
          path: "/admin/users",
          element: <Users />,
        },
        {
          path: "/admin/plans",
          element: <Plans />,
        },
      ],
    },
    {
      path: "/admin/login",
      element: <AdminLogin />,
    },
  ]);
  const [state, dispatch] = useReducer(UserReducers, initialState);
  const [adminState, adminDispatch] = useReducer(
    adminReducer,
    adminInitialState
  );
  const { theme, userData } = state;
  const { adminData } = adminState;
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
      <ToastContainer />
      <AdminContext.Provider
        value={{ adminData: adminData, adminDispatch: adminDispatch }}
      >
        <UserContext.Provider
          value={{ theme: theme, userData: userData, dispatch: dispatch }}
        >
          <RouterProvider router={appRoutes} />
        </UserContext.Provider>
      </AdminContext.Provider>
    </>
  );
}

export default App;
