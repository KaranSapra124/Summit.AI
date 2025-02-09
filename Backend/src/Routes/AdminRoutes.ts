import { Router, Request, Response } from "express";
import { addPlan, adminLogin } from "../Controller/AdminController";
const router = Router();

router.post("/add-plan", addPlan);
router.post("/login", adminLogin);
export default router;
