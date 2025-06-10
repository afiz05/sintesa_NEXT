"use client";
import React from "react";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { Target, Users, MapPin, CheckCircle } from "lucide-react";

export const Tematik = () => {
  return (
    <div className="my-3 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Program Tematik</h1>
          <p className="text-default-500 mt-1">
            Monitoring dan evaluasi program tematik nasional
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20">
          <CardBody className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-500 rounded-lg">
                <Target className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm text-default-500">Total Program</p>
                <p className="text-2xl font-bold">124</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
          <CardBody className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-500 rounded-lg">
                <CheckCircle className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm text-default-500">Selesai</p>
                <p className="text-2xl font-bold">89</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20">
          <CardBody className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-500 rounded-lg">
                <Users className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm text-default-500">Beneficiaries</p>
                <p className="text-2xl font-bold">2.1M</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20">
          <CardBody className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-500 rounded-lg">
                <MapPin className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm text-default-500">Lokasi</p>
                <p className="text-2xl font-bold">34 Prov</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold">Program Prioritas</h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h4 className="font-medium text-blue-700">
                    Program Stunting
                  </h4>
                  <p className="text-sm text-default-500">
                    Target: Menurunkan prevalensi stunting menjadi 14%
                  </p>
                  <div className="mt-2 bg-blue-100 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: "78%" }}
                    ></div>
                  </div>
                  <p className="text-xs text-blue-600 mt-1">78% tercapai</p>
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <h4 className="font-medium text-green-700">
                    Program Kemiskinan Ekstrem
                  </h4>
                  <p className="text-sm text-default-500">
                    Target: Eliminasi kemiskinan ekstrem
                  </p>
                  <div className="mt-2 bg-green-100 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: "65%" }}
                    ></div>
                  </div>
                  <p className="text-xs text-green-600 mt-1">65% tercapai</p>
                </div>

                <div className="border-l-4 border-orange-500 pl-4 py-2">
                  <h4 className="font-medium text-orange-700">
                    Program Digitalisasi
                  </h4>
                  <p className="text-sm text-default-500">
                    Target: 80% layanan publik digital
                  </p>
                  <div className="mt-2 bg-orange-100 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full"
                      style={{ width: "45%" }}
                    ></div>
                  </div>
                  <p className="text-xs text-orange-600 mt-1">45% tercapai</p>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold">Timeline Program</h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-1"></div>
                  <div>
                    <p className="font-medium">Program Makan Bergizi Gratis</p>
                    <p className="text-sm text-default-500">
                      Dimulai Q1 2024 - Pilot 5 provinsi
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mt-1"></div>
                  <div>
                    <p className="font-medium">Program Digitalisasi UMKM</p>
                    <p className="text-sm text-default-500">
                      Dimulai Q2 2024 - Target 1M UMKM
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mt-1"></div>
                  <div>
                    <p className="font-medium">Program Infrastruktur Digital</p>
                    <p className="text-sm text-default-500">
                      Dimulai Q3 2024 - Konektivitas 5G
                    </p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold">Status Program</h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Berjalan</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                    35
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Persiapan</span>
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                    15
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Evaluasi</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    8
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Selesai</span>
                  <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                    66
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold">Anggaran Program</h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-3">
                <div className="text-center">
                  <p className="text-2xl font-bold text-indigo-600">Rp 45.8T</p>
                  <p className="text-sm text-default-500">Total Alokasi</p>
                </div>
                <div className="bg-indigo-100 rounded-full h-3">
                  <div
                    className="bg-indigo-500 h-3 rounded-full"
                    style={{ width: "72%" }}
                  ></div>
                </div>
                <p className="text-sm text-center text-indigo-600">
                  72% Terserap
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};
