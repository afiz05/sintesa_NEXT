import React from "react";
import {
  Card,
  CardBody,
  Select,
  SelectItem,
  RadioGroup,
  Radio,
  Checkbox,
} from "@heroui/react";

const ReportTypeSelector = ({ inquiryState }) => {
  const {
    thang,
    setThang,
    jenlap,
    setJenlap,
    cutoff,
    setCutoff,
    pembulatan,
    setPembulatan,
    akumulatif,
    setAkumulatif,
  } = inquiryState;

  // Available years for selection
  const years = ["2023", "2024", "2025"];

  // Report types (match old form)
  const reportTypes = [
    { value: "1", label: "Pagu APBN" },
    { value: "2", label: "Pagu Realisasi" },
    { value: "3", label: "Pagu Realisasi Bulanan" },
    { value: "4", label: "Pergerakan Pagu Bulanan" },
    { value: "5", label: "Pergerakan Blokir Bulanan" },
    { value: "7", label: "Pergerakan Blokir Bulanan per Jenis" },
    { value: "6", label: "Volume Output Kegiatan (PN) - Data Caput" },
  ];

  // Months for cut-off selection
  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  // Rounding options
  const roundingOptions = [
    { value: "1", label: "Rupiah" },
    { value: "2", label: "Thousands" },
    { value: "3", label: "Millions" },
    { value: "4", label: "Billions" },
  ];

  return (
    <Card className="mb-4">
      <CardBody>
        <h5 className="text-lg font-semibold mb-4">Report Settings</h5>

        <div className="flex flex-col md:flex-row gap-6 w-full">
          {/* Year Selection */}
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">
              Budget Year
            </label>
            <Select
              selectedKey={thang}
              onSelectionChange={setThang}
              className="w-full"
              disallowEmptySelection={false}
              placeholder="Pilih Tahun"
            >
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </Select>
          </div>

          {/* Report Type Selection */}
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">
              Report Type
            </label>
            <Select
              selectedKey={jenlap}
              onSelectionChange={setJenlap}
              className="w-full"
              disallowEmptySelection={false}
              placeholder="Pilih Jenis Laporan"
            >
              {reportTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </Select>
          </div>

          {/* Akumulatif Checkbox */}
          <div className="flex-1 flex items-end pb-1">
            <Checkbox
              isSelected={akumulatif}
              onValueChange={setAkumulatif}
              className="w-full"
              color="primary"
            >
              Akumulatif
            </Checkbox>
          </div>

          {/* Rounding Options as Dropdown */}
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">Rounding</label>
            <Select
              selectedKey={pembulatan}
              onSelectionChange={setPembulatan}
              className="w-full"
              disallowEmptySelection={false}
              placeholder="Pilih Pembulatan"
            >
              {roundingOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ReportTypeSelector;
