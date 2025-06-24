import React from "react";

const AkumulatifFilter = ({ inquiryState }) => {
  const { akumulatif, setAkumulatif } = inquiryState;
  return (
    <div className="border p-4 rounded-md">
      <h6 className="font-semibold mb-3">Akumulatif Filter</h6>
      <label className="flex items-center">
        <input
          type="checkbox"
          checked={akumulatif}
          onChange={(e) => setAkumulatif(e.target.checked)}
        />
        <span className="ml-2">Enable Akumulatif</span>
      </label>
    </div>
  );
};

export default AkumulatifFilter;
