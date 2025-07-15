"use client";
import React from "react";
import { Calendar } from "lucide-react";
import { KartuMonitoring } from "./kartu-monitoring";
import { PetaMbg } from "./peta-mbg";
import { PenerimaMbgWilayah } from "./penerima-mbg-wilayah";
import { PenerimaMbgKelompok } from "./penerima-mbg-kelompok";

export const DashboardMbg = () => {
  return (
    <div className="my-3 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Dashboard MBG</h1>
        </div>
        <div className="flex gap-2">
          <Calendar className="text-default-400" size={20} />
          <span className="text-sm text-default-500">
            Last updated: {new Date().toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Monitoring Cards */}
      <KartuMonitoring />

      {/* Main Content Grid */}
      <div className="flex flex-col lg:flex-row gap-6 h-fit">
        {/* Performance Chart - 2/3 width */}
        <div className="flex-1 lg:flex-[3] h-full">
          <PetaMbg />
        </div>

        {/* Recent Activities - 1/3 width */}
        <div className="flex-1 lg:flex-[1] h-full">
          <PenerimaMbgWilayah />
        </div>
      </div>

      {/* Executive Summary */}
      <PenerimaMbgKelompok />
    </div>
  );
};
