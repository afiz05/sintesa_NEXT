"use client";
import React from "react";
import { Card, CardBody, CardHeader, Select, SelectItem } from "@heroui/react";
import { Filter } from "lucide-react";
import { useBelanja } from "./context";

interface HeaderProps {
  title?: string;
  description?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title = "Query Selection",
  description = "Select parameters for your data inquiry",
}) => {
  const {
    selectedTahun,
    selectedJenisLaporan,
    selectedPembulatan,
    setSelectedTahun,
    setSelectedJenisLaporan,
    setSelectedPembulatan,
  } = useBelanja();
  // Generate years from 2025 to 2014 (descending order)
  const tahunOptions = Array.from({ length: 12 }, (_, i) =>
    (2025 - i).toString()
  );

  const jenisLaporanOptions = [
    "Pagu APBN",
    "Pagu Realisasi",
    "Pagu Realisasi Bulanan",
    "Pergerakan Pagu Bulanan",
    "Pergerakan Blokir Bulanan",
    "Pergerakan Blokir Bulanan Per Jenis",
    "Volume Output Kegiatan - Data Caput",
  ];

  const pembulatanOptions = ["Rupiah", "Ribu", "Juta", "Miliar", "Triliun"];

  // Demo function to show dynamic table and rounding configuration
  const getDynamicTableInfo = () => {
    const tableName = `monev${selectedTahun}.pagu_real_detail_harian_${selectedTahun}`;

    let roundingInfo = "No rounding";
    switch (selectedPembulatan.toLowerCase()) {
      case "ribu":
        roundingInfo = "Divide by 1,000";
        break;
      case "juta":
        roundingInfo = "Divide by 1,000,000";
        break;
      case "miliar":
        roundingInfo = "Divide by 1,000,000,000";
        break;
      case "triliun":
        roundingInfo = "Divide by 1,000,000,000,000";
        break;
    }

    return { tableName, roundingInfo };
  };

  const { tableName, roundingInfo } = getDynamicTableInfo();

  return (
    <div className="space-y-4 mb-4">
      {/* Header Card */}
      <Card className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200 dark:border-orange-700/30 shadow-sm">
        {" "}
        <CardHeader className="py-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-md">
              <Filter className="text-white" size={18} />
            </div>
            <h3 className="text-lg font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Query Report Selection
            </h3>
          </div>
        </CardHeader>
      </Card>

      {/* Query Selection Card */}
      <Card className="bg-white dark:bg-gray-900 border-0 shadow-none outline-none ring-0">
        {" "}
        <CardBody className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] gap-6">
            {/* Tahun Column */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Tahun
              </label>{" "}
              <Select
                selectedKeys={selectedTahun ? [selectedTahun] : []}
                onSelectionChange={(keys) =>
                  setSelectedTahun(Array.from(keys)[0] as string)
                }
                placeholder="Pilih Tahun"
                className="w-full"
                size="md"
                aria-label="Pilih Tahun"
              >
                {tahunOptions.map((tahun) => (
                  <SelectItem key={tahun}>{tahun}</SelectItem>
                ))}
              </Select>
            </div>

            {/* Jenis Laporan Column */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Jenis Laporan
              </label>{" "}
              <Select
                selectedKeys={
                  selectedJenisLaporan ? [selectedJenisLaporan] : []
                }
                onSelectionChange={(keys) =>
                  setSelectedJenisLaporan(Array.from(keys)[0] as string)
                }
                placeholder="Pilih Jenis Laporan"
                className="w-full"
                size="md"
                aria-label="Pilih Jenis Laporan"
              >
                {jenisLaporanOptions.map((jenis) => (
                  <SelectItem key={jenis}>{jenis}</SelectItem>
                ))}
              </Select>
            </div>

            {/* Pembulatan Column */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Pembulatan
              </label>{" "}
              <Select
                selectedKeys={[selectedPembulatan]}
                onSelectionChange={(keys) =>
                  setSelectedPembulatan(Array.from(keys)[0] as string)
                }
                placeholder="Pilih Pembulatan"
                className="w-full"
                size="md"
                aria-label="Pilih Pembulatan"
              >
                {pembulatanOptions.map((pembulatan) => (
                  <SelectItem key={pembulatan}>{pembulatan}</SelectItem>
                ))}
              </Select>
            </div>
          </div>

          {/* Demo Display */}
          <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-inner">
            <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              Dynamic Table & Rounding Info
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Table Name:{" "}
              <span className="font-mono text-gray-800 dark:text-gray-200">
                {tableName}
              </span>
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Rounding:{" "}
              <span className="font-mono text-gray-800 dark:text-gray-200">
                {roundingInfo}
              </span>
            </p>
          </div>
        </CardBody>
      </Card>

      {/* Configuration Info Card */}
      <Card className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/30">
        <CardBody className="p-4">
          <div className="text-sm text-blue-700 dark:text-blue-300">
            <div className="flex flex-wrap gap-4">
              <div>
                <span className="font-medium">Table:</span>{" "}
                <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded text-xs">
                  {tableName}
                </code>
              </div>
              <div>
                <span className="font-medium">Report:</span>{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  {selectedJenisLaporan}
                </span>
              </div>
              <div>
                <span className="font-medium">Rounding:</span>{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  {roundingInfo}
                </span>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
