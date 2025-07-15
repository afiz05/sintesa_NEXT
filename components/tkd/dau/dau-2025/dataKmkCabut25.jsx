"use client";
import React, { useState, useContext, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  Card,
  CardBody,
} from "@heroui/react";
import MyContext from "../../../../utils/Context";
import Encrypt from "../../../../utils/Random";
import { handleHttpError } from "../../../notifikasi/toastError";

// import { Loading2 } from "../../layout/LoadingTable";

export default function DataKmkCabut25(props) {
  const { axiosJWT, token, username } = useContext(MyContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    props.cek && getData();
  }, [props.cek]);

  const getData = async () => {
    setLoading(true);
    const encodedQuery = encodeURIComponent(
      `SELECT a.kmktunda,a.thangcabut,a.no_kmkcabut,a.tglcabut,a.uraiancabut FROM tkd25.ref_kmk_cabut a ORDER BY a.id DESC`
    );
    const encryptedQuery = Encrypt(encodedQuery);
    try {
      const response = await axiosJWT.get(
        import.meta.env.VITE_REACT_APP_LOCAL_INQUIRY_GETDATA_DAU25
          ? `${
              import.meta.env.VITE_REACT_APP_LOCAL_INQUIRY_GETDATA_DAU25
            }${encryptedQuery}`
          : "",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data);

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
    <Card className="mt-4">
      <CardBody>
        <div className="max-h-96 overflow-auto">
          <Table aria-label="Data KMK Cabut" isStriped>
            <TableHeader>
              <TableColumn className="text-center">No</TableColumn>
              <TableColumn className="text-center">KMK Penundaan</TableColumn>
              <TableColumn className="text-center">Tahun</TableColumn>
              <TableColumn className="text-center">Tgl</TableColumn>
              <TableColumn className="text-center">Nomor</TableColumn>
              <TableColumn className="text-center">Uraian</TableColumn>
            </TableHeader>
            <TableBody
              isLoading={loading}
              loadingContent={<Spinner label="Loading..." />}
              emptyContent="Tidak ada data"
            >
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell className="text-center">{row.kmktunda}</TableCell>
                  <TableCell className="text-center">
                    {row.thangcabut}
                  </TableCell>
                  <TableCell className="text-center">{row.tglcabut}</TableCell>
                  <TableCell className="text-center">
                    {row.no_kmkcabut}
                  </TableCell>
                  <TableCell className="text-center">
                    {row.uraiancabut}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardBody>
    </Card>
  );
}
