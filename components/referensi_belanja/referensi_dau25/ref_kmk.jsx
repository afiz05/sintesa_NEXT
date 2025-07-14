import React, { useState, useContext, useEffect } from "react";
import MyContext from "../../../utils/Context";
import Encrypt from "../../../utils/Encrypt";
import { handleHttpError } from "../../notifikasi/toastError";
// import { Button, Container, Spinner, Form } from "react-bootstrap";

const Kdkmk25 = (props) => {
  const { axiosJWT, token, username, role, kdkanwil } = useContext(MyContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [sql, setSql] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    let filterKanwil = "";
    if (role === "2") {
      filterKanwil =
        props.where +
        (props.where ? " AND " : "") +
        `a.kdkanwil = '${kdkanwil}'`;
    } else {
      filterKanwil = props.where;
    }

    const encodedQuery = encodeURIComponent(
      `SELECT jenis,nmjenis FROM tkd25.ref_kmk`
    );

    const cleanedQuery = decodeURIComponent(encodedQuery)
      .replace(/\n/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    setSql(cleanedQuery);
    const encryptedQuery = Encrypt(cleanedQuery);
    try {
      const response = await axiosJWT.get(
        process.env.NEXT_PUBLIC_TKD_REFERENSI_TKD_25
          ? `${process.env.NEXT_PUBLIC_TKD_REFERENSI_TKD_25}${encryptedQuery}`
          : "",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data.result);

      setLoading(false);
    } catch (error) {
      // console.log(error);

      const { status, data } = error.response || {};
      handleHttpError(
        status,
        (data && data.error) ||
          "Terjadi Permasalahan Koneksi atau Server Backend"
      );
      setLoading(false);
    }
  };

  // Return data for parent component to use
  if (props.returnData) {
    return { data, loading };
  }

  return (
    <select
      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white"
      name={props.name}
      onChange={(e) => props.onChange(e.target.value)} // Pass the selected value to props.onChange
    >
      <option value="">-- Pilih Jenis KMK --</option>
      {data.map((dau, index) => (
        <option key={index} value={dau.jenis}>
          {dau.jenis} - {dau.nmjenis}
        </option>
      ))}
    </select>
  );
};

export default Kdkmk25;
