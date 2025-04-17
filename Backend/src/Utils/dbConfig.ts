import { connect } from "mongoose";
export const dbConfig = () => {
    // console.log(process.env.FRONTEND_URL)
  connect(process.env.DB_URL as string)
    .then(() => console.log("Db Connected"))
    .catch((err) => console.log(err));
};
