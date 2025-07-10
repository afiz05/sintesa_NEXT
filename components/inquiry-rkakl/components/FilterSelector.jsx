import React from "react";
import { Card, CardBody } from "@heroui/react";
import FilterSwitch from "./FilterSwitch";

// Import filter group components
import KementerianFilter from "./FilterGroups/KementerianFilter";
import UnitFilter from "./FilterGroups/UnitFilter";
import LokasiFilter from "./FilterGroups/LokasiFilter";
import FungsiFilter from "./FilterGroups/FungsiFilter";
import SubfungsiFilter from "./FilterGroups/SubfungsiFilter";
import ProgramFilter from "./FilterGroups/ProgramFilter";
import KegiatanFilter from "./FilterGroups/KegiatanFilter";
import OutputFilter from "./FilterGroups/OutputFilter";
import SuboutputFilter from "./FilterGroups/SuboutputFilter";
import KomponenFilter from "./FilterGroups/KomponenFilter";
import SubkomponenFilter from "./FilterGroups/SubkomponenFilter";
import ItemFilter from "./FilterGroups/ItemFilter";
import AkunFilter from "./FilterGroups/AkunFilter";
import SumberdanaFilter from "./FilterGroups/SumberDanaFilter";
import RegisterFilter from "./FilterGroups/RegisterFilter";
import DekonFilter from "./FilterGroups/DekonFilter";
import KabkotaFilter from "./FilterGroups/KabkotaFilter";
import KanwilFilter from "./FilterGroups/KanwilFilter";
import KppnFilter from "./FilterGroups/KppnFilter";
import SatkerFilter from "./FilterGroups/SatkerFilter";
import BlokirFilter from "./FilterGroups/BlokirFilter";

