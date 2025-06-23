import React, { useContext, useEffect, useState } from "react";

import * as XLSX from "xlsx";
import { handleHttpError } from "../notifikasi/toastError";
import MyContext from "../../utils/Context";

const GenerateExcel = (props) => {
  const { axiosJWT, token, loadingExcell, setloadingExcell } =
    useContext(MyContext);
  const [data, setData] = useState([]);
  const [exportedDataCount, setExportedDataCount] = useState(0);

  useEffect(() => {
    if (props.query3) {
      fetchData();
    }
  }, [props.query3]);

  useEffect(() => {
    if (data.length > 0) {
      exportToExcel();
    }
  }, [data]);

  const fetchData = async () => {
    setloadingExcell(true);

    try {
      const encodedQuery = encodeURIComponent(props.query3.toUpperCase());

      const response = await axiosJWT.get(
        process.env.NEXT_PUBLIC_LOCAL_INQUIRY
          ? `${process.env.NEXT_PUBLIC_LOCAL_INQUIRY_CSV}${encodedQuery}`
          : "",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const responseData = response.data;

      setData(responseData);
      setExportedDataCount(responseData.length);
      responseData.length === 0 && setloadingExcell(false);
      responseData.length === 0 && props.onDataFetchComplete(exportedDataCount);
    } catch (error) {
      const { status, data } = error.response || {};
      handleHttpError(
        status,
        (data && data.error) ||
          "Terjadi Permasalahan Koneksi atau Server Backend"
      );

      setloadingExcell(false);
    }
  };

  const exportToExcel = () => {
    // Function to convert numeric values to raw format with number formatting
    const convertNumericToRaw = (cell, column) => {
      const format =
        column === "PAGU" || column === "BLOKIR" ? "#,##0" : "General";
      return {
        t: "n",
        v: Number(cell), // Convert to number if it's not already
        z: format,
      };
    };

    // Convert numeric values to raw format with number formatting in the data
    const rawData = data.map((row) => {
      const newRow = {};
      for (const key in row) {
        if (typeof row[key] === "number") {
          newRow[key] = convertNumericToRaw(row[key], key);
        } else {
          newRow[key] = row[key];
        }
      }
      return newRow;
    });

    const ws = XLSX.utils.json_to_sheet(rawData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "v3_sintesa_pdpsipa");
    XLSX.writeFile(wb, props.namafile);
    props.onDataFetchComplete(exportedDataCount);
  };
};

export default GenerateExcel;
