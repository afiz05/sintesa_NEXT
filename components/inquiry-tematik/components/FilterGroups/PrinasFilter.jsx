"use client";
import React from "react";
import { Input, Select, SelectItem } from "@heroui/react";
import { Crown } from "lucide-react";
import KodePN from "../../../referensi_belanja/referensi_inquiryMod/KdPN";

const PrinasFilter = ({ inquiryState }) => {
  const { PN, setPN, pnradio, setPnradio } = inquiryState;

  const PNOptions = [
    { value: "1", label: "Kode" },
    { value: "2", label: "Kode Uraian" },
    { value: "3", label: "Uraian" },
    { value: "4", label: "Jangan Tampilkan" },
  ];

  return (
    <div>
      {/* Mobile/Tablet: Stack vertically, Desktop: Row layout */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 w-full">
        {/* Title - Full width on mobile, fixed width on desktop */}
        <h6 className="font-semibold flex items-center gap-2 lg:min-w-[100px] lg:flex-[2]">
          <Crown size={20} className="ml-4 text-secondary" />
          Prioritas Nasional
        </h6>

        {/* Form fields container */}
        <div className="flex flex-col lg:flex-[8] gap-3 lg:gap-1 w-full">
          {/* Fields: Stack on mobile/tablet, row on large desktop */}
          <div className="flex flex-col xl:flex xl:flex-row xl:items-end gap-3 xl:gap-6 w-full">
            {/* Selection Component - Takes more space */}
            <div className="flex flex-col gap-1 w-full xl:flex-[2] min-w-0 max-w-full overflow-hidden">
              <KodePN
                value={PN}
                onChange={setPN}
                className="w-full min-w-0 max-w-full"
                size="sm"
                placeholder="Pilih Prioritas Nasional"
              />
            </div>
            {/* Jenis Tampilan - Takes remaining space */}
            <div className="flex flex-col gap-1 w-full xl:flex-[1]">
              <Select
                selectedKeys={pnradio ? [pnradio] : ["1"]}
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys)[0];
                  if (setPnradio) {
                    setPnradio(selected);
                  }
                }}
                disallowEmptySelection
                size="sm"
                className="w-full min-w-0"
              >
                {PNOptions.map((opt) => (
                  <SelectItem key={opt.value} textValue={opt.label}>
                    {opt.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrinasFilter;
