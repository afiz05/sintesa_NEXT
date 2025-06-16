import express from "express";
import { verifyTokenNEXT } from "../../middleware/VerifyTokenNEXT.js";
import { getDataDashboard } from "../../controllers/NEXT/dashboard/getDataDasboard.js";
import { getDataReferensi } from "../../controllers/NEXT/referensi/getDataReferensi.js";
import { verifyToken } from "../../middleware/VerifyToken.js";

const routerNEXT = express.Router();

routerNEXT.post("/next/dashboard", verifyTokenNEXT, getDataDashboard);
routerNEXT.post("/next/referensi", verifyToken, getDataReferensi);

// CEK STATUS BACKEND SINTESA NEXT
routerNEXT.get("/next/status", (req, res) => {
  res.status(200).json({ status: "OK" });
});
export default routerNEXT;
