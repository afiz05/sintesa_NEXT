"use client";

import { useContext, useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Skeleton, Chip } from "@heroui/react";
import { useTheme } from "next-themes";
import Chart, { Props } from "react-apexcharts";
import { PieChart, Database, FileX } from "lucide-react";

import MyContext from "@/utils/Contex";
import Encrypt from "@/utils/Encrypt";
import { handleHttpError } from "@/utils/handleError";

interface DukmanTeknisData {
  thang: number;
  pagu_dukman: number;
  pagu_teknis: number;
  real_dukman: number;
  real_teknis: number;
}

interface DukmanTeknisProps {
  selectedKanwil?: string;
  selectedKddept?: string;
}

export const DukmanTeknis = ({
  selectedKanwil,
  selectedKddept,
}: DukmanTeknisProps) => {
  const [dataDukmanTeknis, setDataDukmanTeknis] = useState<DukmanTeknisData[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const context = useContext(MyContext);
  const { theme } = useTheme();

  const { token, axiosJWT } = context! as {
    token: string;
    axiosJWT: any;
  };

  const formatTrillions = (amount: number) => {
    return (
      new Intl.NumberFormat("id-ID", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount / 1000000000000) + " T"
    );
  };

  const formatTrillionsForChart = (amount: number) => {
    return (
      new Intl.NumberFormat("id-ID", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }).format(amount / 1000000000000) + " T"
    );
  };

  // Theme-aware color definitions
  const getThemeColors = () => {
    const isDark = theme === "dark";
    return {
      primary: "#008FFB",
      success: "#00E396",
      strokeColor: isDark ? "#374151" : "#f3f4f6",
      textPrimary: isDark ? "#f3f4f6" : "#374151",
      tooltipBg: isDark ? "#1f2937" : "#ffffff",
      tooltipBorder: isDark ? "#374151" : "#e5e7eb",
      tooltipText: isDark ? "#f3f4f6" : "#374151",
      foreColor: isDark ? "#f3f4f6" : "#374151",
    };
  };

  // Theme-aware class definitions for skeleton
  const getThemeClasses = () => {
    const isDark = theme === "dark";
    return {
      cardBg: isDark
        ? "bg-gradient-to-br from-slate-800/90 to-slate-700/90"
        : "bg-gradient-to-br from-white/90 to-slate-50/90",
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
    thang,
 SUM(CASE WHEN jns_program = 'dukman' THEN pagu ELSE 0 END) AS pagu_dukman,
    SUM(CASE WHEN jns_program = 'teknis' THEN pagu ELSE 0 END) AS pagu_teknis,
    SUM(CASE WHEN jns_program = 'dukman' THEN 
        IFNULL(real1,0)+IFNULL(real2,0)+IFNULL(real3,0)+IFNULL(real4,0)+IFNULL(real5,0)+
        IFNULL(real6,0)+IFNULL(real7,0)+IFNULL(real8,0)+IFNULL(real9,0)+IFNULL(real10,0)+
        IFNULL(real11,0)+IFNULL(real12,0)
        ELSE 0 END) AS real_dukman,
    SUM(CASE WHEN jns_program = 'teknis' THEN 
        IFNULL(real1,0)+IFNULL(real2,0)+IFNULL(real3,0)+IFNULL(real4,0)+IFNULL(real5,0)+
        IFNULL(real6,0)+IFNULL(real7,0)+IFNULL(real8,0)+IFNULL(real9,0)+IFNULL(real10,0)+
        IFNULL(real11,0)+IFNULL(real12,0)
        ELSE 0 END) AS real_teknis
FROM dashboard.tren_belanja_dukman_teknis
WHERE thang = '2022' ${kanwilFilter}${kddeptFilter}`
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

      const resultData = response.data.result || [];
      setDataDukmanTeknis(resultData);
    } catch (err: any) {
      const { status, data } = err.response || {};
      setDataDukmanTeknis([]); // Explicitly set empty array on error
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
    getData();
  }, [selectedKanwil, selectedKddept]); // Tambahkan selectedKanwil dan selectedKddept sebagai dependency

  if (loading) {
    return (
      <Card
        className={`border-none shadow-sm ${
          getThemeClasses().cardBg
        } lg:col-span-12 xl:col-span-6`}
      >
        <CardHeader className="pb-3 md:pb-4 px-4 md:px-6">
          <div className="flex justify-between items-center w-full">
            <Skeleton className="h-5 md:h-6 w-48 rounded" />
            <Skeleton className="h-4 w-20 rounded" />
          </div>
        </CardHeader>
        <CardBody className="pt-0 px-4 md:px-6">
          <div className="space-y-3">
            {/* Chart legend skeleton */}
            <div className="flex justify-center gap-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-3 w-3 rounded-full" />
                <Skeleton className="h-3 w-12 rounded" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-3 w-3 rounded-full" />
                <Skeleton className="h-3 w-16 rounded" />
              </div>
            </div>
            {/* Chart area skeleton */}
            <div className="h-64 flex items-end justify-center gap-8">
              <div className="flex flex-col items-center gap-2">
                <Skeleton className="h-20 w-8 rounded-t" />
                <Skeleton className="h-24 w-8 rounded-t" />
                <Skeleton className="h-4 w-12 rounded" />
              </div>
              <div className="flex flex-col items-center gap-2">
                <Skeleton className="h-16 w-8 rounded-t" />
                <Skeleton className="h-20 w-8 rounded-t" />
                <Skeleton className="h-4 w-12 rounded" />
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    );
  }

  // Theme-aware class definitions for empty state
  const getEmptyStateClasses = () => {
    const isDark = theme === "dark";
    return {
      cardBg: isDark
        ? "bg-gradient-to-br from-slate-800/90 to-slate-700/90"
        : "bg-gradient-to-br from-white/90 to-slate-50/90",
      textPrimary: isDark ? "text-slate-100" : "text-slate-900",
      textSecondary: isDark ? "text-slate-300" : "text-slate-600",
      textMuted: isDark ? "text-slate-400" : "text-slate-600",
    };
  };

  // Check for empty data - more comprehensive check
  const hasValidData =
    dataDukmanTeknis &&
    Array.isArray(dataDukmanTeknis) &&
    dataDukmanTeknis.length > 0 &&
    dataDukmanTeknis[0]; // Make sure first element exists

  // Process data for chart - create series for Dukman and Teknis
  if (!loading && !hasValidData) {
    return (
      <div className="w-full h-full">
        <Card
          className={`border-none shadow-sm ${
            getEmptyStateClasses().cardBg
          } h-full`}
        >
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
                Tidak ada data Dukungan Manajemen/Teknis tersedia untuk filter
                yang dipilih
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  // Get the first record (since we're grouping by year)
  const data = dataDukmanTeknis[0];

  // Create data arrays for the chart
  const categories = ["Dukman", "Teknis"];

  // Use actual values for both pagu and realisasi
  const paguData = [data.pagu_dukman || 0, data.pagu_teknis || 0];
  const realisasiData = [data.real_dukman || 0, data.real_teknis || 0];

  // Check if all data is zero (empty data)
  const hasNonZeroData =
    paguData.some((val) => val > 0) || realisasiData.some((val) => val > 0);

  if (!loading && hasValidData && !hasNonZeroData) {
    return (
      <div className="w-full h-full">
        <Card
          className={`border-none shadow-sm ${
            getEmptyStateClasses().cardBg
          } h-full`}
        >
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
                Data Dukungan Manajemen/Teknis belum tersedia untuk periode ini
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  const colors = getThemeColors();

  const state: Props["series"] = [
    {
      name: "Pagu",
      data: paguData,
    },
    {
      name: "Realisasi",
      data: realisasiData,
    },
  ];

  const options: Props["options"] = {
    chart: {
      type: "bar",
      animations: {
        speed: 300,
      },
      toolbar: { show: false },
      background: "transparent",
      fontFamily: "inherit",
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          colors: colors.textPrimary,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: colors.textPrimary,
        },
        formatter: function (value: number) {
          return formatTrillionsForChart(value);
        },
      },
    },
    colors: [colors.primary, colors.success],
    stroke: {
      width: 2,
      colors: [colors.strokeColor],
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 4,
        dataLabels: {
          position: "center",
          orientation: "vertical",
        },
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "11px",
        fontWeight: 600,
        colors: [theme === "dark" ? "#ffffff" : "#1f2937"],
      },
      formatter: function (val: number) {
        return formatTrillionsForChart(val);
      },
      offsetX: 0,
      offsetY: 0,
      textAnchor: "middle",
      distributed: false,
      background: {
        enabled: false,
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "center",
      fontSize: "12px",
      fontWeight: 500,
      labels: {
        colors: colors.textPrimary,
      },
      markers: {
        size: 8,
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5,
      },
    },
    tooltip: {
      theme: theme === "dark" ? "dark" : "light",
      style: {
        fontSize: "12px",
      },
      y: {
        formatter: function (val: number) {
          return formatTrillions(val);
        },
      },
    },
    grid: {
      show: true,
      borderColor: colors.strokeColor,
      strokeDashArray: 0,
      position: "back",
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          legend: {
            position: "top",
            fontSize: "10px",
            labels: {
              colors: colors.textPrimary,
            },
          },
          dataLabels: {
            style: {
              fontSize: "10px",
              colors: [theme === "dark" ? "#ffffff" : "#1f2937"],
            },
          },
        },
      },
    ],
  };

  return (
    <div className="w-full h-full relative">
      <Chart
        key={theme} // Force re-render when theme changes
        options={options}
        series={state}
        type="bar"
        height="100%"
        width="100%"
      />
    </div>
  );
};
