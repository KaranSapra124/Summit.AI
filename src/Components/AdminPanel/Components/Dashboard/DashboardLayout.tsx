import { FaUsers, FaChartLine, FaBell } from "react-icons/fa";
import Container from "../../../Global/Container";
import { userDataInterface } from "../../../../Utils/UserReducer";
import { useState } from "react";
import Divider from "../../../../Utils/Divider";

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
        <div className="flex gap-4 justify-start ">
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
  const [users] = useState<userDataInterface[]>([
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
    <div className="py-4">
      <h2 className="text-xl font-bold  text-white text-left">Active Users</h2>
      <Divider className="h-1 w-12 bg-emerald-500 rounded-full my-4" />
      <div className="overflow-x-auto h-96 overflow-y-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs uppercase bg-gray-700 text-white">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Plan
              </th>
              <th scope="col" className="px-6 py-3 text-center">
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
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {elem.name}
                  </td>
                  <td className="px-6 py-4">{elem.email}</td>
                  <td className="px-6 py-4">{elem.purchasePlan.name}</td>
                  <td className="px-6 py-4 text-center">
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
