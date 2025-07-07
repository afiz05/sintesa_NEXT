"use client";
import React from "react";
import { Card, CardHeader } from "@heroui/react";

// Import the filter components
import InflasiFilter from "./FilterGroups/InflasiFilter";

const InflasiCard = ({ inquiryState }) => {
  return (
    <div className="w-full space-y-4 shadow-sm px-6 py-4 mb-4 rounded-xl">
      {/* Stacked Filter Components */}
      <InflasiFilter inquiryState={inquiryState} />
    </div>
  );
};

export default InflasiCard;
