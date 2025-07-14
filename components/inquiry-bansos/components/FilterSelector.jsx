import React from "react";
import FilterSwitch from "./FilterSwitch";

// Import filter group components for inquiry-bansos
import JenisBansosFilter from "./FilterGroups/JenisBansosFilter";
import KementerianFilter from "./FilterGroups/KementerianFilter";
import UnitFilter from "./FilterGroups/UnitFilter";
import DekonFilter from "./FilterGroups/DekonFilter";
import SatkerFilter from "./FilterGroups/SatkerFilter";
import LokasiFilter from "./FilterGroups/LokasiFilter"; // Provinsi
import KabkotaFilter from "./FilterGroups/KabkotaFilter";
import KecamatanFilter from "./FilterGroups/KecamatanFilter";
import DesaFilter from "./FilterGroups/DesaFilter";
import StatusTransaksiFilter from "./FilterGroups/StatusTransaksiFilter";

const FilterSection = ({ inquiryState }) => {
  const {
    // Filter switches for inquiry-bansos
    jenisbansos,
    setJenisbansos,
    kddept,
    setKddept,
    unit,
    setUnit,
    kddekon,
    setKddekon,
    kdsatker,
    setKdsatker,
    provinsi,
    setProvinsi,
    kabkota,
    setKabkota,
    kecamatan,
    setKecamatan,
    desa,
    setDesa,
    statustransaksi,
    setStatustransaksi,
  } = inquiryState;

  return (
    <>
      {/* Filter Options Card - Modern design with gradient and rounded corners */}
      <div className="w-full p-3 mb-4 sm:p-4 bg-gradient-to-r from-purple-100 to-fuchsia-100 dark:from-zinc-900 dark:to-zinc-900 shadow-none rounded-2xl">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-10 gap-2 sm:gap-3">
          <FilterSwitch
            id="jenisbansos-filter"
            checked={jenisbansos}
            onChange={setJenisbansos}
            label="Jenis Bansos"
            disabled={false}
          />
          <FilterSwitch
            id="kddept-filter"
            checked={kddept}
            onChange={setKddept}
            label="Kementerian"
            disabled={false}
          />
          <FilterSwitch
            id="unit-filter"
            checked={unit}
            onChange={setUnit}
            label="Eselon I"
            disabled={false}
          />
          <FilterSwitch
            id="dekon-filter"
            checked={kddekon}
            onChange={setKddekon}
            label="Kewenangan"
            disabled={false}
          />
          <FilterSwitch
            id="kdsatker-filter"
            checked={kdsatker}
            onChange={setKdsatker}
            label="Satker"
            disabled={false}
          />
          <FilterSwitch
            id="provinsi-filter"
            checked={provinsi}
            onChange={setProvinsi}
            label="Provinsi"
            disabled={false}
          />
          <FilterSwitch
            id="kabkota-filter"
            checked={kabkota}
            onChange={setKabkota}
            label="Kabkota"
            disabled={false}
          />
          <FilterSwitch
            id="kecamatan-filter"
            checked={kecamatan}
            onChange={setKecamatan}
            label="Kecamatan"
            disabled={false}
          />
          <FilterSwitch
            id="desa-filter"
            checked={desa}
            onChange={setDesa}
            label="Desa"
            disabled={false}
          />
          <FilterSwitch
            id="statustransaksi-filter"
            checked={statustransaksi}
            onChange={setStatustransaksi}
            label="Status Transaksi"
            disabled={false}
          />
        </div>
      </div>

      {/* Filter Components Row - Modern spacing and styling */}
      <div className="space-y-4 mb-4">
        {jenisbansos && <JenisBansosFilter inquiryState={inquiryState} />}
        {kddept && <KementerianFilter inquiryState={inquiryState} />}
        {unit && <UnitFilter inquiryState={inquiryState} />}
        {kddekon && <DekonFilter inquiryState={inquiryState} />}
        {kdsatker && <SatkerFilter inquiryState={inquiryState} />}
        {provinsi && <LokasiFilter inquiryState={inquiryState} />}
        {kabkota && <KabkotaFilter inquiryState={inquiryState} />}
        {kecamatan && <KecamatanFilter inquiryState={inquiryState} />}
        {desa && <DesaFilter inquiryState={inquiryState} />}
        {statustransaksi && (
          <StatusTransaksiFilter inquiryState={inquiryState} />
        )}
      </div>
    </>
  );
};

export default FilterSection;
