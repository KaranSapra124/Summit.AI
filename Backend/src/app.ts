import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./Routes/UserRoutes";
import adminRouter from "./Routes/AdminRoutes";
import { dbConfig } from "./Utils/dbConfig";
import CookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
dbConfig();
const allowedOrigins = [
  "http://localhost:5173", // Development
  "https://summit-ai.onrender.com", // Production
];

app.use((req, res, next) => {
  // const origin  =
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "");
  next();
});
// app.use((req, res, next) => {
//   const origin = req.headers.origin;

//   // Check if the request's origin is in the allowedOrigins list
//   if (allowedOrigins.includes(origin || "")) {
//     res.setHeader("Access-Control-Allow-Origin", origin || "");
//     res.setHeader("Access-Control-Allow-Credentials", "true"); // Needed for credentials
//   }

//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "PUT, GET, HEAD, POST, DELETE, OPTIONS"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Authorization, X-Requested-With, Origin"
//   );
//   res.setHeader("Access-Control-Max-Age", "7200"); // Preflight cache duration

//   if (req.method === "OPTIONS") {
//     res.status(204).end(); // Immediately respond to preflight requests
//     return;
//   }

//   next();
// });

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
app.use(express.json());
app.use(CookieParser());

app.use("/api/v1/user", router);
app.use("/api/v1/admin", adminRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
