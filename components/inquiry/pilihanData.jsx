"use client";
import React, { useState, useEffect } from "react";
import { Switch } from "@heroui/react";

export const PilihSemua = ({ onChange, setAllSwitches = [] }) => {
  const [pilihSemua, setPilihSemua] = useState(true);

  const handlePilihSemua = () => {
    const newPilihSemua = !pilihSemua;
    setPilihSemua(newPilihSemua);
    onChange(newPilihSemua);
    // Set all other switches to the same value
    if (Array.isArray(setAllSwitches)) {
      setAllSwitches.forEach(
        (fn) => typeof fn === "function" && fn(newPilihSemua)
      );
    } else if (typeof setAllSwitches === "function") {
      setAllSwitches(newPilihSemua);
    }
  };
  return (
    <div className="flex items-center">
      <Switch
        isSelected={pilihSemua}
        onValueChange={handlePilihSemua}
        size="sm"
        color="primary"
        className="mr-3"
      />
      <label className="text-sm font-medium text-gray-900">Pilih Semua</label>
    </div>
  );
};

export const SwitchCutoff = ({ onChange }) => {
  const [switchCutoff, setSwitchCutoff] = useState(true);

  const handleSwitchCutoff = () => {
    const newSwitchCutoff = !switchCutoff;
    setSwitchCutoff(newSwitchCutoff);
    onChange(newSwitchCutoff);
  };
  return (
    <div className="flex items-center">
      <Switch
        isSelected={switchCutoff}
        onValueChange={handleSwitchCutoff}
        size="sm"
        color="primary"
        className="mr-3"
      />
      <label className="text-sm font-medium text-gray-900">Cut-Off</label>
    </div>
  );
};

export const SwitchTanggal = ({ onChange, jenlap }) => {
  const [switchTanggal, setSwitchTanggal] = useState(false);

  const handleSwitchTanggal = () => {
    const newSwitchTanggal = !switchTanggal;
    setSwitchTanggal(newSwitchTanggal);
    onChange(newSwitchTanggal);
  };

  const isDisabled =
    jenlap === "1" ||
    jenlap === "4" ||
    jenlap === "5" ||
    jenlap === "6" ||
    jenlap === "7";

  return (
    <div className="flex items-center">
      <Switch
        isSelected={switchTanggal}
        onValueChange={handleSwitchTanggal}
        isDisabled={isDisabled}
        size="sm"
        color="primary"
        className="mr-3"
      />
      <label
        className={`text-sm font-medium ${
          isDisabled ? "text-gray-400" : "text-gray-900"
        }`}
      >
        Cut Off
      </label>
    </div>
  );
};

export const SwitchKddept = ({ onChange }) => {
  const [switchDept, setswitchDept] = useState(true);
  const handleSwitchDept = () => {
    const newSwitchDept = !switchDept;
    setswitchDept(newSwitchDept);
    onChange(newSwitchDept);
  };
  return (
    <div className="flex items-center">
      <Switch
        isSelected={switchDept}
        onValueChange={handleSwitchDept}
        size="sm"
        color="primary"
        className="mr-3"
      />
      <label className="text-sm font-medium text-gray-900">Kementerian</label>
    </div>
  );
};

export const SwitchKdUnit = ({ onChange }) => {
  const [switchUnit, setswitchUnit] = useState(false);
  const handleSwitchUnit = () => {
    const newSwitchUnit = !switchUnit;
    setswitchUnit(newSwitchUnit);
    onChange(newSwitchUnit);
  };
  return (
    <div className="flex items-center">
      <Switch
        isSelected={switchUnit}
        onValueChange={handleSwitchUnit}
        size="sm"
        color="primary"
        className="mr-3"
      />
      <label className="text-sm font-medium text-gray-900">Eselon I</label>
    </div>
  );
};

export const SwitchKddekon = ({ onChange }) => {
  const [switchDekon, setswitchDekon] = useState(false);
  const handleSwitchDekon = () => {
    const newSwitchDekon = !switchDekon;
    setswitchDekon(!switchDekon);
    onChange(newSwitchDekon);
  };
  return (
    <div className="flex items-center">
      <Switch
        isSelected={switchDekon}
        onValueChange={handleSwitchDekon}
        size="sm"
        color="primary"
        className="mr-3"
      />
      <label className="text-sm font-medium text-gray-900">Kewenangan</label>
    </div>
  );
};

