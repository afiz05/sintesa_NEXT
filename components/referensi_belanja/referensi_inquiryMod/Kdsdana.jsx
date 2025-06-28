import React from "react";
import { Select, SelectItem } from "@heroui/react";
import data from "../../../data/Kdsdana.json";

const Kdsdana = (props) => {
  return (
    <Select
      selectedKeys={props.value ? [props.value] : ["XX"]}
      onSelectionChange={(keys) => {
        const selected = Array.from(keys)[0];
        props.onChange && props.onChange(selected);
      }}
      isDisabled={props.status !== "pilihsdana"}
      placeholder={props.placeholder || "Pilih Sumber Dana"}
      className={props.className}
      size={props.size || "sm"}
      disallowEmptySelection
    >
      <SelectItem key="XX" textValue="Semua Sumber Dana">
        Semua Sumber Dana
      </SelectItem>
      {data.map((kl, index) => (
        <SelectItem
          key={kl.kdsdana}
          textValue={`${kl.kdsdana} - ${kl.nmsdana2}`}
        >
          {kl.kdsdana} - {kl.nmsdana2}
        </SelectItem>
      ))}
    </Select>
  );
};

export default Kdsdana;
