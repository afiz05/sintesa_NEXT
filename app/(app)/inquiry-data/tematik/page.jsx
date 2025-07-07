"use client";
import React from "react";
import InquiryModTematik from "../../../../components/inquiry-tematik/formInquiryTematik";

// Simulate slow loading to test loading component
// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const InquiryTematik = () => {
  // Add 2 second delay to see loading animation
  // await delay(2000);

  return <InquiryModTematik />;
};

export default InquiryTematik;
