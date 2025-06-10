import React from "react";
import Chart, { Props } from "react-apexcharts";

const state: Props["series"] = [
  {
    name: "Target APBN",
    data: [31, 40, 28, 51, 42, 109, 100],
  },
  {
    name: "Realisasi APBN",
    data: [11, 32, 45, 32, 34, 52, 41],
  },
];

const options: Props["options"] = {
  chart: {
    type: "area",
    animations: {
      speed: 300,
    },
    sparkline: {
      enabled: false,
    },
    brush: {
      enabled: false,
    },
    id: "basic-bar",
    foreColor: "hsl(var(--nextui-default-800))",
    stacked: true,
    toolbar: {
      show: false,
    },
    parentHeightOffset: 0,
  },
  legend: {
    show: true,
    position: "top",
    horizontalAlign: "left",
    fontSize: "11px",
    labels: {
      colors: "hsl(var(--nextui-default-800))",
    },
    markers: {
      size: 6,
    },
    offsetY: 0,
    height: 25,
  },

  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    labels: {
      // show: false,
      style: {
        colors: "hsl(var(--nextui-default-800))",
      },
    },
    axisBorder: {
      color: "hsl(var(--nextui-nextui-default-200))",
    },
    axisTicks: {
      color: "hsl(var(--nextui-nextui-default-200))",
    },
  },
  yaxis: {
    labels: {
      style: {
        // hsl(var(--nextui-content1-foreground))
        colors: "hsl(var(--nextui-default-800))",
      },
    },
  },
  tooltip: {
    enabled: false,
  },
  grid: {
    show: true,
    borderColor: "hsl(var(--nextui-default-200))",
    strokeDashArray: 0,
    position: "back",
  },
  stroke: {
    curve: "smooth",
    fill: {
      colors: ["red"],
    },
  },
  // @ts-ignore
  markers: false,
};

export const Steam = () => {
  return (
    <div className="w-full h-full">
      <div className="h-full flex flex-col">
        <Chart
          options={options}
          series={state}
          type="area"
          height="100%"
          width="100%"
        />
      </div>
    </div>
  );
};
