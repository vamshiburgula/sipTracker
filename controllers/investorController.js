const {
  loginUser,
  insertInvestor,
  fetchInvestor,
  fetchHoldings,
  calculateNetworth,
  fetchAllInvestors,
  fetchInvestorAnalytics,
} = require("../models/investorModel.js");

const { signJWT } = require("../utility/AuthManager.js");

const invalidTokens = [];

const createInvestor = async (req, res) => {
  try {
    const result = await insertInvestor(req.body);

    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const getInvestor = async (req, res) => {
  try {
    const result = await fetchInvestor(req.params.investorId);

    if (!result) {
      return res.status(404).send("Investor not found");
    }

    return res.json(result);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const getAllInvestors = async (req, res) => {
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

const getInvestorAnalytics = async (req, res) => {
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

const getInvestorHoldings = async (req, res) => {
  try {
    const result = await fetchHoldings(req.params.investorId);

    return res.json(result);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const getInvestorNetworth = async (req, res) => {
  try {
    const result = await calculateNetworth(req.params.investorId);

    return res.json(result);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const login = async (req, res) => {
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
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const logout = async (req, res) => {
  try {
    const token = req.headers.authorization;

    invalidTokens.push(token);

    return res.json({
      message: "Logout Successful",
    });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = {
  createInvestor,
  getInvestor,
  getAllInvestors,
  getInvestorAnalytics,
  getInvestorHoldings,
  getInvestorNetworth,
  login,
  logout,
  invalidTokens,
};
