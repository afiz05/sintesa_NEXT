import React, { useContext } from "react";
import MyContext from "@/utils/Context";
import { Select, SelectItem } from "@heroui/react";
import data from "../../data/Kdkanwil.json";

const Kdkanwil = (props) => {
  const { role, kdkanwil } = useContext(MyContext);
  return (
    <Select
      selectedKey={props.value ?? "00"}
      onSelectionChange={props.onChange}
      isDisabled={props.status !== "pilihkanwil"}
      size={props.size || "sm"}
      placeholder={props.placeholder || "Pilih Kanwil"}
      className={props.className || "min-w-0 flex-[2]"}
    >
      {(role === "0" || role === "1" || role === "X") && (
        <SelectItem key="00" value="00">
          Semua Kanwil
        </SelectItem>
      )}
      {role === "0" || role === "1" || role === "X"
        ? data.map((item) => (
            <SelectItem key={item.kdkanwil} value={item.kdkanwil}>
              {item.kdkanwil} - {item.nmkanwil}
            </SelectItem>
          ))
        : data
            .filter((item) => item.kdkanwil === kdkanwil)
            .map((item) => (
              <SelectItem key={item.kdkanwil} value={kdkanwil}>
                {item.kdkanwil} - {item.nmkanwil}
              </SelectItem>
            ))}
    </Select>
  );
};

export default Kdkanwil;
