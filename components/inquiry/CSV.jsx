import React from "react";
import Papa from "papaparse";
// // import { Button } from "react-bootstrap"
import { Dialog, Transition } from "@headlessui/react";

const ExportCSVButton = ({ data, filename }) => {
  const exportToCSV = () => {
    const config = {
      delimiter: ";", // Ganti dengan delimiter yang diinginkan, misalnya ";"
    };

    const csv = Papa.unparse(data, config);

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    // <Button
    //   variant="success"
    //   size="sm"
    //   className="w-15 mb-2"
    //   onClick={exportToCSV}
    // >
    //   Download CSV
    // </Button>
    <button
      type="button"
      className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mb-2"
      onClick={exportToCSV}
    >
      Download CSV
    </button>
  );
};

export default ExportCSVButton;
