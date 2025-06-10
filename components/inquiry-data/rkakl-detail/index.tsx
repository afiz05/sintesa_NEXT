"use client";

import { Card, CardBody, CardHeader } from "@heroui/react";
import { FileSpreadsheet } from "lucide-react";

export const RKAKLDetail = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-3 mb-6">
        <FileSpreadsheet className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold text-default-900">RKAKL Detail</h1>
          <p className="text-default-600">
            Rincian Anggaran Kas dan Kegiatan Lembaga
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Rincian RKAKL</h3>
            </div>
          </CardHeader>
          <CardBody>
            <p className="text-default-600">
              Detail lengkap rencana anggaran kas dan kegiatan lembaga
            </p>
          </CardBody>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Komponen Anggaran</h3>
            </div>
          </CardHeader>
          <CardBody>
            <p className="text-default-600">
              Breakdown komponen-komponen dalam RKAKL per unit kerja
            </p>
          </CardBody>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Status Pelaksanaan</h3>
            </div>
          </CardHeader>
          <CardBody>
            <p className="text-default-600">
              Monitor status pelaksanaan anggaran sesuai RKAKL
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
