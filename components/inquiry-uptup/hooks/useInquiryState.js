"use client";
import { useState, useContext } from "react";
import MyContext from "../../../utils/Context";

export default function useInquiryState() {
  const {
    role,
    telp,
    verified,
    loadingExcell,
    setloadingExcell,
    kdkppn: kodekppn,
    kdkanwil: kodekanwil,
    settampilAI,
  } = useContext(MyContext);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [showModalKedua, setShowModalKedua] = useState(false);
  const [showModalsql, setShowModalsql] = useState(false);
  const [showModalApbn, setShowModalApbn] = useState(false);
  const [showModalAkumulasi, setShowModalAkumulasi] = useState(false);
  const [showModalBulanan, setShowModalBulanan] = useState(false);
  const [showModalBlokir, setShowModalBlokir] = useState(false);
  const [showModalPN, setShowModalPN] = useState(false);
  const [showModalPN2, setShowModalPN2] = useState(false);
  const [showModalJnsblokir, setShowModalJnsblokir] = useState(false);
  const [showModalPDF, setShowModalPDF] = useState(false);
  const [showModalsimpan, setShowModalsimpan] = useState(false);

  // Form states (simplified for inquiry-uptup)
  const [jenlap, setJenlap] = useState("1"); // Default to "Outstanding UP/TUP"
  const [thang, setThang] = useState(new Date().getFullYear().toString());
  const [pembulatan, setPembulatan] = useState("1");
  const [selectedFormat, setSelectedFormat] = useState("pdf");
  const [export2, setExport2] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [showFormatDropdown, setShowFormatDropdown] = useState(false);
  const [cutoff, setCutoff] = useState((new Date().getMonth() + 1).toString()); // Default to current month

  // Only the 8 required filter switches for inquiry-uptup (including Bulan/Cutoff)
  const [cutoffFilter, setCutoffFilter] = useState(true); // Bulan cutoff filter - always enabled
  const [kddept, setKddept] = useState(true); // Kementerian - default enabled
  const [unit, setUnit] = useState(false); // Eselon I
  const [kddekon, setKddekon] = useState(false); // Kewenangan
  const [kdkanwil, setKdkanwil] = useState(false); // Kanwil
  const [kdkppn, setKdkppn] = useState(false); // KPPN
  const [kdsatker, setKdsatker] = useState(false); // Satker
  const [kdakun, setKdakun] = useState(false); // Akun

  // Filter values (only for the 8 required filters)
  const [dept, setDept] = useState("000");
  const [deptkondisi, setDeptkondisi] = useState(""); // for advanced Kementerian filter
  const [katadept, setKatadept] = useState(""); // for advanced Kementerian filter
  const [kdunit, setKdunit] = useState("XX");
  const [unitkondisi, setUnitkondisi] = useState(""); // for advanced Unit filter
  const [kataunit, setKataunit] = useState(""); // for advanced Unit filter
  const [dekon, setDekon] = useState("XX");
  const [dekonkondisi, setDekonkondisi] = useState(""); // for advanced Dekon filter
  const [katadekon, setKatadekon] = useState(""); // for advanced Dekon filter
  const [kanwil, setKanwil] = useState("XX");
  const [kanwilkondisi, setKanwilkondisi] = useState(""); // for advanced Kanwil filter
  const [katakanwil, setKatakanwil] = useState(""); // for advanced Kanwil filter
  const [kppn, setKppn] = useState("XX");
  const [kppnkondisi, setKppnkondisi] = useState(""); // for advanced KPPN filter
  const [katakppn, setKatakppn] = useState(""); // for advanced KPPN filter
  const [satker, setSatker] = useState("XX");
  const [satkerkondisi, setSatkerkondisi] = useState(""); // for advanced Satker filter
  const [katasatker, setKatasatker] = useState(""); // for advanced Satker filter
  const [akun, setAkun] = useState("AKUN");
  const [akunkondisi, setAkunkondisi] = useState(""); // for advanced Akun filter
  const [kataakun, setKataakun] = useState(""); // for advanced Akun filter

  // Radio states (only for the 8 required filters)
  const [deptradio, setDeptradio] = useState("1");
  const [unitradio, setUnitradio] = useState("1");
  const [dekonradio, setDekonradio] = useState("1");
  const [kanwilradio, setKanwilradio] = useState("1");
  const [kppnradio, setKppnradio] = useState("1");
  const [satkerradio, setSatkerradio] = useState("1");
  const [akunradio, setAkunradio] = useState("1");

  // Special filter option states (simplified)
  const [opsidept, setOpsidept] = useState("pilihdept");

  // SQL state
  const [sql, setSql] = useState("");
  const [from, setFrom] = useState("");
  const [select, setSelect] = useState(", round(sum(rupiah)/1,0) as rupiah");

  return {
    // Context values
    role,
    telp,
    verified,
    loadingExcell,
    setloadingExcell,
    kodekppn,
    kodekanwil,
    settampilAI,

    // Modal states
    showModal,
    setShowModal,
    showModalKedua,
    setShowModalKedua,
    showModalsql,
    setShowModalsql,
    showModalApbn,
    setShowModalApbn,
    showModalAkumulasi,
    setShowModalAkumulasi,
    showModalBulanan,
    setShowModalBulanan,
    showModalBlokir,
    setShowModalBlokir,
    showModalPN,
    setShowModalPN,
    showModalPN2,
    setShowModalPN2,
    showModalJnsblokir,
    setShowModalJnsblokir,
    showModalPDF,
    setShowModalPDF,
    showModalsimpan,
    setShowModalsimpan,

    // Form states
    jenlap,
    setJenlap,
    thang,
    setThang,
    pembulatan,
    setPembulatan,
    selectedFormat,
    setSelectedFormat,
    export2,
    setExport2,
    loadingStatus,
    setLoadingStatus,
    showFormatDropdown,
    setShowFormatDropdown,
    cutoff,
    setCutoff,

    // Only the 8 required filter switches for inquiry-uptup
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

    // Filter values (only for the 8 required filters)
    dept,
    setDept,
    deptkondisi,
    setDeptkondisi,
    katadept,
    setKatadept,
    kdunit,
    setKdunit,
    unitkondisi,
    setUnitkondisi,
    kataunit,
    setKataunit,
    dekon,
    setDekon,
    dekonkondisi,
    setDekonkondisi,
    katadekon,
    setKatadekon,
    kanwil,
    setKanwil,
    kanwilkondisi,
    setKanwilkondisi,
    katakanwil,
    setKatakanwil,
    kppn,
    setKppn,
    kppnkondisi,
    setKppnkondisi,
    katakppn,
    setKatakppn,
    satker,
    setSatker,
    satkerkondisi,
    setSatkerkondisi,
    katasatker,
    setKatasatker,
    akun,
    setAkun,
    akunkondisi,
    setAkunkondisi,
    kataakun,
    setKataakun,

    // Radio states (only for the 8 required filters)
    deptradio,
    setDeptradio,
    unitradio,
    setUnitradio,
    dekonradio,
    setDekonradio,
    kanwilradio,
    setKanwilradio,
    kppnradio,
    setKppnradio,
    satkerradio,
    setSatkerradio,
    akunradio,
    setAkunradio,

    // Special filter option states (simplified)
    opsidept,
    setOpsidept,

    // SQL state
    sql,
    setSql,
    from,
    setFrom,
    select,
    setSelect,
  };
}
