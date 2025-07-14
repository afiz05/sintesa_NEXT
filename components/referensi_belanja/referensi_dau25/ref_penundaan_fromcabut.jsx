import React, { useState, useContext, useEffect } from "react";
import { Select, SelectItem } from "@heroui/react";
import MyContext from "../../../utils/Context";
import Encrypt from "../../../utils/Encrypt";
import { handleHttpError } from "../../notifikasi/toastError";

const RefPenundaanCabut25 = (props) => {
  const { axiosJWT, token, username, role, kdkanwil } = useContext(MyContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [sql, setSql] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async (props) => {
    setLoading(true);
    let filterKanwil = "";

    const encodedQuery = encodeURIComponent(
      `SELECT DISTINCT(no_kmk) no_kmk,jenis,kriteria,uraian FROM tkd25.ref_kmk_dau where jenis='2'`
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
    <Select
      placeholder="-- Pilih KMK --"
      selectedKeys={props.refPenundaan ? [props.refPenundaan] : []}
      onSelectionChange={(keys) => {
        const selectedValue = Array.from(keys)[0] || "";
        props.onChange(selectedValue);
      }}
      variant="bordered"
      className="w-full"
    >
      {data.map((dau, index) => (
        <SelectItem key={dau.no_kmk} value={dau.no_kmk}>
          {dau.no_kmk}
        </SelectItem>
      ))}
    </Select>
  );
};

export default RefPenundaanCabut25;
