"use client";
import React, { useEffect, useMemo } from "react";
import { Select, SelectItem } from "@heroui/react";
import data from "../../../data/KdPRI.json";

const KodePRI = (props) => {
  // Reset to "00" when any parent filter changes
  useEffect(() => {
    if ((props.kdPN || props.kdPP || props.KegPP) && props.value !== "00") {
      props.onChange("00");
    }
  }, [props.kdPN, props.kdPP, props.KegPP]);

  // Filter data based on selected parent filters
  const filteredData = useMemo(() => {
    let filtered = data;

    if (props.kdPN && props.kdPN !== "00") {
      filtered = filtered.filter((item) => item.kdpn === props.kdPN);
    }

    if (props.kdPP && props.kdPP !== "00") {
      // Handle case where kdPP might be in format "01-01" (kdpn-kdpp)
      let kdppValue = props.kdPP;
      if (props.kdPP.includes("-")) {
        kdppValue = props.kdPP.split("-")[1]; // Get the part after the dash
      }

      filtered = filtered.filter((item) => item.kdpp === kdppValue);
    }

    if (props.KegPP && props.KegPP !== "00") {
      filtered = filtered.filter((item) => item.kdkp === props.KegPP);
    }

    // Get unique kdproy values with their descriptions
    const uniqueProjects = [];
    const seen = new Set();

    filtered.forEach((item) => {
      if (!seen.has(item.kdproy)) {
        seen.add(item.kdproy);
        uniqueProjects.push({
          kdproy: item.kdproy,
          deskripsi: item.deskripsi,
        });
      }
    });

    return uniqueProjects.sort((a, b) => a.kdproy.localeCompare(b.kdproy));
  }, [props.kdPN, props.kdPP, props.KegPP]);

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
      className="form-select form-select-sm text-select max-w-full"
      aria-label=".form-select-sm"
      placeholder="Pilih Proyek Prioritas"
    >
      <SelectItem key="00" textValue="Semua Proyek Prioritas">
        Semua Proyek Prioritas
      </SelectItem>
      {filteredData.map((item) => (
        <SelectItem
          key={item.kdproy}
          value={item.kdproy}
          textValue={`${item.kdproy} - ${item.deskripsi}`}
        >
          {item.kdproy} - {item.deskripsi}
        </SelectItem>
      ))}
    </Select>
  );
};

export default KodePRI;
