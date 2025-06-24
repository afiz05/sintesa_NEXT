import React, { useContext } from "react";
import MyContext from "@/utils/Context";
import { Select, SelectItem } from "@heroui/react";
import data from "../../data/Kdkabkota.json";

const Kdkabkota = (props) => {
  const { role, kdlokasi } = useContext(MyContext);
  return (
    <Select
      selectedKey={props.value ?? "00"}
      onSelectionChange={props.onChange}
      isDisabled={props.status !== "pilihkdkabkota"}
      size={props.size || "sm"}
      placeholder={props.placeholder || "Pilih Kabupaten/Kota"}
      className={props.className || "min-w-0 flex-[2]"}
    >
      <SelectItem key="00" value="00">
        Semua Kabupaten/Kota
      </SelectItem>
      {data
        .filter((item) => item.kdlokasi === (props.kdlokasi || kdlokasi))
        .map((item) => (
          <SelectItem key={item.kabkota} value={item.kabkota}>
            {item.kabkota} - {item.nmkabkota}
          </SelectItem>
        ))}
    </Select>
  );
};

export default Kdkabkota;
