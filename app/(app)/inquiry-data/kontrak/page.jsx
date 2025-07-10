"use client";
import React from "react";
import InquiryModKontrak from "../../../../components/inquiry-kontrak/formInquiryKontrak";

// Simulate slow loading to test loading component
// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const InquiryKontrak = () => {
  // Add 2 second delay to see loading animation
  // await delay(2000);

  return <InquiryModKontrak />;
};

export default InquiryKontrak;
