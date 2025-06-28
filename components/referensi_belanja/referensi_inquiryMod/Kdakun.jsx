import React from "react";
import { Select, SelectItem } from "@heroui/react";

const Kdakun = (props) => {
  return (
    <Select
      selectedKeys={props.value ? [props.value] : ["AKUN"]}
      onSelectionChange={(keys) => {
        const selected = Array.from(keys)[0];
        props.onChange && props.onChange(selected);
      }}
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
