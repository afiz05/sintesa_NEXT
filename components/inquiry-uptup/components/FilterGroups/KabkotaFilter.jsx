import React from "react";
import { Button, Input, Select, SelectItem, Tooltip } from "@heroui/react";
import { Map, Info } from "lucide-react";
import Kdkabkota from "../../../referensi_belanja/referensi_inquiryMod/Kdkabkota";

const KabkotaFilter = ({ inquiryState }) => {
  const {
    kabkota,
    setKabkota,
    prov,
    kabkotakondisi,
    setKabkotakondisi,
    katakabkota,
    setKatakabkota,
    kabkotaradio,
    setKabkotaradio,
  } = inquiryState;

  // Determine which filter type is currently active (priority order)
  const hasKataFilter = katakabkota && katakabkota.trim() !== "";
  const hasKondisiFilter = kabkotakondisi && kabkotakondisi.trim() !== "";
  const hasPilihFilter =
    kabkota && kabkota !== "XXX" && kabkota !== "XX" && kabkota !== "XX";

  // Disable other inputs based on active filter
  const isPilihDisabled = hasKataFilter || hasKondisiFilter;
  const isKondisiDisabled = hasKataFilter || hasPilihFilter;
  const isKataDisabled = hasKondisiFilter || hasPilihFilter; // When the province changes, reset the selected kabkota to "Semua Kabupaten/Kota"
  React.useEffect(() => {
    if (setKabkota) {
      setKabkota("XX");
    }
  }, [prov, setKabkota]);

  const KabkotaOptions = [
    { value: "1", label: "Kode" },
    { value: "2", label: "Kode Uraian" },
    { value: "3", label: "Uraian" },
    { value: "4", label: "Jangan Tampilkan" },
  ];
  return (
    <div className="p-3 sm:mx-16 rounded-2xl bg-gradient-to-r from-sky-100 to-teal-100 dark:from-zinc-900 dark:to-zinc-900 shadow-sm">
      {/* Mobile/Tablet: Stack vertically, Desktop: Row layout */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 w-full">
        {/* Title - Full width on mobile, fixed width on desktop */}{" "}
        <h6 className="font-semibold flex items-center gap-2 lg:min-w-[100px] lg:flex-[2]">
          <Map size={20} className="ml-4 text-secondary" />
          Kabupaten/Kota
        </h6>
        {/* Form fields container */}
        <div className="flex flex-col lg:flex-[8] gap-3 lg:gap-1 w-full">
          {/* Fields: Stack on mobile/tablet, row on large desktop */}
          <div className="flex flex-col xl:flex xl:flex-row xl:items-end gap-3 xl:gap-4 w-full">
            {/* Kdkabkota */}
            <div className="flex flex-col gap-1 w-full xl:flex-1 min-w-0 max-w-full overflow-hidden">
              <div className="flex items-center justify-between">
                <label
                  className={`text-sm font-medium ${
                    isPilihDisabled ? "text-gray-400" : "text-gray-700"
                  }`}
                >
                  Pilih Kabupaten/Kota
                </label>
                {hasPilihFilter && !isPilihDisabled && (
                  <Button
                    size="sm"
                    variant="light"
                    color="warning"
                    className="h-6 px-2 text-xs"
                    onPress={() => setKabkota && setKabkota("XX")}
                  >
                    Clear
                  </Button>
                )}
              </div>
              <Kdkabkota
                value={kabkota}
                onChange={
                  setKabkota || (() => console.warn("setKabkota is undefined"))
                }
                kdlokasi={prov}
                className="w-full min-w-0 max-w-full"
                size="sm"
                placeholder="Pilih Kabupaten/Kota"
                status="pilihkdkabkota"
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
                    className="h-6 px-2 text-xs flex-shrink-0"
                    onPress={() => setKabkotakondisi && setKabkotakondisi("")}
                  >
                    Clear
                  </Button>
                )}
              </div>

              <Input
                placeholder="misalkan: 01,02,03, dst"
                className="w-full min-w-0"
                size="sm"
                value={kabkotakondisi || ""}
                isDisabled={isKondisiDisabled}
                onChange={(e) =>
                  setKabkotakondisi && setKabkotakondisi(e.target.value)
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
                    onPress={() => setKatakabkota && setKatakabkota("")}
                  >
                    Clear
                  </Button>
                )}
              </div>
              <Input
                placeholder="misalkan: jakarta"
                className="w-full min-w-0"
                size="sm"
                value={katakabkota || ""}
                isDisabled={isKataDisabled}
                onChange={(e) =>
                  setKatakabkota && setKatakabkota(e.target.value)
                }
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
                selectedKeys={[kabkotaradio || "1"]}
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
                    setKabkotaradio && setKabkotaradio("1");
                    return;
                  }

                  if (setKabkotaradio) {
                    setKabkotaradio(selected);
                  }
                }}
                disallowEmptySelection
              >
                {KabkotaOptions.map((opt) => (
                  <SelectItem key={opt.value} textValue={opt.label}>
                    {opt.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>
          {/* Helper text row - only show on extra large screens */}
          <div className="hidden xl:flex xl:flex-row gap-4 w-full">
            {/* Spacer for Kddept */}
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

export default KabkotaFilter;
