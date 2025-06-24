import React from "react";

const RegisterFilter = ({ inquiryState }) => {
  const { register, setRegister } = inquiryState;
  return (
    <div className="border p-4 rounded-md">
      <h6 className="font-semibold mb-3">Register Filter</h6>
      <input
        type="text"
        value={register}
        onChange={(e) => setRegister(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Enter register value"
      />
    </div>
  );
};

export default RegisterFilter;
