import { Pesan } from "../notifikasi/Omspan";
import React, { useContext } from "react";
import MyContext from "../../utils/Context";
import SqlPreviewModal from "./components/Modals/SqlPreviewModal";
import SaveQueryModal from "./components/Modals/SaveQueryModal";
import ExportModal from "./components/Modals/ExportModal";
import InquiryModal from "./components/Modals/InquiryModal";
import FilterSection from "./components/FilterSelector";
import QueryButtons from "./components/QueryButtons";
import ReportTypeSelector from "./components/LaporanSelector";
import useInquiryState from "./hooks/useInquiryState";
import useQueryBuilder from "./hooks/useQueryBuilderModular";
import {
  exportToCSV,
  exportToExcel,
  exportToJSON,
  exportToText,
} from "./utils/exportUtils";

const InquiryMod = () => {
  // Use modular inquiry state hook
  const inquiry = useInquiryState();

  const context = useContext(MyContext);
  const { statusLogin, token, axiosJWT } = context;
  // Use modular query builder hook
  const { buildQuery } = useQueryBuilder(inquiry);
  // Destructure all needed state and setters from inquiry
  const {
    role,
    telp,
    verified,
    loadingExcell,
    setloadingExcell,
    kodekppn,
    kodekanwil,
    settampilAI,
    showModal,
    setShowModal,
    showModalKedua,
    setShowModalKedua,
    showModalsql,
    setShowModalsql,
    showModalPDF,
    setShowModalPDF,
    showModalsimpan,
    setShowModalsimpan,
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
    KdMP,
    setKdMP,
    KdKegPP,
    setKdKegPP,
    Pangan,
    setPangan,
    Pemilu,
    setPemilu,
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
    Ikn,
    setIkn,
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
    inflasiradio,
    setInflasiradio,
    iknradio,
    setIknradio,
    kemiskinanradio,
    setKemiskinanradio,
    pnradio,
    setPnradio,
    ppradio,
    setPpradio,
    kegppradio,
    setKegppradio,
    mpradio,
    setMpradio,
    temaradio,
    setTemaradio,
    panganradio,
    setPanganradio,
    stuntingradio,
    setStuntingradio,
    pemiluradio,
    setPemiluradio,
    priradio,
    setPriradio,
    opsiInflasi,
    setOpsiInflasi,
    opsiIkn,
    setOpsiIkn,
    opsiKemiskinan,
    setOpsiKemiskinan,
    sql,
    setSql,
    from,
    setFrom,
    select,
    setSelect,
  } = inquiry;

  // Debug logging to track initial state
  console.log("=== FormInquiryMod Debug ===");
  console.log("kddept state:", kddept);
  console.log("unit state:", unit);
  console.log("kddekon state:", kddekon);
  console.log("=== End FormInquiryMod Debug ===");

  // Modal handlers
  const openModalKedua = () => {
    setShowModalKedua(true);
    settampilAI(true);
  };

  const closeModalKedua = () => {
    setShowModalKedua(false);
    settampilAI(false);
  };

  // Replace generateSql with buildQuery in all handlers
  const handleGenerateExcel = () => {
    buildQuery(); // Call the function to build the query
    setloadingExcell(true);
  };

  const handleDataFetchComplete = (total) => {
    if (total > 0) {
      Pesan(`${total} data berhasil diexport`);
    } else {
      Pesan("Tidak Ada Data");
    }
    setloadingExcell(false);
  };

  // **UNIFIED QUERY GENERATION** - All functions now use the same query builder
  const generateUnifiedQuery = () => {
    // Debug: Log the current inquiry state before generating SQL
    console.log("🔍 generateUnifiedQuery - Debug inquiry state:", {
      jenlap: inquiry.jenlap,
      akumulatif: inquiry.akumulatif,
      dept: inquiry.dept,
      kddept: inquiry.kddept,
      unit: inquiry.unit,
      kddekon: inquiry.kddekon,
      dekon: inquiry.dekon,
      thang: inquiry.thang,
      cutoff: inquiry.cutoff,
      type: typeof inquiry.akumulatif,
      timestamp: new Date().toISOString(),
    });

    const sql = buildQuery(); // Use buildQuery() to get the complete SQL string

    // Safety check to ensure sql is a valid string before using substring
    if (typeof sql === "string" && sql.length > 0) {
      console.log("🔄 Query Generated:", sql.substring(0, 600)); // Debug log (show more characters)
    } else {
      console.log("🔄 Query Generated: (empty or invalid)"); // Debug log for empty/invalid queries
    }

    return sql;
  };

  // **DEBUGGING HELPER** - Get current query for monitoring
  const getCurrentQuery = () => {
    return generateUnifiedQuery();
  };

  const handlegetQuery = async () => {
    const sql = generateUnifiedQuery();
    inquiry.setSql(sql);
    setShowModal(true); // Always open InquiryModal
  };
  // **UPDATED** - SQL preview handler now uses unified query generation
  const handlegetQuerySQL = () => {
    // Debug: Log the current akumulatif state before generating SQL
    console.log("🔍 handlegetQuerySQL - Debug inquiry state:", {
      jenlap: inquiry.jenlap,
      akumulatif: inquiry.akumulatif,
      type: typeof inquiry.akumulatif,
      timestamp: new Date().toISOString(),
    });

    const latestSql = generateUnifiedQuery(); // Same query as execute
    inquiry.setSql(latestSql); // update global state
    setShowModalsql(true); // open modal
  };

  // Modal close handlers
  const closeModal = () => {
    setShowModal(false);
    setShowModalsimpan(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeModalsql = () => {
    setShowModalsql(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeModalsimpan = () => {
    setShowModalsimpan(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Add useEffect for handling cutoff changes
  React.useEffect(() => {
    // Update SQL or other dependent values when these parameters change
    const updateDependentValues = () => {
      // Call buildQuery to rebuild when parameters change
      buildQuery();
    };

    updateDependentValues();
  }, [thang, cutoff, pembulatan, akumulatif]); // Remove buildQuery from dependencies to prevent infinite loops

  // Add ref to track if component has mounted (to avoid resetting on initial load)
  const hasMountedRef = React.useRef(false);

  // Add useEffect for handling fungsi-subfungsi parent-child relationship
  React.useEffect(() => {
    // Skip the reset on initial mount
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    // Reset subfungsi to default when fungsi changes (after initial mount)
    // This ensures when user selects a different fungsi, subfungsi goes back to "Semua Sub Fungsi"
    // Also clear related advanced filtering states
    setSfungsi("XX");
    setSubfungsikondisi("");
    setKatasubfungsi("");
  }, [fungsi]);

  // Handler to turn all switches on/off
  const handlePilihSemua = (isOn) => {
    setTanggal(isOn);
    setKddept(isOn);
    setKddekon(isOn);
    setKdlokasi(isOn);
    setKdkabkota(isOn);
    setKdkanwil(isOn);
    setKdkppn(isOn);
    setKdsatker(isOn);
    setKdfungsi(isOn);
    setKdsfungsi(isOn);
    setKdprogram(isOn);
    setKdgiat(isOn);
    setKdoutput(isOn);
    setKdsoutput(isOn);
    setKdkomponen(isOn);
    setKdskomponen(isOn);
    setKdakun(isOn);
    setKdsdana(isOn);
    setKdregister(isOn);
    // Only set boolean switches, do not set 'unit' or other radio/select values
    setCutoff(isOn ? "12" : "0");
    setShowCutoffSelector(isOn);
  };

  // Handler to reset all filters and parameters to their initial state
  const handleReset = () => {
    setJenlap("2");
    setThang(new Date().getFullYear().toString());
    setTanggal(false);
    setKddept(true);
    setUnit(false);
    setKddekon(false);
    setKdlokasi(false);
    setKdkabkota(false);
    setKdkanwil(false);
    setKdkppn(false);
    setKdsatker(false);
    setKdfungsi(false);
    setKdsfungsi(false);
    setKdprogram(false);
    setKdgiat(false);
    setKdoutput(false);
    setKdsoutput(false);
    setKdkomponen(false);
    setKdskomponen(false);
    setKdakun(false);
    setKdsdana(false);
    setKdregister(false);
    setKdInflasi(false);
    setKdIkn(false);
    setKdKemiskinan(false);
    setKdPRI(false);
    setKdPangan(false);
    setKdPemilu(false);
    setKdStunting(false);
    setKdTema(false);
    setKdPN(false);
    setKdPP(false);
    setKdMP(false);
    setAkumulatif("0");
    setCutoff("0");
    setShowCutoffSelector(false);
    setPN("XX");
    setPP("XX");
    setKegPP("XX");
    setPRI("XX");
    setMP("XX");
    setTema("XX");
    setInflasi("XX");
    setStunting("XX");
    setMiskin("XX");
    setPemilu("XX");
    setIkn("XX");
    setPangan("XX");
    setDept("000");
    setKdunit("XX");
    setDekon("XX");
    setProv("XX");
    setKabkota("XX");
    setKabkotakondisi("");
    setKatakabkota("");
    setKanwil("XX");
    setKppn("XX");
    setKppnkondisi("");
    setKatakppn("");
    setSatker("XX");
    setSatkerkondisi("");
    setKatasatker("");
    setFungsi("XX");
    setFungsikondisi("");
    setKatafungsi("");
    setSfungsi("XX");
    setSubfungsikondisi("");
    setKatasubfungsi("");
    setProgram("XX");
    setGiat("XX");
    setOutput("XX");
    setsOutput("XX");
    setKomponen("XX");
    setSkomponen("XX");
    setAkun("XX");
    setSdana("XX");
    setRegister("XX");
    setPembulatan("1");
    setDeptradio("1");
    setUnitradio("1");
    setDekonradio("1");
    setLocradio("1");
    setKabkotaradio("1");
    setKanwilradio("1");
    setKppnradio("1");
    setSatkerradio("1");
    setFungsiradio("1");
    setSubfungsiradio("1");
    setProgramradio("1");
    setKegiatanradio("1");
    setOutputradio("1");
    setsOutputradio("1");
    setKomponenradio("1");
    setSkomponenradio("1");
    setAkunradio("1");
    setSdanaradio("1");
    setRegisterradio("1");
    setInflasiradio("1");
    setIknradio("1");
    setKemiskinanradio("1");
    setOpsiInflasi("pilihInflasi");
    setOpsiIkn("pilihikn");
    setOpsiKemiskinan("pilihKemiskinan");
    setSql("");
    setFrom("");
    setSelect(
      ", round(sum(a.pagu),0) as PAGU, round(sum(a.real1),0) as REALISASI, round(sum(a.blokir) ,0) as BLOKIR"
    );
  };

  // Add MP state if not present
  const [opsiMP, setOpsiMP] = React.useState("pilihmp");

  // Handler for MpRadio
  const handleRadioMP = (val) => setMPradio(val);

  // Add handlePDF for Export PDF modal (matches old form)
  const handlePDF = () => {
    setShowModalPDF(true);
  };

  // Add state to control visibility of CutoffMonthSelector
  const [showCutoffSelector, setShowCutoffSelector] = React.useState(
    cutoff !== "0"
  );

  // Add state for SaveQueryModal
  const [showSaveQueryModal, setShowSaveQueryModal] = React.useState(false);

  // Helper to fetch data from backend using current filters/query
  // **UPDATED** - Export data fetcher now uses unified query generation
  async function fetchExportData() {
    console.log("fetchExportData called"); // Debug log to confirm function call
    // Use the same query builder as execute and show SQL
    const sql = generateUnifiedQuery(); // Consistent with all other operations
    if (!sql || typeof sql !== "string" || sql.trim() === "") {
      Pesan("Query tidak valid, silakan cek filter dan parameter.");
      console.error("Export aborted: SQL query is empty or invalid.", { sql });
      return [];
    }
    // If not logged in, return empty array
    if (!statusLogin) {
      console.log("Not logged in, cannot export data.");
      return [];
    }

    try {
      // Use the same backend URL as in InquiryModal
      const backendUrl = "http://localhost:88";
      const response = await axiosJWT.post(
        `${backendUrl}/next/inquiry`,
        {
          sql,
          page: 1, // Export all data from first page (adjust if backend supports full export)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Debug: Log the full backend response
      console.log("[Export Debug] Backend response:", response.data);
      // If backend supports returning all data for export, use that.
      // Otherwise, you may need to adjust API/backend to support full export.
      if (response.data && Array.isArray(response.data.data)) {
        return response.data.data;
      }
      return [];
    } catch (e) {
      console.error("Export API error:", e);
      if (e && e.response) {
        console.error(
          "[Export Debug] Backend error response:",
          e.response.data
        );
      }
      return [];
    }
  }

  // Robust Excel export handler (fetches fresh data)
  const handleExportExcel = async () => {
    setloadingExcell(true);
    try {
      const exportData = await fetchExportData();
      if (!exportData || !exportData.length) {
        Pesan("Tidak ada data untuk diexport");
        setloadingExcell(false);
        return;
      }
      await exportToExcel(exportData, "inquiry_data.xlsx");
      Pesan("Data berhasil diexport ke Excel");
    } catch (e) {
      Pesan("Gagal export Excel");
    }
    setloadingExcell(false);
  };

  // Robust CSV export handler (fetches fresh data)
  const handleExportCSV = async () => {
    setloadingExcell(true);
    try {
      const exportData = await fetchExportData();
      if (!exportData || !exportData.length) {
        Pesan("Tidak ada data untuk diexport");
        setloadingExcell(false);
        return;
      }
      exportToCSV(exportData, "inquiry_data.csv");
      Pesan("Data berhasil diexport ke CSV");
    } catch (e) {
      Pesan("Gagal export CSV");
    }
    setloadingExcell(false);
  };

  // Robust JSON export handler (fetches fresh data)
  const handleExportJSON = async () => {
    setloadingExcell(true);
    try {
      const exportData = await fetchExportData();
      if (!exportData || !exportData.length) {
        Pesan("Tidak ada data untuk diexport");
        setloadingExcell(false);
        return;
      }
      exportToJSON(exportData, "inquiry_data.json");
      Pesan("Data berhasil diexport ke JSON");
    } catch (e) {
      Pesan("Gagal export JSON");
    }
    setloadingExcell(false);
  };

  // Robust Text export handler (fetches fresh data)
  const handleExportText = async () => {
    setloadingExcell(true);
    try {
      const exportData = await fetchExportData();
      if (!exportData || !exportData.length) {
        Pesan("Tidak ada data untuk diexport");
        setloadingExcell(false);
        return;
      }
      exportToText(exportData, "inquiry_data.txt");
      Pesan("Data berhasil diexport ke Text");
    } catch (e) {
      Pesan("Gagal export Text");
    }
    setloadingExcell(false);
  };

  return (
    <div className="w-full">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Inquiry Data</h2>

        {/* Report Settings Card */}
        <ReportTypeSelector
          inquiryState={{
            jenlap,
            setJenlap,
            pembulatan,
            setPembulatan,
            akumulatif,
            setAkumulatif,
            thang,
            setThang,
          }}
        />

        {/* Filter Section Card (new row) */}

        <FilterSection
          inquiryState={{
            // Report type for determining default switches
            jenlap,
            // Basic form states
            tanggal,
            setTanggal,
            cutoff,
            setCutoff,
            showCutoffSelector,
            setShowCutoffSelector,
            akumulatif,
            setAkumulatif,
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
            // Department filter values
            dept,
            setDept,
            deptkondisi,
            setDeptkondisi,
            katadept,
            setKatadept,
            deptradio,
            setDeptradio,
            // Unit filter values
            kdunit,
            setKdunit,
            unitkondisi,
            setUnitkondisi,
            kataunit,
            setKataunit,
            unitradio,
            setUnitradio,
            // Location filter values
            prov,
            setProv,
            lokasikondisi,
            setLokasikondisi,
            katalokasi,
            setKatalokasi,
            locradio,
            setLocradio,
            // Dekon filter values
            dekon,
            setDekon,
            dekonkondisi,
            setDekonkondisi,
            katadekon,
            setKatadekon,
            dekonradio,
            setDekonradio,
            // Kabkota filter values
            kabkota,
            setKabkota,
            kabkotakondisi,
            setKabkotakondisi,
            katakabkota,
            setKatakabkota,
            kabkotaradio,
            setKabkotaradio,
            // Kanwil filter values
            kanwil,
            setKanwil,
            kanwilkondisi,
            setKanwilkondisi,
            katakanwil,
            setKatakanwil,
            kanwilradio,
            setKanwilradio,
            // KPPN filter values
            kppn,
            setKppn,
            kppnkondisi,
            setKppnkondisi,
            katakppn,
            setKatakppn,
            kppnradio,
            setKppnradio,
            // Satker filter values
            satker,
            setSatker,
            satkerkondisi,
            setSatkerkondisi,
            katasatker,
            setKatasatker,
            satkerradio,
            setSatkerradio,
            // Fungsi filter values
            fungsi,
            setFungsi,
            fungsikondisi,
            setFungsikondisi,
            katafungsi,
            setKatafungsi,
            fungsiradio,
            setFungsiradio,
            // Sub-fungsi filter values
            sfungsi,
            setSfungsi,
            subfungsikondisi,
            setSubfungsikondisi,
            katasubfungsi,
            setKatasubfungsi,
            subfungsiradio,
            setSubfungsiradio,
            // Special states needed by FilterSelector
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
            KdMP,
            setKdMP,
            KdKegPP,
            setKdKegPP,
            // Kegiatan Prioritas filter values
            KegPP,
            setKegPP,
            kegppradio,
            setKegppradio,
            // Program filter values
            program,
            setProgram,
            programkondisi,
            setProgramkondisi,
            kataprogram,
            setKataprogram,
            programradio,
            setProgramradio,
            // Kegiatan filter values
            giat,
            setGiat,
            giatkondisi,
            setGiatkondisi,
            katagiat,
            setKatagiat,
            kegiatanradio,
            setKegiatanradio,
            // Output filter values
            output,
            setOutput,
            outputkondisi,
            setOutputkondisi,
            kataoutput,
            setKataoutput,
            outputradio,
            setOutputradio,
            // Sub-output filter values
            soutput,
            setsOutput,
            soutputkondisi,
            setSoutputkondisi,
            katasoutput,
            setKatasoutput,
            soutputradio,
            setsOutputradio,
            // Komponen filter values
            komponen,
            setKomponen,
            komponenkondisi,
            setKomponenkondisi,
            katakomponen,
            setKatakomponen,
            komponenradio,
            setKomponenradio,
            // Subkomponen filter values
            skomponen,
            setSkomponen,
            skomponenkondisi,
            setSkomponenkondisi,
            kataskomponen,
            setKataskomponen,
            skomponenradio,
            setSkomponenradio,
            // Akun filter values
            akun,
            setAkun,
            akunkondisi,
            setAkunkondisi,
            kataakun,
            setKataakun,
            akunradio,
            setAkunradio,
            // Sumber Dana filter values
            sdana,
            setSdana,
            sdanakondisi,
            setSdanakondisi,
            katasdana,
            setKatasdana,
            sdanaradio,
            setSdanaradio,
            // Register filter values
            register,
            setRegister,
            registerkondisi,
            setRegisterkondisi,
            kataregister,
            setKataregister,
            registerradio,
            setRegisterradio,
            // New modularized filter states
            kdInflasi,
            setKdInflasi,
            Inflasi,
            setInflasi,
            inflasiradio,
            setInflasiradio,
            opsiInflasi,
            setOpsiInflasi,
            kdIkn,
            setKdIkn,
            Ikn,
            setIkn,
            iknradio,
            setIknradio,
            opsiIkn,
            setOpsiIkn,
            kdKemiskinan,
            setKdKemiskinan,
            Miskin,
            setMiskin,
            kemiskinanradio,
            setKemiskinanradio,
            opsiKemiskinan,
            setOpsiKemiskinan,
            // Add new special filter states
            Pangan,
            setPangan,
            panganradio,
            setPanganradio,
            Stunting,
            setStunting,
            stuntingradio,
            setStuntingradio,
            Pemilu,
            setPemilu,
            pemiluradio,
            setPemiluradio,
            PN,
            setPN,
            pnradio,
            setPnradio,
            PP,
            setPP,
            ppradio,
            setPpradio,
            MP,
            setMP,
            mpradio,
            setMpradio,
            Tema,
            setTema,
            temaradio,
            setTemaradio,
            PRI,
            setPRI,
            priradio,
            setPriradio,
            // Add other state/handlers as needed
          }}
        />

        {/* Add SwitchesGrid for parameter toggles */}
        <div className="my-6"></div>

        {/* Action Buttons */}
        <QueryButtons
          onExecuteQuery={handlegetQuery}
          onExportExcel={handleExportExcel}
          onExportCSV={handleExportCSV}
          onExportPDF={handlePDF}
          onReset={handleReset}
          isLoading={loadingExcell}
          onSaveQuery={() => setShowSaveQueryModal(true)}
          onShowSQL={handlegetQuerySQL}
        />
      </div>

      {/* Modals */}
      {showModalsql && (
        <SqlPreviewModal
          isOpen={showModalsql}
          onClose={closeModalsql}
          query={sql}
        />
      )}

      {showModal && (
        <InquiryModal
          isOpen={showModal}
          onClose={closeModal}
          sql={sql}
          from={from}
          thang={thang}
        />
      )}

      {showModalsimpan && (
        <SaveQueryModal
          isOpen={showModalsimpan}
          onClose={closeModalsimpan}
          sql={sql}
        />
      )}

      {showModalPDF && (
        <ExportModal
          showModalPDF={showModalPDF}
          setShowModalPDF={setShowModalPDF}
          selectedFormat={selectedFormat}
          setSelectedFormat={setSelectedFormat}
          fetchExportData={fetchExportData}
          filename="inquiry_data"
          loading={loadingExcell}
        />
      )}

      {/* Save Query Modal */}
      {showSaveQueryModal && (
        <SaveQueryModal
          isOpen={showSaveQueryModal}
          onClose={() => setShowSaveQueryModal(false)}
          query={sql}
          thang={thang}
          queryType={"INQUIRY"}
        />
      )}
    </div>
  );
};

export default InquiryMod;

// Example placeholder for data fetching (should be replaced with real API call)
async function fetchDataFromAPI() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  // Return mock data
  return [
    { id: 1, name: "Contoh Data 1", value: 100 },
    { id: 2, name: "Contoh Data 2", value: 200 },
  ];
}
