import React from "react";
import { Card, CardBody, Radio, RadioGroup, Select } from "@heroui/react";

const DisplayOptions = ({ inquiryState }) => {
  const {
    jenlap, setJenlap,
    pembulatan, setPembulatan,
    cutoff, setCutoff
  } = inquiryState;

  // Report types
  const reportTypes = [
    { value: "1", label: "APBN (Budget Only)" },
    { value: "2", label: "Budget & Realization" },
    { value: "3", label: "Monthly Realization" },
    { value: "4", label: "Blocked Funds" }
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
    { value: "12", label: "December" }
  ];
  
  // Rounding options
  const roundingOptions = [
    { value: "1", label: "Rupiah" },
    { value: "2", label: "Thousands" },
    { value: "3", label: "Millions" },
    { value: "4", label: "Billions" }
  ];

  return (
    <Card className="mb-4">
      <CardBody>
        <h5 className="text-lg font-semibold mb-4">Display Options</h5>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Report Type Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Report Type
            </label>
            <Select
              value={jenlap}
              onChange={(e) => setJenlap(e.target.value)}
              className="w-full"
            >
              {reportTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </Select>
          </div>
          
          {/* Cut-off Month Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Cut-off Month
            </label>
            <Select
              value={cutoff}
              onChange={(e) => setCutoff(e.target.value)}
              className="w-full"
            >
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </Select>
          </div>
          
          {/* Rounding Options */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Rounding
            </label>
            <RadioGroup
              value={pembulatan}
              onChange={(value) => setPembulatan(value)}
              className="flex flex-wrap gap-4"
            >
              {roundingOptions.map((option) => (
                <div key={option.value} className="flex items-center">
                  <Radio 
                    id={`rounding-${option.value}`}
                    value={option.value}
                  />
                  <label htmlFor={`rounding-${option.value}`} className="ml-2">
                    {option.label}
                  </label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default DisplayOptions;