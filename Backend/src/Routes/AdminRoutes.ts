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
router.post("/get-users", adminAuth, getUsersAdmin);
router.post("/edit-user", adminAuth, editUserAdmin);
router.post("/delete-user/:id", adminAuth, deleteUserAdmin);
router.post("/plans", adminAuth, getPlansAdmin);
router.post("/edit-plan", adminAuth, editPlansAdmin);
router.post("/add-plan", adminAuth, addPlanAdmin);
router.post("/delete-plan/:id", adminAuth, deletePlanAdmin);
export default router;
