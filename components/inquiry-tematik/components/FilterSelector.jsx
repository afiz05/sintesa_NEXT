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

import AkunFilter from "./FilterGroups/AkunFilter";
import SumberdanaFilter from "./FilterGroups/SumberDanaFilter";
import DekonFilter from "./FilterGroups/DekonFilter";
import KabkotaFilter from "./FilterGroups/KabkotaFilter";
import KanwilFilter from "./FilterGroups/KanwilFilter";
import KppnFilter from "./FilterGroups/KppnFilter";
import SatkerFilter from "./FilterGroups/SatkerFilter";

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

    kdakun,
    setKdakun,
    kdsdana,
    setKdsdana,
    // Special filter switches (used in useEffect logic)
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
    KdMBG,
    setKdMBG,

    // Filter values and conditions (used in useEffect hooks)
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
    // Base disabled switches for most report types
    const baseDisabledSwitches = [
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
      "KdMBG", // MBG
    ];

    // For Kemiskinan (6), enable Kemiskinan filter and disable akun, register, sumber dana
    if (reportType === "6") {
      return baseDisabledSwitches
        .filter((item) => item !== "kdKemiskinan")
        .concat(["kdakun", "kdregister", "kdsdana"]);
    }

    // For Prioritas Nasional (1), enable Prinas-related filters but disable others
    if (reportType === "1") {
      return baseDisabledSwitches.filter(
        (item) => !["KdPP", "KdKegPP", "KdPRI"].includes(item)
      );
    }

    // For Major Project (2), enable Major Project filter but disable others
    if (reportType === "2") {
      return baseDisabledSwitches.filter((item) => item !== "KdMP");
    }

    // For Tematik Anggaran (3), enable Tematik filter but disable others
    if (reportType === "3") {
      return baseDisabledSwitches.filter((item) => item !== "KdTema");
    }

    // For Inflasi (4), enable Inflasi filter but disable others
    if (reportType === "4") {
      return baseDisabledSwitches.filter((item) => item !== "kdInflasi");
    }

    // For Stunting (5), enable Stunting filter but disable others
    if (reportType === "5") {
      return baseDisabledSwitches.filter((item) => item !== "KdStunting");
    }

    // For Belanja Pemilu (7), enable Pemilu filter but disable others
    if (reportType === "7") {
      return baseDisabledSwitches.filter((item) => item !== "KdPemilu");
    }

    // For IKN (8), enable IKN filter but disable others
    if (reportType === "8") {
      return baseDisabledSwitches.filter((item) => item !== "kdIkn");
    }

    // For Pangan (9), enable Pangan filter but disable others
    if (reportType === "9") {
      return baseDisabledSwitches.filter((item) => item !== "KdPangan");
    }

    // For Special Akun Filter (10), disable other switches but keep Akun available (controlled separately)
    // Also disable sub-output for Bantuan Pemerintah
    if (reportType === "10") {
      return baseDisabledSwitches.concat(["kdsoutput"]);
    }

    // For MBG (11), enable MBG filter but disable others
    if (reportType === "11") {
      return baseDisabledSwitches.filter((item) => item !== "KdMBG");
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
      if (disabledSwitches.includes("KdMBG") && KdMBG) {
        setKdMBG && setKdMBG(false);
      }
    }
  }, [jenlap]); // Only depend on jenlap to avoid circular dependencies

  // Automatically turn on special filters based on jenlap
  React.useEffect(() => {
    if (jenlap === "1") {
      // Turn on the special filters for Prioritas Nasional
      setKdPN && setKdPN(true);
      setKdPP && setKdPP(true);
      setKdKegPP && setKdKegPP(true);
      setKdPRI && setKdPRI(true);
      // Turn off Major Project for jenlap 1
      setKdMP && setKdMP(false);
      // Turn off Tematik for jenlap 1
      setKdTema && setKdTema(false);
      // Turn off Inflasi for jenlap 1
      setKdInflasi && setKdInflasi(false);
      // Turn off Stunting for jenlap 1
      setKdStunting && setKdStunting(false);
    } else if (jenlap === "2") {
      // Turn on Major Project for jenlap 2
      setKdMP && setKdMP(true);
      // Turn off Prioritas filters for jenlap 2
      setKdPN && setKdPN(false);
      setKdPP && setKdPP(false);
      setKdKegPP && setKdKegPP(false);
      setKdPRI && setKdPRI(false);
      // Turn off Tematik for jenlap 2
      setKdTema && setKdTema(false);
      // Turn off Inflasi for jenlap 2
      setKdInflasi && setKdInflasi(false);
      // Turn off Stunting for jenlap 2
      setKdStunting && setKdStunting(false);
    } else if (jenlap === "3") {
      // Turn on Tematik for jenlap 3 (Tematik Anggaran)
      setKdTema && setKdTema(true);
      // Turn off other special filters for jenlap 3
      setKdPN && setKdPN(false);
      setKdPP && setKdPP(false);
      setKdKegPP && setKdKegPP(false);
      setKdPRI && setKdPRI(false);
      setKdMP && setKdMP(false);
      // Turn off Inflasi for jenlap 3
      setKdInflasi && setKdInflasi(false);
      // Turn off Stunting for jenlap 3
      setKdStunting && setKdStunting(false);
    } else if (jenlap === "4") {
      // Turn on Inflasi for jenlap 4 (Inflasi)
      setKdInflasi && setKdInflasi(true);
      // Turn off other special filters for jenlap 4
      setKdPN && setKdPN(false);
      setKdPP && setKdPP(false);
      setKdKegPP && setKdKegPP(false);
      setKdPRI && setKdPRI(false);
      setKdMP && setKdMP(false);
      setKdTema && setKdTema(false);
      setKdStunting && setKdStunting(false);
    } else if (jenlap === "5") {
      // Turn on Stunting for jenlap 5 (Stunting)
      setKdStunting && setKdStunting(true);
      // Turn off other special filters for jenlap 5
      setKdPN && setKdPN(false);
      setKdPP && setKdPP(false);
      setKdKegPP && setKdKegPP(false);
      setKdPRI && setKdPRI(false);
      setKdMP && setKdMP(false);
      setKdTema && setKdTema(false);
      setKdInflasi && setKdInflasi(false);
    } else if (jenlap === "6") {
      // Turn on Kemiskinan for jenlap 6 (Kemiskinan Extrem)
      setKdKemiskinan && setKdKemiskinan(true);
      // Turn off other special filters for jenlap 6
      setKdPN && setKdPN(false);
      setKdPP && setKdPP(false);
      setKdKegPP && setKdKegPP(false);
      setKdPRI && setKdPRI(false);
      setKdMP && setKdMP(false);
      setKdTema && setKdTema(false);
      setKdInflasi && setKdInflasi(false);
      setKdStunting && setKdStunting(false);
      setKdPemilu && setKdPemilu(false);
    } else if (jenlap === "7") {
      // Turn on Pemilu for jenlap 7 (Belanja Pemilu)
      setKdPemilu && setKdPemilu(true);
      // Turn off other special filters for jenlap 7
      setKdPN && setKdPN(false);
      setKdPP && setKdPP(false);
      setKdKegPP && setKdKegPP(false);
      setKdPRI && setKdPRI(false);
      setKdMP && setKdMP(false);
      setKdTema && setKdTema(false);
      setKdInflasi && setKdInflasi(false);
      setKdStunting && setKdStunting(false);
      setKdKemiskinan && setKdKemiskinan(false);
      setKdIkn && setKdIkn(false);
    } else if (jenlap === "8") {
      // Turn on IKN for jenlap 8 (Ibu Kota Nusantara)
      setKdIkn && setKdIkn(true);
      // Turn off other special filters for jenlap 8
      setKdPN && setKdPN(false);
      setKdPP && setKdPP(false);
      setKdKegPP && setKdKegPP(false);
      setKdPRI && setKdPRI(false);
      setKdMP && setKdMP(false);
      setKdTema && setKdTema(false);
      setKdInflasi && setKdInflasi(false);
      setKdStunting && setKdStunting(false);
      setKdKemiskinan && setKdKemiskinan(false);
      setKdPemilu && setKdPemilu(false);
    } else if (jenlap === "9") {
      // Turn on Pangan for jenlap 9 (Ketahanan Pangan)
      setKdPangan && setKdPangan(true);
      // Turn off other special filters for jenlap 9
      setKdPN && setKdPN(false);
      setKdPP && setKdPP(false);
      setKdKegPP && setKdKegPP(false);
      setKdPRI && setKdPRI(false);
      setKdMP && setKdMP(false);
      setKdTema && setKdTema(false);
      setKdInflasi && setKdInflasi(false);
      setKdStunting && setKdStunting(false);
      setKdKemiskinan && setKdKemiskinan(false);
      setKdPemilu && setKdPemilu(false);
      setKdIkn && setKdIkn(false);
    } else if (jenlap === "10") {
      // Turn on Akun for jenlap 10 (Special Akun Filter with predefined codes)
      setKdakun && setKdakun(true);
      // Set specific akun kondisi for the predefined codes
      setAkunkondisi &&
        setAkunkondisi(
          "511521,511522,511529,521231,521232,521233,521234,526111,526112,526113,526114,526115,526121,526122,526123,526124,526131,526132,526311,526312,526313,526321,526322,526323"
        );
      // Set radio to show codes only since user can't modify
      setAkunradio && setAkunradio("1");
      // Turn off other special filters for jenlap 10
      setKdPN && setKdPN(false);
      setKdPP && setKdPP(false);
      setKdKegPP && setKdKegPP(false);
      setKdPRI && setKdPRI(false);
      setKdMP && setKdMP(false);
      setKdTema && setKdTema(false);
      setKdInflasi && setKdInflasi(false);
      setKdStunting && setKdStunting(false);
      setKdKemiskinan && setKdKemiskinan(false);
      setKdPemilu && setKdPemilu(false);
      setKdIkn && setKdIkn(false);
      setKdPangan && setKdPangan(false);
      setKdMBG && setKdMBG(false);
    } else if (jenlap === "11") {
      // Turn on MBG for jenlap 11 (Makan Bergizi Gratis)
      setKdMBG && setKdMBG(true);
      // Turn off other special filters for jenlap 11
      setKdPN && setKdPN(false);
      setKdPP && setKdPP(false);
      setKdKegPP && setKdKegPP(false);
      setKdPRI && setKdPRI(false);
      setKdMP && setKdMP(false);
      setKdTema && setKdTema(false);
      setKdInflasi && setKdInflasi(false);
      setKdStunting && setKdStunting(false);
      setKdKemiskinan && setKdKemiskinan(false);
      setKdPemilu && setKdPemilu(false);
      setKdIkn && setKdIkn(false);
      setKdPangan && setKdPangan(false);
    } else if (jenlap === "12") {
      // jenlap 12 (Swasembada Pangan) - No special filter switches needed
      // This uses a special base query with swasembada column grouping
      // Turn off all special filters for jenlap 12
      setKdPN && setKdPN(false);
      setKdPP && setKdPP(false);
      setKdKegPP && setKdKegPP(false);
      setKdPRI && setKdPRI(false);
      setKdMP && setKdMP(false);
      setKdTema && setKdTema(false);
      setKdInflasi && setKdInflasi(false);
      setKdStunting && setKdStunting(false);
      setKdKemiskinan && setKdKemiskinan(false);
      setKdPemilu && setKdPemilu(false);
      setKdIkn && setKdIkn(false);
      setKdPangan && setKdPangan(false);
      setKdMBG && setKdMBG(false);
    } else {
      // Turn off all special filters for other report types
      setKdPN && setKdPN(false);
      setKdPP && setKdPP(false);
      setKdKegPP && setKdKegPP(false);
      setKdPRI && setKdPRI(false);
      setKdMP && setKdMP(false);
      setKdTema && setKdTema(false);
      setKdInflasi && setKdInflasi(false);
      setKdStunting && setKdStunting(false);
      setKdKemiskinan && setKdKemiskinan(false);
      setKdPemilu && setKdPemilu(false);
      setKdIkn && setKdIkn(false);
      setKdPangan && setKdPangan(false);
      setKdMBG && setKdMBG(false);
    }
  }, [jenlap]); // Only run when jenlap changes

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

  // Note: Special filter state management (Inflasi, IKN, Kemiskinan, etc.)
  // is handled by their respective card components, not here in FilterSelector

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
        kdsoutput: false, // Sub-output is now available for all jenlap types
        kdakun: reportType === "10", // Turn on Akun for jenlap 10
        kdsdana: false,

        // These switches are now controlled by jenlap-specific logic
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

    // These switches are now controlled by jenlap-specific logic in separate useEffect
    // setKdPP && setKdPP(defaultSwitches.KdPP);
    // setKdKegPP && setKdKegPP(defaultSwitches.KdKegPP);
    // setKdPRI && setKdPRI(defaultSwitches.KdPRI);
    // setKdMP && setKdMP(defaultSwitches.KdMP);
    // setKdTema && setKdTema(defaultSwitches.KdTema);
    // setKdInflasi && setKdInflasi(defaultSwitches.kdInflasi); // Now controlled by jenlap logic
    setKdStunting && setKdStunting(defaultSwitches.KdStunting);
    setKdKemiskinan && setKdKemiskinan(defaultSwitches.kdKemiskinan);
    setKdPemilu && setKdPemilu(defaultSwitches.KdPemilu);
    setKdIkn && setKdIkn(defaultSwitches.kdIkn);
    setKdPangan && setKdPangan(defaultSwitches.KdPangan);
  }, [jenlap]); // Only run when jenlap changes

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
          {/* <FilterSwitch
            id="tanggal-filter"
            checked={tanggal}
            onChange={setTanggal}
            label="Tanggal"
          /> */}
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
            disabled={
              jenlap === "10" ? true : disabledSwitches.includes("kdakun")
            }
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
            disabled={disabledSwitches.includes("kdsdana")}
          />
          {/* <FilterSwitch
            id="kdregister-filter"
            checked={kdregister}
            onChange={setKdregister}
            label="Register"
            disabled={disabledSwitches.includes("kdregister")}
          /> */}
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
        {kdsdana && (
          <SumberdanaFilter type="source" inquiryState={inquiryState} />
        )}
      </div>
    </>
  );
};

export default FilterSection;
