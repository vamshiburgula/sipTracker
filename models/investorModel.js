const db = require("../utility/dbManager");

const insertInvestor = (data) => {
  return new Promise((resolve, reject) => {
    const query = `
            INSERT INTO investors(
                investor_id,
                first_name,
                last_name,
                email,
                phone,
                pan_number
            )
            VALUES($1,$2,$3,$4,$5,$6)
        `;

    db.query(
      query,
      [
        data.investor_id,
        data.first_name,
        data.last_name,
        data.email,
        data.phone,
        data.pan_number,
      ],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            success: true,
            message: "Investor Created",
          });
        }
      },
    );
  });
};

const fetchInvestor = async (investorId) => {
  try {
    const query = `
      SELECT *
      FROM investors
      WHERE investor_id = $1
    `;
    const result = await db.query(query, [investorId]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const fetchAllInvestors = async () => {
  try {
    const query = `

      SELECT

          investor_id
          AS investor_id,

          first_name || ' ' || last_name
          AS investor_name,

          email
          AS email,

          phone
          AS phone,

          pan_number
          AS pan_number,

          created_at
          AS created_at

      FROM investors

      ORDER BY investor_id

    `;

    const result = await db.query(query);

    return result.rows;
  } catch (error) {
    throw error;
  }
};

const fetchInvestorAnalytics = async () => {
  try {
    const query = `

      SELECT

          i.investor_id
          AS investor_id,

          i.first_name || ' ' || i.last_name
          AS investor_name,

          i.email
          AS email,

          SUM(t.transaction_amount)
          AS amount_invested,

          ROUND(
              SUM(
                  t.units_allocated * latest_nav.nav_value
              ),
              2
          )
          AS investor_holdings,

          ROUND(
              AVG(latest_nav.nav_value),
              2
          )
          AS latest_nav

      FROM investors i

      JOIN transactions t
      ON i.investor_id = t.investor_id

      JOIN (

          SELECT DISTINCT ON (fund_id)

              fund_id,

              nav_value,

              nav_date

          FROM nav_history

          ORDER BY
              fund_id,
              nav_date DESC

      ) latest_nav

      ON t.fund_id = latest_nav.fund_id

      GROUP BY

          i.investor_id,

          i.first_name,

          i.last_name,

          i.email

      ORDER BY i.investor_id

    `;

    const result = await db.query(query);

    return result.rows;
  } catch (error) {
    throw error;
  }
};

const fetchHoldings = async (investorId) => {
  try {
    const query = `
      SELECT
        mf.fund_name,
        SUM(t.units_allocated) AS total_units,
        nh.nav_value,
        SUM(t.units_allocated) * nh.nav_value AS current_value

      FROM transactions t

      JOIN mutual_funds mf
      ON t.fund_id = mf.fund_id

      JOIN nav_history nh
      ON nh.fund_id = mf.fund_id

      JOIN (
          SELECT n1.*
          FROM nav_history n1
          JOIN (
              SELECT
                fund_id,
                MAX(nav_id) AS latest_nav_id
              FROM nav_history
              GROUP BY fund_id
          ) n2
          ON n1.fund_id = n2.fund_id
          AND n1.nav_id = n2.latest_nav_id
      ) latest_nav
      ON nh.nav_id = latest_nav.nav_id

      WHERE t.investor_id = $1

      GROUP BY
        mf.fund_id,
        mf.fund_name,
        nh.nav_value
    `;

    const result = await db.query(query, [investorId]);

    return result.rows;
  } catch (err) {
    throw err;
  }
};

const calculateNetworth = async (investorId) => {
  try {
    const query = `
      SELECT
        SUM(holding_value) AS networth
      FROM (
          SELECT
              t.fund_id,
              SUM(t.units_allocated) * nh.nav_value AS holding_value

          FROM transactions t

          JOIN nav_history nh
          ON nh.fund_id = t.fund_id

          JOIN (
              SELECT
                  fund_id,
                  MAX(nav_id) AS latest_nav_id
              FROM nav_history
              GROUP BY fund_id
          ) latest_nav
          ON nh.fund_id = latest_nav.fund_id
          AND nh.nav_id = latest_nav.latest_nav_id

          WHERE t.investor_id = $1

          GROUP BY
              t.fund_id,
              nh.nav_value
      ) portfolio
    `;

    const result = await db.query(query, [investorId]);

    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

const loginUser = async (email) => {
  try {
    const query = `
      SELECT *
      FROM investors
      WHERE email = $1
    `;

    const result = await db.query(query, [email]);

    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

const logoutUser = (token) => {
  return {
    message: "Logout Successful",
  };
};

module.exports = {
  insertInvestor,
  fetchInvestor,
  fetchAllInvestors,
  fetchInvestorAnalytics,
  fetchHoldings,
  calculateNetworth,
  loginUser,
  logoutUser,
};
