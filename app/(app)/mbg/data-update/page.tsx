import React from "react";
import { DataMbg } from "@/components/mbg";

// Simulate slow loading to test loading component
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const DataMbgPage = async () => {
  // Add 2 second delay to see loading animation
  await delay(2000);

  return <DataMbg />;
};

export default DataMbgPage;
