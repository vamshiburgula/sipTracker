import express, { Request, Response } from "express";
import {
  createInvestor,
  getInvestor,
  getInvestorHoldings,
  getInvestorNetworth,
  login,
  logout,
  getAllInvestors,
  getInvestorAnalytics,
} from "../controllers/investorController.js";

const router = express.Router();

router.post("/login", login);

router.post("/logout", logout);

router.post("/", createInvestor);

router.get("/analytics", getInvestorAnalytics);

router.get("/", getAllInvestors);

router.get("/:investorId/holdings", getInvestorHoldings);

router.get("/:investorId/networth", getInvestorNetworth);

router.get("/:investorId", getInvestor);

export default router;
