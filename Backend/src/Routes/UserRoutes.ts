import { Router, Request, Response } from "express";
import { getUser, userLogin } from "../Controller/UserController";
import { userAuth } from "../Middlewares/Auth";
const router = Router();
router.post("/login", userLogin);
router.post("/get-user", userAuth, getUser);

export default router;
