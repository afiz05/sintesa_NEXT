import React, { useState, useEffect } from "react";
// import { Form } from "react-bootstrap";
import { Switch } from "@headlessui/react";

export const PilihSemua = ({ onChange }) => {
  const [pilihSemua, setPilihSemua] = useState(true);

  const handlePilihSemua = () => {
    const newPilihSemua = !pilihSemua;
    setPilihSemua(newPilihSemua);
    onChange(newPilihSemua);
  };
  return (
    <>
      <Switch.Group as="div" className="flex items-center">
        <Switch.Label className="mr-3 text-sm font-medium text-gray-900">
          Cutoff
        </Switch.Label>
        <Switch
          checked={pilihSemua}
          onChange={handlePilihSemua}
          className={`${
            pilihSemua ? "bg-blue-600" : "bg-gray-200"
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
        >
          <span
            className={`${
              pilihSemua ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
      </Switch.Group>
    </>
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
    <>
      <Switch.Group as="div" className="flex items-center">
        <Switch.Label className="mr-3 text-sm font-medium text-gray-900">
          Cutoff
        </Switch.Label>
        <Switch
          checked={switchCutoff}
          onChange={handleSwitchCutoff}
          className={`${
            switchCutoff ? "bg-blue-600" : "bg-gray-200"
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
        >
          <span
            className={`${
              switchCutoff ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
      </Switch.Group>
    </>
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
    <>
      <Switch.Group as="div" className="flex items-center">
        <Switch.Label
          className={`mr-3 text-sm font-medium ${
            isDisabled ? "text-gray-400" : "text-gray-900"
          }`}
        >
          Cut Off
        </Switch.Label>
        <Switch
          checked={switchTanggal}
          onChange={handleSwitchTanggal}
          disabled={isDisabled}
          className={`${
            switchTanggal && !isDisabled ? "bg-blue-600" : "bg-gray-200"
          } ${
            isDisabled ? "opacity-50 cursor-not-allowed" : ""
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
        >
          <span
            className={`${
              switchTanggal ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
      </Switch.Group>
    </>
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
    <>
      <Switch.Group as="div" className="flex items-center">
        <Switch.Label className="mr-3 text-sm font-medium text-gray-900">
          Kementerian
        </Switch.Label>
        <Switch
          checked={switchDept}
          onChange={handleSwitchDept}
          className={`${
            switchDept ? "bg-blue-600" : "bg-gray-200"
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
        >
          <span
            className={`${
              switchDept ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
      </Switch.Group>
    </>
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
    <>
      <Switch.Group as="div" className="flex items-center">
        <Switch.Label className="mr-3 text-sm font-medium text-gray-900">
          Eselon I
        </Switch.Label>
        <Switch
          checked={switchUnit}
          onChange={handleSwitchUnit}
          className={`${
            switchUnit ? "bg-blue-600" : "bg-gray-200"
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
        >
          <span
            className={`${
              switchUnit ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
      </Switch.Group>
    </>
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
    <>
      <Switch.Group as="div" className="flex items-center">
        <Switch.Label className="mr-3 text-sm font-medium text-gray-900">
          Kewenangan
        </Switch.Label>
        <Switch
          checked={switchDekon}
          onChange={handleSwitchDekon}
          className={`${
            switchDekon ? "bg-blue-600" : "bg-gray-200"
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
        >
          <span
            className={`${
              switchDekon ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
      </Switch.Group>
    </>
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
    <>
      <Switch.Group as="div" className="flex items-center">
        <Switch.Label className="mr-3 text-sm font-medium text-gray-900">
          Provinsi
        </Switch.Label>
        <Switch
          checked={switchProvinsi}
          onChange={handleSwitchProvinsi}
          className={`${
            switchProvinsi ? "bg-blue-600" : "bg-gray-200"
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
        >
          <span
            className={`${
              switchProvinsi ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
      </Switch.Group>
    </>
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
    <>
      <Switch.Group as="div" className="flex items-center">
        <Switch.Label className="mr-3 text-sm font-medium text-gray-900">
          Kab/Kota
        </Switch.Label>
        <Switch
          checked={switchKabkota}
          onChange={handleSwitchKabkota}
          className={`${
            switchKabkota ? "bg-blue-600" : "bg-gray-200"
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
        >
          <span
            className={`${
              switchKabkota ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
      </Switch.Group>
    </>
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
    <>
      <Switch.Group as="div" className="flex items-center">
        <Switch.Label className="mr-3 text-sm font-medium text-gray-900">
          Kanwil
        </Switch.Label>
        <Switch
          checked={switchKanwil}
          onChange={handleSwitchKanwil}
          className={`${
            switchKanwil ? "bg-blue-600" : "bg-gray-200"
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
        >
          <span
            className={`${
              switchKanwil ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
      </Switch.Group>
    </>
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
    <>
      <Switch.Group as="div" className="flex items-center">
        <Switch.Label className="mr-3 text-sm font-medium text-gray-900">
          KPPN
        </Switch.Label>
        <Switch
          checked={switchKppn}
          onChange={handleSwitchKppn}
          className={`${
            switchKppn ? "bg-blue-600" : "bg-gray-200"
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
        >
          <span
            className={`${
              switchKppn ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
      </Switch.Group>
    </>
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
    <>
      <Switch.Group as="div" className="flex items-center">
        <Switch.Label className="mr-3 text-sm font-medium text-gray-900">
          Satker
        </Switch.Label>
        <Switch
          checked={switchSatker}
          onChange={handleSwitchSatker}
          className={`${
            switchSatker ? "bg-blue-600" : "bg-gray-200"
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
        >
          <span
            className={`${
              switchSatker ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
      </Switch.Group>
    </>
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
    <>
      <Switch.Group as="div" className="flex items-center">
        <Switch.Label
          className={`mr-3 text-sm font-medium ${
            isDisabled ? "text-gray-400" : "text-gray-900"
          }`}
        >
          Fungsi
        </Switch.Label>
        <Switch
          checked={switchFungsi}
          onChange={handleSwitchFungsi}
          disabled={isDisabled}
          className={`${
            switchFungsi && !isDisabled ? "bg-blue-600" : "bg-gray-200"
          } ${
            isDisabled ? "opacity-50 cursor-not-allowed" : ""
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
        >
          <span
            className={`${
              switchFungsi ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
      </Switch.Group>
    </>
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
    <>
      <Switch.Group as="div" className="flex items-center">
        <Switch.Label
          className={`mr-3 text-sm font-medium ${
            isDisabled ? "text-gray-400" : "text-gray-900"
          }`}
        >
          Sub Fungsi
        </Switch.Label>
        <Switch
          checked={switchSubfungsi}
          onChange={handleSwitchSubfungsi}
          disabled={isDisabled}
          className={`${
            switchSubfungsi && !isDisabled ? "bg-blue-600" : "bg-gray-200"
          } ${
            isDisabled ? "opacity-50 cursor-not-allowed" : ""
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
        >
          <span
            className={`${
              switchSubfungsi ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
      </Switch.Group>
    </>
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
    <>
      <Switch.Group as="div" className="flex items-center">
        <Switch.Label className="mr-3 text-sm font-medium text-gray-900">
          Program
        </Switch.Label>
        <Switch
          checked={switchProgram}
          onChange={handleSwitchProgram}
          className={`${
            switchProgram ? "bg-blue-600" : "bg-gray-200"
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
        >
          <span
            className={`${
              switchProgram ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
      </Switch.Group>
    </>
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
    <>
      <Switch.Group as="div" className="flex items-center">
        <Switch.Label className="mr-3 text-sm font-medium text-gray-900">
          Kegiatan
        </Switch.Label>
        <Switch
          checked={switchKegiatan}
          onChange={handleSwitchKegiatan}
          className={`${
            switchKegiatan ? "bg-blue-600" : "bg-gray-200"
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
        >
          <span
            className={`${
              switchKegiatan ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
      </Switch.Group>
    </>
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
    <>
      <Switch.Group as="div" className="flex items-center">
        <Switch.Label className="mr-3 text-sm font-medium text-gray-900">
          Output
        </Switch.Label>
        <Switch
          checked={switchOutput}
          onChange={handleSwitchOutput}
          className={`${
            switchOutput ? "bg-blue-600" : "bg-gray-200"
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
        >
          <span
            className={`${
              switchOutput ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
      </Switch.Group>
    </>
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
    <>
      <Switch.Group as="div" className="flex items-center">
        <Switch.Label
          className={`mr-3 text-sm font-medium ${
            isDisabled ? "text-gray-400" : "text-gray-900"
          }`}
        >
          Sub Output
        </Switch.Label>
        <Switch
          checked={switchSuboutput}
          onChange={handleSwitchSuboutput}
          disabled={isDisabled}
          className={`${
            switchSuboutput && !isDisabled ? "bg-blue-600" : "bg-gray-200"
          } ${
            isDisabled ? "opacity-50 cursor-not-allowed" : ""
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
        >
          <span
            className={`${
              switchSuboutput ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
      </Switch.Group>
    </>
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
    <>
      <Switch.Group as="div" className="flex items-center">
        <Switch.Label
          className={`mr-3 text-sm font-medium ${
            isDisabled ? "text-gray-400" : "text-gray-900"
          }`}
        >
          Akun
        </Switch.Label>
        <Switch
          checked={switchAkun}
          onChange={handleSwitchAkun}
          disabled={isDisabled}
          className={`${
            switchAkun && !isDisabled ? "bg-blue-600" : "bg-gray-200"
          } ${
            isDisabled ? "opacity-50 cursor-not-allowed" : ""
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
        >
          <span
            className={`${
              switchAkun ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
      </Switch.Group>
    </>
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
    <>
      <Switch.Group as="div" className="flex items-center">
        <Switch.Label
          className={`mr-3 text-sm font-medium ${
            isDisabled ? "text-gray-400" : "text-gray-900"
          }`}
        >
          Sumber Dana
        </Switch.Label>
        <Switch
          checked={switchSdana}
          onChange={handleSwitchSdana}
          disabled={isDisabled}
          className={`${
            switchSdana && !isDisabled ? "bg-blue-600" : "bg-gray-200"
          } ${
            isDisabled ? "opacity-50 cursor-not-allowed" : ""
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
        >
          <span
            className={`${
              switchSdana ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
      </Switch.Group>
    </>
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
    <>
      <Switch.Group as="div" className="flex items-center">
        <Switch.Label
          className={`mr-3 text-sm font-medium ${
            isDisabled ? "text-gray-400" : "text-gray-900"
          }`}
        >
          Register
        </Switch.Label>
        <Switch
          checked={switchRegister}
          onChange={handleSwitchRegister}
          disabled={isDisabled}
          className={`${
            switchRegister && !isDisabled ? "bg-blue-600" : "bg-gray-200"
          } ${
            isDisabled ? "opacity-50 cursor-not-allowed" : ""
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
        >
          <span
            className={`${
              switchRegister ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
      </Switch.Group>
    </>
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
    <>
      <Switch.Group as="div" className="flex items-center">
        <Switch.Label
          className={`mr-3 text-sm font-medium ${
            isDisabled ? "text-gray-400" : "text-gray-900"
          }`}
        >
          PN
        </Switch.Label>
        <Switch
          checked={switchPN}
          onChange={handleSwitchPN}
          disabled={isDisabled}
          className={`${
            switchPN && !isDisabled ? "bg-blue-600" : "bg-gray-200"
          } ${
            isDisabled ? "opacity-50 cursor-not-allowed" : ""
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
        >
          <span
            className={`${
              switchPN ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
      </Switch.Group>
    </>
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
    <>
      <Switch.Group as="div" className="flex items-center">
        <Switch.Label
          className={`mr-3 text-sm font-medium ${
            isDisabled ? "text-gray-400" : "text-gray-900"
          }`}
        >
          PP
        </Switch.Label>
        <Switch
          checked={switchPP}
          onChange={handleSwitchPP}
          disabled={isDisabled}
          className={`${
            switchPP && !isDisabled ? "bg-blue-600" : "bg-gray-200"
          } ${
            isDisabled ? "opacity-50 cursor-not-allowed" : ""
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
        >
          <span
            className={`${
              switchPP ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
      </Switch.Group>
    </>
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
    <>
      <Switch.Group as="div" className="flex items-center">
        <Switch.Label
          className={`mr-3 text-sm font-medium ${
            isDisabled ? "text-gray-400" : "text-gray-900"
          }`}
        >
          Keg PP
        </Switch.Label>
        <Switch
          checked={switchKegPP}
          onChange={handleSwitchKegPP}
          disabled={isDisabled}
          className={`${
            switchKegPP && !isDisabled ? "bg-blue-600" : "bg-gray-200"
          } ${
            isDisabled ? "opacity-50 cursor-not-allowed" : ""
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
        >
          <span
            className={`${
              switchKegPP ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
      </Switch.Group>
    </>
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
