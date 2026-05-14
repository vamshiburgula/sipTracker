import { Request, Response } from "express";
import {
  loginUser,
  insertInvestor,
  fetchInvestor,
  fetchAllInvestors,
  fetchHoldings,
  calculateNetworth,
  fetchInvestorAnalytics,
} from "../models/investorModel";

import { signJWT } from "../utility/AuthManager";

export const invalidTokens: string | undefined | any = [];

export const createInvestor = async (req: Request, res: Response) => {
  try {
    const result = await insertInvestor(req.body);

    return res.status(201).json(result);
  } catch (err: any) {
    return res.status(500).send(err.message);
  }
};

export const getInvestor = async (
  req: Request<{ investorId: string }>,
  res: Response,
) => {
  try {
    const result = await fetchInvestor(req.params.investorId.toString());

    if (!result) {
      return res.status(404).send("Investor not found");
    }

    return res.json(result);
  } catch (err: any) {
    return res.status(500).send(err.message);
  }
};

export const getAllInvestors = async (req: Request, res: Response) => {
  try {
    const investors = await fetchAllInvestors();
    res.status(200).json({
      success: true,
      data: investors,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getInvestorAnalytics = async (req: Request, res: Response) => {
  try {
    const analytics = await fetchInvestorAnalytics();

    res.status(200).json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getInvestorHoldings = async (
  req: Request<{ investorId: string }>,
  res: Response,
) => {
  try {
    const result = await fetchHoldings(req.params.investorId);

    return res.json(result);
  } catch (err: any) {
    return res.status(500).send(err.message);
  }
};

export const getInvestorNetworth = async (
  req: Request<{ investorId: string }>,
  res: Response,
) => {
  try {
    const result = await calculateNetworth(req.params.investorId);

    return res.json(result);
  } catch (err: any) {
    return res.status(500).send(err.message);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const investor = await loginUser(email);

    if (!investor) {
      return res.status(404).json({
        success: false,
        message: "Investor not found",
      });
    }

    const token = signJWT({
      investor_id: investor.investor_id,
      email: investor.email,
      role: "investor",
    });

    return res.json({
      success: true,
      message: "Login Successful",
      token: token,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export const logout = async (req: Request, res: Response) => {
  try {
    const token: string | undefined = req.headers.authorization;

    invalidTokens.push(token);

    return res.json({
      message: "Logout Successful",
    });
  } catch (err: any) {
    return res.status(500).send(err.message);
  }
};