const FilterSection = ({ inquiryState }) => {
  const {
    // Report type for determining default switches
    jenlap,
    // Filter visibility states
    kddept,
    setKddept,
    unit,
    setUnit,
    kddekon,
    setKddekon,
    kdlokasi,
    setKdlokasi,
    kdkabkota,
    setKdkabkota,
    kdkanwil,
    setKdkanwil,
    kdkppn,
    setKdkppn,
    kdsatker,
    setKdsatker,
    kdfungsi,
    setKdfungsi,
    kdsfungsi,
    setKdsfungsi,
    kdprogram,
    setKdprogram,
    kdgiat,
    setKdgiat,
    kdoutput,
    setKdoutput,
    kdsoutput,
    setKdsoutput,
    kdkomponen,
    setKdkomponen,
    kdskomponen,
    setKdskomponen,
    kdakun,
    setKdakun,
    kdsdana,
    setKdsdana,
    kditem,
    setKditem,
    kdregister,
    setKdregister,
    kdblokir,
    setKdblokir,

    // Filter values and conditions - only keep what's needed for active filters
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
    prov,
    setProv,
    lokasikondisi,
    setLokasikondisi,
    katalokasi,
    setKatalokasi,
    locradio,
    setLocradio,
    kabkota,
    setKabkota,
    kabkotakondisi,
    setKabkotakondisi,
    katakabkota,
    setKatakabkota,
    kabkotaradio,
    setKabkotaradio,
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
    fungsi,
    setFungsi,
    fungsikondisi,
    setFungsikondisi,
    katafungsi,
    setKatafungsi,
    fungsiradio,
    setFungsiradio,
    sfungsi,
    setSfungsi,
    subfungsikondisi,
    setSubfungsikondisi,
    katasubfungsi,
    setKatasubfungsi,
    subfungsiradio,
    setSubfungsiradio,
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
    soutput,
    setsOutput,
    soutputkondisi,
    setSoutputkondisi,
    katasoutput,
    setKatasoutput,
    soutputradio,
    setsOutputradio,
    komponen,
    setKomponen,
    komponenkondisi,
    setKomponenkondisi,
    katakomponen,
    setKatakomponen,
    komponenradio,
    setKomponenradio,
    skomponen,
    setSkomponen,
    skomponenkondisi,
    setSkomponenkondisi,
    kataskomponen,
    setKataskomponen,
    skomponenradio,
    setSkomponenradio,
    akun,
    setAkun,
    akunkondisi,
    setAkunkondisi,
    kataakun,
    setKataakun,
    akunradio,
    setAkunradio,
    sdana,
    setSdana,
    sdanakondisi,
    setSdanakondisi,
    katasdana,
    setKatasdana,
    sdanaradio,
    setSdanaradio,
    item,
    setItem,
    itemkondisi,
    setItemkondisi,
    kataitem,
    setKataitem,
    itemradio,
    setItemradio,
    register,
    setRegister,
    registerkondisi,
    setRegisterkondisi,
    kataregister,
    setKataregister,
    registerradio,
    setRegisterradio,
    blokir,
    setBlokir,
  } = inquiryState;

  // Remove local state - use the actual filter switch states from inquiryState instead
  // const [showKementerian, setShowKementerian] = React.useState(false);
  // const [showUnit, setShowUnit] = React.useState(false);
  // const [showDekon, setShowDekon] = React.useState(false);
  // const [showKabkota, setShowKabkota] = React.useState(false);
  // const [showKanwil, setShowKanwil] = React.useState(false);
  // const [showLokasi, setShowLokasi] = React.useState(false);

  // Use the actual filter switch states from inquiryState
  const showKementerian = kddept;
  const setShowKementerian = setKddept;
  const showUnit = unit;
  const setShowUnit = setUnit;
  const showDekon = kddekon;
  const setShowDekon = setKddekon;
  const showKabkota = kdkabkota;
  const setShowKabkota = setKdkabkota;
  const showKanwil = kdkanwil;
  const setShowKanwil = setKdkanwil;
  const showLokasi = kdlokasi;
  const setShowLokasi = setKdlokasi;

  // Since inquiry-rkakl only uses "Pagu dan Blokir", no special filter management is needed

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
    if (!kdlokasi) {
      // Reset Provinsi filter state
      setProv && setProv("XX");
      setLokasikondisi && setLokasikondisi("");
      setKatalokasi && setKatalokasi("");
      setLocradio && setLocradio("1");
    }
  }, [kdlokasi, setProv, setLokasikondisi, setKatalokasi, setLocradio]);

  React.useEffect(() => {
    if (!kdkabkota) {
      // Reset Kabkota filter state
      setKabkota && setKabkota("XX");
      setKabkotakondisi && setKabkotakondisi("");
      setKatakabkota && setKatakabkota("");
      setKabkotaradio && setKabkotaradio("1");
    }
  }, [
    kdkabkota,
    setKabkota,
    setKabkotakondisi,
    setKatakabkota,
    setKabkotaradio,
  ]);

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
    if (!kdfungsi) {
      // Reset Fungsi filter state
      setFungsi && setFungsi("XX");
      setFungsikondisi && setFungsikondisi("");
      setKatafungsi && setKatafungsi("");
      setFungsiradio && setFungsiradio("1");
    }
  }, [kdfungsi, setFungsi, setFungsikondisi, setKatafungsi, setFungsiradio]);

  React.useEffect(() => {
    if (!kdsfungsi) {
      // Reset Sub-fungsi filter state
      setSfungsi && setSfungsi("XX");
      setSubfungsikondisi && setSubfungsikondisi("");
      setKatasubfungsi && setKatasubfungsi("");
      setSubfungsiradio && setSubfungsiradio("1");
    }
  }, [
    kdsfungsi,
    setSfungsi,
    setSubfungsikondisi,
    setKatasubfungsi,
    setSubfungsiradio,
  ]);

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
    if (!kdsoutput) {
      // Reset Sub-output filter state
      setsOutput && setsOutput("XX");
      setSoutputkondisi && setSoutputkondisi("");
      setKatasoutput && setKatasoutput("");
      setsOutputradio && setsOutputradio("1");
    }
  }, [
    kdsoutput,
    setsOutput,
    setSoutputkondisi,
    setKatasoutput,
    setsOutputradio,
  ]);

  React.useEffect(() => {
    if (!kdkomponen) {
      // Reset Komponen filter state
      setKomponen && setKomponen("XX");
      setKomponenkondisi && setKomponenkondisi("");
      setKatakomponen && setKatakomponen("");
      setKomponenradio && setKomponenradio("1");
    }
  }, [
    kdkomponen,
    setKomponen,
    setKomponenkondisi,
    setKatakomponen,
    setKomponenradio,
  ]);

  React.useEffect(() => {
    if (!kdskomponen) {
      // Reset Sub-komponen filter state
      setSkomponen && setSkomponen("XX");
      setSkomponenkondisi && setSkomponenkondisi("");
      setKataskomponen && setKataskomponen("");
      setSkomponenradio && setSkomponenradio("1");
    }
  }, [
    kdskomponen,
    setSkomponen,
    setSkomponenkondisi,
    setKataskomponen,
    setSkomponenradio,
  ]);

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

  React.useEffect(() => {
    if (!kdsdana) {
      // Reset Sumber Dana filter state
      setSdana && setSdana("XX");
      setSdanakondisi && setSdanakondisi("");
      setKatasdana && setKatasdana("");
      setSdanaradio && setSdanaradio("1");
    }
  }, [kdsdana, setSdana, setSdanakondisi, setKatasdana, setSdanaradio]);

  React.useEffect(() => {
    if (!kditem) {
      // Reset Item filter state
      setItem && setItem("XX");
      setItemkondisi && setItemkondisi("");
      setKataitem && setKataitem("");
      setItemradio && setItemradio("1");
    }
  }, [kditem, setItem, setItemkondisi, setKataitem, setItemradio]);

  React.useEffect(() => {
    if (!kdregister) {
      // Reset Register filter state
      setRegister && setRegister("XX");
      setRegisterkondisi && setRegisterkondisi("");
      setKataregister && setKataregister("");
      setRegisterradio && setRegisterradio("1");
    }
  }, [
    kdregister,
    setRegister,
    setRegisterkondisi,
    setKataregister,
    setRegisterradio,
  ]);

  // Removed unused special filter useEffect blocks since inquiry-rkakl only uses basic filters

  React.useEffect(() => {
    if (!kdblokir) {
      // Reset Blokir filter state
      setBlokir && setBlokir("XX");
    }
  }, [kdblokir, setBlokir]);

  // Set default filter switches - only Kementerian is ON by default for inquiry-rkakl
  // Use a ref to track if initial setup has been done to prevent resetting user choices
  const hasInitialized = React.useRef(false);

  React.useEffect(() => {
    if (!jenlap || hasInitialized.current) return; // Don't do anything if jenlap is not set or already initialized

    // For inquiry-rkakl (Pagu dan Blokir), only Kementerian is enabled by default
    setKddept && setKddept(true);
    setUnit && setUnit(false);
    setKddekon && setKddekon(false);
    setKdlokasi && setKdlokasi(false);
    setKdkabkota && setKdkabkota(false);
    setKdkanwil && setKdkanwil(false);
    setKdkppn && setKdkppn(false);
    setKdsatker && setKdsatker(false);
    setKdfungsi && setKdfungsi(false);
    setKdsfungsi && setKdsfungsi(false);
    setKdprogram && setKdprogram(false);
    setKdgiat && setKdgiat(false);
    setKdoutput && setKdoutput(false);
    setKdsoutput && setKdsoutput(false);
    setKdakun && setKdakun(false);
    setKdsdana && setKdsdana(false);
    setKdregister && setKdregister(false);
    // Set kditem and kdblokir to false by default
    setKditem && setKditem(false);
    setKdblokir && setKdblokir(false);

    // Mark as initialized to prevent future resets
    hasInitialized.current = true;
  }, [jenlap]); // Only run when jenlap changes, but only once due to ref check

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
            id="lokasi-filter"
            checked={showLokasi}
            onChange={setShowLokasi}
            label="Provinsi"
          />
          <FilterSwitch
            id="kabkota-filter"
            checked={showKabkota}
            onChange={setShowKabkota}
            label="Kabupaten/Kota"
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
            id="kdfungsi-filter"
            checked={kdfungsi}
            onChange={setKdfungsi}
            label="Fungsi"
          />
          <FilterSwitch
            id="kdsfungsi-filter"
            checked={kdsfungsi}
            onChange={setKdsfungsi}
            label="Sub-fungsi"
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
            id="kdsoutput-filter"
            checked={kdsoutput}
            onChange={setKdsoutput}
            label="Sub-output"
          />
          <FilterSwitch
            id="kdkomponen-filter"
            checked={kdkomponen}
            onChange={setKdkomponen}
            label="Komponen"
          />
          <FilterSwitch
            id="kdskomponen-filter"
            checked={kdskomponen}
            onChange={setKdskomponen}
            label="Sub-komponen"
          />
          <FilterSwitch
            id="kdakun-filter"
            checked={kdakun}
            onChange={setKdakun}
            label="Akun"
          />
          <FilterSwitch
            id="kdsdana-filter"
            checked={kdsdana}
            onChange={setKdsdana}
            label="Sumber Dana"
          />
          <FilterSwitch
            id="kditem-filter"
            checked={kditem}
            onChange={setKditem}
            label="Item"
          />
          <FilterSwitch
            id="kdregister-filter"
            checked={kdregister}
            onChange={setKdregister}
            label="Register"
          />
          <FilterSwitch
            id="kdblokir-filter"
            checked={kdblokir}
            onChange={setKdblokir}
            label="Kode Blokir"
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
        {showLokasi && <LokasiFilter inquiryState={inquiryState} />}
        {showKabkota && <KabkotaFilter inquiryState={inquiryState} />}
        {showKanwil && <KanwilFilter inquiryState={inquiryState} />}
        {kdkppn && <KppnFilter inquiryState={inquiryState} />}
        {kdsatker && <SatkerFilter inquiryState={inquiryState} />}
        {kdfungsi && <FungsiFilter inquiryState={inquiryState} />}
        {kdsfungsi && <SubfungsiFilter inquiryState={inquiryState} />}
        {kdprogram && <ProgramFilter inquiryState={inquiryState} />}
        {kdgiat && <KegiatanFilter inquiryState={inquiryState} />}
        {kdoutput && <OutputFilter type="output" inquiryState={inquiryState} />}
        {kdsoutput && <SuboutputFilter inquiryState={inquiryState} />}
        {kdakun && <AkunFilter inquiryState={inquiryState} />}
        {kdkomponen && <KomponenFilter inquiryState={inquiryState} />}
        {kdskomponen && <SubkomponenFilter inquiryState={inquiryState} />}
        {kdsdana && (
          <SumberdanaFilter type="source" inquiryState={inquiryState} />
        )}
        {kditem && <ItemFilter inquiryState={inquiryState} />}
        {kdregister && (
          <RegisterFilter type="register" inquiryState={inquiryState} />
        )}
        {kdblokir && <BlokirFilter inquiryState={inquiryState} />}
      </div>
    </>
  );
};

export default FilterSection;
