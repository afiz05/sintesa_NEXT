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

    // Enhanced debug log to verify filtering
    console.log("=== KdKegPP Debug ===");
    console.log("Props received:", {
      kdPN: props.kdPN,
      kdPP: props.kdPP,
      value: props.value,
      kdPNType: typeof props.kdPN,
      kdPPType: typeof props.kdPP,
    });
    console.log("Total data items:", data.length);
    console.log("First few data items:", data.slice(0, 3));

    if (props.kdPN && props.kdPN !== "00") {
      console.log(`Filtering by kdPN: ${props.kdPN}`);
      const beforeFilter = filtered.length;
      filtered = filtered.filter((item) => {
        const match = item.kdpn === props.kdPN;
        if (!match && beforeFilter < 5) {
          console.log(
            `No match: item.kdpn="${item.kdpn}" !== props.kdPN="${props.kdPN}"`
          );
        }
        return match;
      });
      console.log(
        `After kdPN filter: ${filtered.length} (was ${beforeFilter})`
      );
    }

    if (props.kdPP && props.kdPP !== "00") {
      console.log(`Filtering by kdPP: ${props.kdPP}`);
      const beforeFilter = filtered.length;

      // Handle case where kdPP might be in format "01-01" (kdpn-kdpp)
      let kdppValue = props.kdPP;
      if (props.kdPP.includes("-")) {
        kdppValue = props.kdPP.split("-")[1]; // Get the part after the dash
        console.log(
          `Extracted kdPP from composite value: "${props.kdPP}" -> "${kdppValue}"`
        );
      }

      filtered = filtered.filter((item) => {
        const match = item.kdpp === kdppValue;
        if (!match && beforeFilter < 5) {
          console.log(
            `No match: item.kdpp="${item.kdpp}" !== kdppValue="${kdppValue}"`
          );
        }
        return match;
      });
      console.log(
        `After kdPP filter: ${filtered.length} (was ${beforeFilter})`
      );
    }

    console.log("Filtered data sample:", filtered.slice(0, 3));

    console.log("Filtered data sample:", filtered.slice(0, 3));

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

    console.log("Unique activities found:", uniqueActivities.length);
    console.log("Activities:", uniqueActivities);
    console.log("=== End KdKegPP Debug ===");
    return uniqueActivities.sort((a, b) => a.kdkp.localeCompare(b.kdkp));
  }, [props.kdPN, props.kdPP]);

  // Ensure we have a valid selectedKeys Set
  const selectedKeys =
    props.value && props.value !== "" && props.value !== "XX"
      ? [props.value]
      : ["00"];

  return (
    <Select
      selectedKeys={new Set(selectedKeys)}
      onSelectionChange={(keys) => {
        const selected = Array.from(keys)[0];
        props.onChange(selected);
      }}
      size={props.size || "sm"}
      disallowEmptySelection
      className="max-w-2xl"
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
