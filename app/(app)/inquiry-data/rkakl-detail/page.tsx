import React from "react";
import { RKAKLDetail } from "@/components/inquiry-data/rkakl-detail";

// Simulate slow loading to test loading component
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const RKAKLDetailPage = async () => {
  // Add 2 second delay to see loading animation
  await delay(2000);

  return <RKAKLDetail />;
};

export default RKAKLDetailPage;
