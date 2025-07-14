import React from "react";
import { Select, SelectItem } from "@heroui/react";
import data from "../../../data/KdTEMA.json";

const JenisTEMA = (props) => {
  // Ensure we have a valid selectedKeys Set
  const selectedKeys =
    props.value && props.value !== "" && props.value !== "XX"
      ? [props.value]
      : ["00"];

  return (
    <Select
      isVirtualized
      selectedKeys={new Set(selectedKeys)}
      onSelectionChange={(keys) => {
        const value = Array.from(keys)[0];
        props.onChange(value);
      }}
      size="sm"
      placeholder="Pilih Tematik"
      className="max-w-full"
      aria-label={props["aria-label"] || "Pilih Tematik"}
    >
      <SelectItem key="00" value="00" textValue="Semua Tematik">
        Semua Tematik
      </SelectItem>
      {data.map((tema, index) => (
        <SelectItem
          key={tema.kdtema}
          value={tema.kdtema}
          textValue={`${tema.kdtema} - ${tema.nmtema}`}
        >
          {tema.kdtema} - {tema.nmtema}
        </SelectItem>
      ))}
    </Select>
  );
};

export default JenisTEMA;
