import React from "react";
// import { Form } from "react-bootstrap"
import { Dialog, Transition } from "@headlessui/react";

function BidurusanRadio({ bidurusanRadio, selectedValue, status }) {
  const handleRadioChange = (event) => {
    const value = event.target.value;
    bidurusanRadio(value);
  };

  return (
    <span className="fade-in pilihan">
      <Checkbox
        inline
        type="radio"
        label="Kode"
        name="dekoradioGroupbidurusan"
        value="1"
        checked={selectedValue === "1"}
        onChange={handleRadioChange}
        disabled={status !== "pilihbidurusan"}
      />
      <Checkbox
        inline
        type="radio"
        label="Kode Uraian"
        name="dekoradioGroupbidurusan"
        checked={selectedValue === "2"}
        value="2"
        onChange={handleRadioChange}
        disabled={status !== "pilihbidurusan"}
      />
      <Checkbox
        inline
        type="radio"
        label="Uraian"
        name="dekoradioGroupbidurusan"
        checked={selectedValue === "3"}
        value="3"
        onChange={handleRadioChange}
        disabled={status !== "pilihbidurusan"}
      />
      {/* <Checkbox 
        inline
        type="radio"
        label="Jangan Tampil"
        checked={selectedValue === "4"}
        name="dekoradioGroupbidurusan"
        value="4"
        onChange={handleRadioChange}
        disabled={status !== "pilihbidurusan"}
      /> */}
    </span>
  );
}

export default BidurusanRadio;
