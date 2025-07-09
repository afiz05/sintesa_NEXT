import React from "react";
import FilterSwitch from "./FilterSwitch";

// Import only the required filter group components for inquiry-uptup
import KementerianFilter from "./FilterGroups/KementerianFilter";
import UnitFilter from "./FilterGroups/UnitFilter";
import DekonFilter from "./FilterGroups/DekonFilter";
import KanwilFilter from "./FilterGroups/KanwilFilter";
import KppnFilter from "./FilterGroups/KppnFilter";
import SatkerFilter from "./FilterGroups/SatkerFilter";
import AkunFilter from "./FilterGroups/AkunFilter";
import CutoffFilter from "./FilterGroups/CutoffFilter";

const FilterSection = ({ inquiryState }) => {
  const {
    // Only need the required filter switches for inquiry-uptup (8 filters including Cutoff)
    cutoffFilter,
    setCutoffFilter,
    kddept,
    setKddept,
    unit,
    setUnit,
    kddekon,
    setKddekon,
    kdkanwil,
    setKdkanwil,
    kdkppn,
    setKdkppn,
    kdsatker,
    setKdsatker,
    kdakun,
    setKdakun,
  } = inquiryState;

  return (
    <>
      {/* Filter Options Card - Modern design with gradient and rounded corners */}
      <div className="w-full p-3 mb-4 sm:p-4 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-zinc-900 dark:to-zinc-900 shadow-none rounded-2xl">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 2xl:grid-cols-8 gap-2 sm:gap-3">
          <FilterSwitch
            id="cutoff-filter"
            checked={true} // Always checked
            onChange={() => {}} // No-op function since it's disabled
            label="Bulan"
            disabled={true} // Always disabled - user cannot turn off
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
            id="kanwil-filter"
            checked={kdkanwil}
            onChange={setKdkanwil}
            label="Kanwil"
            disabled={false}
          />
          <FilterSwitch
            id="kdkppn-filter"
            checked={kdkppn}
            onChange={setKdkppn}
            label="KPPN"
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
            id="kdakun-filter"
            checked={kdakun}
            onChange={setKdakun}
            label="Akun"
            disabled={false}
          />
        </div>
      </div>

      {/* Filter Components Row - Modern spacing and styling */}
      <div className="space-y-4 mb-4">
        <CutoffFilter inquiryState={inquiryState} />
        {kddept && <KementerianFilter inquiryState={inquiryState} />}
        {unit && <UnitFilter inquiryState={inquiryState} />}
        {kddekon && <DekonFilter inquiryState={inquiryState} />}
        {kdkanwil && <KanwilFilter inquiryState={inquiryState} />}
        {kdkppn && <KppnFilter inquiryState={inquiryState} />}
        {kdsatker && <SatkerFilter inquiryState={inquiryState} />}
        {kdakun && <AkunFilter inquiryState={inquiryState} />}
      </div>
    </>
  );
};

export default FilterSection;
