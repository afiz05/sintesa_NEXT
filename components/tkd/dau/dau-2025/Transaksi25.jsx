"use client";
import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  CardBody,
  Select,
  SelectItem,
  Spinner,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import MyContext from "../../../../utils/Context";
import { handleHttpError } from "../../../notifikasi/toastError";
import Encrypt from "../../../../utils/Encrypt";
import numeral from "numeral";

import KertasKerja from "./KertasKerja25";
import RefKppn25 from "../../../referensi_belanja/referensi_dau25/ref_Kppn";
import CekKdpemda25 from "../../../referensi_belanja/referensi_dau25/cek_Kdpemda";
import RekamDataTransaksi25 from "./RekamDataTransaksi25";
import KertasKerja25 from "./KertasKerja25";

const RekamTransaksi25 = ({ id, cek2 }) => {
  const { axiosJWT, token, kdkanwil, role, username } = useContext(MyContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [kppn, setCekKppn] = useState("");
  const [kdpemda, setKdpemda] = useState("");
  const [showModalRekam, setShowModalRekam] = useState(false);
  const [showModalKK, setShowModalKK] = useState(false);
  const [open, setOpen] = useState("");
  const [cek, setCek] = useState(false);
  const [idx, setIdx] = useState("");
  const [sql, setSql] = useState("");
  const [thang, setThang] = useState("2025");
  const currentMonth = new Date().getMonth() + 1; // Mendapatkan bulan saat ini (bernilai 0-11)
  const [bulan, setBulan] = useState(currentMonth.toString().padStart(2, "0")); // Jadikan default bulan saat ini
  const [idkdpemda, setidkdpemda] = useState("");
  const [idkppn, setidkppn] = useState("");

  useEffect(() => {
    cek2 === "1" && getData();
  }, [bulan, kppn, kdpemda, cek2]);

  const kondisithang =
    thang === "2025" ? "A.THANG='2025'" : `A.THANG='${thang}'`;
  const kondisi = kdpemda ? `AND A.KDPEMDA='${kdpemda}'` : "";
  const kondisikppn = kppn ? `AND A.KDKPPN='${kppn}'` : "";
  const kondisibulan = bulan !== "00" ? `AND A.BULAN='${bulan}'` : "";

  const getData = async () => {
    setLoading(true);
    const encodedQuery = encodeURIComponent(
      `SELECT
      A.ID,
      A.BULAN,
      A.THANG,
      A.NMBULAN,
      A.KDKPPN,
      D.NMKPPN,
      A.KDPEMDA,
      D.NMPEMDA,
      D.ALOKASI AS ALOKASI,
      SUM(B.NILAI) AS NILAI
  FROM
      tkd25.M_TRANSAKSI A
  LEFT JOIN
      tkd25.ALOKASI_BULANAN_LIST D ON A.KDKPPN = D.KDKPPN
      AND A.BULAN = D.BULAN
      AND A.KDPEMDA = D.KDPEMDA
  LEFT JOIN
      tkd25.DETAIL_KMK_DAU B ON A.KDKPPN = B.KDKPPN
      AND A.BULAN = B.BULAN
      AND A.KDPEMDA = B.KDKABKOTA
      WHERE 
      ${kondisithang} ${kondisi} ${kondisikppn} ${kondisibulan}
  
  GROUP BY
      A.BULAN,
      A.KDKPPN,
      A.KDPEMDA
  ORDER BY
      A.BULAN,
      A.KDKPPN,
      A.KDPEMDA;
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

  const handleCekKppn = (kppn) => {
    setCekKppn(kppn);
    setKdpemda("");
  };
  const handleCekKdpemda = (kdpemda) => {
    setKdpemda(kdpemda);
  };

  const handleRekam = async (id) => {
    setIdx(id);
    setOpen("1");
    setShowModalRekam(true);
  };
  const handleCloseModal = () => {
    setShowModalRekam(false);
    getData();
  };

  const handleKertasKerja = (idkppn, idkdpemda) => {
    setShowModalKK(true);
    setidkdpemda(idkdpemda);
    setidkppn(idkppn);
    setOpen("2");
    setCek(true);
  };
  const handleCloseModalKK = () => {
    setShowModalKK(false);
    setCek(false);
  };

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
                aria-label="Transaksi Data Table"
                className="min-w-full"
                removeWrapper
              >
                <TableHeader>
                  <TableColumn className="text-center">No</TableColumn>
                  <TableColumn className="text-center">TA</TableColumn>
                  <TableColumn className="text-center">Bulan</TableColumn>
                  <TableColumn className="text-center">KPPN</TableColumn>
                  <TableColumn className="text-center">Kab/ Kota</TableColumn>
                  <TableColumn className="text-center">Alokasi</TableColumn>
                  <TableColumn className="text-center">
                    Nilai Potongan
                  </TableColumn>
                  <TableColumn className="text-center">Option</TableColumn>
                </TableHeader>
                <TableBody>
                  {data.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-center">{index + 1}</TableCell>
                      <TableCell className="text-center">{row.THANG}</TableCell>
                      <TableCell className="text-center">
                        {row.NMBULAN}
                      </TableCell>
                      <TableCell className="text-center">
                        {row.NMKPPN} - {row.KDKPPN}
                      </TableCell>
                      <TableCell className="text-center">
                        {row.NMPEMDA} - {row.KDPEMDA}
                      </TableCell>
                      <TableCell className="text-right">
                        {numeral(row.ALOKASI).format("0,0")}
                      </TableCell>
                      <TableCell className="text-right">
                        {numeral(row.NILAI).format("0,0")}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center gap-3">
                          <i
                            className="bi bi-arrow-up-right-circle-fill text-danger cursor-pointer text-lg hover:text-red-600 transition-colors"
                            onClick={() => handleRekam(row.ID)}
                          ></i>
                          <i
                            className="bi bi-card-list text-success cursor-pointer text-lg hover:text-green-600 transition-colors"
                            onClick={() =>
                              handleKertasKerja(row.KDKPPN, row.KDPEMDA)
                            }
                          ></i>
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

      {open === "1" && (
        <RekamDataTransaksi25
          show={showModalRekam}
          onHide={handleCloseModal}
          id={idx}
          kppn={kppn}
          kdpemda={kdpemda}
          thang={thang}
          bulan={bulan}
        />
      )}
      {open === "2" && (
        <KertasKerja25
          show={showModalKK}
          onHide={handleCloseModalKK}
          cek={cek}
          kppn={idkppn}
          kdpemda={idkdpemda}
          thang={thang}
          bulan={bulan}
        />
      )}
    </div>
  );
};

export default RekamTransaksi25;
