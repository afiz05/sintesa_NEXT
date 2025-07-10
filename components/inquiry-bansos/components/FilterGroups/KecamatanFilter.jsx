import React from "react";
import { Button, Input, Select, SelectItem, Tooltip } from "@heroui/react";
import { MapPin, Info } from "lucide-react";

const KecamatanFilter = ({ inquiryState }) => {
  const {
    kecamatanvalue,
    setKecamatanvalue,
    kecamatankondisi,
    setKecamatankondisi,
    katakecamatan,
    setKatakecamatan,
    kecamatanradio,
    setKecamatanradio,
  } = inquiryState;

  // Determine which filter type is currently active (priority order)
  const hasKataFilter = katakecamatan && katakecamatan.trim() !== "";
  const hasKondisiFilter = kecamatankondisi && kecamatankondisi.trim() !== "";
  const hasPilihFilter =
    kecamatanvalue &&
    kecamatanvalue !== "XXX" &&
    kecamatanvalue !== "XX" &&
    kecamatanvalue !== "XX";

  // Disable other inputs based on active filter
  const isPilihDisabled = hasKataFilter || hasKondisiFilter;
  const isKondisiDisabled = hasKataFilter || hasPilihFilter;
  const isKataDisabled = hasKondisiFilter || hasPilihFilter;

  const KecamatanOptions = [
    { value: "1", label: "Kode" },
    { value: "2", label: "Kode Uraian" },
    { value: "3", label: "Uraian" },
    { value: "4", label: "Jangan Tampilkan" },
  ];

  // Kecamatan selection options
  const KecamatanSelectionOptions = [
    { value: "XX", label: "Semua Kecamatan" },
    { value: "1114012", label: "1114012 - Teunom" },
    { value: "1114022", label: "1114022 - Krueng Sabee" },
  ];

  return (
    <div className="p-3 sm:mx-16 rounded-2xl bg-gradient-to-r from-purple-100 to-fuchsia-100 dark:from-zinc-900 dark:to-zinc-900 shadow-sm">
      {/* Mobile/Tablet: Stack vertically, Desktop: Row layout */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 w-full">
        {/* Title - Full width on mobile, fixed width on desktop */}
        <h6 className="font-semibold flex items-center gap-2 lg:min-w-[100px] lg:flex-[2]">
          <MapPin size={20} className="ml-4 text-secondary" />
          Kecamatan
        </h6>
        {/* Form fields container */}
        <div className="flex flex-col lg:flex-[8] gap-3 lg:gap-1 w-full">
          {/* Fields: Stack on mobile/tablet, row on large desktop */}
          <div className="flex flex-col xl:flex xl:flex-row xl:items-end gap-3 xl:gap-4 w-full">
            {/* Kecamatan Selection */}
            <div className="flex flex-col gap-1 w-full xl:flex-1 min-w-0 max-w-full overflow-hidden">
              <div className="flex items-center justify-between">
                <label
                  className={`text-sm font-medium ${
                    isPilihDisabled ? "text-gray-400" : "text-gray-700"
                  }`}
                >
                  Pilih Kecamatan
                </label>
                {hasPilihFilter && !isPilihDisabled && (
                  <Button
                    size="sm"
                    variant="light"
                    color="warning"
                    className="h-6 px-2 text-xs"
                    onPress={() => setKecamatanvalue && setKecamatanvalue("XX")}
                  >
                    Clear
                  </Button>
                )}
              </div>
              <Select
                aria-label="Pilih Kecamatan"
                className="w-full min-w-0 max-w-full"
                size="sm"
                selectedKeys={new Set([kecamatanvalue || "XX"])}
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys)[0];
                  if (selected && setKecamatanvalue) {
                    setKecamatanvalue(selected);
                  }
                }}
                isDisabled={isPilihDisabled}
                disallowEmptySelection
              >
                {KecamatanSelectionOptions.map((opt) => (
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
                    onPress={() =>
                      setKecamatankondisi && setKecamatankondisi("")
                    }
                  >
                    Clear
                  </Button>
                )}
              </div>
              <Input
                placeholder="misalkan: 1114012,1114022, dst"
                className="w-full min-w-0"
                size="sm"
                value={kecamatankondisi || ""}
                isDisabled={isKondisiDisabled}
                onChange={(e) =>
                  setKecamatankondisi && setKecamatankondisi(e.target.value)
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
                    onPress={() => setKatakecamatan && setKatakecamatan("")}
                  >
                    Clear
                  </Button>
                )}
              </div>
              <Input
                placeholder="misalkan: teunom"
                className="w-full min-w-0"
                size="sm"
                value={katakecamatan || ""}
                isDisabled={isKataDisabled}
                onChange={(e) =>
                  setKatakecamatan && setKatakecamatan(e.target.value)
                }
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
                selectedKeys={new Set([kecamatanradio || "1"])}
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys)[0];
                  if (selected && setKecamatanradio) {
                    setKecamatanradio(selected);
                  }
                }}
                disallowEmptySelection
              >
                {KecamatanOptions.map((opt) => (
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

export default KecamatanFilter;
