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

const InquiryModRkakl = () => {
  // Use modular inquiry state hook
  const inquiry = useInquiryState();

  const context = useContext(MyContext);
  const { statusLogin, token, axiosJWT } = context;
  // Use modular query builder hook
  const { buildQuery } = useQueryBuilder(inquiry);
  // Destructure all needed state and setters from inquiry
  const {
    loadingExcell,
    setloadingExcell,
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
    cutoff,
    setCutoff,
    pembulatan,
    setPembulatan,
    akumulatif,
    setAkumulatif,
    selectedFormat,
    setSelectedFormat,
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
    // Item filter values
    item,
    setItem,
    itemkondisi,
    setItemkondisi,
    kataitem,
    setKataitem,
    itemradio,
    setItemradio,
    // Blokir filter values
    blokir,
    setBlokir,
    sql,
    setSql,
    from,
    setFrom,
    akunType,
    akunValue,
    akunSql,
  } = inquiry;

  // **UNIFIED QUERY GENERATION** - All functions now use the same query builder
  const generateUnifiedQuery = () => {
    const sql = buildQuery(); // Use buildQuery() to get the complete SQL string

    // Safety check to ensure sql is a valid string before using substring
    if (typeof sql === "string" && sql.length > 0) {
    } else {
    }

    return sql;
  };

  const handlegetQuery = async () => {
    const sql = generateUnifiedQuery();
    inquiry.setSql(sql);
    setShowModal(true); // Always open InquiryModal
  };

  const handlegetQuerySQL = () => {
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

  // Removed unused handlePilihSemua handler

  // Handler to reset all filters and parameters to their initial state
  const handleReset = () => {
    setJenlap("1");
    setThang(new Date().getFullYear().toString());
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
    setKditem(false);
    setKdregister(false);
    setKdblokir(false);
    setAkumulatif("0");
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
    setSql("");
    setFrom("");
  };

  // Add handlePDF for Export PDF modal (matches old form)
  const handlePDF = () => {
    setShowModalPDF(true);
  };

  // Add state for SaveQueryModal
  const [showSaveQueryModal, setShowSaveQueryModal] = React.useState(false);

  // Helper to fetch data from backend using current filters/query
  // **UPDATED** - Export data fetcher now uses unified query generation
  async function fetchExportData() {
    // Use the same query builder as execute and show SQL
    const sql = generateUnifiedQuery(); // Consistent with all other operations
    if (!sql || typeof sql !== "string" || sql.trim() === "") {
      Pesan("Query tidak valid, silakan cek filter dan parameter.");
      console.error("Export aborted: SQL query is empty or invalid.", { sql });
      return [];
    }
    // If not logged in, return empty array
    if (!statusLogin) {
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

  // Add useEffect for handling Akun filter changes
  React.useEffect(() => {
    // Update SQL or other dependent values when Akun filter changes
    buildQuery();
  }, [akunType, akunValue, akunSql]);

  return (
    <div className="w-full">
      <div className="xl:px-8 p-6">
        <h2 className="text-2xl font-bold mb-6">Inquiry Data RKAKL DIPA</h2>

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
            // Item filter values (using correct state variables)
            item,
            setItem,
            itemkondisi,
            setItemkondisi,
            kataitem,
            setKataitem,
            itemradio,
            setItemradio,
            // Register filter values
            register,
            setRegister,
            registerkondisi,
            setRegisterkondisi,
            kataregister,
            setKataregister,
            registerradio,
            setRegisterradio,
            // Blokir filter values (using correct state variables)
            blokir,
            setBlokir,
          }}
        />

        {/* Add SwitchesGrid for parameter toggles */}
        <div className="my-3 sm:px-16">
          <div className="flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap gap-2 border-2 dark:border-zinc-600 rounded-xl shadow-sm py-2 px-4 font-mono tracking-wide bg-zinc-100 dark:bg-black">
            <div className="text-xs">
              <span className="font-semibold text-blue-600 ml-4">
                Tahun Anggaran:
              </span>
              <span className="ml-2">{thang}</span>
            </div>
            <div className="text-xs">
              <span className="font-semibold text-green-600 ml-4">
                Jenis Laporan:
              </span>
              <span className="ml-2">
                {jenlap === "1"
                  ? "Prioritas Nasional"
                  : jenlap === "2"
                  ? "Major Project"
                  : jenlap === "3"
                  ? "Tematik Anggaran"
                  : jenlap === "4"
                  ? "Inflasi"
                  : jenlap === "5"
                  ? "Penanganan Stunting"
                  : jenlap === "6"
                  ? "Belanja Pemilu"
                  : jenlap === "7"
                  ? "Kemiskinan Ekstrim"
                  : jenlap === "8"
                  ? "Ibu Kota Nusantara"
                  : jenlap === "9"
                  ? "Ketahanan Pangan"
                  : jenlap === "10"
                  ? "Bantuan Pemerintah"
                  : jenlap === "11"
                  ? "Makanan Bergizi Gratis"
                  : jenlap === "12"
                  ? "Swasembada Pangan"
                  : "Unknown"}
              </span>
            </div>
            <div className="text-xs">
              <span className="font-semibold text-purple-600 ml-4">
                Pembulatan:
              </span>
              <span className="ml-2">
                {pembulatan === "1"
                  ? "Rupiah"
                  : pembulatan === "1000"
                  ? "Ribuan"
                  : pembulatan === "1000000"
                  ? "Jutaan"
                  : pembulatan === "1000000000"
                  ? "Miliaran"
                  : "Triliunan"}
              </span>
            </div>
            <div className="text-xs">
              <span className="font-semibold text-orange-600 ml-4">
                Filter Aktif:
              </span>
              <span className="ml-2">
                {
                  [
                    kddept,
                    unit,
                    kddekon,
                    kdlokasi,
                    kdkabkota,
                    kdkanwil,
                    kdkppn,
                    kdsatker,
                    kdfungsi,
                    kdsfungsi,
                    kdprogram,
                    kdgiat,
                    kdoutput,
                    kdsoutput,
                    kdkomponen,
                    kdskomponen,
                    kdakun,
                    kdsdana,
                    kditem,
                    kdregister,
                    kdblokir,
                  ].filter(Boolean).length
                }{" "}
                dari{" "}
                {
                  [
                    kddept,
                    unit,
                    kddekon,
                    kdlokasi,
                    kdkabkota,
                    kdkanwil,
                    kdkppn,
                    kdsatker,
                    kdfungsi,
                    kdsfungsi,
                    kdprogram,
                    kdgiat,
                    kdoutput,
                    kdsoutput,
                    kdkomponen,
                    kdskomponen,
                    kdakun,
                    kdsdana,
                    kditem,
                    kdregister,
                    kdblokir,
                  ].length
                }
              </span>
            </div>
          </div>
        </div>

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
          pembulatan={pembulatan}
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

export default InquiryModRkakl;
