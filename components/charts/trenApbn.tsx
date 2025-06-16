"use client";

import { useContext, useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Skeleton, Chip } from "@heroui/react";
import { useTheme } from "next-themes";
import Chart, { Props } from "react-apexcharts";
import { TrendingUp, Database, FileX } from "lucide-react";

import MyContext from "@/utils/Contex";
import Encrypt from "@/utils/Encrypt";
import { handleHttpError } from "@/utils/handleError";

interface RencanaReal {
  kddept: string;
  nmdept: string;
  renc1: number;
  real1: number;
  renc2: number;
  real2: number;
  renc3: number;
  real3: number;
  renc4: number;
  real4: number;
  renc5: number;
  real5: number;
  renc6: number;
  real6: number;
  renc7: number;
  real7: number;
  renc8: number;
  real8: number;
  renc9: number;
  real9: number;
  renc10: number;
  real10: number;
  renc11: number;
  real11: number;
  renc12: number;
  real12: number;
}

interface TrenApbnProps {
  selectedKanwil?: string;
  selectedKddept?: string;
}

export const TrenApbn = ({ selectedKanwil, selectedKddept }: TrenApbnProps) => {
  const [dataRencanaReal, setDataRencanaReal] = useState<RencanaReal[]>([]);
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

  // Theme-aware color definitions
  const getThemeColors = () => {
    const isDark = theme === "dark";
    return {
      foreColor: isDark ? "#a1a1aa" : "#52525b", // zinc-400 : zinc-600
      borderColor: isDark ? "#3f3f46" : "#e4e4e7", // zinc-700 : zinc-200
      gridColor: isDark ? "#27272a" : "#f4f4f5", // zinc-800 : zinc-100
      axisColor: isDark ? "#52525b" : "#71717a", // zinc-600 : zinc-500
      primary: "#3B82F6",
      success: "#10B981",
      textPrimary: isDark ? "#f3f4f6" : "#374151",
    };
  };

  const getData = async () => {
    // Tambahkan filter kanwil jika selectedKanwil tersedia dan tidak "00"
    let kanwilFilter = "";
    if (selectedKanwil && selectedKanwil !== "00") {
      kanwilFilter = ` and a.kdkanwil='${selectedKanwil}'`;
    }

    // Tambahkan filter kddept jika selectedKddept tersedia dan tidak "000"
    let kddeptFilter = "";
    if (selectedKddept && selectedKddept !== "000") {
      kddeptFilter = ` and a.kddept='${selectedKddept}'`;
    }

    const encodedQuery = encodeURIComponent(
      `SELECT a.kddept,b.nmdept,
     ROUND(sum(renc1)/1, 0)  as renc1, 
    ROUND(sum(real1)/1, 0) as real1, 
    ROUND(sum(renc2)/1, 0) as renc2, 
    ROUND(sum(real2)/1, 0) as real2, 
    ROUND(sum(renc3)/1, 0) as renc3, 
    ROUND(sum(real3)/1, 0) as real3, 
    ROUND(sum(renc4)/1, 0) as renc4, 
    ROUND(sum(real4)/1, 0) as real4, 
    ROUND(sum(renc5)/1, 0) as renc5, 
    ROUND(sum(real5)/1, 0) as real5, 
    ROUND(sum(renc6)/1, 0) as renc6, 
    ROUND(sum(real6)/1, 0) as real6, 
    ROUND(sum(renc7)/1, 0) as renc7, 
    ROUND(sum(real7)/1, 0) as real7, 
    ROUND(sum(renc8)/1, 0) as renc8, 
    ROUND(sum(real8)/1, 0) as real8, 
    ROUND(sum(renc9)/1, 0) as renc9, 
    ROUND(sum(real9)/1, 0) as real9, 
    ROUND(sum(renc10)/1, 0) as renc10, 
    ROUND(sum(real10)/1, 0) as real10, 
    ROUND(sum(renc11)/1, 0) as renc11, 
    ROUND(sum(real11)/1, 0) as real11, 
    ROUND(sum(renc12)/1, 0) as renc12, 
    ROUND(sum(real12)/1, 0) as real12 FROM dashboard.rencana_real_bulanan  a  
    LEFT JOIN dbref.t_dept_2025 b ON a.kddept=b.kddept 
    WHERE 1=1 ${kanwilFilter}${kddeptFilter};`
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
      setDataRencanaReal(resultData);
    } catch (err: any) {
      const { status, data } = err.response || {};
      setDataRencanaReal([]); // Explicitly set empty array on error
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

  // Re-render chart when theme changes to update colors

  if (loading) {
    return (
      <Card className="border-none shadow-sm bg-gradient-to-br from-default-50 to-default-100 lg:col-span-12 xl:col-span-6">
        <CardHeader className="pb-2 px-4 md:px-6">
          <div className="flex flex-col gap-2 w-full">
            {/* <Skeleton className="h-5 md:h-6 w-48 rounded" /> */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <Skeleton className="h-3 md:h-4 w-40 rounded" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          </div>
        </CardHeader>
        <CardHeader className="pb-2 px-4 md:px-6">
          <div className="flex flex-col gap-2 w-full">
            {/* <Skeleton className="h-5 md:h-6 w-48 rounded" /> */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <Skeleton className="h-3 md:h-4 w-40 rounded" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          </div>
        </CardHeader>{" "}
        <CardHeader className="pb-2 px-4 md:px-6">
          <div className="flex flex-col gap-2 w-full">
            {/* <Skeleton className="h-5 md:h-6 w-48 rounded" /> */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <Skeleton className="h-3 md:h-4 w-40 rounded" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          </div>
        </CardHeader>{" "}
        <CardHeader className="pb-2 px-4 md:px-6">
          <div className="flex flex-col gap-2 w-full">
            {/* <Skeleton className="h-5 md:h-6 w-48 rounded" /> */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <Skeleton className="h-3 md:h-4 w-40 rounded" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          </div>
        </CardHeader>{" "}
      </Card>
    );
  }

  const getThemeClasses = () => {
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
    dataRencanaReal &&
    Array.isArray(dataRencanaReal) &&
    dataRencanaReal.length > 0 &&
    dataRencanaReal[0]; // Make sure first element exists

  if (!loading && !hasValidData) {
    return (
      <div className="w-full h-full">
        <Card
          className={`border-none shadow-sm ${getThemeClasses().cardBg} h-full`}
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
                Tidak ada data APBN tersedia untuk filter yang dipilih
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  // Proses data untuk chart - with safety checks
  const rencanaData =
    hasValidData && dataRencanaReal[0]
      ? [
          dataRencanaReal[0].renc1 || 0,
          dataRencanaReal[0].renc2 || 0,
          dataRencanaReal[0].renc3 || 0,
          dataRencanaReal[0].renc4 || 0,
          dataRencanaReal[0].renc5 || 0,
          dataRencanaReal[0].renc6 || 0,
          dataRencanaReal[0].renc7 || 0,
          dataRencanaReal[0].renc8 || 0,
          dataRencanaReal[0].renc9 || 0,
          dataRencanaReal[0].renc10 || 0,
          dataRencanaReal[0].renc11 || 0,
          dataRencanaReal[0].renc12 || 0,
        ]
      : [];

  const realisasiData =
    hasValidData && dataRencanaReal[0]
      ? [
          dataRencanaReal[0].real1 || 0,
          dataRencanaReal[0].real2 || 0,
          dataRencanaReal[0].real3 || 0,
          dataRencanaReal[0].real4 || 0,
          dataRencanaReal[0].real5 || 0,
          dataRencanaReal[0].real6 || 0,
          dataRencanaReal[0].real7 || 0,
          dataRencanaReal[0].real8 || 0,
          dataRencanaReal[0].real9 || 0,
          dataRencanaReal[0].real10 || 0,
          dataRencanaReal[0].real11 || 0,
          dataRencanaReal[0].real12 || 0,
        ]
      : [];

  // Check if all data is zero (empty data)
  const hasNonZeroData =
    rencanaData.some((val) => val > 0) || realisasiData.some((val) => val > 0);

  if (!loading && hasValidData && !hasNonZeroData) {
    return (
      <div className="w-full h-full">
        <Card
          className={`border-none shadow-sm ${getThemeClasses().cardBg} h-full`}
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
                Data APBN belum tersedia untuk periode ini
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  const state: Props["series"] = [
    {
      name: "Target APBN",
      data: rencanaData,
    },
    {
      name: "Realisasi APBN",
      data: realisasiData,
    },
  ];

  const colors = getThemeColors();

  const options: Props["options"] = {
    chart: {
      type: "area",
      animations: {
        speed: 300,
      },
      sparkline: {
        enabled: false,
      },
      brush: {
        enabled: false,
      },
      id: "basic-bar",
      foreColor: getThemeColors().foreColor,
      stacked: true,
      toolbar: {
        show: false,
      },
      parentHeightOffset: 0,
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
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Mei",
        "Jun",
        "Jul",
        "Agt",
        "Sep",
        "Okt",
        "Nov",
        "Des",
      ],
      labels: {
        style: {
          colors: getThemeColors().foreColor,
        },
      },
      axisBorder: {
        color: getThemeColors().borderColor,
      },
      axisTicks: {
        color: getThemeColors().borderColor,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: getThemeColors().foreColor,
        },
        formatter: function (value: number) {
          return formatTrillions(value);
        },
      },
    },
    tooltip: {
      theme: theme === "dark" ? "dark" : "light",
      style: {
        fontSize: "12px",
      },
      y: {
        formatter: function (value: number) {
          return formatTrillions(value);
        },
      },
    },
    colors: [colors.primary, colors.success],
    grid: {
      show: true,
      borderColor: getThemeColors().gridColor,
      strokeDashArray: 0,
      position: "back",
    },
    stroke: {
      curve: "smooth",
      fill: {
        colors: ["red"],
      },
    },
    // @ts-ignore
    markers: false,
  };

  return (
    <div className="w-full h-full">
      <div className="h-full flex flex-col">
        <Chart
          key={theme} // Force re-render when theme changes
          options={options}
          series={state}
          type="area"
          height="100%"
          width="100%"
        />
      </div>
    </div>
  );
};
