import React from "react";
import { Button, Input, Select, SelectItem, Tooltip } from "@heroui/react";
import Kddept from "../../../referensi_belanja/referensi_inquiryMod/Kddept";
import { Building, Info } from "lucide-react";

const KementerianFilter = ({ inquiryState, status }) => {
  // Use inquiryState for dept, deptradio, deptkondisi, katadept
  const {
    dept,
    setDept,
    deptradio,
    setDeptradio,
    deptkondisi,
    setDeptkondisi,
    katadept,
    setKatadept,
  } = inquiryState || {};

  // Determine which filter type is currently active (priority order)
  const hasKataFilter = katadept && katadept.trim() !== "";
  const hasKondisiFilter = deptkondisi && deptkondisi.trim() !== "";
  const hasPilihFilter =
    dept && dept !== "XXX" && dept !== "000" && dept !== "XX";

  // Disable other inputs based on active filter
  const isKddeptDisabled = hasKataFilter || hasKondisiFilter;
  const isKondisiDisabled = hasKataFilter || hasPilihFilter;
  const isKataDisabled = hasKondisiFilter || hasPilihFilter;

  const KementerianOptions = [
    { value: "1", label: "Kode" },
    { value: "2", label: "Kode Uraian" },
    { value: "3", label: "Uraian" },
    { value: "4", label: "Jangan Tampilkan" },
  ];

  return (
    <div className="w-full p-3 sm:p-4 rounded-2xl bg-yellow-100 dark:bg-zinc-900 shadow-sm">
      {/* Mobile/Tablet: Stack vertically, Desktop: Row layout */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 w-full">
        {/* Title - Full width on mobile, fixed width on desktop */}
        <h6 className="font-semibold flex items-center gap-2 lg:min-w-[100px] lg:flex-[2]">
          <Building size={18} className="text-primary" />
          Kementerian
        </h6>{" "}
        {/* Form fields container */}
        <div className="flex flex-col lg:flex-[8] gap-3 lg:gap-1 w-full">
          {/* Fields: Stack on mobile/tablet, row on large desktop */}
          <div className="flex flex-col xl:flex xl:flex-row xl:items-end gap-3 xl:gap-4 w-full">
            {" "}
            {/* Kddept */}
            <div className="flex flex-col gap-1 w-full xl:flex-1 min-w-0 max-w-full overflow-hidden">
              <div className="flex items-center justify-between">
                <label
                  className={`text-sm font-medium ${
                    isKddeptDisabled ? "text-gray-400" : "text-gray-700"
                  }`}
                >
                  Pilih Kementerian
                </label>
                {hasPilihFilter && !isKddeptDisabled && (
                  <Button
                    size="sm"
                    variant="light"
                    color="warning"
                    className="h-6 px-2 text-xs"
                    onPress={() => setDept && setDept("000")}
                  >
                    Clear
                  </Button>
                )}
              </div>
              <Kddept
                value={dept}
                onChange={setDept}
                className="w-full min-w-0 max-w-full"
                size="sm"
                status={status}
                isDisabled={isKddeptDisabled}
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
                    onPress={() => setDeptkondisi && setDeptkondisi("")}
                  >
                    Clear
                  </Button>
                )}
              </div>

              <Input
                placeholder="misalkan: 001,002,003, dst"
                className="w-full min-w-0"
                size="sm"
                value={deptkondisi || ""}
                isDisabled={isKondisiDisabled}
                onChange={(e) => {
                  const value = e.target.value;
                  setDeptkondisi && setDeptkondisi(value);
                }}
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
                    onPress={() => setKatadept && setKatadept("")}
                  >
                    Clear
                  </Button>
                )}
              </div>
              <Input
                placeholder="misalkan: keuangan"
                className="w-full min-w-0"
                size="sm"
                value={katadept || ""}
                isDisabled={isKataDisabled}
                onChange={(e) => {
                  const value = e.target.value;
                  setKatadept && setKatadept(value);
                }}
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
                selectedKeys={[deptradio || "1"]}
                onSelectionChange={(key) => {
                  let selected = key;
                  if (key && typeof key !== "string" && key.size) {
                    selected = Array.from(key)[0];
                  }
                  if (!selected) {
                    setDeptradio && setDeptradio("1");
                    return;
                  }
                  setDeptradio && setDeptradio(selected);
                }}
                disallowEmptySelection
              >
                {KementerianOptions.map((opt) => (
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

export default KementerianFilter;
