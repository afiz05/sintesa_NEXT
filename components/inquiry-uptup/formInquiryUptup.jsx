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

const InquiryModUptup = () => {
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
    // Filter values and conditions for the 8 required filters
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
    // Radio states for the 8 required filters
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
    sql,
    setSql,
    from,
    setFrom,
    select,
    setSelect,
  } = inquiry;

  // Debug logging to track initial state
  console.log("=== FormInquiryUptup Debug ===");
  console.log("cutoffFilter state:", cutoffFilter);
  console.log("cutoff state:", cutoff);
  console.log("kddept state:", kddept);
  console.log("unit state:", unit);
  console.log("kddekon state:", kddekon);
  console.log("=== End FormInquiryUptup Debug ===");

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
      dept: inquiry.dept,
      kddept: inquiry.kddept,
      unit: inquiry.unit,
      kddekon: inquiry.kddekon,
      dekon: inquiry.dekon,
      thang: inquiry.thang,
      cutoff: inquiry.cutoff,
      cutoffFilter: inquiry.cutoffFilter,
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
    // Debug: Log the current jenlap state before generating SQL
    console.log("🔍 handlegetQuerySQL - Debug inquiry state:", {
      jenlap: inquiry.jenlap,
      cutoff: inquiry.cutoff,
      cutoffFilter: inquiry.cutoffFilter,
      type: typeof inquiry.jenlap,
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
  }, [thang, pembulatan]); // Remove buildQuery from dependencies to prevent infinite loops

  // Add ref to track if component has mounted (to avoid resetting on initial load)
  const hasMountedRef = React.useRef(false);

  // Handler to turn all switches on/off (only for the 7 controllable switches for UPTUP - cutoff is always on)
  const handlePilihSemua = (isOn) => {
    // Note: cutoffFilter is always true and not controllable
    setKddept(isOn);
    setUnit(isOn);
    setKddekon(isOn);
    setKdkanwil(isOn);
    setKdkppn(isOn);
    setKdsatker(isOn);
    setKdakun(isOn);
  };

  // Handler to reset all filters and parameters to their initial state (only for the 7 controllable filters for UPTUP - cutoff always on)
  const handleReset = () => {
    setJenlap("1");
    setThang(new Date().getFullYear().toString());
    setCutoff((new Date().getMonth() + 1).toString()); // Reset to current month
    // Note: cutoffFilter is always true and not controllable
    setKddept(true);
    setUnit(false);
    setKddekon(false);
    setKdkanwil(false);
    setKdkppn(false);
    setKdsatker(false);
    setKdakun(false);
    setDept("000");
    setKdunit("XX");
    setDekon("XX");
    setKanwil("XX");
    setKppn("XX");
    setKppnkondisi("");
    setKatakppn("");
    setSatker("XX");
    setSatkerkondisi("");
    setKatasatker("");
    setAkun("AKUN");
    setPembulatan("1");
    setDeptradio("1");
    setUnitradio("1");
    setDekonradio("1");
    setKanwilradio("1");
    setKppnradio("1");
    setSatkerradio("1");
    setAkunradio("1");
    setSql("");
    setFrom("");
    setSelect(", round(sum(rupiah)/1,0) as rupiah");
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
      <div className="xl:px-8 p-6">
        <h2 className="text-2xl font-bold mb-6">Inquiry Outstanding UP/TUP</h2>

        {/* Report Settings Card */}
        <ReportTypeSelector
          inquiryState={{
            jenlap,
            setJenlap,
            pembulatan,
            setPembulatan,
            thang,
            setThang,
          }}
        />

        {/* Filter Section Card (new row) */}

        <FilterSection
          inquiryState={{
            jenlap,
            cutoff,
            setCutoff,
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
            // Dekon filter values
            dekon,
            setDekon,
            dekonkondisi,
            setDekonkondisi,
            katadekon,
            setKatadekon,
            dekonradio,
            setDekonradio,
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
            // Akun filter values
            akun,
            setAkun,
            akunkondisi,
            setAkunkondisi,
            kataakun,
            setKataakun,
            akunradio,
            setAkunradio,
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
                {jenlap === "1" ? "Outstanding UP/TUP" : ""}
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
                    true, // cutoff is always active
                    kddept,
                    unit,
                    kddekon,
                    kdkanwil,
                    kdkppn,
                    kdsatker,
                    kdakun,
                  ].filter(Boolean).length
                }{" "}
                dari{" "}
                {
                  [
                    true, // cutoff is always active
                    kddept,
                    unit,
                    kddekon,
                    kdkanwil,
                    kdkppn,
                    kdsatker,
                    kdakun,
                  ].length
                }{" "}
                (Bulan: Wajib)
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

export default InquiryModUptup;
