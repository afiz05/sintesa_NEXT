"use client";
import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  Input,
  Select,
  SelectItem,
  Pagination,
  Chip,
  Divider,
} from "@heroui/react";
import { Play, Database, Clock, Search, RefreshCw } from "lucide-react";
import { useToast } from "../context/ToastContext";

interface QueryResult {
  success: boolean;
  result: any[];
  pagination: {
    total: number;
    totalPages: number;
    currentPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  queryTime: string;
  message: string;
}

const BelanjaTestPage: React.FC = () => {
  const [selectedQuery, setSelectedQuery] = useState("");
  const [customQuery, setCustomQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<QueryResult | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const { showToast } = useToast();

  // Predefined test queries
  const testQueries = [
    {
      id: "simple",
      name: "Simple Query - All Departments",
      query: `SELECT kddept, COUNT(*) as total_records, 
              SUM(pagu) as total_pagu, SUM(realisasi) as total_realisasi 
              FROM monev2025.pagu_real_detail_harian_2025 
              WHERE tanggal = (SELECT MAX(tanggal) FROM monev2025.pagu_real_detail_harian_2025)
              GROUP BY kddept`,
    },
    {
      id: "dept_001",
      name: "Specific Department (001)",
      query: `SELECT kddept, kdsatker, pagu, realisasi, blokir 
              FROM monev2025.pagu_real_detail_harian_2025 
              WHERE kddept = '001' AND tanggal = (SELECT MAX(tanggal) FROM monev2025.pagu_real_detail_harian_2025)`,
    },
    {
      id: "top_satkers",
      name: "Top 50 Satkers by Pagu",
      query: `SELECT kddept, kdsatker, SUM(pagu) as total_pagu, SUM(realisasi) as total_realisasi 
              FROM monev2025.pagu_real_detail_harian_2025 
              WHERE tanggal = (SELECT MAX(tanggal) FROM monev2025.pagu_real_detail_harian_2025)
              GROUP BY kddept, kdsatker 
              ORDER BY total_pagu DESC`,
    },
    {
      id: "monthly_summary",
      name: "Monthly Summary",
      query: `SELECT kddept, kdunit, COUNT(*) as total_items,
              SUM(pagu) as total_pagu, SUM(realisasi) as total_realisasi,
              ROUND((SUM(realisasi) / SUM(pagu)) * 100, 2) as realization_percent
              FROM monev2025.pagu_real_detail_harian_2025 
              WHERE tanggal = (SELECT MAX(tanggal) FROM monev2025.pagu_real_detail_harian_2025)
              GROUP BY kddept, kdunit
              HAVING total_pagu > 0`,
    },
  ];

  const executeQuery = async (queryToExecute: string, page: number = 1) => {
    if (!queryToExecute.trim()) {
      showToast("Please select or enter a query", "error");
      return;
    }

    setIsLoading(true);
    setCurrentPage(page);

    try {
      const backendUrl =
        process.env.NEXT_PUBLIC_LOCAL_SOCKET || "http://localhost:88";
      const encodedQuery = encodeURIComponent(queryToExecute);

      let url = `${backendUrl}/inquiryBelanja?queryParams=${encodedQuery}&page=${page}`;

      if (searchTerm.trim()) {
        url += `&search=${encodeURIComponent(searchTerm)}`;
      }

      console.log("🔗 Test API URL:", url);

      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `Server error (${response.status})`
        );
      }

      const data = await response.json();
      console.log("📊 Test Response:", data);

      if (data.success) {
        setResult(data);
        showToast(
          `Loaded ${data.result.length} records in ${data.queryTime}`,
          "success"
        );
      } else {
        throw new Error(data.message || "Query failed");
      }
    } catch (error) {
      console.error("❌ Test Query Error:", error);
      showToast(
        `Query failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        "error"
      );
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQueryChange = (queryId: string) => {
    const query = testQueries.find((q) => q.id === queryId);
    if (query) {
      setSelectedQuery(queryId);
      setCustomQuery(query.query);
    }
  };

  const handlePageChange = (page: number) => {
    if (customQuery.trim()) {
      executeQuery(customQuery, page);
    }
  };

  const handleSearch = () => {
    if (customQuery.trim()) {
      executeQuery(customQuery, 1);
    }
  };

  const formatValue = (value: any): string => {
    if (value === null || value === undefined) return "-";
    if (typeof value === "number" && value > 1000) {
      return new Intl.NumberFormat("id-ID").format(value);
    }
    return String(value);
  };

  const getColumns = () => {
    if (!result || !result.result || result.result.length === 0) return [];

    const firstRow = result.result[0];
    return Object.keys(firstRow).map((key) => ({
      key,
      label: key.toUpperCase().replace(/_/g, " "),
    }));
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
              <Database className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Belanja Query Test Page
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Test the new clean belanja inquiry system with paginated results
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Query Selection */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Query Selection</h2>
        </CardHeader>
        <CardBody className="space-y-4">
          <Select
            label="Predefined Test Queries"
            placeholder="Choose a test query"
            selectedKeys={selectedQuery ? [selectedQuery] : []}
            onSelectionChange={(keys) => {
              const key = Array.from(keys)[0] as string;
              if (key) handleQueryChange(key);
            }}
          >
            {testQueries.map((query) => (
              <SelectItem key={query.id} value={query.id}>
                {query.name}
              </SelectItem>
            ))}
          </Select>

          <Input
            label="Custom SQL Query"
            placeholder="Enter your SQL query here..."
            value={customQuery}
            onChange={(e) => setCustomQuery(e.target.value)}
            type="textarea"
            minRows={4}
            maxRows={8}
          />

          <div className="flex gap-3 items-center">
            <Button
              color="primary"
              startContent={<Play size={16} />}
              onClick={() => executeQuery(customQuery, 1)}
              isLoading={isLoading}
              isDisabled={!customQuery.trim()}
            >
              Execute Query
            </Button>

            <Input
              placeholder="Search in results..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              startContent={<Search size={16} />}
              className="max-w-xs"
              size="sm"
            />

            <Button
              variant="bordered"
              startContent={<Search size={16} />}
              onClick={handleSearch}
              isDisabled={!customQuery.trim() || isLoading}
              size="sm"
            >
              Search
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Results */}
      {result && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold">Query Results</h2>
                <div className="flex gap-4 mt-2">
                  <Chip size="sm" variant="flat" color="primary">
                    {result.result.length} records shown
                  </Chip>
                  <Chip size="sm" variant="flat" color="secondary">
                    {result.pagination.total} total records
                  </Chip>
                  <Chip
                    size="sm"
                    variant="flat"
                    color="success"
                    startContent={<Clock size={12} />}
                  >
                    {result.queryTime}
                  </Chip>
                </div>
              </div>

              <Button
                variant="bordered"
                size="sm"
                startContent={<RefreshCw size={16} />}
                onClick={() => executeQuery(customQuery, currentPage)}
                isLoading={isLoading}
              >
                Refresh
              </Button>
            </div>
          </CardHeader>

          <CardBody>
            <div className="space-y-4">
              {/* Table */}
              <Table aria-label="Query results">
                <TableHeader columns={getColumns()}>
                  {(column) => (
                    <TableColumn key={column.key} className="text-center">
                      {column.label}
                    </TableColumn>
                  )}
                </TableHeader>
                <TableBody items={result.result} emptyContent="No data found">
                  {(item) => (
                    <TableRow key={Math.random()}>
                      {(columnKey) => (
                        <TableCell className="text-center">
                          {formatValue(item[columnKey as string])}
                        </TableCell>
                      )}
                    </TableRow>
                  )}
                </TableBody>
              </Table>

              {/* Pagination */}
              {result.pagination.totalPages > 1 && (
                <>
                  <Divider />
                  <div className="flex justify-center">
                    <Pagination
                      total={result.pagination.totalPages}
                      page={result.pagination.currentPage}
                      onChange={handlePageChange}
                      showControls
                      showShadow
                    />
                  </div>
                </>
              )}
            </div>
          </CardBody>
        </Card>
      )}

      {/* Loading State */}
      {isLoading && !result && (
        <Card>
          <CardBody className="flex justify-center items-center py-12">
            <div className="flex flex-col items-center gap-4">
              <Spinner size="lg" />
              <p className="text-gray-500">Executing query...</p>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default BelanjaTestPage;
