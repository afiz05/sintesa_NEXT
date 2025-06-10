"use client";
import React from "react";
import { Card, CardBody, CardHeader } from "@heroui/react";
import {
  BarChart3,
  TrendingUp,
  Calendar,
  Users,
  Target,
  PieChart,
} from "lucide-react";

export const SummaryEpa = () => {
  return (
    <div className="my-3 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">EPA Summary</h1>
          <p className="text-default-500 mt-1">
            Ringkasan dan evaluasi kinerja EPA secara komprehensif
          </p>
        </div>
        <div className="flex gap-2">
          <Calendar className="text-default-400" size={20} />
          <span className="text-sm text-default-500">
            Last updated: {new Date().toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
          <CardBody className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-500 rounded-lg">
                <BarChart3 className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm text-default-500">Total EPA</p>
                <p className="text-2xl font-bold">89</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20">
          <CardBody className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-500 rounded-lg">
                <TrendingUp className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm text-default-500">Growth Rate</p>
                <p className="text-2xl font-bold">12.5%</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
          <CardBody className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-500 rounded-lg">
                <Users className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm text-default-500">Active Users</p>
                <p className="text-2xl font-bold">456</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20">
          <CardBody className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-pink-500 rounded-lg">
                <Target className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm text-default-500">Target Achievement</p>
                <p className="text-2xl font-bold">87%</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <PieChart className="text-primary" size={20} />
              <h3 className="text-lg font-semibold">Performance Overview</h3>
            </div>
          </CardHeader>
          <CardBody>
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">📊</div>
                <p className="text-default-500">Chart placeholder</p>
                <p className="text-sm text-default-400">
                  Integrate with your preferred charting library
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <BarChart3 className="text-primary" size={20} />
              <h3 className="text-lg font-semibold">Trend Analysis</h3>
            </div>
          </CardHeader>
          <CardBody>
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">📈</div>
                <p className="text-default-500">Trend chart placeholder</p>
                <p className="text-sm text-default-400">
                  Monthly performance trends
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Summary Table */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Recent EPA Summary</h3>
        </CardHeader>
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-default-200">
                  <th className="text-left py-2 px-4">EPA Name</th>
                  <th className="text-left py-2 px-4">Status</th>
                  <th className="text-left py-2 px-4">Progress</th>
                  <th className="text-left py-2 px-4">Last Update</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    name: "EPA Program A",
                    status: "Active",
                    progress: "85%",
                    date: "2025-06-10",
                  },
                  {
                    name: "EPA Program B",
                    status: "In Progress",
                    progress: "67%",
                    date: "2025-06-09",
                  },
                  {
                    name: "EPA Program C",
                    status: "Completed",
                    progress: "100%",
                    date: "2025-06-08",
                  },
                  {
                    name: "EPA Program D",
                    status: "Pending",
                    progress: "23%",
                    date: "2025-06-07",
                  },
                ].map((item, index) => (
                  <tr key={index} className="border-b border-default-100">
                    <td className="py-3 px-4 font-medium">{item.name}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          item.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : item.status === "In Progress"
                            ? "bg-blue-100 text-blue-800"
                            : item.status === "Completed"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">{item.progress}</td>
                    <td className="py-3 px-4 text-default-500">{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
