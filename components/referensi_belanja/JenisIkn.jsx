import React from "react";
import data from "../../data/KdIkn.json";

const JenisIkn = (props) => {
  return (
    <>
      <select
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        className="form-select form-select-sm text-select  "
        aria-label=".form-select-sm"
      >
        <option value="00">Semua Belanja dan IKN</option>
        {data.map((ikn, index) => (
          <option key={index} value={ikn.kdikn}>
            {ikn.nmikn}
          </option>
        ))}
      </select>
    </>
  );
};

export default JenisIkn;
