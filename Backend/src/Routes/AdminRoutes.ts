import { Router, Request, Response } from "express";
import {
  addPlan,
  adminAuth,
  adminLogin,
  deleteUserAdmin,
  editUserAdmin,
  getUsersAdmin,
} from "../Controller/AdminController";
const router = Router();

router.post("/add-plan", adminAuth, addPlan);
router.post("/login", adminLogin);
router.get("/get-users", adminAuth, getUsersAdmin);
router.post("/edit-user", adminAuth, editUserAdmin);
router.post("/delete-user/:id", adminAuth, deleteUserAdmin);
export default router;
