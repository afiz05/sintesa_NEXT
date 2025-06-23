import React, { useState, useEffect, useContext } from "react";
import * as XLSX from "xlsx";
// import Encrypt from "../../utils/Encrypt";

import { handleHttpError } from "../notifikasi/toastError";
// import { Button, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
// // import { useNavigate, Link } from "react-router-dom";
import "./style.css";
import MyContext from "../../utils/Context";
import Encrypt from "../../utils/Encrypt";

const ConvertToExcel = ({ sql }) => {
  const { axiosJWT, username, token, telp, name, verified } =
    useContext(MyContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [alertContent, setAlertContent] = useState(null);
  const [isSent, setIsSent] = useState(false);
  // // const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const isButtonDisabled =
    loading || isSent || !data || data.length === 0 || verified !== "TRUE";

  const handleButtonClick = () => {
    if (!isButtonDisabled) {
      generateExcel();
    }
  };

  const getData = async () => {
    setLoading(true);
    const cleanedQuery = decodeURIComponent(sql)
      .replace(/\n/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    const encryptedQuery = Encrypt(cleanedQuery);

    try {
      const response = await axiosJWT.get(
        `${process.env.NEXT_PUBLIC_LOCAL_DATAKINERJA}${encryptedQuery}&user=${username}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const dataResult = response.data.result;

      if (dataResult.length === 0) {
        setMessage("Data tidak ditemukan.");
      } else if (dataResult.length > 1000) {
        setMessage("Data terlalu besar. Maksimal 1000 baris.");
      } else {
        setData(dataResult);
      }
    } catch (error) {
      handleHttpError(
        error.response?.status,
        error.response?.data?.error || "Koneksi atau server bermasalah"
      );
    } finally {
      setLoading(false);
    }
  };

  const generateExcel = async () => {
    setLoading(true);

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Data Inquiry");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const excelBlob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    function generateToken() {
      return Math.floor(Date.now() / 1000); // Get current time in seconds
    }
    try {
      const token = generateToken();
      const formData = new FormData();
      formData.append("file", excelBlob, "inquiry_data_excel_v3.xlsx");
      formData.append("message", `SEND_WA_INQUIRY`);
      formData.append("detailuser", `username : ${username} (${name})`);
      formData.append("to", `62${telp.slice(1)}@c.us`);
      formData.append("nama", name);

      await axios.post(`${process.env.NEXT_PUBLIC_LOCAL_AKTIVASI}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage("File Excel berhasil dikirim ke WhatsApp nomor " + telp);
      setIsSent(true);
    } catch (error) {
      setMessage(
        `Gagal mengirim pesan WhatsApp ke nomor ${telp} \n [detail error] ${error.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* <Button
        variant="success"
        size="sm"
        onClick={handleButtonClick}
        disabled={isButtonDisabled}
        className={`btn-loading text-center  w-50 ${
          isButtonDisabled ? "disabled" : ""
        }`}
      >
        {loading ? <Spinner animation="border" size="sm" /> : "Kirim"}
      </Button> */}
      <button
        type="button"
        onClick={handleButtonClick}
        disabled={isButtonDisabled}
        className={`inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 w-1/2 justify-center ${
          isButtonDisabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700 focus:ring-green-500"
        }`}
      >
        {loading ? (
          <svg
            className="animate-spin h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            ></path>
          </svg>
        ) : (
          "Kirim"
        )}
      </button>

      {message && (
        // <Alert
        //   className="my-3 p-2"
        //   variant={message.startsWith("Gagal") ? "danger" : "success"}
        // >
        //   {message}
        // </Alert>
        <div
          className={`my-3 p-2 rounded-md ${
            message.startsWith("Gagal")
              ? "bg-red-100 border border-red-400 text-red-700"
              : "bg-green-100 border border-green-400 text-green-700"
          }`}
        >
          {message}
        </div>
      )}

      {alertContent && (
        // <Alert className="my-3 p-2" variant="warning">
        //   {alertContent}
        // </Alert>
        <div className="my-3 p-2 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-md">
          {alertContent}
        </div>
      )}
    </div>
  );
};

export { ConvertToExcel };
