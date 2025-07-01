import React, { useState, useEffect } from "react";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { Target } from "lucide-react";
import Kdoutput from "../../../referensi_belanja/referensi_inquiryMod/Kdoutput";
import Kdsoutput from "../../../referensi_belanja/referensi_inquiryMod/Kdsoutput";
import { getFilteredOutputs } from "../../utils/filterUtils";

const OutputFilter = ({ inquiryState, type = "output" }) => {
  // Get different states based on type (output vs suboutput)
  const getFilterStates = () => {
    if (type === "suboutput") {
      return {
        value: inquiryState?.soutput,
        setValue: inquiryState?.setsOutput,
        kondisi: inquiryState?.soutputkondisi,
        setKondisi: inquiryState?.setSoutputkondisi,
        kata: inquiryState?.katasoutput,
        setKata: inquiryState?.setKatasoutput,
        radio: inquiryState?.soutputradio,
        setRadio: inquiryState?.setsOutputradio,
        filterProps: {
          kdgiat: inquiryState?.giat,
          kdoutput: inquiryState?.output,
        },
        title: "Sub-output",
        label: "Pilih Sub-output",
        Component: Kdsoutput,
      };
    } else {
      return {
        value: inquiryState?.output,
        setValue: inquiryState?.setOutput,
        kondisi: inquiryState?.outputkondisi,
        setKondisi: inquiryState?.setOutputkondisi,
        kata: inquiryState?.kataoutput,
        setKata: inquiryState?.setKataoutput,
        radio: inquiryState?.outputradio,
        setRadio: inquiryState?.setOutputradio,
        filterProps: {
          kddept: inquiryState?.dept,
          kdunit: inquiryState?.kdunit,
          kdprogram: inquiryState?.program,
          kdgiat: inquiryState?.giat,
        },
        title: "Output",
        label: "Pilih Output",
        Component: Kdoutput,
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
    Component,
  } = getFilterStates();

  // State for filtered data - only for output type
  const [filteredData, setFilteredData] = useState([]);

  // Update filtered data when parent filters change (only for output)
  useEffect(() => {
    if (type === "output") {
      const filtered = getFilteredOutputs(
        filterProps.kddept || inquiryState?.dept,
        filterProps.kdunit || inquiryState?.kdunit,
        filterProps.kdprogram || inquiryState?.program,
        filterProps.kdgiat || inquiryState?.giat
      );
      setFilteredData(filtered);
    }
    // For suboutput, no data-driven filtering since there's no child data
  }, [
    type,
    inquiryState?.dept,
    inquiryState?.kdunit,
    inquiryState?.program,
    inquiryState?.giat,
  ]);

  // When parent filters change, reset child selection
  React.useEffect(() => {
    if (setValue) {
      setValue("XX");
    }
  }, [
    filterProps.kddept,
    filterProps.kdunit,
    filterProps.kdprogram,
    filterProps.kdgiat,
    filterProps.kdoutput,
    setValue,
  ]);

  const OutputOptions = [
    { value: "1", label: "Kode" },
    { value: "2", label: "Kode Uraian" },
    { value: "3", label: "Uraian" },
    { value: "4", label: "Jangan Tampilkan" },
  ];

  // Determine which filter type is currently active (priority order)
  const hasKondisiFilter = kondisi && kondisi.trim() !== "";
  const hasKataFilter = kata && kata.trim() !== "";
  const hasPilihFilter = value && value !== "XX" && value !== "XXX";

  // Disable other inputs based on active filter
  const isPilihDisabled = hasKondisiFilter || hasKataFilter;
  const isKondisiDisabled = hasKataFilter || hasPilihFilter;
  const isKataDisabled = hasKondisiFilter || hasPilihFilter;

  return (
    <div className="w-full p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-purple-100 to-pink-100 shadow-sm">
      {/* Mobile/Tablet: Stack vertically, Desktop: Row layout */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 w-full">
        {/* Title - Full width on mobile, fixed width on desktop */}
        <h6 className="font-semibold flex items-center gap-2 lg:min-w-[100px] lg:flex-[2]">
          <Target size={18} className="text-primary" />
          {title}
        </h6>

        {/* Form fields container */}
        <div className="flex flex-col lg:flex-[8] gap-3 lg:gap-1 w-full">
          {/* Fields: Stack on mobile/tablet, row on large desktop */}
          <div className="flex flex-col xl:flex xl:flex-row xl:items-end gap-3 xl:gap-4 w-full">
            {/* Output Selection */}
            <div className="flex flex-col gap-1 w-full xl:flex-1 min-w-0 max-w-full overflow-hidden">
              <label className="text-sm font-medium text-gray-700">
                {label}
              </label>
              <Component
                value={value}
                onChange={setValue}
                {...filterProps}
                className="w-full min-w-0 max-w-full"
                size="sm"
                placeholder={label}
                status={type === "suboutput" ? "pilihsoutput" : "pilihoutput"}
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
                    onPress={() => setKondisi && setKondisi("")}
                  >
                    Clear
                  </Button>
                )}
              </div>
              <Input
                placeholder="misalkan: EAA,EAB,EAC, dst"
                className="w-full min-w-0"
                size="sm"
                value={kondisi || ""}
                isDisabled={isKondisiDisabled}
                onChange={(e) => setKondisi && setKondisi(e.target.value)}
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
                    onPress={() => setKata && setKata("")}
                  >
                    Clear
                  </Button>
                )}
              </div>
              <Input
                placeholder="misalkan: layanan"
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
                {OutputOptions.map((opt) => (
                  <SelectItem key={opt.value} textValue={opt.label}>
                    {opt.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>

          {/* Helper text row - only show on extra large screens */}
          <div className="hidden xl:flex xl:flex-row gap-4 w-full">
            {/* Spacer for Output */}
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

export default OutputFilter;
