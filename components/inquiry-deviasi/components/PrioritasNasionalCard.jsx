"use client";
import React from "react";
import { Card, CardHeader } from "@heroui/react";
import { Crown } from "lucide-react";

// Import the filter components
import PrinasFilter from "./FilterGroups/PrinasFilter";
import ProgrampriFilter from "./FilterGroups/ProgrampriFilter";
import KegiatanpriFilter from "./FilterGroups/KegiatanpriFilter";
import ProyekpriFilter from "./FilterGroups/ProyekpriFilter";

const PrioritasNasionalCard = ({ inquiryState }) => {
  return (
    <div className="w-full space-y-4 bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-zinc-900 dark:to-zinc-900 shadow-none pl-2 pr-6 py-4 mb-4 rounded-2xl">
      {/* Header Card
      <Card className="shadow-lg border-0 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-900">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl shadow-lg">
              <Crown className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                Filter Prioritas
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Gunakan filter prioritas untuk mempersempit data inquiry
              </p>
            </div>
          </div>
        </CardHeader>
      </Card> */}
      {/* Stacked Filter Components */}
      <PrinasFilter inquiryState={inquiryState} />
      <ProgrampriFilter inquiryState={inquiryState} />
      <KegiatanpriFilter inquiryState={inquiryState} />
      <ProyekpriFilter inquiryState={inquiryState} />
    </div>
  );
};

export default PrioritasNasionalCard;
