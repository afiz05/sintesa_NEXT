import React from "react";
import { Select, SelectItem } from "@heroui/react";
import { Shield } from "lucide-react";

const BlokirFilter = ({ inquiryState }) => {
  const {
    blokir,
    setBlokir,
    dept,
    kdunit,
    program,
    giat,
    output,
    soutput,
    komponen,
    skomponen,
    item,
  } = inquiryState || {};

  // When parent filters change, reset child selection
  React.useEffect(() => {
    if (setBlokir) {
      setBlokir("XX");
    }
  }, [
    dept,
    kdunit,
    program,
    giat,
    output,
    soutput,
    komponen,
    skomponen,
    item,
    setBlokir,
  ]);

  return (
    <div className="p-3 sm:mx-16 rounded-2xl bg-gradient-to-r from-red-100 to-pink-100 shadow-sm">
      {/* Mobile/Tablet: Stack vertically, Desktop: Row layout */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 w-full">
        {/* Title - Full width on mobile, fixed width on desktop */}
        <h6 className="font-semibold flex items-center gap-2 lg:min-w-[100px] lg:flex-[2]">
          <Shield size={20} className="ml-4 text-secondary" />
          Kode Blokir
        </h6>

        {/* Form fields container */}
        <div className="flex flex-col lg:flex-[8] gap-3 lg:gap-1 w-full">
          {/* Only Kdblokir field - no kondisi, kata, or jenis tampilan */}
          <div className="flex flex-col xl:flex xl:flex-row xl:items-end gap-3 xl:gap-4 w-full">
            {/* Kdblokir */}
            <div className="flex flex-col gap-1 w-full xl:flex-1 min-w-0 max-w-full overflow-hidden">
              <label className="text-sm font-medium text-gray-700">
                Pilih Kode Blokir
              </label>
              <Select
                selectedKeys={blokir ? [blokir] : ["XX"]}
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys)[0];
                  setBlokir && setBlokir(selected);
                }}
                placeholder="Pilih Kode Blokir"
                className="w-full min-w-0 max-w-full"
                size="sm"
                disallowEmptySelection
              >
                <SelectItem key="XX" textValue="Semua Blokir">
                  Semua Blokir
                </SelectItem>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlokirFilter;
