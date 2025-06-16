"use client";
import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Switch,
  Chip,
  Button,
} from "@heroui/react";
import { Filter, RotateCcw, Check } from "lucide-react";
import { useBelanja } from "./context";

export const Radio = () => {
  const {
    switches,
    handleSwitchChange,
    handleResetAll,
    activeFiltersCount,
    selectedJenisLaporan,
  } = useBelanja(); // Define switch groups for each column (5 columns) - horizontal flow pattern
  const switchGroups = [
    // Column 1 (items 1, 6, 11, 16, 21, 26)
    [
      { key: "cutOff", label: "CutOff" },
      { key: "kabkota", label: "KabKota" },
      { key: "subFungsi", label: "Sub-Fungsi" },
      { key: "akun", label: "Akun" },
      { key: "kegiatanPrioritas", label: "Kegiatan Prioritas" },
      { key: "tematikStunting", label: "Tematik Stunting" },
    ],
    // Column 2 (items 2, 7, 12, 17, 22, 27)
    [
      { key: "kementerian", label: "Kementerian" },
      { key: "kanwil", label: "Kanwil" },
      { key: "program", label: "Program" },
      { key: "sumberDana", label: "Sumber Dana" },
      { key: "proyekPrioritas", label: "Proyek Prioritas" },
      { key: "kemiskinanEkstrim", label: "Kemiskinan Ekstrim" },
    ],
    // Column 3 (items 3, 8, 13, 18, 23, 28)
    [
      { key: "eselonI", label: "Eselon I" },
      { key: "kppn", label: "KPPN" },
      { key: "kegiatan", label: "Kegiatan" },
      { key: "register", label: "Register" },
      { key: "majorProject", label: "Major Project" },
      { key: "belanjaPemilu", label: "Belanja Pemilu" },
    ],
    // Column 4 (items 4, 9, 14, 19, 24, 29)
    [
      { key: "kewenangan", label: "Kewenangan" },
      { key: "satker", label: "Satker" },
      { key: "outputKro", label: "Output/KRO" },
      { key: "prioritasNasional", label: "Prioritas Nasional" },
      { key: "tematikAnggaran", label: "Tematik Anggaran" },
      { key: "belanjaIkn", label: "Belanja IKN" },
    ],
    // Column 5 (items 5, 10, 15, 20, 25, 30)
    [
      { key: "provinsi", label: "Provinsi" },
      { key: "fungsi", label: "Fungsi" },
      { key: "suboutputRo", label: "Sub-Output/RO" },
      { key: "programPrioritas", label: "Program Prioritas" },
      { key: "tematikInflasi", label: "Tematik Inflasi" },
      { key: "belanjaKetahananPangan", label: "Belanja Ketahanan Pangan" },
    ],
  ];
  return (
    <div className="space-y-4 mb-6">
      {/* Header Card */}{" "}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-700/30 shadow-sm">
        <CardHeader className="py-2">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-md">
                <Filter className="text-white" size={18} />
              </div>
              <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Query Filter Selection
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <Chip
                variant="flat"
                color={activeFiltersCount > 0 ? "primary" : "default"}
                startContent={<Check size={14} />}
                size="sm"
              >
                {activeFiltersCount} active
              </Chip>
              <Button
                variant="bordered"
                size="sm"
                onPress={handleResetAll}
                startContent={<RotateCcw size={14} />}
                className="border-gray-300 hover:border-gray-400"
                isDisabled={activeFiltersCount === 0}
              >
                Reset All
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>{" "}
      {/* Filters Grid Card */}
      <Card className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10 border border-blue-100 dark:border-blue-800/20 shadow-sm">
        <CardBody className="p-6">
          <div className="grid grid-cols-2 xl:grid-cols-5 gap-4">
            {" "}
            {switchGroups.map((group, columnIndex) => (
              <div key={columnIndex} className="space-y-1">
                {" "}
                {group.map((item) => {
                  const isSelected =
                    switches[item.key as keyof typeof switches];
                  // Enable specific switches only when "Volume Output Kegiatan - Data Caput" is selected
                  const disabledSwitches = [
                    "prioritasNasional",
                    "programPrioritas",
                    "kegiatanPrioritas",
                    "proyekPrioritas",
                    "majorProject",
                    "tematikAnggaran",
                    "tematikInflasi",
                    "tematikStunting",
                    "kemiskinanEkstrim",
                    "belanjaPemilu",
                    "belanjaIkn",
                    "belanjaKetahananPangan",
                  ];
                  const isDisabled =
                    disabledSwitches.includes(item.key) &&
                    selectedJenisLaporan !==
                      "Volume Output Kegiatan - Data Caput";
                  return (
                    <div
                      key={item.key}
                      className={`flex items-center gap-3 px-2 py-1 rounded-xl transition-all duration-200 ${
                        isSelected
                          ? "bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40"
                          : isDisabled
                          ? "bg-gray-50 dark:bg-gray-800/40 opacity-50"
                          : "bg-gray-100/80 dark:bg-gray-700/60 hover:bg-gray-200/80 dark:hover:bg-gray-600/60"
                      }`}
                    >
                      <Switch
                        id={item.key}
                        size="sm"
                        color="primary"
                        isSelected={isSelected}
                        isDisabled={isDisabled}
                        onValueChange={(value) =>
                          handleSwitchChange(
                            item.key as keyof typeof switches,
                            value
                          )
                        }
                      />
                      <label
                        htmlFor={item.key}
                        className={`text-sm font-medium cursor-pointer transition-colors flex-1 ${
                          isSelected
                            ? "text-blue-700 dark:text-blue-300"
                            : isDisabled
                            ? "text-gray-400 dark:text-gray-500 cursor-not-allowed"
                            : "text-gray-700 dark:text-gray-200"
                        }`}
                      >
                        {item.label}
                      </label>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