export const SwitchProvinsi = ({ onChange }) => {
  const [switchProvinsi, setswitchProvinsi] = useState(false);
  const handleSwitchProvinsi = () => {
    const newSwitchProvinsi = !switchProvinsi;
    setswitchProvinsi(newSwitchProvinsi);
    onChange(newSwitchProvinsi);
  };
  return (
    <div className="flex items-center">
      <Switch
        isSelected={switchProvinsi}
        onValueChange={handleSwitchProvinsi}
        size="sm"
        color="primary"
        className="mr-3"
      />
      <label className="text-sm font-medium text-gray-900">Provinsi</label>
    </div>
  );
};

export const SwitchKabkota = ({ onChange }) => {
  const [switchKabkota, setswitchKabkota] = useState(false);
  const handleSwitchKabkota = () => {
    const newSwitchKabkota = !switchKabkota;
    setswitchKabkota(newSwitchKabkota);
    onChange(newSwitchKabkota);
  };
  return (
    <div className="flex items-center">
      <Switch
        isSelected={switchKabkota}
        onValueChange={handleSwitchKabkota}
        size="sm"
        color="primary"
        className="mr-3"
      />
      <label className="text-sm font-medium text-gray-900">Kab/Kota</label>
    </div>
  );
};

export const SwitchKanwil = ({ onChange }) => {
  const [switchKanwil, setswitchKanwil] = useState(false);
  const handleSwitchKanwil = () => {
    const newSwitchKanwil = !switchKanwil;
    setswitchKanwil(newSwitchKanwil);
    onChange(newSwitchKanwil);
  };
  return (
    <div className="flex items-center">
      <Switch
        isSelected={switchKanwil}
        onValueChange={handleSwitchKanwil}
        size="sm"
        color="primary"
        className="mr-3"
      />
      <label className="text-sm font-medium text-gray-900">Kanwil</label>
    </div>
  );
};

export const SwitchKppn = ({ onChange }) => {
  const [switchKppn, setswitchKppn] = useState(false);
  const handleSwitchKppn = () => {
    const newSwitchKppn = !switchKppn;
    setswitchKppn(newSwitchKppn);
    onChange(newSwitchKppn);
  };
  return (
    <div className="flex items-center">
      <Switch
        isSelected={switchKppn}
        onValueChange={handleSwitchKppn}
        size="sm"
        color="primary"
        className="mr-3"
      />
      <label className="text-sm font-medium text-gray-900">KPPN</label>
    </div>
  );
};

export const SwitchSatker = ({ onChange }) => {
  const [switchSatker, setswitchSatker] = useState(false);
  const handleSwitchSatker = () => {
    const newSwitchSatker = !switchSatker;
    setswitchSatker(newSwitchSatker);
    onChange(newSwitchSatker);
  };
  return (
    <div className="flex items-center">
      <Switch
        isSelected={switchSatker}
        onValueChange={handleSwitchSatker}
        size="sm"
        color="primary"
        className="mr-3"
      />
      <label className="text-sm font-medium text-gray-900">Satker</label>
    </div>
  );
};

export const SwitchFungsi = ({ onChange, jenlap, setKdfungsi, setFungsi }) => {
  const [switchFungsi, setswitchFungsi] = useState(false);

  const handleSwitchFungsi = () => {
    const newSwitchFungsi = !switchFungsi;
    setswitchFungsi(newSwitchFungsi);
    onChange(newSwitchFungsi);
    if (!newSwitchFungsi) {
      setKdfungsi(false);
      setFungsi("XX");
    }
  };

  const isDisabled = jenlap === "6";

  return (
    <div className="flex items-center">
      <Switch
        isSelected={switchFungsi}
        onValueChange={handleSwitchFungsi}
        isDisabled={isDisabled}
        size="sm"
        color="primary"
        className="mr-3"
      />
      <label
        className={`text-sm font-medium ${
          isDisabled ? "text-gray-400" : "text-gray-900"
        }`}
      >
        Fungsi
      </label>
    </div>
  );
};

