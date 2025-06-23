import React from "react";
// import { Button, ButtonGroup } from "react-bootstrap";

const PilihFormat = ({ selectedFormat, setSelectedFormat }) => {
  const handleFormatChange = (e) => {
    setSelectedFormat(e.target.value);
  };

  return (
    <div className="mb-3 flex justify-center items-center flex-col">
      {/* <ButtonGroup>
        <Button
          variant={selectedFormat === "pdf" ? "primary" : "outline-secondary"}
          onClick={() => setSelectedFormat("pdf")}
        >
          PDF
        </Button>
        <Button
          variant={selectedFormat === "excel" ? "primary" : "outline-secondary"}
          onClick={() => setSelectedFormat("excel")}
        >
          Excel
        </Button>
        <Button
          variant={selectedFormat === "json" ? "primary" : "outline-secondary"}
          onClick={() => setSelectedFormat("json")}
        >
          JSON
        </Button>
        <Button
          variant={selectedFormat === "text" ? "primary" : "outline-secondary"}
          onClick={() => setSelectedFormat("text")}
        >
          Text
        </Button>
      </ButtonGroup> */}
      <div className="inline-flex rounded-md shadow-sm" role="group">
        <button
          type="button"
          className={`px-4 py-2 text-sm font-medium border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            selectedFormat === "pdf"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
          }`}
          onClick={() => setSelectedFormat("pdf")}
        >
          PDF
        </button>
        <button
          type="button"
          className={`px-4 py-2 text-sm font-medium border-t border-b focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            selectedFormat === "excel"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
          }`}
          onClick={() => setSelectedFormat("excel")}
        >
          Excel
        </button>
        <button
          type="button"
          className={`px-4 py-2 text-sm font-medium border-t border-b focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            selectedFormat === "json"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
          }`}
          onClick={() => setSelectedFormat("json")}
        >
          JSON
        </button>
        <button
          type="button"
          className={`px-4 py-2 text-sm font-medium border rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            selectedFormat === "text"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
          }`}
          onClick={() => setSelectedFormat("text")}
        >
          Text
        </button>
      </div>
    </div>
  );
};

export default PilihFormat;
