"use client";
import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Select,
  SelectItem,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import {
  Database,
  Search,
  Download,
  Upload,
  Filter,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";

export const DataMbg = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedRegion, setSelectedRegion] = React.useState("all");

  const mbgData = [
    {
      id: 1,
      nama: "MBG Jakarta Pusat",
      wilayah: "DKI Jakarta",
      status: "Aktif",
      jumlahAnggota: 15,
      lastUpdate: "2025-06-07",
      kinerja: 92.5,
    },
    {
      id: 2,
      nama: "MBG Bandung",
      wilayah: "Jawa Barat",
      status: "Aktif",
      jumlahAnggota: 12,
      lastUpdate: "2025-06-06",
      kinerja: 88.2,
    },
    {
      id: 3,
      nama: "MBG Surabaya",
      wilayah: "Jawa Timur",
      status: "Aktif",
      jumlahAnggota: 18,
      lastUpdate: "2025-06-05",
      kinerja: 95.1,
    },
    {
      id: 4,
      nama: "MBG Medan",
      wilayah: "Sumatera Utara",
      status: "Review",
      jumlahAnggota: 10,
      lastUpdate: "2025-06-04",
      kinerja: 76.8,
    },
    {
      id: 5,
      nama: "MBG Makassar",
      wilayah: "Sulawesi Selatan",
      status: "Aktif",
      jumlahAnggota: 14,
      lastUpdate: "2025-06-03",
      kinerja: 91.3,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aktif":
        return "text-green-600 bg-green-100";
      case "Review":
        return "text-orange-600 bg-orange-100";
      case "Tidak Aktif":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };
  const getKinerjaColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <div className="my-3 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Data MBG</h1>
          <p className="text-default-500 mt-1">
            Kelola data MBG dari seluruh wilayah Indonesia
          </p>
        </div>
        <div className="flex gap-2">
          <Button color="primary" startContent={<Plus size={16} />}>
            Tambah MBG
          </Button>
          <Button variant="bordered" startContent={<Upload size={16} />}>
            Import Data
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
          <CardBody className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500 rounded-lg">
                <Database className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm text-default-500">Total MBG</p>
                <p className="text-2xl font-bold">156</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
          <CardBody className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-500 rounded-lg">
                <Database className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm text-default-500">MBG Aktif</p>
                <p className="text-2xl font-bold">142</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
          <CardBody className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-500 rounded-lg">
                <Database className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm text-default-500">Review</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
          <CardBody className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-500 rounded-lg">
                <Database className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm text-default-500">Rata-rata Kinerja</p>
                <p className="text-2xl font-bold">88.7%</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardBody className="p-3 sm:p-4">
          <div className="flex flex-col gap-3">
            <Input
              placeholder="Cari MBG..."
              startContent={<Search size={16} />}
              value={searchQuery}
              onValueChange={setSearchQuery}
              className="w-full"
              size="sm"
            />
            <div className="flex flex-col sm:flex-row gap-3">
              <Select
                placeholder="Wilayah"
                selectedKeys={[selectedRegion]}
                onSelectionChange={(keys) =>
                  setSelectedRegion(Array.from(keys)[0] as string)
                }
                className="flex-1 sm:max-w-48"
                startContent={<Filter size={16} />}
                size="sm"
              >
                <SelectItem key="all">Semua Wilayah</SelectItem>
                <SelectItem key="jakarta">DKI Jakarta</SelectItem>
                <SelectItem key="jabar">Jawa Barat</SelectItem>
                <SelectItem key="jatim">Jawa Timur</SelectItem>
                <SelectItem key="sumut">Sumatera Utara</SelectItem>
                <SelectItem key="sulsel">Sulawesi Selatan</SelectItem>
              </Select>
              <Button
                variant="bordered"
                startContent={<Download size={16} />}
                className="w-full sm:w-auto"
                size="sm"
              >
                Export
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Data Table */}
      <Card className="w-full">
        <CardHeader className="px-3 sm:px-4 py-3">
          <h3 className="text-base sm:text-lg font-semibold">Daftar MBG</h3>
        </CardHeader>
        <CardBody className="p-0">
          <div className="w-full overflow-x-auto">
            <Table aria-label="MBG data table" removeWrapper>
              <TableHeader>
                <TableColumn className="min-w-[140px] text-xs">
                  NAMA MBG
                </TableColumn>
                <TableColumn className="min-w-[100px] text-xs">
                  WILAYAH
                </TableColumn>
                <TableColumn className="min-w-[80px] text-xs">
                  STATUS
                </TableColumn>
                <TableColumn className="min-w-[80px] text-xs">
                  ANGGOTA
                </TableColumn>
                <TableColumn className="min-w-[80px] text-xs">
                  KINERJA
                </TableColumn>
                <TableColumn className="min-w-[100px] text-xs">
                  LAST UPDATE
                </TableColumn>
                <TableColumn className="min-w-[80px] text-xs">AKSI</TableColumn>
              </TableHeader>
              <TableBody>
                {mbgData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="font-medium text-xs sm:text-sm">
                        {item.nama}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs sm:text-sm">{item.wilayah}</div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs sm:text-sm">
                        {item.jumlahAnggota} orang
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`font-medium text-xs sm:text-sm ${getKinerjaColor(
                          item.kinerja
                        )}`}
                      >
                        {item.kinerja}%
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs sm:text-sm">
                        {new Date(item.lastUpdate).toLocaleDateString("id-ID")}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          isIconOnly
                          startContent={<Edit size={12} />}
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          color="danger"
                          isIconOnly
                          startContent={<Trash2 size={12} />}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardBody>
      </Card>

      {/* Additional Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card>
          <CardHeader className="px-3 sm:px-6">
            <h3 className="text-base sm:text-lg font-semibold">
              Distribusi MBG per Wilayah
            </h3>
          </CardHeader>
          <CardBody className="px-3 sm:px-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">DKI Jakarta</span>
                <span className="text-sm font-medium">25 MBG</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Jawa Barat</span>
                <span className="text-sm font-medium">32 MBG</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Jawa Timur</span>
                <span className="text-sm font-medium">28 MBG</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Sumatera Utara</span>
                <span className="text-sm font-medium">18 MBG</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Lainnya</span>
                <span className="text-sm font-medium">53 MBG</span>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader className="px-3 sm:px-6">
            <h3 className="text-base sm:text-lg font-semibold">
              Statistik Kinerja
            </h3>
          </CardHeader>
          <CardBody className="px-3 sm:px-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Sangat Baik (90-100%)</span>
                  <span className="text-sm font-medium">45 MBG</span>
                </div>
                <div className="w-full bg-default-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: "45%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Baik (80-89%)</span>
                  <span className="text-sm font-medium">67 MBG</span>
                </div>
                <div className="w-full bg-default-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: "67%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Cukup (70-79%)</span>
                  <span className="text-sm font-medium">35 MBG</span>
                </div>
                <div className="w-full bg-default-200 rounded-full h-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full"
                    style={{ width: "35%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Perlu Perbaikan (&lt;70%)</span>
                  <span className="text-sm font-medium">9 MBG</span>
                </div>
                <div className="w-full bg-default-200 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: "9%" }}
                  ></div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
