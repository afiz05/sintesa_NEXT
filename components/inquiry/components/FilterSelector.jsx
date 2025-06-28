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
import AkunFilter from "./FilterGroups/AkunFilter";
import SumberdanaFilter from "./FilterGroups/SumberDanaFilter";
import RegisterFilter from "./FilterGroups/RegisterFilter";
import InflasiFilter from "./FilterGroups/InflasiFilter";
import IknFilter from "./FilterGroups/IknFilter";
import KemiskinanFilter from "./FilterGroups/KemiskinanFilter";
import PanganFilter from "./FilterGroups/PanganFilter";
import StuntingFilter from "./FilterGroups/StuntingFilter";
import PemiluFilter from "./FilterGroups/PemiluFilter";
import PrinasFilter from "./FilterGroups/PrinasFilter";
import ProgrampriFilter from "./FilterGroups/ProgrampriFilter";
import KegiatanpriFilter from "./FilterGroups/KegiatanpriFilter";
import ProyekprioritasFilter from "./FilterGroups/ProyekpriFilter";
import MajorprFilter from "./FilterGroups/MajorprFilter";
import TematikFilter from "./FilterGroups/TematikFilter";
import DekonFilter from "./FilterGroups/DekonFilter";
import KabkotaFilter from "./FilterGroups/KabkotaFilter";
import KanwilFilter from "./FilterGroups/KanwilFilter";
import KppnFilter from "./FilterGroups/KppnFilter";
import SatkerFilter from "./FilterGroups/SatkerFilter";
import CutoffFilter from "./FilterGroups/CutoffFilter";

