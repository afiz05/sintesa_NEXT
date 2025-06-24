import React from "react";
import {
  PilihSemua,
  SwitchCutoff,
  SwitchTanggal,
  SwitchKddept,
  SwitchKdUnit,
  SwitchKddekon,
  SwitchProvinsi,
  SwitchKabkota,
  SwitchKanwil,
  SwitchKppn,
  SwitchSatker,
  SwitchFungsi,
  SwitchSubfungsi,
  SwitchProgram,
  SwitchKegiatan,
  SwitchOutput,
  SwitchSuboutput,
  SwitchAkun,
  SwitchSdana,
  SwitchRegister,
  SwitchPN,
  SwitchPP,
  SwitchKegPP,
  // SwitchTema,
  // SwitchInflasi, // Removed: not present in pilihanData or old formInquiry
  SwitchStunting,
  SwitchMiskin,
  SwitchPemilu,
} from "./pilihanData";

const SwitchesGrid = ({ handlers, jenlap, setters = {} }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
      {/* Row 1 */}
      <div>
        <PilihSemua onChange={handlers.handlePilihSemua} />
      </div>
      <div>
        <SwitchCutoff onChange={handlers.handleSwitchCutoff} />
      </div>
      {/* <div>
        <SwitchTanggal
          onChange={handlers.handleSwitchTanggal}
          jenlap={jenlap}
        />
      </div> */}
      <div>
        <SwitchKddept onChange={handlers.handleSwitchKddept} />
      </div>
      <div>
        <SwitchKdUnit onChange={handlers.handleSwitchKdUnit} />
      </div>
      <div>
        <SwitchKddekon onChange={handlers.handleSwitchKddekon} />
      </div>
      <div>
        <SwitchProvinsi onChange={handlers.handleSwitchProvinsi} />
      </div>

      {/* Row 2 */}
      <div>
        <SwitchKabkota onChange={handlers.handleSwitchKabkota} />
      </div>
      <div>
        <SwitchKanwil onChange={handlers.handleSwitchKanwil} />
      </div>
      <div>
        <SwitchKppn onChange={handlers.handleSwitchKppn} />
      </div>
      <div>
        <SwitchSatker onChange={handlers.handleSwitchSatker} />
      </div>
      <div>
        <SwitchFungsi
          onChange={handlers.handleSwitchFungsi}
          jenlap={jenlap}
          setKdfungsi={setters.setKdfungsi}
          setFungsi={setters.setFungsi}
        />
      </div>
      <div>
        <SwitchSubfungsi
          onChange={handlers.handleSwitchSubfungsi}
          jenlap={jenlap}
          setKdsfungsi={setters.setKdsfungsi}
          setSfungsi={setters.setSfungsi}
        />
      </div>

      {/* Row 3 */}
      <div>
        <SwitchProgram onChange={handlers.handleSwitchProgram} />
      </div>
      <div>
        <SwitchKegiatan onChange={handlers.handleSwitchKegiatan} />
      </div>
      <div>
        <SwitchOutput onChange={handlers.handleSwitchOutput} />
      </div>
      <div>
        <SwitchSuboutput
          onChange={handlers.handleSwitchSuboutput}
          jenlap={jenlap}
          setKdsoutput={setters.setKdsoutput}
          setsOutput={setters.setsOutput}
        />
      </div>
      <div>
        <SwitchAkun
          onChange={handlers.handleSwitchAkun}
          jenlap={jenlap}
          setKdakun={setters.setKdakun}
          setAkun={setters.setAkun}
        />
      </div>
      <div>
        <SwitchSdana
          onChange={handlers.handleSwitchSdana}
          jenlap={jenlap}
          setKdsdana={setters.setKdsdana}
          setSdana={setters.setSdana}
        />
      </div>

      {/* Row 4 */}
      <div>
        <SwitchRegister
          onChange={handlers.handleSwitchRegister}
          jenlap={jenlap}
          setKdregister={setters.setKdregister}
          setRegister={setters.setRegister}
        />
      </div>
      <div>
        <SwitchPN
          onChange={handlers.handleSwitchPN}
          jenlap={jenlap}
          setKdPN={setters.setKdPN}
          setPN={setters.setPN}
        />
      </div>
      <div>
        <SwitchPP
          onChange={handlers.handleSwitchPP}
          jenlap={jenlap}
          setKdPP={setters.setKdPP}
          setPP={setters.setPP}
        />
      </div>
      <div>
        <SwitchKegPP onChange={handlers.handleSwitchKegPP} jenlap={jenlap} />
      </div>
      {/* <div>
        <SwitchPRI onChange={handlers.handleSwitchPRI} />
      </div> */}
      {/* <div>
        <SwitchMP onChange={handlers.handleSwitchMP} />
      </div> */}
      {/* <div>
        <SwitchTema onChange={handlers.handleSwitchTema} />
      </div> */}
      {/* <div>
        <SwitchInflasi 
          onChange={handlers.handleSwitchInflasi}
        />
      </div> */}
      {/* <div>
        <SwitchStunting onChange={handlers.handleSwitchStunting} />
      </div> */}
      {/* <div>
        <SwitchMiskin onChange={handlers.handleSwitchMiskin} />
      </div> */}
      {/* <div>
        <SwitchPemilu onChange={handlers.handleSwitchPemilu} />
      </div> */}
    </div>
  );
};

export default SwitchesGrid;
