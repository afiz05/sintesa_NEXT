import React from "react";
import { Card, CardBody, Select, SelectItem } from "@heroui/react";

const ReportTypeSelector = ({ inquiryState, onFilterChange }) => {
  // --- DESTRUCTURE STATE FROM INQUIRY STATE ---
  const {
    thang,
    setThang,
    jenlap,
    setJenlap,
    pembulatan,
    setPembulatan,
    akumulatif,
    setAkumulatif,
  } = inquiryState || {};

  // --- FALLBACK STATE FOR BACKWARDS COMPATIBILITY ---
  const [localThang, setLocalThang] = React.useState("2025");
  const [localJenlap, setLocalJenlap] = React.useState("2");
  const [localPembulatan, setLocalPembulatan] = React.useState("1");
  const [localAkumulatif, setLocalAkumulatif] = React.useState("0");

  // Use inquiryState values if available, otherwise use local state
  const currentThang =
    thang !== undefined && thang !== null ? thang : localThang;
  const currentJenlap =
    jenlap !== undefined && jenlap !== null ? jenlap : localJenlap;
  const currentPembulatan =
    pembulatan !== undefined && pembulatan !== null
      ? pembulatan
      : localPembulatan;
  const currentAkumulatif =
    akumulatif !== undefined && akumulatif !== null
      ? akumulatif
      : localAkumulatif;

  const currentSetThang = setThang || setLocalThang;
  const currentSetJenlap = setJenlap || setLocalJenlap;
  const currentSetPembulatan = setPembulatan || setLocalPembulatan;
  const currentSetAkumulatif = setAkumulatif || setLocalAkumulatif;

  // Debug akumulatif value changes
  React.useEffect(() => {
    console.log(
      "LaporanSelector - currentAkumulatif changed to:",
      currentAkumulatif
    );
  }, [currentAkumulatif]);

  // This effect reports changes up to the parent component if callback is provided
  React.useEffect(() => {
    if (onFilterChange) {
      onFilterChange({
        thang: currentThang,
        jenlap: currentJenlap,
        pembulatan: currentPembulatan,
        akumulatif: currentAkumulatif,
      });
    }
  }, [
    currentThang,
    currentJenlap,
    currentPembulatan,
    currentAkumulatif,
    onFilterChange,
  ]);

  // --- LOGIC FOR CONDITIONAL "AKUMULATIF" ---
  const isAkumulatifActive = currentJenlap === "3";

  React.useEffect(() => {
    console.log("LaporanSelector - akumulatif useEffect triggered:", {
      currentJenlap,
      isAkumulatifActive,
      currentAkumulatif,
    });

    if (!isAkumulatifActive) {
      // When akumulatif is not active (jenlap !== "3"), set to "0" (Non-Akumulatif)

      currentSetAkumulatif("0");
    } else {
      // When akumulatif becomes active (jenlap === "3"), ensure it has a valid value
      // If currentAkumulatif is empty or undefined, default to "0" (Non-Akumulatif)
      if (
        !currentAkumulatif ||
        (currentAkumulatif !== "0" && currentAkumulatif !== "1")
      ) {
        currentSetAkumulatif("0");
      } else {
      }
    }
  }, [currentJenlap, isAkumulatifActive]); // Remove currentSetAkumulatif from dependencies

  // Available years for selection
  const Tahun = [
    "2025",
    "2024",
    "2023",
    "2022",
    "2021",
    "2020",
    "2019",
    "2018",
    "2017",
    "2016",
  ];

  // Report types (match old form)
  const jenlapOpt = [
    { value: "1", label: "Pagu APBN" },
    { value: "2", label: "Pagu Realisasi" },
    { value: "3", label: "Pagu Realisasi Bulanan" },
    { value: "4", label: "Pergerakan Pagu Bulanan" },
    { value: "5", label: "Pergerakan Blokir Bulanan" },
    { value: "7", label: "Pergerakan Blokir Bulanan per Jenis" },
    { value: "6", label: "Volume Output Kegiatan (PN) - Data Caput" },
  ];

  // Akumulatif options
  const akumulatifOpt = [
    { value: "1", label: "Akumulatif" },
    { value: "0", label: "Non-Akumulatif" },
  ];

  // Rounding options
  const pembulatanOpt = [
    { value: "1", label: "Rupiah" },
    { value: "1000", label: "Ribuan" },
    { value: "1000000", label: "Jutaan" },
    { value: "1000000000", label: "Miliar" },
    { value: "1000000000000", label: "Triliun" },
  ];

  const handleSelectionChange = (setter) => (keys) => {
    const value = Array.from(keys)[0];

    if (setter && value !== undefined) setter(value);
  };

  return (
    <div className="mb-4">
      <div className="w-full p-3 mb-4 sm:p-4 bg-gradient-to-r from-sky-100 to-teal-100 dark:from-zinc-900 dark:to-zinc-900 shadow-none rounded-2xl">
        {/* <h5 className="text-lg font-semibold mb-4">Report Settings</h5> */}

        <div className="flex flex-col md:flex-row gap-6 w-full">
          {/* Year Selection */}
          <div className="flex-1">
            <label id="thang-label" className="block text-sm font-medium mb-2">
              Tahun Anggaran
            </label>
            <Select
              selectedKeys={[currentThang]}
              onSelectionChange={handleSelectionChange(currentSetThang)}
              className="w-full"
              placeholder="Pilih Tahun"
              disallowEmptySelection // Prevent unselecting
              aria-labelledby="thang-label"
              aria-label="Pilih Tahun Anggaran"
            >
              {Tahun.map((year) => (
                <SelectItem key={year} textValue={year}>
                  {year}
                </SelectItem>
              ))}
            </Select>
          </div>

          {/* Report Type Selection */}
          <div className="flex-[1.5]">
            <label id="jenlap-label" className="block text-sm font-medium mb-2">
              Jenis Laporan
            </label>
            <Select
              selectedKeys={[currentJenlap]}
              onSelectionChange={handleSelectionChange(currentSetJenlap)}
              className="w-full"
              placeholder="Pilih Jenis Laporan"
              disallowEmptySelection // Prevent unselecting
              aria-labelledby="jenlap-label"
              aria-label="Pilih Jenis Laporan"
            >
              {jenlapOpt.map((type) => (
                <SelectItem key={type.value} textValue={type.label}>
                  {type.label}
                </SelectItem>
              ))}
            </Select>
          </div>

          {/* Akumulatif Selection */}
          <div className="flex-[0.5] min-w-[120px]">
            <label
              id="akumulatif-label"
              className="block text-sm font-medium mb-2"
            >
              Akumulatif
            </label>
            <Select
              selectedKeys={isAkumulatifActive ? [currentAkumulatif] : []}
              onSelectionChange={handleSelectionChange(currentSetAkumulatif)}
              className="w-full"
              placeholder={isAkumulatifActive ? "Pilih Akumulatif" : "Disabled"}
              isDisabled={!isAkumulatifActive}
              disallowEmptySelection // This is now always true when active
              aria-labelledby="akumulatif-label"
              aria-label="Pilih Akumulatif"
            >
              {akumulatifOpt.map((option) => (
                <SelectItem key={option.value} textValue={option.label}>
                  {option.label}
                </SelectItem>
              ))}
            </Select>
          </div>

          {/* Rounding Options as Dropdown */}
          <div className="flex-1">
            <label
              id="pembulatan-label"
              className="block text-sm font-medium mb-2"
            >
              Pembulatan
            </label>
            <Select
              selectedKeys={[currentPembulatan]}
              onSelectionChange={handleSelectionChange(currentSetPembulatan)}
              className="w-full"
              placeholder="Pilih Pembulatan"
              disallowEmptySelection // Prevent unselecting
              aria-labelledby="pembulatan-label"
              aria-label="Pilih Pembulatan"
            >
              {pembulatanOpt.map((option) => (
                <SelectItem key={option.value} textValue={option.label}>
                  {option.label}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportTypeSelector;
