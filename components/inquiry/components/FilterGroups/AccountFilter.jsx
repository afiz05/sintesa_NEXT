"use client";
import React from "react";
import { Radio } from "@heroui/react";
import Kdakun from "../../../referensi_belanja/Kdakun";

const AccountFilter = ({ inquiryState }) => {
  const { akun, setAkun, akunradio, setAkunradio } = inquiryState;

  return (
    <div className="border p-4 rounded-md">
      <h6 className="font-semibold mb-3">Account Filter</h6>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Account</label>
        <Kdakun
          value={akun}
          onChange={(e) => setAkun(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="flex items-center">
          <Radio
            id="akun-radio-1"
            name="akun-display"
            checked={akunradio === "1"}
            onChange={() => setAkunradio("1")}
          />
          <label htmlFor="akun-radio-1" className="ml-2">
            Show Code & Description
          </label>
        </div>

        <div className="flex items-center">
          <Radio
            id="akun-radio-2"
            name="akun-display"
            checked={akunradio === "2"}
            onChange={() => setAkunradio("2")}
          />
          <label htmlFor="akun-radio-2" className="ml-2">
            Show Description Only
          </label>
        </div>
      </div>
    </div>
  );
};

export default AccountFilter;
