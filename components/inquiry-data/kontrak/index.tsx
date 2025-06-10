"use client";
import React from "react";
import { Card, CardHeader, CardBody } from "@heroui/react";
import { FileText, Calendar, Users, DollarSign } from "lucide-react";

export const Kontrak = () => {
  return (
    <div className="my-3 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="text-primary" size={24} />
        <h1 className="text-2xl font-bold">Kontrak</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600">
          <CardBody className="text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Kontrak</p>
                <p className="text-2xl font-bold">1,247</p>
              </div>
              <FileText size={32} className="opacity-80" />
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600">
          <CardBody className="text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Kontrak Aktif</p>
                <p className="text-2xl font-bold">892</p>
              </div>
              <Calendar size={32} className="opacity-80" />
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600">
          <CardBody className="text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Vendor</p>
                <p className="text-2xl font-bold">356</p>
              </div>
              <Users size={32} className="opacity-80" />
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600">
          <CardBody className="text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Nilai</p>
                <p className="text-2xl font-bold">₹2.5M</p>
              </div>
              <DollarSign size={32} className="opacity-80" />
            </div>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">Data Kontrak</h3>
        </CardHeader>
        <CardBody>
          <div className="text-center py-12">
            <FileText size={64} className="mx-auto text-default-300 mb-4" />
            <h3 className="text-lg font-medium text-default-600 mb-2">
              Data Kontrak
            </h3>
            <p className="text-default-400">
              Halaman untuk mengelola dan memantau data kontrak pemerintah.
              Termasuk informasi vendor, nilai kontrak, dan status pelaksanaan.
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
