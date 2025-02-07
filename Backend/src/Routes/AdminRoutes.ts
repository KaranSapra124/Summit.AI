import { Router, Request, Response } from "express";
import { addPlan } from "../Controller/AdminController";
const router = Router();

router.post("/add-plan", addPlan);
export default router;
