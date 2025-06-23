import React from "react";
// import { Form } from "react-bootstrap"
import { Dialog, Transition } from "@headlessui/react";

function KomponenRadio({ komponenRadio, selectedValue, status }) {
  const handleRadioChange = (event) => {
    const value = event.target.value;
    komponenRadio(value);
  };

  return (
    <span className="fade-in pilihan">
      <Checkbox
        inline
        type="radio"
        label="Kode"
        name="dekoradioGroupkomponen"
        value="1"
        checked={selectedValue === "1"}
        onChange={handleRadioChange}
        disabled={status !== "pilihkomponen"}
      />
      <Checkbox
        inline
        type="radio"
        label="Kode Uraian"
        name="dekoradioGroupkomponen"
        checked={selectedValue === "2"}
        value="2"
        onChange={handleRadioChange}
        disabled={status !== "pilihkomponen"}
      />
      <Checkbox
        inline
        type="radio"
        label="Uraian"
        name="dekoradioGroupkomponen"
        checked={selectedValue === "3"}
        value="3"
        onChange={handleRadioChange}
        disabled={status !== "pilihkomponen"}
      />
    </span>
  );
}

export default KomponenRadio;
