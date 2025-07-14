"use client";
import React, { useState } from "react";
import { Tabs, Tab } from "@heroui/react";
import { Database, Receipt, RotateCcw } from "lucide-react";
import DataKmk25 from "./dataKmk25";
import RekamTransaksi25 from "./Transaksi25";
import Rekon25 from "./rekon25";

const Dau2025Index = () => {
  const [selectedTab, setSelectedTab] = useState("dataKMK");

  return (
    <div className="w-full max-w-[100vw] p-3 sm:p-6 overflow-hidden box-border">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">
            Dana Alokasi Umum 2025
          </h1>
          <p className="text-sm text-default-500 mt-1">
            Sistem Pengelolaan Dana Alokasi Umum Tahun Anggaran 2025
          </p>
        </div>
      </div>

      {/* Tabs and Content */}
      <Tabs
        selectedKey={selectedTab}
        onSelectionChange={(key) => setSelectedTab(key)}
        variant="solid"
        color="default"
        size="lg"
        fullWidth
        classNames={{
          tabList: "w-full flex flex-col sm:flex-row gap-1 sm:gap-0",
          tab: "flex-1 min-h-[48px] sm:min-h-auto",
          panel: "w-full p-0",
        }}
      >
        <Tab
          key="dataKMK"
          title={
            <div className="flex items-center gap-1 sm:gap-2">
              <Database size={14} className="sm:w-4 sm:h-4" />
              <span className="font-semibold text-xs sm:text-base">
                <span className="hidden sm:inline">Data KMK</span>
                <span className="sm:hidden">KMK</span>
              </span>
            </div>
          }
        >
          <DataKmk25 />
        </Tab>
        <Tab
          key="transaksi"
          title={
            <div className="flex items-center gap-1 sm:gap-2">
              <Receipt size={14} className="sm:w-4 sm:h-4" />
              <span className="font-semibold text-xs sm:text-base">
                <span className="hidden sm:inline">Transaksi</span>
                <span className="sm:hidden">Transaksi</span>
              </span>
            </div>
          }
        >
          <RekamTransaksi25 id="" cek2="1" />
        </Tab>
        <Tab
          key="rekon"
          title={
            <div className="flex items-center gap-1 sm:gap-2">
              <RotateCcw size={14} className="sm:w-4 sm:h-4" />
              <span className="font-semibold text-xs sm:text-base">
                <span className="hidden sm:inline">Rekon Data</span>
                <span className="sm:hidden">Rekon</span>
              </span>
            </div>
          }
        >
          <Rekon25 />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Dau2025Index;
