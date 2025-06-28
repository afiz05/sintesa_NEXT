import React from "react";
import {Button, Input, Select, SelectItem} from "@heroui/react";
import Kdsfungsi from "../../../referensi_belanja/referensi_inquiryMod/Kdsfungsi";
import { Layers } from "lucide-react";

const SubfungsiFilter = ({ inquiryState }) => {
  const {
    fungsi,
    sfungsi,
    setSfungsi,
    subfungsiradio,
    setSubfungsiradio,
    subfungsikondisi,
    setSubfungsikondisi,
    katasubfungsi,
    setKatasubfungsi,
  } = inquiryState;

  // Determine which filter type is currently active (priority order)
  const hasKataFilter = katasubfungsi && katasubfungsi.trim() !== "";
  const hasKondisiFilter = subfungsikondisi && subfungsikondisi.trim() !== "";
  const hasPilihFilter = sfungsi && sfungsi !== "XXX" && sfungsi !== "XX" && sfungsi !== "00";

  // Disable other inputs based on active filter
  const isPilihDisabled = hasKataFilter || hasKondisiFilter;
  const isKondisiDisabled = hasKataFilter || hasPilihFilter;
  const isKataDisabled = hasKondisiFilter || hasPilihFilter;;

  const SubfungsiOptions = [
    { value: "1", label: "Kode" },
    { value: "2", label: "Kode Uraian" },
    { value: "3", label: "Uraian" },
    { value: "4", label: "Jangan Tampilkan" },
  ];

  return (
    <div className="w-full p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-indigo-100 to-purple-100 shadow-sm">
      {/* Mobile/Tablet: Stack vertically, Desktop: Row layout */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 w-full">
        {/* Title - Full width on mobile, fixed width on desktop */}
        <h6 className="font-semibold flex items-center gap-2 lg:min-w-[100px] lg:flex-[2]">
          <Layers size={18} className="text-primary" />
          Sub-Fungsi
        </h6>{" "}
        {/* Form fields container */}
        <div className="flex flex-col lg:flex-[8] gap-3 lg:gap-1 w-full">
          {/* Fields: Stack on mobile/tablet, row on large desktop */}
          <div className="flex flex-col xl:flex xl:flex-row xl:items-end gap-3 xl:gap-4 w-full">
            {" "}
            {/* Kdsfungsi */}
            <div className="flex flex-col gap-1 w-full xl:flex-1 min-w-0 max-w-full overflow-hidden">
              <label className="text-sm font-medium text-gray-700">
                Pilih Sub-Fungsi
              </label>{" "}
              <Kdsfungsi
                kdsfungsi={sfungsi}
                onChange={setSfungsi}
                kdfungsi={fungsi}
                className="w-full min-w-0 max-w-full"
                size="sm"
                status="pilihsubfungsi"
              />
            </div>
            {/* Kondisi */}
            <div className="flex flex-col gap-1 w-full xl:flex-1">
              <label className="text-sm font-medium text-gray-700">
                Kondisi Sub-Fungsi
              </label>{" "}
              <Input
                type="text"
                placeholder="Masukkan kode sub-fungsi (contoh: 01.01,01.02 atau !01.03)"
                value={subfungsikondisi}
                onChange={(e) => setSubfungsikondisi(e.target.value)}
                className="w-full"
                size="sm"
              />
            </div>
            {/* Kata */}
            <div className="flex flex-col gap-1 w-full xl:flex-1">
              <label className="text-sm font-medium text-gray-700">
                Kata Kunci
              </label>{" "}
              <Input
                type="text"
                placeholder="Cari nama sub-fungsi..."
                value={katasubfungsi}
                onChange={(e) => setKatasubfungsi(e.target.value)}
                className="w-full"
                size="sm"
              />
            </div>
            {/* Jenis Tampilan */}
            <div className="flex flex-col gap-1 w-full xl:flex-1">
              <label className="text-sm font-medium text-gray-700">
                Jenis Tampilan
              </label>{" "}
              <Select
                aria-label="Pilih tampilan"
                className="w-full min-w-0"
                size="sm"
                selectedKeys={new Set([subfungsiradio])}
                onSelectionChange={(keys) => {
                  // HeroUI Select passes a Set object
                  const selected = Array.from(keys)[0];
                  if (selected) {
                    setSubfungsiradio(selected);
                  }
                }}
                disallowEmptySelection
              >
                {SubfungsiOptions.map((opt) => (
                  <SelectItem key={opt.value} textValue={opt.label}>
                    {opt.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>

          {/* Helper text row - only show on extra large screens */}
          <div className="hidden xl:flex xl:flex-row gap-4 w-full">
            {/* Spacer for Kdsfungsi */}
            <div className="flex-1"></div>
            {/* Helper text under Kondisi */}
            <div className="flex-1">
              <p className="text-xs text-gray-500">
                Pisahkan dengan koma untuk multiple. Gunakan ! untuk exclude.
              </p>
            </div>
            {/* Helper text under Kata */}
            <div className="flex-1">
              <p className="text-xs text-gray-500">
                Cari berdasarkan nama sub-fungsi
              </p>
            </div>
            {/* Spacer for Jenis Tampilan */}
            <div className="flex-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubfungsiFilter;
