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

  // Form states
  const [jenlap, setJenlap] = useState("2");
  const [thang, setThang] = useState(new Date().getFullYear());
  const [tanggal, setTanggal] = useState(false);
  const [cutoff, setCutoff] = useState("12");
  const [pembulatan, setPembulatan] = useState("1");
  const [akumulatif, setAkumulatif] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState("pdf");
  const [export2, setExport2] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [showFormatDropdown, setShowFormatDropdown] = useState(false);

  // Filter visibility states
  const [kddept, setKddept] = useState(true);
  const [unit, setUnit] = useState(false);
  const [kddekon, setKddekon] = useState(false);
  const [kdprov, setKdprov] = useState(false);
  const [kdkabkota, setKdkabkota] = useState(false);
  const [kdkanwil, setKdkanwil] = useState(false);
  const [kdkppn, setKdkppn] = useState(false);
  const [kdsatker, setKdsatker] = useState(false);
  const [kdfungsi, setKdfungsi] = useState(false);
  const [kdsfungsi, setKdsfungsi] = useState(false);
  const [kdprogram, setKdprogram] = useState(false);
  const [kdgiat, setKdgiat] = useState(false);
  const [kdoutput, setKdoutput] = useState(false);
  const [kdsoutput, setKdsoutput] = useState(false);
  const [kdakun, setKdakun] = useState(false);
  const [kdsdana, setKdsdana] = useState(false);
  const [kdregister, setKdregister] = useState(false);

  // Filter values
  const [dept, setDept] = useState("000");
  const [kdunit, setKdunit] = useState("XX");
  const [dekon, setDekon] = useState("XX");
  const [prov, setProv] = useState("XX");
  const [kabkota, setKabkota] = useState("XX");
  const [kanwil, setKanwil] = useState("XX");
  const [kppn, setKppn] = useState("XX");
  const [satker, setSatker] = useState("XX");
  const [fungsi, setFungsi] = useState("XX");
  const [sfungsi, setSfungsi] = useState("XX");
  const [program, setProgram] = useState("XX");
  const [giat, setGiat] = useState("XX");
  const [output, setOutput] = useState("XX");
  const [soutput, setsOutput] = useState("XX");
  const [akun, setAkun] = useState("XX");
  const [sdana, setSdana] = useState("XX");
  const [register, setRegister] = useState("XX");
  const [PN, setPN] = useState("XX");
  const [PP, setPP] = useState("XX");
  const [KegPP, setKegPP] = useState("XX");
  const [PRI, setPRI] = useState("XX");
  const [MP, setMP] = useState("XX");
  const [Tema, setTema] = useState("XX");
  const [Inflasi, setInflasi] = useState("XX");
  const [Stunting, setStunting] = useState("XX");
  const [Miskin, setMiskin] = useState("XX");
  const [Pemilu, setPemilu] = useState("XX");
  const [Ikn, setIkn] = useState("XX");
  const [Pangan, setPangan] = useState("XX");

  // Radio states
  const [deptradio, setDeptradio] = useState("1");
  const [unitradio, setUnitradio] = useState("1");
  const [dekonradio, setDekonradio] = useState("1");
  const [provradio, setProvradio] = useState("1");
  const [kabkotaradio, setKabkotaradio] = useState("1");
  const [kanwilradio, setKanwilradio] = useState("1");
  const [kppnradio, setKppnradio] = useState("1");
  const [satkerradio, setSatkerradio] = useState("1");
  const [fungsiradio, setFungsiradio] = useState("1");
  const [subfungsiradio, setSubfungsiradio] = useState("1");
  const [programradio, setProgramradio] = useState("1");
  const [kegiatanradio, setKegiatanradio] = useState("1");
  const [outputradio, setOutputradio] = useState("1");
  const [soutputradio, setsOutputradio] = useState("1");
  const [akunradio, setAkunradio] = useState("1");
  const [sdanaradio, setSdanaradio] = useState("1");
  const [registerradio, setRegisterradio] = useState("1");

  // SQL state
  const [sql, setSql] = useState("");
  const [from, setFrom] = useState("");
  const [select, setSelect] = useState(
    ", round(sum(a.pagu),0) as PAGU, round(sum(a.real1),0) as REALISASI, round(sum(a.blokir) ,0) as BLOKIR"
  );

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
    tanggal,
    setTanggal,
    cutoff,
    setCutoff,
    pembulatan,
    setPembulatan,
    akumulatif,
    setAkumulatif,
    selectedFormat,
    setSelectedFormat,
    export2,
    setExport2,
    loadingStatus,
    setLoadingStatus,
    showFormatDropdown,
    setShowFormatDropdown,

    // Filter visibility states
    kddept,
    setKddept,
    unit,
    setUnit,
    kddekon,
    setKddekon,
    kdprov,
    setKdprov,
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
    kdregister,
    setKdregister,

    // Filter values
    dept,
    setDept,
    kdunit,
    setKdunit,
    dekon,
    setDekon,
    prov,
    setProv,
    kabkota,
    setKabkota,
    kanwil,
    setKanwil,
    kppn,
    setKppn,
    satker,
    setSatker,
    fungsi,
    setFungsi,
    sfungsi,
    setSfungsi,
    program,
    setProgram,
    giat,
    setGiat,
    output,
    setOutput,
    soutput,
    setsOutput,
    akun,
    setAkun,
    sdana,
    setSdana,
    register,
    setRegister,
    PN,
    setPN,
    PP,
    setPP,
    KegPP,
    setKegPP,
    PRI,
    setPRI,
    MP,
    setMP,
    Tema,
    setTema,
    Inflasi,
    setInflasi,
    Stunting,
    setStunting,
    Miskin,
    setMiskin,
  };
}
