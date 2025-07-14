"use client";

import React, { useState, useEffect, useContext } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Select,
  SelectItem,
  Textarea,
  Input,
  Card,
  CardBody,
  Spinner,
} from "@heroui/react";
import { Upload, Clock, FileText } from "lucide-react";

import MyContext from "../../../utils/Context";

import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { handleHttpError } from "../../notifikasi/toastError";
import NotifikasiSukses from "../../notifikasi/notifsukses";
import CekKppn from "../upload-laporan/cek_Kppn";
import Subperiode from "./cek_subperiode";

const LkModal = ({ show, onHide }) => {
  const { axiosJWT, token, kdkanwil, role, username } = useContext(MyContext);
  const [loading, setLoading] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [tahun, setTahun] = useState(""); // Use state to manage the value
  const [kppn, setCekKppn] = useState("");
  const [periode, setPeriode] = useState("");
  const [subperiode, setsubPeriode] = useState("");
  const [jenis, setJenis] = useState("");

  const handleSubmitdata = async (values, { setSubmitting }) => {
    setLoading(true);

    try {
      await axiosJWT.post(
        import.meta.env.VITE_REACT_APP_LOCAL_INQUIRY_UPLOADKPPN,
        values,
        {
          headers: {
            "Content-type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      NotifikasiSukses("Laporan Berhasil Disimpan");
    } catch (error) {
      const { status, data } = error.response || {};
      handleHttpError(
        status,
        (data && data.error) ||
          "Terjadi Permasalahan Koneksi atau Server Backend"
      );

      setLoading(false);
    }
    setSubmitting(false);
  };

  const validationSchema = Yup.object().shape({
    tahun: Yup.string().required("Tahun harus dipilih"),
    kppn: Yup.string().required("Kppn harus dipilih"),
    jenis: Yup.string().required("Jenis laporan harus dipilih"),
    periode: Yup.string().required("Periode harus dipilih"),

    subperiode: Yup.string().when("jenis", {
      is: (jenis) => jenis === "01",
      then: () => Yup.string().required("Subperiode harus diisi"),
    }),
    file: Yup.mixed()
      .required("File laporan harus dipilih")
      .test("fileSize", "Ukuran file terlalu besar (maks 10MB)", (value) => {
        if (!value) return true;
        return value.size <= 10000000;
      })
      .test(
        "fileType",
        "Tipe file tidak valid (hanya ZIP atau RAR)",
        (value) => {
          if (!value) return true;
          const allowedExtensions = ["zip", "rar"];
          const fileName = value.name.toLowerCase();
          return allowedExtensions.some((ext) => fileName.endsWith(`.${ext}`));
        }
      ),
  });

  const handleCekKppn = (kppn) => {
    setCekKppn(kppn);
  };

  const handlesubPeriode = (subperiode) => {
    setsubPeriode(subperiode);
  };

  useEffect(() => {
    if (periode === "") {
      setsubPeriode("");
    }
  }, [periode]);

  useEffect(() => {
    if (subperiode === "") {
      setPeriode("");
    }
  }, [subperiode]);

  useEffect(() => {
    setsubPeriode("");
    setPeriode("");
  }, [jenis]);

  const tutupModal = () => {
    onHide();
    setCekKppn("");
    setPeriode("");
    setsubPeriode("");
    setJenis("");
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentDateTime(new Date());
  //   }, 1000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  return (
    <Modal
      isOpen={show}
      onOpenChange={(open) => !open && tutupModal()}
      size="5xl"
      scrollBehavior="inside"
      backdrop="opaque"
      classNames={{
        backdrop:
          "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <FileText className="text-success" size={20} />
                <span className="text-lg font-semibold">
                  Upload Laporan KPPN {tahun && `TA. ${tahun}`}
                </span>
              </div>
            </ModalHeader>
            <ModalBody className="px-6 py-4">
              <Card className="shadow-sm border-2">
                <CardBody className="p-6">
                  <Formik
                    validationSchema={validationSchema}
                    onSubmit={handleSubmitdata}
                    enableReinitialize={true}
                    initialValues={{
                      tahun: tahun,
                      kppn: kppn,
                      periode: periode,
                      subperiode: subperiode,
                      jenis: jenis,
                      file: "",
                      uraian: "",
                      username: username,
                    }}
                  >
                    {({
                      handleSubmit,
                      handleChange,
                      values,
                      setFieldValue,
                      isSubmitting,
                    }) => (
                      <form
                        id="upload-kppn-form"
                        onSubmit={handleSubmit}
                        className="space-y-6"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                              Tahun
                            </label>
                            <Select
                              placeholder="Pilih Tahun"
                              selectedKeys={tahun ? [tahun] : []}
                              onSelectionChange={(keys) => {
                                const selectedValue = Array.from(keys)[0];
                                setTahun(selectedValue);
                                handleChange({
                                  target: {
                                    name: "tahun",
                                    value: selectedValue,
                                  },
                                });
                              }}
                              className="w-full"
                              size="sm"
                            >
                              <SelectItem key="2024" value="2024">
                                2024
                              </SelectItem>
                              <SelectItem key="2025" value="2025">
                                2025
                              </SelectItem>
                            </Select>
                            <ErrorMessage
                              name="tahun"
                              component="div"
                              className="text-danger text-xs"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                              KPPN/ Satker
                            </label>
                            <CekKppn
                              name="kppn"
                              kppn={kppn}
                              as="select"
                              className="form-select form-select-md text-select"
                              onChange={(e) => {
                                handleChange(e);
                                handleCekKppn(e);
                              }}
                            />
                            <ErrorMessage
                              name="kppn"
                              component="div"
                              className="text-danger text-xs"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">
                            Jenis Laporan
                          </label>
                          <Select
                            placeholder="Pilih Jenis Laporan"
                            selectedKeys={jenis ? [jenis] : []}
                            onSelectionChange={(keys) => {
                              const selectedValue = Array.from(keys)[0];
                              setJenis(selectedValue);
                              handleChange({
                                target: { name: "jenis", value: selectedValue },
                              });
                            }}
                            className="w-full"
                            size="sm"
                          >
                            <SelectItem key="01" value="01">
                              Laporan Keuangan
                            </SelectItem>
                            <SelectItem key="02" value="02">
                              Laporan Monev
                            </SelectItem>
                          </Select>
                          <ErrorMessage
                            name="jenis"
                            component="div"
                            className="text-danger text-xs"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                              Periode Laporan
                            </label>
                            <Select
                              placeholder="-- Pilih Periode --"
                              selectedKeys={periode ? [periode] : []}
                              onSelectionChange={(keys) => {
                                const selectedValue = Array.from(keys)[0];
                                setPeriode(selectedValue);
                                handleChange({
                                  target: {
                                    name: "periode",
                                    value: selectedValue,
                                  },
                                });
                              }}
                              className="w-full"
                              size="sm"
                            >
                              {jenis === "02" ? (
                                <>
                                  <SelectItem key="0201" value="0201">
                                    Triwulan I
                                  </SelectItem>
                                  <SelectItem key="0202" value="0202">
                                    Triwulan II
                                  </SelectItem>
                                  <SelectItem key="0203" value="0203">
                                    Triwulan III
                                  </SelectItem>
                                  <SelectItem key="0204" value="0204">
                                    Triwulan IV
                                  </SelectItem>
                                </>
                              ) : (
                                <>
                                  <SelectItem key="01" value="01">
                                    Bulanan
                                  </SelectItem>
                                  <SelectItem key="02" value="02">
                                    Semesteran
                                  </SelectItem>
                                  <SelectItem key="03" value="03">
                                    Tahunan
                                  </SelectItem>
                                  <SelectItem key="04" value="04">
                                    TW-3
                                  </SelectItem>
                                </>
                              )}
                            </Select>
                            <ErrorMessage
                              name="periode"
                              component="div"
                              className="text-danger text-xs"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                              Sub Periode Laporan
                            </label>
                            <Subperiode
                              name="subperiode"
                              periode={periode}
                              subperiode={subperiode}
                              jenis={jenis}
                              as="select"
                              className="form-select form-select-md text-select"
                              onChange={(e) => {
                                handleChange(e);
                                handlesubPeriode(e);
                              }}
                            />
                            <ErrorMessage
                              name="subperiode"
                              component="div"
                              className="text-danger text-xs"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                              Uraian
                            </label>
                            <Textarea
                              name="uraian"
                              placeholder="Masukkan uraian laporan..."
                              onChange={(e) => {
                                handleChange(e);
                              }}
                              minRows={4}
                              className="w-full"
                              size="sm"
                            />
                            <ErrorMessage
                              name="uraian"
                              component="div"
                              className="text-danger text-xs"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                              File
                            </label>
                            <Input
                              type="file"
                              name="file"
                              accept=".zip,.rar"
                              onChange={(e) =>
                                setFieldValue("file", e.target.files[0])
                              }
                              className="w-full"
                              size="sm"
                              startContent={
                                <Upload className="text-gray-400" size={16} />
                              }
                            />
                            <div className="text-xs text-gray-500">
                              Format: ZIP atau RAR (Maks. 10MB)
                            </div>
                            <ErrorMessage
                              name="file"
                              component="div"
                              className="text-danger text-xs"
                            />
                          </div>
                        </div>

                        {/* Footer inside form */}
                        <div className="flex justify-between items-center pt-6 mt-6 border-t border-gray-200">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock size={16} />
                            <span>
                              Waktu Server (GMT +7){" "}
                              {currentDateTime.toLocaleTimeString("id-ID")}
                            </span>
                          </div>
                          <div className="flex gap-3">
                            <Button
                              color="danger"
                              type="submit"
                              isLoading={loading || isSubmitting}
                              spinner={<Spinner size="sm" />}
                              size="sm"
                            >
                              {loading || isSubmitting
                                ? "Loading..."
                                : "Simpan"}
                            </Button>
                            <Button
                              color="default"
                              variant="flat"
                              onPress={tutupModal}
                              size="sm"
                            >
                              Tutup
                            </Button>
                          </div>
                        </div>
                      </form>
                    )}
                  </Formik>
                </CardBody>
              </Card>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default LkModal;
