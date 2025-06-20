"use client";
import React, { useState, useEffect, useMemo } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  Input,
  Pagination,
  Card,
  CardBody,
  Tooltip,
} from "@heroui/react";
import { Search, Download, RefreshCw, Database, X } from "lucide-react";
import { useToast } from "../../context/ToastContext";
import { CutOffQueryGenerator } from "./query-generate";

interface DataTableModalProps {
  isOpen: boolean;
  onClose: () => void;
  sqlQuery: string;
  cutOff?: string;
  selectedTahun?: string;
  selectedPembulatan?: string;
}

interface TableData {
  [key: string]: any;
  isGrandTotal?: boolean;
}

interface PaginationState {
  total: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

const DataTableModal: React.FC<DataTableModalProps> = ({
  isOpen,
  onClose,
  sqlQuery,
  cutOff,
  selectedTahun,
  selectedPembulatan,
}) => {
  const [data, setData] = useState<TableData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 100; // Fixed to 100 rows per page
  const [pagination, setPagination] = useState<PaginationState>({
    total: 0,
    totalPages: 0,
    currentPage: 1,
    hasNextPage: false,
    hasPrevPage: false,
  });
  // Add state to prevent infinite retries
  const [retryCount, setRetryCount] = useState(0);
  const [lastError, setLastError] = useState<string | null>(null);

  // Add state to track execution method and performance
  const [executionMethod, setExecutionMethod] = useState<{
    method: "cache" | "code-splitting" | "direct" | null;
    queryTime: number | null;
    cacheHit: boolean;
    splitMethod?: string;
    recordsSource: string;
  }>({
    method: null,
    queryTime: null,
    cacheHit: false,
    splitMethod: undefined,
    recordsSource: "Unknown",
  });

  const { showToast } = useToast();

  // Helper function to get rounding text
  const getRoundingText = (pembulatan: string) => {
    switch (pembulatan) {
      case "Rupiah":
        return "dalam Rupiah";
      case "Ribu":
        return "dalam ribu Rupiah";
      case "Juta":
        return "dalam juta Rupiah";
      case "Miliar":
        return "dalam miliar Rupiah";
      default:
        return "dalam Rupiah";
    }
  };

  // Helper function to get performance indicator details
  const getPerformanceIndicator = (
    method: string,
    queryTime: number | null
  ) => {
    switch (method) {
      case "cache":
        return {
          icon: "⚡",
          label: "Materialized Cache",
          color: "green",
          description: "Ultra-fast cached results",
          priority: 1,
        };
      case "code-splitting":
        return {
          icon: "🔄",
          label: "Code Splitting",
          color: "blue",
          description: "Optimized query execution",
          priority: 2,
        };
      case "direct":
        return {
          icon: "📊",
          label: "Direct Query",
          color: "orange",
          description: "Full database scan",
          priority: 3,
        };
      default:
        return {
          icon: "❓",
          label: "Unknown",
          color: "gray",
          description: "Processing method unknown",
          priority: 4,
        };
    }
  };

  // Extract columns from data
  const columns = useMemo(() => {
    if (data.length === 0) return [];

    const allKeys = Object.keys(data[0]);
    const idKey = allKeys.find((key) => key.toLowerCase() === "id");
    const otherKeys = allKeys.filter((key) => key.toLowerCase() !== "id");
    const orderedKeys = idKey ? [idKey, ...otherKeys] : allKeys;

    const getColumnLabel = (key: string) => {
      const lowerKey = key.toLowerCase();
      switch (lowerKey) {
        case "id":
          return "NO";
        case "kddept":
          return "KODE BA";
        case "nmdept":
          return "NAMA BAGIAN ANGGARAN";
        default:
          return key.toUpperCase().replace(/_/g, " ");
      }
    };

    return orderedKeys.map((key) => ({
      key,
      label: getColumnLabel(key),
    }));
  }, [data]); // For server-side pagination, we don't need client-side filtering
  // The filtering should be handled by the backend with search parameters
  const filteredData = data; // Use data directly since filtering is server-side

  // Simplified fetch data function with clean backend integration
  const fetchData = async (page: number = 1) => {
    if (!sqlQuery.trim()) {
      console.log("❌ No SQL query provided, skipping fetch");
      return;
    }

    // Prevent multiple calls if already loading
    if (loading) {
      console.log("🔄 Already loading, skipping fetch");
      return;
    }

    console.log("🚀 Starting fetchData for page:", page);
    console.log("📝 SQL Query:", sqlQuery);
    setLoading(true);
    setError(null);

    const timeoutDuration = 30000; // 30 seconds timeout
    const timeoutId = setTimeout(() => {
      setLoading(false);
      const timeoutError = `Request timeout after ${
        timeoutDuration / 1000
      }s - Try applying more specific filters.`;
      setError(timeoutError);
      setLastError(timeoutError);
      showToast(timeoutError, "error");
    }, timeoutDuration);

    try {
      const backendUrl =
        process.env.NEXT_PUBLIC_LOCAL_SOCKET || "http://localhost:88";
      const encodedQuery = encodeURIComponent(sqlQuery);

      // Build clean API URL
      let url = `${backendUrl}/inquiryBelanja?queryParams=${encodedQuery}&page=${page}`;

      // Add search parameter if search query exists
      if (searchQuery && searchQuery.trim()) {
        url += `&search=${encodeURIComponent(searchQuery.trim())}`;
      }

      console.log("🔗 API URL:", url);

      const fetchStartTime = Date.now();
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      });

      clearTimeout(timeoutId);
      const totalFetchTime = Date.now() - fetchStartTime;
      console.log(`📊 Total fetch time: ${totalFetchTime}ms`);

      if (!response.ok) {
        let errorMessage = `Server error (${response.status})`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
          console.error("❌ Backend error details:", errorData);
        } catch (parseError) {
          console.error("❌ Failed to parse error response:", parseError);
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log("📊 Backend response:", result);

      if (result.success) {
        // Process the data
        const processedData = result.result || [];

        // Set execution method info for UI display
        setExecutionMethod({
          method: "direct",
          queryTime: parseFloat(result.queryTime?.replace("ms", "") || "0"),
          cacheHit: result.cache || false,
          splitMethod: undefined,
          recordsSource: "Direct Query",
        });

        setData(processedData);
        setRetryCount(0);
        setLastError(null);

        // Set pagination info
        if (result.pagination) {
          setPagination({
            total: result.pagination.total || 0,
            totalPages: result.pagination.totalPages || 1,
            currentPage: result.pagination.currentPage || page,
            hasNextPage: result.pagination.hasNextPage || false,
            hasPrevPage: result.pagination.hasPrevPage || false,
          });
        } else {
          // Fallback pagination
          setPagination({
            total: processedData.length,
            totalPages: 1,
            currentPage: page,
            hasNextPage: false,
            hasPrevPage: false,
          });
        }

        showToast(`Loaded ${processedData.length} records`, "success");
      } else {
        throw new Error(
          result.message || result.error || "Failed to fetch data"
        );
      }
    } catch (err) {
      clearTimeout(timeoutId);
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      console.error("❌ Fetch error:", errorMessage);
      setError(errorMessage);
      setLastError(errorMessage);
      setRetryCount((prev) => prev + 1);
      showToast(`Error: ${errorMessage}`, "error");
      setData([]);

      // Set error state for pagination
      setPagination({
        total: 0,
        totalPages: 0,
        currentPage: page,
        hasNextPage: false,
        hasPrevPage: false,
      });
    } finally {
      console.log("🏁 Fetch completed, setting loading to false");
      setLoading(false);
    }
  };

