import React, { useContext } from "react";
import { Select, SelectItem } from "@heroui/react";
import MyContext from "@/utils/Context";
import data from "../../data/Kdlokasi.json";

const Kdlokasi = (props) => {
  const { role, kdlokasi } = useContext(MyContext);
  return (
    <Select
      selectedKey={props.value ?? "00"}
      onSelectionChange={props.onChange}
      isDisabled={props.status !== "pilihprov"}
      size={props.size || "sm"}
      placeholder={props.placeholder || "Pilih Provinsi"}
      className={props.className || "min-w-0 flex-[2]"}
    >
      {(role === "0" || role === "1" || role === "X") && (
        <SelectItem key="00" value="00">
          Semua Provinsi
        </SelectItem>
      )}
      {role === "0" || role === "1" || role === "X"
        ? data.map((item) => (
            <SelectItem key={item.kdlokasi} value={item.kdlokasi}>
              {item.kdlokasi} - {item.nmlokasi}
            </SelectItem>
          ))
        : data
            .filter((item) => item.kdlokasi === kdlokasi)
            .map((item) => (
              <SelectItem key={item.kdlokasi} value={kdlokasi}>
                {item.kdlokasi} - {item.nmlokasi}
              </SelectItem>
            ))}
    </Select>
  );
};

export default Kdlokasi;
