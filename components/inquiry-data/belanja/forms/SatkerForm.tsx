"use client";
import React from "react";
import { Input, Select, SelectItem, Button, Chip } from "@heroui/react";
import { FileText, X } from "lucide-react";
import { SearchableDropdownListbox, FormOption } from "../form-summary";

// Constants
const TAMPILAN_OPTIONS = [
  { key: "kode", label: "Kode" }, // SQL SELECT will include only kdsatker column
  { key: "kode_uraian", label: "Kode Uraian" }, // SQL SELECT will include both kdsatker and nmsatker columns
  { key: "uraian", label: "Uraian" }, // SQL SELECT will include only nmsatker column
  { key: "jangan_tampilkan", label: "Jangan Tampilkan" }, // SQL will exclude satker columns and filters
];

interface SatkerFormProps {
  // Form state
  satker: Set<string>;
  satkerKondisi: string;
  satkerKata: string;
  satkerTampilan: string;
  satkerSearchQuery: string;

  // Options and computed data
  filteredSatkerOptions: FormOption[];
  limitedDisplaySatkerOptions: FormOption[];
  kementerianSize: number;

  // State setters
  setSatker: (value: Set<string>) => void;
  setSatkerKondisi: (value: string) => void;
  setSatkerKata: (value: string) => void;
  setSatkerTampilan: (value: string) => void;
  setSatkerSearchQuery: (value: string) => void;

  // Event handlers
  removeSatker: (key: string) => void;
  clearAllSatker: () => void;

  // Loading states
  isLoadingSatker: boolean;
  isProcessingSatker: boolean;
}

const SatkerForm: React.FC<SatkerFormProps> = ({
  satker,
  satkerKondisi,
  satkerKata,
  satkerTampilan,
  satkerSearchQuery,
  filteredSatkerOptions,
  limitedDisplaySatkerOptions,
  kementerianSize,
  setSatker,
  setSatkerKondisi,
  setSatkerKata,
  setSatkerTampilan,
  setSatkerSearchQuery,
  removeSatker,
  clearAllSatker,
  isLoadingSatker,
  isProcessingSatker,
}) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 p-4 bg-gradient-to-r from-purple-100 to-violet-100 dark:from-purple-900/40 dark:to-violet-900/40 rounded-xl border border-purple-200 dark:border-purple-800 transition-all duration-200">
        <div className="flex items-center gap-2">
          <FileText
            className="text-purple-600 dark:text-purple-400"
            size={16}
          />
          <span className="font-medium text-purple-700 dark:text-purple-300 text-sm whitespace-nowrap">
            Satker
          </span>
        </div>
        <div>
          <SearchableDropdownListbox
            items={limitedDisplaySatkerOptions.filter(
              (item) => item.key !== "select_all"
            )}
            allItems={filteredSatkerOptions.filter(
              (item) => item.key !== "select_all"
            )}
            selectedKeys={satker}
            onSelectionChange={(keys) => setSatker(keys)}
            searchValue={satkerSearchQuery}
            onSearchChange={(value: string) =>
              setSatkerSearchQuery(value || "")
            }
            placeholder={
              isLoadingSatker || isProcessingSatker
                ? "Loading satker..."
                : "Search and select satker..."
            }
            ariaLabel="Pilih Satker"
            variant="bordered"
            size="sm"
            isDisabled={isLoadingSatker || isProcessingSatker}
            isLoading={isLoadingSatker || isProcessingSatker}
            selectionMode="multiple"
            showSelectAll={true}
            className="w-full"
            maxHeight="60"
          />
        </div>
        <div>
          <Input
            placeholder="Masukkan Kondisi"
            value={satkerKondisi}
            onChange={(e) => setSatkerKondisi(e.target.value)}
            variant="bordered"
            size="sm"
            aria-label="Kondisi Satker"
          />
        </div>
        <div>
          <Input
            placeholder="Mengandung Kata"
            value={satkerKata}
            onChange={(e) => setSatkerKata(e.target.value)}
            variant="bordered"
            size="sm"
            aria-label="Kata yang mengandung Satker"
          />
        </div>
        <div>
          <Select
            items={TAMPILAN_OPTIONS}
            selectedKeys={satkerTampilan ? [satkerTampilan] : []}
            onSelectionChange={(keys) => {
              const selectedKey = Array.from(keys)[0] as string;
              setSatkerTampilan(selectedKey || "");
            }}
            placeholder="Pilih Tampilan"
            aria-label="Pilih Tampilan Satker"
            variant="bordered"
            size="sm"
            className="min-w-[140px]"
          >
            {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
          </Select>
        </div>
      </div>{" "}
      {/* Performance Information Display */}
      <div className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="text-gray-600 dark:text-gray-400">
            Total Satker: {filteredSatkerOptions.length}
          </div>
          <div className="text-amber-600 dark:text-amber-400">
            Menampilkan: {limitedDisplaySatkerOptions.length}
          </div>{" "}
          <div className="text-purple-600 dark:text-purple-400">
            Dipilih: {satker.size}
          </div>
          {satkerTampilan && (
            <div className="text-indigo-600 dark:text-indigo-400">
              SQL Mode:{" "}
              {TAMPILAN_OPTIONS.find((opt) => opt.key === satkerTampilan)
                ?.label || "Default"}
            </div>
          )}
          {satkerSearchQuery && (
            <div className="text-blue-600 dark:text-blue-400">
              Filter: "{satkerSearchQuery}" (
              {Math.max(0, limitedDisplaySatkerOptions.length)} hasil)
            </div>
          )}
          {kementerianSize === 0 && filteredSatkerOptions.length > 100 && (
            <div className="text-blue-600 dark:text-blue-400">
              Gunakan pencarian untuk menemukan satker yang diinginkan
            </div>
          )}
        </div>
      </div>
      {/* Selected Satker Display */}
      {satker.size > 0 && (
        <div className="p-4 bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-xl border border-purple-100 dark:border-purple-800/50">
          {" "}
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-2">
              <FileText
                className="text-purple-600 dark:text-purple-400"
                size={14}
              />
              <span className="text-sm font-medium text-purple-800 dark:text-purple-200">
                Selected Satker ({satker.size}):
              </span>
            </div>
            <Button
              size="sm"
              variant="light"
              color="danger"
              onPress={clearAllSatker}
              startContent={<X size={12} />}
              className="min-w-[100px] rounded-xl"
            >
              Clear All
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {satker.size === filteredSatkerOptions.length &&
            filteredSatkerOptions.length > 0 ? (
              <Chip
                onClose={() => setSatker(new Set())}
                variant="flat"
                color="secondary"
                size="sm"
              >
                Semua Satker ({satker.size} items)
              </Chip>
            ) : (
              (() => {
                const selectedKeysArray = Array.from(satker);
                const maxDisplay = 10;
                const displayedKeys = selectedKeysArray.slice(0, maxDisplay);
                const remainingCount = selectedKeysArray.length - maxDisplay;

                return (
                  <>
                    {displayedKeys.map((key) => {
                      const option = filteredSatkerOptions.find(
                        (opt) => opt.key === key
                      );
                      return (
                        <Chip
                          key={key}
                          onClose={() => removeSatker(key)}
                          variant="flat"
                          color="secondary"
                          size="sm"
                        >
                          {option?.label || key}
                        </Chip>
                      );
                    })}
                    {remainingCount > 0 && (
                      <Chip
                        variant="flat"
                        color="primary"
                        size="sm"
                        className="cursor-default"
                      >
                        +{remainingCount} Satker Lainnya
                      </Chip>
                    )}
                  </>
                );
              })()
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SatkerForm;