const FilterSection = ({ inquiryState }) => {
  const {
    // Report type for determining default switches
    jenlap,
    // Filter visibility states
    tanggal,
    setTanggal,
    cutoff,
    setCutoff,
    showCutoffSelector,
    setShowCutoffSelector,
    akumulatif,
    setAkumulatif,
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
    kdregister,
    setKdregister,
    kdInflasi,
    setKdInflasi,
    kdIkn,
    setKdIkn,
    kdKemiskinan,
    setKdKemiskinan,
    KdPRI,
    setKdPRI,
    KdPangan,
    setKdPangan,
    KdPemilu,
    setKdPemilu,
    KdStunting,
    setKdStunting,
    KdTema,
    setKdTema,
    KdPN,
    setKdPN,
    KdPP,
    setKdPP,
    KdKegPP,
    setKdKegPP,
    KdMP,
    setKdMP,

    // Filter values and conditions
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
    register,
    setRegister,
    registerkondisi,
    setRegisterkondisi,
    kataregister,
    setKataregister,
    registerradio,
    setRegisterradio,
    Inflasi,
    setInflasi,
    inflasiradio,
    setInflasiradio,
    opsiInflasi,
    setOpsiInflasi,
    Ikn,
    setIkn,
    iknradio,
    setIknradio,
    opsiIkn,
    setOpsiIkn,
    Miskin,
    setMiskin,
    kemiskinanradio,
    setKemiskinanradio,
    opsiKemiskinan,
    setOpsiKemiskinan,
    Pangan,
    setPangan,
    panganradio,
    setPanganradio,
    opsiPangan,
    setOpsiPangan,
    Stunting,
    setStunting,
    stuntingradio,
    setStuntingradio,
    opsiStunting,
    setOpsiStunting,
    PN,
    setPN,
    pnradio,
    setPnradio,
    PP,
    setPP,
    ppradio,
    setPpradio,
    KegPP,
    setKegPP,
    kegppradio,
    setKegppradio,
    MP,
    setMP,
    mpradio,
    setMpradio,
    Tema,
    setTema,
    temaradio,
    setTemaradio,
    Pemilu,
    setPemilu,
    pemiluradio,
    setPemiluradio,
    PRI,
    setPRI,
    priradio,
    setPriradio,
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

  // Determine which switches should be disabled based on report type
  const getDisabledSwitches = (reportType) => {
    // For Volume Output Kegiatan (6), all switches are available
    if (reportType === "6") {
      return [];
    }

    // Base disabled switches for most report types (same as Pagu Realisasi)
    const baseDisabledSwitches = [
      "kdsoutput", // Sub-output
      "KdPN", // Prioritas Nasional
      "KdPP", // Program Prioritas
      "KdKegPP", // Kegiatan Prioritas
      "KdPRI", // Proyek Prioritas
      "KdMP", // Major Project
      "KdTema", // Tematik
      "kdInflasi", // Inflasi
      "KdStunting", // Stunting
      "kdKemiskinan", // Kemiskinan
      "KdPemilu", // Pemilu
      "kdIkn", // IKN
      "KdPangan", // Pangan
    ];

    // For Pagu APBN (1), disable the same switches as other types plus cutoff
    if (reportType === "1") {
      return [...baseDisabledSwitches, "cutoff"];
    }

    // For all other report types (including Pagu Realisasi "2"), disable base switches
    return baseDisabledSwitches;
  };

  const disabledSwitches = getDisabledSwitches(jenlap);

  // Automatically turn off disabled switches when report type changes
  // This effect runs when jenlap changes to manage switch states
  React.useEffect(() => {
    if (!jenlap) return;

    // If switching to a report type that disables certain switches, turn them off
    if (disabledSwitches.length > 0) {
      if (disabledSwitches.includes("kdsoutput") && kdsoutput) {
        setKdsoutput && setKdsoutput(false);
      }
      if (disabledSwitches.includes("KdPN") && KdPN) {
        setKdPN && setKdPN(false);
      }
      if (disabledSwitches.includes("KdPP") && KdPP) {
        setKdPP && setKdPP(false);
      }
      if (disabledSwitches.includes("KdKegPP") && KdKegPP) {
        setKdKegPP && setKdKegPP(false);
      }
      if (disabledSwitches.includes("KdPRI") && KdPRI) {
        setKdPRI && setKdPRI(false);
      }
      if (disabledSwitches.includes("KdMP") && KdMP) {
        setKdMP && setKdMP(false);
      }
      if (disabledSwitches.includes("KdTema") && KdTema) {
        setKdTema && setKdTema(false);
      }
      if (disabledSwitches.includes("kdInflasi") && kdInflasi) {
        setKdInflasi && setKdInflasi(false);
      }
      if (disabledSwitches.includes("KdStunting") && KdStunting) {
        setKdStunting && setKdStunting(false);
      }
      if (disabledSwitches.includes("kdKemiskinan") && kdKemiskinan) {
        setKdKemiskinan && setKdKemiskinan(false);
      }
      if (disabledSwitches.includes("KdPemilu") && KdPemilu) {
        setKdPemilu && setKdPemilu(false);
      }
      if (disabledSwitches.includes("kdIkn") && kdIkn) {
        setKdIkn && setKdIkn(false);
      }
      if (disabledSwitches.includes("KdPangan") && KdPangan) {
        setKdPangan && setKdPangan(false);
      }
      if (disabledSwitches.includes("cutoff") && cutoff !== "0") {
        setCutoff && setCutoff("0");
        setShowCutoffSelector && setShowCutoffSelector(false);
      }
    }
  }, [jenlap]); // Only depend on jenlap to avoid circular dependencies

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
    }
  }, [kdakun, setAkun, setAkunkondisi, setKataakun, setAkunradio]);

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

  React.useEffect(() => {
    if (!kdInflasi) {
      // Reset Inflasi filter state
      setInflasi && setInflasi("00");
      setInflasiradio && setInflasiradio("1");
    }
  }, [kdInflasi, setInflasi, setInflasiradio]);

  React.useEffect(() => {
    if (!kdIkn) {
      // Reset IKN filter state
      setIkn && setIkn("00");
      setIknradio && setIknradio("1");
    }
  }, [kdIkn, setIkn, setIknradio]);

  React.useEffect(() => {
    if (!kdKemiskinan) {
      // Reset Kemiskinan filter state
      setMiskin && setMiskin("00");
      setKemiskinanradio && setKemiskinanradio("1");
    }
  }, [kdKemiskinan, setMiskin, setKemiskinanradio]);

  React.useEffect(() => {
    if (!KdPangan) {
      // Reset Pangan filter state
      setPangan && setPangan("00");
      setPanganradio && setPanganradio("1");
    }
  }, [KdPangan, setPangan, setPanganradio]);

  React.useEffect(() => {
    if (!KdStunting) {
      // Reset Stunting filter state
      setStunting && setStunting("00");
      setStuntingradio && setStuntingradio("1");
    }
  }, [KdStunting, setStunting, setStuntingradio]);

  React.useEffect(() => {
    if (!KdPN) {
      // Reset Prinas filter state
      setPN && setPN("00");
      setPnradio && setPnradio("1");
    }
  }, [KdPN, setPN, setPnradio]);

  React.useEffect(() => {
    if (!KdPP) {
      // Reset Programpri filter state
      setPP && setPP("00");
      setPpradio && setPpradio("1");
    }
  }, [KdPP, setPP, setPpradio]);

  React.useEffect(() => {
    if (!KdKegPP) {
      // Reset Kegiatanpri filter state
      setKegPP && setKegPP("XX");
      setKegppradio && setKegppradio("1");
    }
  }, [KdKegPP, setKegPP, setKegppradio]);

  React.useEffect(() => {
    if (!KdMP) {
      // Reset Majorpr filter state
      setMP && setMP("00");
      setMpradio && setMpradio("1");
    }
  }, [KdMP, setMP, setMpradio]);

  React.useEffect(() => {
    if (!KdTema) {
      // Reset Tematik filter state
      setTema && setTema("00");
      setTemaradio && setTemaradio("1");
    }
  }, [KdTema, setTema, setTemaradio]);

  React.useEffect(() => {
    if (!KdPemilu) {
      // Reset Pemilu filter state
      setPemilu && setPemilu("00");
      setPemiluradio && setPemiluradio("1");
    }
  }, [KdPemilu, setPemilu, setPemiluradio]);

  // Set default filter switches based on report type (jenlap)
  React.useEffect(() => {
    if (!jenlap) return; // Don't do anything if jenlap is not set

    // Define default switches for each report type
    const getDefaultSwitches = (reportType) => {
      // Base configuration: Only Kementerian is ON by default for all report types
      const baseConfig = {
        kddept: true, // Kementerian is always ON
        unit: false,
        kddekon: false,
        kdlokasi: false,
        kdkabkota: false,
        kdkanwil: false,
        kdkppn: false,
        kdsatker: false,
        kdfungsi: false,
        kdsfungsi: false,
        kdprogram: false,
        kdgiat: false,
        kdoutput: false,
        kdsoutput: false,
        kdakun: false,
        kdsdana: false,
        kdregister: false,
        KdPN: false,
        KdPP: false,
        KdKegPP: false,
        KdPRI: false,
        KdMP: false,
        KdTema: false,
        kdInflasi: false,
        KdStunting: false,
        kdKemiskinan: false,
        KdPemilu: false,
        kdIkn: false,
        KdPangan: false,
      };

      // Return base config for all report types
      // Special cases (Pagu APBN and Volume Output Kegiatan) will have all switches available
      // Other report types will have certain switches disabled (handled in the UI)
      return baseConfig;
    };

    const defaultSwitches = getDefaultSwitches(jenlap);

    // Apply the default switches
    setKddept && setKddept(defaultSwitches.kddept);
    setUnit && setUnit(defaultSwitches.unit);
    setKddekon && setKddekon(defaultSwitches.kddekon);
    setKdlokasi && setKdlokasi(defaultSwitches.kdlokasi);
    setKdkabkota && setKdkabkota(defaultSwitches.kdkabkota);
    setKdkanwil && setKdkanwil(defaultSwitches.kdkanwil);
    setKdkppn && setKdkppn(defaultSwitches.kdkppn);
    setKdsatker && setKdsatker(defaultSwitches.kdsatker);
    setKdfungsi && setKdfungsi(defaultSwitches.kdfungsi);
    setKdsfungsi && setKdsfungsi(defaultSwitches.kdsfungsi);
    setKdprogram && setKdprogram(defaultSwitches.kdprogram);
    setKdgiat && setKdgiat(defaultSwitches.kdgiat);
    setKdoutput && setKdoutput(defaultSwitches.kdoutput);
    setKdsoutput && setKdsoutput(defaultSwitches.kdsoutput);
    setKdakun && setKdakun(defaultSwitches.kdakun);
    setKdsdana && setKdsdana(defaultSwitches.kdsdana);
    setKdregister && setKdregister(defaultSwitches.kdregister);
    setKdPN && setKdPN(defaultSwitches.KdPN);
    setKdPP && setKdPP(defaultSwitches.KdPP);
    setKdKegPP && setKdKegPP(defaultSwitches.KdKegPP);
    setKdPRI && setKdPRI(defaultSwitches.KdPRI);
    setKdMP && setKdMP(defaultSwitches.KdMP);
    setKdTema && setKdTema(defaultSwitches.KdTema);
    setKdInflasi && setKdInflasi(defaultSwitches.kdInflasi);
    setKdStunting && setKdStunting(defaultSwitches.KdStunting);
    setKdKemiskinan && setKdKemiskinan(defaultSwitches.kdKemiskinan);
    setKdPemilu && setKdPemilu(defaultSwitches.KdPemilu);
    setKdIkn && setKdIkn(defaultSwitches.kdIkn);
    setKdPangan && setKdPangan(defaultSwitches.KdPangan);
  }, [jenlap]); // Only run when jenlap changes

  return (
    <>
      {/* Filter Options Card - Modern design with gradient and rounded corners */}
      <div className="w-full p-3 mb-4 sm:p-4 bg-white dark:bg-zinc-900 shadow-sm rounded-2xl">
        {/* <div className="flex items-center gap-3 mb-4">
          <h5 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Filter Options
          </h5>
        </div> */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 2xl:grid-cols-8 gap-2 sm:gap-3">
          {/* <FilterSwitch
            id="tanggal-filter"
            checked={tanggal}
            onChange={setTanggal}
            label="Tanggal"
          /> */}
          <FilterSwitch
            id="cutoff-filter"
            checked={cutoff !== "0"}
            onChange={(val) => {
              if (val) {
                // When enabled, reset to January
                setCutoff("1");
              } else {
                // When disabled, set to "0" (disabled state)
                setCutoff("0");
              }
              setShowCutoffSelector(val);
            }}
            label="Cutoff"
            disabled={disabledSwitches.includes("cutoff")}
          />
          {/* <FilterSwitch
            id="akumulatif-filter"
            checked={akumulatif}
            onChange={setAkumulatif}
            label="Akumulatif"
          /> */}
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
            label="Output"
          />
          <FilterSwitch
            id="kdsoutput-filter"
            checked={kdsoutput}
            onChange={setKdsoutput}
            label="Sub-output"
            disabled={disabledSwitches.includes("kdsoutput")}
          />
          <FilterSwitch
            id="kdakun-filter"
            checked={kdakun}
            onChange={setKdakun}
            label="Akun"
          />
          {/* <FilterSwitch
            id="kdkomponen-filter"
            checked={kdkomponen}
            onChange={setKdkomponen}
            label="Komponen"
          /> */}
          {/* <FilterSwitch
            id="kdskomponen-filter"
            checked={kdskomponen}
            onChange={setKdskomponen}
            label="Sub-komponen"
          /> */}

          <FilterSwitch
            id="kdsdana-filter"
            checked={kdsdana}
            onChange={setKdsdana}
            label="Sumber Dana"
          />
          <FilterSwitch
            id="kdregister-filter"
            checked={kdregister}
            onChange={setKdregister}
            label="Register"
          />
          <FilterSwitch
            id="prinas-filter"
            checked={KdPN}
            onChange={setKdPN}
            label="Prioritas Nasional"
            disabled={disabledSwitches.includes("KdPN")}
          />
          <FilterSwitch
            id="programpri-filter"
            checked={KdPP}
            onChange={setKdPP}
            label="Program Prioritas"
            disabled={disabledSwitches.includes("KdPP")}
          />
          <FilterSwitch
            id="kegiatanpri-filter"
            checked={KdKegPP}
            onChange={setKdKegPP}
            label="Kegiatan Prioritas"
            disabled={disabledSwitches.includes("KdKegPP")}
          />
          <FilterSwitch
            id="proyek-prioritas-filter"
            checked={KdPRI}
            onChange={setKdPRI}
            label="Proyek Prioritas"
            disabled={disabledSwitches.includes("KdPRI")}
          />
          <FilterSwitch
            id="majorpr-filter"
            checked={KdMP}
            onChange={setKdMP}
            label="Major Project"
            disabled={disabledSwitches.includes("KdMP")}
          />
          <FilterSwitch
            id="tematik-filter"
            checked={KdTema}
            onChange={setKdTema}
            label="Tematik"
            disabled={disabledSwitches.includes("KdTema")}
          />
          <FilterSwitch
            id="inflasi-filter"
            checked={kdInflasi}
            onChange={setKdInflasi}
            label="Inflasi"
            disabled={disabledSwitches.includes("kdInflasi")}
          />
          <FilterSwitch
            id="stunting-filter"
            checked={KdStunting}
            onChange={setKdStunting}
            label="Stunting"
            disabled={disabledSwitches.includes("KdStunting")}
          />
          <FilterSwitch
            id="kemiskinan-filter"
            checked={kdKemiskinan}
            onChange={setKdKemiskinan}
            label="Kemiskinan Extrem"
            disabled={disabledSwitches.includes("kdKemiskinan")}
          />
          <FilterSwitch
            id="pemilu-filter"
            checked={KdPemilu}
            onChange={setKdPemilu}
            label="Pemilu"
            disabled={disabledSwitches.includes("KdPemilu")}
          />
          <FilterSwitch
            id="ikn-filter"
            checked={kdIkn}
            onChange={setKdIkn}
            label="IKN"
            disabled={disabledSwitches.includes("kdIkn")}
          />
          <FilterSwitch
            id="pangan-filter"
            checked={KdPangan}
            onChange={setKdPangan}
            label="Ketahanan Pangan"
            disabled={disabledSwitches.includes("KdPangan")}
          />
        </div>
      </div>

      {/* Filter Components Row - Modern spacing and styling */}
      <div className="space-y-4 mb-4">
        {/* Always show CutoffFilter card, but disable select when switch is OFF */}
        <CutoffFilter inquiryState={inquiryState} />
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
        {kdregister && (
          <RegisterFilter type="register" inquiryState={inquiryState} />
        )}
        {KdPN && <PrinasFilter inquiryState={inquiryState} />}
        {KdPP && <ProgrampriFilter inquiryState={inquiryState} />}
        {KdKegPP && <KegiatanpriFilter inquiryState={inquiryState} />}
        {KdPRI && <ProyekprioritasFilter inquiryState={inquiryState} />}
        {KdMP && <MajorprFilter inquiryState={inquiryState} />}
        {KdTema && <TematikFilter inquiryState={inquiryState} />}
        {kdInflasi && <InflasiFilter inquiryState={inquiryState} />}
        {KdStunting && <StuntingFilter inquiryState={inquiryState} />}
        {kdKemiskinan && <KemiskinanFilter inquiryState={inquiryState} />}
        {KdPemilu && <PemiluFilter inquiryState={inquiryState} />}
        {kdIkn && <IknFilter inquiryState={inquiryState} />}
        {KdPangan && <PanganFilter inquiryState={inquiryState} />}
      </div>
    </>
  );
};

export default FilterSection;
