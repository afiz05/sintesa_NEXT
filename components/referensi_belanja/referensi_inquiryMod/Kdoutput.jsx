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

  return (
    <Select
      selectedKeys={props.value ? [props.value] : ["XX"]}
      onSelectionChange={(keys) => {
        const selected = Array.from(keys)[0];
        props.onChange && props.onChange(selected);
      }}
      isDisabled={props.status !== "pilihoutput"}
      placeholder={props.placeholder || "Pilih Output"}
      className={props.className}
      size={props.size || "sm"}
      disallowEmptySelection
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
