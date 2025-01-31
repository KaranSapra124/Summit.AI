import { Request, Response } from "express";
const userLogin = (req: Request, res: Response) => {
    console.log(req.body)
  res.json({ message: "User Logged In" });
};

export { userLogin };
