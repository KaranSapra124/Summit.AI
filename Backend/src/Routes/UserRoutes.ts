import { Router, Request, Response } from "express";
import {
  alterPassword,
  changePassword,
  getPlans,
  getUser,
  purchasePlan,
  userLogin,
} from "../Controller/UserController";
import { userAuth } from "../Middlewares/Auth";
const router = Router();
router.post("/login", userLogin);
router.post("/get-user", userAuth, getUser);
router.post("/change-password/:email", userAuth, changePassword);
router.post("/alter-password", userAuth, alterPassword);
router.post("/get-plans", userAuth, getPlans);
router.post("/purchase-plan", userAuth, purchasePlan);

export default router;
