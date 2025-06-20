"use client";
import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";
import { Database, Search, BarChart3 } from "lucide-react";
import DataTableModal from "./data-table-modal";

/**
 * Test component to demonstrate async pagination functionality
 * This component allows testing different query scenarios
 */
const AsyncPaginationDemo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuery, setSelectedQuery] =
    useState<keyof typeof testQueries>("small_dataset");
  const [customQuery, setCustomQuery] = useState("");

  // Predefined test queries
  const testQueries = {
    small_dataset: {
      name: "Small Dataset (≤1000 records)",
      description: "Tests client-side pagination",
      query: `
        SELECT 
          ROW_NUMBER() OVER (ORDER BY kddept) as id,
          kddept,
          nmdept,
          COUNT(*) as jumlah_satker,
          SUM(COALESCE(PAGU_DIPA, 0)) as total_pagu,
          SUM(COALESCE(REALISASI, 0)) as total_realisasi,
          SUM(COALESCE(BLOKIR, 0)) as total_blokir
        FROM monev2025.pagu_real_detail_harian_2025
        WHERE kddept IS NOT NULL
        GROUP BY kddept, nmdept
        ORDER BY kddept
      `,
    },
    large_dataset: {
      name: "Large Dataset (>1000 records)",
      description: "Tests server-side async pagination",
      query: `
        SELECT 
          ROW_NUMBER() OVER (ORDER BY kddept, kdsatker, kdprogram, kdgiat) as id,
          kddept,
          nmdept,
          kdsatker,
          nmsatker,
          kdprogram,
          nmprogram,
          kdgiat,
          nmgiat,
          COALESCE(PAGU_DIPA, 0) as pagu,
          COALESCE(REALISASI, 0) as realisasi,
          COALESCE(BLOKIR, 0) as blokir,
          CASE 
            WHEN PAGU_DIPA > 0 THEN ROUND((REALISASI / PAGU_DIPA) * 100, 2)
            ELSE 0
          END as persentase_realisasi
        FROM monev2025.pagu_real_detail_harian_2025
        WHERE kddept IS NOT NULL
          AND kdsatker IS NOT NULL
          AND PAGU_DIPA > 0
        ORDER BY kddept, kdsatker, kdprogram, kdgiat
      `,
    },
    detail_belanja: {
      name: "Detailed Belanja Data",
      description: "Very large dataset with all details",
      query: `
        SELECT 
          ROW_NUMBER() OVER (ORDER BY kddept, kdsatker, kdprogram, kdgiat, kdoutput, kdakun) as id,
          kddept,
          nmdept,
          kdsatker,
          nmsatker,
          kdprogram,
          nmprogram,
          kdgiat,
          nmgiat,
          kdoutput,
          nmoutput,
          kdakun,
          nmakun,
          kditm,
          nmitm,
          kode_item,
          item,
          COALESCE(PAGU_DIPA, 0) as PAGU_DIPA,
          COALESCE(REALISASI, 0) as REALISASI,
          COALESCE(BLOKIR, 0) as BLOKIR,
          CASE 
            WHEN PAGU_DIPA > 0 THEN ROUND((REALISASI / PAGU_DIPA) * 100, 2)
            ELSE 0
          END as persentase_realisasi,
          CASE 
            WHEN PAGU_DIPA > 0 THEN PAGU_DIPA - REALISASI - BLOKIR
            ELSE 0
          END as sisa_anggaran
        FROM monev2025.pagu_real_detail_harian_2025
        WHERE kddept IS NOT NULL
          AND kdsatker IS NOT NULL
          AND kdprogram IS NOT NULL
        ORDER BY kddept, kdsatker, kdprogram, kdgiat, kdoutput, kdakun
      `,
    },
    custom: {
      name: "Custom Query",
      description: "Enter your own SQL query",
      query: "",
    },
  };

  const handleOpenModal = () => {
    let queryToUse = "";

    if (selectedQuery === "custom") {
      queryToUse = customQuery.trim();
    } else {
      queryToUse = testQueries[selectedQuery]?.query.trim();
    }

    if (!queryToUse) {
      alert("Please select a query or enter a custom query");
      return;
    }

    setIsModalOpen(true);
  };

  const getCurrentQuery = () => {
    if (selectedQuery === "custom") {
      return customQuery.trim();
    }
    return testQueries[selectedQuery]?.query.trim() || "";
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-md">
            <BarChart3 className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Async Pagination Demo
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Test async pagination with different dataset sizes
            </p>
          </div>
        </CardHeader>
        <CardBody className="space-y-6">
          {/* Query Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Database size={20} />
              Select Test Query
            </h3>

            <Select
              label="Query Type"
              placeholder="Choose a test query"
              selectedKeys={[selectedQuery]}
              onSelectionChange={(keys) =>
                setSelectedQuery(
                  Array.from(keys)[0] as keyof typeof testQueries
                )
              }
              className="max-w-md"
            >
              {Object.entries(testQueries).map(([key, query]) => (
                <SelectItem key={key}>
                  <div>
                    <div className="font-medium">{query.name}</div>
                    <div className="text-sm text-gray-500">
                      {query.description}
                    </div>
                  </div>
                </SelectItem>
              ))}
            </Select>

            {selectedQuery === "custom" && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Custom SQL Query</label>
                <textarea
                  value={customQuery}
                  onChange={(e) => setCustomQuery(e.target.value)}
                  placeholder="Enter your SQL query here..."
                  className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm font-mono"
                  rows={6}
                />
              </div>
            )}
          </div>

          {/* Query Preview */}
          {selectedQuery !== "custom" && testQueries[selectedQuery] && (
            <div className="space-y-2">
              <h4 className="text-md font-medium">Query Preview</h4>
              <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <pre className="text-xs text-gray-600 dark:text-gray-400 whitespace-pre-wrap overflow-x-auto">
                  {testQueries[selectedQuery].query}
                </pre>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              color="primary"
              size="lg"
              startContent={<Search size={20} />}
              onClick={handleOpenModal}
              className="bg-gradient-to-r from-blue-500 to-indigo-600"
            >
              Run Query & Test Pagination
            </Button>
          </div>

          {/* Features List */}
          <div className="grid md:grid-cols-2 gap-4 mt-8">
            <Card className="border border-green-200 dark:border-green-800">
              <CardBody className="space-y-2">
                <h4 className="font-semibold text-green-700 dark:text-green-400">
                  ⚡ Server-side Pagination Features
                </h4>{" "}
                <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• Automatic for datasets {`>`} 1000 records</li>
                  <li>• Async data loading page by page</li>
                  <li>• Server-side search and sorting</li>
                  <li>• Efficient memory usage</li>
                  <li>• Separate totals calculation</li>
                </ul>
              </CardBody>
            </Card>

            <Card className="border border-blue-200 dark:border-blue-800">
              <CardBody className="space-y-2">
                <h4 className="font-semibold text-blue-700 dark:text-blue-400">
                  📄 Client-side Pagination Features
                </h4>{" "}
                <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• Automatic for datasets ≤ 1000 records</li>
                  <li>• All data cached for fast access</li>
                  <li>• Instant search and sorting</li>
                  <li>• No network requests for navigation</li>
                  <li>• Real-time grand totals</li>
                </ul>
              </CardBody>
            </Card>
          </div>
        </CardBody>
      </Card>

      {/* Data Table Modal */}
      <DataTableModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        sqlQuery={getCurrentQuery()}
        selectedTahun="2025"
        selectedPembulatan="Rupiah"
      />
    </div>
  );
};

export default AsyncPaginationDemo;
