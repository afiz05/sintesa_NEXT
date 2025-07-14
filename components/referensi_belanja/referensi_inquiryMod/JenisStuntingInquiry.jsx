import React from "react";
import { Select, SelectItem } from "@heroui/react";
import data from "../../../data/KdStunting.json";

const JenisStuntingInquiry = (props) => {
  // Ensure we have a valid selectedKeys Set
  const selectedKeys =
    props.value && props.value !== "" && props.value !== "XX"
      ? [props.value]
      : ["00"];

  return (
    <Select
      selectedKeys={new Set(selectedKeys)}
      onSelectionChange={(keys) => {
        const value = Array.from(keys)[0];
        props.onChange(value);
      }}
      size="sm"
      placeholder="Pilih Tematik Stunting"
      className="min-w-2xl max-w-full"
      aria-label={props["aria-label"] || "Pilih Tematik Stunting"}
    >
      <SelectItem
        key="00"
        value="00"
        textValue="Semua Belanja dan Tematik Stunting"
      >
        Semua Belanja dan Tematik Stunting
      </SelectItem>
      {data.map((stun, index) => (
        <SelectItem
          key={stun.kdstunting}
          value={stun.kdstunting}
          textValue={`${stun.kdstunting} - ${stun.nmstunting}`}
        >
          {stun.kdstunting} - {stun.nmstunting}
        </SelectItem>
      ))}
    </Select>
  );
};

export default JenisStuntingInquiry;
