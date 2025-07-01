"use client";
import React from "react";
import { Input, Select, SelectItem } from "@heroui/react";
import { Briefcase } from "lucide-react";
import JenisMP from "../../../referensi_belanja/referensi_inquiryMod/JenisMP";

const MajorprFilter = ({ inquiryState }) => {
  const { MP, setMP, mpradio, setMpradio } = inquiryState;

  const MPOptions = [
    { value: "1", label: "Kode" },
    { value: "2", label: "Kode Uraian" },
    { value: "3", label: "Uraian" },
    { value: "4", label: "Jangan Tampilkan" },
  ];

  return (
    <div className="w-full p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-pink-100 to-rose-100 dark:from-zinc-900 dark:to-zinc-900 shadow-sm">
      {/* Mobile/Tablet: Stack vertically, Desktop: Row layout */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 w-full">
        {/* Title - Full width on mobile, fixed width on desktop */}
        <h6 className="font-semibold flex items-center gap-2 lg:min-w-[100px] lg:flex-[2]">
          <Briefcase size={18} className="text-primary" />
          Major Project
        </h6>

        {/* Form fields container */}
        <div className="flex flex-col lg:flex-[8] gap-3 lg:gap-1 w-full">
          {/* Fields: Stack on mobile/tablet, row on large desktop */}
          <div className="flex flex-col xl:flex xl:flex-row xl:items-end gap-3 xl:gap-4 w-full">
            {/* Selection Component */}
            <div className="flex flex-col gap-1 w-full xl:flex-1 min-w-0 max-w-full overflow-hidden">
              <label className="text-sm font-medium text-gray-700">
                Pilih Major Project
              </label>
              <JenisMP
                value={MP}
                onChange={setMP}
                className="w-full min-w-0 max-w-full"
                size="sm"
                placeholder="Pilih Major Project"
              />
            </div>

            {/* Kondisi - Disabled for Major Project */}
            <div className="flex flex-col gap-1 w-full xl:flex-1">
              <label className="text-sm font-medium text-gray-400">
                Masukkan Kondisi
              </label>
              <Input
                placeholder="Tidak tersedia untuk Major Project"
                className="w-full min-w-0"
                size="sm"
                isDisabled
                value=""
              />
            </div>

            {/* Kata - Disabled for Major Project */}
            <div className="flex flex-col gap-1 w-full xl:flex-1">
              <label className="text-sm font-medium text-gray-400">
                Mengandung Kata
              </label>
              <Input
                placeholder="Tidak tersedia untuk Major Project"
                className="w-full min-w-0"
                size="sm"
                isDisabled
                value=""
              />
            </div>

            {/* Jenis Tampilan */}
            <div className="flex flex-col gap-1 w-full xl:flex-1">
              <label className="text-sm font-medium text-gray-700">
                Jenis Tampilan
              </label>
              <Select
                selectedKeys={mpradio ? [mpradio] : ["1"]}
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys)[0];
                  if (setMpradio) {
                    setMpradio(selected);
                  }
                }}
                disallowEmptySelection
                size="sm"
                className="w-full min-w-0"
              >
                {MPOptions.map((opt) => (
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

export default MajorprFilter;
