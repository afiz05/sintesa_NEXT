"use client";
import React from "react";

import dynamic from "next/dynamic";
import {
  Card,
  CardBody,
  CardHeader,
  Progress,
  Button,
  Chip,
  Link,
  Divider,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Autocomplete,
  AutocompleteItem,
} from "@heroui/react";
import NextLink from "next/link";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Building2,
  Target,
  Calendar,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileText,
} from "lucide-react";
import { HeaderDashboard } from "./header";
import DashboardLoading from "@/app/(app)/dashboard/loading";
import { Kanwil } from "./kanwil";

const APBNChart = dynamic(
  () => import("../charts/steam").then((mod) => mod.Steam),
  {
    ssr: false,
  }
);

const RealizationChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

// Sample data for realisasi APBN
const budgetStats = {
  totalBudget: 999.1,
  realized: 2847.3,
  remaining: 308.8,
  realizationPercentage: 90.2,
  growth: 5.8,
};

const ministryData = [
  {
    name: "Kementerian Pendidikan",
    budget: 548.7,
    realized: 495.2,
    percentage: 90.2,
    status: "on-track",
  },
  {
    name: "Kementerian Kesehatan",
    budget: 325.4,
    realized: 298.9,
    percentage: 91.9,
    status: "on-track",
  },
  {
    name: "Kementerian Pertahanan",
    budget: 284.3,
    realized: 248.1,
    percentage: 87.3,
    status: "warning",
  },
  {
    name: "Kementerian Perhubungan",
    budget: 198.2,
    realized: 189.4,
    percentage: 95.6,
    status: "excellent",
  },
  {
    name: "Kementerian PUPR",
    budget: 167.8,
    realized: 142.3,
    percentage: 84.8,
    status: "warning",
  },
];

const jenbelData = [
  {
    name: "Belanja Pegawai",
    budget: 548.7,
    realized: 495.2,
    percentage: 90.2,
    status: "on-track",
  },
  {
    name: "Belanja Barang",
    budget: 325.4,
    realized: 298.9,
    percentage: 91.9,
    status: "on-track",
  },
  {
    name: "Belanja Modal",
    budget: 284.3,
    realized: 248.1,
    percentage: 87.3,
    status: "warning",
  },
  {
    name: "Belanja Bansos",
    budget: 198.2,
    realized: 189.4,
    percentage: 95.6,
    status: "excellent",
  },
];

const recentActivities = [
  {
    title: "Pencairan Anggaran Pendidikan",
    ministry: "Kemendikbud",
    amount: "Rp 125.4 M",
    time: "2 jam lalu",
    status: "completed",
  },
  {
    title: "Revisi DIPA Kesehatan",
    ministry: "Kemenkes",
    amount: "Rp 89.2 M",
    time: "4 jam lalu",
    status: "pending",
  },
  {
    title: "Penyesuaian Alokasi PUPR",
    ministry: "Kemen PUPR",
    amount: "Rp 67.8 M",
    time: "6 jam lalu",
    status: "in-review",
  },
];

// Data for Realisasi Program Chart
const realizationProgramData = [
  { name: "Infrastruktur", pagu: 450, realisasi: 390 },
  { name: "Pendidikan", pagu: 380, realisasi: 342 },
  { name: "Kesehatan", pagu: 320, realisasi: 294 },
  { name: "Sosial", pagu: 280, realisasi: 268 },
  { name: "Pertahanan", pagu: 250, realisasi: 218 },
  { name: "Ekonomi", pagu: 220, realisasi: 210 },
];

// Filter data
const kementerianList = [
  { key: "kemenkeu", label: "Kemenkeu" },
  { key: "kemhan", label: "Kemhan" },
  { key: "kemenag", label: "Kemenag" },
  { key: "kemenkes", label: "Kemenkes" },
  { key: "polri", label: "POLRI" },
];

