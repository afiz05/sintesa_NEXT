import React from "react";
import { Kontrak } from "@/components/inquiry-data/kontrak";

// Simulate slow loading to test loading component
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const KontrakPage = async () => {
  // Add 2 second delay to see loading animation
  await delay(2000);

  return <Kontrak />;
};

export default KontrakPage;
