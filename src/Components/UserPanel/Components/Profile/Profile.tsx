import Divider from "../../../../Utils/Divider";
import Container from "../../../Global/Container";

interface planDetail {
  type: string;
  usage: number;
  limit: number;
}
interface profileDetails {
  name: string;
  email: string;
  plan: planDetail;
}
function Profile() {
  const details: profileDetails = {
    name: "John Doe",
    email: "john.doe@example.com",
    plan: {
      type: "Pro",
      usage: 5,
      limit: 10,
    },
  };
  return (
    <>
      <Container className="p-20 w-full">
        <div className="flex justify-between items-center shadow-sm bg-gray-100/40 rounded-lg p-2 ">
          <img
            className="w-22 rounded-full mx-5"
            src="https://i.pinimg.com/236x/cd/4b/d9/cd4bd9b0ea2807611ba3a67c331bff0b.jpg"
            alt="No Image"
          />
          <div>
            <h1 className="text-xl font-bold text-black">
              <span className="text-gray-200 font-extrabold ">
                Owner Name :{" "}
              </span>
              {details?.name}
            </h1>
            <Divider className="h-0.5 w-full bg-black rounded-full my-2 " />
            <h2 className="text-xl font-bold text-black">
              {" "}
              <span className="text-gray-200 font-extrabold ">
                Owner Email :{" "}
              </span>
              {details?.email}
            </h2>
          </div>
        </div>
        <div className="shadow-sm shadow-white bg-gray-100/40 my-2  p-2 w-full justify-center items-center">
          <h2 className="text-gray-900 text-2xl font-extrabold">
            Plan Details:
          </h2>
          <div className="flex justify-between">
            <table className="flex justify-between w-full border border-gray-100 ">
              <td className="border w-full border-gray-100 p-2 font-bold">
                <tr className="text-lg  border-b-2 border-white">Plan Name</tr>
                <td className="text-xl font-extrabold text-gray-100 py-4">{details?.plan.type}</td>
              </td>
              <td className="border w-full border-gray-100 p-2 font-bold">
                <tr className="text-lg  border-b-2 border-white">Plan Limit</tr>
                <td className="text-xl font-extrabold text-gray-100 py-4">{details?.plan.limit}</td>
              </td>
              <td className="border w-full border-gray-100 p-2 font-bold">
                <tr className="text-lg  border-b-2 border-white">Plan Usage</tr>
                <td className="text-xl font-extrabold text-gray-100 py-4">{details?.plan.usage}</td>
              </td>
            </table>
            {/* <h1>{details.plan.type}</h1>
            <p>{details.plan.limit}</p>
            <p>{details.plan.usage}</p> */}
          </div>
        </div>
      </Container>
    </>
  );
}

export default Profile;
