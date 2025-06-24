import React from "react";
import { Select, SelectItem } from "@heroui/react";
import data from "../../data/KdStunting.json";

const JenisStuntingInquiry = (props) => {
  return (
    <Select
      selectedKeys={props.value ? [props.value] : ["00"]}
      onSelectionChange={(keys) => {
        const value = Array.from(keys)[0];
        props.onChange(value);
      }}
      size="sm"
      placeholder="Pilih Tematik Stunting"
      className="max-w-xs mb-1"
    >
      <SelectItem key="00" value="00">
        Tematik Stunting
      </SelectItem>
      {data.map((stun, index) => (
        <SelectItem key={stun.kdstunting} value={stun.kdstunting}>
          {stun.kdstunting} - {stun.nmstunting}
        </SelectItem>
      ))}
    </Select>
  );
};

export default JenisStuntingInquiry;
