"use client";

import React from "react";
import { Card, CardBody, CardHeader, Skeleton } from "@heroui/react";

export default function AnalisaLoading() {
  return (
    <div className="my-3 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      {/* Header Section Skeleton */}
      <div className="flex justify-between items-center">
        <div>
          <Skeleton className="h-8 w-48 rounded-lg mb-2" />
          <Skeleton className="h-4 w-80 rounded" />
        </div>
        <div className="flex gap-2 items-center">
          <Skeleton className="h-5 w-5 rounded" />
          <Skeleton className="h-4 w-32 rounded" />
        </div>
      </div>

      {/* Analysis Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardBody className="p-6">
              <div className="flex items-center gap-3">
                <Skeleton className="w-12 h-12 rounded-lg" />
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-24 rounded" />
                  <Skeleton className="h-6 w-16 rounded" />
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Analysis Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {[...Array(2)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Skeleton className="w-5 h-5 rounded" />
                <Skeleton className="h-6 w-36 rounded" />
              </div>
            </CardHeader>
            <CardBody>
              <Skeleton className="h-64 w-full rounded-lg" />
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Detailed Analysis Skeleton */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48 rounded" />
        </CardHeader>
        <CardBody>
          <div className="space-y-6">
            {/* Key Findings Skeleton */}
            <div>
              <Skeleton className="h-5 w-32 rounded mb-3" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="p-4 rounded-lg bg-default-100">
                    <Skeleton className="h-5 w-28 rounded mb-2" />
                    <div className="space-y-1">
                      {[...Array(3)].map((_, j) => (
                        <Skeleton key={j} className="h-4 w-full rounded" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations Skeleton */}
            <div>
              <Skeleton className="h-5 w-36 rounded mb-3" />
              <div className="space-y-3">
                <div className="flex gap-4">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-4 flex-1 rounded" />
                  ))}
                </div>
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex gap-4">
                    {[...Array(4)].map((_, j) => (
                      <Skeleton key={j} className="h-8 flex-1 rounded" />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
