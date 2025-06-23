import { ScrollkeBawah } from "@/components/home/scrollKeBawah";
import { CekToken } from "@/utils/cekToken";
import DashboardLoading from "./loading";

const Dashboard = async () => {
  return (
    <CekToken>
      <DashboardLoading />
      {/* <ScrollkeBawah /> */}
    </CekToken>
  );
};

export default Dashboard;
