import { Router, Request, Response } from "express";
import { addPlan, adminAuth, adminLogin } from "../Controller/AdminController";
const router = Router();

router.post("/add-plan", adminAuth, addPlan);
router.post("/login", adminLogin);
export default router;
