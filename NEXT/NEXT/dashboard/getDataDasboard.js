import db from "../../../config/Database3.js";

import Sequelize, { Op } from "sequelize";

export const getDataDashboard = async (req, res) => {
  const query = req.body.query;

  try {
    const resultsQuery = `${query} `;

    const [results] = await Promise.all([
      db.query(resultsQuery, {
        type: Sequelize.QueryTypes.SELECT,
      }),
    ]);

    res.json({
      result: results,
    });
    // console.log(results);
  } catch (error) {
    console.error("Error in processing query:", error);
    const errorMessage = error.original
      ? error.original.sqlMessage
      : "Terjadi kesalahan dalam memproses permintaan.";
    res.status(500).json({ error: errorMessage });
  }
};
