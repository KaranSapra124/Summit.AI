import { Router, Request, Response } from "express";
import {
  addPlan,
  adminAuth,
  adminLogin,
  editUserAdmin,
  getUsersAdmin,
} from "../Controller/AdminController";
const router = Router();

router.post("/add-plan", adminAuth, addPlan);
router.post("/login", adminLogin);
router.get("/get-users", adminAuth, getUsersAdmin);
router.post("/edit-user", adminAuth, editUserAdmin);
export default router;
