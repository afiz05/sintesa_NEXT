import React from "react";
import Kdsubkomponen from "../../../referensi_belanja/Kdsubkomponen";

const SubkomponenFilter = ({ inquiryState }) => {
  const { subkomponen, setSubkomponen, komponen } = inquiryState;
  return (
    <div className="border p-4 rounded-md">
      <h6 className="font-semibold mb-3">Subcomponent Filter</h6>
      <Kdsubkomponen
        value={subkomponen}
        onChange={(e) => setSubkomponen(e.target.value)}
        kdkomponen={komponen}
        className="w-full p-2 border rounded"
      />
    </div>
  );
};

export default SubkomponenFilter;
