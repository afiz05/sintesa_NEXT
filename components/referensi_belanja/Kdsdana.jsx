import React from "react";
import { Select, SelectItem } from "@heroui/react";
import data from "../../data/Kdsdana.json";

const Kdsdana = (props) => {
  return (
    <Select
      selectedKeys={props.value ? [props.value] : ["00"]}
      onSelectionChange={(keys) => {
        const value = Array.from(keys)[0];
        props.onChange(value);
      }}
      isDisabled={props.status !== "pilihsdana"}
      size="sm"
      placeholder="Pilih Sumber Dana"
      className="max-w-xs mb-2"
    >
      <SelectItem key="00" value="00">
        Semua Sumber Dana
      </SelectItem>
      {data.map((kl, index) => (
        <SelectItem key={kl.kdsdana} value={kl.kdsdana}>
          {kl.kdsdana} - {kl.nmsdana2}
        </SelectItem>
      ))}
    </Select>
  );
};

export default Kdsdana;
