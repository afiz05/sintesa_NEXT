import type { NextPage } from "next";
import { ScrollkeBawah } from "@/components/home/scrollKeBawah";

import { CekToken } from "@/utils/cekToken";

import DashboardLoading from "./loading";

const Dashboard: NextPage = async () => {
  return (
    <CekToken>
      <DashboardLoading />
      {/* <ScrollkeBawah /> */}
    </CekToken>
  );
};

export default Dashboard;
