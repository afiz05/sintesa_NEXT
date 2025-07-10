import React from "react";
import { Select, SelectItem } from "@heroui/react";
import { Calendar } from "lucide-react";

const months = [
  { value: "1", label: "Januari" },
  { value: "2", label: "Februari" },
  { value: "3", label: "Maret" },
  { value: "4", label: "April" },
  { value: "5", label: "Mei" },
  { value: "6", label: "Juni" },
  { value: "7", label: "Juli" },
  { value: "8", label: "Agustus" },
  { value: "9", label: "September" },
  { value: "10", label: "Oktober" },
  { value: "11", label: "November" },
  { value: "12", label: "Desember" },
];

const CutoffFilter = ({ inquiryState }) => {
  const { cutoff, setCutoff } = inquiryState;

  // Cutoff is always enabled for UP/TUP
  const isCutoffEnabled = true;

  // Handle selection change
  const handleSelectionChange = (keys) => {
    const selectedKey = Array.from(keys)[0];
    if (selectedKey) {
      setCutoff(selectedKey);
    }
  };

  return (
    <div className="p-3 sm:mx-16 rounded-2xl bg-gradient-to-r from-green-100 to-emerald-100 dark:from-zinc-900 dark:to-zinc-900 shadow-sm">
      {/* Mobile/Tablet: Stack vertically, Desktop: Row layout */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 w-full">
        {/* Title - Full width on mobile, fixed width on desktop */}
        <h6 className="font-semibold flex items-center gap-2 lg:min-w-[100px] lg:flex-[2]">
          <Calendar size={20} className="ml-4 text-secondary" />
          Cut-Off
        </h6>

        {/* Form fields container */}
        <div className="flex flex-col lg:flex-[8] gap-3 lg:gap-1 w-full">
          {/* Fields: Stack on mobile/tablet, row on large desktop */}
          <div className="flex flex-col xl:flex xl:flex-row xl:items-end gap-3 xl:gap-4 w-full">
            {/* Month Selection */}
            <div className="flex flex-col gap-1 w-full xl:flex-1 min-w-0 max-w-full overflow-hidden">
              <label className="text-sm font-medium text-gray-700">
                Pilih Bulan Cutoff
              </label>
              <div className="flex items-center">
                <Select
                  aria-label="Select cutoff month"
                  className="w-full min-w-0 max-w-xs"
                  size="sm"
                  selectedKeys={
                    isCutoffEnabled ? new Set([cutoff]) : new Set(["12"])
                  }
                  onSelectionChange={handleSelectionChange}
                  isDisabled={!isCutoffEnabled}
                  disallowEmptySelection
                  placeholder="Choose month"
                >
                  {months.map((month) => (
                    <SelectItem key={month.value} value={month.value}>
                      {month.label}
                    </SelectItem>
                  ))}
                </Select>
                <p className="text-xs text-gray-500 ml-3">
                  Wajib dipilih - Filter bulan selalu aktif untuk UP/TUP
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CutoffFilter;
