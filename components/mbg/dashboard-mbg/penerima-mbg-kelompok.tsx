"use client";
import React from "react";
import { Card, CardBody, CardHeader } from "@heroui/react";

export const PenerimaMbgKelompok = () => {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Ringkasan Eksekutif</h3>
      </CardHeader>
      <CardBody>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">85%</div>
            <p className="text-sm text-default-600">Tingkat Keberhasilan</p>
            <p className="text-xs text-default-400 mt-1">
              Target pencapaian bulanan MBG
            </p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">1,234</div>
            <p className="text-sm text-default-600">Total Laporan</p>
            <p className="text-xs text-default-400 mt-1">
              Laporan diterima bulan ini
            </p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-2">98%</div>
            <p className="text-sm text-default-600">Akurasi Data</p>
            <p className="text-xs text-default-400 mt-1">
              Validitas informasi sistem
            </p>
          </div>
        </div>

        {/* Additional summary information */}
        <div className="mt-6 pt-4 border-t border-default-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex justify-between items-center p-3 bg-default-50 rounded-lg">
              <span className="text-sm font-medium">
                Rata-rata Distribusi Harian
              </span>
              <span className="text-sm font-bold text-primary">45 ton</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-default-50 rounded-lg">
              <span className="text-sm font-medium">Efisiensi Operasional</span>
              <span className="text-sm font-bold text-success">92%</span>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
