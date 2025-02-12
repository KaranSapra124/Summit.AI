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
app.use((req, res, next) => {
  // Allow specific origin
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://phenomenal-faun-96eab9.netlify.app"
  );

  // Allow specific HTTP methods
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );

  // Allow specific headers
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Accept, X-Requested-With, Origin"
  );

  // Allow credentials (cookies or authentication headers)
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Allow private network requests (optional, for devices on the same network)
  res.setHeader("Access-Control-Allow-Private-Network", "true");

  // Cache preflight request results for 2 hours (browser caps may override this)
  res.setHeader("Access-Control-Max-Age", "7200");

  // Handle preflight requests (important for CORS to work)
  if (req.method === "OPTIONS") {
    res.status(204).end(); // Respond with 204 No Content for preflight
    return;
  }

  next();
});

// app.use(
//   cors({
//     origin: "https://phenomenal-faun-96eab9.netlify.app/",
//     credentials: true,
//   })
// );
app.use(express.json());
app.use(CookieParser());

app.use("/api/v1/user", router);
app.use("/api/v1/admin", adminRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
