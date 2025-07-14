import React, { useEffect, useMemo } from "react";
import { Select, SelectItem } from "@heroui/react";
import data from "../../../data/KdKP.json";

const KodeKegPP = (props) => {
  // Reset to "00" when any parent filter changes
  useEffect(() => {
    if ((props.kdPN || props.kdPP) && props.value !== "00") {
      props.onChange("00");
    }
  }, [props.kdPN, props.kdPP]);

  // Filter data based on selected parent filters
  const filteredData = useMemo(() => {
    let filtered = data;

    if (props.kdPN && props.kdPN !== "00") {
      const beforeFilter = filtered.length;
      filtered = filtered.filter((item) => {
        const match = item.kdpn === props.kdPN;
        if (!match && beforeFilter < 5) {
        }
        return match;
      });
    }

    if (props.kdPP && props.kdPP !== "00") {
      const beforeFilter = filtered.length;

      // Handle case where kdPP might be in format "01-01" (kdpn-kdpp)
      let kdppValue = props.kdPP;
      if (props.kdPP.includes("-")) {
        kdppValue = props.kdPP.split("-")[1]; // Get the part after the dash
      }

      filtered = filtered.filter((item) => {
        const match = item.kdpp === kdppValue;
        if (!match && beforeFilter < 5) {
        }
        return match;
      });
    }

    // Get unique kdkp values with their descriptions
    const uniqueActivities = [];
    const seen = new Set();

    filtered.forEach((item) => {
      if (!seen.has(item.kdkp)) {
        seen.add(item.kdkp);
        uniqueActivities.push({
          kdkp: item.kdkp,
          deskripsi: item.deskripsi,
        });
      }
    });

    return uniqueActivities.sort((a, b) => a.kdkp.localeCompare(b.kdkp));
  }, [props.kdPN, props.kdPP]);

  // Ensure we have a valid selectedKeys Set
  const selectedKeys =
    props.value && props.value !== "" && props.value !== "XX"
      ? [props.value]
      : ["00"];

  return (
    <Select
      aria-label="Pilih Kegiatan Prioritas"
      selectedKeys={new Set(selectedKeys)}
      onSelectionChange={(keys) => {
        const selected = Array.from(keys)[0];
        props.onChange(selected);
      }}
      size={props.size || "sm"}
      disallowEmptySelection
      className="max-w-full"
    >
      <SelectItem key="00" textValue="Semua Kegiatan Prioritas">
        Semua Kegiatan Prioritas
      </SelectItem>
      {filteredData.map((item) => (
        <SelectItem
          key={item.kdkp}
          value={item.kdkp}
          textValue={`${item.kdkp} - ${item.deskripsi}`}
        >
          {item.kdkp} - {item.deskripsi}
        </SelectItem>
      ))}
    </Select>
  );
};

export default KodeKegPP;
