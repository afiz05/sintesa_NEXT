import React, { useState, useContext, useEffect } from "react";
// import { Modal, Spinner, Alert, Button } from "react-bootstrap";
import { Dialog, Transition } from "@headlessui/react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

// import { Loading2 } from "../../layout/LoadingTable";
import Swal from "sweetalert2";
import { handleHttpError } from "../notifikasi/toastError";
import MyContext from "../../utils/Context";

export const Simpan = (props) => {
  const { showModalsimpan, closeModalsimpan } = props;
  const [loading, setLoading] = useState(false);
  const { axiosJWT, token, name } = useContext(MyContext);
  const [dataerror, setError] = useState("");
  const [initialValues, setInitialValues] = useState({
    nama: "",
    tipe: props.jenis,
    name: name,
    query: props.query2,
    thang: props.thang,
  });

  const tutupModalsimpan = () => {
    closeModalsimpan();
  };
  const validationSchema = Yup.object().shape({
    tipe: Yup.string().required("tipe Harus Diisi"),
    nama: Yup.string().required("Nama Query Harus Diisi"),
  });

  const saveUser = async (values) => {
    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append("tipe", values.tipe);
    formData.append("nama", values.nama);
    formData.append("name", values.name);
    formData.append("query", values.query);
    formData.append("thang", values.thang);

    try {
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
      setLoading(false);
      Swal.fire({
        html: `<div className='text-success mt-4'>Query Berhasil Disimpan</div>`,
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
      closeModalsimpan();
    } catch (error) {
      const { status, data } = error.response || {};
      handleHttpError(
        status,
        (data && data.error) ||
          "Terjadi Permasalahan Koneksi atau Server Backend"
      );

      setLoading(false);
    }
  };

  return (
    <>
      {/* <Modal
        onHide={tutupModalsimpan}
        show={showModalsimpan}
        backdrop="static"
        keyboard={false}
        size="md"
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "18px" }} className="text-dark">
            {" "}
            <i className="bi bi-sd-card-fill mx-2 text-primary"></i>Simpan Query
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: "auto" }}> */}
      <Transition.Root show={showModalsimpan} as={React.Fragment}>
        <Dialog as="div" className="relative z-50" onClose={tutupModalsimpan}>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-between items-center mb-4">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      <i className="bi bi-sd-card-fill mx-2 text-blue-600"></i>
                      Simpan Query
                    </Dialog.Title>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-600"
                      onClick={tutupModalsimpan}
                    >
                      <span className="sr-only">Close</span>
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={saveUser}
                    enableReinitialize={true}
                  >
                    {({ values, setFieldValue }) =>
                      loading ? (
                        <div className="text-center">Loading ...</div>
                      ) : (
                        <>
                          <Form>
                            {/* <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-3 col-form-label text-dark"
                      >
                        TA
                      </label>
                      <div className="col-sm-9"> */}
                            <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                TA
                              </label>
                              <div>
                                <Field
                                  type="thang"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-100"
                                  name="thang"
                                  placeholder="thang"
                                  disabled
                                />
                                <ErrorMessage
                                  name="thang"
                                  component="div"
                                  className="text-red-600 text-sm mt-1"
                                />
                              </div>
                            </div>
                            {/* <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-3 col-form-label text-dark"
                      >
                        Tipe
                      </label>
                      <div className="col-sm-9"> */}
                            <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tipe
                              </label>
                              <div>
                                <Field
                                  type="tipe"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-100"
                                  name="tipe"
                                  placeholder="tipe"
                                  disabled
                                />
                                <ErrorMessage
                                  name="tipe"
                                  component="div"
                                  className="text-red-600 text-sm mt-1"
                                />
                              </div>
                            </div>
                            {/* <div className="row mb-3">
                      <label
                        htmlFor="inputText"
                        className="col-sm-3 col-form-label text-dark"
                      >
                        Nama Query
                      </label>
                      <div className="col-sm-9"> */}
                            <div className="mb-4">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nama Query
                              </label>
                              <div>
                                <Field
                                  type="nama"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                  name="nama"
                                  placeholder="nama singkat query..."
                                />
                                <ErrorMessage
                                  name="nama"
                                  component="div"
                                  className="text-red-600 text-sm mt-1"
                                />
                                <div className="italic text-gray-500 text-sm mt-2">
                                  *) query yang tersimpan bisa diakses di menu
                                  profile, pilih tab Query Data
                                </div>
                              </div>
                            </div>
                            {/* <div className="row mb-3">
                      <div className="col-sm-3"></div>
                      <div className="col-sm-9 d-flex justify-content-end">
                        <Button
                          variant="danger"
                          type="submit"
                          className="mx-2"
                          size="xs"
                        >
                          Simpan
                        </Button>
                      </div>
                    </div> */}
                            <div className="flex justify-end">
                              <button
                                type="submit"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                              >
                                Simpan
                              </button>
                            </div>
                            <hr className="my-4" />
                          </Form>
                        </>
                      )
                    }
                  </Formik>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      {/* </Modal.Body>
      </Modal> */}
    </>
  );
};
