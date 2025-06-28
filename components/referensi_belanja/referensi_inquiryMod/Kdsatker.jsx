import React from "react";
import data from "../../../data/Kdsatker.json";
import { Select, SelectItem } from "@heroui/react";

const Kdsatker = (props) => {
  const { isDisabled, ...otherProps } = props;

  // Filter satker based on all parent filters
  const filteredSatker = data.filter((item) => {
    // Check Kementerian filter
    if (props.kddept && props.kddept !== "XX" && item.kddept !== props.kddept) {
      return false;
    }

    // Check Unit filter
    if (props.kdunit && props.kdunit !== "XX" && item.kdunit !== props.kdunit) {
      return false;
    }

    // Check Lokasi (Province) filter
    if (
      props.kdlokasi &&
      props.kdlokasi !== "XX" &&
      item.kdlokasi !== props.kdlokasi
    ) {
      return false;
    }

    // Check KPPN filter
    if (props.kdkppn && props.kdkppn !== "XX" && item.kdkppn !== props.kdkppn) {
      return false;
    }

    return true;
  });

  return (
    <div>
      <div className="mt-2">
        <Select
          selectedKeys={props.value ? new Set([props.value]) : new Set(["XX"])}
          onSelectionChange={(keys) => {
            const selected = Array.from(keys)[0] || "XX";
            if (props.onChange) {
              props.onChange(selected);
            }
          }}
          className={props.className || "form-select form-select-sm"}
          aria-label="Pilih Satker"
          isDisabled={isDisabled || props.status !== "pilihsatker"}
          disallowEmptySelection={false}
          placeholder={props.placeholder || "Pilih Satker"}
          size={props.size || "sm"}
        >
          <SelectItem key="XX" value="XX" textValue="Semua Satker">
            Semua Satker
          </SelectItem>
          {filteredSatker.map((item) => (
            <SelectItem
              key={item.kdsatker}
              value={item.kdsatker}
              textValue={`${item.kdsatker} - ${item.nmsatker}`}
            >
              {item.kdsatker} - {item.nmsatker}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default Kdsatker;
