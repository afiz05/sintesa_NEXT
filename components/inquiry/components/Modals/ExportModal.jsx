"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  RadioGroup,
  Radio,
  Spinner,
  Divider,
} from "@heroui/react";
import { X, FileSpreadsheet, FileText, Download } from "lucide-react";
// Assuming useToast is correctly imported and available in your project setup.
// import { useToast } from "../../../../components/context/ToastContext";

// Placeholder for useToast if not available in this specific environment
const useToast = () => ({
  showToast: (message, type) => {
    console.log(`Toast (${type}): ${message}`);
    // In a real application, you'd render a visible toast here.
  },
});

const ExportModal = ({ isOpen, onClose, data, filename = "data_export" }) => {
  const [exportFormat, setExportFormat] = useState("csv");
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const handleExport = async () => {
    if (!data || data.length === 0) {
      showToast("Tidak ada data untuk diekspor", "error");
      return;
    }

    setLoading(true);

    try {
      if (exportFormat === "csv") {
        exportToCSV();
      } else if (exportFormat === "excel") {
        // Note: For a true Excel (.xlsx) export, you would typically need a library
        // This currently just exports a CSV that Excel can open.
        exportToExcel();
      } else if (exportFormat === "json") {
        exportToJSON();
      }

      showToast(
        `Data berhasil diekspor ke format ${exportFormat.toUpperCase()}`,
        "success"
      );
      onClose();
    } catch (error) {
      console.error("Export error:", error);
      showToast(`Gagal mengekspor data: ${error.message}`, "error");
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    if (!data || data.length === 0) return; // Defensive check

    // Get headers from the first object
    const headers = Object.keys(data[0]);

    // Convert data to CSV format
    let csvContent = headers.map((header) => `"${header}"`).join(",") + "\n"; // Quote headers too

    data.forEach((item) => {
      const row = headers.map((header) => {
        // Handle values that need quotes (strings with commas, quotes, or newlines)
        const cell =
          item[header] === null || item[header] === undefined
            ? ""
            : String(item[header]);
        // FIX: Escaped double quote here
        if (cell.includes(",") || cell.includes('"') || cell.includes("\n")) {
          return `"${cell.replace(/"/g, '""')}"`;
        }
        return cell;
      });
      csvContent += row.join(",") + "\n";
    });

    // Create a Blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url); // Clean up the object URL
  };

  const exportToExcel = () => {
    // For Excel export, this implementation still uses CSV, which Excel can open.
    // For a native .xlsx file, you would integrate a library like 'xlsx' or 'exceljs'.
    // Example (conceptual, requires library installation):
    /*
    import * as XLSX from 'xlsx';
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, `${filename}.xlsx`);
    */
    showToast(
      "Exporting to Excel (as CSV compatible). For full .xlsx, a library is needed.",
      "info"
    );
    exportToCSV(); // Fallback to CSV for Excel compatibility
  };

  const exportToJSON = () => {
    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}.json`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url); // Clean up the object URL
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" scrollBehavior="inside">
      <ModalContent>
        <ModalHeader className="flex justify-between items-center">
          <div className="text-lg font-semibold flex items-center">
            <Download className="mr-2 text-blue-600" size={20} />
            Ekspor Data
          </div>
        </ModalHeader>

        <ModalBody>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Pilih format file untuk mengekspor data:
            </p>

            <RadioGroup
              value={exportFormat}
              onValueChange={setExportFormat}
              orientation="vertical"
              className="gap-3"
            >
              <Radio
                value="csv"
                description="Format yang kompatibel dengan sebagian besar aplikasi spreadsheet"
              >
                <div className="flex items-center">
                  <FileText className="mr-2 text-green-600" size={18} />
                  <span>CSV (Comma Separated Values)</span>
                </div>
              </Radio>

              <Radio
                value="excel"
                description="Format Microsoft Excel yang umum digunakan"
              >
                <div className="flex items-center">
                  <FileSpreadsheet className="mr-2 text-green-600" size={18} />
                  <span>Excel (.xlsx)</span>
                </div>
              </Radio>

              <Radio
                value="json"
                description="Format data terstruktur untuk pengembang"
              >
                <div className="flex items-center">
                  <FileText className="mr-2 text-blue-600" size={18} />
                  <span>JSON</span>
                </div>
              </Radio>
            </RadioGroup>

            <Divider className="my-2" />

            <div className="text-xs text-gray-500">
              <p>Total data: {data?.length || 0} baris</p>
              <p>
                Nama file: {filename}.{exportFormat}
              </p>
            </div>
          </div>
        </ModalBody>

        <ModalFooter className="flex justify-between">
          <Button
            color="danger"
            variant="light"
            onPress={onClose}
            disabled={loading}
            startContent={<X size={16} />}
          >
            Batal
          </Button>

          <Button
            color="primary"
            onPress={handleExport}
            disabled={loading || !data || data.length === 0}
            startContent={
              loading ? <Spinner size="sm" /> : <Download size={16} />
            }
          >
            {loading ? "Mengekspor..." : "Ekspor"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ExportModal;
