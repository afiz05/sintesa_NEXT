import React from "react";

const TanggalFilter = ({ inquiryState }) => {
  const { tanggal, setTanggal } = inquiryState;
  return (
    <div className="border p-4 rounded-md">
      <h6 className="font-semibold mb-3">Tanggal Filter</h6>
      <input
        type="date"
        className="w-full p-2 border rounded"
        value={tanggal || ""}
        onChange={(e) => setTanggal(e.target.value)}
      />
    </div>
  );
};

export default TanggalFilter;
