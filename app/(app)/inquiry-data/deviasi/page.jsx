"use client";
import React from "react";
import InquiryModDeviasi from "../../../../components/inquiry-deviasi/formInquiryDeviasi";

// Simulate slow loading to test loading component
// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const InquiryDeviasi = () => {
  // Add 2 second delay to see loading animation
  // await delay(2000);

  return <InquiryModDeviasi />;
};

export default InquiryDeviasi;
