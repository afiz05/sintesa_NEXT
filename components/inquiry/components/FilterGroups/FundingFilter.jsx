import React from "react";
import { Radio } from "@heroui/react";
import Kdsdana from "../../../referensi_belanja/Kdsdana";

const FundingFilter = ({ inquiryState }) => {
  const { sumber, setSumber, sumberradio, setSumberradio } = inquiryState;

  return (
    <div className="border p-4 rounded-md">
      <h6 className="font-semibold mb-3">Funding Source Filter</h6>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Funding Source</label>
        <Kdsdana
          value={sumber}
          onChange={(e) => setSumber(e.target.value)}
          status={"pilihsdana"}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="flex items-center">
          <Radio
            id="sumber-radio-1"
            name="sumber-display"
            checked={sumberradio === "1"}
            onChange={() => setSumberradio("1")}
          />
          <label htmlFor="sumber-radio-1" className="ml-2">
            Show Code & Description
          </label>
        </div>

        <div className="flex items-center">
          <Radio
            id="sumber-radio-2"
            name="sumber-display"
            checked={sumberradio === "2"}
            onChange={() => setSumberradio("2")}
          />
          <label htmlFor="sumber-radio-2" className="ml-2">
            Show Description Only
          </label>
        </div>
      </div>
    </div>
  );
};

export default FundingFilter;
