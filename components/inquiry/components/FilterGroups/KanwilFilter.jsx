import React from "react";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { Landmark } from "lucide-react";
import Kdkanwil from "../../../referensi_belanja/referensi_inquiryMod/Kdkanwil";

const KanwilFilter = ({ inquiryState, status }) => {
  // Use inquiryState for kanwil, kanwilradio, kanwilkondisi, katakanwil
  const {
    kanwil,
    setKanwil,
    prov, // Province selection for filtering kanwil
    kanwilradio,
    setKanwilradio,
    kanwilkondisi,
    setKanwilkondisi,
    katakanwil,
    setKatakanwil,
  } = inquiryState;

  // Determine which filter type is currently active (priority order)
  const hasKataFilter = katakanwil && katakanwil.trim() !== "";
  const hasKondisiFilter = kanwilkondisi && kanwilkondisi.trim() !== "";
  const hasPilihFilter =
    kanwil && kanwil !== "XXX" && kanwil !== "XX" && kanwil !== "XX";

  // Disable other inputs based on active filter
  const isPilihDisabled = hasKataFilter || hasKondisiFilter;
  const isKondisiDisabled = hasKataFilter || hasPilihFilter;
  const isKataDisabled = hasKondisiFilter || hasPilihFilter;

  // When the province changes, reset the selected kanwil to "Semua Kanwil"
  React.useEffect(() => {
    if (setKanwil) {
      setKanwil("XX");
    }
  }, [prov, setKanwil]);

  const KanwilOptions = [
    { value: "1", label: "Kode" },
    { value: "2", label: "Kode Uraian" },
    { value: "3", label: "Uraian" },
    { value: "4", label: "Jangan Tampilkan" },
  ];

  return (
    <div className="w-full p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-sky-100 to-blue-100 shadow-sm">
      {/* Mobile/Tablet: Stack vertically, Desktop: Row layout */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 w-full">
        {/* Title - Full width on mobile, fixed width on desktop */}
        <h6 className="font-semibold flex items-center gap-2 lg:min-w-[100px] lg:flex-[2]">
          <Landmark size={18} className="text-primary" />
          Kanwil
        </h6>
        {/* Form fields container */}
        <div className="flex flex-col lg:flex-[8] gap-3 lg:gap-1 w-full">
          {/* Fields: Stack on mobile/tablet, row on large desktop */}
          <div className="flex flex-col xl:flex xl:flex-row xl:items-end gap-3 xl:gap-4 w-full">
            {/* Kdkanwil */}
            <div className="flex flex-col gap-1 w-full xl:flex-1 min-w-0 max-w-full overflow-hidden">
              <div className="flex items-center justify-between">
                <label
                  className={`text-sm font-medium ${
                    isPilihDisabled ? "text-gray-400" : "text-gray-700"
                  }`}
                >
                  Pilih Kanwil
                </label>
                {hasPilihFilter && !isPilihDisabled && (
                  <Button
                    size="sm"
                    variant="light"
                    color="warning"
                    className="h-6 px-2 text-xs"
                    onPress={() => setKanwil && setKanwil("XX")}
                  >
                    Clear
                  </Button>
                )}
              </div>
              <Kdkanwil
                value={kanwil}
                onChange={setKanwil}
                kdlokasi={prov} // Pass province selection for filtering
                className="w-full min-w-0 max-w-full"
                size="sm"
                status="pilihkanwil"
                isDisabled={isPilihDisabled}
              />
            </div>
            {/* Kondisi */}
            <div className="flex flex-col gap-1 w-full xl:flex-1">
              <div className="flex items-center justify-between">
                <label
                  className={`text-sm font-medium ${
                    isKondisiDisabled ? "text-gray-400" : "text-gray-700"
                  }`}
                >
                  Masukkan Kondisi
                </label>
                {hasKondisiFilter && !isKondisiDisabled && (
                  <Button
                    size="sm"
                    variant="light"
                    color="warning"
                    className="h-6 px-2 text-xs"
                    onPress={() => setKanwilkondisi && setKanwilkondisi("")}
                  >
                    Clear
                  </Button>
                )}
              </div>
              <Input
                placeholder="misalkan: 001,002,003, dst"
                className="w-full min-w-0"
                size="sm"
                value={kanwilkondisi || ""}
                isDisabled={isKondisiDisabled}
                onChange={(e) =>
                  setKanwilkondisi && setKanwilkondisi(e.target.value)
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
                    onPress={() => setKatakanwil && setKatakanwil("")}
                  >
                    Clear
                  </Button>
                )}
              </div>
              <Input
                placeholder="misalkan: jakarta"
                className="w-full min-w-0"
                size="sm"
                value={katakanwil || ""}
                isDisabled={isKataDisabled}
                onChange={(e) => setKatakanwil && setKatakanwil(e.target.value)}
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
                selectedKeys={
                  kanwilradio ? new Set([kanwilradio]) : new Set(["1"])
                }
                onSelectionChange={(key) => {
                  let selected = key;
                  if (key && typeof key !== "string" && key.size) {
                    selected = Array.from(key)[0];
                  }
                  if (!selected) {
                    setKanwilradio && setKanwilradio("1");
                    return;
                  }
                  setKanwilradio && setKanwilradio(selected);
                }}
                disallowEmptySelection
              >
                {KanwilOptions.map((opt) => (
                  <SelectItem key={opt.value} textValue={opt.label}>
                    {opt.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>
          {/* Helper text row - only show on extra large screens */}
          <div className="hidden xl:flex xl:flex-row gap-4 w-full">
            {/* Spacer for Kdkanwil */}
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

export default KanwilFilter;
