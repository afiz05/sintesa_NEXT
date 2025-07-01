import React from "react";
import { Select, SelectItem } from "@heroui/react";

const Kdakun = (props) => {
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
      selectedKeys={props.value ? [props.value] : ["AKUN"]}
      onSelectionChange={handleSelectionChange}
      isDisabled={props.status !== "pilihakun"}
      placeholder={props.placeholder || "Pilih Akun"}
      className={props.className}
      size={props.size || "sm"}
      disallowEmptySelection
    >
      {props.jenlap === "1" ? (
        <SelectItem key="JENBEL" textValue="Jenis Belanja">
          Jenis Belanja
        </SelectItem>
      ) : (
        <>
          {props.jenis === "tematik" ? (
            <SelectItem key="BKPK" textValue="Kode BKPK">
              Kode BKPK
            </SelectItem>
          ) : (
            <>
              <SelectItem key="AKUN" textValue="Kode Akun">
                Kode Akun
              </SelectItem>
              <SelectItem key="BKPK" textValue="Kode BKPK">
                Kode BKPK
              </SelectItem>
              <SelectItem key="JENBEL" textValue="Jenis Belanja">
                Jenis Belanja
              </SelectItem>
            </>
          )}
        </>
      )}
    </Select>
  );
};

export default Kdakun;
