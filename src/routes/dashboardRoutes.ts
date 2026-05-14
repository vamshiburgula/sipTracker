import express from "express";
import {
  getDashboardSummary,
  getRecentTransactions,
} from "../controllers/dashboardController";

const router = express.Router();

router.get("/summary", getDashboardSummary);

router.get("/transactions", getRecentTransactions);

export default router;
