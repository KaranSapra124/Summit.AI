import { useContext } from "react";
import {
  AdminContext,
  adminContextInterface,
  adminDataValues,
} from "../../Utils/AdminReducer";
import Container from "../Global/Container";
import { Link, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const context = useContext(AdminContext);
  const { adminData } = context as adminContextInterface;
  const { email } = adminData as adminDataValues;
  interface linkType {
    title: string;
    link: string;
  }
  const links: linkType[] = [
    {
      title: "Dashboard",
      link: "/admin",
    },
    {
      title: "Users",
      link: "/admin/user",
    },
    {
      title: "Plans",
      link: "/admin/plans",
    },
    {
      title: "Settings",
      link: "/admin/settings",
    },
  ];
  return (
    <>
      {/* <Container className="bg-black/80 h-screen"> */}
      <div className="flex    bg-black/80 h-screen w-full text-center">
        <div className="w-fit bg-gray-900 p-10 h-full">
          <h1 className="text-xl font-bold text-emerald-500">Summit.AI</h1>
          <div className="my-4">
            <img
              className="w-20 mx-auto shadow-white shadow-sm rounded-full "
              src="https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg"
              alt="No Image"
            />
            <h2 className="text-white my-2 font-bold ">Admin</h2>
          </div>
          <div className="flex flex-col gap-4">
            {links?.map((elem, index: number) => (
              <Link
                className="text-white hover:bg-white hover:text-black transition-all shadow-white shadow w-32 text-center font-semibold rounded-md p-2"
                to={elem?.link}
                key={index}
              >
                {elem?.title}
              </Link>
            ))}
          </div>
        </div>
        <Outlet />
      </div>
      {/* </Container> */}
    </>
  );
};

export default AdminDashboard;
