import { NextFunction, Request, Response } from "express";
import UserModel, { User } from "../Models/UserModel";
import PlanModel from "../Models/PlanModel";
import { hash, compare } from "bcrypt";
import { generateToken, verifyToken } from "../Utils/JwtConfig";
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
  const { adminToken } = req.cookies;
  if (adminToken === undefined) {
    console.log(adminToken)
    const { formData } = req.body;
    const { email, password } = formData as AdminLoginRequest;
    const admin = await AdminModel.findOne({ email: email });
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
            const token = generateToken(admin._id.toString(), secretKey, "7d");
            res.cookie("adminToken", token, {
              maxAge: 7 * 24 * 60 * 60 * 1000,
              secure: true,
            });
            res.json({ message: "Admin Logged In!", admin, token });
          })()
        : res.json({ message: "Invalid Credentials" });
    } else {
      res.json({ message: "Admin Not Found!" });
    }
  } else {
    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
      throw new Error(
        "SECRET_KEY is not defined in the environment variables!"
      );
    }
    const isVerified = verifyToken(adminToken, secretKey) as JwtPayload;
    if (!isVerified) {
      res.json({ message: "Token Expired , Log In Again!" });
    } else {
      const { userId } = isVerified;
      const admin = await AdminModel.findById(userId);
      res.json({ message: "Admin Fetched!", admin });
    }
  }
};

export const adminAuth = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const secretKey = process.env.SECRET_KEY;
  if (!secretKey) {
    throw new Error("SECRET_KEY is not defined in the environment variables!");
  }
  const { adminToken } = req.cookies;
  const isVerified = verifyToken(adminToken, secretKey) as JwtPayload;
  if (!isVerified) {
    res.json({ message: "Token Expired , Log In Again!" });
  } else {
    req.admin = isVerified.userId;
    next();
  }
};

export const getUsersAdmin = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    const users = await UserModel.find();

    res.json({ message: "Users Fetched Successfully!", users });
  } catch (err) {
    res.json({ message: "Something Went Wrong", err });
  }
};

export const editUserAdmin = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  const { _id } = req.body;
  const updateUser = await UserModel.findByIdAndUpdate(
    _id,
    { ...req.body },
    { new: true }
  );
  res.json({ message: "User Updated Successfully!", updateUser });
};
export const deleteUserAdmin = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  await UserModel.findByIdAndDelete(id);
  res.json({ message: "User Deleted Successfully!" });
};

export const getPlansAdmin = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    const plans = await PlanModel.find();
    res.json({ message: "Plans Fetched!", plans });
  } catch (err) {
    res.json({ message: "Something Went Wrong!", err });
  }
};

export const editPlansAdmin = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  const { _id } = req.body;
  const updatePlan = await PlanModel.findByIdAndUpdate(
    _id,
    { ...req.body },
    { new: true }
  );
  res.json({ message: "Plan Updated Successfully!", updatePlan });
};

export const addPlanAdmin = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  console.log(req.body);
  const addPlan = await PlanModel.create(...req.body);
  res.json({ message: "Plan Added Successfully!", addPlan });
};

export const deletePlanAdmin = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  await PlanModel.findByIdAndDelete(id);
  res.json({ message: "Plan Deleted Successfully!" });
};
