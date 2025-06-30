import React from "react";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { Target } from "lucide-react";
import Kdsoutput from "../../../referensi_belanja/referensi_inquiryMod/Kdsoutput";

const SuboutputFilter = ({ inquiryState }) => {
  const {
    soutput,
    setsOutput,
    soutputkondisi,
    setSoutputkondisi,
    katasoutput,
    setKatasoutput,
    soutputradio,
    setsOutputradio,
    giat,
    output,
  } = inquiryState;

  // Determine which filter type is currently active (priority order)
  const hasKataFilter = katasoutput && katasoutput.trim() !== "";
  const hasKondisiFilter = soutputkondisi && soutputkondisi.trim() !== "";
  const hasPilihFilter =
    soutput && soutput !== "XXX" && soutput !== "XX" && soutput !== "XXX";

  // Disable other inputs based on active filter
  const isPilihDisabled = hasKataFilter || hasKondisiFilter;
  const isKondisiDisabled = hasKataFilter || hasPilihFilter;
  const isKataDisabled = hasKondisiFilter || hasPilihFilter;

  // When parent filters change, reset child selection
  React.useEffect(() => {
    if (setsOutput) {
      setsOutput("XX");
    }
  }, [giat, output, setsOutput]);

  const SuboutputOptions = [
    { value: "1", label: "Kode" },
    { value: "2", label: "Kode Uraian" },
    { value: "3", label: "Uraian" },
    { value: "4", label: "Jangan Tampilkan" },
  ];

  return (
    <div className="w-full p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-pink-100 to-rose-100 shadow-sm">
      {/* Mobile/Tablet: Stack vertically, Desktop: Row layout */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 w-full">
        {/* Title - Full width on mobile, fixed width on desktop */}
        <h6 className="font-semibold flex items-center gap-2 lg:min-w-[100px] lg:flex-[2]">
          <Target size={18} className="text-primary" />
          Sub-output
        </h6>

        {/* Form fields container */}
        <div className="flex flex-col lg:flex-[8] gap-3 lg:gap-1 w-full">
          {/* Fields: Stack on mobile/tablet, row on large desktop */}
          <div className="flex flex-col xl:flex xl:flex-row xl:items-end gap-3 xl:gap-4 w-full">
            {/* Kdsoutput */}
            <div className="flex flex-col gap-1 w-full xl:flex-1 min-w-0 max-w-full overflow-hidden">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Pilih Sub-output
                </label>
                {hasPilihFilter && !isPilihDisabled && (
                  <Button
                    size="sm"
                    variant="light"
                    color="warning"
                    className="h-6 px-2 text-xs"
                    onClick={() => setsOutput && setsOutput("")}
                  >
                    Clear
                  </Button>
                )}
              </div>
              <Kdsoutput
                value={soutput}
                onChange={setsOutput}
                kdgiat={giat}
                kdoutput={output}
                className="w-full min-w-0 max-w-full"
                size="sm"
                placeholder="Pilih Sub-output"
                status="pilihsoutput"
                isDisabled={isPilihDisabled}
              />
            </div>

            {/* Kondisi */}
            <div className="flex flex-col gap-1 w-full xl:flex-1">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Masukkan Kondisi
                </label>
                {hasKondisiFilter && !isKondisiDisabled && (
                  <Button
                    size="sm"
                    variant="light"
                    color="warning"
                    className="h-6 px-2 text-xs"
                    onClick={() => setSoutputkondisi && setSoutputkondisi("")}
                  >
                    Clear
                  </Button>
                )}
              </div>
              <Input
                placeholder="misalkan: 001,002,003, dst"
                className="w-full min-w-0"
                size="sm"
                value={soutputkondisi || ""}
                onChange={(e) =>
                  setSoutputkondisi && setSoutputkondisi(e.target.value)
                }
                isDisabled={isKondisiDisabled}
              />
              {/* Helper text - show immediately below on mobile */}
              <p className="text-xs text-gray-500 xl:hidden">
                untuk banyak kode pisahkan dengan koma, gunakan tanda ! di depan
                untuk exclude
              </p>
            </div>

            {/* Kata */}
            <div className="flex flex-col gap-1 w-full xl:flex-1">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Mengandung Kata
                </label>
                {hasKataFilter && !isKataDisabled && (
                  <Button
                    size="sm"
                    variant="light"
                    color="warning"
                    className="h-6 px-2 text-xs"
                    onClick={() => setKatasoutput && setKatasoutput("")}
                  >
                    Clear
                  </Button>
                )}
              </div>
              <Input
                placeholder="misalkan: layanan"
                className="w-full min-w-0"
                size="sm"
                value={katasoutput || ""}
                onChange={(e) =>
                  setKatasoutput && setKatasoutput(e.target.value)
                }
                isDisabled={isKataDisabled}
              />
            </div>

            {/* Jenis Tampilan */}
            <div className="flex flex-col gap-1 w-full xl:flex-1">
              <label className="text-sm font-medium text-gray-700">
                Jenis Tampilan
              </label>
              <Select
                selectedKeys={soutputradio ? [soutputradio] : ["1"]}
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys)[0];
                  if (setsOutputradio) {
                    setsOutputradio(selected);
                  }
                }}
                disallowEmptySelection
              >
                {SuboutputOptions.map((opt) => (
                  <SelectItem key={opt.value} textValue={opt.label}>
                    {opt.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>

          {/* Helper text row - only show on extra large screens */}
          <div className="hidden xl:flex xl:flex-row gap-4 w-full">
            {/* Spacer for Kdsoutput */}
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

export default SuboutputFilter;
