import React, { useContext } from "react";
import MyContext from "@/utils/Context";
import { Select, SelectItem } from "@heroui/react";
import data from "../../../data/Kdkabkota.json";

const Kdkabkota = (props) => {
  const { role, kdlokasi } = useContext(MyContext);
  const handleSelectionChange = (keys) => {
    const val = Array.from(keys)[0] || "XX";
    if (props.onChange) {
      props.onChange(val);
    }
  };

  // Get the filter province value
  const filterKdlokasi = props.kdlokasi || kdlokasi; // Determine available data
  const availableData = data.filter((item) => {
    // If kdlokasi is "XX" or falsy (no specific province selected), show no additional kabkota
    // Only show kabkota when a specific province is selected
    // Also exclude kdkabkota="XX" to avoid duplicate keys with hardcoded "Semua Kabupaten/Kota"
    return (
      filterKdlokasi &&
      filterKdlokasi !== "XX" &&
      item.kdlokasi === filterKdlokasi &&
      item.kdkabkota !== "XX"
    );
  }); // Ensure the selected value is valid
  const availableKeys = ["XX", ...availableData.map((item) => item.kdkabkota)];
  const currentValue = props.value || "XX";
  const validSelectedValue = availableKeys.includes(currentValue)
    ? currentValue
    : "XX";

  return (
    <Select
      isVirtualized
      selectedKeys={[validSelectedValue]}
      onSelectionChange={handleSelectionChange}
      isDisabled={props.isDisabled || props.status !== "pilihkdkabkota"}
      size={props.size || "sm"}
      placeholder={props.placeholder || "Pilih Kabupaten/Kota"}
      className={props.className || "min-w-0 flex-[2]"}
      disallowEmptySelection
      aria-label="Pilih Kabupaten/Kota"
    >
      {" "}
      <SelectItem key="XX" textValue="Semua Kabupaten/Kota">
        Semua Kabupaten/Kota
      </SelectItem>
      {availableData.map((item) => (
        <SelectItem
          key={item.kdkabkota}
          textValue={`${item.kdkabkota} - ${item.nmkabkota}`}
        >
          <span className="block whitespace-nowrap overflow-hidden text-ellipsis">
            {item.kdkabkota} - {item.nmkabkota}
          </span>
        </SelectItem>
      ))}
    </Select>
  );
};

export default Kdkabkota;
