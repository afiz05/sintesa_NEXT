import React, { useState } from "react";
import { Select, SelectItem } from "@heroui/react";
import "./style.css";

const Pembulatan = ({ onChange, value }) => {
  const pembulatan = [
    { value: "1", label: "Rupiah" },
    { value: "1000", label: "Ribu" },
    { value: "1000000", label: "Juta" },
    { value: "1000000000", label: "Milyar" },
    { value: "1000000000000", label: "Triliun" },
  ];

  const handleSelectionChange = (selectedKey) => {
    if (selectedKey && selectedKey.size > 0) {
      const selectedValue = Array.from(selectedKey)[0];
      onChange(selectedValue);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="w-1 h-4 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          Pembulatan
        </label>
      </div>

      <Select
        placeholder="Pilih Pembulatan"
        selectedKeys={value ? new Set([value]) : new Set(["1"])}
        onSelectionChange={handleSelectionChange}
        variant="bordered"
        size="sm"
        classNames={{
          trigger:
            "bg-white dark:bg-slate-700 border-purple-200 dark:border-purple-600 hover:border-purple-300 dark:hover:border-purple-500",
          value: "text-slate-700 dark:text-slate-300",
          label: "text-slate-600 dark:text-slate-400",
        }}
      >
        {pembulatan.map((item) => (
          <SelectItem
            key={item.value}
            value={item.value}
            className="text-slate-700 dark:text-slate-300"
          >
            {item.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default Pembulatan;
