"use client";
import React from "react";
import InquiryModUptup from "../../../../components/inquiry-uptup/formInquiryUptup";

// Simulate slow loading to test loading component
// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const InquiryUptup = () => {
  // Add 2 second delay to see loading animation
  // await delay(2000);

  return <InquiryModUptup />;
};

export default InquiryUptup;
