import React from "react";
import { Bansos } from "@/components/inquiry-data/bansos";

// Simulate slow loading to test loading component
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const BansosPage = async () => {
  // Add 2 second delay to see loading animation
  await delay(2000);

  return <Bansos />;
};

export default BansosPage;
