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
  const { switches, handleSwitchChange, handleResetAll, activeFiltersCount } =
    useBelanja();
  // Define switch groups for each column (5 columns)
  const switchGroups = [
    // Column 1
    [
      { key: "cutOff", label: "Cut Off" },
      { key: "provinsi", label: "Provinsi" },
      { key: "satker", label: "Satker" },
      { key: "kegiatan", label: "Kegiatan" },
      { key: "sumberDana", label: "Sumber Dana" },
      { key: "kegiatanPrioritas", label: "Kegiatan Prioritas" },
    ],
    // Column 2
    [
      { key: "tematikInflasi", label: "Tematik Inflasi" },
      { key: "belanjaIkn", label: "Belanja IKN" },
      { key: "kementerian", label: "Kementerian" },
      { key: "kabkota", label: "Kabkota" },
      { key: "fungsi", label: "Fungsi" },
      { key: "outputKro", label: "Output/ KRO" },
    ],
    // Column 3
    [
      { key: "register", label: "Register" },
      { key: "proyekPrioritas", label: "Proyek Prioritas" },
      { key: "tematikStunting", label: "Tematik Stunting" },
      { key: "belanjaKetahananPangan", label: "Belanja Ketahanan Pangan" },
      { key: "eselonI", label: "Eselon I" },
      { key: "kanwil", label: "Kanwil" },
    ],
    // Column 4
    [
      { key: "subFungsi", label: "Sub Fungsi" },
      { key: "suboutputRo", label: "Suboutput/ RO" },
      { key: "prioritasNasional", label: "Prioritas Nasional" },
      { key: "majorProject", label: "Major Project" },
      { key: "kemiskinanEkstrim", label: "Kemiskinan Ekstrim" },
      { key: "kewenangan", label: "Kewenangan" },
    ],
    // Column 5
    [
      { key: "kppn", label: "KPPN" },
      { key: "program", label: "Program" },
      { key: "akun", label: "Akun" },
      { key: "programPrioritas", label: "Program Prioritas" },
      { key: "tematikAnggaran", label: "Tematik Anggaran" },
      { key: "belanjaPemilu", label: "Belanja Pemilu" },
    ],
  ];
  return (
    <div className="space-y-4">
      {/* Header Card */}{" "}
      <Card className="bg-white dark:bg-gray-900 border-0 shadow-none outline-none ring-0">
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
      <Card className="bg-white dark:bg-gray-900 border-0 shadow-none outline-none ring-0">
        <CardBody className="p-6">
          <div className="grid grid-cols-2 xl:grid-cols-5 gap-4">
            {switchGroups.map((group, columnIndex) => (
              <div key={columnIndex} className="space-y-2">
                {" "}
                {group.map((item) => {
                  const isSelected =
                    switches[item.key as keyof typeof switches];
                  return (
                    <div
                      key={item.key}
                      className={`flex items-center gap-3 p-2 rounded-xl transition-all duration-200 ${
                        isSelected
                          ? "bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40"
                          : "bg-gray-100/80 dark:bg-gray-700/60 hover:bg-gray-200/80 dark:hover:bg-gray-600/60"
                      }`}
                    >
                      <Switch
                        id={item.key}
                        size="sm"
                        color="primary"
                        isSelected={isSelected}
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
      </Card>{" "}
      {/* Active Filters Summary Card */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 border-0 shadow-none outline-none ring-0">
        <CardBody className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl shadow-md">
              <Check className="text-white" size={16} />
            </div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Active Filters
            </h4>
            <Chip variant="flat" color="success" size="sm">
              {activeFiltersCount}
            </Chip>
          </div>
          {activeFiltersCount > 0 ? (
            <div className="flex flex-wrap gap-2">
              {Object.entries(switches)
                .filter(([_, isActive]) => isActive)
                .map(([key, _]) => {
                  const item = switchGroups
                    .flat()
                    .find((item) => item.key === key);
                  return (
                    <Chip
                      key={key}
                      variant="flat"
                      color="primary"
                      onClose={() =>
                        handleSwitchChange(key as keyof typeof switches, false)
                      }
                      className="transition-all hover:scale-105"
                    >
                      {item?.label}
                    </Chip>
                  );
                })}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-gray-400 dark:text-gray-500 mb-2">
                <Filter size={48} className="mx-auto opacity-50" />
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                No filters selected. Enable switches above to see active filters
                here.
              </p>
            </div>
          )}{" "}
        </CardBody>
      </Card>
    </div>
  );
};
