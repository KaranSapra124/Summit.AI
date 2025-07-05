import { Request, Response } from "express";
import UserModel, { User } from "../Models/UserModel";
import { hash, compare } from "bcrypt";
import { generateToken } from "../Utils/JwtConfig";
import { JwtPayload } from "jsonwebtoken";
import { sendAcknowledgeEmail, sendOTP, sendResetPasswordLink } from "../Utils/Nodemailer";
import PlanModel, { Plan } from "../Models/PlanModel";
import axios from "axios";
import { GoogleGenAI } from "@google/genai"
import { geminiCorrect, geminiDetectLang, geminiSummarize } from "../Utils/GeminiAPiFn";

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
      purchasePlan: {
        name: "Free Plan",
        price: 0,
        currency: "INR",
        textLimit: "500 words per summary",
        summariesPerDay: 5,
        fileUploads: false,
        customization: false,
        prioritySupport: false,
        apiAccess: false,
      },
    });
    const message = `<div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
    <div className="text-center mb-6">
      <h1 className="text-2xl font-bold text-emerald-500 mb-2">
        Welcome to Summit.AI, ${newUser.name}!
      </h1>
      <p className="text-gray-600">
        Your journey to smarter AI solutions starts here.
      </p>
    </div>

    <div className="text-left">
      <p className="text-gray-800 text-base mb-4">
        Hi <b>${newUser.name}</b>,
      </p>
      <p className="text-gray-800 text-base mb-4">
        Thank you for creating an account at <b>Summit.AI</b>. As a warm
        welcome, we’ve activated your <b>Free Plan</b>, so you can start
        exploring our features right away!
      </p>
      <p className="text-gray-800 text-base mb-4">
        Here’s what you get with your Free Plan:
      </p>
      <ul className="list-disc pl-5 mb-4 text-gray-800">
        <li className="mb-2">✨ 5 free uses</li>
        <li className="mb-2">⚡ Access to our powerful AI summarization tools</li>
        <li>🚀 Opportunities to upgrade for even more features!</li>
      </ul>
      <p className="text-gray-800 text-base mb-4">
        We’re thrilled to have you on board. If you have any questions or need
        assistance, feel free to reach out to our support team.
      </p>
      <div className="text-center mt-6">
        <a
          href="https://summit-ai.onrender.com/"
          className="bg-emerald-500 text-white px-4 py-2 rounded-md text-base font-bold hover:bg-emerald-600"
        >
          Start Exploring
        </a>
      </div>
    </div>

    <div className="border-t border-gray-300 mt-6 pt-4 text-center text-sm text-gray-500">
      &copy; ${new Date().getFullYear()} Summit.AI. All rights reserved.
      <br />
      You’re receiving this email because you signed up at Summit.AI.
    </div>
  </div>`;
    await sendAcknowledgeEmail(
      newUser.email,
      `🎉 Welcome to Summit.AI, ${newUser.name}! Your Free Plan Awaits! 🚀`,
      message
    );
    const token = generateToken(newUser._id, secretKey, "7d");

    res.cookie("userToken", token, {
      secure: true, // True for HTTPS
      sameSite: "none", // Or "Lax" depending on your setup
    });

    res.json({
      message: "Account Created Successfully!",
      newUser,
      token: token,
    });
  } else {
    // const p1 = new Promise()
    // console.log(name, email);
    const token = generateToken(exisitingUser._id, secretKey, "7d");
    res.cookie("userToken", token, {
      secure: true, // True for HTTPS
      sameSite: "none", // Or "Lax" depending on your setup
      // domain: ".onrender.com", // Match backend domain
    });
    const result = await compare(password, exisitingUser?.password);
    result
      ? res.json({
        message: "Logged In Successfully!",
        exisitingUser,
        token: token,
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

const forgotPassword = async (req: CustomRequest, res: Response): Promise<void> => {
  const secret_key: string = process.env.SECRET_KEY || "";
  const frontendUrl: string = process.env.FRONTEND_URL || "";
  const { email } = req.body;
  const userId = await UserModel.findOne({ email: email });
  const token = generateToken(userId?._id || "", secret_key, "1");
  const _url = `${frontendUrl}/reset-password?email=${email}&token=${token}`
  const mail = await sendResetPasswordLink(email, "Reset Password Link", `<div style="font-family: 'Segoe UI', sans-serif; background-color: #f4f4f4; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: white; border-radius: 10px; padding: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <h2 style="color: #2d89ef; margin-bottom: 10px;">Summit.AI Password Reset</h2>
      <p style="font-size: 16px; color: #333;">Hi <strong>${userId?.name}</strong>,</p>

      <p style="font-size: 15px; color: #555;">
        We received a request to reset your password for your Summit.AI account.
        If you didn’t make this request, you can safely ignore this email.
      </p>

      <p style="text-align: center; margin: 30px 0;">
        <a href="${_url}" style="background-color: #2d89ef; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
          Reset Your Password
        </a>
      </p>

      <p style="font-size: 14px; color: #777;">
        This link will expire in 1 hour for your security. If you continue to have trouble, please reach out to our support team.
      </p>

      <hr style="margin: 30px 0;">
      <p style="font-size: 13px; color: #aaa; text-align: center;">
        © ${new Date().getFullYear()} Summit.AI • All rights reserved
      </p>
    </div>
  </div>`)
  if (mail.accepted) {
    res.status(200).send({ message: "Password reset mail sent!" })
  }
  else {
    res.status(401).send({ message: "Error while sending!" })

  }
}

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

const getPlans = async (req: CustomRequest, res: Response): Promise<void> => {
  const plans = await PlanModel.find();
  res.json({ message: "Plans Fetched!", plans });
};

const purchasePlan = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  const { userId } = req.user as JwtPayload;
  const plan = req.body;
  await UserModel.findByIdAndUpdate(userId, { purchasePlan: plan.item });
  res.json({ message: "Plan Purchased Successfully!" });
};

const getResult = async (req: CustomRequest, res: Response): Promise<void> => {
  const { data } = req.body;
  const { para, selectedVal } = data;
  const { userId } = req.user as JwtPayload;

  try {
    // Decrement usage only for summarization
    // if (selectedVal === "summarize") {
    await UserModel.findOneAndUpdate(
      { _id: userId, "purchasePlan.summariesPerDay": { $gt: 0 } },
      { $inc: { "purchasePlan.summariesPerDay": -1 } },
      { new: true }
    );
    // }

    let resultText = "";

    if (selectedVal === "summarize") {
      resultText = await geminiSummarize(para);
    } else if (selectedVal === "correct") {
      resultText = await geminiCorrect(para);
    } else if (selectedVal === "detect") {
      resultText = await geminiDetectLang(para);
    } else {
      resultText = "Invalid option selected.";
    }

    res.json({
      message: "Result Fetched",
      result: resultText,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error });
  }
}

const updateProfile = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  const { userId } = req.user as JwtPayload;
  const { name, email } = req.body;
  await UserModel.findByIdAndUpdate(userId, { name: name, email: email });
  res.json({ message: "User Updated!" });
};

export {
  userLogin,
  getUser,
  changePassword,
  alterPassword,
  getPlans,
  purchasePlan,
  getResult,
  updateProfile,
  forgotPassword
};
