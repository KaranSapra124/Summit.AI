import { Router } from "express";
import { userLogin } from "../Controller/UserController";
import { userAuth } from "../Middlewares/Auth";

const router = Router();

router.post("/login", userLogin);

export default router;
