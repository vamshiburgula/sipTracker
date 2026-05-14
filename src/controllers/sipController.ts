import { Request, Response } from "express";
import {
  createSIP,
  getSIP,
  processSIP,
  getTransactions,
} from "../models/sipModel";

export const createSIPController = async (req: Request, res: Response) => {
  try {
    const result = await createSIP(req.body);

    return res.status(201).json(result);
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getSIPController = async (req: Request, res: Response) => {
  try {
    const result = await getSIP(req.params.sipId);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "SIP not found",
      });
    }

    return res.json(result);
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export const processSIPController = async (req: Request, res: Response) => {
  try {
    const result = await processSIP({
      sip_id: req.params.sipId,
      transaction_id: req.body.transaction_id,
      transaction_amount: req.body.transaction_amount,
      transaction_type: req.body.transaction_type,
      transaction_date: req.body.transaction_date,
    });

    return res.json(result);
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getTransactionsController = async (
  req: Request,
  res: Response,
) => {
  try {
    const result = await getTransactions(req.params.sipId);

    return res.json(result);
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
