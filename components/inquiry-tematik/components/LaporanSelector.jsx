import React from "react";
import { Card, CardBody, Select, SelectItem } from "@heroui/react";

const ReportTypeSelector = ({ inquiryState, onFilterChange }) => {
  // --- DESTRUCTURE STATE FROM INQUIRY STATE ---
  const { thang, setThang, jenlap, setJenlap, pembulatan, setPembulatan } =
    inquiryState || {};

  // --- FALLBACK STATE FOR BACKWARDS COMPATIBILITY ---
  const [localThang, setLocalThang] = React.useState("2025");
  const [localJenlap, setLocalJenlap] = React.useState("2");
  const [localPembulatan, setLocalPembulatan] = React.useState("1");

  // Use inquiryState values if available, otherwise use local state
  const currentThang =
    thang !== undefined && thang !== null ? thang : localThang;
  const currentJenlap =
    jenlap !== undefined && jenlap !== null ? jenlap : localJenlap;
  const currentPembulatan =
    pembulatan !== undefined && pembulatan !== null
      ? pembulatan
      : localPembulatan;

  const currentSetThang = setThang || setLocalThang;
  const currentSetJenlap = setJenlap || setLocalJenlap;
  const currentSetPembulatan = setPembulatan || setLocalPembulatan;

  // This effect reports changes up to the parent component if callback is provided
  React.useEffect(() => {
    if (onFilterChange) {
      onFilterChange({
        thang: currentThang,
        jenlap: currentJenlap,
        pembulatan: currentPembulatan,
      });
    }
  }, [currentThang, currentJenlap, currentPembulatan, onFilterChange]);

  // Available years for selection
  const Tahun = ["2025", "2024", "2023"];

  // Report types (match old form)
  const jenlapOpt = [
    { value: "1", label: "Prioritas Nasional" },
    { value: "2", label: "Major Project" },
    { value: "3", label: "Tematik Anggaran" },
    { value: "4", label: "Inflasi" },
    { value: "5", label: "Penanganan Stunting" },
    { value: "6", label: "Kemiskinan Ekstrim" },
    { value: "7", label: "Belanja Pemilu" },
    { value: "8", label: "Ibu Kota Nusantara" },
    { value: "9", label: "Ketahanan Pangan" },
    { value: "10", label: "Bantuan Pemerintah" },
    { value: "11", label: "Makanan Bergizi Gratis" },
    { value: "12", label: "Swasembada Pangan" },
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
    console.log("LaporanSelector - Selection change:", {
      setter: setter.name,
      value,
      keys,
    });
    if (setter && value !== undefined) setter(value);
  };

  return (
    <div className="mb-4">
      <div className="w-full p-3 mb-4 sm:p-4 bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-zinc-900 dark:to-zinc-900 shadow-none rounded-2xl">
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
