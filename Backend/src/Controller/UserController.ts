import { Request, Response } from "express";
import UserModel, { User } from "../Models/UserModel";
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
  user?: string | JwtPayload;
}

const userLogin = async (
  req: Request<{}, {}, UserLoginRequest>,
  res: Response
) => {
  const { name, email, password } = req.body;
  const secretKey = process.env.SECRET_KEY;
  if (!secretKey) {
    throw new Error("SECRET_KEY is not defined in the environment variables!");
  }
  const exisitingUser = await UserModel.findOne({ email: email });
  if (!exisitingUser) {
    const hashPass = await hash(password, 5);
    const newUser: User = await UserModel.create({
      name: name,
      email: email,
      password: hashPass,
    });

    res.json({
      message: "Account Created Successfully!",
      newUser,
      token: generateToken(newUser._id, secretKey, "7d"),
    });
  } else {
    // const p1 = new Promise()
    console.log(name, email);
    const result = await compare(password, exisitingUser?.password);
    result
      ? res.json({
          message: "Logged In Successfully!",
          exisitingUser,
          token: generateToken(exisitingUser._id, secretKey, "7d"),
        })
      : res.json({ message: "Password Incorrect!" });
  }
};

const getUser = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    // Accessing the userId from req.user, which was set by the userAuth middleware
    const { userId } = req.user as { userId: string };
    const user = await UserModel.findById(userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    // console.log(user);

    res.json({ message: "User retrieved successfully!", user });
  } catch (error) {
    console.error("Error in getUser:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const changePassword = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  const { email } = req.params;
  const OTP = Math.floor(100000 + Math.random() * 900000);
  const subject = `OTP for change password!`;
  const mailBody = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9fafb; border-radius: 8px; padding: 16px; border: 1px solid #e5e7eb;">
    <h2 style="text-align: center; font-size: 24px; font-weight: 600; color: #10b981; margin-bottom: 16px;">Your OTP Code</h2>
    <p style="font-size: 16px; color: #374151; margin-bottom: 16px;">Hello,</p>
    <p style="font-size: 16px; color: #374151; margin-bottom: 24px;">
      We received a request to change your password. Use the OTP below to verify your identity:
    </p>
    <p style="font-size: 32px; font-weight: bold; color: #10b981; text-align: center; margin-bottom: 24px;">${OTP}</p>
    <p style="font-size: 16px; color: #6b7280; margin-bottom: 16px;">
      This OTP is valid for the next 10 minutes. If you didn’t request a password change, you can safely ignore this email.
    </p>
    <p style="font-size: 16px; color: #374151;">Thank you,<br><strong>Team Summit.AI</strong></p>
    <div style="border-top: 1px solid #e5e7eb; margin: 24px 0;"></div>
    <footer style="font-size: 14px; color: #6b7280; text-align: center;">
      Need help? Contact us at 
      <a href="mailto:support@summit.ai" style="color: #3b82f6; text-decoration: none;">support@summit.ai</a>.
    </footer>
  </div>
`;

  await sendOTP(email, subject, mailBody);

  res.json({ message: "OTP Sent ✔️", OTP });
};

const alterPassword = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  const { password } = req.body;
  const { userId } = req.user as JwtPayload;
  const hashpass = await hash(password, 5);
  await UserModel.findByIdAndUpdate(userId, { password: hashpass });
  res.json({ message: "Password Changed Successfully!" });
};

const purchasePlan = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  
};

export { userLogin, getUser, changePassword, alterPassword };