  // Handle page change
  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    await fetchData(page);
  };

  // Handle refresh
  const handleRefresh = async () => {
    await fetchData(currentPage);
  };
  // Handle search change with debouncing
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    // Reset to page 1 when search changes
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };
  // Effect to fetch data when search query changes (with debouncing)
  useEffect(() => {
    if (!isOpen || !sqlQuery || !sqlQuery.trim()) return;

    // Only trigger on search changes, not on initial load
    if (searchQuery === "") return; // Skip empty search on initial load

    const timeoutId = setTimeout(() => {
      console.log(
        "🔍 Search triggered, fetching page 1 with query:",
        searchQuery
      );
      fetchData(1); // Always go to page 1 for new searches
    }, 500); // 500ms debounce

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Handle export
  const handleExport = () => {
    try {
      const csvContent = [
        columns.map((col) => col.label).join(","),
        ...filteredData.map((row) =>
          columns.map((col) => `"${row[col.key] || ""}"`).join(",")
        ),
      ].join("\\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `belanja_data_${new Date().toISOString().split("T")[0]}.csv`
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showToast("Data exported successfully", "success");
    } catch (error) {
      showToast("Failed to export data", "error");
    }
  };
  // Calculate grand totals for monetary columns
  const calculateGrandTotals = () => {
    if (data.length === 0) return {};

    const totals: { [key: string]: number } = {};

    const monetaryColumns = [
      "pagu",
      "realisasi",
      "sisa",
      "blokir",
      "PAGU_DIPA",
      "REALISASI",
      "BLOKIR",
      "total_pagu",
      "total_realisasi",
      "total_blokir",
      "pagu_rounded",
      "realisasi_rounded",
      "blokir_rounded",
      "sum_pagu",
      "sum_realisasi",
      "sum_blokir",
      "sisa_pagu",
    ];

    // Initialize totals
    columns.forEach((col) => {
      const isMonetary = monetaryColumns.some(
        (mc) =>
          col.key.toLowerCase().includes(mc.toLowerCase()) ||
          col.key.toLowerCase().includes("pagu") ||
          col.key.toLowerCase().includes("realisasi") ||
          col.key.toLowerCase().includes("blokir") ||
          /round\s*\(\s*sum\s*\(/i.test(col.key)
      );

      if (isMonetary) {
        totals[col.key] = 0;
      }
    });

    // Sum up the values
    data.forEach((row) => {
      Object.keys(totals).forEach((key) => {
        const value = row[key];
        if (value !== null && value !== undefined && value !== "") {
          const numValue =
            typeof value === "string" ? parseFloat(value) : value;
          if (typeof numValue === "number" && !isNaN(numValue)) {
            totals[key] += numValue;
          }
        }
      });
    });

    return totals;
  };

  const grandTotals = calculateGrandTotals();

  // Format currency
  const formatCurrency = (value: any) => {
    if (value === null || value === undefined || value === "") {
      return <span className="text-right block">-</span>;
    }

    const numValue = typeof value === "string" ? parseFloat(value) : value;
    if (typeof numValue === "number" && !isNaN(numValue)) {
      const formatted = new Intl.NumberFormat("id-ID", {
        minimumFractionDigits: 0,
      }).format(numValue);
      return <span className="text-right block">{formatted}</span>;
    }

    return <span className="text-right block">{value}</span>;
  };

  // Render cell content
  const renderCell = (item: TableData, columnKey: string) => {
    const value = item[columnKey];
    const monetaryColumns = [
      "pagu",
      "realisasi",
      "sisa",
      "blokir",
      "PAGU_DIPA",
      "REALISASI",
      "BLOKIR",
      "total_pagu",
      "total_realisasi",
      "total_blokir",
      "pagu_rounded",
      "realisasi_rounded",
      "blokir_rounded",
      "sum_pagu",
      "sum_realisasi",
      "sum_blokir",
      "sisa_pagu",
      "persentase_realisasi",
    ].map((col) => col.toLowerCase()); // Convert to lowercase for case-insensitive matching

    // Check if column is monetary (case-insensitive and partial matching)
    const isMonetaryColumn =
      monetaryColumns.includes(columnKey.toLowerCase()) ||
      columnKey.toLowerCase().includes("pagu") ||
      columnKey.toLowerCase().includes("realisasi") ||
      columnKey.toLowerCase().includes("blokir") ||
      columnKey.toLowerCase().includes("round(sum") ||
      /round\s*\(\s*sum\s*\(/i.test(columnKey);

    if (isMonetaryColumn) {
      return formatCurrency(value);
    }

    const centerAlignColumns = ["id", "kddept"];
    if (centerAlignColumns.includes(columnKey.toLowerCase())) {
      if (value === null || value === undefined) {
        return (
          <span className="text-gray-400 italic text-center block">-</span>
        );
      }
      return <span className="text-center block">{String(value)}</span>;
    }

    if (value === null || value === undefined) {
      return <span className="text-gray-400 italic">-</span>;
    }
    return String(value);
  };

  // Render grand total cell content
  const renderGrandTotalCell = (columnKey: string) => {
    const monetaryColumns = [
      "pagu",
      "realisasi",
      "sisa",
      "blokir",
      "PAGU_DIPA",
      "REALISASI",
      "BLOKIR",
      "total_pagu",
      "total_realisasi",
      "total_blokir",
      "pagu_rounded",
      "realisasi_rounded",
      "blokir_rounded",
      "sum_pagu",
      "sum_realisasi",
      "sum_blokir",
      "sisa_pagu",
    ];

    const isMonetary = monetaryColumns.some(
      (mc) =>
        columnKey.toLowerCase().includes(mc.toLowerCase()) ||
        columnKey.toLowerCase().includes("pagu") ||
        columnKey.toLowerCase().includes("realisasi") ||
        columnKey.toLowerCase().includes("blokir") ||
        /round\s*\(\s*sum\s*\(/i.test(columnKey)
    );

    // Find the last non-monetary column before monetary columns start
    const monetaryStartIndex = columns.findIndex((col) => {
      const colIsMonetary = monetaryColumns.some(
        (mc) =>
          col.key.toLowerCase().includes(mc.toLowerCase()) ||
          col.key.toLowerCase().includes("pagu") ||
          col.key.toLowerCase().includes("realisasi") ||
          col.key.toLowerCase().includes("blokir") ||
          /round\s*\(\s*sum\s*\(/i.test(col.key)
      );
      return colIsMonetary;
    });

    const currentColumnIndex = columns.findIndex(
      (col) => col.key === columnKey
    );
    const showGrandTotalLabel =
      currentColumnIndex === Math.max(0, monetaryStartIndex - 1);

    if (showGrandTotalLabel) {
      return (
        <span className="text-center block font-bold text-gray-900 dark:text-gray-100">
          Grand Total
        </span>
      );
    } else if (isMonetary && grandTotals[columnKey] !== undefined) {
      return formatCurrency(grandTotals[columnKey]);
    } else {
      return <span className="text-center block text-gray-400">-</span>;
    }
  }; // Fetch data when modal opens
  useEffect(() => {
    if (isOpen && sqlQuery && sqlQuery.trim() && retryCount < 3) {
      console.log("🔄 Modal opened, initializing data fetch...");
      setCurrentPage(1);
      setData([]);
      setError(null);
      setLastError(null);
      // Reset execution method tracking
      setExecutionMethod({
        method: null,
        queryTime: null,
        cacheHit: false,
        splitMethod: undefined,
        recordsSource: "Unknown",
      });
      setPagination({
        total: 0,
        totalPages: 0,
        currentPage: 1,
        hasNextPage: false,
        hasPrevPage: false,
      });

      // Add a small delay to prevent immediate re-renders
      const timeoutId = setTimeout(() => {
        fetchData(1);
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [isOpen, sqlQuery]); // Removed retryCount from dependencies to prevent loops
  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
      setCurrentPage(1);
      setRetryCount(0);
      setLastError(null);
      setError(null);
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      hideCloseButton={true}
      size="5xl"
      scrollBehavior="inside"
      classNames={{
        base: "max-h-[95vh] max-w-[95vw] m-0",
        backdrop: "bg-black/60",
        wrapper:
          "fixed inset-0 flex items-center justify-center p-6 overflow-hidden",
        body: "p-0",
        header: "border-b border-gray-200 dark:border-gray-700 px-4 py-3",
        footer: "border-t border-gray-200 dark:border-gray-700",
      }}
    >
      <ModalContent>
        {" "}
        <ModalHeader className="flex flex-row px-6 items-center justify-between min-h-0">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-md">
              <Database className="text-white" size={16} />
            </div>
            <div>
              <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Query Results
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight">
                Page {pagination.currentPage} of{" "}
                {pagination.totalPages === pagination.currentPage &&
                !pagination.hasNextPage
                  ? pagination.currentPage
                  : `${pagination.totalPages}+`}{" "}
                (
                {pagination.total >= 1000
                  ? `${Math.floor(pagination.total / 1000)}k+`
                  : pagination.total}{" "}
                records)
              </p>
            </div>
          </div>{" "}
          {(cutOff || selectedTahun || selectedPembulatan) && (
            <div className="text-right space-y-0.5">
              {cutOff && (
                <span className="text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-md block">
                  {CutOffQueryGenerator.getCutOffInfo(cutOff).description}{" "}
                  {selectedTahun}
                </span>
              )}
              {!cutOff && selectedTahun && (
                <span className="text-xs bg-gray-100 dark:bg-gray-900/40 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-md block">
                  Periode: {selectedTahun}
                </span>
              )}
              {selectedPembulatan && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {getRoundingText(selectedPembulatan)}
                </p>
              )}
            </div>
          )}
        </ModalHeader>{" "}
        <ModalBody>
          <div className="px-6 pt-3 pb-4 space-y-4">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-3 flex-1">
                <Input
                  placeholder="Search in results..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  startContent={<Search size={16} />}
                  className="max-w-xs"
                  size="sm"
                />{" "}
                <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                  Menampilkan 100 Baris Data per Halaman
                  {executionMethod.method === "cache" && (
                    <span className="text-xs bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 px-2 py-1 rounded-md flex items-center gap-1">
                      ⚡ Materialized Cache
                      {executionMethod.queryTime && (
                        <span className="font-mono">
                          ({executionMethod.queryTime}ms)
                        </span>
                      )}
                    </span>
                  )}
                  {executionMethod.method === "code-splitting" && (
                    <span className="text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-md flex items-center gap-1">
                      🔄 Code Splitting
                      {executionMethod.queryTime && (
                        <span className="font-mono">
                          ({executionMethod.queryTime}ms)
                        </span>
                      )}
                    </span>
                  )}{" "}
                  {executionMethod.method === "direct" && (
                    <span className="text-xs bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 px-2 py-1 rounded-md flex items-center gap-1">
                      📊 Direct Query
                      {executionMethod.queryTime && (
                        <span className="font-mono">
                          ({executionMethod.queryTime}ms)
                        </span>
                      )}
                      {executionMethod.queryTime &&
                        executionMethod.queryTime > 5000 && (
                          <span className="text-xs text-orange-600 dark:text-orange-400">
                            - Large Dataset
                          </span>
                        )}
                    </span>
                  )}
                  {!executionMethod.method && loading && (
                    <span className="text-xs bg-gray-100 dark:bg-gray-900/40 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-md flex items-center gap-1">
                      ⏳ Processing...
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="bordered"
                  startContent={<RefreshCw size={16} />}
                  onClick={handleRefresh}
                  isLoading={loading}
                >
                  Refresh
                </Button>
                <Button
                  size="sm"
                  color="success"
                  variant="flat"
                  startContent={<Download size={16} />}
                  onClick={handleExport}
                  isDisabled={data.length === 0}
                >
                  Export CSV
                </Button>
              </div>
            </div>

            {/* Table */}
            {error && data.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-red-500 mb-2">{error}</div>
                <Button
                  size="sm"
                  color="primary"
                  variant="flat"
                  onClick={handleRefresh}
                >
                  Retry
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <Table
                  aria-label="Query results table"
                  selectionMode="none"
                  classNames={{
                    wrapper: "min-h-[58vh] max-h-[58vh] overflow-auto",
                    th: "bg-gray-100 dark:bg-gray-800 sticky top-0 z-10",
                    thead: "sticky top-0 z-10",
                  }}
                >
                  <TableHeader
                    columns={
                      columns.length > 0
                        ? columns
                        : [{ key: "loading", label: "LOADING..." }]
                    }
                  >
                    {(column) => (
                      <TableColumn
                        key={column.key}
                        className={`text-center ${
                          column.key.toLowerCase() === "id"
                            ? "w-20 min-w-20"
                            : ""
                        }`}
                      >
                        <div className="flex items-center justify-center gap-1">
                          {column.label}
                        </div>
                      </TableColumn>
                    )}
                  </TableHeader>
                  <TableBody
                    items={
                      loading
                        ? []
                        : [
                            ...filteredData,
                            ...(data.length > 0
                              ? [{ id: "grand-total", isGrandTotal: true }]
                              : []),
                          ]
                    }
                    emptyContent={
                      loading ? (
                        <div className="flex justify-center items-center py-8">
                          <Spinner
                            variant="simple"
                            size="lg"
                            label="Loading data..."
                          />
                        </div>
                      ) : (
                        "No data available"
                      )
                    }
                  >
                    {(item) => (
                      <TableRow
                        key={item.id || Math.random()}
                        className={
                          item.isGrandTotal
                            ? "sticky bottom-0 bg-gray-100 dark:bg-gray-800 border-t-2 border-gray-300 dark:border-gray-600 shadow-lg z-10"
                            : ""
                        }
                      >
                        {(columnKey) => (
                          <TableCell
                            className={item.isGrandTotal ? "font-semibold" : ""}
                          >
                            {item.isGrandTotal
                              ? renderGrandTotalCell(String(columnKey))
                              : renderCell(item, String(columnKey))}
                          </TableCell>
                        )}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </ModalBody>{" "}
        <ModalFooter className="flex items-center gap-3">
          {/* Pagination */}
          <Card className="bg-gray-50/50 dark:bg-gray-900/30 border border-gray-200/50 dark:border-gray-700/50 flex-1">
            <CardBody className="px-3 h-14 flex items-center justify-center">
              {loading ? (
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Loading pagination...
                </div>
              ) : pagination.totalPages > 1 ? (
                <Pagination
                  total={pagination.totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  showControls
                  showShadow
                  size="sm"
                />
              ) : (
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {data.length > 0
                    ? `${data.length} record${
                        data.length !== 1 ? "s" : ""
                      } found`
                    : "No pagination needed"}
                </div>
              )}
            </CardBody>
          </Card>{" "}
          <Button
            color="danger"
            onPress={onClose}
            startContent={<X size={16} />}
            className="h-14 w-28"
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DataTableModal;
