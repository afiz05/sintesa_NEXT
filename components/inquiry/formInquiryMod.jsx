import { Pesan } from "../notifikasi/Omspan";
import React, { useContext } from "react";
import MyContext from "../../utils/Context";
import SqlPreviewModal from "./components/Modals/SqlPreviewModal";
import SaveQueryModal from "./components/Modals/SaveQueryModal";
import ExportModal from "./components/Modals/ExportModal";
import BlokirModal from "./components/Modals/BlokirModal";
import PNModal from "./components/Modals/PNModal";
import InquiryModal from "./components/Modals/InquiryModal";
import ApbnModal from "./components/Modals/ApbnModal";
import AkumulasiModal from "./components/Modals/AkumulasiModal";
import BulananModal from "./components/Modals/BulananModal";
import JnsBlokirModal from "./components/Modals/JnsBlokirModal";
import PN2Modal from "./components/Modals/PN2Modal";
import SwitchesGrid from "./switchesGrid";
import Thang from "../referensi_belanja/Thang";
import Kddept from "../referensi_belanja/Kddept";
import Kdunit from "../referensi_belanja/Kdunit";
import Kddekon from "../referensi_belanja/Kddekon";
import Kdlokasi from "../referensi_belanja/Kdlokasi";
import Kdkabkota from "../referensi_belanja/Kdkabkota";
import Kdkanwil from "../referensi_belanja/Kdkanwil";
import Kdkppn from "../referensi_belanja/Kdkppn";
import Kdsatker from "../referensi_belanja/Kdsatker";
import Kdfungsi from "../referensi_belanja/Kdfungsi";
import Kdsfungsi from "../referensi_belanja/Kdsfungsi";
import Kdprogram from "../referensi_belanja/Kdprogram";
import Kdgiat from "../referensi_belanja/Kdgiat";
import Kdoutput from "../referensi_belanja/Kdoutput";
import Kdakun from "../referensi_belanja/Kdakun";
import Kdsdana from "../referensi_belanja/Kdsdana";
import Kdregister from "../referensi_belanja/Kdregister";
import AccountFilter from "./components/FilterGroups/AccountFilter";
import KementerianFilter from "./components/FilterGroups/KementerianFilter";
import FunctionFilter from "./components/FilterGroups/FunctionFilter";
import FundingFilter from "./components/FilterGroups/FundingFilter";
import LokasiFilter from "./components/FilterGroups/LokasiFilter";
import OutputFilter from "./components/FilterGroups/ProgramFilter";
import UnitFilter from "./components/FilterGroups/UnitFilter";
import ProgramFilter from "./components/FilterGroups/ProgramFilter";
import DekonFilter from "./components/FilterGroups/DekonFilter";
import DisplayOptions from "./components/DisplayOptions";
import FilterSection from "./components/FilterSection";
import QueryButtons from "./components/QueryButtons";
import ReportTypeSelector from "./components/ReportTypeSelector";

import useInquiryState from "./hooks/useInquiryState";
import useQueryBuilder from "./hooks/useQueryBuilder";
import IknRadio from "../inquiry/radio/IknRadio";
import JenisIkn from "../referensi_belanja/JenisIkn";
import InflasiRadio from "../inquiry/radio/InflasiRadio";
import JenisInflasiInquiry from "../referensi_belanja/JenisInflasiInquiry";
import MiskinRadio from "../inquiry/radio/MiskinRadio";
import JenisMiskin from "../referensi_belanja/JenisMiskin";
import MpRadio from "../inquiry/radio/MpRadio";
import KodePRI from "../referensi_belanja/KdPRI";
import PriRadio from "./radio/priRadio";
import InputPRI from "./kondisi/InputPRI";
import JenisPangan from "../referensi_belanja/JenisPangan";
import PanganRadio from "./radio/PanganRadio";
import JenisPemilu from "../referensi_belanja/JenisPemilu";
import PemiluRadio from "./radio/PemiluRadio";
import JenisStuntingInquiry from "../referensi_belanja/JenisStuntingInquiry";
import StuntingRadio from "./radio/StuntingRadio";
import CutoffMonthSelector from "./CutoffMonthSelector";

