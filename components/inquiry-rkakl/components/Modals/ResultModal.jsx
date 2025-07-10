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
import { X, Download, Search } from "lucide-react";
import MyContext from "../../../../utils/Context";
import { handleHttpError } from "../../../notifikasi/toastError";
import DataExport from "../../../CSV/formatCSV";
import numeral from "numeral";
import Encrypt from "../../../../utils/Encrypt";

const ResultModal = ({ isOpen, onClose, query, title, username }) => {
  const { axiosJWT, token } = useContext(MyContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [fullscreen, setFullscreen] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(50);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [totalPagu, setTotalPagu] = useState(0);
  const [totalRealisasi, setTotalRealisasi] = useState(0);
  const [totalBlokir, setTotalBlokir] = useState(0);
  const [searchText, setSearchText] = useState("");
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
          String(value).toLowerCase().includes(searchText.toLowerCase())
        )
      );
      setFilteredData(filtered);
    }
  }, [data, searchText]);

  const getData = async () => {
    setError("");
    setLoading(true);
    const encodedQuery = encodeURIComponent(query);
    const encryptedQuery = Encrypt(encodedQuery);

    try {
      const response = await axiosJWT.get(
        `${
          process.env.NEXT_PUBLIC_LOCAL_INQUIRYBELANJA
        }${encryptedQuery}&page=${page - 1}&limit=${limit}&user=${username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(response.data.result.filter((item) => item.kddept !== "000"));
      setFilteredData(
        response.data.result.filter((item) => item.kddept !== "000")
      );
      setTotalPages(response.data.totalPages);
      setTotalRows(response.data.totalRows);
      setTotalPagu(response.data.totalPagu || 0);
      setTotalRealisasi(response.data.totalRealisasi || 0);
      setTotalBlokir(response.data.totalBlokir || 0);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const { status, data } = error.response || {};
      handleHttpError(
        status,
        (data && data.error) ||
          "Terjadi Permasalahan Koneksi atau Server Backend"
      );
    }
  };

  const columns = Object.keys(data[0] || {});
  const numericColumns = columns.filter(
    (col) =>
      (data.length > 0 && typeof data[0][col] === "number") ||
      (data.length > 0 && !isNaN(Number(data[0][col])) && data[0][col] !== "")
  );

  // Calculate column totals for numeric columns
  const columnTotals = {};
  if (data.length > 0) {
    numericColumns.forEach((col) => {
      columnTotals[col] = data.reduce(
        (sum, row) => sum + Number(row[col] || 0),
        0
      );
    });
  }

  const handlePageChange = (page) => {
    setPage(page);
  };

  const formatDate = () => {
    const now = new Date();
    return now.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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
          <div>{title || "Query Results"}</div>
          <div className="flex items-center space-x-3">
            <Checkbox
              isSelected={fullscreen}
              onValueChange={setFullscreen}
              size="sm"
            >
              Fullscreen
            </Checkbox>
            <Button
              isIconOnly
              color="danger"
              variant="light"
              onPress={onClose}
              aria-label="Close"
            >
              <X size={20} />
            </Button>
          </div>
        </ModalHeader>

        <ModalBody>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Spinner size="lg" />
            </div>
          ) : filteredData.length === 0 ? (
            <div className="text-center text-danger py-10">
              Data Tidak Ditemukan
            </div>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
                <div className="text-sm">
                  <p>Data diambil pada: {formatDate()}</p>
                  {totalPagu > 0 && (
                    <div className="mt-1">
                      <p>Total Pagu: Rp {numeral(totalPagu).format("0,0")}</p>
                      <p>
                        Total Realisasi: Rp{" "}
                        {numeral(totalRealisasi).format("0,0")} (
                        {((totalRealisasi / totalPagu) * 100).toFixed(2)}%)
                      </p>
                      {totalBlokir > 0 && (
                        <p>
                          Total Blokir: Rp {numeral(totalBlokir).format("0,0")}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <div className="relative w-full sm:w-64">
                    <Input
                      placeholder="Search..."
                      value={searchText}
                      onValueChange={setSearchText}
                      startContent={<Search size={16} />}
                      size="sm"
                    />
                  </div>

                  <DataExport
                    data={data}
                    filename={`query_results_${new Date()
                      .toISOString()
                      .slice(0, 10)}.csv`}
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0 z-10">
                    <tr>
                      <th className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                        No
                      </th>
                      {columns.map((column, index) => (
                        <th
                          key={index}
                          className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
                        >
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredData.map((row, rowIndex) => (
                      <tr key={rowIndex} className="hover:bg-gray-50">
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-center">
                          {rowIndex + 1 + (page - 1) * limit}
                        </td>
                        {columns.map((column, colIndex) => (
                          <td
                            key={colIndex}
                            className={`px-3 py-2 whitespace-nowrap text-sm ${
                              numericColumns.includes(column)
                                ? "text-right"
                                : "text-center"
                            }`}
                          >
                            {numericColumns.includes(column)
                              ? numeral(row[column]).format("0,0")
                              : row[column]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                  {Object.keys(columnTotals).length > 0 && (
                    <tfoot className="bg-gray-100 sticky bottom-0">
                      <tr>
                        <td
                          colSpan={
                            columns.length -
                            Object.keys(columnTotals).length +
                            1
                          }
                          className="px-3 py-2 text-sm font-medium text-right"
                        >
                          TOTAL
                        </td>
                        {columns.map((column, index) =>
                          numericColumns.includes(column) ? (
                            <td
                              key={index}
                              className="px-3 py-2 text-sm font-medium text-right"
                            >
                              {numeral(columnTotals[column]).format("0,0")}
                            </td>
                          ) : null
                        )}
                      </tr>
                    </tfoot>
                  )}
                </table>
              </div>
            </>
          )}
        </ModalBody>

        {!loading && filteredData.length > 0 && (
          <ModalFooter className="flex flex-col sm:flex-row justify-between items-center">
            <div className="text-sm text-gray-600 mb-3 sm:mb-0">
              Total Rows: {numeral(totalRows).format("0,0")} | Page {page} of{" "}
              {totalPages}
            </div>
            <Pagination
              total={totalPages}
              initialPage={page}
              onChange={handlePageChange}
              showControls
              size="sm"
            />
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ResultModal;
