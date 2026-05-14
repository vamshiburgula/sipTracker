import express from "express";

import {
  createSIPController,
  getSIPController,
  processSIPController,
  getTransactionsController,
} from "../controllers/sipController";

const router = express.Router();

router.post("/", createSIPController);

router.get("/:sipId", getSIPController);

router.post("/:sipId/process", processSIPController);

router.get("/:sipId/transactions", getTransactionsController);

export default router;
