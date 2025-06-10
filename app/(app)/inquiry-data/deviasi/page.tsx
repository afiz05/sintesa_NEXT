import React from "react";
import { Deviasi } from "@/components/inquiry-data/deviasi";

// Simulate slow loading to test loading component
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const DeviasiPage = async () => {
  // Add 2 second delay to see loading animation
  await delay(2000);

  return <Deviasi />;
};

export default DeviasiPage;
