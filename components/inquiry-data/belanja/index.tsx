"use client";
import React from "react";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { ShoppingCart, TrendingUp, Calendar, DollarSign } from "lucide-react";

export const Belanja = () => {
  return (
    <div className="my-3 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Belanja</h1>
          <p className="text-default-500 mt-1">
            Laporan dan analisis data belanja
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
                <ShoppingCart className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm text-default-500">Total Belanja</p>
                <p className="text-2xl font-bold">Rp 2.4T</p>
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
                <p className="text-sm text-default-500">Realisasi</p>
                <p className="text-2xl font-bold">85.2%</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
          <CardBody className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-500 rounded-lg">
                <DollarSign className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm text-default-500">Sisa Anggaran</p>
                <p className="text-2xl font-bold">Rp 356M</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
          <CardBody className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-500 rounded-lg">
                <Calendar className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm text-default-500">Periode</p>
                <p className="text-2xl font-bold">2024</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold">Ringkasan Belanja</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-default-50 rounded-lg">
                <span className="font-medium">Belanja Pegawai</span>
                <span className="text-lg font-bold text-blue-600">Rp 1.2T</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-default-50 rounded-lg">
                <span className="font-medium">Belanja Barang</span>
                <span className="text-lg font-bold text-green-600">
                  Rp 800M
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-default-50 rounded-lg">
                <span className="font-medium">Belanja Modal</span>
                <span className="text-lg font-bold text-orange-600">
                  Rp 400M
                </span>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold">Analisis Trend</h3>
          </CardHeader>
          <CardBody>
            <div className="text-center py-8">
              <TrendingUp size={48} className="mx-auto text-default-300 mb-4" />
              <p className="text-default-500">
                Grafik analisis trend belanja akan ditampilkan di sini
              </p>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">Aktivitas Terbaru</h3>
        </CardHeader>
        <CardBody>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 hover:bg-default-50 rounded-lg transition-colors">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium">Belanja Pegawai Q4 2024</p>
                <p className="text-sm text-default-500">Updated 2 hours ago</p>
              </div>
              <span className="text-sm text-blue-600 font-medium">+Rp 50M</span>
            </div>
            <div className="flex items-center gap-3 p-3 hover:bg-default-50 rounded-lg transition-colors">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium">Belanja Barang Operasional</p>
                <p className="text-sm text-default-500">Updated 5 hours ago</p>
              </div>
              <span className="text-sm text-green-600 font-medium">
                +Rp 25M
              </span>
            </div>
            <div className="flex items-center gap-3 p-3 hover:bg-default-50 rounded-lg transition-colors">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium">Belanja Modal Infrastruktur</p>
                <p className="text-sm text-default-500">Updated 1 day ago</p>
              </div>
              <span className="text-sm text-orange-600 font-medium">
                +Rp 100M
              </span>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
