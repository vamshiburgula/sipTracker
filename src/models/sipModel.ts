import db from "../utility/dbManager";

export const createSIP = async (data: any) => {
  try {
    const query = `
      INSERT INTO sips(
        sip_id,
        investor_id,
        fund_id,
        sip_amount,
        sip_day,
        start_date,
        status
      )
      VALUES($1,$2,$3,$4,$5,$6,$7)
    `;

    const values = [
      data.sip_id,
      data.investor_id,
      data.fund_id,
      data.sip_amount,
      data.sip_day,
      data.start_date,
      data.status,
    ];

    await db.query(query, values);

    return {
      success: true,
      message: "SIP Created",
    };
  } catch (err) {
    throw err;
  }
};

export const getSIP = async (sipId: any) => {
  try {
    const query = `
      SELECT *
      FROM sips
      WHERE sip_id = $1
    `;

    const result = await db.query(query, [sipId]);

    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

export const processSIP = async (data: any) => {
  const client = await db.connect();

  try {
    await client.query("BEGIN");

    const sipQuery = `
      SELECT *
      FROM sips
      WHERE sip_id = $1
    `;

    const sipResult = await client.query(sipQuery, [data.sip_id]);

    if (sipResult.rows.length === 0) {
      throw new Error("SIP not found");
    }

    const sip = sipResult.rows[0];

    if (sip.status !== "ACTIVE") {
      throw new Error("Inactive SIP cannot be processed");
    }

    const navQuery = `
      SELECT nav_value
      FROM nav_history
      WHERE fund_id = $1
      ORDER BY nav_date DESC, nav_id DESC
      LIMIT 1
    `;

    const navResult = await client.query(navQuery, [sip.fund_id]);

    if (navResult.rows.length === 0) {
      throw new Error("NAV not found");
    }

    const nav = Number(navResult.rows[0].nav_value);

    const units = Number((data.transaction_amount / nav).toFixed(6));

    const insertQuery = `
      INSERT INTO transactions(
        transaction_id,
        sip_id,
        investor_id,
        fund_id,
        transaction_type,
        transaction_amount,
        nav_used,
        units_allocated,
        transaction_date
      )
      VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)
    `;

    await client.query(insertQuery, [
      data.transaction_id,
      sip.sip_id,
      sip.investor_id,
      sip.fund_id,
      data.transaction_type,
      data.transaction_amount,
      nav,
      units,
      data.transaction_date,
    ]);

    await client.query("COMMIT");

    return {
      success: true,
      message: "SIP processed successfully",
      nav_used: nav,
      units_allocated: units,
    };
  } catch (err: any) {
    await client.query("ROLLBACK");

    if (err.code === "23505") {
      throw new Error("SIP already processed for this date");
    }

    throw err;
  } finally {
    client.release();
  }
};

export const getTransactions = async (sipId: any) => {
  try {
    const query = `
      SELECT *
      FROM transactions
      WHERE sip_id = $1
    `;

    const result = await db.query(query, [sipId]);

    return result.rows;
  } catch (err) {
    throw err;
  }
};
