import React from "react";
// import { Form } from "react-bootstrap"
import { Dialog, Transition } from "@headlessui/react";

function FungsiRadio({ fungsiRadio, selectedValue, status }) {
  const handleRadioChange = (event) => {
    const value = event.target.value;
    fungsiRadio(value);
  };

  return (
    <span className="fade-in pilihan">
      <Checkbox
        inline
        type="radio"
        label="Kode"
        name="dekoradioGroupfungsi"
        value="1"
        checked={selectedValue === "1"}
        onChange={handleRadioChange}
        disabled={status !== "pilihfungsi"}
      />
      <Checkbox
        inline
        type="radio"
        label="Kode Uraian"
        name="dekoradioGroupfungsi"
        checked={selectedValue === "2"}
        value="2"
        onChange={handleRadioChange}
        disabled={status !== "pilihfungsi"}
      />
      <Checkbox
        inline
        type="radio"
        label="Uraian"
        name="dekoradioGroupfungsi"
        checked={selectedValue === "3"}
        value="3"
        onChange={handleRadioChange}
        disabled={status !== "pilihfungsi"}
      />
      {/* <Checkbox 
        inline
        type="radio"
        label="Jangan Tampil"
        checked={selectedValue === "4"}
        name="dekoradioGroupfungsi"
        value="4"
        onChange={handleRadioChange}
      /> */}
    </span>
  );
}

export default FungsiRadio;
