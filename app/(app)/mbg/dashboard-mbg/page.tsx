import React from "react";
import { DashboardMbg } from "@/components/mbg";
import { GoogleMapsProvider } from "@/contexts/GoogleMapsContext";

// Simulate slow loading to test loading component
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const DashboardMbgPage = async () => {
  // Add 2 second delay to see loading animation
  await delay(2000);

  return (
    <GoogleMapsProvider>
      <DashboardMbg />
    </GoogleMapsProvider>
  );
};

export default DashboardMbgPage;
