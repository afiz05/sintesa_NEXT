import React from "react";
import { Select, SelectItem } from "@heroui/react";
import data from "../../../data/Kdsfungsi.json";

const Kdsfungsi = (props) => {
  const handleSelectionChange = (keys) => {
    const val = Array.from(keys)[0] || "00";
    if (props.onChange) props.onChange(val);
  };

  // Map "XX" (default state) to "00" (component default)
  const selectedValue =
    props.kdsfungsi === "XX" ? "00" : props.kdsfungsi || "00";

  return (
    <Select
      selectedKeys={[selectedValue]}
      onSelectionChange={handleSelectionChange}
      isDisabled={props.isDisabled || props.status !== "pilihsubfungsi"}
      size={props.size || "sm"}
      placeholder="Pilih Sub Fungsi"
      className={props.className || "max-w-xs mb-2"}
      disallowEmptySelection
      aria-label="Pilih Sub Fungsi"
      classNames={{
        trigger: "w-full max-w-full",
        value: "truncate pr-8 max-w-full overflow-hidden",
        mainWrapper: "w-full max-w-full",
        innerWrapper: "w-full max-w-full overflow-hidden",
        base: "w-full max-w-full",
      }}
    >
      <SelectItem key="00" textValue="Semua Sub Fungsi">
        Semua Sub Fungsi
      </SelectItem>
      {data
        .filter((item) => item.kdfungsi === props.kdfungsi)
        .map((kl, index) => (
          <SelectItem
            key={kl.kdsfungsi}
            textValue={`${kl.kdsfungsi} - ${kl.nmsfungsi}`}
          >
            {kl.kdsfungsi} - {kl.nmsfungsi}
          </SelectItem>
        ))}
    </Select>
  );
};

export default Kdsfungsi;
