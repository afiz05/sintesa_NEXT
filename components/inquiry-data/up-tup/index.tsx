"use client";
import React from "react";
import { Card, CardHeader, CardBody } from "@heroui/react";
import { CreditCard, TrendingUp, Users, DollarSign } from "lucide-react";

export const UPTUP = () => {
  return (
    <div className="my-3 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <div className="flex items-center gap-3 mb-6">
        <CreditCard className="text-primary" size={24} />
        <h1 className="text-2xl font-bold">UP/TUP</h1>
        <span className="text-sm text-default-500">
          (Uang Persediaan / Tambahan Uang Persediaan)
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-r from-indigo-500 to-indigo-600">
          <CardBody className="text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total UP/TUP</p>
                <p className="text-2xl font-bold">₹45.2M</p>
              </div>
              <CreditCard size={32} className="opacity-80" />
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-r from-teal-500 to-teal-600">
          <CardBody className="text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Penggunaan</p>
                <p className="text-2xl font-bold">₹32.8M</p>
              </div>
              <TrendingUp size={32} className="opacity-80" />
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-r from-pink-500 to-pink-600">
          <CardBody className="text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Satker</p>
                <p className="text-2xl font-bold">124</p>
              </div>
              <Users size={32} className="opacity-80" />
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-r from-cyan-500 to-cyan-600">
          <CardBody className="text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Sisa Saldo</p>
                <p className="text-2xl font-bold">₹12.4M</p>
              </div>
              <DollarSign size={32} className="opacity-80" />
            </div>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">Data UP/TUP</h3>
        </CardHeader>
        <CardBody>
          <div className="text-center py-12">
            <CreditCard size={64} className="mx-auto text-default-300 mb-4" />
            <h3 className="text-lg font-medium text-default-600 mb-2">
              Uang Persediaan / Tambahan Uang Persediaan
            </h3>
            <p className="text-default-400">
              Halaman untuk memantau dan mengelola data Uang Persediaan (UP) dan
              Tambahan Uang Persediaan (TUP). Termasuk alokasi, penggunaan, dan
              sisa saldo per satuan kerja.
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
