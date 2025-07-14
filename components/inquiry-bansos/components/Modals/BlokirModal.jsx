"use client";
import React, { useState, useEffect, useContext } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Spinner,
  Checkbox,
  Pagination,
  Input,
} from "@heroui/react";
import { X, Search } from "lucide-react";
import MyContext from "../../../../utils/Context";
import { handleHttpError } from "../../../notifikasi/toastError";
import DataExport from "../../../CSV/formatCSV";
import numeral from "numeral";
import { Tgupdate } from "../../hasilQuery";

const BlokirModal = ({ isOpen, onClose, query, title, thang }) => {
  const { axiosJWT, token } = useContext(MyContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [hasError, setHasError] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [page, setPage] = useState(0);
  const [limit] = useState(50);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [message, setMessage] = useState("");
  const [tableClass, setTableClass] = useState("table-scroll");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (isOpen && query) {
      getData();
    }
  }, [isOpen, query, page]);

  useEffect(() => {
    if (data.length > 0) {
      const filtered = data.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  }, [data, searchTerm]);

  const handleFullscreenToggle = (event) => {
    const isChecked = event.target.checked;
    setFullscreen(isChecked);
    setTableClass(isChecked ? "table-scroll2" : "table-scroll");
  };

  const getData = async () => {
    setError("");
    setHasError(false);
    setLoading(true);
    const encodedQuery = encodeURIComponent(query);

    try {
      const response = await axiosJWT.get(
        process.env.NEXT_PUBLIC_LOCAL_INQUIRY
          ? `${process.env.NEXT_PUBLIC_LOCAL_INQUIRY}${encodedQuery}&page=${page}&limit=${limit}`
          : "",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const resultData = response.data.result || [];
      setData(resultData);
      setPages(response.data.totalPages);
      setRows(response.data.totalRows);
    } catch (error) {
      const { status, data } = error.response || {};
      handleHttpError(
        status,
        (data && data.error) ||
          "Terjadi Permasalahan Koneksi atau Server Backend"
      );
      setHasError(true);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = ({ selected }) => {
    setPage(selected);
    setFullscreen(true);
    setTableClass("table-scroll2");
    if (selected === 9) {
      setMessage(
        "Jika tidak menemukan data yang Anda cari, silahkan cari data dengan kata kunci spesifik!"
      );
    } else {
      setMessage("");
    }
  };

  // Determine columns and which ones are numeric
  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  // Identify numeric columns
  const numericColumns = columns.reduce((acc, column) => {
    // Check if it contains numeric data in most rows
    const numericCount = data.reduce((count, row) => {
      const value = row[column];
      return !isNaN(Number(value)) && value !== "" && typeof value !== "boolean"
        ? count + 1
        : count;
    }, 0);

    // If more than 70% of rows have numeric values in this column, consider it numeric
    if (data.length > 0 && numericCount / data.length > 0.7) {
      acc[column] = true;
    }
    return acc;
  }, {});

  // Calculate column totals for numeric columns
  const columnTotals = columns.reduce((acc, column) => {
    if (numericColumns[column]) {
      acc[column] = data.reduce((sum, row) => {
        const value = Number(row[column]);
        return !isNaN(value) ? sum + value : sum;
      }, 0);
    }
    return acc;
  }, {});

  // Format column headers to capitalize first letter
  const formatColumnHeader = (column) => {
    return column.charAt(0).toUpperCase() + column.slice(1);
  };

  // Determine if a column is a status column (for special formatting)
  const isStatusColumn = (column) => {
    return (
      column.toLowerCase().includes("status") ||
      column.toLowerCase().includes("blokir") ||
      column.toLowerCase().includes("flag")
    );
  };

  // Get status class based on value
  const getStatusClass = (value) => {
    const strValue = String(value).toLowerCase();
    if (
      strValue.includes("blokir") ||
      strValue.includes("block") ||
      strValue === "y" ||
      strValue === "1"
    ) {
      return "bg-red-100 text-red-800";
    } else if (
      strValue.includes("aktif") ||
      strValue === "n" ||
      strValue === "0"
    ) {
      return "bg-green-100 text-green-800";
    }
    return "";
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={fullscreen ? "full" : "5xl"}
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader className="flex justify-between items-center">
          <div className="text-lg font-semibold">{title || "Data Blokir"}</div>
          <div className="flex items-center space-x-2">
            <Checkbox
              isSelected={fullscreen}
              onValueChange={setFullscreen}
              onChange={handleFullscreenToggle}
              size="sm"
            >
              <span className="text-sm">Layar Penuh</span>
            </Checkbox>
          </div>
        </ModalHeader>

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-50">
            <Spinner size="lg" color="primary" />
          </div>
        )}

        <ModalBody>
          {rows === 0 ? (
            !loading && (
              <p className="text-danger text-center py-8">
                Data Tidak Ditemukan
              </p>
            )
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <Tgupdate thang={thang} />
                </div>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Cari data..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    startContent={<Search size={16} />}
                    size="sm"
                    className="w-64"
                  />
                  <DataExport data={data} filename="data_blokir.csv" />
                </div>
              </div>

              <div className={tableClass}>
                <table className="w-full border-collapse min-w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border px-2 py-1 text-center">No</th>
                      {columns.map((column, index) => (
                        <th
                          key={index}
                          className="border px-2 py-1 text-center"
                        >
                          {formatColumnHeader(column)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(searchTerm ? filteredData : data).map((row, rowIndex) => (
                      <tr key={rowIndex} className="hover:bg-gray-50">
                        <td className="border px-2 py-1 text-center">
                          {rowIndex + 1 + page * limit}
                        </td>
                        {columns.map((column, colIndex) => {
                          const cellValue = row[column];
                          const isNumeric = numericColumns[column];
                          const isStatus = isStatusColumn(column);

                          return (
                            <td
                              key={colIndex}
                              className={`border px-2 py-1 ${
                                isNumeric
                                  ? "text-right"
                                  : isStatus
                                  ? "text-center"
                                  : "text-center"
                              } ${isStatus ? getStatusClass(cellValue) : ""}`}
                            >
                              {isNumeric && !isNaN(Number(cellValue))
                                ? numeral(cellValue).format("0,0")
                                : cellValue}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                  {rows > 0 && (
                    <tfoot>
                      <tr className="bg-gray-100 font-semibold">
                        <td className="border px-2 py-1 text-right" colSpan={2}>
                          TOTAL
                        </td>
                        {columns.slice(1).map((column, index) => {
                          const isNumeric = numericColumns[column];
                          const total = columnTotals[column];

                          return (
                            <td
                              key={index}
                              className={`border px-2 py-1 ${
                                isNumeric ? "text-right" : "text-center"
                              }`}
                            >
                              {isNumeric && total
                                ? numeral(total).format("0,0")
                                : ""}
                            </td>
                          );
                        })}
                      </tr>
                    </tfoot>
                  )}
                </table>
              </div>

              {rows > 0 && (
                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm">
                    Total Baris: {numeral(rows).format("0,0")}, Halaman:{" "}
                    {page + 1} dari {pages}
                  </div>
                  <Pagination
                    total={pages}
                    initialPage={page + 1}
                    onChange={(page) =>
                      handlePageChange({ selected: page - 1 })
                    }
                  />
                </div>
              )}

              {message && (
                <p className="text-center text-red-500 mt-2">{message}</p>
              )}
            </>
          )}
        </ModalBody>

        <ModalFooter>
          <Button
            color="danger"
            variant="light"
            onPress={onClose}
            startContent={<X size={16} />}
          >
            Tutup
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BlokirModal;
