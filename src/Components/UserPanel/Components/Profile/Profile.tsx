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
    <div>
      <h1>{details?.name}</h1>
      <h2>{details?.email}</h2>
      <div>
        <h1>{details.plan.type}</h1>
        <p>{details.plan.limit}</p>
        <p>{details.plan.usage}</p>
      </div>
    </div>
  );
}

export default Profile;
