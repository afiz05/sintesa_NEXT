"use client";
import React from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
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
import { Kanwil } from "../referensi/Kanwil";
import { Kddept } from "../referensi/Kddept";
import { GetDipa } from "./dataDipa/getDipa";
import { Thang } from "../referensi/Thang";
import { GetBelanjaTerbesar } from "./dataDipa/getBelanjaTerbesar";
import { GetPerformaTerbesar } from "./dataDipa/getPerformaTerbesar";
import { DukmanTeknis } from "../charts/dukmanteknis";

const RealizationChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

// Sample data for realisasi APBN
const budgetStats = {
  totalBudget: 3156.1,
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

const quickStats = [
  {
    title: "Pagu DIPA",
    value: "Rp 3.156,1 T",
    change: "+5.8%",
    trend: "up",
    icon: DollarSign,
    color: "primary",
  },
  {
    title: "Realisasi",
    value: "Rp 2.847,3 T",
    change: "90.2%",
    trend: "up",
    icon: TrendingUp,
    color: "success",
  },
  {
    title: "Sisa Anggaran",
    value: "Rp 308,8 M",
    change: "9.8%",
    trend: "down",
    icon: Target,
    color: "warning",
  },
  {
    title: "K/L Aktif",
    value: "86 Lembaga",
    change: "+2",
    trend: "up",
    icon: Building2,
    color: "secondary",
  },
  {
    title: "Efisiensi Anggaran",
    value: "92.4%",
    change: "+1.2%",
    trend: "up",
    icon: Calendar,
    color: "primary",
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

export const ContentDashboard = () => {
  const { theme } = useTheme();

  // Theme-aware color and class functions
  const getThemeColors = () => {
    const isDark = theme === "dark";
    return {
      // Chart colors
      primary: isDark ? "#60A5FA" : "#3B82F6",
      success: isDark ? "#34D399" : "#10B981",
      warning: isDark ? "#FBBF24" : "#F59E0B",
      background: isDark ? "#1F2937" : "#FFFFFF",
      surface: isDark ? "#374151" : "#F8FAFC",
      // Text colors
      textPrimary: isDark ? "#F1F5F9" : "#1F2937",
      textSecondary: isDark ? "#CBD5E1" : "#64748B",
      textMuted: isDark ? "#94A3B8" : "#94A3B8",
      // Grid and borders
      gridColor: isDark ? "#374151" : "#E2E8F0",
      borderColor: isDark ? "#4B5563" : "#E2E8F0",
      strokeColor: isDark ? "#374151" : "#F1F5F9",
    };
  };

  const getCardClasses = () => {
    const isDark = theme === "dark";
    return isDark
      ? "bg-gradient-to-br from-slate-800 to-slate-700"
      : "bg-gradient-to-br from-slate-100 to-slate-200";
  };

  const colors = getThemeColors();
  const cardClasses = getCardClasses();

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
            {/* <Thang /> */}
            <Kddept />
            <Kanwil />
          </div>
        </div>

        {/* Quick Stats Cards */}
        <GetDipa />
      </div>

      {/* Main Content Grid */}
      <div className="flex flex-col gap-3 pt-3 px-3 lg:px-0 max-w-[90rem] mx-auto w-full">
        {/* Three Card Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 xl:grid-cols-12 gap-3">
          {/* Overall Summary - Responsive */}
          <GetBelanjaTerbesar />

          {/* Ministry Performance - Responsive */}
          <GetPerformaTerbesar />

          {/* Realization Chart - Responsive */}
          <Card
            className={`border-none shadow-sm ${cardClasses} sm:col-span-2 lg:col-span-12 xl:col-span-6`}
          >
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
                {/* <APBNChart /> */}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Bottom Row - Activities and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
          {/* Realisasi Program Chart */}
          <Card
            className={`border-none shadow-sm ${cardClasses} lg:col-span-2`}
          >
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
                  key={theme}
                  type="bar"
                  height="100%"
                  series={[
                    {
                      name: "Pagu",
                      data: realizationProgramData.map((item) => item.pagu),
                      color: colors.primary,
                    },
                    {
                      name: "Realisasi",
                      data: realizationProgramData.map(
                        (item) => item.realisasi
                      ),
                      color: colors.success,
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
                          colors: colors.textSecondary,
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
                          colors: colors.textSecondary,
                        },
                        formatter: (value) => `${value}T`,
                      },
                    },
                    fill: {
                      opacity: 0.8,
                    },
                    tooltip: {
                      theme: theme === "dark" ? "dark" : "light",
                      style: {
                        fontSize: "12px",
                      },
                      y: {
                        formatter: (val) => `Rp ${val} Triliun`,
                      },
                    },
                    legend: {
                      position: "top",
                      horizontalAlign: "right",
                      fontSize: "11px",
                      fontWeight: 500,
                      labels: {
                        colors: colors.textPrimary,
                      },
                      markers: {
                        size: 8,
                      },
                    },
                    grid: {
                      borderColor: colors.gridColor,
                      strokeDashArray: 3,
                      xaxis: {
                        lines: { show: false },
                      },
                      yaxis: {
                        lines: { show: true },
                      },
                    },
                    colors: [colors.primary, colors.success],
                  }}
                />
              </div>
            </CardBody>
          </Card>

          {/* Pagu Dukman vs Teknis Chart */}
          <Card className={`border-none shadow-sm ${cardClasses}`}>
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
                {/* <DukmanTeknis /> */}
              </div>
            </CardBody>
          </Card>
          <Card className={`border-none shadow-sm ${cardClasses}`}>
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
