import React, { useState, useEffect } from "react";
import { Button, Input, Select, SelectItem, Tooltip } from "@heroui/react";
import { Settings, Info } from "lucide-react";
import Kdprogram from "../../../referensi_belanja/referensi_inquiryMod/Kdprogram";
import { getFilteredPrograms } from "../../utils/filterUtils";

const ProgramFilter = ({ inquiryState, type = "program" }) => {
  // Get different states based on type (program vs activity)
  const getFilterStates = () => {
    if (type === "activity") {
      return {
        value: inquiryState?.giat,
        setValue: inquiryState?.setGiat,
        kondisi: inquiryState?.giatkondisi,
        setKondisi: inquiryState?.setGiatkondisi,
        kata: inquiryState?.katagiat,
        setKata: inquiryState?.setKatagiat,
        radio: inquiryState?.kegiatanradio,
        setRadio: inquiryState?.setKegiatanradio,
        filterProps: {
          kddept: inquiryState?.dept,
          kdunit: inquiryState?.kdunit,
          kdprogram: inquiryState?.program,
        },
        title: "Kegiatan",
        label: "Pilih Kegiatan",
      };
    } else {
      return {
        value: inquiryState?.program,
        setValue: inquiryState?.setProgram,
        kondisi: inquiryState?.programkondisi,
        setKondisi: inquiryState?.setProgramkondisi,
        kata: inquiryState?.kataprogram,
        setKata: inquiryState?.setKataprogram,
        radio: inquiryState?.programradio,
        setRadio: inquiryState?.setProgramradio,
        filterProps: {
          kddept: inquiryState?.dept,
          kdunit: inquiryState?.kdunit,
        },
        title: "Program",
        label: "Pilih Program",
      };
    }
  };

  const {
    value,
    setValue,
    kondisi,
    setKondisi,
    kata,
    setKata,
    radio,
    setRadio,
    filterProps,
    title,
    label,
  } = getFilterStates();

  // State for filtered data
  const [filteredData, setFilteredData] = useState([]);

  // Update filtered data when parent filters change
  useEffect(() => {
    if (type === "program") {
      const filtered = getFilteredPrograms(
        filterProps.kddept,
        filterProps.kdunit
      );
      setFilteredData(filtered);
    }
  }, [type, filterProps.kddept, filterProps.kdunit]);

  // When parent filters change, reset child selection
  React.useEffect(() => {
    if (setValue) {
      setValue("XX");
    }
  }, [filterProps.kddept, filterProps.kdunit, filterProps.kdprogram, setValue]);

  const ProgramOptions = [
    { value: "1", label: "Kode" },
    { value: "2", label: "Kode Uraian" },
    { value: "3", label: "Uraian" },
    { value: "4", label: "Jangan Tampilkan" },
  ];

  // Determine if any filter is active
  const isFilterActive = () => {
    return (
      (kondisi && kondisi !== "") ||
      (kata && kata !== "") ||
      (radio && radio !== "1") // Assuming "1" is the default for no filter
    );
  };

  // Disable states for each input based on filter logic
  const isPilihDisabled = isFilterActive();
  const isKondisiDisabled = isFilterActive() && !kondisi;
  const isKataDisabled = isFilterActive() && !kata;
  const hasKondisiFilter = kondisi && kondisi !== "";
  const hasKataFilter = kata && kata !== "";

  return (
    <div className="p-3 sm:mx-16 rounded-2xl bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-zinc-900 dark:to-zinc-900 shadow-sm">
      {/* Mobile/Tablet: Stack vertically, Desktop: Row layout */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 w-full">
        {/* Title - Full width on mobile, fixed width on desktop */}
        <h6 className="font-semibold flex items-center gap-2 lg:min-w-[100px] lg:flex-[2]">
          <Settings size={20} className="ml-4 text-secondary" />
          {title}
        </h6>

        {/* Form fields container */}
        <div className="flex flex-col lg:flex-[8] gap-3 lg:gap-1 w-full">
          {/* Fields: Stack on mobile/tablet, row on large desktop */}
          <div className="flex flex-col xl:flex xl:flex-row xl:items-end gap-3 xl:gap-4 w-full">
            {/* Selection Component */}
            <div className="flex flex-col gap-1 w-full xl:flex-1 min-w-0 max-w-full overflow-hidden">
              <label className="text-sm font-medium text-gray-700">
                {label}
              </label>
              <Kdprogram
                value={value}
                onChange={setValue}
                {...filterProps}
                className="w-full min-w-0 max-w-full"
                size="sm"
                placeholder={label}
                status={type === "activity" ? "pilihgiat" : "pilihprogram"}
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
                    onPress={() => setKondisi && setKondisi("")}
                  >
                    Clear
                  </Button>
                )}
              </div>
              <Input
                placeholder="misalkan: 001,002,003, dst"
                className="w-full min-w-0"
                size="sm"
                value={kondisi || ""}
                isDisabled={isKondisiDisabled}
                onChange={(e) => setKondisi && setKondisi(e.target.value)}
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
                    onPress={() => setKata && setKata("")}
                  >
                    Clear
                  </Button>
                )}
              </div>
              <Input
                placeholder="misalkan: pendidikan"
                className="w-full min-w-0"
                size="sm"
                value={kata || ""}
                isDisabled={isKataDisabled}
                onChange={(e) => setKata && setKata(e.target.value)}
              />
            </div>

            {/* Jenis Tampilan */}
            <div className="flex flex-col gap-1 w-full xl:flex-1">
              <label className="text-sm font-medium text-gray-700">
                Jenis Tampilan
              </label>
              <Select
                selectedKeys={radio ? [radio] : ["1"]}
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys)[0];
                  if (setRadio) {
                    setRadio(selected);
                  }
                }}
                disallowEmptySelection
              >
                {ProgramOptions.map((opt) => (
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

export default ProgramFilter;
