import { Request, Response } from "express";
import UserModel, { User } from "../Models/UserModel";
import { hash, compare } from "bcrypt";
import { generateToken } from "../Utils/JwtConfig";

interface UserLoginRequest {
  name: string;
  email: string;
  password: string;
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

export { userLogin };
