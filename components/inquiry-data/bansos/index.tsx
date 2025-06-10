"use client";
import React from "react";
import { Card, CardHeader, CardBody } from "@heroui/react";
import { Heart, Users, MapPin, TrendingUp } from "lucide-react";

export const Bansos = () => {
  return (
    <div className="my-3 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <div className="flex items-center gap-3 mb-6">
        <Heart className="text-primary" size={24} />
        <h1 className="text-2xl font-bold">Bansos</h1>
        <span className="text-sm text-default-500">(Bantuan Sosial)</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-r from-red-500 to-red-600">
          <CardBody className="text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Penerima</p>
                <p className="text-2xl font-bold">2.4M</p>
              </div>
              <Users size={32} className="opacity-80" />
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600">
          <CardBody className="text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Anggaran</p>
                <p className="text-2xl font-bold">₹125B</p>
              </div>
              <TrendingUp size={32} className="opacity-80" />
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-r from-amber-500 to-amber-600">
          <CardBody className="text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Provinsi</p>
                <p className="text-2xl font-bold">34</p>
              </div>
              <MapPin size={32} className="opacity-80" />
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-r from-violet-500 to-violet-600">
          <CardBody className="text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Program Aktif</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <Heart size={32} className="opacity-80" />
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold">Program Bantuan Sosial</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-default-50 rounded-lg">
                <span className="font-medium">
                  PKH (Program Keluarga Harapan)
                </span>
                <span className="text-success font-semibold">₹25.5B</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-default-50 rounded-lg">
                <span className="font-medium">BST (Bantuan Sosial Tunai)</span>
                <span className="text-success font-semibold">₹18.2B</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-default-50 rounded-lg">
                <span className="font-medium">Kartu Sembako</span>
                <span className="text-success font-semibold">₹32.1B</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-default-50 rounded-lg">
                <span className="font-medium">
                  PIP (Program Indonesia Pintar)
                </span>
                <span className="text-success font-semibold">₹15.8B</span>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold">Data Bantuan Sosial</h3>
          </CardHeader>
          <CardBody>
            <div className="text-center py-12">
              <Heart size={64} className="mx-auto text-default-300 mb-4" />
              <h3 className="text-lg font-medium text-default-600 mb-2">
                Bantuan Sosial
              </h3>
              <p className="text-default-400">
                Halaman untuk memantau dan mengelola data program bantuan sosial
                pemerintah. Termasuk penerima manfaat, alokasi anggaran, dan
                distribusi bantuan.
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
