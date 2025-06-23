import React from "react";
import { RadioGroup, Radio } from "@heroui/react";

function DeptRadio({ deptRadio, selectedValue, status, babi }) {
  const handleRadioChange = (value) => {
    deptRadio(value);
  };

  const radioOptions = [
    { value: "1", label: "Kode" },
    { value: "2", label: "Kode Uraian" },
    { value: "3", label: "Uraian" },
    {
      value: "4",
      label: "Jangan Tampil",
      isDisabled: status !== "pilihdept" || babi === "tampil",
    },
  ];

  return (
    <div className="fade-in pilihan">
      <RadioGroup
        value={selectedValue}
        onValueChange={handleRadioChange}
        isDisabled={status !== "pilihdept"}
        orientation="horizontal"
        size="sm"
        classNames={{
          wrapper: "gap-3 flex-wrap",
        }}
      >
        {radioOptions.map((option) => (
          <Radio
            key={option.value}
            value={option.value}
            isDisabled={option.isDisabled}
            classNames={{
              base: "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between flex-row-reverse max-w-[180px] cursor-pointer rounded-lg gap-2 p-2.5 border-2 border-transparent data-[selected=true]:border-primary data-[selected=true]:bg-primary-50 data-[disabled=true]:opacity-50 transition-all duration-200 hover:scale-105",
              label: "text-sm font-medium text-default-700",
              control: "data-[selected=true]:bg-primary border-primary",
            }}
          >
            {option.label}
          </Radio>
        ))}
      </RadioGroup>
    </div>
  );
}

export default DeptRadio;
