import React from "react";
import { Radio } from "@heroui/react";
import Kdfungsi from "../../../referensi_belanja/Kdfungsi";
import Kdsfungsi from "../../../referensi_belanja/Kdsfungsi";
import Kdprogram from "../../../referensi_belanja/Kdprogram";

const FunctionFilter = ({ inquiryState }) => {
  const {
    fungsi, setFungsi,
    sfungsi, setSfungsi,
    program, setProgram,
    fungsiradio, setFungsiradio
  } = inquiryState;

  return (
    <div className="border p-4 rounded-md">
      <h6 className="font-semibold mb-3">Function Filter</h6>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Function Selection */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Function
          </label>
          <Kdfungsi
            value={fungsi}
            onChange={(e) => setFungsi(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        
        {/* Sub-Function Selection */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Sub-Function
          </label>
          <Kdsfungsi
            value={sfungsi}
            onChange={(e) => setSfungsi(e.target.value)}
            kdfungsi={fungsi} // Filter sub-functions by selected function
            className="w-full p-2 border rounded"
          />
        </div>
        
        {/* Program Selection */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Program
          </label>
          <Kdprogram
            value={program}
            onChange={(e) => setProgram(e.target.value)}
            kdfungsi={fungsi}
            kdsfungsi={sfungsi} // Filter programs by selected function and sub-function
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="flex items-center">
          <Radio
            id="fungsi-radio-1"
            name="fungsi-display"
            checked={fungsiradio === "1"}
            onChange={() => setFungsiradio("1")}
          />
          <label htmlFor="fungsi-radio-1" className="ml-2">
            Show Code & Description
          </label>
        </div>
        
        <div className="flex items-center">
          <Radio
            id="fungsi-radio-2"
            name="fungsi-display"
            checked={fungsiradio === "2"}
            onChange={() => setFungsiradio("2")}
          />
          <label htmlFor="fungsi-radio-2" className="ml-2">
            Show Description Only
          </label>
        </div>
      </div>
    </div>
  );
};

export default FunctionFilter;