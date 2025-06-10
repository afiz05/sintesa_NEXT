import React from "react";
import { Tematik } from "@/components/inquiry-data/tematik";

// Simulate slow loading to test loading component
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const TematikPage = async () => {
  // Add 2 second delay to see loading animation
  await delay(2000);

  return <Tematik />;
};

export default TematikPage;
