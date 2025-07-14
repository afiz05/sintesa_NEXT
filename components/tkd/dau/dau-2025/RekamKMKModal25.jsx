"use client";
import React, { useState, useEffect, useContext } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Card,
  CardBody,
  Input,
  Textarea,
  Spinner,
  Spacer,
  Select,
  SelectItem,
  DatePicker,
} from "@heroui/react";
import MyContext from "../../../../utils/Context";
import { parseDate, getLocalTimeZone, today } from "@internationalized/date";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { handleHttpError } from "../../../notifikasi/toastError";
import Swal from "sweetalert2";
import NotifikasiSukses from "../../../notifikasi/notifsukses";
import moment from "moment";
import {
  useKmkData,
  useKriteriaData,
  usePenundaanData,
  usePencabutanData,
  useKppnData,
  useKdpemdaData,
} from "../../../../hooks/useKmkData";

const RekamKMKModal25 = ({ show, onHide }) => {
  const { axiosJWT, token, kdkanwil, role } = useContext(MyContext);
  const [kmk, setKmk] = useState("");
  const [kriteria, setKriteria] = useState("");
  const [kppn, setCekKppn] = useState("");
  const [kdpemda, setKdpemda] = useState("");
  const [refPenundaan, setRefPenundaan] = useState("");
  const [refPencabutan, setRefPencabutan] = useState("");
  const [tahun, setTahun] = useState("");
  const [kmktunda, setKMKtunda] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [uraian, setUraian] = useState("");
  const [loading, setLoading] = useState(false);

  const [showCabutPenundaan, setShowCabutPenundaan] = useState(false);

  // Use custom hooks for data
  const { data: kmkData, loading: kmkLoading } = useKmkData();
  const { data: kriteriaData, loading: kriteriaLoading } = useKriteriaData();
  const { data: penundaanData, loading: penundaanLoading } = usePenundaanData();
  const { data: pencabutanData, loading: pencabutanLoading } =
    usePencabutanData();
  const { data: kppnData, loading: kppnLoading } = useKppnData(refPenundaan);
  const { data: kdpemdaData, loading: kdpemdaLoading } = useKdpemdaData(kppn);

  useEffect(() => {
    const [kmkValue, tanggalValue, uraianValue, tahunValue] =
      refPencabutan.split("*");
    setTahun(tahunValue);
    setKMKtunda(kmkValue);
    setTanggal(tanggalValue);
    setUraian(uraianValue);
  }, [refPenundaan, refPencabutan]);

  useEffect(() => {
    setTahun("");
    setKMKtunda("");
    setTanggal("");
    setUraian("");
  }, [refPenundaan]);

  const handleKMK = (kmk) => {
    setKmk(kmk);
  };
  const handleKriteria = (kriteria) => {
    setKriteria(kriteria);
  };

  useEffect(() => {
    if (kmk === "3") {
      setShowCabutPenundaan(true);
    } else {
      setShowCabutPenundaan(false);
    }
    setTahun("");
    setKMKtunda("");
    setTanggal("");
    setUraian("");
    setRefPenundaan("");
    setRefPencabutan("");
    setKriteria("");
  }, [kmk]);

  const handleCekKppn = (kppn) => {
    setCekKppn(kppn);
  };
  const handleCekKdpemda = (kdpemda) => {
    setKdpemda(kdpemda);
  };

  const handlePenundaanKMK = (penundaan) => {
    setRefPenundaan(penundaan);
  };

  const handlePencabutanKMK = (pencabutan) => {
    setRefPencabutan(pencabutan);
  };

  const handleModalClose = () => {
    setKriteria("");
    setRefPencabutan("");
    setRefPenundaan("");
    setTahun("");
    setTanggal("");
    setKMKtunda("");
    setUraian("");
    setKmk("");
    onHide();
  };

  useEffect(() => {
    setRefPenundaan("");
    setRefPencabutan("");
    setTahun("");
    setKMKtunda("");
    setTanggal("");
    setUraian("");
    setCekKppn("");
    setKdpemda("");
  }, [kriteria]);

  useEffect(() => {
    setCekKppn("");
    setKdpemda("");
    setRefPencabutan("");
  }, [refPenundaan]);

  useEffect(() => {
    setCekKppn("");
    setKdpemda("");
  }, [refPencabutan]);

  const handleSubmitdata = async (values, { setSubmitting }) => {
    setLoading(true);

    const apiUrl =
      values.jenis === "3"
        ? import.meta.env.VITE_REACT_APP_SIMPANKMKJENIS3_25
        : import.meta.env.VITE_REACT_APP_SIMPANKMK_25;

    let headers = {
      Authorization: `Bearer ${token}`,
    };

    // Set different Content-type based on values.jenis
    if (values.jenis !== "3") {
      headers["Content-type"] = "multipart/form-data";
    } else {
      headers["Content-type"] = "application/json";
    }
    try {
      const response = await axiosJWT.post(apiUrl, values, {
        headers: headers,
      });

      NotifikasiSukses("User Berhasil Disimpan");

      Swal.fire({
        html: `<div className='text-success mt-4'>Data Berhasil Disimpan</div>`,
        icon: "success",
        position: "top",
        buttonsStyling: false,
        customClass: {
          popup: "swal2-animation",
          container: "swal2-animation",
          confirmButton: "swal2-confirm",
          icon: "swal2-icon",
        },
        confirmButtonText: "Tutup",
      });
    } catch (error) {
      const { status, data } = error.response || {};
      handleHttpError(
        status,
        (data && data.error) ||
          "Terjadi Permasalahan Koneksi atau Server Backend"
      );
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    jenis: Yup.string().required("Jenis KMK harus dipilih"),
    kriteria: Yup.string().required("Kriteria KMK harus dipilih"),
    nomorkmk1: Yup.string().when("jenis", {
      is: (value) => value !== "3",
      then: () => Yup.string().required("Nomor KMK harus diisi"),
      otherwise: () => Yup.string(),
    }),
    tglkmk1: Yup.string().when("jenis", {
      is: (value) => value !== "3",
      then: () => Yup.string().required("Tgl KMK harus diisi"),
      otherwise: () => Yup.string(),
    }),
    uraian1: Yup.string().when("jenis", {
      is: (value) => value !== "3",
      then: () => Yup.string().required("Uraian KMK harus diisi"),
      otherwise: () => Yup.string(),
    }),
    file: Yup.mixed().when("jenis", {
      is: (value) => value !== "3",
      then: () =>
        Yup.mixed()
          .required("File KMK harus dipilih") // Require a file
          .test(
            "fileSize",
            "Ukuran file terlalu besar (maks 10MB)",
            (value) => {
              if (!value) return true; // Tidak validasi jika tidak ada file yang dipilih
              return value.size <= 10000000; // Ubah 1000000 ke ukuran maksimum yang diizinkan dalam byte (1MB)
            }
          )
          .test("fileType", "Tipe file tidak valid (hanya PDF)", (value) => {
            if (!value) return true; // Tidak validasi jika tidak ada file yang dipilih
            return value.type === "application/pdf"; // Check if the selected file is a PDF
          }),
      otherwise: () => Yup.mixed(),
    }),
    kppn: Yup.string().when("jenis", {
      is: (value) => value === "3",
      then: () => Yup.mixed().required("KPPN harus dipilih"),
    }),
    tunda: Yup.string().when("jenis", {
      is: (value) => value === "3",
      then: () => Yup.mixed().required("Penundaan harus dipilih"),
    }),
    cabut: Yup.string().when("jenis", {
      is: (value) => value === "3",
      then: () => Yup.mixed().required("Pencabutan harus dipilih"),
    }),
    kdpemda: Yup.string().when("jenis", {
      is: (value) => value === "3",
      then: () => Yup.mixed().required("Kabupaten/ Kota harus dipilih"),
    }),
  });

  return (
    <Modal
      isOpen={show}
      onClose={handleModalClose}
      backdrop="blur"
      size="5xl"
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader className="flex gap-1">
          <i className="bi bi-back text-success mx-3"></i>
          Referensi KMK DAU
        </ModalHeader>
        <ModalBody>
          <Card>
            <CardBody>
              <Formik
                validationSchema={validationSchema}
                onSubmit={handleSubmitdata}
                enableReinitialize={true}
                initialValues={{
                  jenis: kmk,
                  kriteria: kriteria,
                  nomorkmk1: "",
                  tglkmk1: "",
                  uraian1: "",
                  file: "",
                  kppn: kppn,
                  tunda: refPenundaan,
                  cabut: tanggal,
                  kdpemda: kdpemda,
                  kmkcabut: kmktunda,
                  tgcabut: tanggal,
                  uraiancabut: uraian,
                }}
              >
                {({ handleSubmit, handleChange, values, setFieldValue }) => (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Select
                          label="Jenis KMK"
                          placeholder="-- Pilih Jenis KMK --"
                          selectedKeys={kmk ? [kmk] : []}
                          onSelectionChange={(keys) => {
                            const selectedValue = Array.from(keys)[0];
                            setKmk(selectedValue);
                            handleKMK(selectedValue);
                            handleChange({
                              target: { name: "jenis", value: selectedValue },
                            });
                          }}
                          isLoading={kmkLoading}
                        >
                          {kmkData.map((item) => (
                            <SelectItem key={item.jenis} value={item.jenis}>
                              {item.jenis} - {item.nmjenis}
                            </SelectItem>
                          ))}
                        </Select>
                        <ErrorMessage
                          name="jenis"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>

                      <div>
                        <Select
                          label="Kriteria"
                          placeholder="-- Pilih Kriteria KMK --"
                          selectedKeys={kriteria ? [kriteria] : []}
                          onSelectionChange={(keys) => {
                            const selectedValue = Array.from(keys)[0];
                            setKriteria(selectedValue);
                            handleKriteria(selectedValue);
                            handleChange({
                              target: {
                                name: "kriteria",
                                value: selectedValue,
                              },
                            });
                          }}
                          isLoading={kriteriaLoading}
                          isDisabled={!kmk}
                        >
                          {kriteriaData
                            .filter((item) => item.id === kmk)
                            .map((item) => (
                              <SelectItem
                                key={item.id_kriteria}
                                value={item.id_kriteria}
                              >
                                {item.nm_kriteria}
                              </SelectItem>
                            ))}
                        </Select>
                        <ErrorMessage
                          name="kriteria"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                    </div>

                    {kmk === "3" && (
                      <div
                        className={`transition-all duration-300 ease-in-out ${
                          showCabutPenundaan
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 -translate-y-2 pointer-events-none"
                        }`}
                      >
                        <div className="space-y-4">
                          <div>
                            <Select
                              label="Dasar Penundaan"
                              placeholder="-- Pilih KMK --"
                              selectedKeys={refPenundaan ? [refPenundaan] : []}
                              onSelectionChange={(keys) => {
                                const selectedValue = Array.from(keys)[0];
                                setRefPenundaan(selectedValue);
                                handlePenundaanKMK(selectedValue);
                                handleChange({
                                  target: {
                                    name: "tunda",
                                    value: selectedValue,
                                  },
                                });
                              }}
                              isLoading={penundaanLoading}
                              isDisabled={!kriteria}
                            >
                              {penundaanData
                                .filter((item) => item.kriteria === kriteria)
                                .map((item) => (
                                  <SelectItem
                                    key={item.no_kmk}
                                    value={item.no_kmk}
                                  >
                                    {item.no_kmk}
                                  </SelectItem>
                                ))}
                            </Select>
                            <ErrorMessage
                              name="tunda"
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>

                          <div>
                            <Select
                              label="Dasar Pencabutan"
                              placeholder="-- Pilih KMK --"
                              selectedKeys={
                                refPencabutan ? [refPencabutan] : []
                              }
                              onSelectionChange={(keys) => {
                                const selectedValue = Array.from(keys)[0];
                                setRefPencabutan(selectedValue);
                                handlePencabutanKMK(selectedValue);
                                handleChange({
                                  target: {
                                    name: "cabut",
                                    value: selectedValue,
                                  },
                                });
                              }}
                              isLoading={pencabutanLoading}
                              isDisabled={!refPenundaan}
                            >
                              {pencabutanData
                                .filter(
                                  (item) => item.kmktunda === refPenundaan
                                )
                                .map((item) => (
                                  <SelectItem
                                    key={`${item.no_kmkcabut}*${item.tglcabut}*${item.uraiancabut}*${item.thangcabut}`}
                                    value={`${item.no_kmkcabut}*${item.tglcabut}*${item.uraiancabut}*${item.thangcabut}`}
                                  >
                                    {item.no_kmkcabut}
                                  </SelectItem>
                                ))}
                            </Select>
                            <ErrorMessage
                              name="cabut"
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Input
                              type="text"
                              label="Tahun"
                              value={tahun}
                              onChange={(e) => setTahun(e.target.value)}
                              isDisabled
                            />

                            <Input
                              type="text"
                              label="Nomor ND/ KMK"
                              value={kmktunda}
                              onChange={(e) => setKMKtunda(e.target.value)}
                              isDisabled
                            />

                            <Input
                              type="text"
                              label="Tanggal"
                              name="cabut"
                              value={tanggal}
                              onChange={(e) => setTanggal(e.target.value)}
                              isDisabled
                            />
                          </div>

                          <Input
                            type="text"
                            label="Uraian"
                            value={uraian}
                            onChange={(e) => setTahun(e.target.value)}
                            isDisabled
                          />

                          <div>
                            <Select
                              label="KPPN"
                              placeholder="-- Pilih KPPN --"
                              selectedKeys={kppn ? [kppn] : []}
                              onSelectionChange={(keys) => {
                                const selectedValue = Array.from(keys)[0];
                                setCekKppn(selectedValue);
                                handleCekKppn(selectedValue);
                                handleChange({
                                  target: {
                                    name: "kppn",
                                    value: selectedValue,
                                  },
                                });
                              }}
                              isLoading={kppnLoading}
                              isDisabled={!refPenundaan}
                            >
                              {kppnData.map((item) => (
                                <SelectItem
                                  key={item.KDKPPN}
                                  value={item.KDKPPN}
                                >
                                  {item.NMKPPN} ({item.KDKPPN})
                                </SelectItem>
                              ))}
                            </Select>
                            <ErrorMessage
                              name="kppn"
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>

                          <div>
                            <Select
                              label="Kabupaten/ Kota"
                              placeholder="-- Pilih Kabupaten/ Kota --"
                              selectedKeys={kdpemda ? [kdpemda] : []}
                              onSelectionChange={(keys) => {
                                const selectedValue = Array.from(keys)[0];
                                setKdpemda(selectedValue);
                                handleCekKdpemda(selectedValue);
                                handleChange({
                                  target: {
                                    name: "kdpemda",
                                    value: selectedValue,
                                  },
                                });
                              }}
                              isLoading={kdpemdaLoading}
                              isDisabled={!kppn}
                            >
                              {kdpemdaData.map((item) => (
                                <SelectItem
                                  key={item.kdkabkota}
                                  value={item.kdkabkota}
                                >
                                  {item.kdkabkota} - {item.nmkabkota}
                                </SelectItem>
                              ))}
                            </Select>
                            <ErrorMessage
                              name="kdpemda"
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {kmk !== "3" ? (
                      <div
                        className={`transition-all duration-300 ease-in-out ${
                          showCabutPenundaan
                            ? "opacity-0 -translate-y-2 pointer-events-none"
                            : "opacity-100 translate-y-0"
                        }`}
                      >
                        <div className="space-y-4">
                          <Input
                            type="text"
                            label="Nomor ND/ KMK"
                            placeholder="Nomor ND/ KMK"
                            name="nomorkmk1"
                            onChange={(e) => {
                              handleChange(e);
                            }}
                          />
                          <ErrorMessage
                            name="nomorkmk1"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <DatePicker
                                label="Tgl KMK"
                                value={
                                  values.tglkmk1
                                    ? parseDate(
                                        moment(values.tglkmk1).format(
                                          "YYYY-MM-DD"
                                        )
                                      )
                                    : null
                                }
                                onChange={(date) => {
                                  if (date) {
                                    const formattedDate = `${
                                      date.year
                                    }-${String(date.month).padStart(
                                      2,
                                      "0"
                                    )}-${String(date.day).padStart(
                                      2,
                                      "0"
                                    )}T00:00:00.000Z`;
                                    setFieldValue("tglkmk1", formattedDate);
                                  } else {
                                    setFieldValue("tglkmk1", "");
                                  }
                                }}
                                showMonthAndYearPickers
                                granularity="day"
                              />
                              <ErrorMessage
                                name="tglkmk1"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                              />
                            </div>

                            <div>
                              <Textarea
                                label="Uraian KMK"
                                placeholder="Uraian KMK"
                                name="uraian1"
                                onChange={(e) => {
                                  handleChange(e);
                                }}
                                minRows={4}
                              />
                              <ErrorMessage
                                name="uraian1"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">
                              File KMK
                            </label>
                            <input
                              className="block w-full px-3 py-3 text-sm text-gray-900 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200"
                              type="file"
                              name="file"
                              id="file"
                              onChange={(e) =>
                                setFieldValue("file", e.target.files[0])
                              }
                            />
                            <ErrorMessage
                              name="file"
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>
                        </div>
                      </div>
                    ) : null}

                    <Spacer y={4} />

                    <div className="flex justify-end gap-2">
                      <Button
                        type="submit"
                        color="danger"
                        isLoading={loading}
                        spinner={<Spinner size="sm" color="white" />}
                      >
                        {loading ? "Loading..." : "Simpan"}
                      </Button>
                      <Button
                        color="default"
                        variant="bordered"
                        onPress={handleModalClose}
                      >
                        Tutup
                      </Button>
                    </div>
                  </form>
                )}
              </Formik>
            </CardBody>
          </Card>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default RekamKMKModal25;
