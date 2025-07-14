"use client";
import React, { useState } from "react";
import {
  Button,
  Select,
  SelectItem,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tabs,
  Tab,
  Tooltip,
  Card,
  CardBody,
} from "@heroui/react";
import {
  Upload,
  Download,
  Trash2,
  FileText,
  BarChart3,
  Building2,
} from "lucide-react";

// Sample data for Laporan Keuangan
const sampleDataKeuangan = [
  {
    id: 1,
    tahun: "2025",
    kppn: "KUTACANE",
    jenis: "Laporan Keuangan",
    periode: "Januari",
    uraian: "700253 mei...",
    uploaded: "11-07-2025 10:21:54",
  },
  {
    id: 2,
    tahun: "2025",
    kppn: "KUTACANE",
    jenis: "Laporan Keuangan",
    periode: "Februari",
    uraian: "",
    uploaded: "11-07-2025 10:21:42",
  },
  {
    id: 3,
    tahun: "2025",
    kppn: "KUTACANE",
    jenis: "Laporan Keuangan",
    periode: "Maret",
    uraian: "",
    uploaded: "11-07-2025 10:21:27",
  },
  {
    id: 4,
    tahun: "2025",
    kppn: "KUTACANE",
    jenis: "Laporan Keuangan",
    periode: "April",
    uraian: "",
    uploaded: "11-07-2025 10:21:14",
  },
  {
    id: 5,
    tahun: "2025",
    kppn: "KUTACANE",
    jenis: "Laporan Keuangan",
    periode: "Mei",
    uraian: "",
    uploaded: "11-07-2025 10:21:01",
  },
  {
    id: 6,
    tahun: "2025",
    kppn: "TANJUNG SELOR",
    jenis: "Laporan Keuangan",
    periode: "Januari",
    uraian: "LK TKD Bulan Mei 2025 Satker 6...",
    uploaded: "11-07-2025 10:15:37",
  },
  {
    id: 7,
    tahun: "2025",
    kppn: "TANJUNG SELOR",
    jenis: "Laporan Keuangan",
    periode: "Februari",
    uraian: "LK TKD Bulan April 2025 Satker",
    uploaded: "11-07-2025 10:15:19",
  },
  {
    id: 8,
    tahun: "2025",
    kppn: "TANJUNG SELOR",
    jenis: "Laporan Keuangan",
    periode: "Maret",
    uraian: "LK TKD Bulan Maret 2025 Satker...",
    uploaded: "11-07-2025 10:15:00",
  },
];

// Sample data for Laporan Monev KPPN
const sampleDataMonev = [
  {
    id: 1,
    tahun: "2025",
    kppn: "KUTACANE",
    jenis: "Laporan Monev",
    periode: "Triwulan II",
    uraian: "Monev TKD Triwulan II 2025...",
    uploaded: "11-07-2025 09:30:15",
  },
  {
    id: 2,
    tahun: "2025",
    kppn: "KUTACANE",
    jenis: "Laporan Monev",
    periode: "Triwulan I",
    uraian: "Monev TKD Triwulan I 2025...",
    uploaded: "11-04-2025 14:22:33",
  },
  {
    id: 3,
    tahun: "2025",
    kppn: "TANJUNG SELOR",
    jenis: "Laporan Monev",
    periode: "Triwulan II",
    uraian: "Laporan Monitoring dan Evaluasi...",
    uploaded: "11-07-2025 08:45:22",
  },
  {
    id: 4,
    tahun: "2025",
    kppn: "TANJUNG SELOR",
    jenis: "Laporan Monev",
    periode: "Triwulan I",
    uraian: "Monev Pelaksanaan Program...",
    uploaded: "11-04-2025 16:18:45",
  },
  {
    id: 5,
    tahun: "2024",
    kppn: "KUTACANE",
    jenis: "Laporan Monev",
    periode: "Triwulan IV",
    uraian: "Laporan Akhir Tahun 2024...",
    uploaded: "15-01-2025 11:30:00",
  },
];

