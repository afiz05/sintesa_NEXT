"use client";

import { useContext, useEffect, useState } from "react";
import { useTheme } from "next-themes";

import MyContext from "@/utils/Contex";
import Encrypt from "@/utils/Encrypt";
import { handleHttpError } from "@/utils/handleError";
import { Card, CardBody, Chip, Skeleton } from "@heroui/react";
import {
  ArrowDownRight,
  ArrowUpRight,
  DollarSign,
  TrendingUp,
  Wallet,
  Building2,
  Target,
  Database,
  FileX,
} from "lucide-react";
import { useToast } from "@/components/context/ToastContext";

interface DipaData {
  pagu: number;
  realisasi: number;
  sisa: number;
  jumlah_dipa: number;
  persen: number;
}

interface GetDipaProps {
  selectedKanwil?: string;
  selectedKddept?: string;
}

export const GetDipa = ({ selectedKanwil, selectedKddept }: GetDipaProps) => {
  const [dataDipa, setDataDipa] = useState<DipaData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const context = useContext(MyContext);
  const { theme } = useTheme();
  const { showToast } = useToast();

  const { token, axiosJWT, statusLogin } = context! as {
    token: string;
    axiosJWT: any;
    statusLogin: any;
  };

  // Theme-aware class definitions
  const getThemeClasses = () => {
    const isDark = theme === "dark";
    return {
      cardBg: isDark
        ? "bg-gradient-to-br from-slate-800/90 to-slate-700/90"
        : "bg-gradient-to-br from-white/90 to-slate-50/90",
      cardBgPrimary: isDark
        ? "bg-gradient-to-br from-blue-900/80 to-blue-800/70"
        : "bg-gradient-to-br from-blue-50 to-blue-100/90",
      cardBgSuccess: isDark
        ? "bg-gradient-to-br from-green-900/80 to-green-800/70"
        : "bg-gradient-to-br from-green-50 to-green-100/90",
      cardBgWarning: isDark
        ? "bg-gradient-to-br from-amber-900/80 to-amber-800/70"
        : "bg-gradient-to-br from-amber-50 to-amber-100/90",
      cardBgSecondary: isDark
        ? "bg-gradient-to-br from-purple-900/80 to-purple-800/70"
        : "bg-gradient-to-br from-purple-50 to-purple-100/90",
      iconBg: isDark ? "bg-blue-500/20" : "bg-blue-500/10",
      textPrimary: isDark ? "text-slate-100" : "text-slate-900",
      textSecondary: isDark ? "text-slate-300" : "text-slate-600",
      textSuccess: isDark ? "text-green-400" : "text-green-600",
      textDanger: isDark ? "text-red-400" : "text-red-600",
      textMuted: isDark ? "text-slate-400" : "text-slate-600", // Dark muted text in light mode
    };
  };

  const getData = async () => {
    // Tambahkan filter kanwil jika selectedKanwil tersedia dan tidak "00"
    let kanwilFilter = "";
    if (selectedKanwil && selectedKanwil !== "00") {
      kanwilFilter = ` and kdkanwil='${selectedKanwil}'`;
    }

    // Tambahkan filter kddept jika selectedKddept tersedia dan tidak "000"
    let kddeptFilter = "";
    if (selectedKddept && selectedKddept !== "000") {
      kddeptFilter = ` and kddept='${selectedKddept}'`;
    }

    const encodedQuery = encodeURIComponent(
      `SELECT 
  SUM(pagu)/1000000000000 AS pagu,
  SUM(realisasi)/1000000000000 AS realisasi,
  (SUM(pagu) - SUM(realisasi))/1000000000000 AS sisa,
  (SELECT SUM(jml) FROM dashboard.dipa_satker_rekap where thang='2022'${kanwilFilter}${kddeptFilter}) AS jumlah_dipa ,
  ROUND(SUM(persen_dipa) / 1000000, 2) AS persen
FROM dashboard.pagu_real_kl prk where thang='2022' and kddept<>'999'${kanwilFilter}${kddeptFilter} limit 1;`
    );
    const cleanedQuery = decodeURIComponent(encodedQuery)
      .replace(/\n/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    const encryptedQuery = Encrypt(cleanedQuery);

    try {
      setLoading(true);

      const response = await axiosJWT.post(
        `${process.env.NEXT_PUBLIC_GET_REFERENSI}`,
        { query: encryptedQuery },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json, text/plain, */*",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDataDipa(response.data.result?.[0] || null);
    } catch (err: any) {
      const { data } = err.response || {};
      showToast(data && data.error, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [selectedKanwil, selectedKddept]); // Tambahkan selectedKanwil dan selectedKddept sebagai dependency

  const formatTrillions = (amount: number) => {
    return (
      new Intl.NumberFormat("id-ID", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount) + " T"
    );
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("id-ID").format(num);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mt-4 md:mt-6">
        {" "}
        {Array.from({ length: 4 }).map((_, index) => (
          <Card
            key={index}
            className={`border-none shadow-sm ${getThemeClasses().cardBg}`}
          >
            <CardBody className="p-3 md:p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                  <Skeleton className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex-shrink-0" />
                  <div className="min-w-0 flex-1 space-y-2">
                    <Skeleton className="h-3 w-20 rounded" />
                    <Skeleton className="h-5 w-24 rounded" />
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Skeleton className="h-4 w-4 rounded" />
                  <Skeleton className="h-3 w-8 rounded" />
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    );
  }

  if (!dataDipa) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mt-4 md:mt-6">
        <Card
          className={`border-none shadow-sm ${
            getThemeClasses().cardBg
          } sm:col-span-2 lg:col-span-4`}
        >
          <CardBody className="pt-0 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="mt-4">
                <Chip
                  size="sm"
                  variant="flat"
                  color="warning"
                  startContent={<Database className="w-3 h-3" />}
                  className="text-xs"
                >
                  No Data
                </Chip>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
  // Calculate additional metrics
  const realisasiPercentage = (dataDipa.realisasi / dataDipa.pagu) * 100;
  const sisaPercentage = (dataDipa.sisa / dataDipa.pagu) * 100;

  // Create stats array from the single dataDipa object
  const stats = [
    {
      title: "Total Pagu",
      value: formatTrillions(dataDipa.pagu),
      icon: Wallet,
      color: "primary",
      trend: "up" as const,
      change: "+2.5%",
    },
    {
      title: "Realisasi",
      value: formatTrillions(dataDipa.realisasi),
      icon: TrendingUp,
      color: "success",
      trend: realisasiPercentage > 50 ? ("up" as const) : ("down" as const),
      change: `${realisasiPercentage.toFixed(1)}%`,
    },
    {
      title: "Sisa Anggaran",
      value: formatTrillions(dataDipa.sisa),
      icon: DollarSign,
      color: "warning",
      trend: sisaPercentage > 30 ? ("up" as const) : ("down" as const),
      change: `${sisaPercentage.toFixed(1)}%`,
    },
    {
      title: "Jumlah DIPA",
      value: formatNumber(dataDipa.jumlah_dipa),
      icon: Building2,
      color: "secondary",
      trend: "up" as const,
      change: `${formatNumber(dataDipa.jumlah_dipa)} unit`,
    },
    {
      title: "Efisiensi Anggaran",
      value: `${dataDipa.persen}%`,
      icon: Target,
      color: "primary",
      trend: dataDipa.persen > 80 ? ("up" as const) : ("down" as const),
      change: `${dataDipa.persen}%`,
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-12 gap-2 md:gap-3 mt-2 md:mt-3">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className={`border-none shadow-sm hover:shadow-md transition-shadow ${
            stat.color === "primary"
              ? getThemeClasses().cardBgPrimary
              : stat.color === "success"
              ? getThemeClasses().cardBgSuccess
              : stat.color === "warning"
              ? getThemeClasses().cardBgWarning
              : stat.color === "secondary"
              ? getThemeClasses().cardBgSecondary
              : getThemeClasses().cardBg
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
                      getThemeClasses().textSecondary
                    } truncate`}
                  >
                    {stat.title}
                  </p>
                  <p
                    className={`text-sm md:text-lg font-semibold ${
                      getThemeClasses().textPrimary
                    } truncate`}
                  >
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
