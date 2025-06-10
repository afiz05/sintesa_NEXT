"use client";
import React from "react";
import { Card, CardBody, CardHeader } from "@heroui/react";
import {
  BarChart3,
  TrendingUp,
  Calendar,
  Users,
  Target,
  PieChart,
} from "lucide-react";

export const DashboardMbg = () => {
  return (
    <div className="my-3 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard MBG</h1>
          <p className="text-default-500 mt-1">
            Monitoring dan evaluasi kinerja MBG secara real-time
          </p>
        </div>
        <div className="flex gap-2">
          <Calendar className="text-default-400" size={20} />
          <span className="text-sm text-default-500">
            Last updated: {new Date().toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
          <CardBody className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500 rounded-lg">
                <BarChart3 className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm text-default-500">Total MBG</p>
                <p className="text-2xl font-bold">156</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
          <CardBody className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-500 rounded-lg">
                <TrendingUp className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm text-default-500">Kinerja</p>
                <p className="text-2xl font-bold">92.5%</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
          <CardBody className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-500 rounded-lg">
                <Users className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm text-default-500">Tim Aktif</p>
                <p className="text-2xl font-bold">45</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
          <CardBody className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-500 rounded-lg">
                <Target className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm text-default-500">Target Tercapai</p>
                <p className="text-2xl font-bold">89%</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <PieChart className="text-primary" size={20} />
              <h3 className="text-lg font-semibold">Kinerja MBG per Wilayah</h3>
            </div>
          </CardHeader>
          <CardBody>
            <div className="h-64 flex items-center justify-center text-default-500">
              <div className="text-center">
                <PieChart size={48} className="mx-auto mb-2 opacity-50" />
                <p>Chart akan ditampilkan di sini</p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader className="pb-4">
            <h3 className="text-lg font-semibold">Aktivitas Terbaru</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-default-50">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">
                    MBG Jakarta Pusat berhasil mencapai target bulanan
                  </p>
                  <p className="text-xs text-default-500">2 jam yang lalu</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-default-50">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">
                    Update data kertas kerja MBG Bandung
                  </p>
                  <p className="text-xs text-default-500">5 jam yang lalu</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-default-50">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">
                    Evaluasi kinerja MBG Surabaya selesai
                  </p>
                  <p className="text-xs text-default-500">1 hari yang lalu</p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Additional Information */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Ringkasan Eksekutif</h3>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">85%</div>
              <p className="text-sm text-default-600">Tingkat Keberhasilan</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">1,234</div>
              <p className="text-sm text-default-600">Total Laporan</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">98%</div>
              <p className="text-sm text-default-600">Akurasi Data</p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
