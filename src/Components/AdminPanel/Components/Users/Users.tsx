import axios from "axios";
import { useEffect } from "react";

const Users = () => {
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/get-users`,
        { withCredentials: true }
      );
      console.log(res);
    };
    fetchUsers();
  }, []);
  return <div>Users</div>;
};

export default Users;
