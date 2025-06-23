import React from "react";
// import { Form } from "react-bootstrap"
import { Dialog, Transition } from "@headlessui/react";

function KanwilRadio({ kanwilRadio, selectedValue, status }) {
  const handleRadioChange = (event) => {
    const value = event.target.value;
    kanwilRadio(value);
  };

  return (
    <span className="fade-in pilihan">
      <Checkbox
        inline
        type="radio"
        label="Kode"
        name="dekoradioGroupkanwil"
        value="1"
        checked={selectedValue === "1"}
        onChange={handleRadioChange}
        disabled={status !== "pilihkanwil"}
      />
      <Checkbox
        inline
        type="radio"
        label="Kode Uraian"
        name="dekoradioGroupkanwil"
        checked={selectedValue === "2"}
        value="2"
        onChange={handleRadioChange}
        disabled={status !== "pilihkanwil"}
      />
      <Checkbox
        inline
        type="radio"
        label="Uraian"
        name="dekoradioGroupkanwil"
        checked={selectedValue === "3"}
        value="3"
        onChange={handleRadioChange}
        disabled={status !== "pilihkanwil"}
      />
      {/* <Checkbox 
        inline
        type="radio"
        label="Jangan Tampil"
        checked={selectedValue === "4"}
        name="dekoradioGroupkanwil"
        value="4"
        onChange={handleRadioChange}
      /> */}
    </span>
  );
}

export default KanwilRadio;
