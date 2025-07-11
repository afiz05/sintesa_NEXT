"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Card, CardBody, Spinner, Chip } from "@heroui/react";

export const HasilPencarianSatker = ({
  hasil,
  sedangMemuat,
  onPilihSatker,
  kataPencarian,
  inputRef,
}) => {
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    if (inputRef?.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [inputRef, hasil]);
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
    const loadingContent = (
      <Card
        className="fixed z-[9999] mt-1 shadow-lg"
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
          width: `${position.width}px`,
          zIndex: 9999,
        }}
      >
        <CardBody className="p-4">
          <div className="flex items-center justify-center gap-2">
            <Spinner size="sm" />
            <span className="text-sm text-gray-600">Mencari satker...</span>
          </div>
        </CardBody>
      </Card>
    );
    return typeof window !== "undefined"
      ? createPortal(loadingContent, document.body)
      : null;
  }

  if (hasil.length === 0 && kataPencarian.length >= 3) {
    const noResultsContent = (
      <Card
        className="fixed z-[9999] mt-1 shadow-lg"
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
          width: `${position.width}px`,
          zIndex: 9999,
        }}
      >
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
    return typeof window !== "undefined"
      ? createPortal(noResultsContent, document.body)
      : null;
  }

  if (hasil.length === 0) return null;

  const searchResults = (
    <Card
      className="fixed z-[9999] mt-1 shadow-lg max-h-80 overflow-y-auto"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: `${position.width}px`,
        zIndex: 9999,
      }}
    >
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

  // Use portal to render outside of any stacking context
  return typeof window !== "undefined"
    ? createPortal(searchResults, document.body)
    : null;
};
