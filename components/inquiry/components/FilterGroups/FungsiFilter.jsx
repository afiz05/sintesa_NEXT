import React from "react";
import { Button, Input, Select, SelectItem, Tooltip } from "@heroui/react";
import Kdfungsi from "../../../referensi_belanja/referensi_inquiryMod/Kdfungsi";
import { BookText, Info } from "lucide-react";

const FungsiFilter = ({ inquiryState }) => {
  const {
    fungsi,
    setFungsi,
    fungsiradio,
    setFungsiradio,
    fungsikondisi,
    setFungsikondisi,
    katafungsi,
    setKatafungsi,
  } = inquiryState;

  // Determine which filter type is currently active (priority order)
  const hasKataFilter = katafungsi && katafungsi.trim() !== "";
  const hasKondisiFilter = fungsikondisi && fungsikondisi.trim() !== "";
  const hasPilihFilter =
    fungsi && fungsi !== "XXX" && fungsi !== "XX" && fungsi !== "00";

  // Disable other inputs based on active filter
  const isPilihDisabled = hasKataFilter || hasKondisiFilter;
  const isKondisiDisabled = hasKataFilter || hasPilihFilter;
  const isKataDisabled = hasKondisiFilter || hasPilihFilter;

  const FungsiOptions = [
    { value: "1", label: "Kode" },
    { value: "2", label: "Kode Uraian" },
    { value: "3", label: "Uraian" },
    { value: "4", label: "Jangan Tampilkan" },
  ];

  return (
    <div className="w-full p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-sky-100 to-teal-100 dark:from-zinc-900 dark:to-zinc-900 shadow-sm">
      {/* Mobile/Tablet: Stack vertically, Desktop: Row layout */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 w-full">
        {/* Title - Full width on mobile, fixed width on desktop */}
        <h6 className="font-semibold flex items-center gap-2 lg:min-w-[100px] lg:flex-[2]">
          <BookText size={18} className="text-primary" />
          Fungsi
        </h6>{" "}
        {/* Form fields container */}
        <div className="flex flex-col lg:flex-[8] gap-3 lg:gap-1 w-full">
          {/* Fields: Stack on mobile/tablet, row on large desktop */}
          <div className="flex flex-col xl:flex xl:flex-row xl:items-end gap-3 xl:gap-4 w-full">
            {" "}
            {/* Kdfungsi */}
            <div className="flex flex-col gap-1 w-full xl:flex-1 min-w-0 max-w-full overflow-hidden">
              <div className="flex items-center justify-between">
                <label
                  className={`text-sm font-medium ${
                    isPilihDisabled ? "text-gray-400" : "text-gray-700"
                  }`}
                >
                  Pilih Fungsi
                </label>
                {hasPilihFilter && !isPilihDisabled && (
                  <Button
                    size="sm"
                    variant="light"
                    color="warning"
                    className="h-6 px-2 text-xs"
                    onPress={() => setFungsi && setFungsi("00")}
                  >
                    Clear
                  </Button>
                )}
              </div>
              <Kdfungsi
                kdfungsi={fungsi}
                onChange={setFungsi}
                className="w-full min-w-0 max-w-full"
                size="sm"
                status="pilihfungsi"
                isDisabled={isPilihDisabled}
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
                    onPress={() => setFungsikondisi && setFungsikondisi("")}
                  >
                    Clear
                  </Button>
                )}
              </div>
              <Input
                type="text"
                placeholder="misalkan: 01,02, dst atau !03"
                value={fungsikondisi}
                onChange={(e) => setFungsikondisi(e.target.value)}
                className="w-full"
                size="sm"
                isDisabled={isKondisiDisabled}
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
                  Kata Kunci
                </label>
                {hasKataFilter && !isKataDisabled && (
                  <Button
                    size="sm"
                    variant="light"
                    color="warning"
                    className="h-6 px-2 text-xs"
                    onPress={() => setKatafungsi && setKatafungsi("")}
                  >
                    Clear
                  </Button>
                )}
              </div>
              <Input
                type="text"
                placeholder="misalkan: ekonomi"
                value={katafungsi}
                onChange={(e) => setKatafungsi(e.target.value)}
                className="w-full"
                size="sm"
                isDisabled={isKataDisabled}
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
                selectedKeys={new Set([fungsiradio])}
                onSelectionChange={(keys) => {
                  // HeroUI Select passes a Set object
                  const selected = Array.from(keys)[0];
                  if (selected) {
                    setFungsiradio(selected);
                  }
                }}
                disallowEmptySelection
              >
                {FungsiOptions.map((opt) => (
                  <SelectItem key={opt.value} textValue={opt.label}>
                    {opt.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>

          {/* Helper text row - only show on extra large screens */}
          <div className="hidden xl:flex xl:flex-row gap-4 w-full">
            {/* Spacer for Kdfungsi */}
            <div className="flex-1"></div>

            {/* Spacer for Jenis Tampilan */}
            <div className="flex-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FungsiFilter;
