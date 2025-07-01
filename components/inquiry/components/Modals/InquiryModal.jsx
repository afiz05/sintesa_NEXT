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
  Input,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import { useInfiniteScroll } from "@heroui/use-infinite-scroll";
import { useAsyncList } from "@react-stately/data";
import Encrypt from "../../../../utils/Random";

const InquiryModal = ({ isOpen, onClose, sql, from, thang }) => {
  const { axiosJWT, token, statusLogin } = useContext(MyContext);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [executionTime, setExecutionTime] = useState(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [totalData, setTotalData] = useState(0);
  const [error, setError] = useState(null);
  const [isRetrying, setIsRetrying] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const itemsPerPage = 100;

  console.log("InquiryModal Props:", {
    isOpen,
    sqlLength: sql?.length,
    statusLogin,
    hasToken: !!token,
    sql: sql?.substring(0, 100) + "...",
  });

  // useAsyncList for data management with infinite loading
  const list = useAsyncList({
    async load({ signal, cursor }) {
      console.log("🔄 useAsyncList load called:", {
        statusLogin,
        hasAxiosJWT: !!axiosJWT,
        cursor,
        sqlLength: sql?.length,
      });

      if (!statusLogin || !sql) {
        console.log("❌ Skipping load: no login or no SQL");
        return { items: [], cursor: null };
      }

      const page = cursor ? parseInt(cursor) : 1;
      const isFirstPage = page === 1;

      // Only show full screen loading for initial load (first page)
      if (isFirstPage) {
        setLoading(true);
        setIsInitialLoad(true);
      } else {
        setIsInitialLoad(false);
        setIsLoadingMore(true);
      }

      setError(null);
      const startTime = performance.now();

      try {
        const encodedQuery = encodeURIComponent(sql);
        const encryptedQuery = Encrypt(encodedQuery);

        console.log("📡 Making API request:", {
          page,
          isFirstPage,
          url: process.env.NEXT_PUBLIC_LOCAL_NEXT_INQUIRY,
          sqlPreview: sql.substring(0, 200),
        });

        const response = await axiosJWT.post(
          `${process.env.NEXT_PUBLIC_LOCAL_NEXT_INQUIRY}`,
          {
            sql: encryptedQuery,
            page: page,
          },
          {
            signal,
            timeout: 30000, // 30 second timeout
          }
        );

        const endTime = performance.now();
        setExecutionTime((endTime - startTime) / 1000);

        console.log("✅ API response:", {
          hasData: !!response.data,
          dataLength: response.data?.data?.length,
          total: response.data?.total,
          totalPages: response.data?.totalPages,
        });

        if (response.data) {
          const newData = response.data.data || [];
          const total = response.data.total || 0;
          const totalPages = response.data.totalPages || 0;

          setTotalData(total);
          const hasMoreData = page < totalPages;

          return {
            items: newData,
            cursor: hasMoreData ? (page + 1).toString() : null,
          };
        } else {
          setTotalData(0);
          return { items: [], cursor: null };
        }
      } catch (error) {
        // Handle canceled requests gracefully
        if (error.name === "CanceledError" || error.code === "ERR_CANCELED") {
          console.log("⏹️ Request was canceled (this is normal)");
          return { items: [], cursor: null };
        }

        console.error("❌ API Error:", error);
        const { status, data } = error.response || {};
        const errorMessage =
          (data && data.error) ||
          error.message ||
          "Terjadi Permasalahan Koneksi atau Server Backend";

        setError(errorMessage);
        handleHttpError(status, errorMessage);
        setTotalData(0);
        return { items: [], cursor: null };
      } finally {
        if (isFirstPage) {
          setLoading(false);
          setIsInitialLoad(false); // Reset initial load state
        } else {
          setIsLoadingMore(false);
        }
      }
    },
  });

  // Filter data based on search term
  const filteredItems = useMemo(() => {
    if (!searchTerm) return list.items;

    return list.items.filter((item) =>
      Object.values(item).some(
        (val) =>
          val && val.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [list.items, searchTerm]);

  // Setup infinite scroll
  const [loaderRef, scrollerRef] = useInfiniteScroll({
    hasMore: list.cursor !== null && !searchTerm,
    isEnabled: isOpen && statusLogin,
    shouldUseLoader: false,
    onLoadMore: () => {
      console.log("🔄 Infinite scroll triggered - loading more data");
      list.loadMore();
    },
  });

  // Load data when modal opens
  useEffect(() => {
    console.log("🔄 Modal useEffect triggered:", {
      isOpen,
      statusLogin,
      hasSql: !!sql,
    });

    if (isOpen && statusLogin && sql) {
      // Add a small delay to ensure modal is fully rendered
      const timeoutId = setTimeout(() => {
        setSearchTerm("");
        setError(null);
        setIsInitialLoad(true);
        list.reload();
      }, 100);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isOpen, statusLogin, sql]);

  // Clean up when modal closes
  useEffect(() => {
    if (!isOpen) {
      setError(null);
      setSearchTerm("");
      setTotalData(0);
      setExecutionTime(null);
      setIsInitialLoad(true);
      setIsLoadingMore(false);
    }
  }, [isOpen]);

  const handleFullscreenToggle = (event) => {
    setFullscreen(event.target.checked);
  };

  const formatNumber = (num) => {
    return numeral(num).format("0,0");
  };

  // Determine columns and numeric formatting
  const columns = useMemo(() => {
    if (list.items.length === 0) return [];
    return Object.keys(list.items[0]);
  }, [list.items]);

  const numericColumns = useMemo(() => {
    if (list.items.length === 0) return {};

    return columns.reduce((acc, column) => {
      const numericCount = list.items.reduce((count, row) => {
        const value = row[column];
        return !isNaN(Number(value)) &&
          value !== "" &&
          typeof value !== "boolean"
          ? count + 1
          : count;
      }, 0);

      if (numericCount / list.items.length > 0.7) {
        acc[column] = true;
      }
      return acc;
    }, {});
  }, [list.items, columns]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={fullscreen ? "full" : "5xl"}
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader className="flex justify-between items-center">
          <div className="text-lg font-semibold">
            Hasil Inquiry
            {process.env.NODE_ENV === "development" && (
              <span className="text-xs text-gray-500 ml-2">
                (Items: {list.items.length}, Loading:{" "}
                {list.isLoading ? "Yes" : "No"})
              </span>
            )}
          </div>
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

        {/* Only show full screen loading for initial load */}
        {loading && isInitialLoad && (
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
              {error && <p className="text-sm text-red-500">Error: {error}</p>}
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
            </div>
          </div>

          {/* Debug Info in Development */}
          {process.env.NODE_ENV === "development" && (
            <div className="mb-2 p-2 bg-gray-100 rounded text-xs">
              <strong>Debug:</strong> Items: {list.items.length}, Filtered:{" "}
              {filteredItems.length}, Has More: {list.cursor ? "Yes" : "No"},
              Loading: {list.isLoading ? "Yes" : "No"}, Error: {error || "None"}
              <br />
              <strong>Status:</strong> Login: {statusLogin ? "Yes" : "No"}, SQL
              Length: {sql?.length || 0}, Modal Open: {isOpen ? "Yes" : "No"},
              Initial Load: {isInitialLoad ? "Yes" : "No"}, Loading More:{" "}
              {isLoadingMore ? "Yes" : "No"}
              <br />
              <strong>API:</strong> {process.env.NEXT_PUBLIC_LOCAL_NEXT_INQUIRY}
            </div>
          )}

          {error ? (
            <div className="text-center p-8 text-red-500">
              <p>Error loading data: {error}</p>
              <div className="mt-2 space-x-2">
                <Button
                  color="primary"
                  size="sm"
                  onClick={() => {
                    setError(null);
                    setIsRetrying(true);
                    setIsInitialLoad(true);
                    // Use setTimeout to avoid immediate retry conflicts
                    setTimeout(() => {
                      list.reload();
                      setIsRetrying(false);
                    }, 100);
                  }}
                  isLoading={isRetrying || loading}
                >
                  Retry
                </Button>
                <Button
                  color="default"
                  size="sm"
                  variant="bordered"
                  onClick={onClose}
                >
                  Close
                </Button>
              </div>
            </div>
          ) : list.items.length === 0 && !loading && !list.isLoading ? (
            <div className="text-center p-8 text-gray-500">
              No data available
              {process.env.NODE_ENV === "development" && (
                <div className="text-xs mt-2">
                  SQL: {sql?.substring(0, 100)}...
                </div>
              )}
            </div>
          ) : (
            <div className={fullscreen ? "h-[calc(100vh-250px)]" : "h-[500px]"}>
              <Table
                aria-label="Inquiry results table"
                removeWrapper
                isHeaderSticky
                baseRef={scrollerRef}
                classNames={{
                  base: "max-h-full overflow-auto",
                  table: "min-h-[150px]",
                  wrapper: "max-h-full",
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
                <TableBody isLoading={false} emptyContent="No data to display">
                  {/* Show loading only when actually loading and no data yet */}
                  {isInitialLoad && filteredItems.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length + 1}
                        className="text-center py-8"
                      >
                        <div className="flex items-center justify-center space-x-2">
                          <Spinner ref={loaderRef} color="primary" size="sm" />
                          <span className="text-sm text-gray-600">
                            Loading data...
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : filteredItems.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length + 1}
                        className="text-center"
                      >
                        No data available
                      </TableCell>
                    </TableRow>
                  ) : (
                    <>
                      {filteredItems.map((item, index) => (
                        <TableRow key={`${item.id || index}`}>
                          <TableCell className="text-center">
                            {index + 1}
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
                      ))}
                      {/* Show loading row at the bottom when loading more */}
                      {isLoadingMore && (
                        <TableRow>
                          <TableCell
                            colSpan={columns.length + 1}
                            className="text-center py-4 bg-gray-50"
                          >
                            <div className="flex items-center justify-center space-x-2">
                              <Spinner color="primary" size="sm" />
                              <span className="text-sm text-gray-600">
                                Loading more data...
                              </span>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </ModalBody>

        <ModalFooter>
          <div className="flex justify-between items-center gap-8 w-full">
            <div className="flex text-sm">
              {totalData > 0 ? (
                <>
                  Total Baris: {numeral(totalData).format("0,0")}, Ditampilkan:{" "}
                  {filteredItems.length} item
                  {searchTerm && ` (filtered by "${searchTerm}")`}
                </>
              ) : (
                "No data"
              )}
            </div>
            <Button
              color="danger"
              variant="light"
              onPress={onClose}
              startContent={<X size={16} />}
            >
              Tutup
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default InquiryModal;
