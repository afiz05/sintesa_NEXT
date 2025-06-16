// Contoh penggunaan komponen filter Kanwil tanpa Context
// File: example-usage.tsx

import React, { useState } from "react";
import { Kanwil } from "@/components/referensi/Kanwil";
import { GetDipa } from "@/components/home/dataDipa/getDipa";
import { GetBelanjaTerbesar } from "@/components/home/dataDipa/getBelanjaTerbesar";
import { GetPerformaTerbesar } from "@/components/home/dataDipa/getPerformaTerbesar";

const ExampleDashboard = () => {
  // State untuk menyimpan kanwil yang dipilih
  const [selectedKanwil, setSelectedKanwil] = useState<string>("00");

  // Handler untuk menangani perubahan kanwil
  const handleKanwilChange = (kanwilValue: string) => {
    console.log("Kanwil berubah ke:", kanwilValue);
    setSelectedKanwil(kanwilValue);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard APBN</h1>

      {/* Filter Section */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Filter Kanwil:</label>
        <Kanwil
          onKanwilChange={handleKanwilChange}
          selectedKanwil={selectedKanwil}
        />
        <p className="text-xs text-gray-500 mt-1">
          Saat ini dipilih:{" "}
          {selectedKanwil === "00"
            ? "Semua Kanwil"
            : `Kanwil ${selectedKanwil}`}
        </p>
      </div>

      {/* Data Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* DIPA Summary */}
        <div className="lg:col-span-3">
          <h2 className="text-lg font-semibold mb-3">Ringkasan DIPA</h2>
          <GetDipa selectedKanwil={selectedKanwil} />
        </div>

        {/* Belanja Terbesar */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Belanja Terbesar</h2>
          <GetBelanjaTerbesar selectedKanwil={selectedKanwil} />
        </div>

        {/* Performa Terbesar */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Performa Terbesar</h2>
          <GetPerformaTerbesar selectedKanwil={selectedKanwil} />
        </div>
      </div>
    </div>
  );
};

export default ExampleDashboard;

/* 
CATATAN IMPLEMENTASI:

1. State Management:
   - selectedKanwil: menyimpan kode kanwil yang dipilih
   - handleKanwilChange: fungsi untuk mengupdate state

2. Props Flow:
   - Kanwil receives: onKanwilChange, selectedKanwil
   - Data components receive: selectedKanwil

3. Automatic Updates:
   - Ketika user mengubah kanwil di dropdown
   - Semua komponen data akan otomatis re-fetch dengan filter baru
   - Tidak ada dependency pada Context global

4. Nilai Khusus:
   - "00" = Semua Kanwil (tidak ada filter)
   - Kode lain = Filter berdasarkan kanwil tertentu
*/
