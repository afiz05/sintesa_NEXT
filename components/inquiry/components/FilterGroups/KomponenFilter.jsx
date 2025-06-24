import React from "react";
import Kdkomponen from "../../../referensi_belanja/Kdkomponen";

const KomponenFilter = ({ inquiryState }) => {
  const { komponen, setKomponen, output } = inquiryState;
  return (
    <div className="border p-4 rounded-md">
      <h6 className="font-semibold mb-3">Component Filter</h6>
      <Kdkomponen
        value={komponen}
        onChange={(e) => setKomponen(e.target.value)}
        kdoutput={output}
        className="w-full p-2 border rounded"
      />
    </div>
  );
};

export default KomponenFilter;
