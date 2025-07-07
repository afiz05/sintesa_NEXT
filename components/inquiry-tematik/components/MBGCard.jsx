"use client";
import React from "react";
import { Card, CardHeader } from "@heroui/react";

// Import the filter components
import MBGFilter from "./FilterGroups/MBGFilter";

const MBGCard = ({ inquiryState }) => {
  return (
    <div className="w-full space-y-4 shadow-sm px-6 py-4 mb-4 rounded-xl">
      {/* Stacked Filter Components */}
      <MBGFilter inquiryState={inquiryState} />
    </div>
  );
};

export default MBGCard;