// const kanwilList = [
//   { key: "dki", label: "DKI Jakarta" },
//   { key: "jabar", label: "Jawa Barat" },
//   { key: "jateng", label: "Jawa Tengah" },
//   { key: "jatim", label: "Jawa Timur" },
//   { key: "bengkulu", label: "Bengkulu" },
//   { key: "gorontalo", label: "Gorontalo" },
// ];
interface ContentProps {
  dataDipa: any;
  dataKanwil: any;
  loading: boolean;
}
export const Content: React.FC<ContentProps> = ({
  dataDipa,
  dataKanwil,
  loading,
}) => {
  if (loading) {
    return <DashboardLoading />;
  }

  return (
    <div className="h-full lg:px-4 pt-2 pb-6">
      {/* Header Section */}
      <div className="flex flex-col gap-1 pt-1 px-3 lg:px-0 max-w-[90rem] mx-auto w-full">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-2">
          <div>
            <h1 className="text-xl md:text-2xl font-medium text-foreground tracking-wide">
              Dashboard Realisasi APBN
            </h1>
          </div>
          <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
            <Autocomplete
              placeholder="Pilih Kementerian"
              className="w-full sm:w-44 lg:w-52 h-10"
              size="md"
              variant="flat"
              color="default"
              classNames={{
                base: "rounded-lg bg-slate-50/80 dark:bg-slate-800/80",
                selectorButton:
                  "rounded-lg bg-slate-50/80 dark:bg-slate-800/80 border-slate-200/60 dark:border-slate-700/60 hover:bg-slate-100/80 dark:hover:bg-slate-700/80 data-[hover=true]:bg-slate-100/80 dark:data-[hover=true]:bg-slate-700/80",
                listbox: "rounded-lg bg-slate-50/95 dark:bg-slate-800/95",
                popoverContent:
                  "rounded-lg bg-slate-50/95 dark:bg-slate-800/95 backdrop-blur-sm border-slate-200/60 dark:border-slate-700/60",
              }}
              allowsCustomValue
              defaultItems={kementerianList}
            >
              {(item) => (
                <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>
              )}
            </Autocomplete>
            <Kanwil dataKanwil={dataKanwil} />
          </div>
        </div>

        {/* Quick Stats Cards */}
        <HeaderDashboard dataDipa={dataDipa} />
      </div>

      {/* Main Content Grid */}
      <div className="flex flex-col gap-3 pt-3 px-3 lg:px-0 max-w-[90rem] mx-auto w-full">
        {/* Three Card Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 xl:grid-cols-12 gap-3">
          {/* Overall Summary - Responsive */}
          <Card className="border-none shadow-sm bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 lg:col-span-6 xl:col-span-3">
            <CardHeader className="pb-2 px-4 md:px-6">
              <div className="flex justify-between items-center w-full">
                <h3 className="text-sm md:text-base font-semibold">
                  Jenis Belanja Terbesar
                </h3>
                <Link
                  href="/mbg/data-update"
                  as={NextLink}
                  className="text-xs text-primary"
                >
                  Lihat Semua
                </Link>
              </div>
            </CardHeader>
            <CardBody className="pt-0 px-4 md:px-6">
              <div className="space-y-0">
                {jenbelData.slice(0, 4).map((jenbel, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-0.5 md:p-1 rounded-lg"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="mb-0.5">
                        <h4 className="font-medium text-xs truncate pr-2">
                          {jenbel.name}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2">
                        {" "}
                        <div className="relative flex-1">
                          <Progress
                            aria-label={`Realisasi anggaran ${jenbel.name}`}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-valuenow={jenbel.percentage}
                            value={jenbel.percentage}
                            color={
                              jenbel.status === "excellent"
                                ? "success"
                                : jenbel.status === "on-track"
                                ? "primary"
                                : "warning"
                            }
                            size="md"
                            className="w-full h-5"
                            classNames={{
                              track: "h-5",
                              indicator: "h-5",
                            }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs font-medium text-white">
                              Rp {jenbel.realized}T / Rp {jenbel.budget}T
                            </span>
                          </div>
                        </div>
                        <Chip
                          size="sm"
                          variant="flat"
                          color={
                            jenbel.status === "excellent"
                              ? "success"
                              : jenbel.status === "on-track"
                              ? "primary"
                              : "warning"
                          }
                          className="text-xs flex-shrink-0"
                        >
                          {jenbel.percentage}%
                        </Chip>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Ministry Performance - Responsive */}
          <Card className="border-none shadow-sm bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 lg:col-span-6 xl:col-span-3">
            <CardHeader className="pb-2 px-4 md:px-6">
              <div className="flex justify-between items-center w-full">
                <h3 className="text-sm md:text-base font-semibold">
                  Performa K/L Terbesar
                </h3>
                <Link
                  href="/mbg/data-update"
                  as={NextLink}
                  className="text-xs text-primary"
                >
                  Lihat Semua
                </Link>
              </div>
            </CardHeader>
            <CardBody className="pt-0 px-4 md:px-6">
              <div className="space-y-0">
                {ministryData.slice(0, 4).map((ministry, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-0.5 md:p-1 rounded-lg"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="mb-0.5">
                        <h4 className="font-medium text-xs truncate pr-2">
                          {ministry.name}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2">
                        {" "}
                        <div className="relative flex-1">
                          <Progress
                            aria-label={`Performa realisasi anggaran ${ministry.name}`}
                            value={ministry.percentage}
                            color={
                              ministry.status === "excellent"
                                ? "success"
                                : ministry.status === "on-track"
                                ? "primary"
                                : "warning"
                            }
                            size="md"
                            className="w-full h-5"
                            classNames={{
                              track: "h-5",
                              indicator: "h-5",
                            }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs font-medium text-white">
                              Rp {ministry.realized}T / Rp {ministry.budget}T
                            </span>
                          </div>
                        </div>
                        <Chip
                          size="sm"
                          variant="flat"
                          color={
                            ministry.status === "excellent"
                              ? "success"
                              : ministry.status === "on-track"
                              ? "primary"
                              : "warning"
                          }
                          className="text-xs flex-shrink-0"
                        >
                          {ministry.percentage}%
                        </Chip>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Realization Chart - Responsive */}
          <Card className="border-none shadow-sm bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 sm:col-span-2 lg:col-span-12 xl:col-span-6">
            <CardHeader className="pb-1 px-4 md:px-6">
              <div className="flex flex-col gap-1">
                <h3 className="text-sm md:text-base font-semibold">
                  Tren Realisasi APBN 2024
                </h3>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                  <p className="text-xs text-default-500">
                    Target vs realisasi bulanan
                  </p>
                  <Chip
                    color="success"
                    variant="flat"
                    size="sm"
                    className="w-fit"
                  >
                    Real-time
                  </Chip>
                </div>
              </div>
            </CardHeader>
            <CardBody className="pt-0 px-2 md:px-4 pb-1">
              <div className="h-[150px] md:h-[200px] w-full flex flex-col overflow-hidden">
                <APBNChart />
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Bottom Row - Activities and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
          {/* Realisasi Program Chart */}
          <Card className="border-none shadow-sm bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 lg:col-span-2">
            <CardHeader className="pb-2 px-4 md:px-6">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-3 w-3 text-default-500" />
                  <h3 className="text-sm md:text-base font-semibold">
                    Realisasi Program
                  </h3>
                </div>
                <Chip
                  color="primary"
                  variant="flat"
                  size="sm"
                  className="w-fit"
                >
                  Per Sektor
                </Chip>
              </div>
            </CardHeader>
            <CardBody className="pt-0 px-2 md:px-4 pb-1">
              <div className="h-[200px] md:h-[250px] w-full flex flex-col overflow-hidden">
                <RealizationChart
                  type="bar"
                  height="100%"
                  series={[
                    {
                      name: "Pagu",
                      data: realizationProgramData.map((item) => item.pagu),
                      color: "#3B82F6",
                    },
                    {
                      name: "Realisasi",
                      data: realizationProgramData.map(
                        (item) => item.realisasi
                      ),
                      color: "#10B981",
                    },
                  ]}
                  options={{
                    chart: {
                      type: "bar",
                      toolbar: { show: false },
                      background: "transparent",
                      fontFamily: "inherit",
                    },
                    plotOptions: {
                      bar: {
                        horizontal: false,
                        columnWidth: "60%",
                        borderRadius: 4,
                        dataLabels: {
                          position: "top",
                        },
                      },
                    },
                    dataLabels: {
                      enabled: false,
                    },
                    stroke: {
                      show: true,
                      width: 1,
                      colors: ["transparent"],
                    },
                    xaxis: {
                      categories: realizationProgramData.map(
                        (item) => item.name
                      ),
                      labels: {
                        style: {
                          fontSize: "10px",
                          fontWeight: 500,
                        },
                        rotate: -45,
                      },
                      axisBorder: { show: false },
                      axisTicks: { show: false },
                    },
                    yaxis: {
                      labels: {
                        style: {
                          fontSize: "10px",
                        },
                        formatter: (value) => `${value}T`,
                      },
                    },
                    fill: {
                      opacity: 0.8,
                    },
                    tooltip: {
                      y: {
                        formatter: (val) => `Rp ${val} Triliun`,
                      },
                    },
                    legend: {
                      position: "top",
                      horizontalAlign: "right",
                      fontSize: "11px",
                      fontWeight: 500,
                      markers: {
                        size: 8,
                      },
                    },
                    grid: {
                      borderColor: "#e2e8f0",
                      strokeDashArray: 3,
                      xaxis: {
                        lines: { show: false },
                      },
                      yaxis: {
                        lines: { show: true },
                      },
                    },
                    colors: ["#3B82F6", "#10B981"],
                  }}
                />
              </div>
            </CardBody>
          </Card>

          {/* Pagu Dukman vs Teknis Chart */}
          <Card className="border-none shadow-sm bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700">
            <CardHeader className="pb-2 px-4 md:px-6">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-3 w-3 text-default-500" />
                  <h3 className="text-sm md:text-base font-semibold">
                    Pagu Dukman vs Teknis
                  </h3>
                </div>
                <Chip
                  color="primary"
                  variant="flat"
                  size="sm"
                  className="w-fit"
                >
                  2024
                </Chip>
              </div>
            </CardHeader>
            <CardBody className="pt-0 px-2 md:px-4 pb-1">
              <div className="h-[200px] md:h-[250px] w-full flex flex-col overflow-hidden">
                <RealizationChart
                  type="pie"
                  height="100%"
                  series={[65, 35]}
                  options={{
                    chart: {
                      type: "pie",
                      toolbar: { show: false },
                      background: "transparent",
                      fontFamily: "inherit",
                    },
                    labels: ["Dukman", "Teknis"],
                    colors: ["#3B82F6", "#10B981"],
                    stroke: {
                      width: 4,
                      colors: ["#F1F5F9"],
                    },
                    plotOptions: {
                      pie: {
                        expandOnClick: false,
                        customScale: 0.9,
                      },
                    },
                    dataLabels: {
                      enabled: true,
                      style: {
                        fontSize: "12px",
                        fontWeight: 600,
                        colors: ["#1F2937"],
                      },
                      formatter: (val) => `${Number(val).toFixed(1)}%`,
                    },
                    legend: {
                      position: "bottom",
                      horizontalAlign: "center",
                      fontSize: "12px",
                      fontWeight: 500,
                      markers: {
                        size: 8,
                      },
                      itemMargin: {
                        horizontal: 10,
                        vertical: 5,
                      },
                    },
                    tooltip: {
                      y: {
                        formatter: (val) => `${val}%`,
                      },
                    },
                    responsive: [
                      {
                        breakpoint: 768,
                        options: {
                          legend: {
                            position: "bottom",
                            fontSize: "10px",
                          },
                          dataLabels: {
                            style: {
                              fontSize: "10px",
                            },
                          },
                        },
                      },
                    ],
                  }}
                />
              </div>
            </CardBody>
          </Card>
          <Card className="border-none shadow-sm bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700">
            <CardHeader className="pb-2 px-4 md:px-6">
              <div className="flex items-center gap-2">
                <Clock className="h-3 w-3 text-default-500" />
                <h3 className="text-sm md:text-base font-semibold">
                  Aktivitas Terkini
                </h3>
              </div>
            </CardHeader>
            <CardBody className="pt-0 px-4 md:px-6">
              <div className="space-y-2">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="flex-shrink-0 mt-0.5">
                      {activity.status === "completed" ? (
                        <CheckCircle2 className="h-3 w-3 text-success" />
                      ) : activity.status === "pending" ? (
                        <Clock className="h-3 w-3 text-warning" />
                      ) : (
                        <AlertTriangle className="h-3 w-3 text-primary" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">
                        {activity.title}
                      </p>
                      <p className="text-xs text-default-500">
                        {activity.ministry}
                      </p>
                      <div className="flex justify-between items-center mt-0.5">
                        <span className="text-xs font-medium text-primary">
                          {activity.amount}
                        </span>
                        <span className="text-xs text-default-400">
                          {activity.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Divider className="my-2" />
              <Button
                variant="flat"
                color="primary"
                size="sm"
                className="w-full"
                as={NextLink}
                href="/mbg/kertas-kerja"
              >
                Lihat Semua Aktivitas
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};
