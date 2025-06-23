import React, { useState } from "react";
import { Select, SelectItem } from "@heroui/react";
import "./style.css";

const Thang = ({ jenlap, onChange, value }) => {
  const thang = [
    { value: "2014", label: "2014" },
    { value: "2015", label: "2015" },
    { value: "2016", label: "2016" },
    { value: "2017", label: "2017" },
    { value: "2018", label: "2018" },
    { value: "2019", label: "2019" },
    { value: "2020", label: "2020" },
    { value: "2021", label: "2021" },
    { value: "2022", label: "2022" },
    { value: "2023", label: "2023" },
    { value: "2024", label: "2024" },
    { value: "2025", label: "2025" },
  ];

  const handleSelectionChange = (selectedKey) => {
    if (selectedKey && selectedKey.size > 0) {
      const selectedValue = Array.from(selectedKey)[0];
      onChange(selectedValue);
    }
  };

  const isDisabled = (tahunValue) => {
    return (
      (jenlap === "1" && tahunValue < "2019") ||
      (jenlap === "6" && tahunValue < "2018") ||
      (jenlap === "7" && tahunValue < "2024")
    );
  };

  const availableYears = thang.filter((tahun) => !isDisabled(tahun.value));

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="w-1 h-4 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          Tahun
        </label>
      </div>

      <Select
        placeholder="Pilih Tahun"
        selectedKeys={value ? new Set([value]) : new Set()}
        onSelectionChange={handleSelectionChange}
        variant="bordered"
        size="sm"
        classNames={{
          trigger:
            "bg-white dark:bg-slate-700 border-blue-200 dark:border-blue-600 hover:border-blue-300 dark:hover:border-blue-500",
          value: "text-slate-700 dark:text-slate-300",
          label: "text-slate-600 dark:text-slate-400",
        }}
      >
        {availableYears.map((tahun) => (
          <SelectItem
            key={tahun.value}
            value={tahun.value}
            className="text-slate-700 dark:text-slate-300"
          >
            {tahun.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default Thang;
