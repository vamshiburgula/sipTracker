const express = require("express");

const router = express.Router();

const {
  getDashboardSummary,
  getRecentTransactions,
} = require("../controllers/dashboardController");

router.get("/summary", getDashboardSummary);

router.get("/transactions", getRecentTransactions);

module.exports = router;
