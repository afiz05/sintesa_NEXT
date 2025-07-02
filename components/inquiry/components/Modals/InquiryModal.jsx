"use client";
import React, { useState, useEffect, useContext, useMemo, useRef } from "react";
import MyContext from "../../../../utils/Context";
import { handleHttpError } from "../../../notifikasi/toastError";
import numeral from "numeral";
import { Search, X } from "lucide-react";
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
import Encrypt from "../../../../utils/Random";

const InquiryModal = ({ isOpen, onClose, sql, from, thang }) => {
  const { axiosJWT, token, statusLogin } = useContext(MyContext);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [executionTime, setExecutionTime] = useState(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [totalData, setTotalData] = useState(0);
  const [grandTotals, setGrandTotals] = useState(null);
  const [error, setError] = useState(null);
  const [isRetrying, setIsRetrying] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const searchTermRef = useRef(""); // Add ref to track current search term
  const sortDescriptorRef = useRef({ column: null, direction: null }); // Add ref to track current sort
  const [sortDescriptor, setSortDescriptor] = useState({
    column: null,
    direction: null,
  });
  const itemsPerPage = 100;

  // Custom infinite scroll data management instead of useAsyncList
  const [items, setItems] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const currentPageRef = useRef(1);

  // Custom load function for infinite scroll
  const loadData = async (page = 1, isLoadMore = false) => {
    if (!statusLogin || !sql) {
      return;
    }

    const isFirstPage = page === 1;

    // Set appropriate loading states
    if (isFirstPage && !isLoadMore) {
      setLoading(true);
      setIsInitialLoad(true);
      setItems([]); // Clear items for fresh load
      currentPageRef.current = 1;
    } else if (isLoadMore) {
      setIsInitialLoad(false);
      setIsLoadingMore(true);
    }

    setIsLoadingData(true);
    setError(null);
    const startTime = performance.now();

    try {
      let modifiedSql = sql;

      // Apply sorting to SQL if sort descriptor exists
      if (
        sortDescriptorRef.current.column &&
        sortDescriptorRef.current.direction
      ) {
        const sortColumn = sortDescriptorRef.current.column;
        const sortDirection =
          sortDescriptorRef.current.direction === "ascending" ? "ASC" : "DESC";

        // Check if SQL already has ORDER BY clause
        const hasOrderBy = /\bORDER\s+BY\b/i.test(sql);

        if (hasOrderBy) {
          // Replace existing ORDER BY clause
          modifiedSql = sql.replace(
            /ORDER\s+BY\s+[^;]*/i,
            `ORDER BY ${sortColumn} ${sortDirection}`
          );
        } else {
          // Add new ORDER BY clause
          // Look for GROUP BY, HAVING, LIMIT clauses to insert ORDER BY before LIMIT
          const limitMatch = sql.match(/(\s+LIMIT\s+)/i);
          if (limitMatch) {
            // Insert ORDER BY before LIMIT
            modifiedSql = sql.replace(
              limitMatch[0],
              ` ORDER BY ${sortColumn} ${sortDirection}${limitMatch[0]}`
            );
          } else {
            // No LIMIT found, add ORDER BY at the end
            modifiedSql = `${sql} ORDER BY ${sortColumn} ${sortDirection}`;
          }
        }
      }

      // Apply search filter to SQL if search term exists
      if (searchTermRef.current && searchTermRef.current.trim()) {
        const keyword = searchTermRef.current.trim().replace(/'/g, "''"); // escape single quotes

        // Check if SQL already has WHERE clause
        const hasWhere = /\bWHERE\b/i.test(sql);

        // Get all column names from the SELECT clause
        const selectMatch = sql.match(/SELECT\s+(.*?)\s+FROM/i);
        if (selectMatch) {
          const selectClause = selectMatch[1];
          let columns = [];

          // Handle SELECT * case - skip complex parsing for now
          if (selectClause.trim() === "*") {
            // For SELECT *, we'll skip adding search conditions to avoid errors
            // The user will need to be more specific with their query
          } else {
            // Parse column names from SELECT clause more carefully
            columns = selectClause
              .split(",")
              .map((col) => {
                // Handle table.column syntax and aliases
                let cleanCol = col
                  .trim()
                  .split(/\s+AS\s+/i)[0]
                  .trim();
                cleanCol = cleanCol.replace(/["`\[\]]/g, ""); // Remove quotes and brackets
                return cleanCol;
              })
              .filter((col) => {
                // More strict filtering to only include actual column references
                const trimmedCol = col.trim();

                // Exclude functions, aggregates, literals, and complex expressions
                if (
                  trimmedCol.includes("(") ||
                  trimmedCol.includes("*") ||
                  trimmedCol.match(
                    /^(COUNT|SUM|AVG|MAX|MIN|DISTINCT|CASE|IF|CONCAT|SUBSTRING|DATE|YEAR|MONTH|DAY)/i
                  ) ||
                  trimmedCol.match(/^[0-9]+$/) || // Pure numbers
                  trimmedCol.match(/^['"`].*['"`]$/) || // String literals
                  trimmedCol.match(/^NULL$/i) ||
                  trimmedCol.length === 0 ||
                  trimmedCol.includes("+") ||
                  trimmedCol.includes("-") ||
                  trimmedCol.includes("*") ||
                  trimmedCol.includes("/") ||
                  trimmedCol.includes("=") ||
                  trimmedCol.includes("<") ||
                  trimmedCol.includes(">")
                ) {
                  return false;
                }

                // Only include if it looks like a column reference (table.column or just column)
                return trimmedCol.match(
                  /^[a-zA-Z_][a-zA-Z0-9_]*(\.[a-zA-Z_][a-zA-Z0-9_]*)?$/
                );
              });

            if (columns.length > 0) {
              // Filter columns to exclude only PAGU, REALISASI, and BLOKIR from search
              const textColumns = columns.filter((col) => {
                const colName = col.toUpperCase();
                // Skip only the numeric amount columns that shouldn't be searched
                if (
                  colName === "PAGU" ||
                  colName === "PAGU_APBN" ||
                  colName === "PAGU_DIPA" ||
                  colName === "REALISASI" ||
                  colName === "BLOKIR"
                ) {
                  return false;
                }
                // Include all other columns (including kddept, kdsatker, etc.)
                return true;
              });

              if (textColumns.length > 0) {
                // Create search conditions using contains (partial match)
                // Only search in text/varchar columns by using CAST to ensure compatibility
                const searchConditions = textColumns
                  .map((col) => {
                    // Use CAST to convert to CHAR for safe text searching
                    return `(LOWER(CAST(${col} AS CHAR)) LIKE LOWER('%${keyword}%'))`;
                  })
                  .join(" OR ");

                const searchCondition = `(${searchConditions})`;

                // Add the search condition to the SQL
                if (hasWhere) {
                  // Query already has WHERE clause, add our condition with AND
                  // Find the position to insert - before GROUP BY, ORDER BY, HAVING, or LIMIT
                  const clauseMatch = sql.match(
                    /(\s+(GROUP\s+BY|ORDER\s+BY|HAVING|LIMIT)\s+)/i
                  );
                  if (clauseMatch) {
                    // Insert AND condition before GROUP BY/ORDER BY/HAVING/LIMIT
                    modifiedSql = sql.replace(
                      clauseMatch[0],
                      ` AND ${searchCondition}${clauseMatch[0]}`
                    );
                  } else {
                    // No GROUP BY/ORDER BY found, add AND condition at the end
                    modifiedSql = `${sql} AND ${searchCondition}`;
                  }
                } else {
                  // No existing WHERE clause, add new WHERE clause
                  // Look for GROUP BY, ORDER BY, HAVING, LIMIT clauses to insert WHERE before them
                  const clauseMatch = sql.match(
                    /(\s+(GROUP\s+BY|ORDER\s+BY|HAVING|LIMIT)\s+)/i
                  );
                  if (clauseMatch) {
                    // Insert WHERE before GROUP BY/ORDER BY/HAVING/LIMIT
                    modifiedSql = sql.replace(
                      clauseMatch[0],
                      ` WHERE ${searchCondition}${clauseMatch[0]}`
                    );
                  } else {
                    // No GROUP BY/ORDER BY found, add WHERE at the end
                    modifiedSql = `${sql} WHERE ${searchCondition}`;
                  }
                }
              }
            }
          }
        }
      }

      const encodedQuery = encodeURIComponent(modifiedSql);
      const encryptedQuery = Encrypt(encodedQuery);

      const response = await axiosJWT.post(
        `${process.env.NEXT_PUBLIC_LOCAL_NEXT_INQUIRY}`,
        {
          sql: encryptedQuery,
          page: page,
        },
        {
          timeout: 30000, // 30 second timeout
        }
      );

      const endTime = performance.now();
      setExecutionTime((endTime - startTime) / 1000);

      if (response.data) {
        const newData = response.data.data || [];
        const total = response.data.total || 0;
        const totalPages = response.data.totalPages || 0;
        const grandTotalsData = response.data.grandTotals || null;

        setTotalData(total);

        // Only set grand totals on first page load to avoid overwriting
        if (isFirstPage && grandTotalsData) {
          setGrandTotals(grandTotalsData);
        }

        // Multiple ways to determine if there's more data
        let hasMoreData = false;

        if (totalPages > 0) {
          // Use totalPages if available
          hasMoreData = page < totalPages;
        } else if (total > 0) {
          // Fallback: estimate based on total and current data length
          const estimatedPages = Math.ceil(total / itemsPerPage);
          hasMoreData = page < estimatedPages;
        } else {
          // Last fallback: if we got a full page of data, assume there might be more
          hasMoreData = newData.length >= itemsPerPage;
        }

        // Update cursor
        setCursor(hasMoreData ? (page + 1).toString() : null);
        currentPageRef.current = page;

        // Handle data accumulation for infinite scroll
        if (isLoadMore) {
          // Append new data to existing items
          setItems((prevItems) => [...prevItems, ...newData]);
        } else {
          // Replace items for fresh load (search, sort, initial load)
          setItems(newData);
        }
      } else {
        setTotalData(0);
        setItems([]);
        setCursor(null);
      }
    } catch (error) {
      const { status, data } = error.response || {};
      const errorMessage =
        (data && data.error) ||
        error.message ||
        "Terjadi Permasalahan Koneksi atau Server Backend";

      setError(errorMessage);
      handleHttpError(status, errorMessage);
      setTotalData(0);
      if (!isLoadMore) {
        setItems([]);
        setCursor(null);
      }
    } finally {
      setIsLoadingData(false);
      if (isFirstPage && !isLoadMore) {
        setLoading(false);
      } else if (isLoadMore) {
        setIsLoadingMore(false);
      }
    }
  };

  // Load more function for infinite scroll
  const loadMore = () => {
    if (cursor && !isLoadingData) {
      const nextPage = parseInt(cursor);
      loadData(nextPage, true);
    }
  };

  // Setup infinite scroll
  const [loaderRef, scrollerRef] = useInfiniteScroll({
    hasMore: Boolean(cursor),
    isEnabled: isOpen && statusLogin,
    shouldUseLoader: true,
    onLoadMore: loadMore,
  });

  // Handle search with debouncing
  const handleSearch = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    searchTermRef.current = newSearchTerm;
    setError(null);

    // Clear existing timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // If search is cleared immediately, reload without delay
    if (newSearchTerm === "") {
      loadData(1, false); // Fresh load from page 1

      // Reset scroll position to top
      const scrollableDiv = scrollerRef.current;
      if (scrollableDiv) {
        scrollableDiv.scrollTo({ top: 0, behavior: "smooth" });
      }
      setSearchTimeout(null);
      return;
    }

    // Set new timeout for debounced search (only for non-empty search)
    const timeoutId = setTimeout(() => {
      loadData(1, false); // Fresh load from page 1

      // Reset scroll position to top when searching
      const scrollableDiv = scrollerRef.current;
      if (scrollableDiv) {
        scrollableDiv.scrollTo({ top: 0, behavior: "smooth" });
      }
      setSearchTimeout(null);
    }, 300); // 300ms delay

    setSearchTimeout(timeoutId);
  };

  // Handle sorting
  const handleSortChange = (descriptor) => {
    setSortDescriptor(descriptor);
    sortDescriptorRef.current = descriptor;

    // Fresh load from page 1 with new sort
    loadData(1, false);

    // Reset scroll position to top when sorting
    const scrollableDiv = scrollerRef.current;
    if (scrollableDiv) {
      scrollableDiv.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Load data when modal opens
  useEffect(() => {
    if (isOpen && statusLogin && sql) {
      // Add a small delay to ensure modal is fully rendered
      const timeoutId = setTimeout(() => {
        setSearchTerm(""); // Reset search term when modal opens
        searchTermRef.current = ""; // Reset ref as well
        setSortDescriptor({ column: null, direction: null }); // Reset sorting
        sortDescriptorRef.current = { column: null, direction: null }; // Reset ref as well
        setError(null);
        setIsInitialLoad(true);
        loadData(1, false); // Fresh load from page 1
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
      searchTermRef.current = ""; // Reset ref as well
      setTotalData(0);
      setExecutionTime(null);
      setIsInitialLoad(true);
      setIsLoadingMore(false);
      setSortDescriptor({ column: null, direction: null }); // Reset sorting
      sortDescriptorRef.current = { column: null, direction: null }; // Reset ref as well        setItems([]); // Clear items on close
      setCursor(null); // Clear cursor on close
      if (searchTimeout) {
        clearTimeout(searchTimeout);
        setSearchTimeout(null);
      }
    }
  }, [isOpen, searchTimeout]);

  // Set isInitialLoad to false only after data is loaded or error occurs
  useEffect(() => {
    if (!loading && !isLoadingData) {
      setIsInitialLoad(false);
    }
  }, [loading, isLoadingData]);

  const handleFullscreenToggle = (event) => {
    setFullscreen(event.target.checked);
  };

  const formatNumber = (num) => {
    return numeral(num).format("0,0");
  };

  // Custom column formatters
  const columnFormatters = {
    kddept: (value) => String(value), // Always show kddept as string
    kdsatker: (value) => String(value), // Always show kdsatker as string
    // Add more custom formatters here if needed
  };

  // Determine columns and numeric formatting
  const columns = useMemo(() => {
    if (items.length === 0) return [];
    return Object.keys(items[0]);
  }, [items]);

  const numericColumns = useMemo(() => {
    if (items.length === 0) return {};

    return columns.reduce((acc, column) => {
      // Only allow PAGU, REALISASI, and BLOKIR columns to be treated as numeric
      const allowedNumericColumns = [
        "PAGU",
        "PAGU_APBN",
        "PAGU_DIPA",
        "REALISASI",
        "BLOKIR",
      ];

      if (!allowedNumericColumns.includes(column.toUpperCase())) {
        return acc; // Skip non-allowed columns
      }

      const numericCount = items.reduce((count, row) => {
        const value = row[column];
        return !isNaN(Number(value)) &&
          value !== "" &&
          typeof value !== "boolean"
          ? count + 1
          : count;
      }, 0);

      if (numericCount / items.length > 0.7) {
        acc[column] = true;
      }
      return acc;
    }, {});
  }, [items, columns]);

  // Add this effect to auto-enable fullscreen on small screens
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        if (window.innerWidth < 640) {
          setFullscreen(true);
        } else {
          setFullscreen(false);
        }
      };
      handleResize(); // set on mount
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Only show No column if there are columns (data loaded)
  const showNoColumn = columns.length > 0;

  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      onClose={onClose}
      size={fullscreen ? "full" : "6xl"}
      scrollBehavior="inside"
      hideCloseButton
      className={fullscreen ? "max-h-full" : "h-[80vh] w-[80vw]"}
      classNames={{
        header:
          "bg-gradient-to-r from-sky-200 to-cyan-200 dark:from-zinc-800 dark:to-zinc-800 rounded-xl",
      }}
    >
      <ModalContent>
        <ModalHeader className="flex justify-between items-center m-6">
          <div className="text-lg font-semibold">
            Hasil Inquiry
            {/* {process.env.NODE_ENV === "development" && (
              <span className="text-xs text-gray-500 ml-2">
                (Items: {items.length}, Loading: {isLoadingData ? "Yes" : "No"})
              </span>
            )} */}
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

        <ModalBody className="flex flex-col h-full min-h-0 p-0">
          <div className="flex justify-end items-center px-6">
            <div className="flex space-x-2">
              <Input
                placeholder="Ketik untuk mencari Kode atau Nama"
                value={searchTerm}
                onChange={handleSearch}
                startContent={<Search size={16} />}
                size="md"
                className="w-96"
              />
            </div>
          </div>

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
                    // Use setTimeout to avoid immediate retry conflicts
                    setTimeout(() => {
                      loadData(1, false); // <-- This triggers the API call
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
          ) : items.length === 0 && !loading && !isLoadingData ? (
            <div className="text-center p-8 text-gray-500">
              {searchTerm ? (
                <div>
                  <p>
                    Tidak ada hasil ditemukan untuk pencarian: "{searchTerm}"
                  </p>
                  <p className="text-sm mt-2">
                    Coba gunakan kata kunci yang berbeda
                  </p>
                </div>
              ) : (
                <div>
                  No data available
                  {process.env.NODE_ENV === "development" && (
                    <div className="text-xs mt-2">
                      SQL: {sql?.substring(0, 100)}...
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : columns.length === 0 ? (
            // Show loading or empty state outside the table if no columns
            <div className="flex items-center justify-center h-full py-8">
              {loading || isLoadingData ? (
                <>
                  <Spinner color="primary" size="lg" variant="simple" />
                  <span className="text-lg text-gray-600 ml-6 flex gap-0.5">
                    {"Memproses query data...".split("").map((char, i) => (
                      <span
                        key={i}
                        style={{
                          display: "inline-block",
                          animation: `wave 1.2s infinite`,
                          animationDelay: `${i * 0.08}s`,
                        }}
                      >
                        {char === " " ? "\u00A0" : char}
                      </span>
                    ))}
                  </span>
                  <style>{`
                    @keyframes wave {
                      0%, 60%, 100% { transform: translateY(0); }
                      30% { transform: translateY(-8px); }
                    }
                  `}</style>
                </>
              ) : (
                <span className="text-sm text-gray-600">No data available</span>
              )}
            </div>
          ) : (
            <div className="h-full overflow-auto px-6 py-1" ref={scrollerRef}>
              <Table
                aria-label="Inquiry results table"
                isHeaderSticky
                sortDescriptor={sortDescriptor}
                onSortChange={handleSortChange}
                classNames={{
                  base: "h-full ",
                  table: "w-full ",
                  wrapper: "min-h-full w-full overflow-auto",
                }}
              >
                <TableHeader>
                  {showNoColumn && (
                    <TableColumn
                      key="index"
                      className="text-center w-12 uppercase"
                    >
                      No
                    </TableColumn>
                  )}
                  {columns.map((column) => {
                    const isNumericColumn = numericColumns[column];
                    const allowSorting = [
                      "PAGU",
                      "PAGU_APBN",
                      "PAGU_DIPA",
                      "REALISASI",
                      "BLOKIR",
                    ].includes(column.toUpperCase());

                    // Always center and uppercase header text
                    let columnClass = "text-center uppercase";
                    let columnStyle = {};
                    if (
                      [
                        "PAGU",
                        "PAGU_APBN",
                        "PAGU_DIPA",
                        "REALISASI",
                        "BLOKIR",
                      ].includes(column.toUpperCase())
                    ) {
                      columnStyle = {
                        width: "160px",
                        minWidth: "160px",
                        maxWidth: "260px",
                      };
                    }

                    return (
                      <TableColumn
                        key={column}
                        allowsSorting={allowSorting}
                        className={columnClass}
                        style={columnStyle}
                      >
                        {column}
                      </TableColumn>
                    );
                  })}
                </TableHeader>
                <TableBody isLoading={false} emptyContent="No data to display">
                  {items.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length + (showNoColumn ? 1 : 0)}
                        className="text-center"
                      >
                        {searchTerm
                          ? `Tidak ada hasil untuk pencarian: "${searchTerm}"`
                          : "No data available"}
                      </TableCell>
                    </TableRow>
                  ) : (
                    items.map((item, index) => (
                      <TableRow key={`${item.id || index}`}>
                        {showNoColumn && (
                          <TableCell className="text-center">
                            {index + 1}
                          </TableCell>
                        )}
                        {columns.map((column) => (
                          <TableCell
                            key={column}
                            className={
                              numericColumns[column]
                                ? "text-right"
                                : "text-center"
                            }
                          >
                            {columnFormatters[column]
                              ? columnFormatters[column](item[column])
                              : numericColumns[column] &&
                                !isNaN(Number(item[column]))
                              ? formatNumber(item[column])
                              : item[column]}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  )}
                  {/* Always render the loader row for infinite scroll when there are items, regardless of loading state */}
                  {items.length > 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length + (showNoColumn ? 1 : 0)}
                        className={`text-center ${
                          isLoadingMore ? "py-4 bg-gray-50" : "py-2"
                        }`}
                        style={{ minHeight: "40px" }}
                      >
                        <div ref={loaderRef} className="w-full">
                          {isLoadingMore ? (
                            <div className="flex items-center justify-center space-x-2">
                              <Spinner
                                color="primary"
                                size="sm"
                                variant="simple"
                              />
                              <span className="text-sm text-gray-600">
                                Memuat data selanjutnya...
                              </span>
                            </div>
                          ) : (
                            <div className="h-1 w-full flex items-center justify-center">
                              {process.env.NODE_ENV === "development" && (
                                <div className="text-xs text-gray-300 opacity-0 px-1">
                                  •
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                  {/* Grand Total Row */}
                  {items.length > 0 && (
                    <TableRow className="sticky bottom-0 bg-default-100 z-20 rounded-lg">
                      {showNoColumn && (
                        <TableCell className="text-center font-medium text-foreground-600 bg-default-100 first:rounded-l-lg"></TableCell>
                      )}
                      {columns.map((column, columnIndex) => {
                        const isNumericColumn = numericColumns[column];
                        const columnName = column.toUpperCase();

                        // Calculate grand total for this column if it's numeric
                        let grandTotal = 0;
                        if (
                          isNumericColumn &&
                          [
                            "PAGU",
                            "PAGU_APBN",
                            "PAGU_DIPA",
                            "REALISASI",
                            "BLOKIR",
                          ].includes(columnName)
                        ) {
                          grandTotal = items.reduce((sum, item) => {
                            const value = Number(item[column]);
                            return !isNaN(value) ? sum + value : sum;
                          }, 0);
                        }

                        // Find the last non-numeric column index to show "GRAND TOTAL" label
                        const lastNonNumericIndex = columns.findLastIndex(
                          (col) => !numericColumns[col]
                        );
                        const shouldShowLabel =
                          columnIndex === lastNonNumericIndex;

                        return (
                          <TableCell
                            key={column}
                            // colSpan={2}
                            className={`${
                              isNumericColumn ? "text-right" : "text-center"
                            } font-medium text-foreground-600 bg-default-100 uppercase ${
                              columnIndex === 0 && !showNoColumn
                                ? "first:rounded-l-lg"
                                : ""
                            } ${
                              columnIndex === columns.length - 1
                                ? "last:rounded-r-lg"
                                : ""
                            }`}
                          >
                            {isNumericColumn &&
                            [
                              "PAGU",
                              "PAGU_APBN",
                              "PAGU_DIPA",
                              "REALISASI",
                              "BLOKIR",
                            ].includes(columnName)
                              ? formatNumber(grandTotal)
                              : shouldShowLabel
                              ? "GRAND TOTAL"
                              : ""}
                          </TableCell>
                        );
                      })}
                    </TableRow>
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
                  {items.length} item
                  {searchTerm && ` (hasil pencarian: "${searchTerm}")`}
                </>
              ) : searchTerm ? (
                `Tidak ada hasil untuk pencarian: "${searchTerm}"`
              ) : (
                "No data"
              )}
            </div>
            <Button
              color="danger"
              variant="ghost"
              className="w-[160px]"
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
