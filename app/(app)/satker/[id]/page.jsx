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
} from "@heroui/react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useSatkerService } from "@/services/satkerService.js";

export default function DetailSatkerPage({ params }) {
  const unwrappedParams = use(params);
  const [satker, setSatker] = useState(null);
  const [sedangMemuat, setSedangMemuat] = useState(true);
  const [error, setError] = useState(null);
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
              <h3 className="text-lg font-bold text-blue-700 dark:text-blue-200 tracking-tight">
                Download ADK DIPA
              </h3>
            </CardHeader>
            <CardBody className="flex flex-col gap-4 p-4 flex-1 overflow-hidden">
              {/* Dropdown Tahun Modern */}
              <div className="w-full flex items-center gap-3 mb-4">
                <label htmlFor="tahun-adk" className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                  Pilih Tahun
                </label>
                <div className="relative flex-1">
                  <select
                    id="tahun-adk"
                    className="block w-full appearance-none px-4 py-2 pr-10 rounded-xl border border-blue-300 dark:border-blue-700 bg-white dark:bg-gray-900 text-blue-800 dark:text-blue-100 font-semibold shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                    defaultValue={2025}
                  >
                    {Array.from({ length: 2025 - 2009 + 1 }, (_, i) => 2009 + i).map((tahun) => (
                      <option key={tahun} value={tahun}>{tahun}</option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-blue-400 dark:text-blue-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </span>
                </div>
              </div>
              {/* Tabel File ADK DIPA */}
              <div className="flex-1 w-full overflow-auto rounded-lg border border-blue-100 dark:border-gray-700 bg-white/60 dark:bg-gray-900/60 shadow-inner min-h-[220px] max-h-[340px]">
                <table className="min-w-full text-sm text-left">
                  <thead className="sticky top-0 z-10 bg-blue-100 dark:bg-gray-800/80 text-blue-800 dark:text-blue-200 font-semibold">
                    <tr>
                      <th className="px-3 py-2 text-center align-middle">
                        Nama File
                      </th>
                      <th className="px-3 py-2 text-center align-middle">
                        Revisi Ke
                      </th>
                      <th className="px-3 py-2 text-center align-middle">
                        Folder
                      </th>
                      <th className="px-3 py-2 text-center align-middle">
                        Tanggal
                      </th>
                      <th className="px-3 py-2 text-center align-middle">
                        Download
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-blue-50 dark:divide-gray-800">
                    {/* Dummy data, ganti dengan map data asli jika sudah ada */}
                    <tr>
                      <td className="px-3 py-2">DIPA_2025_v1.zip</td>
                      <td className="px-3 py-2 text-center">1</td>
                      <td className="px-3 py-2">/2025/</td>
                      <td className="px-3 py-2">01-07-2025</td>
                      <td className="px-3 py-2">
                        <Button
                          size="sm"
                          color="primary"
                          variant="flat"
                          disabled
                        >
                          Download
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">DIPA_2024_v2.zip</td>
                      <td className="px-3 py-2 text-center">2</td>
                      <td className="px-3 py-2">/2024/</td>
                      <td className="px-3 py-2">15-06-2024</td>
                      <td className="px-3 py-2">
                        <Button
                          size="sm"
                          color="primary"
                          variant="flat"
                          disabled
                        >
                          Download
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-400 text-center mt-2">
                Fitur download ADK DIPA akan segera tersedia.
              </p>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
