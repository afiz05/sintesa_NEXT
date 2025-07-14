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
import { exportToCSV, exportToExcel } from "./utils/exportUtils";

const InquiryModDeviasi = () => {
  // Use modular inquiry state hook
  const inquiry = useInquiryState();

  const context = useContext(MyContext);
  const { statusLogin, token, axiosJWT } = context;
  // Use modular query builder hook
  const { buildQuery } = useQueryBuilder(inquiry);
  // Destructure only needed state and setters for the 10 required filters
  const {
    loadingExcell,
    setloadingExcell,
    showModal,
    setShowModal,
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
    akumulatif,
    setAkumulatif,
    selectedFormat,
    setSelectedFormat,
    // Filter visibility states for the 10 required switches
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
    kdprogram,
    setKdprogram,
    kdgiat,
    setKdgiat,
    kdoutput,
    setKdoutput,
    kdakun,
    setKdakun,
    // Filter values and conditions for the 10 required switches
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
    akun,
    setAkun,
    akunkondisi,
    setAkunkondisi,
    kataakun,
    setKataakun,
    // Radio button states for the 10 required switches
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
    programradio,
    setProgramradio,
    kegiatanradio,
    setKegiatanradio,
    outputradio,
    setOutputradio,
    akunradio,
    setAkunradio,
    sql,
    setSql,
    from,
    setFrom,
    select,
    setSelect,
    akunType,
    akunValue,
    akunSql,
  } = inquiry;

  // Modal handlers (keeping only the ones that are used)

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

  // Add useEffect for handling parameter changes
  React.useEffect(() => {
    // Update SQL when these parameters change
    buildQuery();
  }, [thang, pembulatan]); // Only include the parameters we're actually using

  // Handler to turn all switches on/off (only for the 10 required switches)
  const handlePilihSemua = (isOn) => {
    setKddept(isOn);
    setUnit(isOn);
    setKddekon(isOn);
    setKdkanwil(isOn);
    setKdkppn(isOn);
    setKdsatker(isOn);
    setKdprogram(isOn);
    setKdgiat(isOn);
    setKdoutput(isOn);
    setKdakun(isOn);
  };

  // Handler to reset all filters and parameters to their initial state (only for the 10 required switches)
  const handleReset = () => {
    setJenlap("1");
    setThang(new Date().getFullYear().toString());
    setKddept(true);
    setUnit(false);
    setKddekon(false);
    setKdkanwil(false);
    setKdkppn(false);
    setKdsatker(false);
    setKdprogram(false);
    setKdgiat(false);
    setKdoutput(false);
    setKdakun(false);
    setPembulatan("1");
    // Reset filter values for the 10 switches
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
    setProgram("XX");
    setGiat("XX");
    setOutput("XX");
    setAkun("XX");
    // Reset radio button states for the 10 switches
    setDeptradio("1");
    setUnitradio("1");
    setDekonradio("1");
    setKanwilradio("1");
    setKppnradio("1");
    setSatkerradio("1");
    setProgramradio("1");
    setKegiatanradio("1");
    setOutputradio("1");
    setAkunradio("1");
    setSql("");
    setFrom("");
    setSelect(
      ", round(sum(a.pagu),0) as PAGU, round(sum(a.real1),0) as REALISASI, round(sum(a.blokir) ,0) as BLOKIR"
    );
  };

  // Add handlePDF for Export PDF modal
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

  // Add useEffect for handling Akun filter changes
  React.useEffect(() => {
    // Update SQL or other dependent values when Akun filter changes
    buildQuery();
  }, [akunType, akunValue, akunSql]);

  return (
    <div className="w-full">
      <div className="xl:px-8 p-6">
        <h2 className="text-2xl font-bold mb-6">Inquiry Deviasi Belanja</h2>

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

        {/* No conditional cards needed for basic Belanja/PNBP inquiry */}

        {/* Filter Section Card (new row) */}

        <FilterSection
          inquiryState={{
            // Report type for determining default switches
            jenlap,
            // Filter visibility states for the 10 required switches
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
            kdprogram,
            setKdprogram,
            kdgiat,
            setKdgiat,
            kdoutput,
            setKdoutput,
            kdakun,
            setKdakun,
            // Filter values and conditions for the 10 required switches
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
                {jenlap === "1"
                  ? "Belanja"
                  : jenlap === "2"
                  ? "Penerimaan Negara Bukan Pajak"
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
                    kdkanwil,
                    kdkppn,
                    kdsatker,
                    kdprogram,
                    kdgiat,
                    kdoutput,
                    kdakun,
                  ].filter(Boolean).length
                }{" "}
                dari{" "}
                {
                  [
                    kddept,
                    unit,
                    kddekon,
                    kdkanwil,
                    kdkppn,
                    kdsatker,
                    kdprogram,
                    kdgiat,
                    kdoutput,
                    kdakun,
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

export default InquiryModDeviasi;
