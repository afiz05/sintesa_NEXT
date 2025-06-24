import React from "react";

const CutoffFilter = ({ inquiryState }) => {
  const { cutoff, setCutoff } = inquiryState;
  return (
    <div className="border p-4 rounded-md">
      <h6 className="font-semibold mb-3">Cutoff Filter</h6>
      <select
        className="w-full p-2 border rounded"
        value={cutoff}
        onChange={(e) => setCutoff(e.target.value)}
      >
        <option value="0">None</option>
        <option value="6">June</option>
        <option value="12">December</option>
      </select>
    </div>
  );
};

export default CutoffFilter;
