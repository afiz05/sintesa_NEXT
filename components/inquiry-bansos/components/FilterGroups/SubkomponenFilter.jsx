import React from "react";
import { Input, Select, SelectItem } from "@heroui/react";
import { Package } from "lucide-react";
import Kdsubkomponen from "../../../referensi_belanja/referensi_inquiryMod/Kdsubkomponen";

const SubkomponenFilter = ({ inquiryState }) => {
  const {
    skomponen,
    setSkomponen,
    skomponenkondisi,
    setSkomponenkondisi,
    kataskomponen,
    setKataskomponen,
    skomponenradio,
    setSkomponenradio,
    dept,
    kdunit,
    program,
    giat,
    output,
    soutput,
    komponen,
  } = inquiryState || {};

  // When parent filters change, reset child selection
  React.useEffect(() => {
    if (setSkomponen) {
      setSkomponen("XX");
    }
  }, [dept, kdunit, program, giat, output, soutput, komponen, setSkomponen]);

  const SubkomponenOptions = [
    { value: "1", label: "Kode" },
    { value: "2", label: "Kode Uraian" },
    { value: "3", label: "Uraian" },
    { value: "4", label: "Jangan Tampilkan" },
  ];

  return (
    <div className="w-full p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-teal-100 to-cyan-100 shadow-sm">
      {/* Mobile/Tablet: Stack vertically, Desktop: Row layout */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 w-full">
        {/* Title - Full width on mobile, fixed width on desktop */}
        <h6 className="font-semibold flex items-center gap-2 lg:min-w-[100px] lg:flex-[2]">
          <Package size={18} className="text-primary" />
          Sub-komponen
        </h6>

        {/* Form fields container */}
        <div className="flex flex-col lg:flex-[8] gap-3 lg:gap-1 w-full">
          {/* Fields: Stack on mobile/tablet, row on large desktop */}
          <div className="flex flex-col xl:flex xl:flex-row xl:items-end gap-3 xl:gap-4 w-full">
            {/* Kdsubkomponen */}
            <div className="flex flex-col gap-1 w-full xl:flex-1 min-w-0 max-w-full overflow-hidden">
              <label className="text-sm font-medium text-gray-700">
                Pilih Sub-komponen
              </label>
              <Kdsubkomponen
                value={skomponen}
                onChange={setSkomponen}
                kdkomponen={komponen}
                className="w-full min-w-0 max-w-full"
                size="sm"
                placeholder="Pilih Sub-komponen"
                status="pilihsubkomponen"
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
                value={skomponenkondisi || ""}
                onChange={(e) =>
                  setSkomponenkondisi && setSkomponenkondisi(e.target.value)
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
                placeholder="misalkan: belanja"
                className="w-full min-w-0"
                size="sm"
                value={kataskomponen || ""}
                onChange={(e) =>
                  setKataskomponen && setKataskomponen(e.target.value)
                }
              />
            </div>

            {/* Jenis Tampilan */}
            <div className="flex flex-col gap-1 w-full xl:flex-1">
              <label className="text-sm font-medium text-gray-700">
                Jenis Tampilan
              </label>
              <Select
                selectedKeys={skomponenradio ? [skomponenradio] : ["1"]}
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys)[0];
                  if (setSkomponenradio) {
                    setSkomponenradio(selected);
                  }
                }}
                disallowEmptySelection
              >
                {SubkomponenOptions.map((opt) => (
                  <SelectItem key={opt.value} textValue={opt.label}>
                    {opt.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>

          {/* Helper text row - only show on extra large screens */}
          <div className="hidden xl:flex xl:flex-row gap-4 w-full">
            {/* Spacer for Kdsubkomponen */}
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

export default SubkomponenFilter;
