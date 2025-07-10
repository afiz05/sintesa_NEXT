import React from "react";
import { Button, Input, Select, SelectItem, Tooltip } from "@heroui/react";
import { Package, Info } from "lucide-react";
import Kdkomponen from "../../../referensi_belanja/referensi_inquiryMod/Kdkomponen";

const KomponenFilter = ({ inquiryState }) => {
  const {
    komponen,
    setKomponen,
    komponenkondisi,
    setKomponenkondisi,
    katakomponen,
    setKatakomponen,
    komponenradio,
    setKomponenradio,
    dept,
    kdunit,
    program,
    giat,
    output,
    soutput,
  } = inquiryState || {};

  // When parent filters change, reset child selection
  React.useEffect(() => {
    if (setKomponen) {
      setKomponen("XX");
    }
  }, [dept, kdunit, program, giat, output, soutput, setKomponen]);

  const KomponenOptions = [
    { value: "1", label: "Kode" },
    { value: "2", label: "Kode Uraian" },
    { value: "3", label: "Uraian" },
    { value: "4", label: "Jangan Tampilkan" },
  ];

  // Determine which filter type is currently active (priority order)
  const hasKondisiFilter = komponenkondisi && komponenkondisi.trim() !== "";
  const hasKataFilter = katakomponen && katakomponen.trim() !== "";
  const hasPilihFilter = komponen && komponen !== "XX" && komponen !== "XXX";

  // Disable other inputs based on active filter
  const isPilihDisabled = hasKondisiFilter || hasKataFilter;
  const isKondisiDisabled = hasKataFilter || hasPilihFilter;
  const isKataDisabled = hasKondisiFilter || hasPilihFilter;

  return (
    <div className="p-3 sm:mx-16 rounded-2xl bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-zinc-900 dark:to-zinc-900 shadow-sm">
      {/* Mobile/Tablet: Stack vertically, Desktop: Row layout */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 w-full">
        {/* Title - Full width on mobile, fixed width on desktop */}
        <h6 className="font-semibold flex items-center gap-2 lg:min-w-[100px] lg:flex-[2]">
          <Package size={20} className="ml-4 text-secondary" />
          Komponen
        </h6>

        {/* Form fields container */}
        <div className="flex flex-col lg:flex-[8] gap-3 lg:gap-1 w-full">
          {/* Fields: Stack on mobile/tablet, row on large desktop */}
          <div className="flex flex-col xl:flex xl:flex-row xl:items-end gap-3 xl:gap-4 w-full">
            {/* Kdkomponen */}
            <div className="flex flex-col gap-1 w-full xl:flex-1 min-w-0 max-w-full overflow-hidden">
              <label className="text-sm font-medium text-gray-700">
                Pilih Komponen
              </label>
              <Kdkomponen
                value={komponen}
                onChange={setKomponen}
                kdoutput={output}
                className="w-full min-w-0 max-w-full"
                size="sm"
                placeholder="Pilih Komponen"
                status="pilihkomponen"
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
                    onPress={() => setKomponenkondisi && setKomponenkondisi("")}
                  >
                    Clear
                  </Button>
                )}
              </div>
              <Input
                placeholder="misalkan: 001,002,003, dst"
                className="w-full min-w-0"
                size="sm"
                value={komponenkondisi || ""}
                isDisabled={isKondisiDisabled}
                onChange={(e) =>
                  setKomponenkondisi && setKomponenkondisi(e.target.value)
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
                    onPress={() => setKatakomponen && setKatakomponen("")}
                  >
                    Clear
                  </Button>
                )}
              </div>
              <Input
                placeholder="misalkan: belanja"
                className="w-full min-w-0"
                size="sm"
                value={katakomponen || ""}
                isDisabled={isKataDisabled}
                onChange={(e) =>
                  setKatakomponen && setKatakomponen(e.target.value)
                }
              />
            </div>

            {/* Jenis Tampilan */}
            <div className="flex flex-col gap-1 w-full xl:flex-1">
              <label className="text-sm font-medium text-gray-700">
                Jenis Tampilan
              </label>
              <Select
                selectedKeys={komponenradio ? [komponenradio] : ["1"]}
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys)[0];
                  if (setKomponenradio) {
                    setKomponenradio(selected);
                  }
                }}
                disallowEmptySelection
              >
                {KomponenOptions.map((opt) => (
                  <SelectItem key={opt.value} textValue={opt.label}>
                    {opt.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>

          {/* Helper text row - only show on extra large screens */}
          <div className="hidden xl:flex xl:flex-row gap-4 w-full">
            {/* Spacer for Kdkomponen */}
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

export default KomponenFilter;
