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
  const [jenlap, setJenlap] = useState("1");
  const [thang, setThang] = useState(new Date().getFullYear().toString());
  const [tanggal, setTanggal] = useState(false);
  const [cutoff, setCutoff] = useState("0");
  const [pembulatan, setPembulatan] = useState("1");
  const [akumulatif, setAkumulatif] = useState("0");
  const [selectedFormat, setSelectedFormat] = useState("pdf");
  const [export2, setExport2] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [showFormatDropdown, setShowFormatDropdown] = useState(false);

  // Filter visibility states
  const [kddept, setKddept] = useState(true);
  const [unit, setUnit] = useState(false);
  const [kddekon, setKddekon] = useState(false);
  const [kdlokasi, setKdlokasi] = useState(false);
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
  const [kdkomponen, setKdkomponen] = useState(false);
  const [kdskomponen, setKdskomponen] = useState(false);
  const [kdakun, setKdakun] = useState(false);
  const [kdsdana, setKdsdana] = useState(false);
  const [kdregister, setKdregister] = useState(false);
  const [kditem, setKditem] = useState(false);
  const [kdblokir, setKdblokir] = useState(false);

  // Special filter switches
  const [kdInflasi, setKdInflasi] = useState(false);
  const [kdIkn, setKdIkn] = useState(false);
  const [kdKemiskinan, setKdKemiskinan] = useState(false);
  const [KdPRI, setKdPRI] = useState(false);
  const [KdPangan, setKdPangan] = useState(false);
  const [KdStunting, setKdStunting] = useState(false);
  const [KdPemilu, setKdPemilu] = useState(false);
  const [KdTema, setKdTema] = useState(false);
  const [KdPN, setKdPN] = useState(false);
  const [KdPP, setKdPP] = useState(false);
  const [KdKegPP, setKdKegPP] = useState(false);
  const [KdMP, setKdMP] = useState(false);
  const [KdMBG, setKdMBG] = useState(false);

  // Filter values
  const [dept, setDept] = useState("000");
  const [deptkondisi, setDeptkondisi] = useState(""); // NEW: for advanced Kementerian filter
  const [katadept, setKatadept] = useState(""); // NEW: for advanced Kementerian filter
  const [kdunit, setKdunit] = useState("XX");
  const [unitkondisi, setUnitkondisi] = useState(""); // NEW: for advanced Unit filter
  const [kataunit, setKataunit] = useState(""); // NEW: for advanced Unit filter
  const [dekon, setDekon] = useState("XX");
  const [dekonkondisi, setDekonkondisi] = useState(""); // NEW: for advanced Dekon filter
  const [katadekon, setKatadekon] = useState(""); // NEW: for advanced Dekon filter
  const [prov, setProv] = useState("XX");
  const [lokasikondisi, setLokasikondisi] = useState(""); // NEW: for advanced Lokasi filter
  const [katalokasi, setKatalokasi] = useState(""); // NEW: for advanced Lokasi filter
  const [kabkota, setKabkota] = useState("XX");
  const [kabkotakondisi, setKabkotakondisi] = useState(""); // NEW: for advanced Kabkota filter
  const [katakabkota, setKatakabkota] = useState(""); // NEW: for advanced Kabkota filter
  const [kanwil, setKanwil] = useState("XX");
  const [kanwilkondisi, setKanwilkondisi] = useState(""); // NEW: for advanced Kanwil filter
  const [katakanwil, setKatakanwil] = useState(""); // NEW: for advanced Kanwil filter
  const [kppn, setKppn] = useState("XX");
  const [kppnkondisi, setKppnkondisi] = useState(""); // NEW: for advanced KPPN filter
  const [katakppn, setKatakppn] = useState(""); // NEW: for advanced KPPN filter
  const [satker, setSatker] = useState("XX");
  const [satkerkondisi, setSatkerkondisi] = useState(""); // NEW: for advanced Satker filter
  const [katasatker, setKatasatker] = useState(""); // NEW: for advanced Satker filter
  const [fungsi, setFungsi] = useState("XX");
  const [fungsikondisi, setFungsikondisi] = useState(""); // NEW: for advanced Fungsi filter
  const [katafungsi, setKatafungsi] = useState(""); // NEW: for advanced Fungsi filter
  const [sfungsi, setSfungsi] = useState("XX");
  const [subfungsikondisi, setSubfungsikondisi] = useState(""); // NEW: for advanced Subfungsi filter
  const [katasubfungsi, setKatasubfungsi] = useState(""); // NEW: for advanced Subfungsi filter
  const [program, setProgram] = useState("XX");
  const [programkondisi, setProgramkondisi] = useState(""); // NEW: for advanced Program filter
  const [kataprogram, setKataprogram] = useState(""); // NEW: for advanced Program filter
  const [giat, setGiat] = useState("XX");
  const [giatkondisi, setGiatkondisi] = useState(""); // NEW: for advanced Giat filter
  const [katagiat, setKatagiat] = useState(""); // NEW: for advanced Giat filter
  const [output, setOutput] = useState("XX");
  const [outputkondisi, setOutputkondisi] = useState(""); // NEW: for advanced Output filter
  const [kataoutput, setKataoutput] = useState(""); // NEW: for advanced Output filter
  const [soutput, setsOutput] = useState("XX");
  const [soutputkondisi, setSoutputkondisi] = useState(""); // NEW: for advanced Soutput filter
  const [katasoutput, setKatasoutput] = useState(""); // NEW: for advanced Soutput filter
  const [komponen, setKomponen] = useState("XX");
  const [komponenkondisi, setKomponenkondisi] = useState(""); // NEW: for advanced Komponen filter
  const [katakomponen, setKatakomponen] = useState(""); // NEW: for advanced Komponen filter
  const [skomponen, setSkomponen] = useState("XX");
  const [skomponenkondisi, setSkomponenkondisi] = useState(""); // NEW: for advanced Subkomponen filter
  const [kataskomponen, setKataskomponen] = useState(""); // NEW: for advanced Subkomponen filter
  const [akun, setAkun] = useState("AKUN");
  const [akunkondisi, setAkunkondisi] = useState(""); // NEW: for advanced Akun filter
  const [kataakun, setKataakun] = useState(""); // NEW: for advanced Akun filter
  const [sdana, setSdana] = useState("XX");
  const [sdanakondisi, setSdanakondisi] = useState(""); // NEW: for advanced Sdana filter
  const [katasdana, setKatasdana] = useState(""); // NEW: for advanced Sdana filter
  const [register, setRegister] = useState("XX");
  const [registerkondisi, setRegisterkondisi] = useState(""); // NEW: for advanced Register filter
  const [kataregister, setKataregister] = useState(""); // NEW: for advanced Register filter
  const [item, setItem] = useState("XX");
  const [itemkondisi, setItemkondisi] = useState(""); // NEW: for advanced Item filter
  const [kataitem, setKataitem] = useState(""); // NEW: for advanced Item filter
  const [blokir, setBlokir] = useState("XX");
  const [PN, setPN] = useState("XX");
  const [PP, setPP] = useState("XX");
  const [PRI, setPRI] = useState("XX");
  const [MP, setMP] = useState("XX");
  const [Tema, setTema] = useState("XX");
  const [Inflasi, setInflasi] = useState("XX");
  const [Stunting, setStunting] = useState("XX");
  const [Miskin, setMiskin] = useState("XX");
  const [Pemilu, setPemilu] = useState("XX");
  const [Ikn, setIkn] = useState("XX");
  const [Pangan, setPangan] = useState("XX");
  const [mbg, setmbg] = useState("XX");

  // Radio states
  const [deptradio, setDeptradio] = useState("1");
  const [unitradio, setUnitradio] = useState("1");
  const [dekonradio, setDekonradio] = useState("1");
  const [locradio, setLocradio] = useState("1"); // Changed from provradio to locradio
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
  const [komponenradio, setKomponenradio] = useState("1");
  const [skomponenradio, setSkomponenradio] = useState("1");
  const [akunradio, setAkunradio] = useState("1");
  const [sdanaradio, setSdanaradio] = useState("1");
  const [registerradio, setRegisterradio] = useState("1");
  const [itemradio, setItemradio] = useState("1");
  const [inflasiradio, setInflasiradio] = useState("1");
  const [iknradio, setIknradio] = useState("1");
  const [kemiskinanradio, setKemiskinanradio] = useState("1");
  const [priradio, setPriradio] = useState("1");
  const [panganradio, setPanganradio] = useState("1");
  const [stuntingradio, setStuntingradio] = useState("1");
  const [pemiluradio, setPemiluradio] = useState("1");
  const [pnradio, setPnradio] = useState("1");
  const [ppradio, setPpradio] = useState("1");
  const [mpradio, setMpradio] = useState("1");
  const [temaradio, setTemaradio] = useState("1");
  const [mbgradio, setmbgradio] = useState("1");

  // Special filter option states
  const [opsidept, setOpsidept] = useState("pilihdept");
  const [opsiInflasi, setOpsiInflasi] = useState("pilihInflasi");
  const [opsiIkn, setOpsiIkn] = useState("pilihikn");
  const [opsiKemiskinan, setOpsiKemiskinan] = useState("pilihKemiskinan");

  // SQL state
  const [sql, setSql] = useState("");
  const [from, setFrom] = useState("");
  const [select, setSelect] = useState(
    ", round(sum(a.pagu),0) as PAGU, round(sum(a.real1),0) as REALISASI, round(sum(a.blokir) ,0) as BLOKIR"
  );

  // Kegiatan Prioritas filter value and radio
  const [kegiatanprioritas, setKegiatanPrioritas] = useState("XX");
  const [kegiatanprioritasradio, setKegiatanPrioritasRadio] = useState("1");

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
    kditem,
    setKditem,
    kdblokir,
    setKdblokir,
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
    KdStunting,
    setKdStunting,
    KdPemilu,
    setKdPemilu,
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
    setKdMP,

    // Filter values
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
    prov,
    setProv,
    lokasikondisi,
    setLokasikondisi,
    katalokasi,
    setKatalokasi,
    kabkota,
    setKabkota,
    kabkotakondisi,
    setKabkotakondisi,
    katakabkota,
    setKatakabkota,
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
    fungsi,
    setFungsi,
    fungsikondisi,
    setFungsikondisi,
    katafungsi,
    setKatafungsi,
    sfungsi,
    setSfungsi,
    subfungsikondisi,
    setSubfungsikondisi,
    katasubfungsi,
    setKatasubfungsi,
    program,
    setProgram,
    programkondisi,
    setProgramkondisi,
    kataprogram,
    setKataprogram,
    giat,
    setGiat,
    giatkondisi,
    setGiatkondisi,
    katagiat,
    setKatagiat,
    output,
    setOutput,
    outputkondisi,
    setOutputkondisi,
    kataoutput,
    setKataoutput,
    soutput,
    setsOutput,
    soutputkondisi,
    setSoutputkondisi,
    katasoutput,
    setKatasoutput,
    komponen,
    setKomponen,
    komponenkondisi,
    setKomponenkondisi,
    katakomponen,
    setKatakomponen,
    skomponen,
    setSkomponen,
    skomponenkondisi,
    setSkomponenkondisi,
    kataskomponen,
    setKataskomponen,
    akun,
    setAkun,
    akunkondisi,
    setAkunkondisi,
    kataakun,
    setKataakun,
    sdana,
    setSdana,
    sdanakondisi,
    setSdanakondisi,
    katasdana,
    setKatasdana,
    register,
    setRegister,
    registerkondisi,
    setRegisterkondisi,
    kataregister,
    setKataregister,
    item,
    setItem,
    itemkondisi,
    setItemkondisi,
    kataitem,
    setKataitem,
    blokir,
    setBlokir,
    PN,
    setPN,
    PP,
    setPP,
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
    Pemilu,
    setPemilu,
    Ikn,
    setIkn,
    Pangan,
    setPangan,
    mbg,
    setmbg,

    // Radio states
    deptradio,
    setDeptradio,
    unitradio,
    setUnitradio,
    dekonradio,
    setDekonradio,
    locradio,
    setLocradio,
    kabkotaradio,
    setKabkotaradio,
    kanwilradio,
    setKanwilradio,
    kppnradio,
    setKppnradio,
    satkerradio,
    setSatkerradio,
    fungsiradio,
    setFungsiradio,
    subfungsiradio,
    setSubfungsiradio,
    programradio,
    setProgramradio,
    kegiatanradio,
    setKegiatanradio,
    outputradio,
    setOutputradio,
    soutputradio,
    setsOutputradio,
    komponenradio,
    setKomponenradio,
    skomponenradio,
    setSkomponenradio,
    akunradio,
    setAkunradio,
    sdanaradio,
    setSdanaradio,
    registerradio,
    setRegisterradio,
    itemradio,
    setItemradio,
    inflasiradio,
    setInflasiradio,
    iknradio,
    setIknradio,
    kemiskinanradio,
    setKemiskinanradio,
    priradio,
    setPriradio,
    panganradio,
    setPanganradio,
    stuntingradio,
    setStuntingradio,
    pemiluradio,
    setPemiluradio,
    pnradio,
    setPnradio,
    ppradio,
    setPpradio,
    mpradio,
    setMpradio,
    temaradio,
    setTemaradio,
    mbgradio,
    setmbgradio,

    // Special filter option states
    opsidept,
    setOpsidept,
    opsiInflasi,
    setOpsiInflasi,
    opsiIkn,
    setOpsiIkn,
    opsiKemiskinan,
    setOpsiKemiskinan,

    // SQL state
    sql,
    setSql,
    from,
    setFrom,
    select,
    setSelect,

    // Kegiatan Prioritas filter value and radio
    kegiatanprioritas,
    setKegiatanPrioritas,
    kegiatanprioritasradio,
    setKegiatanPrioritasRadio,
  };
}
