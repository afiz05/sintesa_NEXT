import React from "react";
import { Select, SelectItem } from "@heroui/react";

const Kdakun = (props) => {
  // Always default to AKUN (Kode Akun)
  const getDefaultSelection = () => {
    if (props.value) return [props.value];
    return ["AKUN"];
  };

  // Add a handler to pass both value and type to parent
  const handleSelectionChange = (keys) => {
    const selected = Array.from(keys)[0];
    // Pass the selected type (AKUN, BKPK, JENBEL) to parent
    if (props.onChange) {
      props.onChange(selected); // You can expand this to pass more info if needed
    }
    if (props.onTypeChange) {
      props.onTypeChange(selected); // Optional: for explicit type callback
    }
  };

  return (
    <Select
      selectedKeys={getDefaultSelection()}
      onSelectionChange={handleSelectionChange}
      isDisabled={props.status !== "pilihakun"}
      className={props.className}
      size={props.size || "sm"}
      disallowEmptySelection
      aria-label={props["aria-label"] || "Pilih Jenis Kode Akun"}
    >
      {/* Always show Kode Akun as the first option */}
      <SelectItem key="AKUN" textValue="Kode Akun">
        Kode Akun
      </SelectItem>

      {/* Show all other options */}
      <SelectItem key="BKPK" textValue="Kode BKPK">
        Kode BKPK
      </SelectItem>
      <SelectItem key="JENBEL" textValue="Jenis Belanja">
        Jenis Belanja
      </SelectItem>
    </Select>
  );
};

export default Kdakun;
