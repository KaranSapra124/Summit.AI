import { Request, Response } from "express";
import UserModel, { User } from "../Models/UserModel";
import PlanModel from "../Models/PlanModel";
import { hash, compare } from "bcrypt";
import { generateToken } from "../Utils/JwtConfig";
import { JwtPayload } from "jsonwebtoken";
import { sendOTP } from "../Utils/Nodemailer";
import AdminModel from "../Models/AdminModel";
interface AdminLoginRequest {
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

export const adminLogin = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  const { formData } = req.body;
  const { email, password } = formData as AdminLoginRequest;
  const admin = await AdminModel.findOne({ email: email });
  // console.log(admin)
  // const hashPass = await hash(password, 5);
  // const newAdmin = await AdminModel.create({
  //   email: email,
  //   password: hashPass,
  // });
  // res.json({ message: "Admin Created!", newAdmin });
  if (admin) {
    const isTrue = await compare(password, admin.password);

    isTrue
      ? (() => {
          const secretKey = process.env.SECRET_KEY;
          if (!secretKey) {
            throw new Error(
              "SECRET_KEY is not defined in the environment variables!"
            );
          }
          res.cookie(
            "adminToken",
            generateToken(admin._id.toString(), secretKey, "7d"),
            {
              maxAge: 7 * 24 * 60 * 60 * 1000,
              secure: true,
            }
          );
          res.json({ message: "Admin Logged In!", admin });
        })()
      : res.json({ message: "Invalid Credentials" });
  } else {
    res.json({ message: "Admin Not Found!" });
  }
};

export const adminAuth = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  const { adminToken } = req.cookies;
  console.log(adminToken);
};
