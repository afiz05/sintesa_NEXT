import React from "react";
// import { Form } from "react-bootstrap"
import { Dialog, Transition } from "@headlessui/react";

function SubkomponenRadio({ subkomponenRadio, selectedValue, status }) {
  const handleRadioChange = (event) => {
    const value = event.target.value;
    subkomponenRadio(value);
  };

  return (
    <span className="fade-in pilihan">
      <Checkbox
        inline
        type="radio"
        label="Kode"
        name="dekoradioGroupsubkomponen"
        value="1"
        checked={selectedValue === "1"}
        onChange={handleRadioChange}
        disabled={status !== "pilihsubkomponen"}
      />
      <Checkbox
        inline
        type="radio"
        label="Kode Uraian"
        name="dekoradioGroupsubkomponen"
        checked={selectedValue === "2"}
        value="2"
        onChange={handleRadioChange}
        disabled={status !== "pilihsubkomponen"}
      />
      <Checkbox
        inline
        type="radio"
        label="Uraian"
        name="dekoradioGroupsubkomponen"
        checked={selectedValue === "3"}
        value="3"
        onChange={handleRadioChange}
        disabled={status !== "pilihsubkomponen"}
      />
    </span>
  );
}

export default SubkomponenRadio;
