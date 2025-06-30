import React from "react";
import { Select, SelectItem } from "@heroui/react";
import data from "../../../data/Kdprogram.json";

const Kdprogram = (props) => {
  const filteredData = data.filter(
    (item) => item.kddept === props.kddept && item.kdunit === props.kdunit
  );

  const selectedValue = props.value ? [props.value] : ["XX"];

  const handleSelectionChange = (keys) => {
    const selected = Array.from(keys)[0];
    props.onChange && props.onChange(selected);
  };

  return (
    <Select
      selectedKeys={selectedValue}
      onSelectionChange={handleSelectionChange}
      isDisabled={props.isDisabled || props.status !== "pilihprogram"}
      size={props.size || "sm"}
      placeholder="Pilih Program"
      className={props.className || "max-w-xs mb-2"}
      disallowEmptySelection
      aria-label="Pilih Program"
      classNames={{
        trigger: "w-full max-w-full",
        value: "truncate pr-8 max-w-full overflow-hidden",
        mainWrapper: "w-full max-w-full",
        innerWrapper: "w-full max-w-full overflow-hidden",
        base: "w-full max-w-full",
      }}
    >
      <SelectItem key="XX" textValue="Semua Program">
        Semua Program
      </SelectItem>
      {filteredData.map((item) => (
        <SelectItem
          key={item.kdprogram}
          textValue={`${item.kdprogram} - ${item.nmprogram}`}
        >
          {item.kdprogram} - {item.nmprogram}
        </SelectItem>
      ))}
    </Select>
  );
};

export default Kdprogram;
