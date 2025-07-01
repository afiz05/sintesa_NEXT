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
  List,
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
  const [searchTimeout, setSearchTimeout] = useState(null);
  const searchTermRef = useRef(""); // Add ref to track current search term
  const sortDescriptorRef = useRef({ column: null, direction: null }); // Add ref to track current sort
  const [sortDescriptor, setSortDescriptor] = useState({
    column: null,
    direction: null,
  });
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
        searchTerm: searchTermRef.current,
        sortColumn: sortDescriptorRef.current.column,
        sortDirection: sortDescriptorRef.current.direction,
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
        let modifiedSql = sql;

        // Apply sorting to SQL if sort descriptor exists
        if (
          sortDescriptorRef.current.column &&
          sortDescriptorRef.current.direction
        ) {
          const sortColumn = sortDescriptorRef.current.column;
          const sortDirection =
            sortDescriptorRef.current.direction === "ascending"
              ? "ASC"
              : "DESC";

          console.log("🔄 Applying SQL sorting:", {
            column: sortColumn,
            direction: sortDirection,
            page: page,
            isFirstPage: isFirstPage,
          });

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

          console.log("🔄 SQL with sorting:", {
            original: sql.substring(0, 100) + "...",
            modified: modifiedSql.substring(0, 100) + "...",
          });
        }

        // Apply search filter to SQL if search term exists
        if (searchTermRef.current && searchTermRef.current.trim()) {
          const keyword = searchTermRef.current.trim().replace(/'/g, "''"); // escape single quotes

          console.log("🔍 Applying search filter:", {
            keyword,
            originalSql: sql.substring(0, 100),
          });

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
              console.log("⚠️ Search skipped for SELECT * queries");
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

              console.log("🔍 Detected searchable columns:", columns);

              if (columns.length > 0) {
                // Filter columns to only search in likely text columns
                // Skip columns that are obviously numeric codes or IDs
                const textColumns = columns.filter((col) => {
                  const colName = col.toLowerCase();
                  // Skip columns that are clearly numeric codes/IDs
                  if (
                    colName.match(/^[a-z]\.(kd|id|no|num|code|cd)/i) ||
                    colName.match(/^(kd|id|no|num|code|cd)/i)
                  ) {
                    return false;
                  }
                  // Include columns that are likely to contain text (names, descriptions, etc.)
                  if (
                    colName.includes("nm") ||
                    colName.includes("name") ||
                    colName.includes("desc") ||
                    colName.includes("ket") ||
                    colName.includes("uraian") ||
                    colName.includes("keterangan")
                  ) {
                    return true;
                  }
                  // For other columns, include them (default behavior)
                  return true;
                });

                console.log("🔍 Text columns for search:", textColumns);

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

                  console.log(
                    "🔍 Generated search condition:",
                    searchCondition
                  );

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

                  console.log("🔍 Original SQL:", sql);
                  console.log("🔍 Modified SQL:", modifiedSql);
                  console.log("🔍 Has WHERE clause:", hasWhere);
                } else {
                  console.log("⚠️ No text columns found for searching");
                }
              } else {
                console.log("⚠️ No searchable columns found in SELECT clause");
              }
            }
          }
        }

        const encodedQuery = encodeURIComponent(modifiedSql);
        const encryptedQuery = Encrypt(encodedQuery);

        console.log("📡 Making API request:", {
          page,
          isFirstPage,
          url: process.env.NEXT_PUBLIC_LOCAL_NEXT_INQUIRY,
          sqlPreview: modifiedSql.substring(0, 200),
          hasSearch: !!searchTermRef.current,
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
          // setIsInitialLoad(false); // Moved to useEffect after data load
        } else {
          setIsLoadingMore(false);
        }
      }
    },
  });

  // Since we're doing backend sorting, no need for client-side sorting
  const filteredItems = list.items;

  // Setup infinite scroll
  const [loaderRef, scrollerRef] = useInfiniteScroll({
    hasMore: list.cursor !== null,
    isEnabled: isOpen && statusLogin,
    shouldUseLoader: false,
    onLoadMore: () => {
      console.log("🔄 Infinite scroll triggered - loading more data");
      list.loadMore();
    },
  });

  // Handle search with debouncing
  const handleSearch = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    searchTermRef.current = newSearchTerm; // Update ref immediately
    setError(null);

    // Clear existing timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // If search is cleared immediately, reload without delay
    if (newSearchTerm === "") {
      // Don't set isInitialLoad to true for clearing search
      // setIsInitialLoad(true); // Removed this line
      list.reload();

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
      // Don't set isInitialLoad to true for search operations
      // setIsInitialLoad(true); // Removed this line
      list.reload();

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
    console.log("🔄 Sort changed:", descriptor);
    setSortDescriptor(descriptor);
    sortDescriptorRef.current = descriptor; // Update ref immediately

    // Use list.sort() instead of list.reload() to properly reset pagination
    // list.sort() automatically invalidates the existing list and reloads from page 1
    console.log(
      "🔄 Using list.sort() to reset pagination and reload from page 1"
    );
    list.sort(descriptor);

    // Reset scroll position to top when sorting
    const scrollableDiv = scrollerRef.current;
    if (scrollableDiv) {
      scrollableDiv.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Load data when modal opens or search term changes
  useEffect(() => {
    console.log("🔄 Modal useEffect triggered:", {
      isOpen,
      statusLogin,
      hasSql: !!sql,
    });

    if (isOpen && statusLogin && sql) {
      // Add a small delay to ensure modal is fully rendered
      const timeoutId = setTimeout(() => {
        setSearchTerm(""); // Reset search term when modal opens
        searchTermRef.current = ""; // Reset ref as well
        setSortDescriptor({ column: null, direction: null }); // Reset sorting
        sortDescriptorRef.current = { column: null, direction: null }; // Reset ref as well
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
      searchTermRef.current = ""; // Reset ref as well
      setTotalData(0);
      setExecutionTime(null);
      setIsInitialLoad(true);
      setIsLoadingMore(false);
      setSortDescriptor({ column: null, direction: null }); // Reset sorting
      sortDescriptorRef.current = { column: null, direction: null }; // Reset ref as well
      // Clear any pending search timeouts
      if (searchTimeout) {
        clearTimeout(searchTimeout);
        setSearchTimeout(null);
      }
    }
  }, [isOpen, searchTimeout]);

  // Set isInitialLoad to false only after data is loaded or error occurs
  useEffect(() => {
    if (!loading && !list.isLoading) {
      setIsInitialLoad(false);
    }
  }, [loading, list.isLoading, list.items]);

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
    if (list.items.length === 0) return [];
    return Object.keys(list.items[0]);
  }, [list.items]);

  const numericColumns = useMemo(() => {
    if (list.items.length === 0) return {};

    return columns.reduce((acc, column) => {
      // Only allow PAGU, REALISASI, and BLOKIR columns to be treated as numeric
      const allowedNumericColumns = ["PAGU", "REALISASI", "BLOKIR"];

      if (!allowedNumericColumns.includes(column.toUpperCase())) {
        return acc; // Skip non-allowed columns
      }

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
      hideCloseButton
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
                placeholder="Cari data (ketik untuk mencari)..."
                value={searchTerm}
                onChange={handleSearch}
                startContent={<Search size={16} />}
                size="sm"
                className="w-80"
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
              <strong>Sort:</strong> Column: {sortDescriptor.column || "None"},
              Direction: {sortDescriptor.direction || "None"}
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
                    // Removed setIsInitialLoad(true) to prevent white overlay
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
          ) : (
            <div className={fullscreen ? "h-[calc(100vh-250px)]" : "h-[500px]"}>
              <Table
                aria-label="Inquiry results table"
                removeWrapper
                isHeaderSticky
                sortDescriptor={sortDescriptor}
                onSortChange={handleSortChange}
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
                  {columns.map((column) => {
                    const isNumericColumn = numericColumns[column];
                    const allowSorting = [
                      "PAGU",
                      "REALISASI",
                      "BLOKIR",
                    ].includes(column.toUpperCase());

                    return (
                      <TableColumn
                        key={column}
                        allowsSorting={allowSorting}
                        className={
                          isNumericColumn ? "text-right" : "text-center"
                        }
                      >
                        {column}
                      </TableColumn>
                    );
                  })}
                </TableHeader>
                <TableBody isLoading={false} emptyContent="No data to display">
                  {/* Show loading when actually loading and no data yet */}
                  {(loading || list.isLoading) && filteredItems.length === 0 ? (
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
                        {searchTerm
                          ? `Tidak ada hasil untuk pencarian: "${searchTerm}"`
                          : "No data available"}
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
                              {columnFormatters[column]
                                ? columnFormatters[column](item[column])
                                : numericColumns[column] &&
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
