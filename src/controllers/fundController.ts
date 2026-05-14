import { Request, Response } from "express";

import { insertFund, fetchFunds, updateFundNAV } from "../models/fundModel";

export const createFund = async (req: Request, res: Response) => {
  try {
    const result = await insertFund(req.body);

    return res.status(201).json(result);
  } catch (err: any) {
    return res.status(500).send(err.message);
  }
};

export const getFunds = async (req: Request, res: Response) => {
  try {
    const result = await fetchFunds();

    return res.json(result);
  } catch (err: any) {
    return res.status(500).send(err.message);
  }
};

export const updateNAV = async (req: Request, res: Response) => {
  try {
    const result = await updateFundNAV({
      nav_id: req.body.nav_id,
      fund_id: req.params.fundId,
      nav_value: req.body.nav_value,
      nav_date: req.body.nav_date,
    });

    return res.json(result);
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
