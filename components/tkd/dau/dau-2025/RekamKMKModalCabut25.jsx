"use client";
import React, { useState, useEffect, useContext } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Input,
  Card,
  CardBody,
  Spinner,
  DatePicker,
} from "@heroui/react";
import { parseDate, getLocalTimeZone } from "@internationalized/date";

import MyContext from "../../../../utils/Context";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { handleHttpError } from "../../../notifikasi/toastError";
import Swal from "sweetalert2";
// import NotifikasiSukses from "../../../notifikasi/notifsukses";
// import RefPenundaanCabut from "../../referensi/referensi_dau/ref_penundaan_fromcabut";
import DataKmkCabut from "./dataKmkCabut25";
import moment from "moment";
import RefPenundaanCabut25 from "../../../referensi_belanja/referensi_dau25/ref_penundaan_fromcabut";

const RekamKMKModalCabut25 = ({ show, onHide }) => {
  const { axiosJWT, token, kdkanwil, role } = useContext(MyContext);
  const [cek, setCek] = useState(true);
  const [loading, setLoading] = useState(false);
  const [refPenundaan, setRefPenundaan] = useState("");

  const handlePenundaanKMK = (penundaan) => {
    setRefPenundaan(penundaan);
  };

  const handleModalClose = () => {
    onHide();
    setCek(true);
    setRefPenundaan("");
  };
  const handleSubmitdata = async (values, { setSubmitting }) => {
    setLoading(true);
    setCek(false);
    try {
      //  console.log(values);
      await axiosJWT.post(
        import.meta.env.VITE_REACT_APP_SIMPANKMKCABUT_25,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setLoading(false);
      Swal.fire({
        html: `<div className='text-success mt-4'>Data Berhasil Disimpan</div>`,
        icon: "success", // Tambahkan ikon error
        position: "top",
        buttonsStyling: false,
        customClass: {
          popup: "swal2-animation",
          container: "swal2-animation",
          confirmButton: "swal2-confirm ", // Gunakan kelas CSS kustom untuk tombol
          icon: "swal2-icon", // Gunakan kelas CSS kustom untuk ikon
        },
        confirmButtonText: "Tutup",
      });
      setCek(true);
    } catch (error) {
      console.log(error);
      const { status, data } = error.response || {};
      handleHttpError(
        status,
        (data && data.error) ||
          "Terjadi Permasalahan Koneksi atau Server Backend"
      );

      setLoading(false);
      setSubmitting(false);
    }
  };
  const validationSchema = Yup.object().shape({
    tunda: Yup.string().required("KMK Penundaan harus dipilih"),
    thang: Yup.string()
      .required("Tahun harus diisi")
      .matches(
        /^(202[3-9]|20[3-9][0-9])$/,
        "Tahun minimal 2023 dan harus berupa angka"
      ),
    nomorkmk1: Yup.string().required("harus diisi"),
    tglkmk1: Yup.string().required("harus diisi"),
    uraian1: Yup.string().required("harus diisi"),
  });

  return (
    <Modal
      isOpen={show}
      onClose={handleModalClose}
      backdrop="opaque"
      size="5xl"
      scrollBehavior="inside"
      classNames={{
        backdrop:
          "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <i className="bi bi-back text-success text-xl"></i>
            <span className="text-xl">KMK Pencabutan</span>
          </div>
        </ModalHeader>
        <ModalBody className="pb-6">
          <Card>
            <CardBody>
              <Formik
                validationSchema={validationSchema}
                onSubmit={handleSubmitdata}
                enableReinitialize={true}
                initialValues={{
                  tunda: refPenundaan,
                  thang: "",
                  nomorkmk1: "",
                  tglkmk1: "",
                  uraian1: "",
                }}
              >
                {({
                  handleSubmit,
                  handleChange,
                  values,
                  setFieldValue,
                  errors,
                  touched,
                }) => (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Dasar Penundaan */}
                    <div className="w-full">
                      <label className="block text-sm font-medium mb-2">
                        Dasar Penundaan
                      </label>
                      <RefPenundaanCabut25
                        refPenundaan={values.tunda}
                        onChange={(selectedValue) => {
                          setFieldValue("tunda", selectedValue);
                          handlePenundaanKMK(selectedValue);
                        }}
                      />
                      <ErrorMessage
                        name="tunda"
                        component="div"
                        className="text-danger-500 text-sm mt-1"
                      />
                    </div>

                    {/* Row with Tahun, Nomor KMK, and Tanggal */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                      <div className="md:col-span-2">
                        <Input
                          label="Tahun"
                          placeholder="Tahun"
                          name="thang"
                          value={values.thang}
                          onChange={handleChange}
                          isInvalid={errors.thang && touched.thang}
                          errorMessage={errors.thang}
                          variant="bordered"
                        />
                      </div>
                      <div className="md:col-span-7">
                        <Input
                          label="Nomor ND/ KMK"
                          placeholder="Nomor ND/ KMK"
                          name="nomorkmk1"
                          value={values.nomorkmk1}
                          onChange={handleChange}
                          isInvalid={errors.nomorkmk1 && touched.nomorkmk1}
                          errorMessage={errors.nomorkmk1}
                          variant="bordered"
                        />
                      </div>
                      <div className="md:col-span-3">
                        <DatePicker
                          label="Tgl KMK"
                          placeholder="Pilih tanggal"
                          variant="bordered"
                          value={
                            values.tglkmk1
                              ? parseDate(
                                  moment(values.tglkmk1).format("YYYY-MM-DD")
                                )
                              : null
                          }
                          onChange={(date) => {
                            if (date) {
                              // Convert the date to moment format
                              const momentDate = moment(
                                `${date.year}-${String(date.month).padStart(
                                  2,
                                  "0"
                                )}-${String(date.day).padStart(2, "0")}`
                              );
                              setFieldValue(
                                "tglkmk1",
                                momentDate.format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
                                true
                              );
                            } else {
                              setFieldValue("tglkmk1", "", true);
                            }
                          }}
                          isInvalid={errors.tglkmk1 && touched.tglkmk1}
                          errorMessage={errors.tglkmk1}
                        />
                      </div>
                    </div>

                    {/* Uraian KMK */}
                    <div className="w-full">
                      <Input
                        label="Uraian KMK"
                        placeholder="Uraian ND/ KMK"
                        name="uraian1"
                        value={values.uraian1}
                        onChange={handleChange}
                        isInvalid={errors.uraian1 && touched.uraian1}
                        errorMessage={errors.uraian1}
                        variant="bordered"
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 mt-6">
                      <Button
                        type="submit"
                        color="danger"
                        size="sm"
                        isDisabled={loading}
                        className="min-w-[100px]"
                      >
                        {loading ? (
                          <div className="flex items-center gap-2">
                            <Spinner size="sm" color="white" />
                            Loading...
                          </div>
                        ) : (
                          "Simpan"
                        )}
                      </Button>
                      <Button
                        variant="flat"
                        size="sm"
                        onPress={handleModalClose}
                        className="min-w-[100px]"
                      >
                        Tutup
                      </Button>
                    </div>
                  </form>
                )}
              </Formik>
              <DataKmkCabut cek={cek} />
            </CardBody>
          </Card>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default RekamKMKModalCabut25;