// Sample data for Laporan Monev Kanwil
const sampleDataKanwil = [
  {
    id: 1,
    tahun: "2025",
    kppn: "KANWIL ACEH",
    jenis: "Laporan Monev Kanwil",
    periode: "Semester I",
    uploaded: "15-07-2025 14:30:00",
  },
  {
    id: 2,
    tahun: "2025",
    kppn: "KANWIL KALIMANTAN UTARA",
    jenis: "Laporan Monev Kanwil",
    periode: "Semester I",
    uploaded: "15-07-2025 13:45:30",
  },
  {
    id: 3,
    tahun: "2024",
    kppn: "KANWIL ACEH",
    jenis: "Laporan Monev Kanwil",
    periode: "Semester II",
    uploaded: "20-01-2025 10:15:45",
  },
];

const months = [
  { key: "1", label: "Januari" },
  { key: "2", label: "Februari" },
  { key: "3", label: "Maret" },
  { key: "4", label: "April" },
  { key: "5", label: "Mei" },
  { key: "6", label: "Juni" },
  { key: "7", label: "Juli" },
  { key: "8", label: "Agustus" },
  { key: "9", label: "September" },
  { key: "10", label: "Oktober" },
  { key: "11", label: "November" },
  { key: "12", label: "Desember" },
];

const quarters = [
  { key: "1", label: "Triwulan I" },
  { key: "2", label: "Triwulan II" },
  { key: "3", label: "Triwulan III" },
  { key: "4", label: "Triwulan IV" },
];

const semesters = [
  { key: "1", label: "Semester I" },
  { key: "2", label: "Semester II" },
];

