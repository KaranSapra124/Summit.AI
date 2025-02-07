import { Request, Response } from "express";
import UserModel, { User } from "../Models/UserModel";
import { hash, compare } from "bcrypt";
import { generateToken } from "../Utils/JwtConfig";
import { JwtPayload } from "jsonwebtoken";


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

export { userLogin, getUser };
