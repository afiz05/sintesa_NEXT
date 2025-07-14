"use client";

import React, { useState, useEffect, useContext } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Select,
  SelectItem,
  Textarea,
  Input,
  Card,
  CardBody,
  Spinner,
} from "@heroui/react";
import { Upload, X, Clock } from "lucide-react";

import MyContext from "../../../utils/Context";

import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { handleHttpError } from "../../notifikasi/toastError";
import NotifikasiSukses from "../../notifikasi/notifsukses";

import Subperiode from "./cek_subperiode";
import CekKanwil from "./cek_Kanwil";

const ModalMonev = ({ show, onHide }) => {
  const { axiosJWT, token, kdkanwil, role, username } = useContext(MyContext);
  const [loading, setLoading] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [tahun, setTahun] = useState("2023"); // Use state to manage the value
  const [kanwil, setCekKanwil] = useState("");
  const [periode, setPeriode] = useState("");
  const [subperiode, setsubPeriode] = useState("");
  const [jenis, setJenis] = useState("");

  const handleSubmitdata = async (values, { setSubmitting }) => {
    setLoading(true);

    try {
      await axiosJWT.post(
        import.meta.env.VITE_REACT_APP_LOCAL_INQUIRY_UPLOADKANWIL,
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
    kanwil: Yup.string().required("kanwil harus dipilih"),
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

  const handleCekKanwil = (kanwil) => {
    setCekKanwil(kanwil);
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
    setCekKanwil("");
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
                <Upload className="text-danger" size={20} />
                <span className="text-lg font-semibold">
                  Upload Laporan Monev Kanwil {tahun && `TA. ${tahun}`}
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
                      kanwil: kanwil,
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
                    }) => (
                      <form onSubmit={handleSubmit} className="space-y-6">
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
                              Kanwil
                            </label>
                            <CekKanwil
                              name="kanwil"
                              kanwil={kanwil}
                              as="select"
                              className="form-select form-select-md text-select"
                              onChange={(e) => {
                                handleChange(e);
                                handleCekKanwil(e);
                              }}
                            />
                            <ErrorMessage
                              name="kanwil"
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
                            {jenis === "02" && (
                              <>
                                <SelectItem key="0201" value="0201">
                                  Semester I
                                </SelectItem>
                                <SelectItem key="0202" value="0202">
                                  Semester II
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
                      </form>
                    )}
                  </Formik>
                </CardBody>
              </Card>
            </ModalBody>
            <ModalFooter className="flex justify-between items-center px-6 py-4">
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
                  isLoading={loading}
                  spinner={<Spinner size="sm" />}
                  onPress={() => {
                    const form = document.querySelector("form");
                    if (form) {
                      form.requestSubmit();
                    }
                  }}
                  size="sm"
                >
                  {loading ? "Loading..." : "Simpan"}
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
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalMonev;
