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

    // Debug log to verify filtering
    console.log(
      "KdPRI - kdPN:",
      props.kdPN,
      "kdPP:",
      props.kdPP,
      "KegPP:",
      props.KegPP,
      "total data:",
      data.length
    );

    if (props.kdPN && props.kdPN !== "00") {
      filtered = filtered.filter((item) => item.kdpn === props.kdPN);
      console.log("KdPRI - After kdPN filter:", filtered.length);
    }

    if (props.kdPP && props.kdPP !== "00") {
      console.log(`KdPRI - Filtering by kdPP: ${props.kdPP}`);

      // Handle case where kdPP might be in format "01-01" (kdpn-kdpp)
      let kdppValue = props.kdPP;
      if (props.kdPP.includes("-")) {
        kdppValue = props.kdPP.split("-")[1]; // Get the part after the dash
        console.log(
          `KdPRI - Extracted kdPP from composite value: "${props.kdPP}" -> "${kdppValue}"`
        );
      }

      filtered = filtered.filter((item) => item.kdpp === kdppValue);
      console.log("KdPRI - After kdPP filter:", filtered.length);
    }

    if (props.KegPP && props.KegPP !== "00") {
      filtered = filtered.filter((item) => item.kdkp === props.KegPP);
      console.log("KdPRI - After KegPP filter:", filtered.length);
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

    console.log("KdPRI - Unique projects:", uniqueProjects.length);
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
      className="form-select form-select-sm text-select max-w-2xl"
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
