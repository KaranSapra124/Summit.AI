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
  const newUser = await UserModel.create({ name: name, email: email });
  res.json({ message: "Logged In Successfully!", newUser });
};

export { userLogin };
