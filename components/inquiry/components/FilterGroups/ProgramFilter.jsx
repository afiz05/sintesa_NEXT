import React from "react";
import { Radio } from "@heroui/react";
import Kdgiat from "../../../referensi_belanja/Kdgiat";
import Kdoutput from "../../../referensi_belanja/Kdoutput";

const ProgramFilter = ({ inquiryState }) => {
  const {
    giat,
    setGiat,
    output,
    setOutput,
    kddept,
    kdunit,
    program, // For filtering activities
    kegiatanradio,
    setKegiatanradio,
  } = inquiryState;

  return (
    <div className="border p-4 rounded-md">
      <h6 className="font-semibold mb-3">Activity & Output Filter</h6>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Activity Selection */}
        <div>
          <label className="block text-sm font-medium mb-2">Activity</label>
          <Kdgiat
            kdgiat={giat}
            onChange={setGiat}
            kddept={kddept}
            kdunit={kdunit}
            kdprogram={program}
            status={"pilihgiat"}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Output Selection */}
        <div>
          <label className="block text-sm font-medium mb-2">Output</label>
          <Kdoutput
            value={output}
            onChange={(e) => setOutput(e.target.value)}
            kdgiat={giat}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="flex items-center">
          <Radio
            id="kegiatan-radio-1"
            name="kegiatan-display"
            checked={kegiatanradio === "1"}
            onChange={() => setKegiatanradio("1")}
          />
          <label htmlFor="kegiatan-radio-1" className="ml-2">
            Show Code & Description
          </label>
        </div>

        <div className="flex items-center">
          <Radio
            id="kegiatan-radio-2"
            name="kegiatan-display"
            checked={kegiatanradio === "2"}
            onChange={() => setKegiatanradio("2")}
          />
          <label htmlFor="kegiatan-radio-2" className="ml-2">
            Show Description Only
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProgramFilter;
