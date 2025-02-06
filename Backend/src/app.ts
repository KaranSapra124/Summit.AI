import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./Routes/UserRoutes";
import { dbConfig } from "./Utils/dbConfig";
import CookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
dbConfig();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(CookieParser());

app.use("/api/v1/user", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
