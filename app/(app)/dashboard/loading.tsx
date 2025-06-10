"use client";

import React from "react";
import { Card, CardBody, CardHeader, Skeleton } from "@heroui/react";

export default function DashboardLoading() {
  return (
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

      {/* Main Content Grid Skeleton */}
      <div className="flex flex-col gap-6 pt-6 px-4 lg:px-0 max-w-[90rem] mx-auto w-full">
        {/* Three Card Row Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-12 gap-6">
          {/* Overall Summary Skeleton */}
          <Card className="border-none shadow-sm bg-gradient-to-br from-primary-50 to-secondary-50 lg:col-span-6 xl:col-span-2">
            <CardBody className="p-4 md:p-6">
              <div className="text-center space-y-3 md:space-y-4">
                <Skeleton className="mx-auto w-16 h-16 md:w-20 md:h-20 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-6 md:h-8 w-16 mx-auto rounded" />
                  <Skeleton className="h-3 md:h-4 w-32 mx-auto rounded" />
                </div>
                <Skeleton className="h-2 w-full rounded-full" />
                <div className="grid grid-cols-2 gap-2 md:gap-4 pt-2">
                  <div className="text-center space-y-1">
                    <Skeleton className="h-3 w-12 mx-auto rounded" />
                    <Skeleton className="h-4 w-8 mx-auto rounded" />
                  </div>
                  <div className="text-center space-y-1">
                    <Skeleton className="h-3 w-16 mx-auto rounded" />
                    <Skeleton className="h-4 w-12 mx-auto rounded" />
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Ministry Performance Skeleton */}
          <Card className="border-none shadow-sm bg-gradient-to-br from-default-50 to-default-100 lg:col-span-6 xl:col-span-4">
            <CardHeader className="pb-3 md:pb-4 px-4 md:px-6">
              <div className="flex justify-between items-center w-full">
                <Skeleton className="h-5 md:h-6 w-40 rounded" />
                <Skeleton className="h-4 w-20 rounded" />
              </div>
            </CardHeader>
            <CardBody className="pt-0 px-4 md:px-6">
              <div className="space-y-2 md:space-y-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="p-2 md:p-3 bg-default-50 rounded-lg space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-4 w-40 rounded" />
                      <Skeleton className="h-6 w-12 rounded-full" />
                    </div>
                    <Skeleton className="h-3 w-32 rounded" />
                    <Skeleton className="h-2 w-full rounded-full" />
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Chart Skeleton */}
          <Card className="border-none shadow-sm bg-gradient-to-br from-default-50 to-default-100 lg:col-span-12 xl:col-span-6">
            <CardHeader className="pb-2 px-4 md:px-6">
              <div className="flex flex-col gap-2 w-full">
                <Skeleton className="h-5 md:h-6 w-48 rounded" />
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <Skeleton className="h-3 md:h-4 w-40 rounded" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
              </div>
            </CardHeader>
            <CardBody className="pt-0 px-2 pb-2">
              <div className="h-[200px] md:h-[280px] w-full flex items-center justify-center">
                <Skeleton className="h-full w-full rounded-lg" />
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Bottom Row Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities Skeleton */}
          <Card className="border-none shadow-sm bg-gradient-to-br from-default-50 to-default-100">
            <CardHeader className="pb-3 md:pb-4 px-4 md:px-6">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded" />
                <Skeleton className="h-5 md:h-6 w-32 rounded" />
              </div>
            </CardHeader>
            <CardBody className="pt-0 px-4 md:px-6">
              <div className="space-y-3 md:space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex gap-3">
                    <Skeleton className="h-4 w-4 rounded flex-shrink-0 mt-1" />
                    <div className="flex-1 min-w-0 space-y-2">
                      <Skeleton className="h-4 w-48 rounded" />
                      <Skeleton className="h-3 w-24 rounded" />
                      <div className="flex justify-between items-center">
                        <Skeleton className="h-3 w-20 rounded" />
                        <Skeleton className="h-3 w-16 rounded" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="my-4">
                <Skeleton className="h-px w-full rounded" />
              </div>
              <Skeleton className="h-8 w-full rounded-lg" />
            </CardBody>
          </Card>

          {/* Quick Actions Skeleton */}
          <Card className="border-none shadow-sm bg-gradient-to-br from-default-50 to-default-100">
            <CardHeader className="pb-3 md:pb-4 px-4 md:px-6">
              <Skeleton className="h-5 md:h-6 w-24 rounded" />
            </CardHeader>
            <CardBody className="pt-0 space-y-3 px-4 md:px-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="h-8 w-full rounded-lg" />
              ))}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
