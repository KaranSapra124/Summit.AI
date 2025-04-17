import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../Utils/JwtConfig";
import { JwtPayload } from "jsonwebtoken";
interface CustomRequest extends Request {
  user?: string | JwtPayload;
}
export const userAuth = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { userToken } = req.cookies;
  // console.log(userToken)

  try {
    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
      res.status(401).json({ message: "No Token Provided" });
    } else {
      const id = verifyToken(userToken, secretKey); // Assuming this function verifies the token and returns the user ID
      req.user = id; // Attach the user ID to the request object
      // console.log(id)
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or Expired Token" });
  }
};
