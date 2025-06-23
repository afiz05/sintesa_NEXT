import React, { useState, useContext, useEffect } from "react";
import MyContext from "../../utils/Context";
import numeral from "numeral";
// import { Modal, Spinner, Form } from "react-bootstrap"
import { Dialog, Transition } from "@headlessui/react";
import ReactPaginate from "react-paginate";
import { Tgupdate } from "./hasilQuery";
import DataExport from "../CSV/formatCSV";
import Encrypt from "../../utils/Encrypt";
// import "../../layout/layout.css";
import { handleHttpError } from "../notifikasi/toastError";

const HasilQueryApbn = (props) => {
  const { showModalApbn, closeModalApbn } = props;
  const { axiosJWT, token, username } = useContext(MyContext);
  const [loading, setLoading] = useState(false);
  const [sql] = useState(props.queryApbn);
  const [data, setData] = useState([]);
  const [fulls, setFulls] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(50);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [msg, setMsg] = useState("");

  const [totPaguDIPA, settotPaguDIPA] = useState(0);
  const [totPaguAPBN, settotPaguAPBN] = useState(0);
  const [totalrealisasi, setTotalrealisasi] = useState(0);
  const [totBlokir, settotBlokir] = useState(0);
  const [fit, setFit] = useState("table-scroll");

  useEffect(() => {
    getData();
  }, [sql, page]);

  function full(event) {
    const isChecked = event.target.checked;
    setFulls(isChecked);
    isChecked ? setFit("table-scroll2") : setFit("table-scroll");
  }

  const getData = async () => {
    setLoading(true);
    const encodedQuery = encodeURIComponent(sql.replace(/%/g, "%%"));
    const encryptedQuery = Encrypt(encodedQuery);
    try {
      const response = await axiosJWT.get(
        process.env.NEXT_PUBLIC_LOCAL_INQUIRY_GETDATA_APBN
          ? `${process.env.NEXT_PUBLIC_LOCAL_INQUIRY_GETDATA_APBN}${encryptedQuery}&page=${page}&limit=${limit}&user=${username}`
          : "",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(response.data.result.filter((item) => item.kddept !== "000"));
      setPages(response.data.totalPages);
      setRows(response.data.totalRows);
      settotPaguAPBN(response.data.pagu_apbn);
      settotPaguDIPA(response.data.pagu_dipa);
      setTotalrealisasi(response.data.realisasi);
      settotBlokir(response.data.blokir);
      setLoading(false);
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

  const tutupModalApbn = () => {
    closeModalApbn();
  };

  const columns = Object.keys(data[0] || {});
  const jumlahKolom = Object.keys(data[0] || {}).length;
  const columnTotals = new Array(4).fill(0);

  data.forEach((row) => {
    for (
      let cellIndex = jumlahKolom - 4;
      cellIndex < jumlahKolom;
      cellIndex++
    ) {
      columnTotals[cellIndex - (jumlahKolom - 4)] += Number(
        row[Object.keys(row)[cellIndex]]
      );
    }
  });
  const changePage = ({ selected }) => {
    setPage(selected);
    setFulls(true);
    setFit("table-scroll2");
    if (selected === 9) {
      setMsg(
        "Jika tidak menemukan data yang Anda cari, silahkan cari data dengan kata kunci spesifik!"
      );
    } else {
      setMsg("");
    }
  };
  return (
    <>
      {/* <Modal
        onHide={tutupModalApbn}
        show={showModalApbn}
        backdrop="static"
        keyboard={false}
        size="xl"
        animation={false}
        fullscreen={fulls}
        dialogClassName="custom-modal"
        contentClassName="modal-content"
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "15px" }}>
            <span>
              <Form.Check
                inline
                className="fw-normal mx-2 text-dark"
                type="checkbox"
                label="Full Screen"
                onChange={full}
                checked={fulls}
              />
            </span>
          </Modal.Title>
        </Modal.Header>
        {loading && (
          <div className="loading-container">
            <Spinner
              className="loading-spinner"
              as="span"
              animation="border"
              size="md"
              role="status"
              aria-hidden="true"
            />
          </div>
        )}
        <Modal.Body> */}
      <Transition.Root show={showModalApbn} as={React.Fragment}>
        <Dialog as="div" className="relative z-50" onClose={tutupModalApbn}>
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
                <Dialog.Panel
                  className={`w-full ${
                    fulls ? "max-w-full h-screen" : "max-w-6xl"
                  } transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="fullscreen-check"
                        className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        onChange={full}
                        checked={fulls}
                      />
                      <label
                        htmlFor="fullscreen-check"
                        className="text-sm font-medium text-gray-900"
                      >
                        Full Screen
                      </label>
                    </div>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-600"
                      onClick={tutupModalApbn}
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
                  {loading && (
                    <div className="flex justify-center items-center py-8">
                      <svg
                        className="animate-spin h-8 w-8 text-blue-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        ></path>
                      </svg>
                    </div>
                  )}
                  <>
                    {rows === 0 ? (
                      <>
                        {!loading && (
                          <p className="text-danger text-center">
                            Data Tidak Ditemukan
                          </p>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="d-flex justify-content-between my-2">
                          <div>
                            <Tgupdate thang={props.thang} />
                          </div>

                          <div>
                            <DataExport data={data} filename="data.csv" />
                          </div>
                        </div>
                      </>
                    )}

                    <div className={fit}>
                      <table
                        className="table real-table table-hover table-responsive "
                        width="100%"
                      >
                        <thead>
                          <tr>
                            {data.length > 0 && (
                              <th className="text-header">No</th>
                            )}
                            {columns.map((column, index) => (
                              <th key={index} className="text-header">
                                {column}
                              </th>
                            ))}
                          </tr>
                        </thead>

                        <tbody>
                          {data.map((row, index) => (
                            <tr key={index}>
                              <td className="text-tengah">
                                {index + 1 + page * limit}
                              </td>
                              {Object.values(row).map((cell, index) => (
                                <React.Fragment key={index}>
                                  {index > jumlahKolom - 5 ? (
                                    <td className="text-kanan">
                                      {numeral(cell).format("0,0")}
                                    </td>
                                  ) : (
                                    <td className="text-tengah">{cell}</td>
                                  )}
                                </React.Fragment>
                              ))}
                            </tr>
                          ))}
                        </tbody>

                        {jumlahKolom !== 0 && (
                          <tfoot>
                            <tr>
                              <td
                                className="text-end baris-total"
                                colSpan={jumlahKolom - 3}
                              >
                                SUB TOTAL
                              </td>
                              {columnTotals.map((total, totalIndex) => (
                                <td
                                  key={totalIndex}
                                  className="text-end baris-total"
                                >
                                  {numeral(total).format("0,0")}
                                </td>
                              ))}
                            </tr>
                            <tr>
                              <td
                                className="text-end baris-total fw-bold"
                                colSpan={jumlahKolom - 3}
                              >
                                TOTAL
                              </td>
                              <td className="text-end baris-total fw-bold">
                                {numeral(totPaguAPBN).format("0,0")}
                              </td>
                              <td className="text-end baris-total fw-bold">
                                {numeral(totPaguDIPA).format("0,0")}
                              </td>

                              <td className="text-end baris-total fw-bold">
                                {numeral(totalrealisasi).format("0,0")}
                              </td>
                              <td className="text-end baris-total fw-bold">
                                {numeral(totBlokir).format("0,0")}
                              </td>
                            </tr>
                          </tfoot>
                        )}
                      </table>
                    </div>
                  </>

                  {data.length > 0 && (
                    <>
                      <p className="pagination justify-content-between mt-2 ">
                        <span>
                          Total : {numeral(rows).format("0,0")}, &nbsp; Hal :{" "}
                          {rows ? page + 1 : 0} dari {pages}
                        </span>
                        {/* <p className="text-center text-danger">{msg}</p> */}
                        <nav>
                          <ReactPaginate
                            breakLabel="..."
                            nextLabel="›"
                            onPageChange={changePage}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={1}
                            pageCount={pages}
                            previousLabel="‹"
                            renderOnZeroPageCount={null}
                            containerClassName="justify-content-center pagination"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            activeClassName="active"
                            disabledClassName="disabled"
                          />
                        </nav>{" "}
                      </p>
                    </>
                  )}
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
export default HasilQueryApbn;
