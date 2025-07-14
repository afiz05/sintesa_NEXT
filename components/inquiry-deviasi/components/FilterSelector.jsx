import React from "react";
import { Card, CardBody } from "@heroui/react";
import FilterSwitch from "./FilterSwitch";

// Import filter group components
import KementerianFilter from "./FilterGroups/KementerianFilter";
import UnitFilter from "./FilterGroups/UnitFilter";
import DekonFilter from "./FilterGroups/DekonFilter";
import KanwilFilter from "./FilterGroups/KanwilFilter";
import KppnFilter from "./FilterGroups/KppnFilter";
import SatkerFilter from "./FilterGroups/SatkerFilter";
import ProgramFilter from "./FilterGroups/ProgramFilter";
import KegiatanFilter from "./FilterGroups/KegiatanFilter";
import OutputFilter from "./FilterGroups/OutputFilter";
import AkunFilter from "./FilterGroups/AkunFilter";

const FilterSection = ({ inquiryState }) => {
  const {
    // Report type for determining default switches
    jenlap,
    // Filter visibility states for the 10 required switches
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
    kdprogram,
    setKdprogram,
    kdgiat,
    setKdgiat,
    kdoutput,
    setKdoutput,
    kdakun,
    setKdakun,

    // Filter values and conditions for the 10 required switches
    dept,
    setDept,
    deptkondisi,
    setDeptkondisi,
    katadept,
    setKatadept,
    deptradio,
    setDeptradio,
    kdunit,
    setKdunit,
    unitkondisi,
    setUnitkondisi,
    kataunit,
    setKataunit,
    unitradio,
    setUnitradio,
    dekon,
    setDekon,
    dekonkondisi,
    setDekonkondisi,
    katadekon,
    setKatadekon,
    dekonradio,
    setDekonradio,
    kanwil,
    setKanwil,
    kanwilkondisi,
    setKanwilkondisi,
    katakanwil,
    setKatakanwil,
    kanwilradio,
    setKanwilradio,
    kppn,
    setKppn,
    kppnkondisi,
    setKppnkondisi,
    katakppn,
    setKatakppn,
    kppnradio,
    setKppnradio,
    satker,
    setSatker,
    satkerkondisi,
    setSatkerkondisi,
    katasatker,
    setKatasatker,
    satkerradio,
    setSatkerradio,
    program,
    setProgram,
    programkondisi,
    setProgramkondisi,
    kataprogram,
    setKataprogram,
    programradio,
    setProgramradio,
    giat,
    setGiat,
    giatkondisi,
    setGiatkondisi,
    katagiat,
    setKatagiat,
    kegiatanradio,
    setKegiatanradio,
    output,
    setOutput,
    outputkondisi,
    setOutputkondisi,
    kataoutput,
    setKataoutput,
    outputradio,
    setOutputradio,
    akun,
    setAkun,
    akunkondisi,
    setAkunkondisi,
    kataakun,
    setKataakun,
    akunradio,
    setAkunradio,
  } = inquiryState;

  // Use the actual filter switch states from inquiryState
  const showKementerian = kddept;
  const setShowKementerian = setKddept;
  const showUnit = unit;
  const setShowUnit = setUnit;
  const showDekon = kddekon;
  const setShowDekon = setKddekon;
  const showKanwil = kdkanwil;
  const setShowKanwil = setKdkanwil;

  // For the simplified inquiry-deviasi, we don't need complex disabled switches logic
  // All 10 switches are always available

  // For simplified inquiry-deviasi, we don't need automatic switch management

  // For simplified inquiry-deviasi, we don't need automatic jenlap-based switch management

  // Reset filter values when switches are turned off
  React.useEffect(() => {
    if (!kddept) {
      // Reset Kementerian filter state
      setDept && setDept("000"); // Default dept value
      setDeptkondisi && setDeptkondisi("");
      setKatadept && setKatadept("");
      setDeptradio && setDeptradio("1");
    }
  }, [kddept, setDept, setDeptkondisi, setKatadept, setDeptradio]);

  React.useEffect(() => {
    if (!unit) {
      // Reset Unit filter state
      setKdunit && setKdunit("XX");
      setUnitkondisi && setUnitkondisi("");
      setKataunit && setKataunit("");
      setUnitradio && setUnitradio("1");
    }
  }, [unit, setKdunit, setUnitkondisi, setKataunit, setUnitradio]);

  React.useEffect(() => {
    if (!kddekon) {
      // Reset Dekon filter state
      setDekon && setDekon("XX");
      setDekonkondisi && setDekonkondisi("");
      setKatadekon && setKatadekon("");
      setDekonradio && setDekonradio("1");
    }
  }, [kddekon, setDekon, setDekonkondisi, setKatadekon, setDekonradio]);

  React.useEffect(() => {
    if (!kdkanwil) {
      // Reset Kanwil filter state
      setKanwil && setKanwil("XX");
      setKanwilkondisi && setKanwilkondisi("");
      setKatakanwil && setKatakanwil("");
      setKanwilradio && setKanwilradio("1");
    }
  }, [kdkanwil, setKanwil, setKanwilkondisi, setKatakanwil, setKanwilradio]);

  React.useEffect(() => {
    if (!kdkppn) {
      // Reset KPPN filter state
      setKppn && setKppn("XX");
      setKppnkondisi && setKppnkondisi("");
      setKatakppn && setKatakppn("");
      setKppnradio && setKppnradio("1");
    }
  }, [kdkppn, setKppn, setKppnkondisi, setKatakppn, setKppnradio]);

  React.useEffect(() => {
    if (!kdsatker) {
      // Reset Satker filter state
      setSatker && setSatker("XX");
      setSatkerkondisi && setSatkerkondisi("");
      setKatasatker && setKatasatker("");
      setSatkerradio && setSatkerradio("1");
    }
  }, [kdsatker, setSatker, setSatkerkondisi, setKatasatker, setSatkerradio]);

  React.useEffect(() => {
    if (!kdprogram) {
      // Reset Program filter state
      setProgram && setProgram("XX");
      setProgramkondisi && setProgramkondisi("");
      setKataprogram && setKataprogram("");
      setProgramradio && setProgramradio("1");
    }
  }, [
    kdprogram,
    setProgram,
    setProgramkondisi,
    setKataprogram,
    setProgramradio,
  ]);

  React.useEffect(() => {
    if (!kdgiat) {
      // Reset Kegiatan filter state
      setGiat && setGiat("XX");
      setGiatkondisi && setGiatkondisi("");
      setKatagiat && setKatagiat("");
      setKegiatanradio && setKegiatanradio("1");
    }
  }, [kdgiat, setGiat, setGiatkondisi, setKatagiat, setKegiatanradio]);

  React.useEffect(() => {
    if (!kdoutput) {
      // Reset Output filter state
      setOutput && setOutput("XX");
      setOutputkondisi && setOutputkondisi("");
      setKataoutput && setKataoutput("");
      setOutputradio && setOutputradio("1");
    }
  }, [kdoutput, setOutput, setOutputkondisi, setKataoutput, setOutputradio]);

  React.useEffect(() => {
    if (!kdakun) {
      // Reset Akun filter state
      setAkun && setAkun("AKUN");
      setAkunkondisi && setAkunkondisi("");
      setKataakun && setKataakun("");
      setAkunradio && setAkunradio("1");
    } else if (kdakun && jenlap === "10") {
      // For jenlap 10, ensure the specific codes are set and maintained
      setAkunkondisi &&
        setAkunkondisi(
          "511521,511522,511529,521231,521232,521233,521234,526111,526112,526113,526114,526115,526121,526122,526123,526124,526131,526132,526311,526312,526313,526321,526322,526323"
        );
      setAkunradio && setAkunradio("1");
      // Clear other akun fields for jenlap 10 since kondisi is predefined
      setKataakun && setKataakun("");
    }
  }, [kdakun, jenlap, setAkun, setAkunkondisi, setKataakun, setAkunradio]);

  // For simplified inquiry-deviasi, we only need reset effects for the 10 switches we're keeping

  // For simplified inquiry-deviasi, we don't need complex default switches logic

  return (
    <>
      {/* Filter Options Card - Modern design with gradient and rounded corners */}
      <div className="w-full p-3 mb-6 sm:p-4 bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-zinc-900 dark:to-zinc-900 shadow-none rounded-2xl">
        {/* <div className="flex items-center gap-3 mb-4">
          <h5 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Filter Options
          </h5>
        </div> */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 2xl:grid-cols-8 gap-2 sm:gap-3">
          <FilterSwitch
            id="kddept-filter"
            checked={Boolean(showKementerian)}
            onChange={setShowKementerian}
            label="Kementerian"
          />
          <FilterSwitch
            id="unit-filter"
            checked={showUnit}
            onChange={setShowUnit}
            label="Eselon I"
          />
          <FilterSwitch
            id="dekon-filter"
            checked={showDekon}
            onChange={setShowDekon}
            label="Kewenangan"
          />
          <FilterSwitch
            id="kanwil-filter"
            checked={showKanwil}
            onChange={setShowKanwil}
            label="Kanwil"
          />
          <FilterSwitch
            id="kdkppn-filter"
            checked={kdkppn}
            onChange={setKdkppn}
            label="KPPN"
          />
          <FilterSwitch
            id="kdsatker-filter"
            checked={kdsatker}
            onChange={setKdsatker}
            label="Satker"
          />
          <FilterSwitch
            id="kdprogram-filter"
            checked={kdprogram}
            onChange={setKdprogram}
            label="Program"
          />
          <FilterSwitch
            id="kdgiat-filter"
            checked={kdgiat}
            onChange={setKdgiat}
            label="Kegiatan"
          />
          <FilterSwitch
            id="kdoutput-filter"
            checked={kdoutput}
            onChange={setKdoutput}
            label="Output/KRO"
          />
          <FilterSwitch
            id="kdakun-filter"
            checked={kdakun}
            onChange={setKdakun}
            label="Akun"
          />
        </div>
      </div>

      {/* Filter Components Row - Modern spacing and styling */}
      <div className="space-y-4 mb-4">
        {showKementerian && (
          <KementerianFilter
            inquiryState={inquiryState}
            status={showKementerian ? "pilihdept" : ""}
          />
        )}
        {showUnit && <UnitFilter inquiryState={inquiryState} />}
        {showDekon && <DekonFilter inquiryState={inquiryState} />}
        {showKanwil && <KanwilFilter inquiryState={inquiryState} />}
        {kdkppn && <KppnFilter inquiryState={inquiryState} />}
        {kdsatker && <SatkerFilter inquiryState={inquiryState} />}
        {kdprogram && <ProgramFilter inquiryState={inquiryState} />}
        {kdgiat && <KegiatanFilter inquiryState={inquiryState} />}
        {kdoutput && <OutputFilter type="output" inquiryState={inquiryState} />}
        {kdakun && <AkunFilter inquiryState={inquiryState} />}
      </div>
    </>
  );
};

export default FilterSection;
