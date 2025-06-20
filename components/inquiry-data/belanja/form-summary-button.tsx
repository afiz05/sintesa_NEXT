"use client";
import React, { useCallback } from "react";
import { Button, Tooltip } from "@heroui/react";
import { Search, Download, RefreshCw, Copy } from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useToast } from "../../context/ToastContext";
import { SwitchState } from "./context";

interface FormSummaryButtonProps {
  isLoading: boolean;
  generateSQLQuery: () => string;
  generateModularQuery: () => string;
  resetAllState: () => void;
  onSearchSubmit: () => void;
  setIsModalOpen: (isOpen: boolean) => void;
  setCurrentSqlQuery: (query: string) => void;
  setIsLoading: (loading: boolean) => void;
  activeFiltersCount: number;
  switches: SwitchState;
}

const FormSummaryButton: React.FC<FormSummaryButtonProps> = ({
  isLoading,
  generateSQLQuery,
  generateModularQuery,
  resetAllState,
  onSearchSubmit,
  setIsModalOpen,
  setCurrentSqlQuery,
  setIsLoading,
  activeFiltersCount,
  switches,
}) => {
  const { showToast } = useToast();

  // Handle Excel export functionality
  const handleExport = useCallback(async () => {
    try {
      // Generate SQL query first
      const sqlQuery = generateSQLQuery();
      if (
        !sqlQuery ||
        sqlQuery.trim() === "" ||
        sqlQuery.includes("No data to display")
      ) {
        showToast(
          "No valid query to execute. Please check your form settings.",
          "warning"
        );
        return;
      }

      setIsLoading(true);
      showToast("Fetching data for export...", "info");

      // Make request to backend API
      const backendUrl =
        process.env.NEXT_PUBLIC_LOCAL_SOCKET || "http://localhost:88";
      const encodedQuery = encodeURIComponent(sqlQuery);

      console.log("🚀 Frontend: Making GET request for export data");
      console.log("📊 SQL Query:", sqlQuery);

      const response = await fetch(
        `${backendUrl}/inquiryBelanja?queryParams=${encodedQuery}&limit=100000`, // Increased limit for export
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

      const result = await response.json();

      if (!result.success) {
        throw new Error(
          result.message || result.error || "Failed to fetch data"
        );
      }

      let exportData = result.result || [];

      if (exportData.length === 0) {
        showToast("No data found to export", "warning");
        return;
      }

      // Excel row limit warning (Excel 2007+ supports 1,048,576 rows)
      const EXCEL_MAX_ROWS = 1048576;
      if (exportData.length >= EXCEL_MAX_ROWS) {
        showToast(
          `⚠️ Warning: Data contains ${exportData.length.toLocaleString()} rows. Excel limit is ${EXCEL_MAX_ROWS.toLocaleString()} rows. Only the first ${EXCEL_MAX_ROWS.toLocaleString()} rows will be exported.`,
          "warning"
        );
        exportData = exportData.slice(0, EXCEL_MAX_ROWS - 1); // -1 to account for header
      }

      // Prepare data for Excel export
      const worksheetData = exportData.map((row: any, index: number) => ({
        NO: index + 1,
        ...row,
      }));

      // Create workbook and worksheet
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(worksheetData);

      // Auto-size columns
      const columnWidths = Object.keys(worksheetData[0] || {}).map((key) => {
        const maxLength = Math.max(
          key.length,
          ...worksheetData
            .map((row: any) => String(row[key] || "").length)
            .slice(0, 100) // Check only first 100 rows for performance
        );
        return { wch: Math.min(Math.max(maxLength, 10), 50) }; // Min 10, max 50 chars
      });
      worksheet["!cols"] = columnWidths;

      // Add worksheet to workbook
      const sheetName = "Belanja Data";
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

      // Generate filename with timestamp
      const timestamp = new Date()
        .toISOString()
        .replace(/[:.]/g, "-")
        .split("T")[0];
      const filename = `belanja_data_${timestamp}.xlsx`;

      // Write workbook and trigger download
      const workbookBlob = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const blob = new Blob([workbookBlob], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      saveAs(blob, filename);

      showToast(
        `✅ Excel file exported successfully! ${exportData.length.toLocaleString()} rows exported.`,
        "success"
      );
    } catch (error) {
      console.error("Export error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      showToast(`❌ Export failed: ${errorMessage}`, "error");
    } finally {
      setIsLoading(false);
    }
  }, [generateSQLQuery, showToast, setIsLoading]);

  // Function to get SQL query and copy to clipboard
  const handleGetSQL = useCallback(async () => {
    try {
      // Generate SQL query using the new modular approach
      const sqlQuery = generateModularQuery();

      // Copy to clipboard
      await navigator.clipboard.writeText(sqlQuery);

      // Show success toast
      showToast("SQL query copied to clipboard!", "success");
    } catch (error) {
      console.error("Failed to copy SQL query:", error);
      showToast("Failed to copy SQL query", "error");
    }
  }, [generateModularQuery, showToast]);

  // Function to open modal with generated SQL
  const openModalWithSQL = useCallback(() => {
    try {
      // Use the new modular approach when possible
      const sqlQuery = generateModularQuery();
      setCurrentSqlQuery(sqlQuery);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error generating SQL query:", error);
      showToast("Failed to generate SQL query", "error");
    }
  }, [generateModularQuery, showToast, setCurrentSqlQuery, setIsModalOpen]);

  // Update handleSubmit to use the new function
  const handleSubmitWithModal = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);

      try {
        openModalWithSQL();
        showToast("Opening query results...", "success");
      } catch (error) {
        console.error("Error opening modal:", error);
        showToast("Failed to open query results", "error");
      } finally {
        setIsLoading(false);
      }
    },
    [openModalWithSQL, showToast, setIsLoading]
  );
  const handleSearchClick = () => {
    handleSubmitWithModal({
      preventDefault: () => {},
    } as React.FormEvent);
  };

  // Check if buttons should be disabled
  // Disable if no filters selected OR if only cutOff is selected (which filters to no data)
  const isOnlyCutOffSelected = activeFiltersCount === 1 && switches.cutOff;
  const shouldDisableButtons = activeFiltersCount === 0 || isOnlyCutOffSelected;

  return (
    <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200 dark:border-gray-700 justify-center">
      <Tooltip
        content="Silahkan Pilih Query Filter Terlebih Dahulu"
        isDisabled={!shouldDisableButtons}
        placement="top"
        showArrow={true}
        className="max-w-xs text-center"
        color="danger"
      >
        <div className="inline-block">
          <Button
            type="button"
            color="primary"
            isLoading={isLoading}
            startContent={!isLoading && <Search size={18} />}
            className="min-w-[180px]"
            onClick={handleSearchClick}
            isDisabled={shouldDisableButtons || isLoading}
          >
            {isLoading ? "Searching..." : "Search Data"}
          </Button>
        </div>
      </Tooltip>{" "}
      <Button
        type="button"
        variant="bordered"
        startContent={<RefreshCw size={18} />}
        className="min-w-[180px]"
        onClick={resetAllState}
        isDisabled={shouldDisableButtons}
      >
        Reset Form
      </Button>
      <Button
        type="button"
        color="success"
        variant="flat"
        startContent={!isLoading && <Download size={18} />}
        className="min-w-[180px]"
        onClick={handleExport}
        isLoading={isLoading}
        isDisabled={shouldDisableButtons || isLoading}
      >
        {isLoading ? "Exporting..." : "Export to Excel"}
      </Button>
      <Button
        type="button"
        color="warning"
        variant="flat"
        startContent={<Copy size={18} />}
        className="min-w-[180px]"
        onClick={handleGetSQL}
        isDisabled={shouldDisableButtons}
      >
        Get SQL
      </Button>
    </div>
  );
};

export default FormSummaryButton;
