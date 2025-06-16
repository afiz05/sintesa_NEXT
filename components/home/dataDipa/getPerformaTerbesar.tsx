"use client";

import { useContext, useEffect, useState } from "react";
import { useTheme } from "next-themes";

import MyContext from "@/utils/Contex";
import Encrypt from "@/utils/Encrypt";
import { handleHttpError } from "@/utils/handleError";
import {
  Card,
  CardBody,
  CardHeader,
  Progress,
  Chip,
  Link,
  Skeleton,
} from "@heroui/react";
import NextLink from "next/link";
import { Building2, TrendingUp, Database, FileX } from "lucide-react";

interface PerformaTerbesarData {
  kddept: string;
  nmdept: string;
  pagu: number;
  realisasi: number;
  persen: number;
}

interface GetPerformaTerbesarProps {
  selectedKanwil?: string;
  selectedKddept?: string;
}

export const GetPerformaTerbesar = ({
  selectedKanwil,
  selectedKddept,
}: GetPerformaTerbesarProps) => {
  const [dataDipa, setDataDipa] = useState<PerformaTerbesarData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const context = useContext(MyContext);
  const { theme } = useTheme();

  const { token, axiosJWT, statusLogin } = context! as {
    token: string;
    axiosJWT: any;
    statusLogin: any;
  };

  // Theme-aware class definitions - ensuring dark text in light mode
  const getThemeClasses = () => {
    const isDark = theme === "dark";
    return {
      cardBg: isDark
        ? "bg-gradient-to-br from-slate-800 to-slate-700"
        : "bg-gradient-to-br from-slate-100 to-slate-200",
      skeletonCardBg: isDark
        ? "bg-gradient-to-br from-slate-800 to-slate-700"
        : "bg-gradient-to-br from-default-50 to-default-100",
      skeletonItemBg: isDark ? "bg-slate-700/50" : "bg-default-50",
      textPrimary: isDark ? "text-slate-100" : "text-slate-900", // Dark text in light mode
      textSecondary: isDark ? "text-slate-300" : "text-slate-700", // Dark secondary text in light mode
      textMuted: isDark ? "text-slate-400" : "text-slate-600", // Dark muted text in light mode
    };
  };

  const formatTrillions = (amount: number) => {
    return (
      new Intl.NumberFormat("id-ID", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount) + " T"
    );
  };

  const getData = async () => {
    // Tambahkan filter kanwil jika selectedKanwil tersedia dan tidak "00"
    let kanwilFilter = "";
    if (selectedKanwil && selectedKanwil !== "00") {
      kanwilFilter = ` and prk.kdkanwil='${selectedKanwil}'`;
    }

    // Tambahkan filter kddept jika selectedKddept tersedia dan tidak "000"
    let kddeptFilter = "";
    if (selectedKddept && selectedKddept !== "000") {
      kddeptFilter = ` and prk.kddept='${selectedKddept}'`;
    }

    const encodedQuery = encodeURIComponent(
      `SELECT 
  prk.kddept,
  td.nmdept,
  SUM(prk.pagu) AS pagu,
  SUM(prk.realisasi) AS realisasi,
  SUM(prk.realisasi) / NULLIF(SUM(prk.pagu), 0) * 100 AS persen
FROM dashboard.pagu_real_kl prk
LEFT JOIN dbref.t_dept_2025 td
  ON prk.kddept = td.kddept
WHERE prk.thang = '2022'${kanwilFilter}${kddeptFilter}
GROUP BY prk.kddept, td.nmdept
ORDER BY pagu DESC
LIMIT 4;`
    );
    const cleanedQuery = decodeURIComponent(encodedQuery)
      .replace(/\n/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    const encryptedQuery = Encrypt(cleanedQuery);

    try {
      setLoading(true);
      setError(null);

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

      const resultData = response.data.result || [];
      setDataDipa(resultData);
    } catch (err: any) {
      const { status, data } = err.response || {};
      setDataDipa([]); // Explicitly set empty array on error
      handleHttpError(
        status,
        (data && data.error) ||
          "Terjadi Permasalahan Koneksi atau Server Backend "
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (statusLogin && token) {
      getData();
    }
  }, [statusLogin, token, selectedKanwil, selectedKddept]); // Tambahkan selectedKanwil dan selectedKddept sebagai dependency

  // Re-render component when theme changes to update styles
  useEffect(() => {
    // Component will automatically re-render when theme changes
  }, [theme]);

  if (loading) {
    return (
      <Card
        className={`border-none shadow-sm ${
          getThemeClasses().skeletonCardBg
        } lg:col-span-6 xl:col-span-3`}
      >
        <CardHeader className="pb-3 md:pb-4 px-4 md:px-6">
          <div className="flex justify-between items-center w-full">
            <Skeleton className="h-5 md:h-6 w-40 rounded" />
            <Skeleton className="h-4 w-20 rounded" />
          </div>
        </CardHeader>
        <CardBody className="pt-0 px-4 md:px-6">
          <div className="space-y-2 md:space-y-3">
            {Array.from({ length: 2 }).map((_, index) => (
              <div
                key={index}
                className={`p-2 md:p-3 ${
                  getThemeClasses().skeletonItemBg
                } rounded-lg space-y-2`}
              >
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-40 rounded" />
                  <Skeleton className="h-6 w-12 rounded-full" />
                </div>
                <Skeleton className="h-3 w-32 rounded" />
                <Skeleton className="h-2 w-full rounded-full" />
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    );
  }

  if (error) {
    return (
      <Card
        className={`border-none shadow-sm ${
          getThemeClasses().cardBg
        } lg:col-span-6 xl:col-span-3`}
      >
        <CardBody className="p-6 text-center">
          <p className="text-sm text-danger">Error: {error}</p>
        </CardBody>
      </Card>
    );
  }

  // Check for empty data - more comprehensive check
  const hasValidData =
    dataDipa && Array.isArray(dataDipa) && dataDipa.length > 0;

  if (!loading && !hasValidData) {
    return (
      <Card
        className={`border-none shadow-sm ${
          getThemeClasses().cardBg
        } lg:col-span-6 xl:col-span-3`}
      >
        <CardHeader className="pb-2 px-4 md:px-6">
          <div className="flex justify-between items-center w-full">
            <h3
              className={`text-sm md:text-base font-semibold ${
                getThemeClasses().textPrimary
              }`}
            >
              Performa K/L Terbesar
            </h3>
          </div>
        </CardHeader>
        <CardBody className="pt-0 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <FileX className="w-12 h-12 text-default-400 mb-4" />
            <div className="mt-4">
              <Chip
                size="sm"
                variant="flat"
                color="warning"
                startContent={<Database className="w-3 h-3" />}
                className="text-xs"
              >
                No Data Available
              </Chip>
            </div>
            <p className="text-sm text-default-500 mt-2">
              Tidak ada data performa K/L tersedia untuk filter yang dipilih
            </p>
          </div>
        </CardBody>
      </Card>
    );
  }

  // Process ministry data to show top performing ministries
  const ministryData = dataDipa
    .map((item) => {
      const percentage = item.pagu > 0 ? (item.realisasi / item.pagu) * 100 : 0;
      const status =
        percentage >= 90
          ? "excellent"
          : percentage >= 80
          ? "on-track"
          : "warning";
      return {
        name: item.nmdept || `K/L ${item.kddept}`,
        budget: formatTrillions(item.pagu / 1000000000000), // Convert to trillions
        realized: formatTrillions(item.realisasi / 1000000000000), // Convert to trillions
        percentage: Math.round(percentage),
        status,
        paguValue: item.pagu,
        realisasiValue: item.realisasi,
      };
    })
    .sort((a, b) => b.percentage - a.percentage); // Sort by performance percentage

  // Check if all data is zero (empty data)
  const hasNonZeroData = ministryData.some(
    (item) => item.paguValue > 0 || item.realisasiValue > 0
  );

  if (!loading && hasValidData && !hasNonZeroData) {
    return (
      <Card
        className={`border-none shadow-sm ${
          getThemeClasses().cardBg
        } lg:col-span-6 xl:col-span-3`}
      >
        <CardHeader className="pb-2 px-4 md:px-6">
          <div className="flex justify-between items-center w-full">
            <h3
              className={`text-sm md:text-base font-semibold ${
                getThemeClasses().textPrimary
              }`}
            >
              Performa K/L Terbesar
            </h3>
          </div>
        </CardHeader>
        <CardBody className="pt-0 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <FileX className="w-12 h-12 text-default-400 mb-4" />
            <div className="mt-4">
              <Chip
                size="sm"
                variant="flat"
                color="warning"
                startContent={<Database className="w-3 h-3" />}
                className="text-xs"
              >
                No Data Available
              </Chip>
            </div>
            <p className="text-sm text-default-500 mt-2">
              Data performa K/L belum tersedia untuk periode ini
            </p>
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card
      className={`border-none shadow-sm ${
        getThemeClasses().cardBg
      } lg:col-span-6 xl:col-span-3`}
    >
      <CardHeader className="pb-2 px-4 md:px-6">
        <div className="flex justify-between items-center w-full">
          <h3
            className={`text-sm md:text-base font-semibold ${
              getThemeClasses().textPrimary
            }`}
          >
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
                  <h4
                    className={`font-medium text-xs truncate pr-2 ${
                      getThemeClasses().textSecondary
                    }`}
                  >
                    {ministry.name}
                  </h4>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Progress
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
                      <span
                        className={`text-xs font-medium ${
                          theme === "dark" ? "text-white" : "text-slate-800"
                        }`}
                      >
                        Rp {ministry.realized} / Rp {ministry.budget}
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
  );
};
