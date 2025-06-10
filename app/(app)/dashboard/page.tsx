import type { NextPage } from "next";
import { Content } from "@/components/home/content";

// Simulate slow loading to test loading component
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const Dashboard: NextPage = async () => {
  // Add 2 second delay to see loading animation
  await delay(2000);

  return <Content />;
};

export default Dashboard;
