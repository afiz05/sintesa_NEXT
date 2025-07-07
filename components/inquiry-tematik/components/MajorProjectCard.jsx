"use client";
import React from "react";
import { Card, CardHeader } from "@heroui/react";
import { Crown } from "lucide-react";

// Import the filter components
import MajorprFilter from "./FilterGroups/MajorprFilter";

const MajorProjectCard = ({ inquiryState }) => {
  return (
    <div className="w-full space-y-4 shadow-sm px-6 py-4 mb-4 rounded-xl">
      {/* Stacked Filter Components */}
      <MajorprFilter inquiryState={inquiryState} />
    </div>
  );
};

export default MajorProjectCard;
