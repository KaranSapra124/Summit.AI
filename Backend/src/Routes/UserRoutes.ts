import { Router, Request, Response } from "express";
import {
  alterPassword,
  changePassword,
  getUser,
  userLogin,
} from "../Controller/UserController";
import { userAuth } from "../Middlewares/Auth";
const router = Router();
router.post("/login", userLogin);
router.post("/get-user", userAuth, getUser);
router.post("/change-password/:email", userAuth, changePassword);
router.post("/alter-password", userAuth, alterPassword);

export default router;
