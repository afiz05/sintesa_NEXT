"use client";
import React, { useState, useContext } from "react";
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
  Spinner,
} from "@heroui/react";
import { X, Save, Database } from "lucide-react";
import MyContext from "../../../../utils/Context";
import { useToast } from "../../../../components/context/ToastContext";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

const SaveQueryModal = ({
  isOpen,
  onClose,
  query,
  thang,
  queryType = "INQUIRY",
}) => {
  const [loading, setLoading] = useState(false);
  const { axiosJWT, token, name } = useContext(MyContext);
  const { showToast } = useToast();

  const validationSchema = Yup.object().shape({
    queryName: Yup.string().required("Nama Query harus diisi"),
    queryType: Yup.string().required("Tipe Query harus dipilih"),
  });

  const initialValues = {
    queryName: "",
    queryType: queryType,
    thang: thang || new Date().getFullYear().toString(),
  };

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);

    try {
      const formData = {
        tipe: values.queryType,
        nama: values.queryName,
        name: name,
        query: query,
        thang: values.thang,
      };

      await axiosJWT.post(
        `${process.env.NEXT_PUBLIC_LOCAL_SIMPANQUERY}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      showToast("Query berhasil disimpan", "success");
      resetForm();
      onClose();
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Gagal menyimpan query";
      showToast(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" scrollBehavior="inside">
      <ModalContent>
        <ModalHeader className="flex justify-between items-center">
          <div className="text-lg font-semibold flex items-center">
            <Database className="mr-2 text-blue-600" size={20} />
            Simpan Query
          </div>
        </ModalHeader>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, isSubmitting }) => (
            <Form>
              <ModalBody>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tahun Anggaran
                    </label>
                    <Input
                      name="thang"
                      value={values.thang}
                      onChange={handleChange}
                      disabled
                      className="bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tipe Query
                    </label>
                    <Select
                      name="queryType"
                      value={values.queryType}
                      onChange={handleChange}
                      disabled={loading}
                    >
                      <SelectItem key="INQUIRY" value="INQUIRY">
                        Inquiry
                      </SelectItem>
                      <SelectItem key="BELANJA" value="BELANJA">
                        Belanja
                      </SelectItem>
                      <SelectItem key="PENERIMAAN" value="PENERIMAAN">
                        Penerimaan
                      </SelectItem>
                      <SelectItem key="BLOKIR" value="BLOKIR">
                        Blokir
                      </SelectItem>
                    </Select>
                    {errors.queryType && touched.queryType && (
                      <div className="text-red-500 text-xs mt-1">
                        {errors.queryType}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nama Query
                    </label>
                    <Input
                      name="queryName"
                      value={values.queryName}
                      onChange={handleChange}
                      placeholder="Masukkan nama untuk query ini..."
                      disabled={loading}
                    />
                    {errors.queryName && touched.queryName && (
                      <div className="text-red-500 text-xs mt-1">
                        {errors.queryName}
                      </div>
                    )}
                  </div>

                  <div className="text-xs text-gray-500 italic">
                    *) Query yang tersimpan dapat diakses di menu Profile, tab
                    Query Data
                  </div>
                </div>
              </ModalBody>

              <ModalFooter className="flex justify-between">
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  disabled={loading}
                  startContent={<X size={16} />}
                >
                  Batal
                </Button>

                <Button
                  color="primary"
                  type="submit"
                  disabled={loading}
                  startContent={
                    loading ? <Spinner size="sm" /> : <Save size={16} />
                  }
                >
                  {loading ? "Menyimpan..." : "Simpan Query"}
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default SaveQueryModal;
