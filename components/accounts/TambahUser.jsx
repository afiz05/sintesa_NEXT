"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  Switch,
  Card,
  CardBody,
  Divider,
} from "@heroui/react";
import React, { useState, useEffect, useContext } from "react";
import {
  Eye,
  EyeOff,
  User,
  Lock,
  IdCard,
  Building,
  MapPin,
} from "lucide-react";
import { useToast } from "../context/ToastContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Import data JSON
import kdkanwilData from "@/data/Kdkanwil.json";
import kdkppnData from "@/data/Kdkppn.json";
import kdlokasiData from "@/data/Kdlokasi.json";
import MyContext from "@/utils/Context";

const TambahUser = ({ isOpen, onClose, onUserAdded }) => {
  const { showToast } = useToast();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { axiosJWT } = useContext(MyContext);

  const roleOptions = [
    { key: "0", label: "Admin" },
    { key: "1", label: "Direktorat PA" },
    { key: "2", label: "Kantor Pusat" },
    { key: "3", label: "Kanwil" },
    { key: "4", label: "KPPN" },
  ];

  // Inisialisasi Formik
  const initialValues = {
    username: "",
    password: "",
    nama: "",
    nip: "",
    role: "",
    active: true,
    kdlokasi: "",
    kdkanwil: "",
    kdkppn: "",
  };

  // Validasi menggunakan Yup
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "Username minimal 3 karakter")
      .required("Username wajib diisi"),
    password: Yup.string()
      .min(6, "Password minimal 6 karakter")
      .required("Password wajib diisi"),
    nama: Yup.string().required("Nama wajib diisi"),
    nip: Yup.string()
      .matches(/^[0-9]+$/, "NIP hanya boleh berisi angka")
      .length(18, "NIP harus terdiri dari 18 digit")
      .required("NIP wajib diisi"),

    role: Yup.string().required("Role wajib dipilih"),

    kdkanwil: Yup.string().when("role", {
      is: (role) => ["3", "4"].includes(role),
      then: () => Yup.string().required("Kanwil wajib dipilih"),
      otherwise: () => Yup.string().notRequired(),
    }),
    kdkppn: Yup.string().when("role", {
      is: "4",
      then: () => Yup.string().required("KPPN wajib dipilih"),
      otherwise: () => Yup.string().notRequired(),
    }),
  });

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setIsVisible(false);
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
      scrollBehavior="inside"
      closeButton
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
            Rekam User
          </h2>
        </ModalHeader>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, actions) => {
            setIsLoading(true);
            try {
              const res = await axiosJWT.post(
                process.env.NEXT_PUBLIC_REKAM_USER,
                values
              );
              const data = await res.data.success;
              if (data) {
                showToast("User berhasil ditambahkan", "success");
                onUserAdded?.();
                onClose();
              } else {
                showToast(data.error || "Gagal menambahkan user", "error");
              }
            } catch (err) {
              showToast(err.response?.data?.message || err.message, "error");
            } finally {
              setIsLoading(false);
              actions.setSubmitting(false);
            }
          }}
        >
          {({ values, setFieldValue, isSubmitting, errors, touched }) => {
            // Filter data berdasarkan pilihan
            const filteredKanwil = values.kdlokasi
              ? kdkanwilData.filter((k) => k.kdlokasi === values.kdlokasi)
              : [];
            const filteredKppn = values.kdkanwil
              ? kdkppnData.filter((k) => k.kdkanwil === values.kdkanwil)
              : [];

            return (
              <Form>
                <ModalBody>
                  <Card className="border">
                    <CardBody className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Field name="username">
                          {({ field }) => (
                            <Input
                              label="Username"
                              {...field}
                              variant="bordered"
                              isInvalid={touched.username && errors.username}
                              color={
                                touched.username && errors.username
                                  ? "danger"
                                  : "default"
                              }
                              className={
                                touched.username && errors.username
                                  ? "border-red-500"
                                  : ""
                              }
                            />
                          )}
                        </Field>

                        <Field name="password">
                          {({ field }) => (
                            <Input
                              label="Password"
                              type={isVisible ? "text" : "password"}
                              {...field}
                              endContent={
                                <button
                                  type="button"
                                  onClick={() => setIsVisible((v) => !v)}
                                >
                                  {isVisible ? <EyeOff /> : <Eye />}
                                </button>
                              }
                              variant="bordered"
                              isInvalid={touched.password && errors.password}
                              color={
                                touched.password && errors.password
                                  ? "danger"
                                  : "default"
                              }
                              className={
                                touched.password && errors.password
                                  ? "border-red-500"
                                  : ""
                              }
                            />
                          )}
                        </Field>

                        <Field name="nama">
                          {({ field }) => (
                            <Input
                              label="Nama Lengkap"
                              {...field}
                              variant="bordered"
                              isInvalid={touched.nama && errors.nama}
                              color={
                                touched.nama && errors.nama
                                  ? "danger"
                                  : "default"
                              }
                              className={
                                touched.nama && errors.nama
                                  ? "border-red-500"
                                  : ""
                              }
                            />
                          )}
                        </Field>

                        <Field name="nip">
                          {({ field }) => (
                            <Input
                              label="NIP "
                              {...field}
                              variant="bordered"
                              isInvalid={touched.nip && errors.nip}
                              color={
                                touched.nip && errors.nip ? "danger" : "default"
                              }
                              className={
                                touched.nip && errors.nip
                                  ? "border-red-500"
                                  : ""
                              }
                            />
                          )}
                        </Field>

                        <Field name="role">
                          {({ field }) => (
                            <div className="col-span-2">
                              <Select
                                label="Role"
                                {...field}
                                variant="bordered"
                                className="w-full"
                                isInvalid={touched.role && errors.role}
                                color={
                                  touched.role && errors.role
                                    ? "danger"
                                    : "default"
                                }
                              >
                                <SelectItem
                                  key="placeholder"
                                  value=""
                                  isPlaceholder
                                >
                                  Pilih Role
                                </SelectItem>

                                {roleOptions.map((role) => (
                                  <SelectItem key={role.key} value={role.key}>
                                    {role.label}
                                  </SelectItem>
                                ))}
                              </Select>
                            </div>
                          )}
                        </Field>
                      </div>

                      {/* Role based fields */}
                      {["3", "4"].includes(values.role) && (
                        <div className="space-y-4">
                          <Divider />

                          {/* Select Kanwil */}
                          <Select
                            label="Kanwil"
                            value={values.kdkanwil}
                            onChange={(e) =>
                              setFieldValue("kdkanwil", e.target.value)
                            }
                            variant="bordered"
                            isInvalid={touched.kdkanwil && errors.kdkanwil}
                            color={
                              touched.kdkanwil && errors.kdkanwil
                                ? "danger"
                                : "default"
                            }
                          >
                            <SelectItem value="">Pilih Kanwil</SelectItem>{" "}
                            {/* pastikan value="" */}
                            {kdkanwilData.map((kanwil) => (
                              <SelectItem
                                key={kanwil.kdkanwil}
                                value={kanwil.kdkanwil}
                              >
                                {kanwil.nmkanwil}
                              </SelectItem>
                            ))}
                          </Select>
                        </div>
                      )}

                      {/* KPPN hanya untuk role 4 */}
                      {values.role === "4" && (
                        <div className="space-y-4">
                          <Divider />

                          <Select
                            label="KPPN"
                            value={values.kdkppn}
                            onChange={(e) =>
                              setFieldValue("kdkppn", e.target.value)
                            }
                            variant="bordered"
                            isDisabled={!values.kdkanwil}
                            isInvalid={touched.kdkppn && errors.kdkppn}
                            color={
                              touched.kdkppn && errors.kdkppn
                                ? "danger"
                                : "default"
                            }
                          >
                            <SelectItem value="">Pilih KPPN</SelectItem>
                            {kdkppnData
                              .filter(
                                (kppn) =>
                                  kppn.kdkanwil === values.kdkanwil &&
                                  kppn.kdkppn &&
                                  kppn.nmkppn
                              )
                              .map((kppn) => (
                                <SelectItem
                                  key={kppn.kdkppn}
                                  value={kppn.kdkppn}
                                >
                                  {kppn.nmkppn}
                                </SelectItem>
                              ))}
                          </Select>
                        </div>
                      )}
                      <Divider />
                      <div className="flex items-center">
                        <Field
                          name="active"
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-small text-gray-600 dark:text-gray-400">
                          User Aktif
                        </span>
                      </div>
                    </CardBody>
                  </Card>
                </ModalBody>
                <ModalFooter>
                  <Button
                    variant="light"
                    color="danger"
                    onPress={onClose}
                    isDisabled={isSubmitting}
                  >
                    Batal
                  </Button>
                  <Button
                    color="primary"
                    type="submit"
                    isLoading={isLoading}
                    disabled={isSubmitting}
                  >
                    {isLoading ? "Menyimpan..." : "Simpan User"}
                  </Button>
                </ModalFooter>
              </Form>
            );
          }}
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default TambahUser;
