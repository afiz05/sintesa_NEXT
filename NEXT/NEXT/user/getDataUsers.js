import db from "../../../config/Database3.js";

import Sequelize, { Op } from "sequelize";
import { decryptData } from "../../../middleware/Decrypt.js";

export const getDataUsers = async (req, res) => {
  const query = req.body.query;
  const decryptedData = decryptData(query).replace(/"/g, "");

  try {
    const resultsQuery = `${decryptedData} `;

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
