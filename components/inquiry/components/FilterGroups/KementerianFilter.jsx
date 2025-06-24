import React from "react";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import Kddept from "../../../referensi_belanja/Kddept";
import { Building } from "lucide-react";

const KementerianFilter = ({ inquiryState, onFilterChange, status }) => {
  // State for all filter fields
  const [dept, setDept] = React.useState("000"); // Default to 'Semua Kementerian' (000)
  const [deptkondisi, setDeptkondisi] = React.useState(""); // Masukkan Kondisi
  const [katadept, setKatadept] = React.useState(""); // Mengandung Kata
  const [deptradio, setDeptradio] = React.useState("1"); // Select value: "1", "2", "3", "4"

  // Options for select (radio replacement)
  const KementerianOptions = [
    { value: "1", label: "Kode" },
    { value: "2", label: "Kode Uraian" },
    { value: "3", label: "Uraian" },
    { value: "4", label: "Jangan Tampilkan" },
  ];

  // Notify parent or query generator whenever any filter changes
  React.useEffect(() => {
    if (onFilterChange) {
      onFilterChange({
        dept,
        deptkondisi,
        katadept,
        deptradio,
      });
    }
  }, [dept, deptkondisi, katadept, deptradio, onFilterChange]);
  return (
    <div className="w-full p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-red-100 to-amber-100 shadow-sm">
      {/* Mobile/Tablet: Stack vertically, Desktop: Row layout */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 w-full">
        {/* Title - Full width on mobile, fixed width on desktop */}
        <h6 className="font-semibold flex items-center gap-2 lg:min-w-[100px] lg:flex-[2]">
          <Building size={18} className="text-primary" />
          Kementerian
        </h6>{" "}
        {/* Form fields container */}
        <div className="flex flex-col lg:flex-[8] gap-3 lg:gap-1 w-full">
          {/* Fields: Stack on mobile/tablet, row on large desktop */}
          <div className="flex flex-col xl:flex xl:flex-row xl:items-end gap-3 xl:gap-4 w-full">
            {" "}
            {/* Kddept */}
            <div className="flex flex-col gap-1 w-full xl:flex-1 min-w-0 max-w-full overflow-hidden">
              <label className="text-sm font-medium text-gray-700">
                Pilih Kementerian
              </label>
              <Kddept
                value={dept}
                onChange={setDept}
                className="w-full min-w-0 max-w-full"
                size="sm"
                status={status}
              />
            </div>
            {/* Kondisi */}
            <div className="flex flex-col gap-1 w-full xl:flex-1">
              <label className="text-sm font-medium text-gray-700">
                Masukkan Kondisi
              </label>
              <Input
                placeholder="misalkan: 001,002,003, dst"
                className="w-full min-w-0"
                size="sm"
                value={deptkondisi}
                onChange={(e) => setDeptkondisi(e.target.value)}
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
                placeholder="misalkan: keuangan"
                className="w-full min-w-0"
                size="sm"
                value={katadept}
                onChange={(e) => setKatadept(e.target.value)}
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
                selectedKeys={[deptradio]}
                onSelectionChange={(key) => {
                  let selected = key;
                  if (key && typeof key !== "string" && key.size) {
                    selected = Array.from(key)[0];
                  }
                  if (!selected) {
                    setDeptradio("1");
                    return;
                  }
                  setDeptradio(selected);
                }}
                disallowEmptySelection
              >
                {KementerianOptions.map((opt) => (
                  <SelectItem key={opt.value} textValue={opt.label}>
                    {opt.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>
          {/* Helper text row - only show on extra large screens */}
          <div className="hidden xl:flex xl:flex-row gap-4 w-full">
            {/* Spacer for Kddept */}
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

export default KementerianFilter;
