"use client";
import React from "react";
import { Button, Input, Select, SelectItem, Tooltip } from "@heroui/react";
import { Settings, Info } from "lucide-react";
import Kdakun from "../../../referensi_belanja/referensi_inquiryMod/Kdakun";

const AkunFilter = ({ inquiryState }) => {
  const {
    akun,
    setAkun,
    akunkondisi,
    setAkunkondisi,
    kataakun,
    setKataakun,
    akunradio,
    setAkunradio,
    jenlap,
    jenis,
    kdakun, // <-- get kdakun from inquiryState
    setAkunType, // <-- add this to store type
    setAkunValue, // <-- add this to store processed value
    setAkunSql, // <-- add this to store SQL expr
  } = inquiryState;

  // Disable logic: kondisi disables kata, kata disables kondisi, pilih akun is never disabled
  const hasKondisiFilter = akunkondisi && akunkondisi.trim() !== "";
  const hasKataFilter = kataakun && kataakun.trim() !== "";
  const isKondisiDisabled = hasKataFilter;
  const isKataDisabled = hasKondisiFilter;

  const AkunOptions = [
    { value: "1", label: "Kode" },
    { value: "2", label: "Kode Uraian" },
    { value: "3", label: "Uraian" },
    { value: "4", label: "Jangan Tampilkan" },
  ];

  return (
    <div className="w-full p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-purple-100 to-pink-100 shadow-sm">
      {/* Mobile/Tablet: Stack vertically, Desktop: Row layout */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 w-full">
        {/* Title - Full width on mobile, fixed width on desktop */}
        <h6 className="font-semibold flex items-center gap-2 lg:min-w-[100px] lg:flex-[2]">
          <Settings size={18} className="text-primary" />
          Akun
        </h6>

        {/* Form fields container */}
        <div className="flex flex-col lg:flex-[8] gap-3 lg:gap-1 w-full">
          {/* Fields: Stack on mobile/tablet, row on large desktop */}
          <div className="flex flex-col xl:flex xl:flex-row xl:items-end gap-3 xl:gap-4 w-full">
            {/* Selection Component */}
            <div className="flex flex-col gap-1 w-full xl:flex-1 min-w-0 max-w-full overflow-hidden">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Pilih Akun
                </label>
              </div>
              <Kdakun
                value={akun && akun.type ? akun.type : akun}
                onChange={(obj) => {
                  setAkun(obj); // store the whole object for backward compatibility
                  if (setAkunType) setAkunType(obj.type);
                  if (setAkunValue) setAkunValue(obj.value);
                  if (setAkunSql) setAkunSql(obj.sql);
                }}
                jenlap={jenlap}
                jenis={jenis}
                kdakun={kdakun}
                className="w-full min-w-0 max-w-full"
                size="sm"
                placeholder="Pilih Akun"
                status="pilihakun"
                isDisabled={false}
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
                {hasKondisiFilter && (
                  <Button
                    size="sm"
                    variant="light"
                    color="warning"
                    className="h-6 px-2 text-xs"
                    onPress={() => setAkunkondisi && setAkunkondisi("")}
                  >
                    Clear
                  </Button>
                )}
              </div>
              <Input
                placeholder="misalkan: 001,002,003, dst"
                className="w-full min-w-0"
                size="sm"
                value={akunkondisi || ""}
                isDisabled={isKondisiDisabled}
                onChange={(e) =>
                  setAkunkondisi && setAkunkondisi(e.target.value)
                }
              />
            </div>

            {/* Kata */}
            <div className="flex flex-col gap-1 w-full xl:flex-1">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Mengandung Kata
                </label>
                {hasKataFilter && (
                  <Button
                    size="sm"
                    variant="light"
                    color="warning"
                    className="h-6 px-2 text-xs"
                    onPress={() => setKataakun && setKataakun("")}
                  >
                    Clear
                  </Button>
                )}
              </div>
              <Input
                placeholder="misalkan: gaji"
                className="w-full min-w-0"
                size="sm"
                value={kataakun || ""}
                isDisabled={isKataDisabled}
                onChange={(e) => setKataakun && setKataakun(e.target.value)}
              />
            </div>

            {/* Jenis Tampilan */}
            <div className="flex flex-col gap-1 w-full xl:flex-1">
              <label className="text-sm font-medium text-gray-700">
                Jenis Tampilan
              </label>
              <Select
                selectedKeys={akunradio ? [akunradio] : ["1"]}
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys)[0];
                  if (setAkunradio) {
                    setAkunradio(selected);
                  }
                }}
                disallowEmptySelection
              >
                {AkunOptions.map((opt) => (
                  <SelectItem key={opt.value} textValue={opt.label}>
                    {opt.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>

          {/* Helper text row - only show on extra large screens */}
          <div className="hidden xl:flex xl:flex-row gap-4 w-full">
            {/* Spacer for Selection */}
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

export default AkunFilter;
