import { Router } from "express";
import { userLogin } from "../Controller/UserController";

const router = Router();

router.post("/login", userLogin);

export default router;
