import React from "react";
import { RadioGroup, Radio } from "@heroui/react";

function UnitRadio({ unitRadio, selectedValue, status }) {
  const handleRadioChange = (value) => {
    unitRadio(value);
  };

  return (
    <div className="fade-in pilihan">
      <RadioGroup
        value={selectedValue}
        onValueChange={handleRadioChange}
        isDisabled={status !== "pilihunit"}
        orientation="horizontal"
        size="sm"
        classNames={{
          wrapper: "gap-3 flex-wrap",
        }}
      >
        <Radio
          value="1"
          classNames={{
            base: "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between flex-row-reverse max-w-[180px] cursor-pointer rounded-lg gap-2 p-2.5 border-2 border-transparent data-[selected=true]:border-primary data-[selected=true]:bg-primary-50 transition-all duration-200 hover:scale-105",
            label: "text-sm font-medium text-default-700",
            control: "data-[selected=true]:bg-primary border-primary",
          }}
        >
          Kode
        </Radio>
        <Radio
          value="2"
          classNames={{
            base: "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between flex-row-reverse max-w-[180px] cursor-pointer rounded-lg gap-2 p-2.5 border-2 border-transparent data-[selected=true]:border-primary data-[selected=true]:bg-primary-50 transition-all duration-200 hover:scale-105",
            label: "text-sm font-medium text-default-700",
            control: "data-[selected=true]:bg-primary border-primary",
          }}
        >
          Kode Uraian
        </Radio>
        <Radio
          value="3"
          classNames={{
            base: "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between flex-row-reverse max-w-[180px] cursor-pointer rounded-lg gap-2 p-2.5 border-2 border-transparent data-[selected=true]:border-primary data-[selected=true]:bg-primary-50 transition-all duration-200 hover:scale-105",
            label: "text-sm font-medium text-default-700",
            control: "data-[selected=true]:bg-primary border-primary",
          }}
        >
          Uraian
        </Radio>
        {/* Uncomment if needed:
        <Radio value="4">Jangan Tampil</Radio>
        */}
      </RadioGroup>
    </div>
  );
}

export default UnitRadio;
