import React from "react";
import Kdsfungsi from "../../../referensi_belanja/Kdsfungsi";

const SubfungsiFilter = ({ inquiryState }) => {
  const { sfungsi, setSfungsi, fungsi } = inquiryState;
  return (
    <div className="border p-4 rounded-md">
      <h6 className="font-semibold mb-3">Sub-Function Filter</h6>
      <Kdsfungsi
        value={sfungsi}
        onChange={(e) => setSfungsi(e.target.value)}
        kdfungsi={fungsi}
        className="w-full p-2 border rounded"
      />
    </div>
  );
};

export default SubfungsiFilter;
