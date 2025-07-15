"use client";
import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  CardBody,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Spinner,
  Select,
  SelectItem,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  useDisclosure,
} from "@heroui/react";
import MyContext from "../../../../utils/Context";
import { handleHttpError } from "../../../notifikasi/toastError";
import Encrypt from "../../../../utils/Encrypt";

import axios from "axios";

import RekonDetail from "./rekondetail25";
import RefKppn25 from "../../../referensi_belanja/referensi_dau25/ref_Kppn";
import CekKdpemda25 from "../../../referensi_belanja/referensi_dau25/cek_Kdpemda";

const Rekon25 = () => {
  const { axiosJWT, token, username } = useContext(MyContext);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([]);
  const [datapemotongan, setDatapemotongan] = useState([]);

  const [datapenundaan, setDatapenundaan] = useState([]);
  const [update, setUpdate] = useState(false);
  const [tokenomspan, setTokenomspan] = useState("");
  const [kppn, setCekKppn] = useState("");
  const [kdpemda, setKdpemda] = useState("");
  const [bedadata, setBedadata] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = useState("");
  const [cek, setCek] = useState(false);
  const [sql, setSql] = useState("");
  const [thang, setThang] = useState("2024");
  const [dataupdate, setdataupdate] = useState([]);
  const currentMonth = new Date().getMonth() + 1; // Mendapatkan bulan saat ini (bernilai 0-11)
  const [bulan, setBulan] = useState(currentMonth.toString().padStart(2, "0")); // Jadikan default bulan saat ini
  const [idkdpemda, setidkdpemda] = useState("");
  const [idkppn, setidkppn] = useState("");
  const [idbulan, setidbulan] = useState("");
  const [loadingsimpan, setloadingSimpan] = useState(false);

  const {
    isOpen: isLoadingModalOpen,
    onOpen: onLoadingModalOpen,
    onOpenChange: onLoadingModalOpenChange,
  } = useDisclosure();

  useEffect(() => {
    if (update) {
      LoginOmspan();
      DeleteData();
    }
  }, [update]);

  useEffect(() => {
    getData();
  }, [kppn, bulan, kdpemda, bedadata]);

  useEffect(() => {
    getDataupdate();
  }, []);

  useEffect(() => {
    const fetchDataomspan = async () => {
      tokenomspan && (await getdataPemotongan());
      tokenomspan && (await getdataPenundaan());
    };
    fetchDataomspan();
  }, [tokenomspan]);

  const kondisithang =
    thang === "2025" ? "a.thang='2025'" : `a.thang='${thang}'`;
  const kondisi = kdpemda ? `AND a.kdpemda='${kdpemda}'` : "";
  const kondisikppn = kppn ? `AND a.kdkppn='${kppn}'` : "";
  const kondisibulan = bulan !== "00" ? `AND a.bulan='${bulan}'` : "";
  const kondisinull =
    bedadata === ""
      ? ""
      : bedadata === "00"
      ? "AND isnull(periode)"
      : "AND !isnull(periode)";

  const generateDataRekon = async () => {
    setloadingSimpan(true);

    try {
      const response = await axiosJWT.get(
        process.env.NEXT_PUBLIC_GENERATEDATA_REKON_25
          ? `${process.env.NEXT_PUBLIC_GENERATEDATA_REKON_25}${username}`
          : "",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUpdate(false);
    } catch (error) {
      const { status, data } = error.response || {};
      handleHttpError(
        status,
        (data && data.error) ||
          "Terjadi Permasalahan Koneksi atau Server Backend"
      );
      console.log(error);

      setUpdate(false);
    }
  };

  //AMBIL DATA DAU DARI OMSPAN

  const LoginOmspan = async () => {
    setloadingSimpan(true);

    const loginCredentials = {
      username: "dpa_api",
      password: "AksesDpa23",
      thang: "2024",
    };
    const headers = {
      Accept: "application/json",
    };
    try {
      const response = await axios.post(
        "https://spanint.kemenkeu.go.id/apitkd/api/auth/login",
        loginCredentials,
        { headers, withCredentials: false }
      );

      setTokenomspan(response.data.token);

      setUpdate(false);
    } catch (error) {
      const { status, data } = error.response || {};
      handleHttpError(
        status,
        (data && data.error) || "Gagal Login ke OMSPAN (Rekon tidak berhasil)"
      );

      setloadingSimpan(false);
      setUpdate(false);
    }
  };

  const getdataPemotongan = async () => {
    setloadingSimpan(true);

    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${tokenomspan}`,
    };

    try {
      const response = await axios.get(
        "https://spanint.kemenkeu.go.id/apitkd/api/dau/pemotongan",
        { headers, withCredentials: false }
      );

      setDatapemotongan(response.data.data);
      setloadingSimpan(false);
      setUpdate(false);
    } catch (error) {
      const { status, data } = error.response || {};
      handleHttpError(
        status,
        (data && data.error) || "Data Pemotongan OMSPAN gagal didapatkan"
      );

      setUpdate(false);
      setloadingSimpan(false);
    }
  };

  const getdataPenundaan = async () => {
    setloadingSimpan(true);
    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${tokenomspan}`,
    };

    try {
      const response = await axios.get(
        "https://spanint.kemenkeu.go.id/apitkd/api/dau/penundaan",
        { headers, withCredentials: false }
      );

      setDatapenundaan(response.data.data);
    } catch (error) {
      const { status, data } = error.response || {};
      handleHttpError(
        status,
        (data && data.error) || "Data Penundaan OMSPAN gagal didapatkan"
      );
      setloadingSimpan(false);
    }
  };

  const DeleteData = async () => {
    setloadingSimpan(true);
    try {
      const response = await axiosJWT.delete(
        process.env.NEXT_PUBLIC_TRUNCATEDATAOMSPAN_25
          ? `${process.env.NEXT_PUBLIC_TRUNCATEDATAOMSPAN_25}`
          : "",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUpdate(false);
      setloadingSimpan(false);
    } catch (error) {
      const { status, data } = error.response || {};
      handleHttpError(
        status,
        (data && data.error) ||
          "Terjadi Permasalahan Koneksi atau Server Backend"
      );
      console.log(error);
      setUpdate(false);
      setloadingSimpan(false);
    }
  };

  const getData = async () => {
    setLoading(true);
    const encodedQuery = encodeURIComponent(
      `SELECT a.thang,a.bulan,a.nmbulan,a.kdkppn,a.kdpemda,a.nmpemda,a.kdkppn,a.nmkppn,a.pagu,alokasi_bulan,
      a.tunda,a.cabut,a.potongan,a.salur,b.periode as beda FROM tkd25.rekap a left join data_omspan25.data_beda b on a.kdpemda=b.kdpemda 
      and a.thang=b.thang and a.bulan=b.periode where
      ${kondisithang} ${kondisi} ${kondisikppn} ${kondisibulan} ${kondisinull} ORDER BY a.bulan, a.kdkppn,a.kdpemda`
    );

    const cleanedQuery = decodeURIComponent(encodedQuery)
      .replace(/\n/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    setSql(cleanedQuery);
    //console.log(cleanedQuery);
    const encryptedQuery = Encrypt(cleanedQuery);
    try {
      const response = await axiosJWT.get(
        process.env.NEXT_PUBLIC_TKD_REFERENSI_TKD_25
          ? `${process.env.NEXT_PUBLIC_TKD_REFERENSI_TKD_25}${encryptedQuery}&user=${username}`
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

  const getDataupdate = async () => {
    try {
      const response = await axiosJWT.get(
        process.env.NEXT_PUBLIC_UPDATEREKON_25
          ? `${process.env.NEXT_PUBLIC_UPDATEREKON_25}?user=${username}`
          : "",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setdataupdate(response.data.tgupdate);
      setLoading(false);
    } catch (error) {
      const { status, data } = error.response || {};
      handleHttpError(
        status,
        (data && data.error) ||
          "Terjadi Permasalahan Koneksi atau Server Backend"
      );
    }
  };

  const handleCekKppn = (kppn) => {
    setCekKppn(kppn);
    setKdpemda("");
  };
  const handleCekKdpemda = (kdpemda) => {
    setKdpemda(kdpemda);
  };

  const handleUpdate = (e) => {
    setUpdate(true);
  };

  const handleRekonDetail = (idkppn, idkdpemda, idbulan) => {
    setShowModal(true);
    setidkdpemda(idkdpemda);
    setidkppn(idkppn);
    setidbulan(idbulan);
    setOpen("2");
    setCek(true);
  };
  const handleCloseModalRekonDetail = () => {
    setShowModal(false);
    setCek(false);
  };
  const handleClose = () => {
    setloadingSimpan(false);
    onLoadingModalOpenChange();
  };

  useEffect(() => {
    if (loadingsimpan) {
      onLoadingModalOpen();
    }
  }, [loadingsimpan]);

  useEffect(() => {
    if (!loadingsimpan) {
      const timeout = setTimeout(() => {
        handleClose();
      }, 10000);
      return () => clearTimeout(timeout);
    }
  }, [loadingsimpan]);

  const simpanPemotongan = async () => {
    try {
      const batchSizepotong = 150;
      const totalRows = datapemotongan.length;
      let startIndex = 0;

      while (startIndex < totalRows) {
        const endIndex = Math.min(startIndex + batchSizepotong, totalRows);
        const batchDatapotong = datapemotongan.slice(startIndex, endIndex);

        // Proses simpan per batch untuk pemotongan
        const response = await axiosJWT.post(
          `${process.env.NEXT_PUBLIC_SIMPANPEMOTONGANOMSPAN_25}`,
          batchDatapotong,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        startIndex += batchSizepotong;
        setloadingSimpan(false);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const simpanPenundaan = async () => {
    try {
      const batchSize = 150;
      const totalRows = datapenundaan.length;
      let startIndex = 0;

      while (startIndex < totalRows) {
        const endIndex = Math.min(startIndex + batchSize, totalRows);
        const batchData = datapenundaan.slice(startIndex, endIndex);

        // Proses simpan per batch untuk penundaan
        const response = await axiosJWT.post(
          `${process.env.NEXT_PUBLIC_SIMPANPENUNDAANOMSPAN_25}`,
          batchData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        startIndex += batchSize;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    let executed = false;

    const runSimpanPemotonganAndPenundaan = async () => {
      try {
        if (datapemotongan.length > 0) {
          await simpanPemotongan();
        }
        if (datapenundaan.length > 0) {
          await simpanPenundaan();
        }

        // Setelah kedua fungsi selesai, jalankan generateDataRekon hanya sekali
        if (
          datapemotongan.length > 0 &&
          datapenundaan.length > 0 &&
          !executed
        ) {
          await generateDataRekon();
          await getData();
          await getDataupdate();
          setloadingSimpan(false);
          setUpdate(false);
          executed = true; // Setelah dijalankan, ubah flag menjadi true
        }
      } catch (error) {
        console.error(error);
        setloadingSimpan(false);
        setUpdate(false);
      }
    };

    runSimpanPemotonganAndPenundaan();
  }, [datapemotongan, datapenundaan]);

  return (
    <div className="w-full">
      <Card className="mt-3">
        <CardBody className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-small font-bold text-foreground">
                Tahun
              </label>
              <Select
                selectedKeys={[thang]}
                onSelectionChange={(keys) => setThang(Array.from(keys)[0])}
                className="w-full"
                size="sm"
              >
                <SelectItem key="2025" value="2025">
                  2025
                </SelectItem>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-small font-bold text-foreground">
                Bulan
              </label>
              <Select
                selectedKeys={[bulan]}
                onSelectionChange={(keys) => setBulan(Array.from(keys)[0])}
                className="w-full"
                size="sm"
              >
                <SelectItem key="01" value="01">
                  Januari
                </SelectItem>
                <SelectItem key="02" value="02">
                  Februari
                </SelectItem>
                <SelectItem key="03" value="03">
                  Maret
                </SelectItem>
                <SelectItem key="04" value="04">
                  April
                </SelectItem>
                <SelectItem key="05" value="05">
                  Mei
                </SelectItem>
                <SelectItem key="06" value="06">
                  Juni
                </SelectItem>
                <SelectItem key="07" value="07">
                  Juli
                </SelectItem>
                <SelectItem key="08" value="08">
                  Agustus
                </SelectItem>
                <SelectItem key="09" value="09">
                  September
                </SelectItem>
                <SelectItem key="10" value="10">
                  Oktober
                </SelectItem>
                <SelectItem key="11" value="11">
                  November
                </SelectItem>
                <SelectItem key="12" value="12">
                  Desember
                </SelectItem>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-small font-bold text-foreground">
                KPPN
              </label>
              <RefKppn25
                name="kppn"
                kppn={kppn}
                as="select"
                className="form-select form-select-md text-select"
                onChange={(e) => {
                  handleCekKppn(e);
                }}
              />
            </div>

            <div className="space-y-2">
              <label className="text-small font-bold text-foreground">
                Kabupaten/ Kota
              </label>
              <CekKdpemda25
                name="kdpemda"
                kppn={kppn}
                kdpemda={kdpemda}
                as="select"
                className="form-select form-select-md text-select"
                onChange={(e) => {
                  handleCekKdpemda(e);
                }}
              />
            </div>

            <div className="space-y-2">
              <label className="text-small font-bold text-foreground">
                Status
              </label>
              <Select
                selectedKeys={bedadata ? [bedadata] : []}
                onSelectionChange={(keys) =>
                  setBedadata(Array.from(keys)[0] || "")
                }
                className="w-full"
                size="sm"
                placeholder="Semua Data"
              >
                <SelectItem key="" value="">
                  Semua Data
                </SelectItem>
                <SelectItem key="00" value="00">
                  Data Sama
                </SelectItem>
                <SelectItem key="01" value="01">
                  Data Berbeda
                </SelectItem>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-small font-bold text-foreground invisible">
                Action
              </label>
              <div className="flex items-center gap-2 mt-2">
                <i
                  className="bi bi-arrow-repeat text-danger cursor-pointer text-xl hover:text-red-600 transition-colors"
                  onClick={(e) => {
                    handleUpdate(e);
                  }}
                ></i>
                <span className="text-small">Ambil Data OMSPAN</span>
                {dataupdate && (
                  <span className="text-xs text-default-500 italic">
                    (update {dataupdate})
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="mt-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Spinner size="lg" color="primary" />
            <p className="mt-4 text-default-500">Loading...</p>
          </div>
        ) : (
          <Card>
            <CardBody className="p-0">
              <Table
                aria-label="Rekon Data Table"
                className="min-w-full"
                removeWrapper
              >
                <TableHeader>
                  <TableColumn className="text-center">No</TableColumn>
                  <TableColumn className="text-center">TA</TableColumn>
                  <TableColumn className="text-center">Bulan</TableColumn>
                  <TableColumn className="text-center">KPPN</TableColumn>
                  <TableColumn className="text-center">Kab/ Kota</TableColumn>
                  <TableColumn className="text-center">Status</TableColumn>
                </TableHeader>
                <TableBody>
                  {data.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-center">{index + 1}</TableCell>
                      <TableCell className="text-center">{row.thang}</TableCell>
                      <TableCell className="text-center">
                        {row.nmbulan}
                      </TableCell>
                      <TableCell className="text-center">
                        {row.nmkppn} - {row.kdkppn}
                      </TableCell>
                      <TableCell className="text-center">
                        {row.nmpemda} - {row.kdpemda}
                      </TableCell>
                      <TableCell className="text-center">
                        <i
                          className={`bi cursor-pointer text-lg hover:scale-110 transition-transform ${
                            row.beda
                              ? "bi-exclamation-circle-fill text-danger hover:text-red-600"
                              : "bi-check-lg text-success hover:text-green-600"
                          }`}
                          onClick={() =>
                            handleRekonDetail(
                              row.kdkppn,
                              row.kdpemda,
                              row.bulan
                            )
                          }
                        ></i>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardBody>
          </Card>
        )}
      </div>

      <Modal
        isOpen={isLoadingModalOpen}
        onOpenChange={onLoadingModalOpenChange}
        isDismissable={false}
        hideCloseButton
        size="sm"
      >
        <ModalContent>
          <ModalBody className="py-8">
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <Spinner size="lg" color="primary" />
              <div>
                <p className="font-medium">Loading...</p>
                <p className="text-small text-default-500">
                  mengambil data omspan...
                </p>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

      {open === "2" && (
        <RekonDetail
          show={showModal}
          onHide={handleCloseModalRekonDetail}
          cek={cek}
          kodekppn={idkppn}
          kdpemda={idkdpemda}
          thang={thang}
          bulan={idbulan}
        />
      )}
    </div>
  );
};

export default Rekon25;
