import React from "react";
import Kdsuboutput from "../../../referensi_belanja/Kdsuboutput";

const SuboutputFilter = ({ inquiryState }) => {
  const { suboutput, setSuboutput, output } = inquiryState;
  return (
    <div className="border p-4 rounded-md">
      <h6 className="font-semibold mb-3">Sub-output Filter</h6>
      <Kdsuboutput
        value={suboutput}
        onChange={(e) => setSuboutput(e.target.value)}
        kdoutput={output}
        className="w-full p-2 border rounded"
      />
    </div>
  );
};

export default SuboutputFilter;
