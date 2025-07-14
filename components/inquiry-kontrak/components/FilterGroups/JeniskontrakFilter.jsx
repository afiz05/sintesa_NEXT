import React from "react";
import { Button } from "@heroui/react";
import JenisKontrak from "../../../referensi_belanja/referensi_inquiryMod/JenisKontrak";
import { ReceiptText } from "lucide-react";

const JeniskontrakFilter = ({ inquiryState }) => {
  const {
    kdjeniskontrak,
    setKdjeniskontrak,
    jeniskontrak,
    setJeniskontrak,
    jeniskontrakradio,
    setJeniskontrakradio,
  } = inquiryState;

  const handleJenisKontrakChange = (value) => {
    setJeniskontrak(value);
    setJeniskontrakradio(value);
  };

  // Check if there's an active filter
  const hasActiveFilter =
    jeniskontrak && jeniskontrak !== "00" && jeniskontrak !== "";

  return (
    <div className="p-3 sm:mx-16 rounded-2xl bg-gradient-to-r from-sky-100 to-teal-100 dark:from-zinc-900 dark:to-zinc-900 shadow-sm">
      {/* Mobile/Tablet: Stack vertically, Desktop: Row layout */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 w-full">
        {/* Title - Full width on mobile, fixed width on desktop */}
        <h6 className="font-semibold flex items-center gap-2 lg:min-w-[100px] lg:flex-[2]">
          <ReceiptText size={20} className="ml-4 text-secondary" />
          Jenis Kontrak
        </h6>

        {/* Form fields container */}
        <div className="flex flex-col lg:flex-[8] gap-3 lg:gap-1 w-full">
          {/* Fields: Stack on mobile/tablet, row on large desktop */}
          <div className="flex flex-col xl:flex xl:flex-row xl:items-end gap-3 xl:gap-4 w-full">
            {/* Pilih Jenis Kontrak */}
            <div className="flex flex-col gap-1 w-full xl:flex-1 min-w-0 max-w-full overflow-hidden">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Pilih Jenis Kontrak
                </label>
                {hasActiveFilter && (
                  <Button
                    size="sm"
                    variant="light"
                    color="warning"
                    className="h-6 px-2 text-xs"
                    onPress={() => {
                      setJeniskontrak && setJeniskontrak("00");
                      setJeniskontrakradio && setJeniskontrakradio("00");
                    }}
                  >
                    Clear
                  </Button>
                )}
              </div>
              <JenisKontrak
                value={jeniskontrak}
                onChange={handleJenisKontrakChange}
                className="w-full min-w-0 max-w-full"
                size="sm"
                placeholder="Pilih Jenis Kontrak"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JeniskontrakFilter;
