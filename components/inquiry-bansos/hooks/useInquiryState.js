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

  // Form states for inquiry-bansos
  const [jenlap, setJenlap] = useState("1"); // Default to "Realisasi Bansos"
  const [thang, setThang] = useState(new Date().getFullYear().toString());
  const [pembulatan, setPembulatan] = useState("1");
  const [akumulatif, setAkumulatif] = useState("0"); // Default to "Non-Akumulatif"
  const [selectedFormat, setSelectedFormat] = useState("pdf");
  const [export2, setExport2] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [showFormatDropdown, setShowFormatDropdown] = useState(false);

  // Filter switches for inquiry-bansos (10 filters)
  const [jenisbansos, setJenisbansos] = useState(true); // Jenis Bansos - default enabled
  const [kddept, setKddept] = useState(true); // Kementerian - default enabled
  const [unit, setUnit] = useState(false); // Eselon I
  const [kddekon, setKddekon] = useState(false); // Kewenangan
  const [kdsatker, setKdsatker] = useState(false); // Satker
  const [provinsi, setProvinsi] = useState(false); // Provinsi
  const [kabkota, setKabkota] = useState(false); // Kabupaten/Kota
  const [kecamatan, setKecamatan] = useState(false); // Kecamatan
  const [desa, setDesa] = useState(false); // Desa
  const [statustransaksi, setStatustransaksi] = useState(false); // Status Transaksi

  // Filter values for inquiry-bansos
  // Jenis Bansos filter
  const [bansostype, setBansostype] = useState("XX");
  const [bansoskondisi, setBansoskondisi] = useState("");
  const [katabansos, setKatabansos] = useState("");

  // Kementerian filter
  const [dept, setDept] = useState("000");
  const [deptkondisi, setDeptkondisi] = useState("");
  const [katadept, setKatadept] = useState("");

  // Eselon I filter
  const [kdunit, setKdunit] = useState("XX");
  const [unitkondisi, setUnitkondisi] = useState("");
  const [kataunit, setKataunit] = useState("");

  // Kewenangan filter
  const [dekon, setDekon] = useState("XX");
  const [dekonkondisi, setDekonkondisi] = useState("");
  const [katadekon, setKatadekon] = useState("");

  // Satker filter
  const [satker, setSatker] = useState("XX");
  const [satkerkondisi, setSatkerkondisi] = useState("");
  const [katasatker, setKatasatker] = useState("");

  // Provinsi filter
  const [prov, setProv] = useState("XX");
  const [lokasikondisi, setLokasikondisi] = useState("");
  const [katalokasi, setKatalokasi] = useState("");

  // Kabupaten/Kota filter
  const [kabkotavalue, setKabkotavalue] = useState("XX");
  const [kabkotakondisi, setKabkotakondisi] = useState("");
  const [katakabkota, setKatakabkota] = useState("");

  // Kecamatan filter
  const [kecamatanvalue, setKecamatanvalue] = useState("XX");
  const [kecamatankondisi, setKecamatankondisi] = useState("");
  const [katakecamatan, setKatakecamatan] = useState("");

  // Desa filter
  const [desavalue, setDesavalue] = useState("XX");
  const [desakondisi, setDesakondisi] = useState("");
  const [katadesa, setKatadesa] = useState("");

  // Status Transaksi filter
  const [statusvalue, setStatusvalue] = useState("XX");
  const [statuskondisi, setStatuskondisi] = useState("");
  const [katastatus, setKatastatus] = useState("");

  // Radio states for inquiry-bansos
  const [bansosradio, setBansosradio] = useState("1");
  const [deptradio, setDeptradio] = useState("1");
  const [unitradio, setUnitradio] = useState("1");
  const [dekonradio, setDekonradio] = useState("1");
  const [satkerradio, setSatkerradio] = useState("1");
  const [locradio, setLocradio] = useState("1");
  const [kabkotaradio, setKabkotaradio] = useState("1");
  const [kecamatanradio, setKecamatanradio] = useState("1");
  const [desaradio, setDesaradio] = useState("1");
  const [statusradio, setStatusradio] = useState("1");

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

    // Filter values for inquiry-bansos
    // Jenis Bansos
    bansostype,
    setBansostype,
    bansoskondisi,
    setBansoskondisi,
    katabansos,
    setKatabansos,

    // Kementerian
    dept,
    setDept,
    deptkondisi,
    setDeptkondisi,
    katadept,
    setKatadept,

    // Eselon I
    kdunit,
    setKdunit,
    unitkondisi,
    setUnitkondisi,
    kataunit,
    setKataunit,

    // Kewenangan
    dekon,
    setDekon,
    dekonkondisi,
    setDekonkondisi,
    katadekon,
    setKatadekon,

    // Satker
    satker,
    setSatker,
    satkerkondisi,
    setSatkerkondisi,
    katasatker,
    setKatasatker,

    // Provinsi
    prov,
    setProv,
    lokasikondisi,
    setLokasikondisi,
    katalokasi,
    setKatalokasi,

    // Kabupaten/Kota
    kabkotavalue,
    setKabkotavalue,
    kabkotakondisi,
    setKabkotakondisi,
    katakabkota,
    setKatakabkota,

    // Kecamatan
    kecamatanvalue,
    setKecamatanvalue,
    kecamatankondisi,
    setKecamatankondisi,
    katakecamatan,
    setKatakecamatan,

    // Desa
    desavalue,
    setDesavalue,
    desakondisi,
    setDesakondisi,
    katadesa,
    setKatadesa,

    // Status Transaksi
    statusvalue,
    setStatusvalue,
    statuskondisi,
    setStatuskondisi,
    katastatus,
    setKatastatus,

    // Radio states for inquiry-bansos
    bansosradio,
    setBansosradio,
    deptradio,
    setDeptradio,
    unitradio,
    setUnitradio,
    dekonradio,
    setDekonradio,
    satkerradio,
    setSatkerradio,
    locradio,
    setLocradio,
    kabkotaradio,
    setKabkotaradio,
    kecamatanradio,
    setKecamatanradio,
    desaradio,
    setDesaradio,
    statusradio,
    setStatusradio,

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
