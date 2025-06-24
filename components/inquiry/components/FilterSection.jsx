import React from "react";
import { Card, CardBody } from "@heroui/react";
import FilterSwitch from "./FilterGroups/FilterSwitch";

// Import filter group components
import KementerianFilter from "./FilterGroups/KementerianFilter";
import UnitFilter from "./FilterGroups/UnitFilter";
import LokasiFilter from "./FilterGroups/LokasiFilter";
import FunctionFilter from "./FilterGroups/FunctionFilter";
import ProgramFilter from "./FilterGroups/ProgramFilter";
import OutputFilter from "./FilterGroups/OutputFilter";
import AccountFilter from "./FilterGroups/AccountFilter";
import FundingFilter from "./FilterGroups/FundingFilter";
import DekonFilter from "./FilterGroups/DekonFilter";
import KabkotaFilter from "./FilterGroups/KabkotaFilter";
import KanwilFilter from "./FilterGroups/KanwilFilter";

const FilterSection = ({ inquiryState }) => {
  const {
    // Filter visibility states
    tanggal,
    setTanggal,
    cutoff,
    setCutoff,
    showCutoffSelector,
    setShowCutoffSelector,
    akumulatif,
    setAkumulatif,
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
    KdPRI,
    setKdPRI,
    KdPangan,
    setKdPangan,
    KdPemilu,
    setKdPemilu,
    KdStunting,
    setKdStunting,
  } = inquiryState;

  const [showKementerian, setShowKementerian] = React.useState(false);
  const [showUnit, setShowUnit] = React.useState(false);
  const [showDekon, setShowDekon] = React.useState(false);
  const [showKabkota, setShowKabkota] = React.useState(false);
  const [showKanwil, setShowKanwil] = React.useState(false);
  const [showLokasi, setShowLokasi] = React.useState(false);

  // Ensure the Kementerian and Eselon I cards hide when the switches are turned off
  React.useEffect(() => {
    if (!showKementerian) {
      // Optionally reset Kementerian filter state here if needed
    }
    if (!showUnit) {
      // Optionally reset Unit filter state here if needed
    }
    if (!showLokasi) {
      // Optionally reset Lokasi filter state here if needed
    }
  }, [showKementerian, showUnit, showLokasi]);

  return (
    <>
      <Card className="mb-4">
        <CardBody>
          <div className="mb-4">
            <h5 className="text-lg font-semibold mb-2">Filter Options</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              <FilterSwitch
                id="tanggal-filter"
                checked={tanggal}
                onChange={setTanggal}
                label="Tanggal"
              />
              <FilterSwitch
                id="cutoff-filter"
                checked={cutoff !== "0"}
                onChange={(val) => {
                  setCutoff(val ? "12" : "0");
                  setShowCutoffSelector(val);
                }}
                label="Cutoff"
              />
              <FilterSwitch
                id="akumulatif-filter"
                checked={akumulatif}
                onChange={setAkumulatif}
                label="Akumulatif"
              />
              <FilterSwitch
                id="kddept-filter"
                checked={showKementerian}
                onChange={() => setShowKementerian((prev) => !prev)}
                label="Kementerian"
              />
              <FilterSwitch
                id="unit-filter"
                checked={showUnit}
                onChange={() => setShowUnit((prev) => !prev)}
                label="Eselon I"
              />
              <FilterSwitch
                id="dekon-filter"
                checked={showDekon}
                onChange={() => setShowDekon((prev) => !prev)}
                label="Kewenangan"
              />
              <FilterSwitch
                id="lokasi-filter"
                checked={showLokasi}
                onChange={() => setShowLokasi((prev) => !prev)}
                label="Provinsi"
              />
              <FilterSwitch
                id="kabkota-filter"
                checked={showKabkota}
                onChange={() => setShowKabkota((prev) => !prev)}
                label="Kabupaten/Kota"
              />
              <FilterSwitch
                id="kanwil-filter"
                checked={showKanwil}
                onChange={() => setShowKanwil((prev) => !prev)}
                label="Kanwil"
              />

              <FilterSwitch
                id="kdkanwil-filter"
                checked={kdkanwil}
                onChange={setKdkanwil}
                label="Regional Office"
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
                label="Work Unit"
              />
              <FilterSwitch
                id="kdfungsi-filter"
                checked={kdfungsi}
                onChange={setKdfungsi}
                label="Function"
              />
              <FilterSwitch
                id="kdsfungsi-filter"
                checked={kdsfungsi}
                onChange={setKdsfungsi}
                label="Sub-function"
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
                label="Activity"
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
              />
              <FilterSwitch
                id="kdakun-filter"
                checked={kdakun}
                onChange={setKdakun}
                label="Account"
              />
              <FilterSwitch
                id="kdsdana-filter"
                checked={kdsdana}
                onChange={setKdsdana}
                label="Funding Source"
              />
              <FilterSwitch
                id="kdregister-filter"
                checked={kdregister}
                onChange={setKdregister}
                label="Register"
              />
              <FilterSwitch
                id="pri-filter"
                checked={KdPRI}
                onChange={setKdPRI}
                label="Proyek Prioritas (PRI)"
              />
              <FilterSwitch
                id="pangan-filter"
                checked={KdPangan}
                onChange={setKdPangan}
                label="Ketahanan Pangan"
              />
              <FilterSwitch
                id="pemilu-filter"
                checked={KdPemilu}
                onChange={setKdPemilu}
                label="Pemilu"
              />
              <FilterSwitch
                id="stunting-filter"
                checked={KdStunting}
                onChange={setKdStunting}
                label="Stunting"
              />
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Filter Components Row - now outside the Card */}
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

        {kdfungsi && (
          <FunctionFilter type="function" inquiryState={inquiryState} />
        )}
        {kdsfungsi && (
          <FunctionFilter type="subfunction" inquiryState={inquiryState} />
        )}
        {kdprogram && <ProgramFilter inquiryState={inquiryState} />}
        {kdgiat && (
          <ProgramFilter type="activity" inquiryState={inquiryState} />
        )}
        {kdoutput && <OutputFilter type="output" inquiryState={inquiryState} />}
        {kdsoutput && (
          <OutputFilter type="suboutput" inquiryState={inquiryState} />
        )}
        {kdakun && <AccountFilter inquiryState={inquiryState} />}
        {kdsdana && <FundingFilter type="source" inquiryState={inquiryState} />}
        {kdregister && (
          <FundingFilter type="register" inquiryState={inquiryState} />
        )}
      </div>
    </>
  );
};

export default FilterSection;
