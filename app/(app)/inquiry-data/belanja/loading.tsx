"use client";

import React from "react";
import { Card, CardBody, CardHeader, Skeleton } from "@heroui/react";

export default function BelanjaLoading() {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900">
      <div className="my-3 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col">
        {/* Header Section Skeleton */}
        <div className="space-y-4 mb-4">
          {/* Header Card Skeleton */}
          <Card className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200 dark:border-orange-700/30 shadow-sm">
            <CardHeader className="py-2">
              <div className="flex items-center gap-3">
                <Skeleton className="w-8 h-8 rounded-xl" />
                <Skeleton className="h-6 w-48 rounded" />
              </div>
            </CardHeader>
          </Card>

          {/* Query Selection Card Skeleton */}
          <Card className="bg-white dark:bg-gray-900 border-0 shadow-none">
            <CardBody className="px-4 py-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Tahun Dropdown */}
                <div>
                  <Skeleton className="h-4 w-16 rounded mb-2" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>

                {/* Jenis Laporan Dropdown */}
                <div>
                  <Skeleton className="h-4 w-24 rounded mb-2" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>

                {/* Pembulatan Dropdown */}
                <div>
                  <Skeleton className="h-4 w-20 rounded mb-2" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>{" "}
        {/* Radio Switches Section Skeleton */}
        <div className="space-y-4 mb-6">
          {/* Header Card */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-700/30 shadow-sm">
            <CardHeader className="py-2">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-8 h-8 rounded-xl" />
                  <Skeleton className="h-6 w-48 rounded" />
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-8 w-24 rounded-lg" />
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Filters Grid Card */}
          <Card className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10 border border-blue-100 dark:border-blue-800/20 shadow-sm">
            <CardBody className="p-6">
              <div className="grid grid-cols-2 xl:grid-cols-5 gap-4">
                {[...Array(5)].map((_, colIndex) => (
                  <div key={colIndex} className="space-y-1">
                    {[...Array(6)].map((_, rowIndex) => (
                      <div
                        key={rowIndex}
                        className="flex items-center gap-3 px-2 py-1 rounded-xl bg-gray-100/80 dark:bg-gray-700/60"
                      >
                        <Skeleton className="h-4 w-4 rounded-full" />
                        <Skeleton className="h-4 w-20 rounded flex-1" />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>{" "}
        {/* Form Summary Section Skeleton */}
        <div className="space-y-4 mb-6">
          {/* Header Card */}
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700/30 shadow-sm">
            <CardHeader className="py-2">
              <div className="flex items-center gap-3">
                <Skeleton className="w-8 h-8 rounded-xl" />
                <Skeleton className="h-6 w-56 rounded" />
              </div>
            </CardHeader>
          </Card>

          {/* Query Parameters Card */}
          <Card className="bg-gradient-to-r from-green-50/50 to-emerald-50/50 dark:from-green-900/10 dark:to-emerald-900/10 border border-green-100 dark:border-green-800/20 shadow-sm">
            <CardBody className="p-6">
              <div className="space-y-6">
                {/* Query Parameters Section Header */}
                <div className="space-y-4">
                  <Skeleton className="h-5 w-40 rounded border-b border-gray-200 dark:border-gray-700 pb-2" />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200 dark:border-gray-700 justify-center">
                  <Skeleton className="h-10 w-44 rounded-lg" />
                  <Skeleton className="h-10 w-44 rounded-lg" />
                  <Skeleton className="h-10 w-44 rounded-lg" />
                  <Skeleton className="h-10 w-44 rounded-lg" />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
