"use client";

import { Card, CardBody, CardHeader } from "@heroui/react";
import { AlertTriangle } from "lucide-react";

export const Deviasi = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-3 mb-6">
        <AlertTriangle className="h-8 w-8 text-warning" />
        <div>
          <h1 className="text-3xl font-bold text-default-900">Deviasi</h1>
          <p className="text-default-600">
            Analisis deviasi anggaran dan realisasi
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <h3 className="text-lg font-semibold">Deviasi Anggaran</h3>
            </div>
          </CardHeader>
          <CardBody>
            <p className="text-default-600">
              Monitor dan analisis penyimpangan anggaran dari rencana awal
            </p>
          </CardBody>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <h3 className="text-lg font-semibold">Laporan Deviasi</h3>
            </div>
          </CardHeader>
          <CardBody>
            <p className="text-default-600">
              Laporan komprehensif mengenai deviasi yang terjadi
            </p>
          </CardBody>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <h3 className="text-lg font-semibold">Analisis Trend</h3>
            </div>
          </CardHeader>
          <CardBody>
            <p className="text-default-600">
              Analisis trend deviasi untuk prediksi dan perencanaan
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
