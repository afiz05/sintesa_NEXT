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
  Upload,
  FileType2,
  FileSignature,
  MessageCircleHeart,
} from "lucide-react";
import {
  exportToJSON,
  exportToText,
  exportToExcel,
  exportToPDF,
} from "../../utils/exportUtils";

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
      size="3xl"
      scrollBehavior="inside"
      hideCloseButton
      classNames={{
        header:
          "bg-gradient-to-r from-green-200 to-emerald-200 dark:from-zinc-800 dark:to-zinc-800 rounded-xl",
      }}
    >
      <ModalContent>
        <ModalHeader className="flex justify-between items-center m-6">
          <div className="text-lg font-semibold flex items-center">
            <MessageCircleHeart className="mr-2 text-success" size={20} />
            Kirim Data ke WhatsApp
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Pilih format file untuk dikirim:
            </p>
            <RadioGroup
              value={selectedFormat}
              onValueChange={setSelectedFormat}
              orientation="horizontal"
              className="flex flex-row gap-8 justify-center h-16 items-center"
              classNames={{
                wrapper: "gap-8 justify-center h-16 items-center",
              }}
            >
              <Radio value="pdf" color="danger">
                <div className="flex items-center">
                  <FileSignature className="mr-2 text-red-600" size={18} />
                  <span>PDF</span>
                </div>
              </Radio>
              <Radio value="excel" color="success">
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
              <Radio value="text" color="default">
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
            color="success"
            variant="ghost"
            onPress={handleExport}
            disabled={loading}
            className="w-[160px]"
            startContent={
              loading ? <Spinner size="sm" /> : <Upload size={16} />
            }
          >
            {loading ? "Mengirim..." : "Kirim"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ExportModal;
