"use client";

import React from "react";
import { Card, CardBody, CardHeader, Skeleton } from "@heroui/react";

export default function KontrakLoading() {
  return (
    <div className="my-3 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      {/* Header Section with Icon */}
      <div className="flex items-center gap-3 mb-6">
        <Skeleton className="w-6 h-6 rounded" />
        <Skeleton className="h-8 w-24 rounded" />
      </div>

      {/* Stats Cards with colored gradient backgrounds */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-r from-blue-200 to-blue-300">
          <CardBody>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Skeleton className="h-3 w-24 rounded" />
                <Skeleton className="h-6 w-12 rounded" />
              </div>
              <Skeleton className="w-8 h-8 rounded" />
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-r from-green-200 to-green-300">
          <CardBody>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Skeleton className="h-3 w-24 rounded" />
                <Skeleton className="h-6 w-12 rounded" />
              </div>
              <Skeleton className="w-8 h-8 rounded" />
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-r from-purple-200 to-purple-300">
          <CardBody>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Skeleton className="h-3 w-16 rounded" />
                <Skeleton className="h-6 w-12 rounded" />
              </div>
              <Skeleton className="w-8 h-8 rounded" />
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-r from-orange-200 to-orange-300">
          <CardBody>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Skeleton className="h-3 w-20 rounded" />
                <Skeleton className="h-6 w-16 rounded" />
              </div>
              <Skeleton className="w-8 h-8 rounded" />
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Main Data Card */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32 rounded" />
        </CardHeader>
        <CardBody>
          <div className="text-center py-12">
            <Skeleton className="w-16 h-16 rounded mx-auto mb-4" />
            <Skeleton className="h-5 w-32 rounded mx-auto mb-2" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-80 rounded mx-auto" />
              <Skeleton className="h-4 w-72 rounded mx-auto" />
              <Skeleton className="h-4 w-64 rounded mx-auto" />
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
