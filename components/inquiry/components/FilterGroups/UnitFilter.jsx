import React from "react";
import { Button, Input, Select, SelectItem, Tooltip } from "@heroui/react";
import { Layers, Info } from "lucide-react";
import Kdunit from "../../../referensi_belanja/referensi_inquiryMod/Kdunit";

const UnitFilter = ({ inquiryState }) => {
  // Use inquiryState for unit values and dept dependency
  const {
    dept, // Get dept to filter unit list
    kdunit: unit, // Use kdunit from shared state
    setKdunit: setUnit,
    unitkondisi,
    setUnitkondisi,
    kataunit,
    setKataunit,
    unitradio,
    setUnitradio,
  } = inquiryState || {};

  // Determine which filter type is currently active (priority order)
  const hasKataFilter = kataunit && kataunit.trim() !== "";
  const hasKondisiFilter = unitkondisi && unitkondisi.trim() !== "";
  const hasPilihFilter = unit && unit !== "XXX" && unit !== "XX";

  // Disable other inputs based on active filter
  const isKdunitDisabled = hasKataFilter || hasKondisiFilter;
  const isKondisiDisabled = hasKataFilter || hasPilihFilter;
  const isKataDisabled = hasKondisiFilter || hasPilihFilter;

  // 4 display options, matching KementerianFilter
  const UnitOptions = [
    { value: "1", label: "Kode" },
    { value: "2", label: "Kode Uraian" },
    { value: "3", label: "Uraian" },
    { value: "4", label: "Jangan Tampilkan" },
  ];

  // When the department changes, reset the selected unit to "Semua Unit"
  React.useEffect(() => {
    if (setUnit) {
      setUnit("XX");
    }
  }, [dept, setUnit]);

  return (
    <div className="w-full p-3 sm:p-4 rounded-2xl bg-red-100 dark:bg-zinc-900 shadow-sm">
      {/* Mobile/Tablet: Stack vertically, Desktop: Row layout */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 w-full">
        {/* Title - Full width on mobile, fixed width on desktop */}
        <h6 className="font-semibold flex items-center gap-2 lg:min-w-[100px] lg:flex-[2]">
          <Layers size={18} className="text-primary" />
          Eselon I
        </h6>

        {/* Form fields container */}
        <div className="flex flex-col lg:flex-[8] gap-3 lg:gap-1 w-full">
          {/* Fields: Stack on mobile/tablet, row on large desktop */}
          <div className="flex flex-col xl:flex xl:flex-row xl:items-end gap-3 xl:gap-4 w-full">
            {/* Kdunit */}
            <div className="flex flex-col gap-1 w-full xl:flex-1 min-w-0 max-w-full overflow-hidden">
              <div className="flex items-center justify-between">
                <label
                  className={`text-sm font-medium ${
                    isKdunitDisabled ? "text-gray-400" : "text-gray-700"
                  }`}
                >
                  Pilih Eselon I
                </label>
                {hasPilihFilter && !isKdunitDisabled && (
                  <Button
                    size="sm"
                    variant="light"
                    color="warning"
                    className="h-6 px-2 text-xs"
                    onPress={() => setUnit && setUnit("XX")}
                  >
                    Clear
                  </Button>
                )}
              </div>
              <Kdunit
                value={unit}
                onChange={setUnit} // The refactored Kdunit passes the value directly
                kddept={dept}
                className="w-full min-w-0 max-w-full"
                size="sm"
                status="pilihunit"
                isDisabled={isKdunitDisabled}
              />
            </div>

            {/* Kondisi */}
            <div className="flex flex-col gap-1 w-full xl:flex-1">
              <div className="flex items-center justify-start gap-1">
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
                  <span className="ml-1 cursor-pointer text-gray-400 hover:text-gray-600">
                    <Info size={15} />
                  </span>
                </Tooltip>

                {hasKondisiFilter && !isKondisiDisabled && (
                  <Button
                    size="sm"
                    variant="light"
                    color="warning"
                    className="h-6 px-2 text-xs"
                    onPress={() => setUnitkondisi && setUnitkondisi("")}
                  >
                    Clear
                  </Button>
                )}
              </div>
              <Input
                placeholder="misalkan: 01,02,03, dst"
                className="w-full min-w-0"
                size="sm"
                value={unitkondisi || ""}
                isDisabled={isKondisiDisabled}
                onChange={(e) =>
                  setUnitkondisi && setUnitkondisi(e.target.value)
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
                    onPress={() => setKataunit && setKataunit("")}
                  >
                    Clear
                  </Button>
                )}
              </div>
              <Input
                placeholder="misalkan: sekretariat"
                className="w-full min-w-0"
                size="sm"
                value={kataunit || ""}
                isDisabled={isKataDisabled}
                onChange={(e) => setKataunit && setKataunit(e.target.value)}
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
                selectedKeys={new Set([unitradio || "1"])}
                onSelectionChange={(keys) => {
                  // HeroUI Select passes a Set object
                  const selected = Array.from(keys)[0];
                  if (selected && setUnitradio) {
                    setUnitradio(selected);
                  }
                }}
                disallowEmptySelection
              >
                {UnitOptions.map((opt) => (
                  <SelectItem key={opt.value} textValue={opt.label}>
                    {opt.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>

          {/* Helper text row - only show on extra large screens */}
          <div className="hidden xl:flex xl:flex-row gap-4 w-full">
            {/* Spacer for Kdunit */}
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

export default UnitFilter;
