import { Router, Request, Response } from "express";
import {
  addPlan,
  addPlanAdmin,
  adminAuth,
  adminLogin,
  deletePlanAdmin,
  deleteUserAdmin,
  editPlansAdmin,
  editUserAdmin,
  getPlansAdmin,
  getUsersAdmin,
} from "../Controller/AdminController";
const router = Router();

router.post("/add-plan", adminAuth, addPlan);
router.post("/login", adminLogin);
router.get("/get-users", adminAuth, getUsersAdmin);
router.post("/edit-user", adminAuth, editUserAdmin);
router.post("/delete-user/:id", adminAuth, deleteUserAdmin);
router.get("/plans", adminAuth, getPlansAdmin);
router.post("/edit-plan", adminAuth, editPlansAdmin);
router.post("/add-plan", adminAuth, addPlanAdmin);
router.get("/delete-plan/:id", adminAuth, deletePlanAdmin);
export default router;
