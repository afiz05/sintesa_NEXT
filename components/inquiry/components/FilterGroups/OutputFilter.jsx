import React from "react";
import { Radio } from "@heroui/react";
import Kdkomponen from "../../../referensi_belanja/Kdkomponen";
import Kdsubkomponen from "../../../referensi_belanja/Kdsubkomponen";

const OutputFilter = ({ inquiryState }) => {
  const {
    komponen, setKomponen,
    subkomponen, setSubkomponen,
    output, // We need output to filter components
    komponenradio, setKomponenradio
  } = inquiryState;

  return (
    <div className="border p-4 rounded-md">
      <h6 className="font-semibold mb-3">Component & Subcomponent Filter</h6>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Component Selection */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Component
          </label>
          <Kdkomponen
            value={komponen}
            onChange={(e) => setKomponen(e.target.value)}
            kdoutput={output} // Filter components by selected output
            className="w-full p-2 border rounded"
          />
        </div>
        
        {/* Subcomponent Selection */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Subcomponent
          </label>
          <Kdsubkomponen
            value={subkomponen}
            onChange={(e) => setSubkomponen(e.target.value)}
            kdkomponen={komponen} // Filter subcomponents by selected component
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="flex items-center">
          <Radio
            id="komponen-radio-1"
            name="komponen-display"
            checked={komponenradio === "1"}
            onChange={() => setKomponenradio("1")}
          />
          <label htmlFor="komponen-radio-1" className="ml-2">
            Show Code & Description
          </label>
        </div>
        
        <div className="flex items-center">
          <Radio
            id="komponen-radio-2"
            name="komponen-display"
            checked={komponenradio === "2"}
            onChange={() => setKomponenradio("2")}
          />
          <label htmlFor="komponen-radio-2" className="ml-2">
            Show Description Only
          </label>
        </div>
      </div>
    </div>
  );
};

export default OutputFilter;