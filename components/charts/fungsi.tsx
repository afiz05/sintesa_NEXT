"use client";

import { useContext, useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Skeleton, Chip } from "@heroui/react";
import { useTheme } from "next-themes";
import { BarChart3, Database, FileX } from "lucide-react";
import dynamic from "next/dynamic";
import type { Props } from "react-apexcharts";

// Import Chart component with SSR disabled
const Chart = dynamic(() => import("./client-chart"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <Skeleton className="w-full h-64" />
    </div>
  ),
});

import MyContext from "@/utils/Contex";
import Encrypt from "@/utils/Encrypt";
import { handleHttpError } from "@/utils/handleError";
import { useToast } from "../context/ToastContext";

interface DipaPerFungsi {
  thang: number;
  kddept: string;
  nmdept: string;
  kdfungsi: string;
  nmfungsi: string;
  kdkanwil: string;
  nmkanwil: string;
  pagu: number;
  realisasi: number;
}

interface FungsiProps {
  selectedKanwil?: string;
  selectedKddept?: string;
}

export const Fungsi = ({ selectedKanwil, selectedKddept }: FungsiProps) => {
  const [dataDipaPerFungsi, setDataDipaPerFungsi] = useState<DipaPerFungsi[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const context = useContext(MyContext);
  const { theme } = useTheme();
  const { showToast } = useToast();

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

    const encodedQuery = encodeURIComponent(`
  SELECT
    a.thang,
    a.kddept, c.nmdept,
    a.kdfungsi,
    b.nmfungsi,
    a.kdkanwil,
    k.nmkanwil,
    SUM(a.pagu) AS pagu,
    SUM(a.realisasi) AS realisasi
  FROM
    dashboard.dipa_per_fungsi a
  LEFT JOIN dbref.t_fungsi_2025 b ON a.kdfungsi = b.kdfungsi
  LEFT JOIN dbref.t_kanwil_2025 k ON a.kdkanwil = k.kdkanwil
  LEFT JOIN dbref.t_dept_2025 c ON a.kddept = c.kddept
  WHERE a.thang='2025' ${kanwilFilter} ${kddeptFilter}
  GROUP BY a.kdfungsi
  ORDER BY a.thang, a.kdfungsi;
`);

    const cleanedQuery = decodeURIComponent(encodedQuery)
      .replace(/\n/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    const encryptedQuery = Encrypt(cleanedQuery);
    console.log(cleanedQuery);

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
      setDataDipaPerFungsi(resultData);
    } catch (err: any) {
      const { status, data } = err.response || {};
      showToast("Terjadi Permasalahan Koneksi atau Server Backend", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [selectedKanwil, selectedKddept]); // Tambahkan selectedKanwil dan selectedKddept sebagai dependency

  if (loading) {
    return (
      <Card className="border-none shadow-sm bg-gradient-to-br from-default-50 to-default-100 lg:col-span-12 xl:col-span-6">
        <CardBody className="p-6">
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex justify-between items-center">
                <Skeleton className="h-4 w-32 rounded" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            ))}
          </div>
        </CardBody>
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
  const isEmpty =
    dataDipaPerFungsi.length === 0 ||
    Object.values(dataDipaPerFungsi[0])
      .slice(2) // abaikan 2 field pertama
      .every((val) => val === 0 || val === null);

  if (isEmpty) {
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
                  Data Tidak Tersedia
                </Chip>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  // Process data for chart - more efficient approach
  const fungsiMap = new Map<
    string,
    { nmfungsi: string; pagu: number; realisasi: number }
  >();

  // Aggregate data by fungsi in a single pass
  dataDipaPerFungsi.forEach((item) => {
    const key = item.kdfungsi;
    const existing = fungsiMap.get(key);

    if (existing) {
      existing.pagu += item.pagu || 0;
      existing.realisasi += item.realisasi || 0;
    } else {
      fungsiMap.set(key, {
        nmfungsi: item.nmfungsi || `Fungsi ${key}`,
        pagu: item.pagu || 0,
        realisasi: item.realisasi || 0,
      });
    }
  });

  // Extract and sort data in one operation
  const sortedEntries = Array.from(fungsiMap.entries()).sort(([a], [b]) =>
    a.localeCompare(b)
  );

  // Create arrays from sorted data
  const kodeFungsiList: string[] = sortedEntries.map(([kdfungsi]) => kdfungsi);
  const fungsiNamesLengkap: string[] = sortedEntries.map(
    ([_, data]) => data.nmfungsi
  );
  const paguData: number[] = sortedEntries.map(([_, data]) => data.pagu);
  const realisasiData: number[] = sortedEntries.map(
    ([_, data]) => data.realisasi
  );

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
      categories: kodeFungsiList,
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
      x: {
        formatter: (_: any, { dataPointIndex }: { dataPointIndex: number }) =>
          fungsiNamesLengkap[dataPointIndex],
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
  // console.log(kodeFungsiList);

  return (
    <div className="w-full h-full relative">
      <Chart
        key={theme}
        options={options}
        series={state}
        height="100%"
        width="100%"
        type="area"
      />
    </div>
  );
};
