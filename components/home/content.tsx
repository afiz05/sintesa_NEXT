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

const APBNChart = dynamic(
  () => import("../charts/steam").then((mod) => mod.Steam),
  {
    ssr: false,
  }
);

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

const quickStats = [
  {
    title: "Total Anggaran 2024",
    value: "Rp 3.156,1 T",
    change: "+5.8%",
    trend: "up",
    icon: DollarSign,
    color: "primary",
  },
  {
    title: "Realisasi s.d Hari Ini",
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

// Filter data
const kementerianList = [
  { key: "kemenkeu", label: "Kemenkeu" },
  { key: "kemhan", label: "Kemhan" },
  { key: "kemenag", label: "Kemenag" },
  { key: "kemenkes", label: "Kemenkes" },
  { key: "polri", label: "POLRI" },
];

const kanwilList = [
  { key: "dki", label: "DKI Jakarta" },
  { key: "jabar", label: "Jawa Barat" },
  { key: "jateng", label: "Jawa Tengah" },
  { key: "jatim", label: "Jawa Timur" },
  { key: "bengkulu", label: "Bengkulu" },
  { key: "gorontalo", label: "Gorontalo" },
];

export const Content = () => (
  <div className="h-full lg:px-6 pt-4">
    {/* Header Section */}
    <div className="flex flex-col gap-2 pt-2 px-4 lg:px-0 max-w-[90rem] mx-auto w-full">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-medium text-foreground tracking-wide">
            Dashboard Realisasi APBN
          </h1>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
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
          <Autocomplete
            placeholder="Pilih Kanwil"
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
            defaultItems={kanwilList}
          >
            {(item) => (
              <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>
            )}
          </Autocomplete>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mt-4 md:mt-6">
        {quickStats.map((stat, index) => (
          <Card
            key={index}
            className={`border-none shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br ${
              stat.color === "primary"
                ? "from-primary-50 to-primary-100 border-primary-200"
                : stat.color === "success"
                ? "from-success-50 to-success-100 border-success-200"
                : stat.color === "warning"
                ? "from-warning-50 to-warning-100 border-warning-200"
                : "from-secondary-50 to-secondary-100 border-secondary-200"
            }`}
          >
            <CardBody className="p-3 md:p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                  <div
                    className={`p-1.5 md:p-2 rounded-xl bg-${stat.color}/20 border border-${stat.color}/30 flex-shrink-0`}
                  >
                    <stat.icon
                      className={`h-4 w-4 md:h-5 md:w-5 text-${stat.color}`}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-xs md:text-small ${
                        stat.color === "warning"
                          ? "text-warning-600"
                          : "text-default-600"
                      } truncate`}
                    >
                      {stat.title}
                    </p>
                    <p className="text-lg md:text-xl font-semibold text-default-900 truncate">
                      {stat.value}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-3 w-3 md:h-4 md:w-4 text-success-600" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 md:h-4 md:w-4 text-danger-600" />
                  )}
                  <span
                    className={`text-xs font-medium ${
                      stat.trend === "up"
                        ? "text-success-600"
                        : "text-danger-600"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>

    {/* Main Content Grid */}
    <div className="flex flex-col gap-6 pt-6 px-4 lg:px-0 max-w-[90rem] mx-auto w-full">
      {/* Three Card Row */}
      <div className="grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-12 gap-6">
        {/* Overall Summary - Responsive */}
        <Card className="border-none shadow-sm bg-gradient-to-br from-primary-50 to-secondary-50 lg:col-span-6 xl:col-span-2">
          <CardBody className="p-4 md:p-6">
            <div className="text-center space-y-3 md:space-y-4">
              <div className="mx-auto w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <Target className="h-8 w-8 md:h-10 md:w-10 text-primary" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-primary">
                  90.2%
                </h3>
                <p className="text-xs md:text-sm text-default-600">
                  Realisasi APBN 2024
                </p>
              </div>
              <Progress
                value={90.2}
                color="primary"
                size="lg"
                className="w-full"
                showValueLabel
              />
              <div className="grid grid-cols-2 gap-2 md:gap-4 pt-2">
                <div className="text-center">
                  <p className="text-xs text-default-500">Target</p>
                  <p className="text-sm font-semibold text-primary">95%</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-default-500">Deadline</p>
                  <p className="text-sm font-semibold text-warning">31 Des</p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Ministry Performance - Responsive */}
        <Card className="border-none shadow-sm bg-gradient-to-br from-default-50 to-default-100 lg:col-span-6 xl:col-span-4">
          <CardHeader className="pb-3 md:pb-4 px-4 md:px-6">
            <div className="flex justify-between items-center w-full">
              <h3 className="text-base md:text-lg font-semibold">
                Performa K/L Terbesar
              </h3>
              <Link
                href="/mbg/data-update"
                as={NextLink}
                className="text-xs md:text-sm text-primary"
              >
                Lihat Semua
              </Link>
            </div>
          </CardHeader>
          <CardBody className="pt-0 px-4 md:px-6">
            <div className="space-y-2 md:space-y-3">
              {ministryData.slice(0, 4).map((ministry, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 md:p-3 bg-default-50 rounded-lg"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1 md:mb-2">
                      <h4 className="font-medium text-xs md:text-sm truncate pr-2">
                        {ministry.name}
                      </h4>
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
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-default-500">
                        Rp {ministry.realized}T / Rp {ministry.budget}T
                      </span>
                    </div>
                    <Progress
                      value={ministry.percentage}
                      color={
                        ministry.status === "excellent"
                          ? "success"
                          : ministry.status === "on-track"
                          ? "primary"
                          : "warning"
                      }
                      size="sm"
                      className="w-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Realization Chart - Responsive */}
        <Card className="border-none shadow-sm bg-gradient-to-br from-default-50 to-default-100 lg:col-span-12 xl:col-span-6">
          <CardHeader className="pb-2 px-4 md:px-6">
            <div className="flex flex-col gap-1">
              <h3 className="text-base md:text-lg font-semibold">
                Tren Realisasi APBN 2024
              </h3>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <p className="text-xs md:text-small text-default-500">
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
          <CardBody className="pt-0 px-2 pb-2">
            <div className="h-[200px] md:h-[280px] w-full flex flex-col overflow-hidden">
              <APBNChart />
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Bottom Row - Activities and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card className="border-none shadow-sm bg-gradient-to-br from-default-50 to-default-100">
          <CardHeader className="pb-3 md:pb-4 px-4 md:px-6">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-default-500" />
              <h3 className="text-base md:text-lg font-semibold">
                Aktivitas Terkini
              </h3>
            </div>
          </CardHeader>
          <CardBody className="pt-0 px-4 md:px-6">
            <div className="space-y-3 md:space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {activity.status === "completed" ? (
                      <CheckCircle2 className="h-4 w-4 text-success" />
                    ) : activity.status === "pending" ? (
                      <Clock className="h-4 w-4 text-warning" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {activity.title}
                    </p>
                    <p className="text-xs text-default-500">
                      {activity.ministry}
                    </p>
                    <div className="flex justify-between items-center mt-1">
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
            <Divider className="my-4" />
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

        {/* Quick Actions */}
        <Card className="border-none shadow-sm bg-gradient-to-br from-default-50 to-default-100">
          <CardHeader className="pb-3 md:pb-4 px-4 md:px-6">
            <h3 className="text-base md:text-lg font-semibold">Aksi Cepat</h3>
          </CardHeader>
          <CardBody className="pt-0 space-y-3 px-4 md:px-6">
            <Button
              variant="flat"
              color="primary"
              size="sm"
              className="w-full justify-start"
              startContent={<BarChart3 size={16} />}
              as={NextLink}
              href="/mbg/dashboard-mbg"
            >
              Dashboard MBG
            </Button>
            <Button
              variant="flat"
              color="secondary"
              size="sm"
              className="w-full justify-start"
              startContent={<FileText size={16} />}
              as={NextLink}
              href="/mbg/kertas-kerja"
            >
              Kertas Kerja MBG
            </Button>
            <Button
              variant="flat"
              color="warning"
              size="sm"
              className="w-full justify-start"
              startContent={<Users size={16} />}
              as={NextLink}
              href="/mbg/data-update"
            >
              Update Data MBG
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  </div>
);
