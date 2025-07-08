"use client";
import React from "react";
import { Card, CardHeader } from "@heroui/react";

// Import the filter components
import StuntingFilter from "./FilterGroups/StuntingFilter";

const StuntingCard = ({ inquiryState }) => {
  return (
    <div className="w-full space-y-4 bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-zinc-900 dark:to-zinc-900 shadow-none pl-2 pr-6 py-4 mb-4 rounded-2xl">
      {/* Stacked Filter Components */}
      <StuntingFilter inquiryState={inquiryState} />
    </div>
  );
};

export default StuntingCard;
