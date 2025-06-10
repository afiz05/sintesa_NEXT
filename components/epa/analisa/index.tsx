"use client";
import React from "react";
import { Card, CardBody, CardHeader } from "@heroui/react";
import {
  FileText,
  TrendingUp,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
} from "lucide-react";

export const AnalisaEpa = () => {
  return (
    <div className="my-3 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">EPA Analisa</h1>
          <p className="text-default-500 mt-1">
            Analisis mendalam dan insights kinerja EPA
          </p>
        </div>
        <div className="flex gap-2">
          <Calendar className="text-default-400" size={20} />
          <span className="text-sm text-default-500">
            Analysis date: {new Date().toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Analysis Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20">
          <CardBody className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-500 rounded-lg">
                <FileText className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm text-default-500">Reports Generated</p>
                <p className="text-2xl font-bold">47</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20">
          <CardBody className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-teal-500 rounded-lg">
                <Activity className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm text-default-500">Analysis Score</p>
                <p className="text-2xl font-bold">8.7</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-900/20 dark:to-violet-800/20">
          <CardBody className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-violet-500 rounded-lg">
                <TrendingUp className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm text-default-500">Improvement</p>
                <p className="text-2xl font-bold">+15%</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Analysis Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <BarChart3 className="text-primary" size={20} />
              <h3 className="text-lg font-semibold">Performance Analysis</h3>
            </div>
          </CardHeader>
          <CardBody>
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">📊</div>
                <p className="text-default-500">
                  Performance chart placeholder
                </p>
                <p className="text-sm text-default-400">
                  Detailed performance metrics
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <PieChart className="text-primary" size={20} />
              <h3 className="text-lg font-semibold">Distribution Analysis</h3>
            </div>
          </CardHeader>
          <CardBody>
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🥧</div>
                <p className="text-default-500">
                  Distribution chart placeholder
                </p>
                <p className="text-sm text-default-400">
                  Resource distribution patterns
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Detailed Analysis */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Detailed Analysis Report</h3>
        </CardHeader>
        <CardBody>
          <div className="space-y-6">
            {/* Key Findings */}
            <div>
              <h4 className="text-md font-semibold mb-3">Key Findings</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-success-50 dark:bg-success-900/20 rounded-lg">
                  <h5 className="font-medium text-success-700 dark:text-success-300 mb-2">
                    Positive Trends
                  </h5>
                  <ul className="text-sm space-y-1">
                    <li>• 15% increase in efficiency</li>
                    <li>• Improved response times</li>
                    <li>• Better resource utilization</li>
                  </ul>
                </div>
                <div className="p-4 bg-warning-50 dark:bg-warning-900/20 rounded-lg">
                  <h5 className="font-medium text-warning-700 dark:text-warning-300 mb-2">
                    Areas for Improvement
                  </h5>
                  <ul className="text-sm space-y-1">
                    <li>• Communication gaps identified</li>
                    <li>• Process optimization needed</li>
                    <li>• Training requirements</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div>
              <h4 className="text-md font-semibold mb-3">Recommendations</h4>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-default-200">
                      <th className="text-left py-2 px-4">Priority</th>
                      <th className="text-left py-2 px-4">Recommendation</th>
                      <th className="text-left py-2 px-4">Impact</th>
                      <th className="text-left py-2 px-4">Timeline</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        priority: "High",
                        recommendation: "Implement automated workflows",
                        impact: "High",
                        timeline: "Q3 2025",
                      },
                      {
                        priority: "Medium",
                        recommendation: "Enhance staff training programs",
                        impact: "Medium",
                        timeline: "Q4 2025",
                      },
                      {
                        priority: "Low",
                        recommendation: "Update documentation standards",
                        impact: "Low",
                        timeline: "Q1 2026",
                      },
                    ].map((item, index) => (
                      <tr key={index} className="border-b border-default-100">
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              item.priority === "High"
                                ? "bg-red-100 text-red-800"
                                : item.priority === "Medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {item.priority}
                          </span>
                        </td>
                        <td className="py-3 px-4">{item.recommendation}</td>
                        <td className="py-3 px-4">{item.impact}</td>
                        <td className="py-3 px-4 text-default-500">
                          {item.timeline}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
