"use client";

import React from "react";
import { Card, CardBody, CardHeader, Skeleton } from "@heroui/react";

export default function DashboardLoading() {
  return (
    <>
      <div className="h-full lg:px-6 pt-4">
        {/* Header Section Skeleton */}
        <div className="flex flex-col gap-2 pt-2 px-4 lg:px-0 max-w-[90rem] mx-auto w-full">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
            <div>
              <Skeleton className="h-8 md:h-10 w-80 rounded-lg" />
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Skeleton className="w-full sm:w-44 lg:w-52 h-10 rounded-lg" />
              <Skeleton className="w-full sm:w-44 lg:w-52 h-10 rounded-lg" />
            </div>
          </div>

          {/* Quick Stats Cards Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mt-4 md:mt-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <Card
                key={index}
                className="border-none shadow-sm bg-gradient-to-br from-default-50 to-default-100"
              >
                <CardBody className="p-3 md:p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                      <Skeleton className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex-shrink-0" />
                      <div className="min-w-0 flex-1 space-y-2">
                        <Skeleton className="h-3 w-20 rounded" />
                        <Skeleton className="h-5 w-24 rounded" />
                      </div>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Skeleton className="h-4 w-4 rounded" />
                      <Skeleton className="h-3 w-8 rounded" />
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
