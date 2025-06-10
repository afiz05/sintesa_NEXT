import React from "react";
import { SummaryEpa } from "@/components/epa";

// Simulate slow loading to test loading component
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const SummaryEpaPage = async () => {
  // Add 2 second delay to see loading animation
  await delay(2000);

  return <SummaryEpa />;
};

export default SummaryEpaPage;
