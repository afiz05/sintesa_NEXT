import React from "react";
import { UPTUP } from "@/components/inquiry-data/up-tup";

// Simulate slow loading to test loading component
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const UPTUPPage = async () => {
  // Add 2 second delay to see loading animation
  await delay(2000);

  return <UPTUP />;
};

export default UPTUPPage;
