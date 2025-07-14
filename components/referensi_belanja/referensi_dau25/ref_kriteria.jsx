import React, { useState, useContext, useEffect } from "react";
import MyContext from "../../../utils/Context";
import Encrypt from "../../../utils/Encrypt";
import { handleHttpError } from "../../notifikasi/toastError";
// import { Button, Container, Spinner, Form } from "react-bootstrap";

const Kdkriteria25 = (props) => {
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
      `SELECT id,id_kriteria,nm_kriteria FROM tkd25.ref_kmk_dau_kriteria`
    );

    const cleanedQuery = decodeURIComponent(encodedQuery)
      .replace(/\n/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    // console.log(cleanedQuery);
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
      const { status, data } = error.response || {};
      handleHttpError(
        status,
        (data && data.error) ||
          "Terjadi Permasalahan Koneksi atau Server Backend"
      );
      setLoading(false);
    }
  };
  return (
    <select
      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white"
      value={props.kriteria}
      name={props.name}
      onChange={(e) => props.onChange(e.target.value)}
    >
      <option value="">-- Pilih Kriteria KMK --</option>
      {data
        .filter((item) => item.id === props.kmk)
        .map((dau, index) => (
          <option key={index} value={dau.id_kriteria}>
            {dau.nm_kriteria}
          </option>
        ))}
    </select>
  );
};

export default Kdkriteria25;
