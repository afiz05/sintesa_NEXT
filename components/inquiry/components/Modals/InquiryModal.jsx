"use client";
import React, { useState, useEffect, useContext, useMemo } from "react";
import MyContext from "../../../../utils/Context";
import { handleHttpError } from "../../../notifikasi/toastError";
import numeral from "numeral";
import { Search, X, Download } from "lucide-react";
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
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import DataExport from "../../../CSV/formatCSV";

const InquiryModal = ({ isOpen, onClose, sql, from, thang }) => {
  const { axiosJWT, token, statusLogin } = useContext(MyContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0); // 0-indexed for pagination
  const [totalData, setTotalData] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [executionTime, setExecutionTime] = useState(null);
  const [fullscreen, setFullscreen] = useState(false);
  const itemsPerPage = 100; // Match backend pagination limit

  // Fetch data when the modal opens or when the current page changes
  useEffect(() => {
    // Only fetch data if the modal is open AND the user is logged in.
    if (isOpen && statusLogin) {
      fetchData();
    }
  }, [isOpen, currentPage, statusLogin]); // Add statusLogin to the dependency array

  // Effect for client-side search.
  useEffect(() => {
    if (data.length > 0) {
      const results = data.filter((item) =>
        Object.values(item).some(
          (val) =>
            val &&
            val.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredData(results);
    } else {
      setFilteredData([]);
    }
  }, [searchTerm, data]);

  const handleFullscreenToggle = (event) => {
    const isChecked = event.target.checked;
    setFullscreen(isChecked);
  };

  const fetchData = async () => {
    setLoading(true);
    setSearchTerm(""); // Reset search when fetching new page data

    try {
      const startTime = performance.now();

      // !!! IMPORTANT !!!
      // Please confirm or change this URL to your actual backend server address.
      const backendUrl = "http://localhost:88";

      const response = await axiosJWT.post(
        `${backendUrl}/next/inquiry`, // Use the new backend route
        {
          sql,
          page: currentPage + 1, // Backend expects a 1-based page index
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const endTime = performance.now();
      setExecutionTime((endTime - startTime) / 1000);

      if (response.data) {
        setData(response.data.data || []);
        setTotalData(response.data.total || 0);
        setPageCount(response.data.totalPages || 0);
      } else {
        // Handle cases where response.data is null/undefined
        setData([]);
        setTotalData(0);
        setPageCount(0);
      }
    } catch (error) {
      handleHttpError(error);
      // Clear data on error to prevent showing stale results
      setData([]);
      setTotalData(0);
      setPageCount(0);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page - 1);
  };

  const formatNumber = (num) => {
    return numeral(num).format("0,0");
  };

  // Determine columns and which ones are numeric
  const columns = useMemo(() => {
    if (data.length === 0) return [];
    return Object.keys(data[0]);
  }, [data]);

  // Identify numeric columns for formatting
  const numericColumns = useMemo(() => {
    if (data.length === 0) return {};

    return columns.reduce((acc, column) => {
      // Check if this column contains numeric data in most rows
      const numericCount = data.reduce((count, row) => {
        const value = row[column];
        return !isNaN(Number(value)) &&
          value !== "" &&
          typeof value !== "boolean"
          ? count + 1
          : count;
      }, 0);

      // If more than 70% of rows have numeric values in this column, consider it numeric
      if (numericCount / data.length > 0.7) {
        acc[column] = true;
      }
      return acc;
    }, {});
  }, [data, columns]);

  // Prepare the data for display
  const displayData = useMemo(() => {
    return searchTerm ? filteredData : data;
  }, [searchTerm, filteredData, data]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={fullscreen ? "full" : "5xl"}
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader className="flex justify-between items-center">
          <div className="text-lg font-semibold">Hasil Inquiry</div>
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
          <div className="flex justify-between items-center mb-4">
            <div>
              {executionTime && (
                <p className="text-sm text-gray-500">
                  Query executed in {executionTime.toFixed(3)} seconds
                </p>
              )}
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
              {data.length > 0 && (
                <DataExport data={data} filename="inquiry_data.csv" />
              )}
            </div>
          </div>

          {data.length === 0 && !loading ? (
            <div className="text-center p-8 text-gray-500">
              No data available
            </div>
          ) : (
            <div className={fullscreen ? "h-[calc(100vh-250px)]" : "h-[500px]"}>
              <Table
                aria-label="Inquiry results table"
                removeWrapper
                isHeaderSticky
                classNames={{
                  base: "max-h-full",
                  table: "min-h-[150px]",
                }}
              >
                <TableHeader>
                  <TableColumn key="index" className="text-center w-12">
                    No
                  </TableColumn>
                  {columns.map((column) => (
                    <TableColumn
                      key={column}
                      className={
                        numericColumns[column] ? "text-right" : "text-center"
                      }
                    >
                      {column}
                    </TableColumn>
                  ))}
                </TableHeader>
                <TableBody>
                  {displayData.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length + 1}
                        className="text-center"
                      >
                        No data available
                      </TableCell>
                    </TableRow>
                  ) : (
                    displayData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="text-center">
                          {index + 1 + currentPage * itemsPerPage}
                        </TableCell>
                        {columns.map((column) => (
                          <TableCell
                            key={column}
                            className={
                              numericColumns[column]
                                ? "text-right"
                                : "text-center"
                            }
                          >
                            {numericColumns[column] &&
                            !isNaN(Number(item[column]))
                              ? formatNumber(item[column])
                              : item[column]}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Pagination moved outside the table component */}
        </ModalBody>

        <ModalFooter>
          {totalData > 0 && (
            <div className="flex justify-between items-center gap-8">
              <div className="flex text-sm">
                Total Baris: {numeral(totalData).format("0,0")}, Halaman:{" "}
                {currentPage + 1} dari {pageCount}
              </div>
              <Pagination
                total={pageCount}
                initialPage={currentPage + 1}
                onChange={handlePageChange}
                showControls
                size="sm"
              />
              <Button
                color="danger"
                variant="light"
                onPress={onClose}
                startContent={<X size={16} />}
              >
                Tutup
              </Button>
            </div>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default InquiryModal;
