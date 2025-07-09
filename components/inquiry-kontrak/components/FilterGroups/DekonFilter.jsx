import React from "react";
import { Button, Input, Select, SelectItem, Tooltip } from "@heroui/react";
import { Landmark, Info } from "lucide-react";
import Kddekon from "../../../referensi_belanja/referensi_inquiryMod/Kddekon";

const DekonFilter = ({ inquiryState }) => {
  // Use inquiryState for dekon, dekonkondisi, katadekon, dekonradio
  const {
    dekon,
    setDekon,
    dekonkondisi,
    setDekonkondisi,
    katadekon,
    setKatadekon,
    dekonradio,
    setDekonradio,
  } = inquiryState;

  // Determine which filter type is currently active (priority order)
  const hasKataFilter = katadekon && katadekon.trim() !== "";
  const hasKondisiFilter = dekonkondisi && dekonkondisi.trim() !== "";
  const hasPilihFilter =
    dekon &&
    dekon !== "XXX" &&
    dekon !== "XX" &&
    dekon !== "000" &&
    dekon.trim() !== "";

  // Disable other inputs based on active filter
  const isKddekonDisabled = hasKataFilter || hasKondisiFilter;
  const isKondisiDisabled = hasKataFilter || hasPilihFilter;
  const isKataDisabled = hasKondisiFilter || hasPilihFilter;
  // 4 display options, matching the other filters
  const DekonOptions = [
    { value: "1", label: "Kode" },
    { value: "2", label: "Kode Uraian" },
    { value: "3", label: "Uraian" },
    { value: "4", label: "Jangan Tampilkan" },
  ];

  return (
    <div className="p-3 sm:mx-16 rounded-2xl bg-gradient-to-r from-sky-100 to-teal-100 dark:from-zinc-900 dark:to-zinc-900 shadow-sm">
      {/* Mobile/Tablet: Stack vertically, Desktop: Row layout */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 w-full">
        {/* Title - Full width on mobile, fixed width on desktop */}
        <h6 className="font-semibold flex items-center gap-2 lg:min-w-[100px] lg:flex-[2]">
          <Landmark size={20} className="ml-4 text-secondary" />
          Kewenangan
        </h6>{" "}
        {/* Form fields container */}
        <div className="flex flex-col lg:flex-[8] gap-3 lg:gap-1 w-full">
          {/* Fields: Stack on mobile/tablet, row on large desktop */}
          <div className="flex flex-col xl:flex xl:flex-row xl:items-end gap-3 xl:gap-4 w-full">
            {/* Kddekon */}
            <div className="flex flex-col gap-1 w-full xl:flex-1 min-w-0 max-w-full overflow-hidden">
              <div className="flex items-center justify-between">
                <label
                  className={`text-sm font-medium ${
                    isKddekonDisabled ? "text-gray-400" : "text-gray-700"
                  }`}
                >
                  Pilih Kewenangan
                </label>

                {hasPilihFilter && !isKddekonDisabled && (
                  <Button
                    size="sm"
                    variant="light"
                    color="warning"
                    className="h-6 px-2 text-xs"
                    onPress={() => setDekon && setDekon("XX")}
                  >
                    Clear
                  </Button>
                )}
              </div>
              <Kddekon
                value={dekon}
                onChange={setDekon}
                className="w-full min-w-0 max-w-full"
                size="sm"
                status="pilihdekon"
                isDisabled={isKddekonDisabled}
              />
            </div>
            {/* Kondisi */}
            <div className="flex flex-col gap-1 w-full xl:flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <label
                    className={`text-sm font-medium ${
                      isKondisiDisabled ? "text-gray-400" : "text-gray-700"
                    }`}
                  >
                    Masukkan Kondisi
                  </label>
                  <Tooltip
                    content="Banyak kode pisahkan dengan koma, gunakan tanda ! di depan untuk exclude"
                    showArrow={true}
                    delay={1000}
                    motionProps={{
                      variants: {
                        exit: {
                          opacity: 0,
                          transition: {
                            duration: 0.1,
                            ease: "easeIn",
                          },
                        },
                        enter: {
                          opacity: 1,
                          transition: {
                            duration: 0.15,
                            ease: "easeOut",
                          },
                        },
                      },
                    }}
                  >
                    <span className="cursor-pointer text-gray-400 hover:text-gray-600">
                      <Info size={15} />
                    </span>
                  </Tooltip>
                </div>
                {hasKondisiFilter && !isKondisiDisabled && (
                  <Button
                    size="sm"
                    variant="light"
                    color="warning"
                    className="h-6 px-2 text-xs"
                    onPress={() => setDekonkondisi && setDekonkondisi("")}
                  >
                    Clear
                  </Button>
                )}
              </div>
              <Input
                placeholder="misalkan: DK,TP,UB, dst"
                className="w-full min-w-0"
                size="sm"
                value={dekonkondisi || ""}
                isDisabled={isKondisiDisabled}
                onChange={(e) =>
                  setDekonkondisi && setDekonkondisi(e.target.value)
                }
              />
            </div>
            {/* Kata */}
            <div className="flex flex-col gap-1 w-full xl:flex-1">
              <div className="flex items-center justify-between">
                <label
                  className={`text-sm font-medium ${
                    isKataDisabled ? "text-gray-400" : "text-gray-700"
                  }`}
                >
                  Mengandung Kata
                </label>
                {hasKataFilter && !isKataDisabled && (
                  <Button
                    size="sm"
                    variant="light"
                    color="warning"
                    className="h-6 px-2 text-xs"
                    onPress={() => setKatadekon && setKatadekon("")}
                  >
                    Clear
                  </Button>
                )}
              </div>
              <Input
                placeholder="misalkan: dekonsentrasi"
                className="w-full min-w-0"
                size="sm"
                value={katadekon || ""}
                isDisabled={isKataDisabled}
                onChange={(e) => setKatadekon && setKatadekon(e.target.value)}
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
                selectedKeys={new Set([dekonradio])}
                onSelectionChange={(keys) => {
                  // HeroUI Select passes a Set object
                  const selected = Array.from(keys)[0];
                  if (selected) {
                    setDekonradio(selected);
                  }
                }}
                disallowEmptySelection
              >
                {DekonOptions.map((opt) => (
                  <SelectItem key={opt.value} textValue={opt.label}>
                    {opt.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>

          {/* Helper text row - only show on extra large screens */}
          <div className="hidden xl:flex xl:flex-row gap-4 w-full">
            {/* Spacer for Kddekon */}
            <div className="flex-1"></div>
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

export default DekonFilter;
