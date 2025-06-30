import React from "react";
import { Select, SelectItem } from "@heroui/react";
import data from "../../../data/Kdfungsi.json";

const Kdfungsi = (props) => {
  const handleSelectionChange = (keys) => {
    const val = Array.from(keys)[0] || "00";
    if (props.onChange) props.onChange(val);
  };

  // Map "XX" (default state) to "00" (component default)
  const selectedValue = props.kdfungsi === "XX" ? "00" : props.kdfungsi || "00";

  return (
    <Select
      selectedKeys={[selectedValue]}
      onSelectionChange={handleSelectionChange}
      isDisabled={props.isDisabled || props.status !== "pilihfungsi"}
      size={props.size || "sm"}
      placeholder="Pilih Fungsi"
      className={props.className || "max-w-xs mb-2"}
      disallowEmptySelection
      aria-label="Pilih Fungsi"
      classNames={{
        trigger: "w-full max-w-full",
        value: "truncate pr-8 max-w-full overflow-hidden",
        mainWrapper: "w-full max-w-full",
        innerWrapper: "w-full max-w-full overflow-hidden",
        base: "w-full max-w-full",
      }}
    >
      <SelectItem key="00" textValue="Semua Fungsi">
        Semua Fungsi
      </SelectItem>
      {data.map((kl, index) => (
        <SelectItem
          key={kl.kdfungsi}
          textValue={`${kl.kdfungsi} - ${kl.nmfungsi}`}
        >
          {kl.kdfungsi} - {kl.nmfungsi}
        </SelectItem>
      ))}
    </Select>
  );
};

export default Kdfungsi;
