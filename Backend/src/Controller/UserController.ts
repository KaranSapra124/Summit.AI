import { Request, Response } from "express";
import UserModel from "../Models/UserModel";

interface UserLoginRequest {
  name: string;
  email: string;
}

const userLogin = async (
  req: Request<{}, {}, UserLoginRequest>,
  res: Response
) => {
  const { name, email } = req.body;
  console.log(name,email)
  const exisitingUser = await UserModel.findOne({ email: email });
  if (!exisitingUser) {
    const newUser = await UserModel.create({ name: name, email: email });
    res.json({ message: "Account Created Successfully!", newUser });
  } else {
    res.json({ message: "Logged In Successfully!", exisitingUser });
  }
};

export { userLogin };
