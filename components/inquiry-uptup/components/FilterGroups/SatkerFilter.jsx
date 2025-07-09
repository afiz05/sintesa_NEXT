import React from "react";
import { Button, Input, Select, SelectItem, Tooltip } from "@heroui/react";
import { Building2, Info } from "lucide-react";
import Kdsatker from "../../../referensi_belanja/referensi_inquiryMod/Kdsatker";

const SatkerFilter = ({ inquiryState }) => {
  const {
    satker,
    setSatker,
    dept, // Kementerian selection for filtering satker
    kdunit, // Unit selection for filtering satker
    prov, // Province selection for filtering satker
    kppn, // KPPN selection for filtering satker
    satkerkondisi,
    setSatkerkondisi,
    katasatker,
    setKatasatker,
    satkerradio,
    setSatkerradio,
  } = inquiryState;

  // Determine which filter type is currently active (priority order)
  const hasKataFilter = katasatker && katasatker.trim() !== "";
  const hasKondisiFilter = satkerkondisi && satkerkondisi.trim() !== "";
  const hasPilihFilter = satker && satker !== "XXX" && satker !== "XX";

  // Disable other inputs based on active filter
  const isKdsatkerDisabled = hasKataFilter || hasKondisiFilter;
  const isKondisiDisabled = hasKataFilter || hasPilihFilter;
  const isKataDisabled = hasKondisiFilter || hasPilihFilter;

  // When any parent filter changes, reset the selected satker to "Semua Satker"
  React.useEffect(() => {
    if (setSatker) {
      setSatker("XX");
    }
  }, [dept, kdunit, prov, kppn, setSatker]);

  const SatkerOptions = [
    { value: "1", label: "Kode" },
    { value: "2", label: "Kode Uraian" },
    { value: "3", label: "Uraian" },
    { value: "4", label: "Jangan Tampilkan" },
  ];

  return (
    <div className="p-3 sm:mx-16 rounded-2xl bg-gradient-to-r from-green-100 to-emerald-100 dark:from-zinc-900 dark:to-zinc-900 shadow-sm">
      {/* Mobile/Tablet: Stack vertically, Desktop: Row layout */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 w-full">
        {/* Title - Full width on mobile, fixed width on desktop */}
        <h6 className="font-semibold flex items-center gap-2 lg:min-w-[100px] lg:flex-[2]">
          <Building2 size={20} className="text-secondary ml-4" />
          Satker
        </h6>
        {/* Form fields container */}
        <div className="flex flex-col lg:flex-[8] gap-3 lg:gap-1 w-full">
          {/* Fields: Stack on mobile/tablet, row on large desktop */}
          <div className="flex flex-col xl:flex xl:flex-row xl:items-end gap-3 xl:gap-4 w-full">
            {/* Kdsatker */}
            <div className="flex flex-col gap-1 w-full xl:flex-1 min-w-0 max-w-full overflow-hidden">
              <div className="flex items-center justify-between">
                <label
                  className={`text-sm font-medium ${
                    isKdsatkerDisabled ? "text-gray-400" : "text-gray-700"
                  }`}
                >
                  Pilih Satker
                </label>
                {hasPilihFilter && !isKdsatkerDisabled && (
                  <Button
                    size="sm"
                    variant="light"
                    color="warning"
                    className="h-6 px-2 text-xs"
                    onPress={() => setSatker && setSatker("XX")}
                  >
                    Clear
                  </Button>
                )}
              </div>
              <Kdsatker
                value={satker}
                onChange={
                  setSatker || (() => console.warn("setSatker is undefined"))
                }
                kddept={dept}
                kdunit={kdunit}
                kdlokasi={prov}
                kdkppn={kppn}
                className="w-full min-w-0 max-w-full"
                size="sm"
                placeholder="Pilih Satker"
                status="pilihsatker"
                isDisabled={isKdsatkerDisabled}
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
                    onPress={() => setSatkerkondisi && setSatkerkondisi("")}
                  >
                    Clear
                  </Button>
                )}
              </div>
              <Input
                placeholder="misalkan: 647321,647322, dst"
                className="w-full min-w-0"
                size="sm"
                value={satkerkondisi || ""}
                isDisabled={isKondisiDisabled}
                onChange={(e) =>
                  setSatkerkondisi && setSatkerkondisi(e.target.value)
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
                    onPress={() => setKatasatker && setKatasatker("")}
                  >
                    Clear
                  </Button>
                )}
              </div>
              <Input
                placeholder="misalkan: universitas"
                className="w-full min-w-0"
                size="sm"
                value={katasatker || ""}
                isDisabled={isKataDisabled}
                onChange={(e) => setKatasatker && setKatasatker(e.target.value)}
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
                selectedKeys={[satkerradio || "1"]}
                onSelectionChange={(key) => {
                  let selected = key;
                  if (key && typeof key !== "string" && key.size) {
                    selected = Array.from(key)[0];
                  }

                  // Clean up the weird $.X format that HeroUI sometimes uses
                  if (
                    typeof selected === "string" &&
                    selected.startsWith("$.")
                  ) {
                    selected = selected.replace("$.", "");
                  }

                  if (!selected) {
                    setSatkerradio && setSatkerradio("1");
                    return;
                  }

                  if (setSatkerradio) {
                    setSatkerradio(selected);
                  }
                }}
                disallowEmptySelection
              >
                {SatkerOptions.map((opt) => (
                  <SelectItem key={opt.value} textValue={opt.label}>
                    {opt.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>
          {/* Helper text row - only show on extra large screens */}
          <div className="hidden xl:flex xl:flex-row gap-4 w-full">
            {/* Spacer for Kdsatker */}
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

export default SatkerFilter;