export const SwitchSubfungsi = ({
  onChange,
  jenlap,
  setKdsfungsi,
  setSfungsi,
}) => {
  const [switchSubfungsi, setswitchSubfungsi] = useState(false);

  const handleSwitchSubfungsi = () => {
    const newSwitchSubfungsi = !switchSubfungsi;
    setswitchSubfungsi(newSwitchSubfungsi);
    onChange(newSwitchSubfungsi);
    if (!newSwitchSubfungsi) {
      setKdsfungsi(false);
      setSfungsi("XX");
    }
  };

  const isDisabled = jenlap === "6";

  return (
    <div className="flex items-center">
      <Switch
        isSelected={switchSubfungsi}
        onValueChange={handleSwitchSubfungsi}
        isDisabled={isDisabled}
        size="sm"
        color="primary"
        className="mr-3"
      />
      <label
        className={`text-sm font-medium ${
          isDisabled ? "text-gray-400" : "text-gray-900"
        }`}
      >
        Sub Fungsi
      </label>
    </div>
  );
};

export const SwitchProgram = ({ onChange }) => {
  const [switchProgram, setswitchProgram] = useState(false);
  const handleSwitchProgram = () => {
    const newSwitchProgram = !switchProgram;
    setswitchProgram(newSwitchProgram);
    onChange(newSwitchProgram);
  };
  return (
    <div className="flex items-center">
      <Switch
        isSelected={switchProgram}
        onValueChange={handleSwitchProgram}
        size="sm"
        color="primary"
        className="mr-3"
      />
      <label className="text-sm font-medium text-gray-900">Program</label>
    </div>
  );
};

export const SwitchKegiatan = ({ onChange }) => {
  const [switchKegiatan, setswitchKegiatan] = useState(false);
  const handleSwitchKegiatan = () => {
    const newSwitchKegiatan = !switchKegiatan;
    setswitchKegiatan(newSwitchKegiatan);
    onChange(newSwitchKegiatan);
  };
  return (
    <div className="flex items-center">
      <Switch
        isSelected={switchKegiatan}
        onValueChange={handleSwitchKegiatan}
        size="sm"
        color="primary"
        className="mr-3"
      />
      <label className="text-sm font-medium text-gray-900">Kegiatan</label>
    </div>
  );
};

export const SwitchOutput = ({ onChange }) => {
  const [switchOutput, setswitchOutput] = useState(false);
  const handleSwitchOutput = () => {
    const newSwitchOutput = !switchOutput;
    setswitchOutput(newSwitchOutput);
    onChange(newSwitchOutput);
  };
  return (
    <div className="flex items-center">
      <Switch
        isSelected={switchOutput}
        onValueChange={handleSwitchOutput}
        size="sm"
        color="primary"
        className="mr-3"
      />
      <label className="text-sm font-medium text-gray-900">Output</label>
    </div>
  );
};

export const SwitchSuboutput = ({
  onChange,
  jenlap,
  setKdsoutput,
  setsOutput,
}) => {
  const [switchSuboutput, setswitchSuboutput] = useState(false);

  const handleSwitchSuboutput = () => {
    const newSwitchSuboutput = !switchSuboutput;
    setswitchSuboutput(newSwitchSuboutput);
    onChange(newSwitchSuboutput);
    if (!newSwitchSuboutput) {
      setKdsoutput(false);
      setsOutput("XX");
    }
  };

  const isDisabled = jenlap === "6";

  return (
    <div className="flex items-center">
      <Switch
        isSelected={switchSuboutput}
        onValueChange={handleSwitchSuboutput}
        isDisabled={isDisabled}
        size="sm"
        color="primary"
        className="mr-3"
      />
      <label
        className={`text-sm font-medium ${
          isDisabled ? "text-gray-400" : "text-gray-900"
        }`}
      >
        Sub Output
      </label>
    </div>
  );
};

export const SwitchAkun = ({ onChange, jenlap, setKdakun, setAkun }) => {
  const [switchAkun, setswitchAkun] = useState(false);

  const handleSwitchAkun = () => {
    const newSwitchAkun = !switchAkun;
    setswitchAkun(newSwitchAkun);
    onChange(newSwitchAkun);
    if (!newSwitchAkun) {
      setKdakun(false);
      setAkun("XX");
    }
  };

  const isDisabled = jenlap === "6";

  return (
    <div className="flex items-center">
      <Switch
        isSelected={switchAkun}
        onValueChange={handleSwitchAkun}
        isDisabled={isDisabled}
        size="sm"
        color="primary"
        className="mr-3"
      />
      <label
        className={`text-sm font-medium ${
          isDisabled ? "text-gray-400" : "text-gray-900"
        }`}
      >
        Akun
      </label>
    </div>
  );
};

