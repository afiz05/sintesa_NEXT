import React from "react";

const CutoffMonthSelector = ({ cutoff, setCutoff }) => (
  <div className="bg-white rounded-lg shadow-md p-4 flex flex-row items-center gap-6">
    <label className="block text-sm font-medium mb-0 whitespace-nowrap">
      Bulan Cut-off
    </label>
    <select
      className="border rounded px-2 py-1"
      value={cutoff}
      onChange={(e) => setCutoff(e.target.value)}
    >
      {[...Array(12)].map((_, i) => (
        <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
          {new Date(0, i).toLocaleString("id-ID", { month: "long" })}
        </option>
      ))}
      <option value="12">Desember (Full Year)</option>
    </select>
  </div>
);

export default CutoffMonthSelector;
