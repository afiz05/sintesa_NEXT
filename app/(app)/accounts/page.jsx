import React from "react";
import { Accounts } from "@/components/accounts";
import { CekToken } from "@/utils/cekToken";

const accounts = () => {
  return (
    <CekToken>
      <Accounts />
    </CekToken>
  );
};

export default accounts;
