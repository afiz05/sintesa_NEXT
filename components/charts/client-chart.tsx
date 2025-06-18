"use client";

import Chart from "react-apexcharts";
import React from "react";

// This is a client-only wrapper for ApexCharts
export default function ClientChart(props: any) {
  return <Chart {...props} />;
}
