"use client";
import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Tooltip,
  Spinner,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  useDisclosure,
} from "@heroui/react";
import MyContext from "../../../../utils/Context";
import Encrypt from "../../../../utils/Encrypt";
import { handleHttpError } from "../../../notifikasi/toastError";
import numeral from "numeral";

// import { Loading2 } from "../../layout/LoadingTable";
import ReactPaginate from "react-paginate";

import "../dau-2025/tkd.css";

import Swal from "sweetalert2";
import Notifikasi from "../../../notifikasi/notif";

import DataPemdaCabut25 from "./RekamKMKModalPemdaCabut25";
import RekamKMKModalPenundaan25 from "./RekamKMKModalPenundaan25";
import RekamKMKModalPotongan25 from "./RekamKMKModalPotongan25";
import RekamKMKModalTambahPenundaan25 from "./RekamKMKModalTambahPenundaan25";
import RekamKMKModalCabut25 from "./RekamKMKModalCabut25";
import RekamDataTransaksi25 from "./RekamDataTransaksi25";
import Rekon25 from "./rekon25";
import RekamKMKModal25 from "./RekamKMKModal25";
import RekamTransaksi25 from "./Transaksi25";

export default function DataKmk25(props) {
  const { darkMode } = props;
  const { axiosJWT, token, username, role, kdkanwil } = useContext(MyContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [cek, setCek] = useState("0");
  const [showModalCabut, setShowModalCabut] = useState(false);
  const [showModalRekam, setShowModalRekam] = useState(false);
  const [showModalPotongan, setShowModalPotongan] = useState(false);
  const [showModalPenundaan, setShowModalPenundaan] = useState(false);
  const [showModalPemdaCabut, setShowModalPemdaCabut] = useState(false);
  const [showModalTambahPenundaan, setShowModalTambahPenundaan] =
    useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [sql, setSql] = useState("");
  const [nokmk, setNokmk] = useState("");
  const [thang, setThang] = useState("");
  const [fileModalVisible, setFileModalVisible] = useState(false);
  const [fileModalUrl, setFileModalUrl] = useState("");
  const [open, setOpen] = useState("");
  const [alias, setAlias] = useState("");

  const {
    isOpen: isFileModalOpen,
    onOpen: onFileModalOpen,
    onOpenChange: onFileModalOpenChange,
  } = useDisclosure();

  useEffect(() => {
    getData();
  }, [page]);

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
      `SELECT a.id,a.thang,a.no_kmk,a.tgl_kmk,MONTH(a.tgl_kmk) bulan,a.uraian,a.filekmk,a.no_kmkcabut,a.tglcabut,a.jenis,a.kriteria,nm_kriteria,nmjenis,a.status_cabut FROM tkd25.ref_kmk_dau a LEFT OUTER JOIN ( SELECT b.jenis,b.nmjenis AS nmjenis FROM tkd25.ref_kmk b) b ON a.jenis=b.jenis LEFT OUTER JOIN ( SELECT c.id_kriteria,c.nm_kriteria AS nm_kriteria FROM tkd25.ref_kmk_dau_kriteria c) c ON a.kriteria=c.id_kriteria	GROUP BY a.no_kmk ORDER BY a.createdAt DESC`
    );

    const cleanedQuery = decodeURIComponent(encodedQuery)
      .replace(/\n/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    setSql(cleanedQuery);
    const encryptedQuery = Encrypt(cleanedQuery);
    // console.log(encryptedQuery);

    try {
      const response = await axiosJWT.get(
        process.env.NEXT_PUBLIC_TKD_DAU_25
          ? `${process.env.NEXT_PUBLIC_TKD_DAU_25}${encryptedQuery}&limit=${limit}&page=${page}&user=${username}`
          : "",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(response.data.result);
      setPages(response.data.totalPages);
      setRows(response.data.totalRows);
      setLoading(false);
    } catch (error) {
      console.log(error);
      // console.log(process.env.NEXT_PUBLIC_TKD_DAU_25);
      const { status, data } = error.response || {};
      handleHttpError(
        status,
        (data && data.error) ||
          "Terjadi Permasalahan Koneksi atau Server Backend"
      );

      setLoading(false);
    }
  };

  const handleRekam = async () => {
    setOpen("5");

    setShowModalRekam(true);
  };
  const handleCloseModal = () => {
    setShowModalRekam(false);
    getData();
  };
  const handlePageChange = ({ selected }) => {
    setPage(selected);
  };
  const handleRekamCabut = async () => {
    setShowModalCabut(true);
  };
  const handleCloseCabut = () => {
    setShowModalCabut(false);
  };

  const handleFileModalOpen = (url) => {
    setFileModalUrl(url);
    onFileModalOpen();
  };

  const halaman = ({ selected }) => {
    setPage(selected);
  };

  const handleRekamPotongan = async (no_kmk) => {
    setShowModalPotongan(true);
    setNokmk(no_kmk);
    setOpen("3");
  };
  const handleClosePotongan = () => {
    setShowModalPotongan(false);
  };
  const handleDataPenundaan = async (no_kmk, thang, alias) => {
    setShowModalPenundaan(true);
    setNokmk(no_kmk);
    setThang(thang);
    setOpen("2");
    setAlias(alias);
  };
  const handleClosePenundaan = () => {
    setShowModalPenundaan(false);
  };

  const handleDataTambahPenundaan = async (id, thang) => {
    setShowModalTambahPenundaan(true);
    setNokmk(id);
    setThang(thang);
    setOpen("4");
  };
  const handleCloseTambahPenundaan = () => {
    setShowModalTambahPenundaan(false);
  };

  const handleHapusKMK = async (id) => {
    const confirmText = "Anda yakin ingin menghapus data ini ?";

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
            `${process.env.NEXT_PUBLIC_LOCAL_BASIC_DAU25}dau25/kmk/delete/${id}`,
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
  const handleDataPemdaCabut = async (no_kmk, thang) => {
    setShowModalPemdaCabut(true);
    setNokmk(no_kmk);
    setThang(thang);
    setOpen("1");
  };
  const handleClosePemdaCabut = () => {
    setShowModalPemdaCabut(false);
  };

  // console.log(activeTab);

  return (
    <div className="w-full">
      {loading ? (
        <div className="flex flex-col items-center justify-center py-8">
          <Spinner size="lg" color="primary" />
          <p className="mt-4 text-default-500">Loading...</p>
        </div>
      ) : (
        <>
          <div className="flex justify-end gap-3 my-4">
            <Button
              color="primary"
              size="sm"
              className="min-w-[190px]"
              onClick={() => handleRekam()}
              startContent={<i className="bi bi-layout-text-sidebar"></i>}
            >
              Data KMK
            </Button>
            <Button
              color="success"
              size="sm"
              className="min-w-[190px]"
              onClick={() => handleRekamCabut()}
              startContent={<i className="bi bi-layout-split"></i>}
            >
              Pencabutan
            </Button>
          </div>

          <Card className="mt-3">
            <CardBody className="p-0">
              <Table
                aria-label="Data KMK Table"
                className="min-w-full"
                removeWrapper
              >
                <TableHeader>
                  <TableColumn className="text-center">No.</TableColumn>
                  <TableColumn className="text-center">Tahun</TableColumn>
                  <TableColumn className="text-center">
                    Tgl/ Nomor KMK
                  </TableColumn>
                  <TableColumn className="text-center">Uraian</TableColumn>
                  <TableColumn className="text-center">
                    Jenis/ Kriteria
                  </TableColumn>
                  <TableColumn className="text-center">File</TableColumn>
                  <TableColumn className="text-center">Opsi</TableColumn>
                </TableHeader>
                <TableBody>
                  {data.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-center">
                        {index + 1 + page * limit}
                      </TableCell>
                      <TableCell className="text-center">{row.thang}</TableCell>
                      <TableCell className="text-center">
                        <div>
                          <div>{row.tgl_kmk}</div>
                          <div>{row.no_kmk}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        {row.uraian}
                      </TableCell>
                      <TableCell className="text-center">
                        <div>
                          <div>{row.nmjenis}</div>
                          <div>({row.nm_kriteria})</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        {row.filekmk && row.filekmk.includes("http") ? (
                          <i
                            className="bi bi-file-earmark-pdf-fill text-danger cursor-pointer text-xl"
                            onClick={() => handleFileModalOpen(row.filekmk)}
                          ></i>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center gap-2">
                          {row.jenis === "2" && (
                            <>
                              <Tooltip content="Data Penundaan">
                                <i
                                  className="bi bi-box-arrow-right text-success cursor-pointer text-lg"
                                  onClick={() =>
                                    handleDataPenundaan(
                                      row.no_kmk,
                                      row.thang,
                                      row.alias
                                    )
                                  }
                                ></i>
                              </Tooltip>

                              <Tooltip content="Data Pencabutan">
                                <i
                                  className="bi bi-brightness-high-fill text-primary cursor-pointer text-lg"
                                  onClick={() =>
                                    handleDataPemdaCabut(row.no_kmk, row.thang)
                                  }
                                ></i>
                              </Tooltip>
                              <Tooltip content="Rekam Penundaan">
                                <i
                                  className="bi bi-file-plus-fill text-danger cursor-pointer text-lg"
                                  onClick={() =>
                                    handleDataTambahPenundaan(row.id, row.thang)
                                  }
                                ></i>
                              </Tooltip>
                            </>
                          )}
                          {row.jenis === "1" && (
                            <>
                              <Tooltip content="Data Potongan">
                                <i
                                  className="bi bi-box-arrow-right text-success cursor-pointer text-lg"
                                  onClick={() =>
                                    handleRekamPotongan(row.no_kmk)
                                  }
                                ></i>
                              </Tooltip>
                              <Tooltip content="Hapus Data KMK">
                                <i
                                  className="bi bi-trash-fill text-danger cursor-pointer text-lg ml-2"
                                  onClick={() => handleHapusKMK(row.id)}
                                ></i>
                              </Tooltip>
                            </>
                          )}
                          {row.jenis === "4" && (
                            <>
                              <a href="#">
                                <i className="bi bi-box-arrow-right text-success text-lg"></i>
                              </a>
                              <Tooltip content="Hapus Data KMK">
                                <i
                                  className="bi bi-trash-fill text-danger cursor-pointer text-lg ml-2"
                                  onClick={() => handleHapusKMK(row.id)}
                                ></i>
                              </Tooltip>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardBody>
          </Card>
          {data.length > 0 && (
            <>
              <div className="flex justify-between items-center mt-4">
                <span>
                  Total : {numeral(rows).format("0,0")}, &nbsp; Hal : &nbsp;
                  {rows ? page + 1 : 0} dari {pages}
                </span>
                <nav>
                  <ReactPaginate
                    breakLabel="..."
                    previousLabel={<span>←</span>}
                    nextLabel={<span>→</span>}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={1}
                    pageCount={pages}
                    containerClassName="pagination"
                    pageClassName="page-item2"
                    pageLinkClassName="page-link2"
                    previousClassName="page-item2"
                    previousLinkClassName="page-link2"
                    nextClassName="page-item2"
                    nextLinkClassName="page-link2"
                    activeClassName="active"
                    disabledClassName="disabled"
                    onPageChange={handlePageChange}
                    initialPage={page}
                  />
                </nav>
              </div>
            </>
          )}

          {/* {export2 && <GenerateCSV query3={sql} status={handleStatus} />} */}
        </>
      )}

      {open === "1" && (
        <DataPemdaCabut25
          show={showModalPemdaCabut}
          onHide={handleClosePemdaCabut}
          nokmk={nokmk}
          thang={thang}
        />
      )}
      {open === "2" && (
        <RekamKMKModalPenundaan25
          show={showModalPenundaan}
          onHide={handleClosePenundaan}
          nokmk={nokmk}
          thang={thang}
          alias={alias}
        />
      )}
      {open === "3" && (
        <RekamKMKModalPotongan25
          show={showModalPotongan}
          onHide={handleClosePotongan}
          nokmk={nokmk}
        />
      )}
      {open === "4" && (
        <RekamKMKModalTambahPenundaan25
          show={showModalTambahPenundaan}
          onHide={handleCloseTambahPenundaan}
          id={nokmk}
        />
      )}
      {open === "5" && (
        <RekamKMKModal25 show={showModalRekam} onHide={handleCloseModal} />
      )}
      <RekamKMKModalCabut25 show={showModalCabut} onHide={handleCloseCabut} />
      <Modal
        isOpen={isFileModalOpen}
        onOpenChange={onFileModalOpenChange}
        size="full"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">KMK DAU</ModalHeader>
              <ModalBody className="p-0">
                <div className="h-screen">
                  <iframe
                    src={fileModalUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                  />
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
