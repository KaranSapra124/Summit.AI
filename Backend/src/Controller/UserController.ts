import { Request, Response } from "express";
import UserModel from "../Models/UserModel";
import { hash, compare } from "bcrypt";

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
  const exisitingUser = await UserModel.findOne({ email: email });
  if (!exisitingUser) {
    const hashPass = await hash(password, 5);
    const newUser = await UserModel.create({
      name: name,
      email: email,
      password: hashPass,
    });
    res.json({ message: "Account Created Successfully!", newUser });
  } else {
    const result = await compare(password, exisitingUser?.password);
    result
      ? res.json({ message: "Logged In Successfully!", exisitingUser })
      : res.json({ message: "Logged In Successfully!", exisitingUser });
  }
};

export { userLogin };
