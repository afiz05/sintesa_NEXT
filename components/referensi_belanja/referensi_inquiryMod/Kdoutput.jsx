import React from "react";
import data from "../../../data/Kdoutput.json";
import { Select, SelectItem } from "@heroui/react";

const Kdoutput = (props) => {
  const filteredData = data.filter(
    (item) =>
      item.kddept === props.kddept &&
      item.kdunit === props.kdunit &&
      item.kdprogram === props.kdprogram &&
      item.kdgiat === props.kdgiat
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
      isDisabled={props.isDisabled || props.status !== "pilihoutput"}
      size={props.size || "sm"}
      placeholder="Pilih Output"
      className={props.className || "max-w-xs mb-2"}
      disallowEmptySelection
      aria-label="Pilih Output"
      classNames={{
        trigger: "w-full max-w-full",
        value: "truncate pr-8 max-w-full overflow-hidden",
        mainWrapper: "w-full max-w-full",
        innerWrapper: "w-full max-w-full overflow-hidden",
        base: "w-full max-w-full",
      }}
    >
      <SelectItem key="XX" textValue="Semua Output">
        Semua Output
      </SelectItem>
      {filteredData.map((item) => (
        <SelectItem
          key={item.kdoutput}
          textValue={`${item.kdoutput} - ${item.nmoutput}`}
        >
          {item.kdoutput} - {item.nmoutput}
        </SelectItem>
      ))}
    </Select>
  );
};

export default Kdoutput;
