const db = require("../utility/dbManager");

exports.getDashboardSummary = async (req, res) => {
  try {
    // Total Investors
    const investorResult = await db.query(`
      SELECT COUNT(*) AS total_investors
      FROM investors
    `);

    // Cumulative NAV
    const navResult = await db.query(`
      SELECT SUM(nav_value) AS cumulative_nav
      FROM nav_history
    `);

    res.status(200).json({
      success: true,
      data: {
        totalInvestors: investorResult.rows[0].total_investors,

        cumulativeNAV: navResult.rows[0].cumulative_nav,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.getRecentTransactions = async (req, res) => {
  try {
    const result = await db.query(`
  SELECT
    t.transaction_id,

    i.first_name || ' ' || i.last_name
AS investor_name,

    mf.fund_name,

    t.transaction_amount,

    t.transaction_type

  FROM transactions t

  JOIN investors i
    ON t.investor_id = i.investor_id

  JOIN mutual_funds mf
    ON t.fund_id = mf.fund_id

  ORDER BY t.transaction_id DESC

  LIMIT 10
`);

    res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
