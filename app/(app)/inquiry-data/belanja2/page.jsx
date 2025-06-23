import React from "react";
import Inquiry from "../../../../components/inquiry/formInquiry";

// Simulate slow loading to test loading component
// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const InquiryBelanja = async () => {
  // Add 2 second delay to see loading animation
  // await delay(2000);

  return <Inquiry />;
};

export default InquiryBelanja;
