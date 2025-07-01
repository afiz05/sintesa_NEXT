"use client";
import React from "react";
import { Select, SelectItem } from "@heroui/react";

const KodePRI = (props) => {
  // Helper to get default selection
  const getDefaultSelection = () => {
    if (props.kdproy && props.kdproy !== "XX") return [props.kdproy];
    return ["00"]; // Default to "Semua Proyek Prioritas"
  };

  return (
    <Select
      selectedKeys={getDefaultSelection()}
      onSelectionChange={(keys) => {
        const selected = Array.from(keys)[0];
        props.onChange(selected);
      }}
      size={props.size || "sm"}
      disallowEmptySelection
      className="form-select form-select-sm text-select"
      aria-label=".form-select-sm"
      placeholder="Pilih Proyek Prioritas"
    >
      <SelectItem key="00" textValue="Semua Proyek Prioritas">
        Semua Proyek Prioritas
      </SelectItem>
    </Select>
  );
};

export default KodePRI;
