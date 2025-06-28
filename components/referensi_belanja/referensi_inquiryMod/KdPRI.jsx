"use client";
import React, { useState, useContext, useEffect } from "react";
import MyContext from "@/utils/Context";
import Encrypt from "@/utils/Encrypt";
import { handleHttpError } from "@/utils/handleError";
import { Select, SelectItem } from "@heroui/react";

const KodePRI = (props) => {
  const { axiosJWT, token } = useContext(MyContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, [props.kdPN, props.kdPP, props.KegPP]);
  //console.log(props.kdPN, props.kdPP, props.KegPP);
  const getData = async () => {
    setLoading(true);
    const encodedQuery = encodeURIComponent(
      `select * from dbref.t_priproy_${props.thang}`
    );
    const encryptedQuery = Encrypt(encodedQuery);
    try {
      const response = await axiosJWT.get(
        process.env.NEXT_PUBLIC_LOCAL_INQUIRY_GETDATA
          ? `${process.env.NEXT_PUBLIC_LOCAL_INQUIRY_GETDATA}${encryptedQuery}`
          : "",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data.filter((item) => item.kdpn === props.kdPN));
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
  // console.log(data);
  // Ensure we have a valid selectedKeys Set
  const selectedKeys =
    props.kdproy && props.kdproy !== "" && props.kdproy !== "XX"
      ? [props.kdproy]
      : ["00"];

  return loading ? (
    <>Loading ...</>
  ) : (
    <>
      <Select
        selectedKeys={new Set(selectedKeys)}
        onSelectionChange={(keys) => {
          const value = Array.from(keys)[0];
          props.onChange(value);
        }}
        className="form-select form-select-sm text-select"
        aria-label=".form-select-sm"
        disallowEmptySelection={false}
        placeholder="Pilih Proyek Prioritas"
        size="sm"
      >
        <SelectItem key="00" value="00" textValue="Semua Proyek Prioritas">
          Semua Proyek Prioritas
        </SelectItem>
        {data
          .filter((item) => item.kdpp === props.kdPP)
          .filter((item) => item.kdkp === props.KegPP)
          .map((item) => (
            <SelectItem
              key={item.kdproy}
              value={item.kdproy}
              textValue={`${item.kdproy} - ${item.nmpriproy}`}
            >
              {item.kdproy} - {item.nmpriproy}
            </SelectItem>
          ))}
      </Select>
    </>
  );
};

export default KodePRI;
