"use client";
import React, { useState, useEffect, useContext } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Card,
  CardBody,
  Tooltip,
  Spinner,
  Button,
  Chip,
} from "@heroui/react";
import {
  Download,
  Trash2,
  Calendar,
  Building,
  FileText,
  Clock,
  Hash,
  Settings,
} from "lucide-react";

import MyContext from "../../../utils/Context";
import { handleHttpError } from "../../notifikasi/toastError";

import moment from "moment";
import Encrypt from "../../../utils/Random";
import Swal from "sweetalert2";
import Notifikasi from "../../notifikasi/notif";

const MonevKanwil = ({ cekMonev }) => {
  const { axiosJWT, token, kdkanwil, role, username } = useContext(MyContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sql, setSql] = useState("");

  useEffect(() => {
    cekMonev && getData();
  }, [cekMonev]);

  const getData = async () => {
    setLoading(true);
    let filterKanwil = "";
    if (role === "2") {
      filterKanwil = `and a.kdkanwil = '${kdkanwil}' and a.kdkanwil<>'00'`;
    } else {
      filterKanwil = "and a.kdkanwil<>'00'";
    }
    const encodedQuery = encodeURIComponent(
      `SELECT
      a.id,
      a.kdkanwil,
      b.nmkanwil,
      c.nmjenis,
      d.kdperiode,
    
      d.nmperiode,
      a.waktu,
      a.fileasli,
      a.nilai,
    
      a.catatan,
      a.file,
      a.tahun
      FROM
      tkd.upload_data_kanwil a
      LEFT JOIN
      dbref.t_kanwil_2024 b ON a.kdkanwil = b.kdkanwil
      LEFT JOIN
      tkd.ref_jenis_laporan c ON a.jenis = c.kdjenis
     LEFT JOIN
      tkd.ref_periode_kanwil d ON a.periode = d.kdperiode
      
      WHERE a.jenis='02' ${filterKanwil}
      GROUP BY
      a.kdkanwil,
      
      a.waktu
      ORDER BY
      a.waktu DESC
      `
    );

    const cleanedQuery = decodeURIComponent(encodedQuery)
      .replace(/\n/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    setSql(cleanedQuery);
    const encryptedQuery = Encrypt(cleanedQuery);
    try {
      const response = await axiosJWT.get(
        import.meta.env.VITE_REACT_APP_LOCAL_TKD_REFERENSI_TKD
          ? `${
              import.meta.env.VITE_REACT_APP_LOCAL_TKD_REFERENSI_TKD
            }${encryptedQuery}&user=${username}`
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
      console.log(error);
      setLoading(false);
    }
  };
  const handleHapusdata = async (id) => {
    const confirmText = "Anda yakin ingin menghapus data ini ?";
    //console.log(id);
    Swal.fire({
      title: "Konfirmasi Hapus",
      html: confirmText,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
      position: "top",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosJWT.delete(
            `${
              import.meta.env.VITE_REACT_APP_LOCAL_INQUIRY_UPLOADKANWIL
            }/delete/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          Notifikasi("Data telah dihapus.");
          getData();
        } catch (error) {
          const { status, data } = error.response || {};
          handleHttpError(
            status,
            (data && data.error) ||
              "Terjadi Permasalahan Koneksi atau Server Backend"
          );
        }
      }
    });
  };

  return (
    <div className="w-full space-y-4">
      {/* Header Section */}
      <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Building size={16} />
          <span>Data Laporan Monev Kanwil</span>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="flex flex-col items-center gap-3">
            <Spinner size="lg" color="secondary" />
            <span className="text-sm text-gray-600">Loading data...</span>
          </div>
        </div>
      ) : (
        <Card className="w-full">
          <CardBody className="p-0">
            <Table
              aria-label="Monev Kanwil Table"
              className="min-w-full"
              // removeWrapper
            >
              <TableHeader>
                <TableColumn className="text-center bg-secondary text-white">
                  <div className="flex items-center justify-center gap-1">
                    <Hash size={14} />
                    <span className="text-xs font-medium">No</span>
                  </div>
                </TableColumn>
                <TableColumn className="text-center bg-secondary text-white">
                  <div className="flex items-center justify-center gap-1">
                    <Calendar size={14} />
                    <span className="text-xs font-medium">Tahun</span>
                  </div>
                </TableColumn>
                <TableColumn className="text-center bg-secondary text-white">
                  <div className="flex items-center justify-center gap-1">
                    <Building size={14} />
                    <span className="text-xs font-medium">KANWIL</span>
                  </div>
                </TableColumn>
                <TableColumn className="text-center bg-secondary text-white">
                  <div className="flex items-center justify-center gap-1">
                    <FileText size={14} />
                    <span className="text-xs font-medium">Jenis Laporan</span>
                  </div>
                </TableColumn>
                <TableColumn className="text-center bg-secondary text-white">
                  <div className="flex items-center justify-center gap-1">
                    <Clock size={14} />
                    <span className="text-xs font-medium">Periode</span>
                  </div>
                </TableColumn>
                <TableColumn className="text-center bg-secondary text-white">
                  <div className="flex items-center justify-center gap-1">
                    <Clock size={14} />
                    <span className="text-xs font-medium">Uploaded</span>
                  </div>
                </TableColumn>
                <TableColumn className="text-center bg-secondary text-white">
                  <div className="flex items-center justify-center gap-1">
                    <Settings size={14} />
                    <span className="text-xs font-medium">Opsi</span>
                  </div>
                </TableColumn>
              </TableHeader>

              <TableBody>
                {data.map((row, index) => (
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell className="text-center">
                      <Chip size="sm" variant="flat" color="default">
                        {index + 1}
                      </Chip>
                    </TableCell>
                    <TableCell className="text-center font-medium">
                      {row.tahun}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">
                          {row.nmkanwil}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Chip size="sm" variant="flat" color="secondary">
                        {row.nmjenis}
                      </Chip>
                    </TableCell>
                    <TableCell className="text-center">
                      <Chip size="sm" variant="flat" color="warning">
                        {row.nmperiode}
                      </Chip>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="text-sm text-gray-600">
                        {moment(row.waktu).format("DD-MM-YYYY")}
                        <div className="text-xs text-gray-400">
                          {moment(row.waktu).format("HH:mm:ss")}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center items-center gap-1">
                        <Tooltip content="Download File" placement="top">
                          <Button
                            size="sm"
                            variant="flat"
                            color="secondary"
                            isIconOnly
                            as="a"
                            href={row.file}
                            download
                          >
                            <Download size={14} />
                          </Button>
                        </Tooltip>
                        <Tooltip content="Hapus Data" placement="top">
                          <Button
                            size="sm"
                            variant="flat"
                            color="danger"
                            isIconOnly
                            onPress={() => handleHapusdata(row.id)}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default MonevKanwil;
