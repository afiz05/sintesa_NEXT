import React from "react";
import { Select, SelectItem } from "@heroui/react";
import data from "../../data/Kddept.json";

const Kddept = (props) => {
  return (
    <div className="mt-0">
      <Select
        selectedKeys={props.value ? [props.value] : ["000"]}
        onSelectionChange={(keys) => {
          const value = Array.from(keys)[0];
          props.onChange(value);
        }}
        isDisabled={props.status !== "pilihdept"}
        size="sm"
        placeholder="Pilih Kementerian"
        className="max-w-xs mb-1"
      >
        <SelectItem key="000" value="000">
          Semua Kementerian
        </SelectItem>
        {data.map((kl, index) => (
          <SelectItem key={kl.kddept} value={kl.kddept}>
            {kl.kddept} - {kl.nmdept}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default Kddept;
