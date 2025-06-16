"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the switch state structure
export interface SwitchState {
  // Column 1
  cutOff: boolean;
  provinsi: boolean;
  satker: boolean;
  kegiatan: boolean;
  sumberDana: boolean;
  kegiatanPrioritas: boolean;
  tematikInflasi: boolean;
  belanjaIkn: boolean;

  // Column 2
  kementerian: boolean;
  kabkota: boolean;
  fungsi: boolean;
  outputKro: boolean;
  register: boolean;
  proyekPrioritas: boolean;
  tematikStunting: boolean;
  belanjaKetahananPangan: boolean;

  // Column 3
  eselonI: boolean;
  kanwil: boolean;
  subFungsi: boolean;
  suboutputRo: boolean;
  prioritasNasional: boolean;
  majorProject: boolean;
  kemiskinanEkstrim: boolean;

  // Column 4
  kewenangan: boolean;
  kppn: boolean;
  program: boolean;
  akun: boolean;
  programPrioritas: boolean;
  tematikAnggaran: boolean;
  belanjaPemilu: boolean;
}

// Define the context interface
interface BelanjaContextType {
  switches: SwitchState;
  setSwitches: React.Dispatch<React.SetStateAction<SwitchState>>;
  handleSwitchChange: (key: keyof SwitchState, value: boolean) => void;
  handleResetAll: () => void;
  activeFiltersCount: number;
  // Header selections
  selectedTahun: string;
  selectedJenisLaporan: string;
  selectedPembulatan: string;
  setSelectedTahun: (value: string) => void;
  setSelectedJenisLaporan: (value: string) => void;
  setSelectedPembulatan: (value: string) => void;
}

// Create the context
const BelanjaContext = createContext<BelanjaContextType | undefined>(undefined);

// Initial switch state
const initialSwitches: SwitchState = {
  // Column 1
  cutOff: false,
  provinsi: false,
  satker: false,
  kegiatan: false,
  sumberDana: false,
  kegiatanPrioritas: false,
  tematikInflasi: false,
  belanjaIkn: false,
  // Column 2
  kementerian: false,
  kabkota: false,
  fungsi: false,
  outputKro: false,
  register: false,
  proyekPrioritas: false,
  tematikStunting: false,
  belanjaKetahananPangan: false,

  // Column 3
  eselonI: false,
  kanwil: false,
  subFungsi: false,
  suboutputRo: false,
  prioritasNasional: false,
  majorProject: false,
  kemiskinanEkstrim: false,

  // Column 4
  kewenangan: false,
  kppn: false,
  program: false,
  akun: false,
  programPrioritas: false,
  tematikAnggaran: false,
  belanjaPemilu: false,
};

// Provider component
export const BelanjaProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [switches, setSwitches] = useState<SwitchState>(initialSwitches);
  const [selectedTahun, setSelectedTahun] = useState<string>("2025");
  const [selectedJenisLaporan, setSelectedJenisLaporan] =
    useState<string>("Pagu Realisasi");
  const [selectedPembulatan, setSelectedPembulatan] =
    useState<string>("Rupiah");

  const handleSwitchChange = (key: keyof SwitchState, value: boolean) => {
    setSwitches((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleResetAll = () => {
    setSwitches(initialSwitches);
  };

  const activeFiltersCount = Object.values(switches).filter(Boolean).length;

  const value: BelanjaContextType = {
    switches,
    setSwitches,
    handleSwitchChange,
    handleResetAll,
    activeFiltersCount,
    selectedTahun,
    selectedJenisLaporan,
    selectedPembulatan,
    setSelectedTahun,
    setSelectedJenisLaporan,
    setSelectedPembulatan,
  };

  return (
    <BelanjaContext.Provider value={value}>{children}</BelanjaContext.Provider>
  );
};

// Custom hook to use the context
export const useBelanja = (): BelanjaContextType => {
  const context = useContext(BelanjaContext);
  if (!context) {
    throw new Error("useBelanja must be used within a BelanjaProvider");
  }
  return context;
};