const InquiryMod = () => {
  // Use modular inquiry state hook
  const inquiry = useInquiryState();
  // Use modular query builder hook
  const { buildQuery, generateSqlPreview } = useQueryBuilder(inquiry);
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
    deptradio,
    setDeptradio,
    unitradio,
    setUnitradio,
    dekonradio,
    setDekonradio,
    provradio,
    setProvradio,
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
    akunradio,
    setAkunradio,
    sdanaradio,
    setSdanaradio,
    registerradio,
    setRegisterradio,
    sql,
    setSql,
    from,
    setFrom,
    select,
    setSelect,
  } = inquiry;

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
    buildQuery();
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

  const handlegetQuery = () => {
    buildQuery();
    if (jenlap === "1") {
      setShowModalApbn(true);
    } else if (jenlap === "2") {
      setShowModal(true);
      setShowModalKedua(true);
      settampilAI(true);
    } else if (jenlap === "3") {
      setShowModalAkumulasi(true);
    } else if (jenlap === "4") {
      setShowModalBulanan(true);
    } else if (jenlap === "5") {
      setShowModalBlokir(true);
    } else if (jenlap === "6" && thang > "2020") {
      setShowModalPN(true);
    } else if (jenlap === "6" && thang < "2021") {
      setShowModalPN2(true);
    } else if (jenlap === "7" && thang >= "2024") {
      setShowModalJnsblokir(true);
    }
  };

  const handlegetQuerySQL = () => {
    buildQuery();
    setShowModalsql(true);
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

  const closeModalApbn = () => {
    setShowModalApbn(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeModalAkumulasi = () => {
    setShowModalAkumulasi(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeModalBulanan = () => {
    setShowModalBulanan(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeModalBlokir = () => {
    setShowModalBlokir(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeModalPN = () => {
    setShowModalPN(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeModalPN2 = () => {
    setShowModalPN2(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeModalJnsblokir = () => {
    setShowModalJnsblokir(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeModalsimpan = () => {
    setShowModalsimpan(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Add these handlers before the return statement
  const handleJenlap = (jenlapopt) => {
    const { akumulatif, selectedValue } = jenlapopt;
    setAkumulatif(akumulatif);
    setJenlap(selectedValue);
  };

  const handleSimpan = () => {
    buildQuery();
    setShowModalsimpan(true);
  };

  const handleThang = (thang) => {
    setThang(thang);
  };

  const handleCutoff = (cutoff) => {
    setCutoff(cutoff);
  };

  const handlePembulatan = (pembulatan) => {
    setPembulatan(pembulatan);
  };

  // Add useEffect for handling cutoff changes
  React.useEffect(() => {
    // Update SQL or other dependent values when these parameters change
    const updateDependentValues = () => {
      // Your logic here
    };

    updateDependentValues();
  }, [thang, cutoff, pembulatan]);

  // Handler to turn all switches on/off
  const handlePilihSemua = (isOn) => {
    setTanggal(isOn);
    setKddept(isOn);
    setKddekon(isOn);
    setKdprov(isOn);
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
    setThang(new Date().getFullYear());
    setTanggal(false);
    setKddept(true);
    setUnit(false);
    setKddekon(false);
    setKdprov(false);
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
    setKdakun(false);
    setKdsdana(false);
    setKdregister(false);
    setAkumulatif(false);
    setCutoff("12");
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
    setKanwil("XX");
    setKppn("XX");
    setSatker("XX");
    setFungsi("XX");
    setSfungsi("XX");
    setProgram("XX");
    setGiat("XX");
    setOutput("XX");
    setsOutput("XX");
    setAkun("XX");
    setSdana("XX");
    setRegister("XX");
    setPembulatan("1");
    setDeptradio("1");
    setUnitradio("1");
    setDekonradio("1");
    setProvradio("1");
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
    setAkunradio("1");
    setSdanaradio("1");
    setRegisterradio("1");
    setSql("");
    setFrom("");
    setSelect(
      ", round(sum(a.pagu),0) as PAGU, round(sum(a.real1),0) as REALISASI, round(sum(a.blokir) ,0) as BLOKIR"
    );
  };

  // Add IKN state if not present
  const [Ikn, setIkn] = React.useState("XX");
  const [iknradio, setIknradio] = React.useState("1");
  const [opsiIkn, setOpsiIkn] = React.useState("pilihIkn");

  // Handler for JenisIkn select
  const handleIkn = (val) => setIkn(val);
  // Handler for IknRadio
  const handleRadioChangeIkn = (val) => setIknradio(val);

  // Remove duplicate Inflasi state declaration
  const [inflasiradio, setInflasiradio] = React.useState("1");
  const [opsiInflasi, setOpsiInflasi] = React.useState("pilihInflasi");

  // Handler for JenisInflasiInquiry select
  const handleInflasi = (val) => setInflasi(val);
  // Handler for InflasiRadio
  const handleRadioChangeInflasi = (val) => setInflasiradio(val);

  // Miskin state and handlers
  const [miskinradio, setMiskinradio] = React.useState("1");
  const [opsiMiskin, setOpsiMiskin] = React.useState("pilihMiskin");

  const handleMiskin = (val) => setMiskin(val);
  const handleRadioChangeMiskin = (val) => setMiskinradio(val);

  // Add MP state if not present
  const [mpradio, setMPradio] = React.useState("1");
  const [opsiMP, setOpsiMP] = React.useState("pilihmp");

  // Handler for MpRadio
  const handleRadioMP = (val) => setMPradio(val);

  // Add PRI state and handlers
  const [KdPRI, setKdPRI] = React.useState(false);
  const [opsiPRI, setOpsiPRI] = React.useState("pilihPRI");
  const [priradio, setPriradio] = React.useState("1");
  const [priKondisi, setPriKondisi] = React.useState("");

  const handleRadioChangePRI = (e) => {
    setOpsiPRI(e.target.value);
  };
  const handleRadioPri = (val) => setPriradio(val);
  const handlePRI = (val) => setPRI(val);
  const handlePRIKondisi = (val) => setPriKondisi(val);

  // Add Pangan state and handlers
  const [KdPangan, setKdPangan] = React.useState(false);
  const [opsiPangan, setOpsiPangan] = React.useState("pilihPangan");
  const [panganradio, setPanganradio] = React.useState("1");
  const [Pangan, setPangan] = React.useState("XX");

  const handleRadioChangePangan = (e) => {
    setOpsiPangan(e.target.value);
    const isChecked = e.target.value;
    const value = isChecked === "pilihPangan" ? 5 : 0;
    value === 0 ? setPanganradio("2") : setPanganradio("1");
  };
  const handlePangan = (val) => setPangan(val);
  const handlePanganRadio = (val) => setPanganradio(val);

  // Add Pemilu state and handlers
  const [KdPemilu, setKdPemilu] = React.useState(false);
  const [opsiPemilu, setOpsiPemilu] = React.useState("pilihPemilu");
  const [pemiluradio, setPemiluradio] = React.useState("1");
  const [Pemilu, setPemilu] = React.useState("XX");

  const handleRadioChangePemilu = (e) => {
    setOpsiPemilu(e.target.value);
    const isChecked = e.target.value;
    const value = isChecked === "pilihPemilu" ? 5 : 0;
    value === 0 ? setPemiluradio("2") : setPemiluradio("1");
  };
  const handlePemilu = (val) => setPemilu(val);
  const handlePemiluRadio = (val) => setPemiluradio(val);

  // Add Stunting state and handlers
  const [KdStunting, setKdStunting] = React.useState(false);
  const [opsiStunting, setOpsiStunting] = React.useState("pilihStunting");
  const [stuntingradio, setStuntingradio] = React.useState("1");

  const handleRadioChangeStunting = (e) => {
    setOpsiStunting(e.target.value);
    const isChecked = e.target.value;
    const value = isChecked === "pilihStunting" ? 5 : 0;
    value === 0 ? setStuntingradio("2") : setStuntingradio("1");
  };
  const handleStunting = (val) => setStunting(val);
  const handleStuntingRadio = (val) => setStuntingradio(val);

  // Add handlePDF for Export PDF modal (matches old form)
  const handlePDF = () => {
    setShowModalPDF(true);
  };

  // Add state to control visibility of CutoffMonthSelector
  const [showCutoffSelector, setShowCutoffSelector] = React.useState(
    cutoff !== "0"
  );

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
            thang,
            setThang,
          }}
        />

        {/* Filter Section Card (new row) */}

        <FilterSection
          inquiryState={{
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
            // Add other state/handlers as needed
          }}
        />

        {/* Cutoff Month Selector (moved out of Report Settings) */}
        {showCutoffSelector && (
          <CutoffMonthSelector cutoff={cutoff} setCutoff={setCutoff} />
        )}

        {/* Add SwitchesGrid for parameter toggles */}
        <div className="my-6">
          <SwitchesGrid
            handlers={{
              handlePilihSemua: handlePilihSemua,
              handleSwitchCutoff: (val) => {
                setCutoff(val ? "12" : "0");
                setShowCutoffSelector(val);
              },
              handleSwitchTanggal: (val) => setTanggal(val),
              handleSwitchKddept: (val) => setKddept(val),
              handleSwitchKdUnit: (val) => setUnit(val),
              handleSwitchKddekon: (val) => setKddekon(val),
              handleSwitchProvinsi: (val) => setKdprov(val),
              handleSwitchKabkota: (val) => setKdkabkota(val),
              handleSwitchKanwil: (val) => setKdkanwil(val),
              handleSwitchKppn: (val) => setKdkppn(val),
              handleSwitchSatker: (val) => setKdsatker(val),
              handleSwitchFungsi: (val) => setKdfungsi(val),
              handleSwitchSubfungsi: (val) => setKdsfungsi(val),
              handleSwitchProgram: (val) => setKdprogram(val),
              handleSwitchKegiatan: (val) => setKdgiat(val),
              handleSwitchOutput: (val) => setKdoutput(val),
              handleSwitchSuboutput: (val) => setKdsoutput(val),
              handleSwitchAkun: (val) => setKdakun(val),
              handleSwitchSdana: (val) => setKdsdana(val),
              handleSwitchRegister: (val) => setKdregister(val),
              // Add more handlers as needed
            }}
            jenlap={jenlap}
            setters={{
              setKdfungsi,
              setFungsi,
              setKdsfungsi,
              setSfungsi,
              setKdsoutput,
              setsOutput,
              setKdakun,
              setAkun,
              setKdsdana,
              setSdana,
              setKdregister,
              setRegister,
              // Add more setters as needed
            }}
          />
        </div>

        {/* Inflasi Selection UI (match old formInquiry) */}
        <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Jenis Inflasi
            </label>
            <JenisInflasiInquiry value={Inflasi} onChange={handleInflasi} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Tampilan Inflasi
            </label>
            <InflasiRadio
              inflasiRadio={handleRadioChangeInflasi}
              selectedValue={inflasiradio}
            />
          </div>
        </div>

        {/* IKN Selection UI (match old formInquiry) */}
        <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Jenis IKN</label>
            <JenisIkn value={Ikn} onChange={handleIkn} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Tampilan IKN
            </label>
            <IknRadio
              iknRadio={handleRadioChangeIkn}
              selectedValue={iknradio}
              status={opsiIkn}
            />
          </div>
        </div>

        {/* Miskin Selection UI (match old formInquiry) */}
        <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Jenis Kemiskinan Ekstrim
            </label>
            <JenisMiskin value={Miskin} onChange={handleMiskin} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Tampilan Kemiskinan Ekstrim
            </label>
            <MiskinRadio
              miskinRadio={handleRadioChangeMiskin}
              selectedValue={miskinradio}
            />
          </div>
        </div>

        {/* MP Selection UI (match old formInquiry) */}
        <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Tampilan Mitra Pembangunan
            </label>
            <MpRadio
              mpRadio={handleRadioMP}
              selectedValue={mpradio}
              status={opsiMP}
            />
          </div>
        </div>

        {/* PRI Selection UI (modularized, matches old formInquiry) */}
        {KdPRI && (
          <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Proyek Prioritas
              </label>
              <div className="flex items-center space-x-4">
                <label>
                  <input
                    type="radio"
                    name="opsiPRI"
                    value="pilihPRI"
                    checked={opsiPRI === "pilihPRI"}
                    onChange={handleRadioChangePRI}
                  />
                  <span className="ml-1">Pilih Proyek Prioritas</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="opsiPRI"
                    value="kondisiPRI"
                    checked={opsiPRI === "kondisiPRI"}
                    onChange={handleRadioChangePRI}
                  />
                  <span className="ml-1">Kondisi</span>
                </label>
              </div>
            </div>
            <div>
              {opsiPRI === "pilihPRI" ? (
                <>
                  <KodePRI
                    kdPN={PN}
                    kdPP={PP}
                    value={PRI}
                    KegPP={KegPP}
                    kdPRI={KdPRI}
                    thang={thang}
                    onChange={handlePRI}
                    status={opsiPRI}
                  />
                  <PriRadio
                    priRadio={handleRadioPri}
                    selectedValue={priradio}
                    status={opsiPRI}
                  />
                </>
              ) : (
                <InputPRI PRIkondisi={handlePRIKondisi} status={opsiPRI} />
              )}
            </div>
          </div>
        )}

        {/* Pangan Selection UI (modularized, matches old formInquiry) */}
        {KdPangan && (
          <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Belanja Ketahanan Pangan
              </label>
              <div className="flex items-center space-x-4">
                <label>
                  <input
                    type="radio"
                    name="opsiPangan"
                    value="pilihPangan"
                    checked={opsiPangan === "pilihPangan"}
                    onChange={handleRadioChangePangan}
                  />
                  <span className="ml-1">Pilih Belanja Ketahanan Pangan</span>
                </label>
              </div>
            </div>
            <div>
              {opsiPangan === "pilihPangan" && (
                <>
                  <JenisPangan
                    value={Pangan}
                    kdPangan={KdPangan}
                    onChange={handlePangan}
                    status={opsiPangan}
                  />
                  <PanganRadio
                    panganRadio={handlePanganRadio}
                    selectedValue={panganradio}
                    status={opsiPangan}
                  />
                </>
              )}
            </div>
          </div>
        )}

        {/* Pemilu Selection UI (modularized, matches old formInquiry) */}
        {KdPemilu && (
          <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Belanja Pemilu
              </label>
              <div className="flex items-center space-x-4">
                <label>
                  <input
                    type="radio"
                    name="opsiPemilu"
                    value="pilihPemilu"
                    checked={opsiPemilu === "pilihPemilu"}
                    onChange={handleRadioChangePemilu}
                  />
                  <span className="ml-1">Pilih Belanja Pemilu</span>
                </label>
              </div>
            </div>
            <div>
              {opsiPemilu === "pilihPemilu" && (
                <>
                  <JenisPemilu
                    value={Pemilu}
                    kdPemilu={KdPemilu}
                    onChange={handlePemilu}
                    status={opsiPemilu}
                  />
                  <PemiluRadio
                    pemiluRadio={handlePemiluRadio}
                    selectedValue={pemiluradio}
                    status={opsiPemilu}
                  />
                </>
              )}
            </div>
          </div>
        )}

        {/* Stunting Selection UI (modularized, matches old formInquiry) */}
        {KdStunting && (
          <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Belanja Penurunan Stunting
              </label>
              <div className="flex items-center space-x-4">
                <label>
                  <input
                    type="radio"
                    name="opsiStunting"
                    value="pilihStunting"
                    checked={opsiStunting === "pilihStunting"}
                    onChange={handleRadioChangeStunting}
                  />
                  <span className="ml-1">Pilih Belanja Stunting</span>
                </label>
              </div>
            </div>
            <div>
              {opsiStunting === "pilihStunting" && (
                <>
                  <JenisStuntingInquiry
                    value={Stunting}
                    kdStunting={KdStunting}
                    onChange={handleStunting}
                    status={opsiStunting}
                  />
                  <StuntingRadio
                    stuntingRadio={handleStuntingRadio}
                    selectedValue={stuntingradio}
                    status={opsiStunting}
                  />
                </>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <QueryButtons
          onExecuteQuery={handlegetQuery}
          onExportExcel={handleGenerateExcel}
          onExportPDF={handlePDF}
          onReset={handleReset}
          isLoading={loadingExcell}
        />
      </div>

      {/* Modals */}
      {showModalsql && (
        <SqlPreviewModal
          isOpen={showModalsql}
          onClose={closeModalsql}
          sql={sql}
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

      {showModalApbn && (
        <ApbnModal
          isOpen={showModalApbn}
          onClose={closeModalApbn}
          sql={sql}
          from={from}
          thang={thang}
        />
      )}

      {showModalAkumulasi && (
        <AkumulasiModal
          isOpen={showModalAkumulasi}
          onClose={closeModalAkumulasi}
          sql={sql}
          from={from}
          thang={thang}
        />
      )}

      {showModalBulanan && (
        <BulananModal
          isOpen={showModalBulanan}
          onClose={closeModalBulanan}
          sql={sql}
          from={from}
          thang={thang}
        />
      )}

      {showModalBlokir && (
        <BlokirModal
          isOpen={showModalBlokir}
          onClose={closeModalBlokir}
          sql={sql}
          from={from}
          thang={thang}
        />
      )}

      {showModalPN && (
        <PNModal
          isOpen={showModalPN}
          onClose={closeModalPN}
          sql={sql}
          from={from}
          thang={thang}
        />
      )}

      {showModalPN2 && (
        <PN2Modal
          isOpen={showModalPN2}
          onClose={closeModalPN2}
          sql={sql}
          from={from}
          thang={thang}
        />
      )}

      {showModalJnsblokir && (
        <JnsBlokirModal
          isOpen={showModalJnsblokir}
          onClose={closeModalJnsblokir}
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
          isOpen={showModalPDF}
          onClose={() => setShowModalPDF(false)}
          data={[]} // You'll need to pass your data here
          filename="inquiry_data"
        />
      )}

      {/* Cutoff Month Selector (conditionally rendered) */}
      {showCutoffSelector && (
        <CutoffMonthSelector
          cutoff={cutoff}
          onCutoffChange={handleCutoff}
          onClose={() => setShowCutoffSelector(false)}
        />
      )}
    </div>
  );
};

export default InquiryMod;
