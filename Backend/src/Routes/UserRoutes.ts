import { Router, Request, Response } from "express";
import {
  alterPassword,
  changePassword,
  forgotPassword,
  getPlans,
  getResult,
  getUser,
  purchasePlan,
  updateProfile,
  userLogin,
} from "../Controller/UserController";
import { userAuth } from "../Middlewares/Auth";
const router = Router();
router.post("/login", userLogin);
router.post("/forgot-password", forgotPassword); 
router.post("/get-user", userAuth, getUser);
router.post("/change-password/:email", userAuth, changePassword);
router.post("/alter-password", userAuth, alterPassword);
router.post("/get-plans", getPlans);
router.post("/purchase-plan", userAuth, purchasePlan);
router.post("/get-result", userAuth, getResult);
router.post("/update-profile", userAuth, updateProfile);


export default router;
