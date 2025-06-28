"use client";
import React from "react";
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
import {
  X,
  FileSpreadsheet,
  FileText,
  Download,
  FileType2,
  FileSignature,
} from "lucide-react";
import {
  exportToJSON,
  exportToText,
  exportToExcel,
  exportToPDF,
} from "../../exportUtils";

// Assuming useToast is correctly imported and available in your project setup.
// import { useToast } from "../../../../components/context/ToastContext";

// Placeholder for useToast if not available in this specific environment
const useToast = () => ({
  showToast: (message, type) => {
    console.log(`Toast (${type}): ${message}`);
    // In a real application, you'd render a visible toast here.
  },
});

const ExportModal = ({
  showModalPDF, // boolean: open/close state
  setShowModalPDF, // function: set modal open/close
  selectedFormat,
  setSelectedFormat,
  fetchExportData, // <-- async function to fetch latest data
  filename = "data_export",
  loading,
}) => {
  // Handler for export button
  const handleExport = async () => {
    try {
      const exportData = await fetchExportData();
      if (!exportData || exportData.length === 0) return;
      switch (selectedFormat) {
        case "pdf":
          await exportToPDF(exportData, `${filename}.pdf`);
          break;
        case "excel":
          await exportToExcel(exportData, `${filename}.xlsx`);
          break;
        case "json":
          exportToJSON(exportData, `${filename}.json`);
          break;
        case "text":
          exportToText(exportData, `${filename}.txt`);
          break;
        default:
          break;
      }
      setShowModalPDF(false); // Only close after export completes
    } catch (e) {
      // Optionally show a toast or error
      console.error("Export failed", e);
    }
  };

  return (
    <Modal
      isOpen={showModalPDF}
      onClose={() => setShowModalPDF(false)}
      size="sm"
      scrollBehavior="inside"
    >
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
              value={selectedFormat}
              onValueChange={setSelectedFormat}
              orientation="vertical"
              className="gap-3"
            >
              <Radio value="pdf">
                <div className="flex items-center">
                  <FileSignature className="mr-2 text-red-600" size={18} />
                  <span>PDF</span>
                </div>
              </Radio>
              <Radio value="excel">
                <div className="flex items-center">
                  <FileSpreadsheet className="mr-2 text-green-600" size={18} />
                  <span>Excel (.xlsx)</span>
                </div>
              </Radio>
              <Radio value="json">
                <div className="flex items-center">
                  <FileText className="mr-2 text-blue-600" size={18} />
                  <span>JSON</span>
                </div>
              </Radio>
              <Radio value="text">
                <div className="flex items-center">
                  <FileType2 className="mr-2 text-gray-600" size={18} />
                  <span>Text (.txt)</span>
                </div>
              </Radio>
            </RadioGroup>
            <Divider className="my-2" />
            <div className="text-xs text-gray-500">
              <p>
                Nama file: {filename}.{selectedFormat}
              </p>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="flex justify-between">
          <Button
            color="danger"
            variant="light"
            onPress={() => setShowModalPDF(false)}
            disabled={loading}
            startContent={<X size={16} />}
          >
            Batal
          </Button>
          <Button
            color="primary"
            onPress={handleExport}
            disabled={loading}
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
