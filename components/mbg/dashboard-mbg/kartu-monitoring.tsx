"use client";
import React from "react";
import { Card, CardBody } from "@heroui/react";
import { BarChart3, TrendingUp, Users, Target, PieChart } from "lucide-react";

export const KartuMonitoring = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 h-16">
        <CardBody className="p-2 grid grid-cols-[auto_1fr] gap-3 h-full">
          <div className="flex items-center justify-center px-4">
            <BarChart3 className="text-blue-500" size={22} />
          </div>
          <div className="flex flex-col justify-center min-w-0">
            <p className="text-xs text-default-500 font-medium truncate">
              Total SPPG Aktif
            </p>
            <p className="text-lg font-bold">120</p>
          </div>
        </CardBody>
      </Card>

      <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 h-16">
        <CardBody className="p-2 grid grid-cols-[auto_1fr] gap-3 h-full">
          <div className="flex items-center justify-center px-4">
            <Users className="text-green-500" size={22} />
          </div>
          <div className="flex flex-col justify-center min-w-0">
            <p className="text-xs text-default-500 font-medium truncate">
              Petugas SPPG
            </p>
            <p className="text-lg font-bold">35</p>
          </div>
        </CardBody>
      </Card>

      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 h-16">
        <CardBody className="p-2 grid grid-cols-[auto_1fr] gap-3 h-full">
          <div className="flex items-center justify-center px-4">
            <TrendingUp className="text-purple-500" size={22} />
          </div>
          <div className="flex flex-col justify-center min-w-0">
            <p className="text-xs text-default-500 font-medium truncate">
              Supplier MBG
            </p>
            <p className="text-lg font-bold">12</p>
          </div>
        </CardBody>
      </Card>

      <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 h-16">
        <CardBody className="p-2 grid grid-cols-[auto_1fr] gap-3 h-full">
          <div className="flex items-center justify-center px-4">
            <PieChart className="text-orange-500" size={22} />
          </div>
          <div className="flex flex-col justify-center min-w-0">
            <p className="text-xs text-default-500 font-medium truncate">
              Kelompok Penerima
            </p>
            <p className="text-lg font-bold">8</p>
          </div>
        </CardBody>
      </Card>

      <Card className="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20 h-16">
        <CardBody className="p-2 grid grid-cols-[auto_1fr] gap-3 h-full">
          <div className="flex items-center justify-center px-4">
            <Target className="text-teal-500" size={22} />
          </div>
          <div className="flex flex-col justify-center min-w-0">
            <p className="text-xs text-default-500 font-medium truncate">
              Total Penerima
            </p>
            <p className="text-lg font-bold">250</p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
