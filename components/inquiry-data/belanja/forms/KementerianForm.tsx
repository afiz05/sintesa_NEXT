"use client";
import React from "react";
import { Input, Select, SelectItem, Button, Chip } from "@heroui/react";
import { Building, X } from "lucide-react";
import { SearchableDropdownListbox, FormOption } from "../form-summary";

// Constants
const TAMPILAN_OPTIONS = [
  { key: "kode", label: "Kode" }, // SQL SELECT will include only kddept column
  { key: "kode_uraian", label: "Kode Uraian" }, // SQL SELECT will include both kddept and nmdept columns
  { key: "uraian", label: "Uraian" }, // SQL SELECT will include only nmdept column
  { key: "jangan_tampilkan", label: "Jangan Tampilkan" }, // SQL will exclude kementerian columns and filters
];

interface KementerianFormProps {
  // Form state
  kementerian: Set<string>;
  kementerianKondisi: string;
  kementerianKata: string;
  kementerianTampilan: string;
  kementerianSearchQuery: string;

  // Options and computed data
  kementerianOptions: FormOption[];
  searchFilteredKementerianOptions: FormOption[];

  // State setters
  setKementerian: (value: Set<string>) => void;
  setKementerianKondisi: (value: string) => void;
  setKementerianKata: (value: string) => void;
  setKementerianTampilan: (value: string) => void;
  setKementerianSearchQuery: (value: string) => void;

  // Event handlers
  handleKementerianSelection: (keys: Set<string>) => void;
  resetAllKementerian: () => void;
  removeKementerian: (key: string) => void;

  // Loading states
  isLoadingDepartments: boolean;
}

const KementerianForm: React.FC<KementerianFormProps> = ({
  kementerian,
  kementerianKondisi,
  kementerianKata,
  kementerianTampilan,
  kementerianSearchQuery,
  kementerianOptions,
  searchFilteredKementerianOptions,
  setKementerian,
  setKementerianKondisi,
  setKementerianKata,
  setKementerianTampilan,
  setKementerianSearchQuery,
  handleKementerianSelection,
  resetAllKementerian,
  removeKementerian,
  isLoadingDepartments,
}) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 p-4 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 rounded-xl border border-green-200 dark:border-green-800 transition-all duration-200">
        <div className="flex items-center gap-2">
          <Building className="text-green-600 dark:text-green-400" size={16} />
          <span className="font-medium text-green-700 dark:text-green-300 text-sm whitespace-nowrap">
            Kementerian
          </span>
        </div>
        <div>
          <SearchableDropdownListbox
            items={searchFilteredKementerianOptions.filter(
              (item) => item.key !== "select_all"
            )}
            selectedKeys={kementerian}
            onSelectionChange={handleKementerianSelection}
            searchValue={kementerianSearchQuery}
            onSearchChange={(value: string) =>
              setKementerianSearchQuery(value || "")
            }
            placeholder={
              isLoadingDepartments
                ? "Loading departments..."
                : "Search and select kementerian..."
            }
            ariaLabel="Pilih Kementerian"
            variant="bordered"
            size="sm"
            isDisabled={isLoadingDepartments}
            isLoading={isLoadingDepartments}
            selectionMode="multiple"
            showSelectAll={true}
            className="w-full"
            maxHeight="60"
          />
        </div>
        <div>
          <Input
            placeholder="Masukkan Kondisi"
            value={kementerianKondisi}
            onChange={(e) => setKementerianKondisi(e.target.value)}
            variant="bordered"
            size="sm"
            aria-label="Kondisi Kementerian"
          />
        </div>
        <div>
          <Input
            placeholder="Mengandung Kata"
            value={kementerianKata}
            onChange={(e) => setKementerianKata(e.target.value)}
            variant="bordered"
            size="sm"
            aria-label="Kata yang mengandung Kementerian"
          />
        </div>
        <div>
          <Select
            items={TAMPILAN_OPTIONS}
            selectedKeys={kementerianTampilan ? [kementerianTampilan] : []}
            onSelectionChange={(keys) => {
              const selectedKey = Array.from(keys)[0] as string;
              setKementerianTampilan(selectedKey || "");
            }}
            placeholder="Pilih Tampilan"
            aria-label="Pilih Tampilan Kementerian"
            variant="bordered"
            size="sm"
            className="min-w-[140px]"
          >
            {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
          </Select>
        </div>
      </div>{" "}
      {/* Performance Information Display for Kementerian */}
      <div className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="text-gray-600 dark:text-gray-400">
            Total Kementerian: {kementerianOptions.length}
          </div>
          <div className="text-green-600 dark:text-green-400">
            Dipilih: {kementerian.size}
          </div>
          {kementerianTampilan && (
            <div className="text-purple-600 dark:text-purple-400">
              SQL Mode:{" "}
              {TAMPILAN_OPTIONS.find((opt) => opt.key === kementerianTampilan)
                ?.label || "Default"}
            </div>
          )}
          {kementerianSearchQuery && (
            <div className="text-blue-600 dark:text-blue-400">
              Filter: "{kementerianSearchQuery}" (
              {Math.max(0, searchFilteredKementerianOptions.length)} hasil)
            </div>
          )}
        </div>
      </div>
      {/* Selected Kementerian Display */}
      {kementerian.size > 0 && (
        <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-100 dark:border-green-800/50">
          {" "}
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-2">
              <Building
                className="text-green-600 dark:text-green-400"
                size={14}
              />
              <span className="text-sm font-medium text-green-800 dark:text-green-200">
                Selected Kementerian ({kementerian.size}):
              </span>
            </div>{" "}
            <Button
              size="sm"
              variant="light"
              color="danger"
              onPress={resetAllKementerian}
              startContent={<X size={12} />}
              className="min-w-[100px] rounded-xl"
            >
              Clear All
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {kementerian.size === kementerianOptions.length &&
            kementerianOptions.length > 0 ? (
              <Chip
                onClose={resetAllKementerian}
                variant="flat"
                color="success"
                size="sm"
              >
                Semua Kementerian ({kementerian.size} items)
              </Chip>
            ) : (
              (() => {
                const selectedKeysArray = Array.from(kementerian);
                const maxDisplay = 10;
                const displayedKeys = selectedKeysArray.slice(0, maxDisplay);
                const remainingCount = selectedKeysArray.length - maxDisplay;

                return (
                  <>
                    {displayedKeys.map((key) => {
                      const option = kementerianOptions.find(
                        (opt) => opt.key === key
                      );
                      return (
                        <Chip
                          key={key}
                          onClose={() => removeKementerian(key)}
                          variant="flat"
                          color="success"
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
                        +{remainingCount} Kementerian Lainnya
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

export default KementerianForm;
