"use client";
import React from "react";
import InquiryMod from "../../../../components/inquiry/formInquiryMod";

// Simulate slow loading to test loading component
// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const InquiryBelanja = () => {
  // Add 2 second delay to see loading animation
  // await delay(2000);

  return <InquiryMod />;
};

export default InquiryBelanja;
