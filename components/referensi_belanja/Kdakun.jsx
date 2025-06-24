import React from "react";
import { Select, SelectItem } from "@heroui/react";

const Kdakun = (props) => {
  return (
    <Select
      selectedKeys={props.kdakun ? [props.kdakun] : ["AKUN"]}
      onSelectionChange={(keys) => {
        const value = Array.from(keys)[0];
        props.onChange(value);
      }}
      isDisabled={props.status !== "pilihakun"}
      size="sm"
      placeholder="Pilih Akun"
      className="max-w-xs mb-2"
    >
      {props.jenlap === "1" ? (
        <SelectItem key="JENBEL" value="JENBEL">
          Jenis Belanja
        </SelectItem>
      ) : (
        <>
          {props.jenis === "tematik" ? (
            <SelectItem key="BKPK" value="BKPK">
              Kode BKPK
            </SelectItem>
          ) : (
            <>
              <SelectItem key="AKUN" value="AKUN">
                Kode Akun
              </SelectItem>
              <SelectItem key="BKPK" value="BKPK">
                Kode BKPK
              </SelectItem>
              <SelectItem key="JENBEL" value="JENBEL">
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
