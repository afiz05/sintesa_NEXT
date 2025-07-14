import React from "react";
import { Input, Select, SelectItem } from "@heroui/react";
import { Vote } from "lucide-react";
import JenisPemilu from "../../../referensi_belanja/referensi_inquiryMod/JenisPemilu";

const PemiluFilter = ({ inquiryState }) => {
  const { Pemilu, setPemilu, pemiluradio, setPemiluradio } = inquiryState;

  const PemiluOptions = [
    { value: "1", label: "Kode" },
    { value: "2", label: "Kode Uraian" },
    { value: "3", label: "Uraian" },
    { value: "4", label: "Jangan Tampilkan" },
  ];

  return (
    <div className="p-3 sm:mx-16 rounded-2xl bg-gradient-to-r from-pink-100 to-rose-100 dark:from-zinc-900 dark:to-zinc-900 shadow-sm">
      {/* Mobile/Tablet: Stack vertically, Desktop: Row layout */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 w-full">
        {/* Title - Full width on mobile, fixed width on desktop */}
        <h6 className="font-semibold flex items-center gap-2 lg:min-w-[100px] lg:flex-[2]">
          <Vote size={20} className="ml-4 text-secondary" />
          Belanja Pemilu
        </h6>

        {/* Form fields container */}
        <div className="flex flex-col lg:flex-[8] gap-3 lg:gap-1 w-full">
          {/* Fields: Stack on mobile/tablet, row on large desktop */}
          <div className="flex flex-col xl:flex xl:flex-row xl:items-end gap-3 xl:gap-4 w-full">
            {/* Selection Component */}
            <div className="flex flex-col gap-1 w-full xl:flex-1 min-w-0 max-w-full overflow-hidden">
              <label className="text-sm font-medium text-gray-700">
                Pilih Jenis Pemilu
              </label>
              <JenisPemilu
                value={Pemilu}
                onChange={setPemilu}
                className="w-full min-w-0 max-w-full"
                size="sm"
                placeholder="Pilih Jenis Pemilu"
              />
            </div>

            {/* Kondisi - Disabled for Pemilu */}
            <div className="flex flex-col gap-1 w-full xl:flex-1">
              <label className="text-sm font-medium text-gray-400">
                Masukkan Kondisi
              </label>
              <Input
                placeholder="Tidak tersedia untuk Belanja Pemilu"
                className="w-full min-w-0"
                size="sm"
                isDisabled
                value=""
              />
            </div>

            {/* Kata - Disabled for Pemilu */}
            <div className="flex flex-col gap-1 w-full xl:flex-1">
              <label className="text-sm font-medium text-gray-400">
                Mengandung Kata
              </label>
              <Input
                placeholder="Tidak tersedia untuk Belanja Pemilu"
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
                selectedKeys={pemiluradio ? [pemiluradio] : ["1"]}
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys)[0];
                  if (setPemiluradio) {
                    setPemiluradio(selected);
                  }
                }}
                disallowEmptySelection
                size="sm"
                className="w-full min-w-0"
              >
                {PemiluOptions.map((opt) => (
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

export default PemiluFilter;
