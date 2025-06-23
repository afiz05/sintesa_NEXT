import React from "react";
// import { Form } from "react-bootstrap"
import { Dialog, Transition } from "@headlessui/react";

function KegPpRadio({ kegppRadio, selectedValue, status }) {
  const handleRadioChange = (event) => {
    const value = event.target.value;
    kegppRadio(value);
  };

  return (
    <span className="fade-in pilihan">
      <Checkbox
        inline
        type="radio"
        label="Kode"
        name="radioGroupppx"
        value="1"
        checked={selectedValue === "1"}
        onChange={handleRadioChange}
        disabled={status !== "pilihKegPP"}
      />
      <Checkbox
        inline
        type="radio"
        label="Kode Uraian"
        name="radioGroupppx"
        checked={selectedValue === "2"}
        value="2"
        onChange={handleRadioChange}
        disabled={status !== "pilihKegPP"}
      />
      <Checkbox
        inline
        type="radio"
        label="Uraian"
        name="radioGroupppx"
        checked={selectedValue === "3"}
        value="3"
        onChange={handleRadioChange}
        disabled={status !== "pilihKegPP"}
      />
      {/* <Checkbox 
        inline
        type="radio"
        label="Jangan Tampil"
        checked={selectedValue === "4"}
        name="dekoradioGrouppp"
        value="4"
        onChange={handleRadioChange}
      /> */}
    </span>
  );
}

export default KegPpRadio;
