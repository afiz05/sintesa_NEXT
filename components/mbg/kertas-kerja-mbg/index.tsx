"use client";
import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";
import {
  FileText,
  Search,
  Download,
  Upload,
  Calendar,
  Filter,
} from "lucide-react";

export const KertasKerjaMbg = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedStatus, setSelectedStatus] = React.useState("all");

  const kertasKerjaData = [
    {
      id: 1,
      title: "Kertas Kerja MBG Jakarta Pusat - Q1 2025",
      status: "completed",
      lastUpdated: "2025-06-05",
      author: "Tim MBG Jakarta Pusat",
      progress: 100,
    },
    {
      id: 2,
      title: "Kertas Kerja MBG Bandung - Q1 2025",
      status: "in-progress",
      lastUpdated: "2025-06-06",
      author: "Tim MBG Bandung",
      progress: 75,
    },
    {
      id: 3,
      title: "Kertas Kerja MBG Surabaya - Q1 2025",
      status: "draft",
      lastUpdated: "2025-06-04",
      author: "Tim MBG Surabaya",
      progress: 45,
    },
    {
      id: 4,
      title: "Kertas Kerja MBG Medan - Q1 2025",
      status: "review",
      lastUpdated: "2025-06-03",
      author: "Tim MBG Medan",
      progress: 90,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-100";
      case "in-progress":
        return "text-blue-600 bg-blue-100";
      case "review":
        return "text-orange-600 bg-orange-100";
      case "draft":
        return "text-gray-600 bg-gray-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Selesai";
      case "in-progress":
        return "Dalam Proses";
      case "review":
        return "Review";
      case "draft":
        return "Draft";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="my-3 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Kertas Kerja MBG</h1>
          <p className="text-default-500 mt-1">
            Kelola dan pantau kertas kerja MBG dari berbagai wilayah
          </p>
        </div>
        <div className="flex gap-2">
          <Button color="primary" startContent={<Upload size={16} />}>
            Upload Kertas Kerja
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
          <CardBody className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500 rounded-lg">
                <FileText className="text-white" size={20} />
              </div>
              <div>
                <p className="text-xs text-default-500">Selesai</p>
                <p className="text-xl font-bold">12</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
          <CardBody className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <FileText className="text-white" size={20} />
              </div>
              <div>
                <p className="text-xs text-default-500">Dalam Proses</p>
                <p className="text-xl font-bold">8</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
          <CardBody className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500 rounded-lg">
                <FileText className="text-white" size={20} />
              </div>
              <div>
                <p className="text-xs text-default-500">Review</p>
                <p className="text-xl font-bold">3</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20">
          <CardBody className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-500 rounded-lg">
                <FileText className="text-white" size={20} />
              </div>
              <div>
                <p className="text-xs text-default-500">Draft</p>
                <p className="text-xl font-bold">5</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardBody className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="Cari kertas kerja..."
              startContent={<Search size={16} />}
              value={searchQuery}
              onValueChange={setSearchQuery}
              className="flex-1"
            />
            <Select
              placeholder="Status"
              selectedKeys={[selectedStatus]}
              onSelectionChange={(keys) =>
                setSelectedStatus(Array.from(keys)[0] as string)
              }
              className="w-full sm:w-48"
              startContent={<Filter size={16} />}
            >
              <SelectItem key="all">Semua Status</SelectItem>
              <SelectItem key="completed">Selesai</SelectItem>
              <SelectItem key="in-progress">Dalam Proses</SelectItem>
              <SelectItem key="review">Review</SelectItem>
              <SelectItem key="draft">Draft</SelectItem>
            </Select>
          </div>
        </CardBody>
      </Card>

      {/* Kertas Kerja List */}
      <div className="grid grid-cols-1 gap-4">
        {kertasKerjaData.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardBody className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3">
                    <FileText className="text-primary mt-1" size={20} />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">
                        {item.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-default-600">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>
                            Update:{" "}
                            {new Date(item.lastUpdated).toLocaleDateString(
                              "id-ID"
                            )}
                          </span>
                        </div>
                        <span>•</span>
                        <span>Oleh: {item.author}</span>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-default-600">
                            Progress
                          </span>
                          <span className="text-sm font-medium">
                            {item.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-default-200 rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ width: `${item.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {getStatusText(item.status)}
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    startContent={<Download size={14} />}
                  >
                    Download
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};
