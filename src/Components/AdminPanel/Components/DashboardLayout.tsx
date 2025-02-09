import { FaUsers, FaChartLine, FaBell } from "react-icons/fa";
import Container from "../../Global/Container";
import { userDataInterface } from "../../../Utils/UserReducer";
import { useState } from "react";

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
        <div className="flex gap-4 justify-center items-center">
          {cards?.map((elem, index: number) => {
            return (
              <>
                <div
                  key={index}
                  className="flex items-center  border bg-emerald-500 text-white border-black rounded  px-4 py-3"
                >
                  <div className="text-3xl bg-white p-1 text-emerald-500 rounded ">
                    {elem?.icon}
                  </div>
                  <div className="mx-5">
                    <h2 className="text-xl font-bold">{elem?.title}</h2>
                    <p className="text-xl text-left font-extrabold text-gray-900">
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
  const [users, setUsers] = useState<userDataInterface[]>([
    {
      name: "John Doe",
      email: "john.doe@example.com",
      plan: {
        type: "Pro",
        usage: 50,
        limit: 100,
      },
      purchasePlan: {
        _id: "plan_1",
        name: "Pro Plan",
        price: 29,
        currency: "USD",
        textLimit: "50,000 characters",
        summariesPerDay: 100,
        fileUploads: true,
        customization: true,
        prioritySupport: true,
        apiAccess: true,
      },
      isActive: true,
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      plan: {
        type: "Free",
        usage: 10,
        limit: 10,
      },
      purchasePlan: {
        _id: "plan_2",
        name: "Free Plan",
        price: 0,
        currency: "USD",
        textLimit: "5,000 characters",
        summariesPerDay: 10,
        fileUploads: false,
        customization: false,
        prioritySupport: false,
        apiAccess: false,
      },
      isActive: true,
    },
    {
      name: "David Johnson",
      email: "david.johnson@example.com",
      plan: {
        type: "Enterprise",
        usage: 200,
        limit: 500,
      },
      purchasePlan: {
        _id: "plan_3",
        name: "Enterprise Plan",
        price: "Custom Pricing",
        currency: "USD",
        textLimit: "Unlimited",
        summariesPerDay: "Unlimited",
        fileUploads: true,
        customization: true,
        prioritySupport: true,
        apiAccess: true,
      },
      isActive: false,
    },
  ]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-white">Active Users</h2>
      <div className="overflow-x-auto">
        <table className="table-auto  w-full border border-gray-300">
          <thead className="bg-gray-200 rounded">
            <tr>
              <th className="px-4 py-2 text-center border">Name</th>
              <th className="px-4 py-2 text-center border">Email</th>
              <th className="px-4 py-2 text-center border">Plan</th>
              <th className="px-4 py-2 text-center border">Active Status</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((elem, index: number) => (
              <tr
                key={index}
                className="odd:bg-white even:bg-gray-50 hover:bg-gray-100"
              >
                <td className="px-4 py-2 border">{elem.name}</td>
                <td className="px-4 py-2 border">{elem.email}</td>
                <td className="px-4 py-2 border">{elem.purchasePlan.name}</td>
                <td className="px-4 py-2 border">
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
