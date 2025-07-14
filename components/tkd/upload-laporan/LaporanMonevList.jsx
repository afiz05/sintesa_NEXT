"use client";

import React, { useState, useContext, useEffect } from "react";
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
  Select,
  SelectItem,
  Button,
  Chip,
} from "@heroui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import moment from "moment";
import numeral from "numeral";
import {
  Download,
  Trash2,
  Calendar,
  Building,
  FileText,
  Clock,
  Hash,
  Settings,
  BarChart3,
} from "lucide-react";

import MyContext from "../../../utils/Context";
import Encrypt from "../../../utils/Random";
import { handleHttpError } from "../../notifikasi/toastError";
// import { get } from "lodash";
import DownloadModal from "./DownloadModal";
import Swal from "sweetalert2";
import Notifikasi from "../../notifikasi/notif";

export default function LaporanMonevList() {
  const LIMIT = 20;
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedPeriode, setSelectedPeriode] = useState("0201");

  const periodeOptions = [
    { value: "semua", label: "Semua Periode" },
    { value: "0201", label: "Triwulan I" },
    { value: "0202", label: "Triwulan II" },
    { value: "0203", label: "Triwulan III" },
    { value: "0204", label: "Triwulan IV" },
  ];

  const { axiosJWT, token, kdlokasi, role, kdkanwil, kdkppn } =
    useContext(MyContext);

  const fetchData = async (currentOffset = offset, resetData = false) => {
    let filterKppn = "";
    if (role === "3" && kdkppn) {
      filterKppn = `and a.kdkppn = '${kdkppn}'`;
    }

    let filterPeriode = "";
    if (selectedPeriode !== "semua") {
      filterPeriode = `and a.periode='${selectedPeriode}'`;
    }

    const rawQuery = `SELECT a.id, a.kdkppn, b.nmkppn, a.periode, a.periode, c.nmjenis,
a.waktu, a.fileasli, a.nilai,a.catatan, a.file, a.tahun, e.nmsubperiode 
FROM tkd.upload_data_kppn a 
INNER JOIN dbref.t_kppn_2023 b ON a.kdkppn = b.kdkppn 
INNER JOIN tkd.ref_jenis_laporan c ON a.jenis = c.kdjenis
INNER JOIN tkd.ref_subperiode_kppn e on a.jenis = e.jenis and a.periode=e.subkdperiode
WHERE a.jenis = '02' 
     ${filterPeriode}
        ${filterKppn}
      ORDER BY
        a.waktu DESC
      LIMIT 20 OFFSET ${currentOffset}`;

    try {
      setLoading(true);
      const cleanedQuery = rawQuery.replace(/\s+/g, " ").trim();
      const encryptedQuery = Encrypt(cleanedQuery);
      const response = await axiosJWT.get(
        `${
          import.meta.env.VITE_REACT_APP_LOCAL_SPENDING_ALOKASI
        }${encryptedQuery}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (resetData) {
        setData(response.data.result);
        setOffset(20);
      } else {
        setData((prevData) => [...prevData, ...response.data.result]);
        setOffset((prevOffset) => prevOffset + 20);
      }

      setHasMoreData(response.data.result.length >= 20);
    } catch (error) {
      console.error(error);
      handleHttpError(
        error.response?.status,
        error.response?.data?.error || "Terjadi kesalahan saat memuat data."
      );
      setHasMoreData(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setData([]);
    setOffset(0);
    setHasMoreData(true);
    fetchData(0, true);
  }, [selectedPeriode]);

  const handlePeriodeChange = (value) => {
    setSelectedPeriode(value);
  };

  const handleShowDownloadModal = (row) => {
    setSelectedFile(row);
    setShowDownloadModal(true);
  };

  const handleCloseDownloadModal = () => {
    setShowDownloadModal(false);
    setSelectedFile(null);
  };

  const handleHapusdata = async (id) => {
    Swal.fire({
      title: "Konfirmasi Hapus",
      html: "Anda yakin ingin menghapus data ini ?",
      icon: "warning",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
      position: "top",
      buttonsStyling: true,
      customClass: {
        confirmButton: "btn btn-primary btn-sm",
        cancelButton: "btn btn-secondary btn-sm",
      },
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosJWT.delete(
            `${
              import.meta.env.VITE_REACT_APP_LOCAL_INQUIRY_UPLOADKPPN
            }/delete/${id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          fetchData(0, true);
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

  const handleDownloadFile = async (fileId, fileName) => {
    try {
      const response = await axiosJWT.get(
        `${
          import.meta.env.VITE_REACT_APP_LOCAL_DOWNLOAD_API
        }download/${fileId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName || "download";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      const { status, data } = error.response || {};
      if (status === 404) {
        Notifikasi("File tidak ditemukan di server.", "error");
      } else {
        handleHttpError(
          status,
          (data && data.error) || "Gagal mendownload file"
        );
      }
    }
  };

  const getFileInfo = async (fileId) => {
    try {
      const response = await axiosJWT.get(
        `${
          import.meta.env.VITE_REACT_APP_LOCAL_DOWNLOAD_API
        }file-info/${fileId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error getting file info:", error);
      return null;
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Filter Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border">
        <div className="flex items-center gap-3">
          {loading && <Spinner size="sm" color="success" />}
          <div className="flex items-center gap-2">
            <BarChart3 size={18} className="text-success" />
            <span className="text-sm font-medium text-gray-700">
              Filter Periode:
            </span>
          </div>
          <Select
            value={selectedPeriode}
            onChange={(value) => setSelectedPeriode(value)}
            className="w-60"
            size="sm"
            isDisabled={loading}
            placeholder="Pilih Periode"
          >
            {periodeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <BarChart3 size={16} />
          <span>
            Total:{" "}
            <span className="font-semibold text-success">{data.length}</span>{" "}
            data
          </span>
        </div>
      </div>

      {/* Table Card */}
      <Card className="w-full">
        <CardBody className="p-0">
          <div id="scrollableDiv" className="h-[50vh] overflow-auto">
            <InfiniteScroll
              dataLength={data.length}
              next={() => {
                if (!loading) fetchData();
              }}
              hasMore={hasMoreData}
              loader={
                <div className="flex justify-center items-center py-4">
                  <Spinner size="sm" color="success" />
                  <span className="ml-2 text-sm text-gray-600">
                    Loading data Laporan Monev...
                  </span>
                </div>
              }
              scrollableTarget="scrollableDiv"
            >
              <Table
                aria-label="Laporan Monev Table"
                className="min-w-full"
                // removeWrapper
              >
                <TableHeader>
                  <TableColumn className="text-center bg-success text-white">
                    <div className="flex items-center justify-center gap-1">
                      <Hash size={14} />
                      <span className="text-xs font-medium">No</span>
                    </div>
                  </TableColumn>
                  <TableColumn className="text-center bg-success text-white">
                    <div className="flex items-center justify-center gap-1">
                      <Calendar size={14} />
                      <span className="text-xs font-medium">Tahun</span>
                    </div>
                  </TableColumn>
                  <TableColumn className="text-center bg-success text-white">
                    <div className="flex items-center justify-center gap-1">
                      <Building size={14} />
                      <span className="text-xs font-medium">KPPN</span>
                    </div>
                  </TableColumn>
                  <TableColumn className="text-center bg-success text-white">
                    <div className="flex items-center justify-center gap-1">
                      <FileText size={14} />
                      <span className="text-xs font-medium">Jenis</span>
                    </div>
                  </TableColumn>
                  <TableColumn className="text-center bg-success text-white">
                    <div className="flex items-center justify-center gap-1">
                      <Clock size={14} />
                      <span className="text-xs font-medium">Periode</span>
                    </div>
                  </TableColumn>
                  <TableColumn className="text-center bg-success text-white w-48">
                    <div className="flex items-center justify-center gap-1">
                      <FileText size={14} />
                      <span className="text-xs font-medium">Uraian</span>
                    </div>
                  </TableColumn>
                  <TableColumn className="text-center bg-success text-white">
                    <div className="flex items-center justify-center gap-1">
                      <Clock size={14} />
                      <span className="text-xs font-medium">Uploaded</span>
                    </div>
                  </TableColumn>
                  <TableColumn className="text-center bg-success text-white">
                    <div className="flex items-center justify-center gap-1">
                      <Settings size={14} />
                      <span className="text-xs font-medium">Opsi</span>
                    </div>
                  </TableColumn>
                </TableHeader>

                <TableBody>
                  {data.map((row, index) => (
                    <TableRow
                      key={`${row.id}-${index}`}
                      className="hover:bg-gray-50"
                    >
                      <TableCell className="text-center">
                        <Chip size="sm" variant="flat" color="default">
                          {offset - LIMIT + index + 1}
                        </Chip>
                      </TableCell>
                      <TableCell className="text-center font-medium">
                        {row.tahun}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="text-sm">
                          <div className="font-medium text-gray-900">
                            {row.nmkppn}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Chip size="sm" variant="flat" color="success">
                          {row.nmjenis}
                        </Chip>
                      </TableCell>
                      <TableCell className="text-center">
                        <Chip size="sm" variant="flat" color="warning">
                          {row.nmsubperiode}
                        </Chip>
                      </TableCell>
                      <TableCell className="text-center max-w-48">
                        <Tooltip
                          content={row.catatan || "Tidak ada catatan"}
                          placement="top"
                        >
                          <div className="text-sm text-gray-700 truncate">
                            {row.catatan
                              ? row.catatan.slice(0, 30) + "..."
                              : "-"}
                          </div>
                        </Tooltip>
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
                              color="success"
                              isIconOnly
                              onPress={() => handleShowDownloadModal(row)}
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
            </InfiniteScroll>
          </div>
        </CardBody>
      </Card>

      <DownloadModal
        show={showDownloadModal}
        onHide={handleCloseDownloadModal}
        fileInfo={selectedFile}
        onDownload={handleDownloadFile}
        onGetInfo={getFileInfo}
      />
    </div>
  );
}
