import db from "../utility/dbManager";

export const insertFund = async (data: any) => {
  try {
    const query = `
            INSERT INTO mutual_funds(
                fund_id,
                amc_id,
                fund_name,
                fund_code,
                category
            )
            VALUES($1,$2,$3,$4,$5)
        `;

    const values = [
      data.fund_id,
      data.amc_id,
      data.fund_name,
      data.fund_code,
      data.category,
    ];

    await db.query(query, values);

    return {
      success: true,
      message: "Fund Created",
    };
  } catch (err: any) {
    throw err;
  }
};

export const fetchFunds = async () => {
  try {
    const query = `
            SELECT *
            FROM mutual_funds
        `;

    const result = await db.query(query);

    return result.rows;
  } catch (err) {
    throw err;
  }
};

export const updateFundNAV = async (data: any) => {
  try {
    const query = `
            INSERT INTO nav_history(
                nav_id,
                fund_id,
                nav_value,
                nav_date
            )
            VALUES($1,$2,$3,$4)
        `;

    const values = [data.nav_id, data.fund_id, data.nav_value, data.nav_date];

    await db.query(query, values);

    return {
      success: true,
      message: "NAV Updated",
    };
  } catch (err: any) {
    throw err;
  }
};
