"use client";
import React, { useMemo } from "react";
import { Card, CardBody, CardHeader, Chip } from "@heroui/react";
import { TrendingUp, TrendingDown } from "lucide-react";
import {
  INDONESIA_PROVINCES,
  ProvinceData,
} from "../../../data/indonesia-provinces";

export const PenerimaMbgWilayah = () => {
  // Calculate top 5 highest and lowest performing provinces
  const { topHighest, topLowest } = useMemo(() => {
    // Filter provinces that have MBG data
    const provincesWithData = INDONESIA_PROVINCES.filter(
      (province) => province.mbgData
    );

    // Sort by percentage descending for highest
    const sortedHighest = [...provincesWithData].sort(
      (a, b) => (b.mbgData?.persentase || 0) - (a.mbgData?.persentase || 0)
    );

    // Sort by percentage ascending for lowest
    const sortedLowest = [...provincesWithData].sort(
      (a, b) => (a.mbgData?.persentase || 0) - (b.mbgData?.persentase || 0)
    );

    return {
      topHighest: sortedHighest.slice(0, 5),
      topLowest: sortedLowest.slice(0, 5),
    };
  }, []);

  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 85) return "success";
    if (percentage >= 80) return "warning";
    return "danger";
  };

  const renderProvinceRow = (
    province: ProvinceData,
    index: number,
    isHighest: boolean
  ) => (
    <div
      key={province.id}
      className="flex items-center justify-between py-2 px-3 rounded-md bg-default-50 hover:bg-default-100 transition-colors"
    >
      <div className="flex items-center gap-2">
        <div
          className={`flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold ${
            isHighest
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {index + 1}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium truncate">{province.name}</p>
          <p className="text-[10px] text-default-500 truncate">
            {province.mbgData?.realisasi.toLocaleString()} /{" "}
            {province.mbgData?.totalProgram.toLocaleString()}
          </p>
        </div>
      </div>
      <Chip
        size="sm"
        color={getPerformanceColor(province.mbgData?.persentase || 0)}
        variant="flat"
        className="text-xs"
      >
        {province.mbgData?.persentase}%
      </Chip>
    </div>
  );

  return (
    <Card className="h-[640px] flex flex-col">
      <CardHeader className="pb-2 flex-shrink-0">
        <div className="flex items-center gap-2">
          <TrendingUp className="text-primary" size={16} />
          <h3 className="text-base font-semibold">Ranking Distribusi MBG</h3>
        </div>
      </CardHeader>
      <CardBody className="pt-0 flex-1 overflow-hidden">
        <div className="space-y-4 h-full flex flex-col justify-between overflow-y-auto">
          {/* Top 5 Highest Distribution */}
          <div>
            <div className="flex items-center gap-1 mb-1">
              <TrendingUp className="text-green-600" size={14} />
              <h4 className="text-sm font-medium text-green-700">Tertinggi</h4>
            </div>
            <div className="space-y-1">
              {topHighest.map((province, index) =>
                renderProvinceRow(province, index, true)
              )}
            </div>
          </div>

          <div className="border-t border-default-200 pt-3">
            <div className="flex items-center gap-1 mb-1">
              <TrendingDown className="text-red-600" size={14} />
              <h4 className="text-sm font-medium text-red-700">Terendah</h4>
            </div>
            <div className="space-y-1">
              {topLowest.map((province, index) =>
                renderProvinceRow(province, index, false)
              )}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
