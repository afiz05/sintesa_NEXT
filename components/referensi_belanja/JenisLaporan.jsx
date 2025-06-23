import React, { useState, useEffect } from "react";
import { Select, SelectItem, Checkbox } from "@heroui/react";
import "./style.css";

const JenisLaporan = ({ akumulatifopt, onChange, value = "2" }) => {
  const jenisLap = [
    { value: "1", label: "Pagu APBN" },
    { value: "2", label: "Pagu Realisasi" },
    { value: "3", label: "Pagu Realisasi Bulanan" },
    { value: "4", label: "Pergerakan Pagu Bulanan" },
    { value: "5", label: "Pergerakan Blokir Bulanan" },
    { value: "7", label: "Pergerakan Blokir Bulanan per Jenis" },
    { value: "6", label: "Volume Output Kegiatan (PN) - Data Caput" },
  ];

  const [selectedValue, setSelectedValue] = useState(value);
  const [akumulatif, setAkumulatif] = useState(false);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  useEffect(() => {
    // console.log("Akumulatif Option:", akumulatifopt);
  }, [akumulatifopt]);

  const handleJenisLaporanChange = (value) => {
    setSelectedValue(value);
    onChange({ selectedValue: value, akumulatif });
  };

  const handleAkumulatifChange = (checked) => {
    setAkumulatif(checked);
    onChange({ selectedValue, akumulatif: checked });
  };

  const getSelectedLabel = () => {
    const selected = jenisLap.find((item) => item.value === selectedValue);
    return selected ? selected.label : "Pilih Jenis Laporan";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          Jenis Laporan
        </label>
      </div>

      <div className="space-y-3">
        <Select
          label="Pilih Jenis Laporan"
          placeholder="Pilih jenis laporan yang diinginkan"
          selectedKeys={selectedValue ? [selectedValue] : []}
          onSelectionChange={(keys) => {
            const value = Array.from(keys)[0];
            handleJenisLaporanChange(value);
          }}
          className="w-full"
          classNames={{
            trigger:
              "bg-white dark:bg-slate-700 border border-emerald-200 dark:border-emerald-600 hover:border-emerald-300 dark:hover:border-emerald-500",
            value: "text-slate-700 dark:text-slate-300",
            popoverContent:
              "bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-600",
          }}
        >
          {jenisLap.map((jenis) => (
            <SelectItem key={jenis.value} value={jenis.value}>
              {jenis.label}
            </SelectItem>
          ))}
        </Select>

        {/* Checkbox Akumulatif untuk Pagu Realisasi Bulanan */}
        {selectedValue === "3" && (
          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-3 border border-emerald-200 dark:border-emerald-600">
            <Checkbox
              isSelected={akumulatif}
              onValueChange={handleAkumulatifChange}
              size="sm"
              classNames={{
                base: "inline-flex max-w-md w-full bg-content1 m-0 hover:bg-content2 items-center justify-start cursor-pointer rounded-lg gap-2 p-2 border-2 border-transparent data-[selected=true]:border-emerald-500",
                label: "text-sm font-medium text-slate-700 dark:text-slate-300",
              }}
            >
              Tampilkan data akumulatif (kumulatif dari awal tahun)
            </Checkbox>
          </div>
        )}
      </div>
    </div>
  );
};

export default JenisLaporan;
