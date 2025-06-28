import React from "react";
import {Button, Input, Select, SelectItem} from "@heroui/react";
import { MapPin } from "lucide-react";
import Kdlokasi from "../../../referensi_belanja/referensi_inquiryMod/Kdlokasi";

const LokasiFilter = ({ inquiryState }) => {
  // Use inquiryState for prov, locradio, lokasikondisi, katalokasi
  const {
    prov,
    setProv,
    locradio,
    setLocradio,
    lokasikondisi,
    setLokasikondisi,
    katalokasi,
    setKatalokasi,
  } = inquiryState;

  // Determine which filter type is currently active (priority order)
  const hasKataFilter = katalokasi && katalokasi.trim() !== "";
  const hasKondisiFilter = lokasikondisi && lokasikondisi.trim() !== "";
  const hasPilihFilter = prov && prov !== "XXX" && prov !== "XX" && prov !== "XX";

  // Disable other inputs based on active filter
  const isPilihDisabled = hasKataFilter || hasKondisiFilter;
  const isKondisiDisabled = hasKataFilter || hasPilihFilter;
  const isKataDisabled = hasKondisiFilter || hasPilihFilter;

  const LocOptions = [
    { value: "1", label: "Kode" },
    { value: "2", label: "Uraian" },
    { value: "3", label: "Kode Uraian" },
    { value: "4", label: "Jangan Tampilkan" },
  ];

  return (
    <div className="w-full p-4 rounded-2xl bg-gradient-to-r from-sky-100 to-blue-100 shadow-sm">
      {/* Mobile/Tablet: Stack vertically, Desktop: Row layout */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 w-full">
        {/* Title - Full width on mobile, fixed width on desktop */}
        <h6 className="font-semibold flex items-center gap-2 lg:min-w-[100px] lg:flex-[2]">
          <MapPin size={18} className="text-primary" />
          Provinsi
        </h6>
        {/* Form fields container */}
        <div className="flex flex-col lg:flex-[8] gap-3 lg:gap-1 w-full">
          {/* Fields: Stack on mobile/tablet, row on large desktop */}
          <div className="flex flex-col xl:flex xl:flex-row xl:items-end gap-3 xl:gap-4 w-full">
            {/* Kdlokasi */}
            <div className="flex flex-col gap-1 w-full xl:flex-1 min-w-0 max-w-full overflow-hidden">
              <label className="text-sm font-medium text-gray-700">
                Pilih Provinsi
              </label>
              <Kdlokasi
                value={prov}
                onChange={setProv}
                className="w-full min-w-0 max-w-full"
                size="sm"
                status="pilihprov"
              />
            </div>
            {/* Kondisi */}
            <div className="flex flex-col gap-1 w-full xl:flex-1">
              <label className="text-sm font-medium text-gray-700">
                Masukkan Kondisi
              </label>
              <Input
                placeholder="misalkan: 31,32,33, dst"
                className="w-full min-w-0"
                size="sm"
                value={lokasikondisi || ""}
                onChange={(e) =>
                  setLokasikondisi && setLokasikondisi(e.target.value)
                }
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
                placeholder="misalkan: jawa"
                className="w-full min-w-0"
                size="sm"
                value={katalokasi || ""}
                onChange={(e) => setKatalokasi && setKatalokasi(e.target.value)}
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
                selectedKeys={new Set([locradio || "1"])}
                onSelectionChange={(keys) => {
                  // HeroUI Select passes a Set object
                  const selected = Array.from(keys)[0];
                  if (selected && setLocradio) {
                    setLocradio(selected);
                  }
                }}
                disallowEmptySelection
              >
                {LocOptions.map((opt) => (
                  <SelectItem key={opt.value} textValue={opt.label}>
                    {opt.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>
          {/* Helper text row - only show on extra large screens */}
          <div className="hidden xl:flex xl:flex-row gap-4 w-full">
            {/* Spacer for Kdlokasi */}
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

export default LokasiFilter;
