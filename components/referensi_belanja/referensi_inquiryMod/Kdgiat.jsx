import React from "react";
import { Select, SelectItem } from "@heroui/react";
import data from "../../../data/Kdgiat.json";

const Kdgiat = (props) => {
  const filteredData = data.filter(
    (item) =>
      item.kddept === props.kddept &&
      item.kdunit === props.kdunit &&
      item.kdprogram === props.kdprogram
  );

  return (
    <Select
      selectedKeys={props.value ? [props.value] : ["XX"]}
      onSelectionChange={(keys) => {
        const selected = Array.from(keys)[0];
        props.onChange && props.onChange(selected);
      }}
      isDisabled={props.isDisabled || props.status !== "pilihgiat"}
      placeholder={props.placeholder || "Pilih Kegiatan"}
      className={props.className}
      size={props.size || "sm"}
      disallowEmptySelection
    >
      <SelectItem key="XX" textValue="Semua Kegiatan">
        Semua Kegiatan
      </SelectItem>
      {filteredData.map((item) => (
        <SelectItem
          key={item.kdgiat}
          textValue={`${item.kdgiat} - ${item.nmgiat}`}
        >
          {item.kdgiat} - {item.nmgiat}
        </SelectItem>
      ))}
    </Select>
  );
};

export default Kdgiat;
