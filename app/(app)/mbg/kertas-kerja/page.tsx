import React from "react";
import { KertasKerjaMbg } from "@/components/mbg";

// Simulate slow loading to test loading component
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const KertasKerjaMbgPage = async () => {
  // Add 2 second delay to see loading animation
  await delay(2000);

  return <KertasKerjaMbg />;
};

export default KertasKerjaMbgPage;
