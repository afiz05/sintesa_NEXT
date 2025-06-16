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
  Chip,
  Input,
  Select,
  SelectItem,
  Pagination,
  Card,
  CardBody,
} from "@heroui/react";
import {
  Search,
  Download,
  RefreshCw,
  Database,
  FileText,
  Filter,
  X,
} from "lucide-react";
import { useToast } from "../../context/ToastContext";

interface DataTableModalProps {
  isOpen: boolean;
  onClose: () => void;
  sqlQuery: string;
}

interface TableData {
  [key: string]: any;
}

interface ApiResponse {
  success: boolean;
  data: TableData[];
  total: number;
  message?: string;
}

const DataTableModal: React.FC<DataTableModalProps> = ({
  isOpen,
  onClose,
  sqlQuery,
}) => {
  const [data, setData] = useState<TableData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<
    "ascending" | "descending"
  >("ascending");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { showToast } = useToast();
  // Extract columns from data
  const columns = useMemo(() => {
    if (data.length === 0) return [];

    const allKeys = Object.keys(data[0]);

    // Separate ID column from other columns
    const idKey = allKeys.find((key) => key.toLowerCase() === "id");
    const otherKeys = allKeys.filter((key) => key.toLowerCase() !== "id");

    // Create columns array with ID first, then others
    const orderedKeys = idKey ? [idKey, ...otherKeys] : allKeys;

    // Custom header mapping
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
  }, [data]);

  // Filter and sort data
  const filteredData = useMemo(() => {
    let filtered = data;

    // Apply search filter
    if (searchQuery) {
      filtered = data.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Apply sorting
    if (sortColumn) {
      filtered = [...filtered].sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];

        if (aValue === null || aValue === undefined) return 1;
        if (bValue === null || bValue === undefined) return -1;

        const comparison = String(aValue).localeCompare(String(bValue));
        return sortDirection === "ascending" ? comparison : -comparison;
      });
    }

    return filtered;
  }, [data, searchQuery, sortColumn, sortDirection]);

  // Paginate data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredData.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredData, currentPage, rowsPerPage]);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  // Fetch data based on SQL query
  const fetchData = async () => {
    if (!sqlQuery.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // Make direct GET request to backend like other inquiry endpoints
      const backendUrl =
        process.env.NEXT_PUBLIC_LOCAL_SOCKET || "http://localhost:88";
      const encodedQuery = encodeURIComponent(sqlQuery);

      console.log("🚀 Frontend: Making GET request directly to backend");
      console.log("📊 SQL Query:", sqlQuery);
      const response = await fetch(
        `${backendUrl}/inquiryBelanja?queryParams=${encodedQuery}&limit=1000`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json(); // Handle backend response structure
      if (result.success) {
        let processedData = result.result || []; // Automatically add ID if not present
        if (
          processedData.length > 0 &&
          !processedData[0].hasOwnProperty("id")
        ) {
          processedData = processedData.map((row: any, index: number) => ({
            id: index + 1,
            ...row,
          }));
        } // Auto-sort by appropriate column based on what's available
        if (processedData.length > 0) {
          let sortColumn = "";
          let sortValue = (item: any) => "";

          // Prioritize sorting: kddept > nmdept > first available column
          if (processedData[0].hasOwnProperty("kddept")) {
            sortColumn = "kddept";
            sortValue = (item: any) => String(item.kddept || "");
          } else if (processedData[0].hasOwnProperty("nmdept")) {
            sortColumn = "nmdept";
            sortValue = (item: any) => String(item.nmdept || "");
          } else {
            // Use first available column for sorting
            const firstColumn = Object.keys(processedData[0]).find(
              (key) => key !== "id"
            );
            if (firstColumn) {
              sortColumn = firstColumn;
              sortValue = (item: any) => String(item[firstColumn] || "");
            }
          }

          if (sortColumn) {
            processedData.sort((a: any, b: any) => {
              return sortValue(a).localeCompare(sortValue(b));
            });

            // Re-assign sequential IDs after sorting
            processedData = processedData.map((row: any, index: number) => ({
              ...row,
              id: index + 1,
            }));
          }
        }

        setData(processedData);
        showToast(
          `Successfully loaded ${processedData.length || 0} records`,
          "success"
        );
      } else {
        throw new Error(
          result.message || result.error || "Failed to fetch data"
        );
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      showToast(`Error fetching data: ${errorMessage}`, "error");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle sort column change
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(
        sortDirection === "ascending" ? "descending" : "ascending"
      );
    } else {
      setSortColumn(column);
      setSortDirection("ascending");
    }
  };

  // Handle export data
  const handleExport = () => {
    try {
      const csvContent = [
        // Header
        columns.map((col) => col.label).join(","),
        // Data rows
        ...filteredData.map((row) =>
          columns.map((col) => `"${row[col.key] || ""}"`).join(",")
        ),
      ].join("\n");

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
  }; // Format currency values
  const formatCurrency = (value: any) => {
    // Handle null/undefined values
    if (value === null || value === undefined || value === "") {
      return <span className="text-right block">-</span>;
    }

    // Convert string to number if needed
    const numValue = typeof value === "string" ? parseFloat(value) : value;

    // Check if it's a valid number
    if (typeof numValue === "number" && !isNaN(numValue)) {
      const formatted = new Intl.NumberFormat("id-ID", {
        minimumFractionDigits: 0,
      }).format(numValue);
      return <span className="text-right block">{formatted}</span>;
    }

    return <span className="text-right block">{value}</span>;
  }; // Render cell content
  const renderCell = (item: TableData, columnKey: string) => {
    const value = item[columnKey];

    // Format currency for monetary columns
    const monetaryColumns = [
      "pagu",
      "realisasi",
      "sisa",
      "PAGU_DIPA",
      "REALISASI",
      "BLOKIR",
    ];
    if (monetaryColumns.includes(columnKey)) {
      return formatCurrency(value);
    }

    // Center align for ID and KDDEPT columns
    const centerAlignColumns = ["id", "kddept"];
    if (centerAlignColumns.includes(columnKey.toLowerCase())) {
      if (value === null || value === undefined) {
        return (
          <span className="text-gray-400 italic text-center block">-</span>
        );
      }
      return <span className="text-center block">{String(value)}</span>;
    }

    // Handle null/undefined values
    if (value === null || value === undefined) {
      return <span className="text-gray-400 italic">-</span>;
    }

    return String(value);
  };

  // Fetch data when modal opens or SQL query changes
  useEffect(() => {
    if (isOpen && sqlQuery) {
      fetchData();
    }
  }, [isOpen, sqlQuery]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
      setCurrentPage(1);
      setSortColumn("");
      setSortDirection("ascending");
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
        base: "max-h-[90vh] max-w-[95vw]",
        backdrop: "bg-black/60",
        wrapper: "flex items-center justify-center p-4",
        body: "p-0",
        header: "border-b border-gray-200 dark:border-gray-700",
        footer: "border-t border-gray-200 dark:border-gray-700",
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-md">
              <Database className="text-white" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Query Results
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {filteredData.length} records found
              </p>
            </div>
          </div>
        </ModalHeader>{" "}
        <ModalBody>
          <div className="p-6 space-y-4">
            {/* SQL Query Display - Temporarily removed for better view */}
            {/* 
            <Card className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700">
              <CardBody className="p-2">
                <div className="flex items-center gap-1 mb-1">
                  <FileText
                    className="text-gray-600 dark:text-gray-400"
                    size={12}
                  />
                  <span className="text-[10px] font-medium text-gray-700 dark:text-gray-300">
                    SQL Query
                  </span>
                </div>
                <code className="text-[10px] text-gray-600 dark:text-gray-400 block whitespace-pre-wrap break-all leading-tight">
                  {sqlQuery}
                </code>
              </CardBody>
            </Card>
            */}
            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-3 flex-1">
                <Input
                  placeholder="Search in results..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  startContent={<Search size={16} />}
                  className="max-w-xs"
                  size="sm"
                />{" "}
                <Select
                  placeholder="Rows per page"
                  selectedKeys={[String(rowsPerPage)]}
                  onSelectionChange={(keys) => {
                    const selected = Array.from(keys)[0] as string;
                    setRowsPerPage(Number(selected));
                    setCurrentPage(1);
                  }}
                  className="max-w-[120px]"
                  size="sm"
                >
                  <SelectItem key="5">5</SelectItem>
                  <SelectItem key="10">10</SelectItem>
                  <SelectItem key="25">25</SelectItem>
                  <SelectItem key="50">50</SelectItem>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="bordered"
                  startContent={<RefreshCw size={16} />}
                  onClick={fetchData}
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
            </div>{" "}
            {/* Table */}
            {error && data.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-red-500 mb-2">{error}</div>
                <Button
                  size="sm"
                  color="primary"
                  variant="flat"
                  onClick={fetchData}
                >
                  Retry
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {" "}
                <Table
                  aria-label="Query results table"
                  selectionMode="none"
                  classNames={{
                    wrapper: "min-h-[45vh] max-h-[45vh] overflow-auto",
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
                        className={`cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 text-center ${
                          column.key.toLowerCase() === "id"
                            ? "w-20 min-w-20"
                            : ""
                        }`}
                        onClick={() =>
                          columns.length > 0 && handleSort(column.key)
                        }
                      >
                        <div className="flex items-center justify-center gap-1">
                          {column.label}
                          {sortColumn === column.key && columns.length > 0 && (
                            <span className="text-xs">
                              {sortDirection === "ascending" ? "↑" : "↓"}
                            </span>
                          )}
                        </div>
                      </TableColumn>
                    )}
                  </TableHeader>
                  <TableBody
                    items={loading ? [] : paginatedData}
                    emptyContent={
                      loading ? (
                        <div className="flex justify-center items-center py-8">
                          <Spinner size="lg" label="Loading data..." />
                        </div>
                      ) : (
                        "No data available"
                      )
                    }
                  >
                    {(item) => (
                      <TableRow key={item.id || Math.random()}>
                        {(columnKey) => (
                          <TableCell>
                            {renderCell(item, String(columnKey))}
                          </TableCell>
                        )}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}{" "}
            {/* Pagination - Always show for consistent layout */}
            <Card className="bg-gray-50/50 dark:bg-gray-900/30 border border-gray-200/50 dark:border-gray-700/50">
              <CardBody className="p-3 h-16 flex items-center justify-center">
                {loading ? (
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Loading pagination...
                  </div>
                ) : totalPages > 1 ? (
                  <Pagination
                    total={totalPages}
                    page={currentPage}
                    onChange={setCurrentPage}
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
            </Card>
          </div>
        </ModalBody>{" "}
        <ModalFooter>
          <Button
            color="danger"
            onPress={onClose}
            startContent={<X size={16} />}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DataTableModal;
