import React from "react";
import { Input, Select, SelectItem } from "@heroui/react";
import { Layers } from "lucide-react";
import Kdunit from "../../../referensi_belanja/Kdunit";

const UnitFilter = ({ inquiryState, onFilterChange }) => {
  // Get the selected department from the parent state to filter the unit list
  const { dept } = inquiryState;

  // Local state for all fields within this filter component
  const [unit, setUnit] = React.useState("XX"); // Default to 'Semua Unit'
  const [unitkondisi, setUnitkondisi] = React.useState(""); // Masukkan Kondisi
  const [kataunit, setKataunit] = React.useState(""); // Mengandung Kata
  const [unitradio, setUnitradio] = React.useState("1"); // Select value: "1", "2", "3", "4"

  // 4 display options, matching KementerianFilter
  const UnitOptions = [
    { value: "1", label: "Kode" },
    { value: "2", label: "Kode Uraian" },
    { value: "3", label: "Uraian" },
    { value: "4", label: "Jangan Tampilkan" },
  ];

  // Notify parent or query generator whenever any filter changes
  React.useEffect(() => {
    if (onFilterChange) {
      onFilterChange({
        unit,
        unitkondisi,
        kataunit,
        unitradio,
      });
    }
  }, [unit, unitkondisi, kataunit, unitradio, onFilterChange]);

  // When the department changes, reset the selected unit to "Semua Unit"
  React.useEffect(() => {
    setUnit("XX");
  }, [dept]);

  return (
    <div className="w-full p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-orange-100 to-yellow-100 shadow-sm">
      {/* Mobile/Tablet: Stack vertically, Desktop: Row layout */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 w-full">
        {/* Title - Full width on mobile, fixed width on desktop */}
        <h6 className="font-semibold flex items-center gap-2 lg:min-w-[100px] lg:flex-[2]">
          <Layers size={18} className="text-primary" />
          Eselon I
        </h6>

        {/* Form fields container */}
        <div className="flex flex-col lg:flex-[8] gap-3 lg:gap-1 w-full">
          {/* Fields: Stack on mobile/tablet, row on large desktop */}
          <div className="flex flex-col xl:flex xl:flex-row xl:items-end gap-3 xl:gap-4 w-full">
            {/* Kdunit */}
            <div className="flex flex-col gap-1 w-full xl:flex-1 min-w-0 max-w-full overflow-hidden">
              <label className="text-sm font-medium text-gray-700">
                Pilih Eselon I
              </label>
              <Kdunit
                value={unit}
                onChange={setUnit} // The refactored Kdunit passes the value directly
                kddept={dept}
                className="w-full min-w-0 max-w-full"
                size="sm"
                status="pilihunit"
              />
            </div>

            {/* Kondisi */}
            <div className="flex flex-col gap-1 w-full xl:flex-1">
              <label className="text-sm font-medium text-gray-700">
                Masukkan Kondisi
              </label>
              <Input
                placeholder="misalkan: 01,02,03, dst"
                className="w-full min-w-0"
                size="sm"
                value={unitkondisi}
                onChange={(e) => setUnitkondisi(e.target.value)}
              />
              {/* Helper text - show immediately below on mobile */}
              <p className="text-xs text-gray-500 xl:hidden">
                untuk banyak kode pisahkan dengan koma, gunakan tanda ! di depan
                untuk exclude
              </p>
            </div>

            {/* Kata */}
            <div className="flex flex-col gap-1 w-full xl:flex-1">
              <label className="text-sm font-medium text-gray-700">
                Mengandung Kata
              </label>
              <Input
                placeholder="misalkan: sekretariat"
                className="w-full min-w-0"
                size="sm"
                value={kataunit}
                onChange={(e) => setKataunit(e.target.value)}
              />
            </div>

            {/* Jenis Tampilan */}
            <div className="flex flex-col gap-1 w-full xl:flex-1">
              <label className="text-sm font-medium text-gray-700">
                Jenis Tampilan
              </label>
              <Select
                aria-label="Pilih tampilan"
                className="w-full min-w-0"
                size="sm"
                selectedKeys={[unitradio]}
                onSelectionChange={(key) => {
                  let selected = key;
                  if (key && typeof key !== "string" && key.size) {
                    selected = Array.from(key)[0];
                  }
                  if (!selected) {
                    setUnitradio("1");
                    return;
                  }
                  setUnitradio(selected);
                }}
                disallowEmptySelection
              >
                {UnitOptions.map((opt) => (
                  <SelectItem key={opt.value} textValue={opt.label}>
                    {opt.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>

          {/* Helper text row - only show on extra large screens */}
          <div className="hidden xl:flex xl:flex-row gap-4 w-full">
            {/* Spacer for Kdunit */}
            <div className="flex-1"></div>
            {/* Helper text under Kondisi */}
            <div className="flex-1">
              <p className="text-xs text-gray-500">
                untuk banyak kode pisahkan dengan koma, gunakan tanda ! di depan
                untuk exclude
              </p>
            </div>
            {/* Spacer for Kata */}
            <div className="flex-1"></div>
            {/* Spacer for Jenis Tampilan */}
            <div className="flex-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitFilter;
