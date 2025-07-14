"use client";

import React, { useEffect, useState, use } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Spinner,
  Button,
  Chip,
  Breadcrumbs,
  BreadcrumbItem,
  Input,
} from "@heroui/react";
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useSatkerService } from "@/services/satkerService.js";
import TayangAdk from "@/components/adk/TayangAdk";

export default function DetailSatkerPage({ params }) {
  const unwrappedParams = use(params);
  const [satker, setSatker] = useState(null);
  const [sedangMemuat, setSedangMemuat] = useState(true);
  const [error, setError] = useState(null);
  const currentYear = new Date().getFullYear();
  const [tahunAdk, setTahunAdk] = useState(currentYear.toString());
  const [searchTahun, setSearchTahun] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const { ambilDetailSatker } = useSatkerService();

  useEffect(() => {
    muatDetailSatker();
  }, [unwrappedParams.id]);

  const muatDetailSatker = async () => {
    try {
      setSedangMemuat(true);
      setError(null);
      const data = await ambilDetailSatker(unwrappedParams.id);

      if (!data) {
        return;
      }

      setSatker(data);
      // Update title dengan nama satker
      document.title = `SATKER - ${data.nama}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setSedangMemuat(false);
    }
  };

  const kembaliKeHalamanSebelumnya = () => {
    router.back();
  };

  if (sedangMemuat) {
    return (
      <div className="container mx-auto p-6">
        <Card className="max-w-2xl mx-auto">
          <CardBody className="flex flex-col items-center justify-center py-16">
            <div className="mb-6">
              <Spinner size="lg" color="primary" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Memuat Detail Satker
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Sedang mengambil informasi satker dengan kode "
              {unwrappedParams.id}"
            </p>
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <div className="animate-pulse flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  if (error || !satker) {
    return (
      <div className="container mx-auto p-6">
        <Card className="max-w-2xl mx-auto">
          <CardBody className="text-center py-16">
            {/* Icon untuk error/not found */}
            <div className="mb-6">
              <div className="w-24 h-24 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center relative">
                <MagnifyingGlassIcon className="w-12 h-12 text-gray-400" />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <XMarkIcon className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>

            {/* Error message */}
            {/* <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              Satker Tidak Ditemukan
            </h2> */}

            <p className="text-gray-600 dark:text-gray-400 mb-2">
              {error ||
                `Satker dengan kode "${unwrappedParams.id}" tidak dapat ditemukan dalam database.`}
            </p>

            <p className="text-sm text-gray-500 dark:text-gray-500 mb-8">
              Pastikan kode satker yang Anda masukkan benar dan coba lagi.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                color="primary"
                variant="solid"
                onClick={kembaliKeHalamanSebelumnya}
                className="min-w-32"
              >
                ← Kembali
              </Button>

              <Button
                color="secondary"
                variant="flat"
                onClick={() => router.push("/dashboard")}
                className="min-w-32"
              >
                Ke Dashboard
              </Button>

              <Button
                color="default"
                variant="light"
                onClick={() => window.location.reload()}
                className="min-w-32"
              >
                Muat Ulang
              </Button>
            </div>

            {/* Additional help */}
            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2">
                Bantuan
              </h3>
              <p className="text-xs text-blue-700 dark:text-blue-300">
                Jika Anda yakin kode satker benar, silakan hubungi Saudara
                Taufan/ Restu.
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6">
      {/* Breadcrumbs dan Header */}
      <div className="flex flex-col gap-4">
        <Breadcrumbs>
          <BreadcrumbItem onClick={() => router.push("/dashboard")}>
            Dashboard
          </BreadcrumbItem>
          <BreadcrumbItem>Satker</BreadcrumbItem>
          <BreadcrumbItem>{satker.kode}</BreadcrumbItem>
        </Breadcrumbs>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
              Detail Satuan Kerja
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Informasi lengkap Satuan Kerja
            </p>
          </div>
          <Button
            color="default"
            variant="flat"
            onClick={kembaliKeHalamanSebelumnya}
            startContent={<span>←</span>}
          >
            Kembali
          </Button>
        </div>
      </div>

      {/* Header Card dengan info utama */}
      <Card className="w-full shadow-medium">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <Chip
                size="lg"
                variant="flat"
                color="primary"
                className="font-mono text-base"
              >
                {satker.kdsatker || satker.kode}
              </Chip>
              {satker.statusblu === "YA" && (
                <Chip size="md" variant="flat" color="success">
                  BLU
                </Chip>
              )}
              <Chip size="md" variant="flat" color="warning">
                TA {satker.thang}
              </Chip>
            </div>
          </div>
        </CardHeader>

        <CardBody className="pt-0">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100 leading-tight">
            {satker.nmsatker || satker.nama}
          </h2>
          {satker.email && (
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              📧 {satker.email}
            </p>
          )}
        </CardBody>
      </Card>

      {/* Grid layout untuk informasi detail */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Informasi Organisasi - 2/3 width */}
        <div className="xl:col-span-2 space-y-6">
          {/* Informasi Organisasi */}
          <Card className="shadow-medium">
            <CardHeader>
              <h4 className="text-lg font-semibold flex items-center gap-2">
                🏢 Informasi Organisasi
              </h4>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Kementerian/Lembaga
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Chip
                        size="sm"
                        variant="flat"
                        color="primary"
                        className="font-mono"
                      >
                        {satker.kddept}
                      </Chip>
                      <span className="text-gray-800 dark:text-gray-200 text-sm">
                        {satker.nmdept}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Unit Eselon I
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Chip
                        size="sm"
                        variant="flat"
                        color="secondary"
                        className="font-mono"
                      >
                        {satker.kdunit}
                      </Chip>
                      <span className="text-gray-800 dark:text-gray-200 text-sm">
                        {satker.nmunit}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Kewenangan
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Chip
                        size="sm"
                        variant="flat"
                        color="warning"
                        className="font-mono"
                      >
                        {satker.kddekon}
                      </Chip>
                      <span className="text-gray-800 dark:text-gray-200 text-sm">
                        {satker.nmdekon}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Kanwil DJPBN
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Chip
                        size="sm"
                        variant="flat"
                        color="success"
                        className="font-mono"
                      >
                        {satker.kdkanwil}
                      </Chip>
                      <span className="text-gray-800 dark:text-gray-200 text-sm">
                        {satker.nmkanwil}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                      KPPN
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Chip
                        size="sm"
                        variant="flat"
                        color="danger"
                        className="font-mono"
                      >
                        {satker.kdkppn}
                      </Chip>
                      <span className="text-gray-800 dark:text-gray-200 text-sm">
                        {satker.nmkppn}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                      NPWP
                    </p>
                    <span className="font-mono text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-md text-sm">
                      {satker.npwp}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status & Info */}
              <div className="border-t pt-4 mt-4">
                <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                  📊 Status & Info
                </h4>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Status BLU
                    </span>
                    <Chip
                      size="sm"
                      color={satker.statusblu === "YA" ? "success" : "default"}
                      variant="flat"
                    >
                      {satker.statusblu === "YA" ? "Ya" : "Tidak"}
                    </Chip>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Jenis Dokumen
                    </span>
                    <Chip
                      size="sm"
                      color={satker.statusblu === "YA" ? "success" : "default"}
                      variant="flat"
                    >
                      {satker.kdjendok || "N/A"}
                    </Chip>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Tahun Anggaran
                    </span>
                    <Chip size="sm" color="primary" variant="flat">
                      {satker.thang}
                    </Chip>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Informasi Pejabat */}
          <Card className="shadow-medium">
            <CardHeader>
              <h3 className="text-lg font-semibold flex items-center gap-2">
                👥 Pejabat & Pengelola Keuangan
              </h3>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Kuasa Pengguna Anggaran (KPA)
                  </p>
                  <p className="text-gray-800 dark:text-gray-200">
                    {satker.kpa || "Belum diisi"}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Bendahara
                  </p>
                  <p className="text-gray-800 dark:text-gray-200">
                    {satker.bendahara || "Belum diisi"}
                  </p>
                </div>

                <div className="md:col-span-2">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Pejabat Pembuat SPM (PPSPM)
                  </p>
                  <p className="text-gray-800 dark:text-gray-200">
                    {satker.ppspm || "Belum diisi"}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Sidebar - 1/3 width */}
        <div className="space-y-6">
          <Card
            className="shadow-xl h-full bg-gradient-to-br from-blue-50/80 to-white dark:from-gray-900 dark:to-gray-800 border border-blue-100 dark:border-gray-700 flex flex-col"
            style={{ minHeight: "100%", height: "100%" }}
          >
            <CardHeader className="pb-2 border-b border-blue-100 dark:border-gray-700 bg-transparent">
              <h4 className="text-lg font-normal text-blue-700 dark:text-blue-200 tracking-tight">
                Download ADK DIPA
              </h4>
            </CardHeader>
            <CardBody className="flex flex-col gap-4 p-4 flex-1 overflow-hidden">
              {/* Select dengan pencarian tahun */}
              <div className="w-full mb-4 relative">
                <div className="border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 shadow-md relative">
                  {/* Input tahun, readonly, klik untuk buka dropdown */}
                  <div
                    className="flex items-center px-4 py-3 cursor-pointer select-none"
                    onClick={() => setDropdownOpen((v) => !v)}
                  >
                    <span className="flex-1 text-gray-800 dark:text-gray-100">
                      {tahunAdk}
                    </span>
                    <ChevronDownIcon
                      className={`w-5 h-5 ml-2 transition-transform ${
                        dropdownOpen ? "rotate-180" : ""
                      } text-blue-400`}
                    />
                  </div>
                  {/* Dropdown opsi tahun */}
                  {dropdownOpen && (
                    <div className="absolute left-0 top-full w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-b-xl shadow-md z-20">
                      {/* Search input dalam dropdown */}
                      <div className="p-3 border-b border-gray-200 dark:border-gray-600">
                        <Input
                          autoFocus
                          placeholder="Cari tahun..."
                          value={searchTahun}
                          onChange={(e) => setSearchTahun(e.target.value)}
                          startContent={
                            <MagnifyingGlassIcon className="w-4 h-4 text-gray-400" />
                          }
                          size="sm"
                          className="w-full"
                        />
                      </div>
                      <div className="max-h-60 overflow-auto">
                        {Array.from(
                          { length: currentYear - 2009 + 1 },
                          (_, i) => currentYear - i
                        )
                          .filter((tahun) =>
                            tahun.toString().includes(searchTahun)
                          )
                          .map((tahun) => (
                            <div
                              key={tahun}
                              onMouseDown={() => {
                                setTahunAdk(tahun.toString());
                                setDropdownOpen(false);
                                setSearchTahun("");
                              }}
                              className={`px-4 py-3 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${
                                tahunAdk === tahun.toString()
                                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium"
                                  : "text-gray-800 dark:text-gray-200"
                              }`}
                            >
                              {tahun}
                            </div>
                          ))}
                        {searchTahun &&
                          Array.from(
                            { length: currentYear - 2009 + 1 },
                            (_, i) => currentYear - i
                          ).filter((tahun) =>
                            tahun.toString().includes(searchTahun)
                          ).length === 0 && (
                            <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                              <MagnifyingGlassIcon className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                              <p className="text-sm">
                                Tahun "{searchTahun}" tidak ditemukan
                              </p>
                              <p className="text-xs mt-1">
                                Tersedia tahun 2009 - {currentYear}
                              </p>
                            </div>
                          )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* Tabel File ADK DIPA */}
              <div className="flex-1 w-full">
                <TayangAdk
                  kdsatker={satker?.kdsatker || satker?.kode}
                  tahun={tahunAdk}
                />
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
