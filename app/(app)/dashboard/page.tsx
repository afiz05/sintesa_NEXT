import type { NextPage } from "next";
import { getDipa } from "@/app/lib/dashboard/getDipa";
import { ScrollkeBawah } from "@/components/home/scrollKeBawah";

import ContentHeader from "./ContentHeader";
import { getKanwil } from "@/app/lib/referensi/getKanwil";
import { Kanwil } from "@/components/home/kanwil";

const Dashboard: NextPage = async () => {
  const dataDipa = await getDipa();
  const dataKanwil = await getKanwil();

  return (
    <>
      <ScrollkeBawah />
      <ContentHeader dataDipa={dataDipa} dataKanwil={dataKanwil} />
      {/* <Kanwil dataKanwil={dataKanwil} /> */}
    </>
  );
};

export default Dashboard;
