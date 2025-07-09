import React from "react";
import { Select, SelectItem } from "@heroui/react";

const JenisKontrak = (props) => {
  // Hardcoded contract types data
  const contractTypes = [
    { key: "SYC", value: "SYC", name: "SYC - Single Year Contract" },
    { key: "MYC", value: "MYC", name: "MYC - Multi Years Contract" },
  ];

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
      placeholder="Pilih Jenis Kontrak"
      className="max-w-full"
      aria-label="Pilih Jenis Kontrak"
    >
      <SelectItem key="00" value="00" textValue="Semua Status">
        Semua Status
      </SelectItem>
      {contractTypes.map((contract) => (
        <SelectItem
          key={contract.key}
          value={contract.value}
          textValue={contract.name}
        >
          {contract.name}
        </SelectItem>
      ))}
    </Select>
  );
};

export default JenisKontrak;
