"use client";
import React from "react";
import { Card, CardHeader } from "@heroui/react";
import { Crown } from "lucide-react";

// Import the filter components
import MajorprFilter from "./FilterGroups/MajorprFilter";

const MajorProjectCard = ({ inquiryState }) => {
  return (
    <div className="w-full space-y-4 bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-zinc-900 dark:to-zinc-900 shadow-none px-6 py-4 mb-4 rounded-2xl">
      {/* Stacked Filter Components */}
      <MajorprFilter inquiryState={inquiryState} />
    </div>
  );
};

export default MajorProjectCard;
