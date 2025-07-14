import React from "react";
import { Button, Input, Select, SelectItem, Tooltip } from "@heroui/react";
import { Package, Info } from "lucide-react";

const JenisBansosFilter = ({ inquiryState }) => {
  const {
    bansostype,
    setBansostype,
    bansoskondisi,
    setBansoskondisi,
    katabansos,
    setKatabansos,
    bansosradio,
    setBansosradio,
  } = inquiryState;

  // Determine which filter type is currently active (priority order)
  const hasKataFilter = katabansos && katabansos.trim() !== "";
  const hasKondisiFilter = bansoskondisi && bansoskondisi.trim() !== "";
  const hasPilihFilter =
    bansostype &&
    bansostype !== "XXX" &&
    bansostype !== "XX" &&
    bansostype !== "XX";

  // Disable other inputs based on active filter
  const isPilihDisabled = hasKataFilter || hasKondisiFilter;
  const isKondisiDisabled = hasKataFilter || hasPilihFilter;
  const isKataDisabled = hasKondisiFilter || hasPilihFilter;

  const BansosOptions = [
    { value: "1", label: "Kode" },
    { value: "2", label: "Kode Uraian" },
    { value: "3", label: "Uraian" },
    { value: "4", label: "Jangan Tampilkan" },
  ];

  // Jenis Bansos selection options
  const JenisBansosOptions = [
    { value: "XX", label: "Semua Jenis Bansos" },
    { value: "01", label: "01 - BNPT" },
    { value: "02", label: "02 - BPUM" },
    { value: "03", label: "03 - Kuota Internet" },
    { value: "04", label: "04 - PKH" },
    { value: "05", label: "05 - POS BST" },
    { value: "06", label: "06 - POS Sembako" },
    { value: "07", label: "07 - Kartu Prakerja" },
    { value: "08", label: "08 - BST Sembako 1" },
    { value: "09", label: "09 - BST Sembako 2" },
    { value: "10", label: "10 - BST Sembako 3" },
    { value: "11", label: "11 - UKT" },
  ];

  return (
    <div className="p-3 sm:mx-16 rounded-2xl bg-gradient-to-r from-purple-100 to-fuchsia-100 dark:from-zinc-900 dark:to-zinc-900 shadow-sm">
      {/* Mobile/Tablet: Stack vertically, Desktop: Row layout */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 w-full">
        {/* Title - Full width on mobile, fixed width on desktop */}
        <h6 className="font-semibold flex items-center gap-2 lg:min-w-[100px] lg:flex-[2]">
          <Package size={20} className="ml-4 text-secondary" />
          Jenis Bansos
        </h6>
        {/* Form fields container */}
        <div className="flex flex-col lg:flex-[8] gap-3 lg:gap-1 w-full">
          {/* Fields: Stack on mobile/tablet, row on large desktop */}
          <div className="flex flex-col xl:flex xl:flex-row xl:items-end gap-3 xl:gap-4 w-full">
            {/* Jenis Bansos Selection */}
            <div className="flex flex-col gap-1 w-full xl:flex-1 min-w-0 max-w-full overflow-hidden">
              <div className="flex items-center justify-between">
                <label
                  className={`text-sm font-medium ${
                    isPilihDisabled ? "text-gray-400" : "text-gray-700"
                  }`}
                >
                  Pilih Jenis Bansos
                </label>
                {hasPilihFilter && !isPilihDisabled && (
                  <Button
                    size="sm"
                    variant="light"
                    color="warning"
                    className="h-6 px-2 text-xs"
                    onPress={() => setBansostype && setBansostype("XX")}
                  >
                    Clear
                  </Button>
                )}
              </div>
              <Select
                aria-label="Pilih Jenis Bansos"
                className="w-full min-w-0 max-w-full"
                size="sm"
                selectedKeys={new Set([bansostype || "XX"])}
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys)[0];
                  if (selected && setBansostype) {
                    setBansostype(selected);
                  }
                }}
                isDisabled={isPilihDisabled}
                disallowEmptySelection
              >
                {JenisBansosOptions.map((opt) => (
                  <SelectItem key={opt.value} textValue={opt.label}>
                    {opt.label}
                  </SelectItem>
                ))}
              </Select>
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
                    onPress={() => setBansoskondisi && setBansoskondisi("")}
                  >
                    Clear
                  </Button>
                )}
              </div>
              <Input
                placeholder="misalkan: 01,02,03, dst"
                className="w-full min-w-0"
                size="sm"
                value={bansoskondisi || ""}
                isDisabled={isKondisiDisabled}
                onChange={(e) =>
                  setBansoskondisi && setBansoskondisi(e.target.value)
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
                    onPress={() => setKatabansos && setKatabansos("")}
                  >
                    Clear
                  </Button>
                )}
              </div>
              <Input
                placeholder="misalkan: BNPT"
                className="w-full min-w-0"
                size="sm"
                value={katabansos || ""}
                isDisabled={isKataDisabled}
                onChange={(e) => setKatabansos && setKatabansos(e.target.value)}
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
                selectedKeys={new Set([bansosradio || "1"])}
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys)[0];
                  if (selected && setBansosradio) {
                    setBansosradio(selected);
                  }
                }}
                disallowEmptySelection
              >
                {BansosOptions.map((opt) => (
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

export default JenisBansosFilter;
