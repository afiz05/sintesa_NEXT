import React from "react";
import { Belanja } from "@/components/inquiry-data/belanja";

// Simulate slow loading to test loading component
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const BelanjaPage = async () => {
  // Add 2 second delay to see loading animation
  await delay(2000);

  return <Belanja />;
};

export default BelanjaPage;