export const SwitchSdana = ({ onChange, jenlap, setKdsdana, setSdana }) => {
  const [switchSdana, setswitchSdana] = useState(false);

  const handleSwitchSdana = () => {
    const newSwitchSdana = !switchSdana;
    setswitchSdana(newSwitchSdana);
    onChange(newSwitchSdana);
    if (!newSwitchSdana) {
      setKdsdana(false);
      setSdana("XX");
    }
  };

  const isDisabled = jenlap === "6";

  return (
    <div className="flex items-center">
      <Switch
        isSelected={switchSdana}
        onValueChange={handleSwitchSdana}
        isDisabled={isDisabled}
        size="sm"
        color="primary"
        className="mr-3"
      />
      <label
        className={`text-sm font-medium ${
          isDisabled ? "text-gray-400" : "text-gray-900"
        }`}
      >
        Sumber Dana
      </label>
    </div>
  );
};

export const SwitchRegister = ({
  onChange,
  jenlap,
  setKdregister,
  setRegister,
}) => {
  const [switchRegister, setswitchRegister] = useState(false);

  const handleSwitchRegister = () => {
    const newSwitchRegister = !switchRegister;
    setswitchRegister(newSwitchRegister);
    onChange(newSwitchRegister);
    if (!newSwitchRegister) {
      setKdregister(false);
      setRegister("XX");
    }
  };

  const isDisabled = jenlap === "6";

  return (
    <div className="flex items-center">
      <Switch
        isSelected={switchRegister}
        onValueChange={handleSwitchRegister}
        isDisabled={isDisabled}
        size="sm"
        color="primary"
        className="mr-3"
      />
      <label
        className={`text-sm font-medium ${
          isDisabled ? "text-gray-400" : "text-gray-900"
        }`}
      >
        Register
      </label>
    </div>
  );
};

export const SwitchPN = ({ onChange, kdPN, jenlap, setKdPN, setPN }) => {
  const [switchPN, setswitchPN] = useState(false);

  const handleSwitchPN = () => {
    const newSwitchPN = !switchPN;
    setswitchPN(newSwitchPN);
    onChange(newSwitchPN);
    if (!newSwitchPN) {
      setKdPN(false);
      setPN("XX");
    }
  };

  const isDisabled = jenlap !== "6";

  return (
    <div className="flex items-center">
      <Switch
        isSelected={switchPN}
        onValueChange={handleSwitchPN}
        isDisabled={isDisabled}
        size="sm"
        color="primary"
        className="mr-3"
      />
      <label
        className={`text-sm font-medium ${
          isDisabled ? "text-gray-400" : "text-gray-900"
        }`}
      >
        PN
      </label>
    </div>
  );
};

export const SwitchPP = ({ onChange, jenlap, setKdPP, setPP }) => {
  const [switchPP, setswitchPP] = useState(false);

  const handleSwitchPP = () => {
    const newSwitchPP = !switchPP;
    setswitchPP(newSwitchPP);
    onChange(newSwitchPP);
    if (!newSwitchPP) {
      setKdPP(false);
      setPP("XX");
    }
  };

  const isDisabled = jenlap !== "6";

  return (
    <div className="flex items-center">
      <Switch
        isSelected={switchPP}
        onValueChange={handleSwitchPP}
        isDisabled={isDisabled}
        size="sm"
        color="primary"
        className="mr-3"
      />
      <label
        className={`text-sm font-medium ${
          isDisabled ? "text-gray-400" : "text-gray-900"
        }`}
      >
        PP
      </label>
    </div>
  );
};

export const SwitchKegPP = ({ onChange, jenlap }) => {
  const [switchKegPP, setswitchKegPP] = useState(false);

  const handleSwitchKegPP = () => {
    const newSwitchKegPP = !switchKegPP;
    setswitchKegPP(newSwitchKegPP);
    onChange(newSwitchKegPP);
  };

  const isDisabled = jenlap !== "6";

  return (
    <div className="flex items-center">
      <Switch
        isSelected={switchKegPP}
        onValueChange={handleSwitchKegPP}
        isDisabled={isDisabled}
        size="sm"
        color="primary"
        className="mr-3"
      />
      <label
        className={`text-sm font-medium ${
          isDisabled ? "text-gray-400" : "text-gray-900"
        }`}
      >
        Keg PP
      </label>
    </div>
  );
};

export default {
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
};