export const LaporanTransferDaerah = () => {
  const [selectedTab, setSelectedTab] = useState("laporan-keuangan");
  const [selectedMonth, setSelectedMonth] = useState("5");
  const [selectedQuarter, setSelectedQuarter] = useState("2");
  const [selectedSemester, setSelectedSemester] = useState("1");

  const handleUploadKPPN = () => {
    console.log("Upload Laporan KPPN clicked");
  };

  const handleUploadKanwil = () => {
    console.log("Upload Laporan Kanwil clicked");
  };

  const handleDownload = (id: number) => {
    console.log("Download clicked for ID:", id);
  };

  const handleDelete = (id: number) => {
    console.log("Delete clicked for ID:", id);
  };

  const columns = [
    { key: "no", label: "NO" },
    { key: "tahun", label: "Tahun" },
    { key: "kppn", label: "KPPN" },
    { key: "jenis", label: "Jenis" },
    { key: "periode", label: "Periode" },
    { key: "uraian", label: "Uraian" },
    { key: "uploaded", label: "Uploaded" },
    { key: "opsi", label: "Opsi" },
  ];

  // Columns for Kanwil tab (without uraian)
  const columnsKanwil = [
    { key: "no", label: "NO" },
    { key: "tahun", label: "Tahun" },
    { key: "kppn", label: "KPPN" },
    { key: "jenis", label: "Jenis" },
    { key: "periode", label: "Periode" },
    { key: "uploaded", label: "Uploaded" },
    { key: "opsi", label: "Opsi" },
  ];

  const renderCell = (item: any, columnKey: string, index: number) => {
    switch (columnKey) {
      case "no":
        return index + 1;
      case "opsi":
        return (
          <div className="flex gap-2 justify-center">
            <Tooltip content="Download">
              <Button
                isIconOnly
                size="sm"
                color="primary"
                variant="flat"
                onClick={() => handleDownload(item.id)}
              >
                <Download size={16} />
              </Button>
            </Tooltip>
            <Tooltip content="Delete">
              <Button
                isIconOnly
                size="sm"
                color="danger"
                variant="flat"
                onClick={() => handleDelete(item.id)}
              >
                <Trash2 size={16} />
              </Button>
            </Tooltip>
          </div>
        );
      default:
        return item[columnKey];
    }
  };

  return (
    <div className="w-full max-w-[100vw] p-3 sm:p-6 overflow-hidden box-border">
      {/* Header with Upload Buttons */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">
            Laporan Transfer Daerah
          </h1>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
          <Button
            color="primary"
            startContent={<Upload size={16} />}
            onClick={handleUploadKPPN}
            className="w-full sm:w-auto"
            size="sm"
          >
            <span className="hidden sm:inline">Laporan KPPN</span>
            <span className="sm:hidden">KPPN</span>
          </Button>
          <Button
            color="success"
            startContent={<Upload size={16} />}
            onClick={handleUploadKanwil}
            className="w-full sm:w-auto"
            size="sm"
          >
            <span className="hidden sm:inline">Laporan Kanwil</span>
            <span className="sm:hidden">Kanwil</span>
          </Button>
        </div>
      </div>

      {/* Tabs and Filter */}
      <div className="mb-4">
        <Tabs
          selectedKey={selectedTab}
          onSelectionChange={(key) => setSelectedTab(key as string)}
          variant="solid"
          color="default"
          size="lg"
          fullWidth
          classNames={{
            tabList: "w-full flex flex-col sm:flex-row gap-1 sm:gap-0",
            tab: "flex-1 min-h-[48px] sm:min-h-auto",
            panel: "w-full",
          }}
        >
          <Tab
            key="laporan-keuangan"
            title={
              <div className="flex items-center gap-1 sm:gap-2">
                <FileText size={14} className="sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm">
                  <span className="hidden sm:inline">
                    Laporan Keuangan KPPN
                  </span>
                  <span className="sm:hidden">Keuangan</span>
                </span>
              </div>
            }
          />
          <Tab
            key="laporan-monev"
            title={
              <div className="flex items-center gap-1 sm:gap-2">
                <BarChart3 size={14} className="sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm">
                  <span className="hidden sm:inline">Laporan Monev KPPN</span>
                  <span className="sm:hidden">Monev KPPN</span>
                </span>
              </div>
            }
          />
          <Tab
            key="laporan-monev-kanwil"
            title={
              <div className="flex items-center gap-1 sm:gap-2">
                <Building2 size={14} className="sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm">
                  <span className="hidden sm:inline">Laporan Monev Kanwil</span>
                  <span className="sm:hidden">Monev Kanwil</span>
                </span>
              </div>
            }
          />
        </Tabs>
      </div>

      {/* Filter and Table Container */}
      <Card className="w-full max-w-[calc(100vw-1.5rem)] sm:max-w-[calc(100vw-3rem)] min-w-0 shadow-sm border-2">
        <CardBody className="p-4 sm:p-6">
          {/* Conditional Filter based on selected tab */}
          {selectedTab === "laporan-keuangan" && (
            <div className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 min-w-0">
                <span className="text-sm font-medium whitespace-nowrap">
                  Filter Periode:
                </span>
                <Select
                  size="sm"
                  placeholder="Pilih Bulan"
                  selectedKeys={[selectedMonth]}
                  onSelectionChange={(keys) =>
                    setSelectedMonth(Array.from(keys)[0] as string)
                  }
                  className="w-full sm:w-40 min-w-0"
                >
                  {months.map((month) => (
                    <SelectItem key={month.key}>{month.label}</SelectItem>
                  ))}
                </Select>
              </div>
              <div className="text-sm text-gray-600 text-left sm:text-right whitespace-nowrap">
                Total: {sampleDataKeuangan.length} data
              </div>
            </div>
          )}

          {selectedTab === "laporan-monev" && (
            <div className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 min-w-0">
                <span className="text-sm font-medium whitespace-nowrap">
                  Filter Periode:
                </span>
                <Select
                  size="sm"
                  placeholder="Pilih Triwulan"
                  selectedKeys={[selectedQuarter]}
                  onSelectionChange={(keys) =>
                    setSelectedQuarter(Array.from(keys)[0] as string)
                  }
                  className="w-full sm:w-40 min-w-0"
                >
                  {quarters.map((quarter) => (
                    <SelectItem key={quarter.key}>{quarter.label}</SelectItem>
                  ))}
                </Select>
              </div>
              <div className="text-sm text-gray-600 text-left sm:text-right whitespace-nowrap">
                Total: {sampleDataMonev.length} data
              </div>
            </div>
          )}

          {selectedTab === "laporan-monev-kanwil" && (
            <div className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 min-w-0">
                <span className="text-sm font-medium whitespace-nowrap">
                  Filter Periode:
                </span>
                <Select
                  size="sm"
                  placeholder="Pilih Semester"
                  selectedKeys={[selectedSemester]}
                  onSelectionChange={(keys) =>
                    setSelectedSemester(Array.from(keys)[0] as string)
                  }
                  className="w-full sm:w-40 min-w-0"
                >
                  {semesters.map((semester) => (
                    <SelectItem key={semester.key}>{semester.label}</SelectItem>
                  ))}
                </Select>
              </div>
              <div className="text-sm text-gray-600 text-left sm:text-right whitespace-nowrap">
                Total: {sampleDataKanwil.length} data
              </div>
            </div>
          )}

          {/* Conditional Table based on selected tab */}
          {(selectedTab === "laporan-keuangan" ||
            selectedTab === "laporan-monev" ||
            selectedTab === "laporan-monev-kanwil") && (
            <div className="overflow-hidden rounded-lg border border-divider">
              <div className="overflow-x-auto">
                <Table
                  isCompact
                  removeWrapper
                  aria-label="Laporan Transfer Daerah Table"
                  classNames={{
                    base: "min-w-full",
                    table:
                      selectedTab === "laporan-monev-kanwil"
                        ? "min-w-[700px]"
                        : "min-w-[800px]",
                  }}
                  checkboxesProps={{
                    classNames: {
                      wrapper:
                        "after:bg-foreground after:text-background text-background",
                    },
                  }}
                >
                  <TableHeader
                    columns={
                      selectedTab === "laporan-monev-kanwil"
                        ? columnsKanwil
                        : columns
                    }
                  >
                    {(column) => (
                      <TableColumn
                        key={column.key}
                        align={column.key === "opsi" ? "center" : "start"}
                        className={`
                          text-center font-semibold
                          ${column.key === "no" ? "w-12 min-w-[48px]" : ""}
                          ${column.key === "tahun" ? "w-16 min-w-[64px]" : ""}
                          ${column.key === "kppn" ? "w-24 min-w-[96px]" : ""}
                          ${column.key === "jenis" ? "w-32 min-w-[128px]" : ""}
                          ${
                            column.key === "periode" ? "w-32 min-w-[128px]" : ""
                          }
                          ${column.key === "uraian" ? "w-48 min-w-[192px]" : ""}
                          ${
                            column.key === "uploaded"
                              ? "w-36 min-w-[144px]"
                              : ""
                          }
                          ${column.key === "opsi" ? "w-20 min-w-[80px]" : ""}
                        `}
                      >
                        {column.label}
                      </TableColumn>
                    )}
                  </TableHeader>
                  <TableBody emptyContent={"No data found"}>
                    {(selectedTab === "laporan-keuangan"
                      ? sampleDataKeuangan
                      : selectedTab === "laporan-monev"
                      ? sampleDataMonev
                      : selectedTab === "laporan-monev-kanwil"
                      ? sampleDataKanwil
                      : []
                    ).map((item, index) => (
                      <TableRow key={item.id}>
                        {(selectedTab === "laporan-monev-kanwil"
                          ? columnsKanwil
                          : columns
                        ).map((column) => (
                          <TableCell
                            key={column.key}
                            className={`
                              ${column.key === "no" ? "text-center" : ""}
                              ${column.key === "tahun" ? "text-center" : ""}
                              ${column.key === "opsi" ? "text-center" : ""}
                              ${
                                column.key === "uraian"
                                  ? "max-w-[192px] truncate"
                                  : ""
                              }
                              text-sm
                            `}
                          >
                            {renderCell(item, column.key, index)}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};
