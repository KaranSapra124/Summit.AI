import { Request, Response } from "express";
import UserModel, { User } from "../Models/UserModel";
import PlanModel from "../Models/PlanModel";
import { hash, compare } from "bcrypt";
import { generateToken } from "../Utils/JwtConfig";
import { JwtPayload } from "jsonwebtoken";
import { sendOTP } from "../Utils/Nodemailer";

interface UserLoginRequest {
  name: string;
  email: string;
  password: string;
}
interface CustomRequest extends Request {
  admin?: string | JwtPayload;
}

export const addPlan = async (req: CustomRequest, res: Response) => {
  const newPlan = await PlanModel.create(req.body);
  res.json({ message: "Plan Added Successfully!", newPlan });
};
