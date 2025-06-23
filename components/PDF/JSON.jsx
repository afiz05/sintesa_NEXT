import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Encrypt from "../../utils/Encrypt";
import { handleHttpError } from "../notifikasi/toastError";
// import { Button, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
import MyContext from "../../utils/Context";

const ConvertToJSON = ({ sql }) => {
  const { axiosJWT, username, token, telp, name, verified } =
    useContext(MyContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [alertContent, setAlertContent] = useState(null); // For JSX content
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const isButtonDisabled =
    loading ||
    isSent ||
    !data ||
    data.length === 0 ||
    verified === "FALSE" ||
    verified === "";

  const handleButtonClick = () => {
    if (!isButtonDisabled) {
      generateJSON();
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
        process.env.NEXT_PUBLIC_LOCAL_DATAKINERJA
          ? `${process.env.NEXT_PUBLIC_LOCAL_DATAKINERJA}${encryptedQuery}&user=${username}`
          : "",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const dataResult = response.data.result;

      if (dataResult.length === 0 && verified === "TRUE") {
        setMessage("Data tidak ditemukan.");
        setLoading(false);
      } else if (dataResult.length > 300000) {
        setMessage("Data terlalu besar. Maksimal 300.000 baris.");
        setLoading(false);
        return;
      }

      if (verified === "FALSE" || verified === "") {
        setAlertContent(
          <>
            Sintesa v3 tidak bisa mengirimkan data saat akun anda belum
            dilakukan aktifasi, tambahkan nomor telepon yang terhubung dengan
            WhatsApp di <Link href="/v3/profile/user">sini</Link>.<br /> Apabila
            terjadi kendala saat verifikasi akun silahkan mengunjungi pusat
            bantuan kami di <Link href="/v3/about/feedback">sini.</Link>
          </>
        );
        setLoading(false);
      }

      setData(dataResult);
      setLoading(false);
    } catch (error) {
      const { status, data } = error.response || {};
      handleHttpError(
        status,
        (data && data.error) ||
          "Terjadi Permasalahan Koneksi atau Server Backend"
      );
      setLoading(false);
    }
  };

  const generateJSON = async () => {
    setLoading(true);
    function generateToken() {
      return Math.floor(Date.now() / 1000); // Get current time in seconds
    }
    const token = generateToken();
    // Mengonversi data ke format JSON
    const jsonData = JSON.stringify(data, null, 2);

    // Membuat Blob dari string JSON
    const jsonBlob = new Blob([jsonData], {
      type: "application/json",
    });

    try {
      const formData = new FormData();
      formData.append("file", jsonBlob, "inquiry_data_json_v3.json");
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
      setMessage("File JSON berhasil dikirim ke WhatsApp nomor " + telp);
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
        variant="primary"
        size="sm"
        onClick={handleButtonClick}
        disabled={isButtonDisabled}
        className={`btn-loading text-center  w-50 ${
          isButtonDisabled ? "disabled" : ""
        }`}
      >
        {loading ? (
          <>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              className="mr-2 mx-2"
            />
            Loading...
          </>
        ) : (
          "Kirim"
        )}
      </Button> */}
      <button
        type="button"
        onClick={handleButtonClick}
        disabled={isButtonDisabled}
        className={`inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 w-1/2 justify-center ${
          isButtonDisabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
        }`}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-4 w-4 text-white mr-2"
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
            Loading...
          </>
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

export default ConvertToJSON;
