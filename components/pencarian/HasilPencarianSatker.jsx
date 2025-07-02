"use client";

import React from "react";
import { Card, CardBody, Spinner, Chip } from "@heroui/react";

export const HasilPencarianSatker = ({
  hasil,
  sedangMemuat,
  onPilihSatker,
  kataPencarian,
}) => {
  const highlightText = (text, searchTerm) => {
    if (!searchTerm) return text;

    const regex = new RegExp(`(${searchTerm})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark
          key={index}
          className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded"
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  if (sedangMemuat) {
    return (
      <Card className="absolute top-full left-0 right-0 z-50 mt-1 shadow-lg">
        <CardBody className="p-4">
          <div className="flex items-center justify-center gap-2">
            <Spinner size="sm" />
            <span className="text-sm text-gray-600">Mencari satker...</span>
          </div>
        </CardBody>
      </Card>
    );
  }

  if (hasil.length === 0 && kataPencarian.length >= 3) {
    return (
      <Card className="absolute top-full left-0 right-0 z-50 mt-1 shadow-lg">
        <CardBody className="p-4">
          <div className="text-center text-gray-500">
            <p className="text-sm">
              Tidak ada Satker ditemukan, gunakan kata kunci yang berbeda
            </p>
            {/* <p className="text-xs mt-1">Coba kata kunci yang berbeda</p> */}
          </div>
        </CardBody>
      </Card>
    );
  }

  if (hasil.length === 0) return null;

  return (
    <Card className="absolute top-full left-0 right-0 z-50 mt-1 shadow-lg max-h-80 overflow-y-auto">
      <CardBody className="p-0">
        {hasil.map((satker, index) => (
          <div
            key={satker.id}
            onClick={() => onPilihSatker(satker)}
            className={`
              p-4 cursor-pointer transition-colors hover:bg-gray-100 dark:hover:bg-gray-800
              ${
                index !== hasil.length - 1
                  ? "border-b border-gray-200 dark:border-gray-700"
                  : ""
              }
            `}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Chip
                    size="sm"
                    variant="flat"
                    color="primary"
                    className="text-xs font-mono"
                  >
                    {satker.level}.{satker.alamat}{" "}
                    {highlightText(satker.kode, kataPencarian)}
                  </Chip>
                </div>
                <h4 className="font-medium text-sm leading-tight">
                  {highlightText(satker.nama, kataPencarian)}
                </h4>
              </div>
            </div>
          </div>
        ))}

        {hasil.length >= 10 && (
          <div className="p-3 text-center bg-gray-50 dark:bg-gray-900">
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Menampilkan {hasil.length} hasil pertama. Perbanyak kata kunci
              untuk hasil yang lebih spesifik.
            </p>
          </div>
        )}
      </CardBody>
    </Card>
  );
};
