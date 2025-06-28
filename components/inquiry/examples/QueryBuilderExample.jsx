/**
 * Example: Using the Modular Query Builder
 *
 * This example shows how to use the new modular query builder system
 * instead of the monolithic 1800+ line original version.
 */

import React, { useState } from "react";
import useQueryBuilder from "../hooks/useQueryBuilderModular";

const QueryBuilderExample = () => {
  // Example inquiry state (simplified)
  const [inquiryState, setInquiryState] = useState({
    thang: "2024",
    jenlap: "2",
    cutoff: "12",
    tanggal: null,
    akumulatif: "0",
    pembulatan: "1000",

    // Department filter
    kddept: true, // Enable department filter
    dept: "001", // Selected department
    deptradio: "2", // Show code + name
    deptkondisi: "", // No conditions
    katadept: "", // No keyword search

    // Location filter
    kdlokasi: true, // Enable province filter
    prov: "31", // Selected province
    locradio: "3", // Show name only
    lokasikondisi: "", // No conditions
    katalokasi: "", // No keyword search

    // Program filter
    kdprogram: true, // Enable program filter
    program: "001", // Selected program
    programradio: "1", // Show code only
    programkondisi: "", // No conditions
    kataprogram: "", // No keyword search

    // Access control
    role: "1", // Admin role
    kodekppn: "",
    kodekanwil: "",

    // State setters (for backward compatibility)
    setFrom: (value) => console.log("FROM:", value),
    setSelect: (value) => console.log("SELECT:", value),
    setSql: (value) => console.log("SQL:", value),
  });

  // Use the new modular query builder
  const queryBuilder = useQueryBuilder(inquiryState);

  // Get the built query (automatically computed)
  const sql = queryBuilder.buildQuery;

  // Get performance metrics
  const handleAnalyzePerformance = () => {
    const metrics = queryBuilder.getQueryPerformanceMetrics();
    console.log("🚀 Performance Metrics:", metrics);
  };

  // Get filter statistics
  const handleGetFilterStats = () => {
    const stats = queryBuilder.getFilterStats();
    console.log("📊 Filter Statistics:", stats);
  };

  // Debug specific filter
  const handleDebugFilter = (filterName) => {
    const debug = queryBuilder.debugFilter(filterName);
    console.log(`🔍 Debug ${filterName}:`, debug);
  };

  // Analyze query complexity
  const handleAnalyzeComplexity = () => {
    const complexity = queryBuilder.analyzeQueryComplexity();
    console.log("🧠 Query Complexity:", complexity);
  };

  // Generate SQL preview
  const handleGeneratePreview = () => {
    const preview = queryBuilder.generateSqlPreview();
    console.log("👀 SQL Preview:", preview);
  };

  // Toggle filter
  const toggleFilter = (filterKey) => {
    setInquiryState((prev) => ({
      ...prev,
      [filterKey]: !prev[filterKey],
    }));
  };

  // Update filter value
  const updateFilterValue = (key, value) => {
    setInquiryState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Modular Query Builder Example</h1>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Department Filter */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">Department Filter</h3>

          <label className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={inquiryState.kddept}
              onChange={() => toggleFilter("kddept")}
              className="mr-2"
            />
            Enable Department Filter
          </label>

          {inquiryState.kddept && (
            <div className="space-y-2">
              <select
                value={inquiryState.deptradio}
                onChange={(e) => updateFilterValue("deptradio", e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="1">Code Only</option>
                <option value="2">Code + Name</option>
                <option value="3">Name Only</option>
              </select>

              <input
                type="text"
                placeholder="Department Code"
                value={inquiryState.dept}
                onChange={(e) => updateFilterValue("dept", e.target.value)}
                className="w-full p-2 border rounded"
              />

              <button
                onClick={() => handleDebugFilter("department")}
                className="w-full px-3 py-1 bg-blue-500 text-white rounded text-sm"
              >
                Debug Department Filter
              </button>
            </div>
          )}
        </div>

        {/* Location Filter */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">Location Filter</h3>

          <label className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={inquiryState.kdlokasi}
              onChange={() => toggleFilter("kdlokasi")}
              className="mr-2"
            />
            Enable Province Filter
          </label>

          {inquiryState.kdlokasi && (
            <div className="space-y-2">
              <select
                value={inquiryState.locradio}
                onChange={(e) => updateFilterValue("locradio", e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="1">Code Only</option>
                <option value="2">Code + Name</option>
                <option value="3">Name Only</option>
              </select>

              <input
                type="text"
                placeholder="Province Code"
                value={inquiryState.prov}
                onChange={(e) => updateFilterValue("prov", e.target.value)}
                className="w-full p-2 border rounded"
              />

              <button
                onClick={() => handleDebugFilter("provinsi")}
                className="w-full px-3 py-1 bg-blue-500 text-white rounded text-sm"
              >
                Debug Province Filter
              </button>
            </div>
          )}
        </div>

        {/* Program Filter */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">Program Filter</h3>

          <label className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={inquiryState.kdprogram}
              onChange={() => toggleFilter("kdprogram")}
              className="mr-2"
            />
            Enable Program Filter
          </label>

          {inquiryState.kdprogram && (
            <div className="space-y-2">
              <select
                value={inquiryState.programradio}
                onChange={(e) =>
                  updateFilterValue("programradio", e.target.value)
                }
                className="w-full p-2 border rounded"
              >
                <option value="1">Code Only</option>
                <option value="2">Code + Name</option>
                <option value="3">Name Only</option>
              </select>

              <input
                type="text"
                placeholder="Program Code"
                value={inquiryState.program}
                onChange={(e) => updateFilterValue("program", e.target.value)}
                className="w-full p-2 border rounded"
              />

              <button
                onClick={() => handleDebugFilter("program")}
                className="w-full px-3 py-1 bg-blue-500 text-white rounded text-sm"
              >
                Debug Program Filter
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Analysis Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={handleAnalyzePerformance}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          🚀 Analyze Performance
        </button>

        <button
          onClick={handleGetFilterStats}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          📊 Get Filter Stats
        </button>

        <button
          onClick={handleAnalyzeComplexity}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          🧠 Analyze Complexity
        </button>

        <button
          onClick={handleGeneratePreview}
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          👀 Generate Preview
        </button>
      </div>

      {/* Generated SQL */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3">Generated SQL Query</h3>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
          {sql || "// Query will appear here..."}
        </pre>
      </div>

      {/* Filter Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">Available Filters</h3>
          <div className="space-y-1">
            {queryBuilder.getAvailableFilters().map((filterName) => (
              <div
                key={filterName}
                className="flex items-center justify-between"
              >
                <span className="text-sm">{filterName}</span>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    queryBuilder.isFilterEnabled(filterName)
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {queryBuilder.isFilterEnabled(filterName)
                    ? "Enabled"
                    : "Disabled"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Query Statistics</h3>
          <div className="space-y-2 text-sm">
            <div>
              Enabled Filters: {queryBuilder.getFilterStats().enabledFilters}
            </div>
            <div>
              Total Columns: {queryBuilder.getFilterStats().columnsCount}
            </div>
            <div>JOIN Count: {queryBuilder.getFilterStats().joinsCount}</div>
            <div>
              WHERE Conditions:{" "}
              {queryBuilder.getFilterStats().whereConditionsCount}
            </div>
          </div>
        </div>
      </div>

      {/* Performance Tips */}
      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">💡 Performance Tips</h3>
        <ul className="text-sm space-y-1">
          <li>• Use fewer filters for better performance</li>
          <li>• Enable only necessary columns (radio buttons)</li>
          <li>
            • Use specific filter values instead of conditions when possible
          </li>
          <li>• Monitor query complexity with the analysis tools</li>
          <li>• Check the browser console for detailed metrics</li>
        </ul>
      </div>
    </div>
  );
};

export default QueryBuilderExample;
