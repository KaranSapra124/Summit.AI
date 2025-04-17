import { FaUsers, FaChartLine, FaBell } from "react-icons/fa";
import Container from "../../../Global/Container";
import { userDataInterface } from "../../../../Utils/UserReducer";
import { useEffect, useState } from "react";
import Divider from "../../../../Utils/Divider";
import axios from "axios";

const DashboardLayout = () => {
  interface cardType {
    title: string;
    icon: React.ReactNode;
    count: number;
  }
  const cards: cardType[] = [
    {
      title: "Total Users",
      icon: <FaUsers />,
      count: 1200,
    },
    {
      title: "Daily Usage",
      icon: <FaChartLine />,
      count: 850,
    },
    {
      title: "Notifications Sent",
      icon: <FaBell />,
      count: 50,
    },
  ];
  return (
    <>
      <Container className="w-full">
        <div className="flex max-[600px]:flex-col gap-4 justify-start ">
          {cards?.map((elem, index: number) => {
            return (
              <>
                <div
                  key={index}
                  className="flex items-center max-[600px]:w-64 max-[600px]:mx-auto border bg-emerald-500 text-white border-black rounded  px-4 py-3"
                >
                  <div className="text-3xl max-[600px]:text-xl bg-white p-1 text-emerald-500 rounded ">
                    {elem?.icon}
                  </div>
                  <div className="mx-5">
                    <h2 className="text-xl max-[600px]:text-sm font-bold">
                      {elem?.title}
                    </h2>
                    <p className="text-xl max-[600px]:text-sm text-left font-extrabold text-gray-900">
                      {elem?.count}
                    </p>
                  </div>
                </div>
              </>
            );
          })}
        </div>
        <MostUsedUsers />
      </Container>
    </>
  );
};

const MostUsedUsers = () => {
  const [users, setUsers] = useState<userDataInterface[]>([]);
  const fetchUsers = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/get-users`,
        {},
        { withCredentials: true }
      );
      setUsers(res.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  useEffect(() => {
    document.cookie.includes("adminToken") && fetchUsers();
  }, []);

  return (
    <div className="py-4">
      <h2 className="text-xl font-bold  text-white text-left max-[600px]:text-sm">
        Active Users
      </h2>
      <Divider className="h-1 w-12 bg-emerald-500 rounded-full my-4" />
      <div className="overflow-x-auto h-96 overflow-y-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs uppercase bg-gray-700 text-white">
            <tr>
              <th scope="col" className="px-6 py-3 text-center border">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-center border">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-center border">
                Plan
              </th>
              <th scope="col" className="px-6 py-3 text-center border">
                Active Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white text-center text-black">
            {users
              ?.filter((elem) => elem.isActive === true)
              ?.map((elem, index: number) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 dark:border-gray-700"
                >
                  <td className="px-6 py-4 border font-medium text-gray-900 whitespace-nowrap">
                    {elem.name}
                  </td>
                  <td className="px-6 py-4 border">{elem.email}</td>
                  <td className="px-6 py-4 border">{elem.purchasePlan.name}</td>
                  <td className="px-6 py-4 border text-center">
                    {elem.isActive ? "Active" : "Inactive"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardLayout;
