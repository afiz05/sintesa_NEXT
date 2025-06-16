"use client";
import React from "react";
import { Input, Select, SelectItem, Button, Chip } from "@heroui/react";
import { Building, X } from "lucide-react";
import { SearchableDropdownListbox, FormOption } from "../form-summary";

// Constants
const TAMPILAN_OPTIONS = [
  { key: "kode", label: "Kode" }, // SQL SELECT will include only kdunit column
  { key: "kode_uraian", label: "Kode Uraian" }, // SQL SELECT will include both kdunit and nmunit columns
  { key: "uraian", label: "Uraian" }, // SQL SELECT will include only nmunit column
  { key: "jangan_tampilkan", label: "Jangan Tampilkan" }, // SQL will exclude eselon columns and filters
];

interface EselonIFormProps {
  // Form state
  eselonI: Set<string>;
  eselonKondisi: string;
  eselonKata: string;
  eselonTampilan: string;
  eselonSearchQuery: string;

  // Options and computed data
  filteredEselonOptions: FormOption[];
  searchFilteredEselonOptions: FormOption[];
  isAllKementerianSelected: boolean;
  kementerianSize: number;

  // State setters
  setEselonI: (value: Set<string>) => void;
  setEselonKondisi: (value: string) => void;
  setEselonKata: (value: string) => void;
  setEselonTampilan: (value: string) => void;
  setEselonSearchQuery: (value: string) => void;

  // Event handlers
  removeEselonSelection: (key: string) => void;

  // Loading states
  isLoadingEselon: boolean;
}

const EselonIForm: React.FC<EselonIFormProps> = ({
  eselonI,
  eselonKondisi,
  eselonKata,
  eselonTampilan,
  eselonSearchQuery,
  filteredEselonOptions,
  searchFilteredEselonOptions,
  isAllKementerianSelected,
  kementerianSize,
  setEselonI,
  setEselonKondisi,
  setEselonKata,
  setEselonTampilan,
  setEselonSearchQuery,
  removeEselonSelection,
  isLoadingEselon,
}) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 p-4 bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/40 dark:to-amber-900/40 rounded-xl border border-orange-200 dark:border-orange-800 transition-all duration-200">
        <div className="flex items-center gap-2">
          <Building
            className="text-orange-600 dark:text-orange-400"
            size={16}
          />
          <span className="font-medium text-orange-700 dark:text-orange-300 text-sm whitespace-nowrap">
            Eselon I
          </span>
        </div>
        <div>
          <SearchableDropdownListbox
            items={searchFilteredEselonOptions.filter(
              (item) => item.key !== "select_all"
            )}
            selectedKeys={eselonI}
            onSelectionChange={(keys) => setEselonI(keys)}
            searchValue={eselonSearchQuery}
            onSearchChange={(value: string) =>
              setEselonSearchQuery(value || "")
            }
            placeholder={
              isLoadingEselon
                ? "Loading eselon..."
                : kementerianSize === 0
                ? "Pilih Kementerian terlebih dahulu"
                : "Search and select eselon I..."
            }
            ariaLabel="Pilih Eselon I"
            variant="bordered"
            size="sm"
            isDisabled={isLoadingEselon || kementerianSize === 0}
            isLoading={isLoadingEselon}
            selectionMode="multiple"
            showSelectAll={true}
            className="w-full"
            maxHeight="60"
          />
        </div>
        <div>
          <Input
            placeholder="Masukkan Kondisi"
            value={eselonKondisi}
            onChange={(e) => setEselonKondisi(e.target.value)}
            variant="bordered"
            size="sm"
            aria-label="Kondisi Eselon I"
          />
        </div>
        <div>
          <Input
            placeholder="Mengandung Kata"
            value={eselonKata}
            onChange={(e) => setEselonKata(e.target.value)}
            variant="bordered"
            size="sm"
            aria-label="Kata yang mengandung Eselon I"
          />
        </div>
        <div>
          <Select
            items={TAMPILAN_OPTIONS}
            selectedKeys={eselonTampilan ? [eselonTampilan] : []}
            onSelectionChange={(keys) => {
              const selectedKey = Array.from(keys)[0] as string;
              setEselonTampilan(selectedKey || "");
            }}
            placeholder="Pilih Tampilan"
            aria-label="Pilih Tampilan Eselon I"
            variant="bordered"
            size="sm"
            className="min-w-[140px]"
          >
            {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
          </Select>
        </div>
      </div>{" "}
      {/* Performance Information Display for Eselon I */}
      {kementerianSize > 0 && (
        <div className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
          <div className="flex flex-wrap gap-4 text-xs">
            <div className="text-gray-600 dark:text-gray-400">
              Total Eselon I: {filteredEselonOptions.length}
            </div>
            {eselonSearchQuery && (
              <div className="text-amber-600 dark:text-amber-400">
                Menampilkan: {searchFilteredEselonOptions.length}
              </div>
            )}{" "}
            <div className="text-orange-600 dark:text-orange-400">
              Dipilih: {eselonI.size}
            </div>
            {eselonTampilan && (
              <div className="text-purple-600 dark:text-purple-400">
                SQL Mode:{" "}
                {TAMPILAN_OPTIONS.find((opt) => opt.key === eselonTampilan)
                  ?.label || "Default"}
              </div>
            )}
            {eselonSearchQuery && (
              <div className="text-blue-600 dark:text-blue-400">
                Filter: "{eselonSearchQuery}" (
                {Math.max(0, searchFilteredEselonOptions.length)} hasil)
              </div>
            )}
          </div>
        </div>
      )}
      {/* Selected Eselon Display */}
      {eselonI.size > 0 && (
        <div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl border border-orange-100 dark:border-orange-800/50">
          {" "}
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-2">
              <Building
                className="text-orange-600 dark:text-orange-400"
                size={14}
              />
              <span className="text-sm font-medium text-orange-800 dark:text-orange-200">
                Selected Eselon I ({eselonI.size}):
              </span>
            </div>
            <Button
              size="sm"
              variant="light"
              color="danger"
              onPress={() => setEselonI(new Set())}
              startContent={<X size={12} />}
              className="min-w-[100px] rounded-xl"
            >
              Clear All
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {eselonI.size === filteredEselonOptions.length &&
            filteredEselonOptions.length > 0 ? (
              <Chip
                onClose={() => setEselonI(new Set())}
                variant="flat"
                color="warning"
                size="sm"
              >
                Semua Eselon I ({eselonI.size} items)
              </Chip>
            ) : (
              (() => {
                const selectedKeysArray = Array.from(eselonI);
                const maxDisplay = 10;
                const displayedKeys = selectedKeysArray.slice(0, maxDisplay);
                const remainingCount = selectedKeysArray.length - maxDisplay;

                return (
                  <>
                    {displayedKeys.map((key) => {
                      const option = filteredEselonOptions.find(
                        (opt) => opt.key === key
                      );
                      // Show code only when all kementerian are selected, otherwise show full label
                      const displayLabel = isAllKementerianSelected
                        ? key
                        : option?.label || key;
                      return (
                        <Chip
                          key={key}
                          onClose={() => removeEselonSelection(key)}
                          variant="flat"
                          color="warning"
                          size="sm"
                        >
                          {displayLabel}
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
                        +{remainingCount} Eselon I Lainnya
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

export default EselonIForm;
