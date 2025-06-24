import React from "react";
import Kdfungsi from "../../../referensi_belanja/Kdfungsi";

const FungsiFilter = ({ inquiryState }) => {
  const { fungsi, setFungsi } = inquiryState;
  return (
    <div className="border p-4 rounded-md">
      <h6 className="font-semibold mb-3">Function Filter</h6>
      <Kdfungsi
        value={fungsi}
        onChange={(e) => setFungsi(e.target.value)}
        className="w-full p-2 border rounded"
      />
    </div>
  );
};

export default FungsiFilter;
