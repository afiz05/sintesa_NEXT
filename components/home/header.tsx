"use client";

import {
  formatRibuanFromString,
  formatTriliunFromString,
} from "@/helpers/formatAngka";
import { Card, CardBody } from "@heroui/react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Building2,
  Calendar,
  DollarSign,
  Target,
  TrendingUp,
} from "lucide-react";

interface HeaderDashboardProps {
  dataDipa: any;
}

export const HeaderDashboard: React.FC<HeaderDashboardProps> = ({
  dataDipa,
}) => {
  const quickStats = [
    {
      title: "Pagu DIPA",
      value: dataDipa ? formatTriliunFromString(dataDipa.pagu) : "Rp 0 T",

      change: "+5.8%",
      trend: "up",
      icon: DollarSign,
      color: "primary",
    },
    {
      title: "Realisasi",
      value: dataDipa ? formatTriliunFromString(dataDipa.realisasi) : 0,
      change: "90.2%",
      trend: "up",
      icon: TrendingUp,
      color: "success",
    },
    {
      title: "Sisa Anggaran",
      value: dataDipa ? formatTriliunFromString(dataDipa.sisa) : 0,
      change: "9.8%",
      trend: "down",
      icon: Target,
      color: "warning",
    },
    {
      title: "Jumlah DIPA",
      value: dataDipa ? formatRibuanFromString(dataDipa.jumlah_dipa) : 0,
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
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-12 gap-2 md:gap-3 mt-2 md:mt-3">
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
          } ${
            // Custom width for each card on large screens
            index === 0
              ? "lg:col-span-2" // Pagu DIPA - largest
              : index === 1
              ? "lg:col-span-2" // Realisasi - medium-large
              : index === 2
              ? "lg:col-span-2" // Sisa Anggaran - medium
              : index === 3
              ? "lg:col-span-3" // K/L Aktif - half width
              : "lg:col-span-3" // Efisiensi Anggaran - half width
          }`}
        >
          <CardBody className="p-2 md:p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 md:gap-2 min-w-0 flex-1">
                <div
                  className={`p-1 md:p-1.5 rounded-lg bg-${stat.color}/20 border border-${stat.color}/30 flex-shrink-0`}
                >
                  <stat.icon
                    className={`h-3 w-3 md:h-4 md:w-4 text-${stat.color}`}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className={`text-xs ${
                      stat.color === "warning"
                        ? "text-warning-600"
                        : "text-default-600"
                    } truncate`}
                  >
                    {stat.title}
                  </p>
                  <p className="text-sm md:text-lg font-semibold text-default-900 truncate">
                    {stat.value}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-2 w-2 md:h-3 md:w-3 text-success-600" />
                ) : (
                  <ArrowDownRight className="h-2 w-2 md:h-3 md:w-3 text-danger-600" />
                )}
                <span
                  className={`text-xs font-medium ${
                    stat.trend === "up" ? "text-success-600" : "text-danger-600"
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
  );
};
