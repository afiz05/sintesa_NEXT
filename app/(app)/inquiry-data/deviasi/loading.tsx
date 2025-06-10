"use client";

import React from "react";
import { Card, CardBody, CardHeader, Skeleton } from "@heroui/react";

export default function DeviasiLoading() {
  return (
    <div className="container mx-auto p-6">
      {/* Header Section with Icon and Description */}
      <div className="flex items-center gap-3 mb-6">
        <Skeleton className="h-8 w-8 rounded" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-24 rounded" />
          <Skeleton className="h-4 w-64 rounded" />
        </div>
      </div>

      {/* Main Content Grid - 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded" />
                <Skeleton className="h-5 w-32 rounded" />
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-3/4 rounded" />
              </div>
            </CardBody>
          </Card>
        ))}{" "}
      </div>
    </div>
  );
}
