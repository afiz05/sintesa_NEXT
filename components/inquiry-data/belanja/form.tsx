"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Select,
  SelectItem,
  Autocomplete,
  AutocompleteItem,
  Chip,
} from "@heroui/react";
import {
  Search,
  Download,
  RefreshCw,
  Filter,
  Calendar,
  Building,
  FileText,
  X,
} from "lucide-react";
import kementerianData from "../../../data/kementerian.json";
import satkerData from "../../../data/satker.json";
import { useBelanja } from "./context";

// Type definition for ministry options
type KementerianOption = {
  key: string;
  label: string;
};

// Type definition for satker options
type SatkerOption = {
  key: string;
  label: string;
  kementerian: string;
};

export const Form = () => {
  const { switches } = useBelanja();
  const [isLoading, setIsLoading] = useState(false);
  // Query Parameters State - Updated for multiple selections
  const [cutOff, setCutOff] = useState<string>("");
  const [kementerian, setKementerian] = useState<Set<string>>(new Set());
  const [satker, setSatker] = useState<Set<string>>(new Set());
  // Query Parameter Options
  const cutOffOptions = [
    { key: "januari", label: "Januari" },
    { key: "februari", label: "Februari" },
    { key: "maret", label: "Maret" },
    { key: "april", label: "April" },
    { key: "mei", label: "Mei" },
    { key: "juni", label: "Juni" },
    { key: "juli", label: "Juli" },
    { key: "agustus", label: "Agustus" },
    { key: "september", label: "September" },
    { key: "oktober", label: "Oktober" },
    { key: "november", label: "November" },
    { key: "desember", label: "Desember" },
  ];

  // Ensure kementerianOptions is properly loaded
  const kementerianOptions = React.useMemo(() => {
    const data = (kementerianData as KementerianOption[]) || [];
    console.log("Processed kementerian data:", data.length, "items");
    return data;
  }, []);

  // Ensure satkerOptions is properly loaded
  const satkerOptions = React.useMemo(() => {
    const data = (satkerData as SatkerOption[]) || [];
    console.log("Processed satker data:", data.length, "items");
    return data;
  }, []);

  // Filter satker options based on selected kementerian
  const filteredSatkerOptions = React.useMemo(() => {
    if (kementerian.size === 0) {
      return [];
    }

    const selectedKementerianKeys = Array.from(kementerian);
    const filtered = satkerOptions.filter((satker) =>
      selectedKementerianKeys.includes(satker.kementerian)
    );
    console.log(
      "Filtered satker options:",
      filtered.length,
      "items for kementerian:",
      selectedKementerianKeys
    );
    return filtered;
  }, [satkerOptions, kementerian]);

  // Clear satker selection when kementerian changes
  useEffect(() => {
    if (kementerian.size === 0) {
      setSatker(new Set());
    } else {
      // Remove satker that don't belong to selected kementerian
      const selectedKementerianKeys = Array.from(kementerian);
      const validSatkerKeys = satkerOptions
        .filter((satker) =>
          selectedKementerianKeys.includes(satker.kementerian)
        )
        .map((satker) => satker.key);

      const currentSatkerKeys = Array.from(satker);
      const validCurrentSatker = currentSatkerKeys.filter((key) =>
        validSatkerKeys.includes(key)
      );

      if (validCurrentSatker.length !== currentSatkerKeys.length) {
        setSatker(new Set(validCurrentSatker));
      }
    }
  }, [kementerian, satkerOptions, satker]);

  // Debug effect to check data loading
  useEffect(() => {
    console.log("Kementerian data loaded:", kementerianOptions.length, "items");
    if (kementerianOptions.length > 0) {
      console.log("First item:", kementerianOptions[0]);
      console.log(
        "Last item:",
        kementerianOptions[kementerianOptions.length - 1]
      );
      console.log(
        "Sample of all keys:",
        kementerianOptions.slice(0, 5).map((item) => item.key)
      );
    } else {
      console.error("No kementerian data loaded!");
    }
  }, [kementerianOptions]);

  const tampilanOptions = [
    { key: "kode", label: "Kode" },
    { key: "kode_uraian", label: "Kode Uraian" },
    { key: "uraian", label: "Uraian" },
    { key: "jangan_tampilkan", label: "Jangan Tampilkan" },
  ];
  // Additional state for the new form fields
  const [cutOffKondisi, setCutOffKondisi] = useState<string>("");
  const [cutOffKata, setCutOffKata] = useState<string>("");
  const [cutOffTampilan, setCutOffTampilan] = useState<string>("");

  const [kementerianKondisi, setKementerianKondisi] = useState<string>("");
  const [kementerianKata, setKementerianKata] = useState<string>("");
  const [kementerianTampilan, setKementerianTampilan] = useState<string>("");

  const [satkerKondisi, setSatkerKondisi] = useState<string>("");
  const [satkerKata, setSatkerKata] = useState<string>("");
  const [satkerTampilan, setSatkerTampilan] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Combine all query parameters
    const queryData = {
      cutOff,
      kementerian,
      satker,
    };

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log("Query submitted:", queryData);
    }, 2000);
  };
  const handleReset = () => {
    // Reset all query parameters
    setCutOff("");
    setKementerian(new Set());
    setSatker(new Set());

    // Reset additional form fields
    setCutOffKondisi("");
    setCutOffKata("");
    setCutOffTampilan("");
    setKementerianKondisi("");
    setKementerianKata("");
    setKementerianTampilan("");
    setSatkerKondisi("");
    setSatkerKata("");
    setSatkerTampilan("");
  };

  const handleExport = () => {
    console.log("Exporting data...");
  };

  // Helper functions for removing individual items
  const removeKementerian = (keyToRemove: string) => {
    const newSet = new Set(kementerian);
    newSet.delete(keyToRemove);
    setKementerian(newSet);
  };

  const removeSatker = (keyToRemove: string) => {
    const newSet = new Set(satker);
    newSet.delete(keyToRemove);
    setSatker(newSet);
  };

  // Helper functions for select all functionality
  const handleKementerianSelection = (keys: any) => {
    const selectedKeys = Array.from(keys).map((key) => String(key));
    console.log("Selection keys received:", selectedKeys);
    console.log("Available kementerian options:", kementerianOptions.length);

    if (selectedKeys.includes("select_all")) {
      // Check if all items are currently selected
      const allKeys = kementerianOptions.map((option) => option.key);
      const allSelected =
        kementerian.size === allKeys.length &&
        allKeys.every((key) => kementerian.has(key));

      if (allSelected) {
        // If all are selected, unselect all
        console.log("Unselecting all kementerian");
        setKementerian(new Set());
      } else {
        // If not all are selected, select all
        console.log(
          "Selecting all kementerian - mapping keys:",
          allKeys.length,
          "items"
        );
        console.log("First 5 keys:", allKeys.slice(0, 5));
        console.log("Last 5 keys:", allKeys.slice(-5));
        setKementerian(new Set(allKeys));
      }
    } else if (selectedKeys.length === 0) {
      // If no keys selected, clear selection
      console.log("Clearing selection");
      setKementerian(new Set());
    } else {
      // Normal selection - filter out select_all if it exists
      const filteredKeys = selectedKeys.filter((key) => key !== "select_all");
      console.log("Normal selection:", filteredKeys.length, "items");
      setKementerian(new Set(filteredKeys));
    }
  };

  // Alternative method to select all items (bypassing the Select component's limitations)
  const selectAllKementerian = () => {
    const allKeys = kementerianOptions.map((option) => option.key);
    console.log("Force selecting all kementerian:", allKeys.length, "items");
    setKementerian(new Set(allKeys));
  };

  const handleSatkerSelection = (keys: any) => {
    const selectedKeys = Array.from(keys).map((key) => String(key));

    if (selectedKeys.includes("select_all")) {
      // Check if all filtered items are currently selected
      const allFilteredKeys = filteredSatkerOptions.map((option) => option.key);
      const allSelected =
        satker.size === allFilteredKeys.length &&
        allFilteredKeys.every((key) => satker.has(key));

      if (allSelected) {
        // If all are selected, unselect all
        console.log("Unselecting all satker");
        setSatker(new Set());
      } else {
        // If not all are selected, select all filtered items
        console.log(
          "Selecting all filtered satker:",
          allFilteredKeys.length,
          "items"
        );
        setSatker(new Set(allFilteredKeys));
      }
    } else if (selectedKeys.length === 0) {
      // If no keys selected, clear selection
      console.log("Clearing satker selection");
      setSatker(new Set());
    } else {
      // Normal selection - filter out select_all if it exists
      const filteredKeys = selectedKeys.filter((key) => key !== "select_all");
      console.log("Normal satker selection:", filteredKeys.length, "items");
      setSatker(new Set(filteredKeys));
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <Filter className="text-green-600 dark:text-green-400" size={20} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Query Parameters & Actions
          </h3>
        </div>
      </CardHeader>
      <CardBody className="pt-0">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Query Parameters Section */}
          <div className="space-y-4">
            <h4 className="text-md font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
              Query Parameters
            </h4>{" "}
            {/* Cut Off - Only show if cutOff switch is enabled */}
            {switches.cutOff && (
              <div className="flex flex-wrap items-center gap-4 xl:grid xl:grid-cols-5 xl:gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-2 min-w-fit">
                  <Calendar
                    className="text-blue-600 dark:text-blue-400"
                    size={16}
                  />
                  <span className="font-medium text-gray-900 dark:text-white text-sm whitespace-nowrap">
                    Cut Off
                  </span>
                </div>
                <div className="min-w-fit xl:min-w-0">
                  <Select
                    placeholder="Pilih Cut Off"
                    selectedKeys={cutOff ? [cutOff] : []}
                    onSelectionChange={(keys) => {
                      const selectedKey = Array.from(keys)[0] as string;
                      setCutOff(selectedKey || "");
                    }}
                    variant="bordered"
                    size="sm"
                    aria-label="Pilih Cut Off"
                    classNames={{
                      trigger: "w-auto min-w-[200px] xl:w-full xl:min-w-0",
                      listbox: "w-auto min-w-max",
                      popoverContent: "w-auto min-w-max",
                    }}
                    items={cutOffOptions}
                  >
                    {(item) => (
                      <SelectItem key={item.key}>{item.label}</SelectItem>
                    )}
                  </Select>
                </div>
                <div className="min-w-fit xl:min-w-0">
                  <Input
                    placeholder="Masukkan Kondisi"
                    value={cutOffKondisi}
                    onChange={(e) => setCutOffKondisi(e.target.value)}
                    variant="bordered"
                    size="sm"
                    aria-label="Kondisi Cut Off"
                    className="w-auto min-w-[140px] xl:w-full xl:min-w-0"
                  />
                </div>
                <div className="min-w-fit xl:min-w-0">
                  <Input
                    placeholder="Mengandung Kata"
                    value={cutOffKata}
                    onChange={(e) => setCutOffKata(e.target.value)}
                    variant="bordered"
                    size="sm"
                    aria-label="Kata yang mengandung Cut Off"
                    className="w-auto min-w-[140px] xl:w-full xl:min-w-0"
                  />
                </div>
                <div className="min-w-fit xl:min-w-0">
                  <Select
                    placeholder="Pilih Tampilan"
                    selectedKeys={cutOffTampilan ? [cutOffTampilan] : []}
                    onSelectionChange={(keys) => {
                      const selectedKey = Array.from(keys)[0] as string;
                      setCutOffTampilan(selectedKey || "");
                    }}
                    variant="bordered"
                    size="sm"
                    aria-label="Pilih Tampilan Cut Off"
                    classNames={{
                      trigger: "w-auto min-w-[170px] xl:w-full xl:min-w-0",
                      listbox: "w-auto min-w-max",
                      popoverContent: "w-auto min-w-max",
                    }}
                    items={tampilanOptions}
                  >
                    {(item) => (
                      <SelectItem key={item.key}>{item.label}</SelectItem>
                    )}
                  </Select>
                </div>
              </div>
            )}
            {/* Kementerian - Only show if kementerian switch is enabled */}
            {switches.kementerian && (
              <>
                <div className="flex flex-wrap items-center gap-4 xl:grid xl:grid-cols-5 xl:gap-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-2 min-w-fit">
                    <Building
                      className="text-green-600 dark:text-green-400"
                      size={16}
                    />
                    <span className="font-medium text-gray-900 dark:text-white text-sm whitespace-nowrap">
                      Kementerian
                    </span>
                  </div>
                  <div className="min-w-fit xl:min-w-0">
                    <div className="flex flex-col gap-2">
                      <Select
                        placeholder="Pilih Kementerian"
                        selectedKeys={kementerian}
                        onSelectionChange={handleKementerianSelection}
                        variant="bordered"
                        size="sm"
                        selectionMode="multiple"
                        renderValue={() => {
                          if (kementerian.size === 0) {
                            return "Pilih Kementerian";
                          } else if (
                            kementerian.size === kementerianOptions.length
                          ) {
                            return `Semua Kementerian (${kementerian.size})`;
                          } else {
                            return `${kementerian.size} Kementerian dipilih`;
                          }
                        }}
                        aria-label="Pilih Kementerian"
                        classNames={{
                          trigger: "w-auto min-w-[220px] xl:w-full xl:min-w-0",
                          listbox: "max-h-72 overflow-y-auto",
                          popoverContent: "max-h-72 w-96",
                          value: "text-sm",
                        }}
                        scrollShadowProps={{
                          isEnabled: false,
                        }}
                        items={[
                          {
                            key: "select_all",
                            label: "🔘 Pilih Semua Kementerian",
                          },
                          ...kementerianOptions,
                        ]}
                      >
                        {(item) => (
                          <SelectItem
                            key={item.key}
                            textValue={item.label}
                            className={
                              item.key === "select_all"
                                ? "text-blue-600 font-medium border-b border-gray-200 sticky top-0 bg-white z-10"
                                : "text-sm"
                            }
                          >
                            {item.label}
                          </SelectItem>
                        )}
                      </Select>
                    </div>
                  </div>
                  <div className="min-w-fit xl:min-w-0">
                    <Input
                      placeholder="Masukkan Kondisi"
                      value={kementerianKondisi}
                      onChange={(e) => setKementerianKondisi(e.target.value)}
                      variant="bordered"
                      size="sm"
                      aria-label="Kondisi Kementerian"
                      className="w-auto min-w-[140px] xl:w-full xl:min-w-0"
                    />
                  </div>
                  <div className="min-w-fit xl:min-w-0">
                    <Input
                      placeholder="Mengandung Kata"
                      value={kementerianKata}
                      onChange={(e) => setKementerianKata(e.target.value)}
                      variant="bordered"
                      size="sm"
                      aria-label="Kata yang mengandung Kementerian"
                      className="w-auto min-w-[140px] xl:w-full xl:min-w-0"
                    />
                  </div>
                  <div className="min-w-fit xl:min-w-0">
                    <Select
                      placeholder="Pilih Tampilan"
                      selectedKeys={
                        kementerianTampilan ? [kementerianTampilan] : []
                      }
                      onSelectionChange={(keys) => {
                        const selectedKey = Array.from(keys)[0] as string;
                        setKementerianTampilan(selectedKey || "");
                      }}
                      variant="bordered"
                      size="sm"
                      aria-label="Pilih Tampilan Kementerian"
                      classNames={{
                        trigger: "w-auto min-w-[170px] xl:w-full xl:min-w-0",
                        listbox: "w-auto min-w-max",
                        popoverContent: "w-auto min-w-max",
                      }}
                      items={tampilanOptions}
                    >
                      {(item) => (
                        <SelectItem key={item.key}>{item.label}</SelectItem>
                      )}
                    </Select>
                  </div>
                </div>

                {/* Selected Kementerian Display */}
                {kementerian.size > 0 && (
                  <div className="p-4 bg-green-25 dark:bg-green-900/10 rounded-lg border border-green-100 dark:border-green-800/50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Building
                          className="text-green-600 dark:text-green-400"
                          size={14}
                        />
                        <span className="text-sm font-medium text-green-800 dark:text-green-200">
                          Selected Kementerian ({kementerian.size}):
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="light"
                          color="danger"
                          onPress={() => setKementerian(new Set())}
                          startContent={<X size={14} />}
                          className="h-6 min-w-0 px-2 text-xs"
                        >
                          Reset All
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {kementerian.size === kementerianOptions.length &&
                      kementerianOptions.length > 0 ? (
                        // Show single chip when all items are selected
                        <Chip
                          onClose={() => setKementerian(new Set())}
                          variant="flat"
                          color="success"
                          size="sm"
                          classNames={{
                            base: "bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-700",
                            content:
                              "text-green-800 dark:text-green-200 text-xs",
                            closeButton:
                              "text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800",
                          }}
                        >
                          Semua Kementerian ({kementerian.size} items)
                        </Chip>
                      ) : (
                        // Show individual chips when not all items are selected
                        Array.from(kementerian).map((key) => {
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
                              classNames={{
                                base: "bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-700",
                                content:
                                  "text-green-800 dark:text-green-200 text-xs",
                                closeButton:
                                  "text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800",
                              }}
                            >
                              {option?.label || key}
                            </Chip>
                          );
                        })
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
            {/* Satker - Only show if satker switch is enabled */}
            {switches.satker && (
              <>
                <div className="flex flex-wrap items-center gap-4 xl:grid xl:grid-cols-5 xl:gap-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                  <div className="flex items-center gap-2 min-w-fit">
                    <FileText
                      className="text-purple-600 dark:text-purple-400"
                      size={16}
                    />
                    <span className="font-medium text-gray-900 dark:text-white text-sm whitespace-nowrap">
                      Satker
                    </span>
                  </div>
                  <div className="min-w-fit xl:min-w-0">
                    <div className="flex flex-col gap-2">
                      <Select
                        placeholder={
                          kementerian.size === 0
                            ? "Pilih Kementerian terlebih dahulu"
                            : "Pilih Satker"
                        }
                        selectedKeys={satker}
                        onSelectionChange={handleSatkerSelection}
                        variant="bordered"
                        size="sm"
                        selectionMode="multiple"
                        isDisabled={kementerian.size === 0}
                        renderValue={() => {
                          if (satker.size === 0) {
                            return kementerian.size === 0
                              ? "Pilih Kementerian terlebih dahulu"
                              : "Pilih Satker";
                          } else if (
                            satker.size === filteredSatkerOptions.length &&
                            filteredSatkerOptions.length > 0
                          ) {
                            return `Semua Satker (${satker.size})`;
                          } else {
                            return `${satker.size} Satker dipilih`;
                          }
                        }}
                        aria-label="Pilih Satker"
                        classNames={{
                          trigger: "w-auto min-w-[220px] xl:w-full xl:min-w-0",
                          listbox: "max-h-72 overflow-y-auto",
                          popoverContent: "max-h-72 w-96",
                          value: "text-sm",
                        }}
                        scrollShadowProps={{
                          isEnabled: false,
                        }}
                        items={
                          filteredSatkerOptions.length > 0
                            ? [
                                {
                                  key: "select_all",
                                  label: "🔘 Pilih Semua Satker",
                                },
                                ...filteredSatkerOptions,
                              ]
                            : []
                        }
                      >
                        {(item) => (
                          <SelectItem
                            key={item.key}
                            textValue={item.label}
                            className={
                              item.key === "select_all"
                                ? "text-purple-600 font-medium border-b border-gray-200 sticky top-0 bg-white z-10"
                                : "text-sm"
                            }
                          >
                            {item.label}
                          </SelectItem>
                        )}
                      </Select>
                    </div>
                  </div>
                  <div className="min-w-fit xl:min-w-0">
                    <Input
                      placeholder="Masukkan Kondisi"
                      value={satkerKondisi}
                      onChange={(e) => setSatkerKondisi(e.target.value)}
                      variant="bordered"
                      size="sm"
                      aria-label="Kondisi Satker"
                      className="w-auto min-w-[140px] xl:w-full xl:min-w-0"
                    />
                  </div>
                  <div className="min-w-fit xl:min-w-0">
                    <Input
                      placeholder="Mengandung Kata"
                      value={satkerKata}
                      onChange={(e) => setSatkerKata(e.target.value)}
                      variant="bordered"
                      size="sm"
                      aria-label="Kata yang mengandung Satker"
                      className="w-auto min-w-[140px] xl:w-full xl:min-w-0"
                    />
                  </div>
                  <div className="min-w-fit xl:min-w-0">
                    <Select
                      placeholder="Pilih Tampilan"
                      selectedKeys={satkerTampilan ? [satkerTampilan] : []}
                      onSelectionChange={(keys) => {
                        const selectedKey = Array.from(keys)[0] as string;
                        setSatkerTampilan(selectedKey || "");
                      }}
                      variant="bordered"
                      size="sm"
                      aria-label="Pilih Tampilan Satker"
                      classNames={{
                        trigger: "w-auto min-w-[170px] xl:w-full xl:min-w-0",
                        listbox: "w-auto min-w-max",
                        popoverContent: "w-auto min-w-max",
                      }}
                      items={tampilanOptions}
                    >
                      {(item) => (
                        <SelectItem key={item.key}>{item.label}</SelectItem>
                      )}
                    </Select>
                  </div>
                </div>

                {/* Selected Satker Display */}
                {satker.size > 0 && (
                  <div className="p-4 bg-purple-25 dark:bg-purple-900/10 rounded-lg border border-purple-100 dark:border-purple-800/50">
                    <div className="flex items-center justify-between mb-3">
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
                        onPress={() => setSatker(new Set())}
                        startContent={<X size={14} />}
                        className="h-6 min-w-0 px-2 text-xs"
                      >
                        Reset All
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {satker.size === filteredSatkerOptions.length &&
                      filteredSatkerOptions.length > 0 ? (
                        // Show single chip when all items are selected
                        <Chip
                          onClose={() => setSatker(new Set())}
                          variant="flat"
                          color="secondary"
                          size="sm"
                          classNames={{
                            base: "bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700",
                            content:
                              "text-purple-800 dark:text-purple-200 text-xs",
                            closeButton:
                              "text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-800",
                          }}
                        >
                          Semua Satker ({satker.size} items)
                        </Chip>
                      ) : (
                        // Show individual chips when not all items are selected
                        Array.from(satker).map((key) => {
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
                              classNames={{
                                base: "bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700",
                                content:
                                  "text-purple-800 dark:text-purple-200 text-xs",
                                closeButton:
                                  "text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-800",
                              }}
                            >
                              {option?.label || key}
                            </Chip>
                          );
                        })
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              type="submit"
              color="primary"
              isLoading={isLoading}
              startContent={!isLoading && <Search size={18} />}
              className="min-w-[120px]"
            >
              {isLoading ? "Searching..." : "Search Data"}
            </Button>

            <Button
              type="button"
              variant="bordered"
              startContent={<RefreshCw size={18} />}
              onClick={handleReset}
            >
              Reset Form
            </Button>

            <Button
              type="button"
              color="success"
              variant="flat"
              startContent={<Download size={18} />}
              onClick={handleExport}
            >
              Export Data
            </Button>
          </div>

          {/* Form Summary */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-6">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">
              Query Summary:
            </h4>{" "}
            <div className="space-y-2 text-sm">
              {switches.cutOff && (
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Cut Off:
                  </span>
                  <span className="font-medium text-blue-600 dark:text-blue-400">
                    {cutOff || "Not selected"}
                  </span>
                </div>
              )}
              {switches.kementerian && (
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Kementerian:
                  </span>
                  <span className="font-medium text-green-600 dark:text-green-400">
                    {kementerian.size === 0
                      ? "Not selected"
                      : kementerian.size === kementerianOptions.length
                      ? "Semua Kementerian"
                      : `${kementerian.size} selected`}
                  </span>
                </div>
              )}
              {switches.satker && (
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Satker:
                  </span>
                  <span className="font-medium text-purple-600 dark:text-purple-400">
                    {satker.size === 0
                      ? "Not selected"
                      : satker.size === filteredSatkerOptions.length &&
                        filteredSatkerOptions.length > 0
                      ? "Semua Satker"
                      : `${satker.size} selected`}
                  </span>
                </div>
              )}
            </div>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};
