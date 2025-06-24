import React from "react";
import Kdsdana from "../../../referensi_belanja/Kdsdana";

const SumberDanaFilter = ({ inquiryState }) => {
  const { sumber, setSumber } = inquiryState;
  return (
    <div className="border p-4 rounded-md">
      <h6 className="font-semibold mb-3">Funding Source Filter</h6>
      <Kdsdana
        value={sumber}
        onChange={(e) => setSumber(e.target.value)}
        status={"pilihsdana"}
        className="w-full p-2 border rounded"
      />
    </div>
  );
};

export default SumberDanaFilter;
