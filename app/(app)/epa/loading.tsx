"use client";

import React from "react";
import { Card, CardBody, CardHeader, Skeleton } from "@heroui/react";

export default function EPALoading() {
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

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="h-24">
            <CardBody className="p-6">
              <div className="flex items-center gap-3">
                <Skeleton className="w-12 h-12 rounded-lg" />
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-20 rounded" />
                  <Skeleton className="h-6 w-16 rounded" />
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Content Cards Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Skeleton className="w-5 h-5 rounded" />
                <Skeleton className="h-6 w-32 rounded" />
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-3/4 rounded" />
                <Skeleton className="h-32 w-full rounded-lg" />
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-20 rounded" />
                  <Skeleton className="h-8 w-24 rounded" />
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Large Content Skeleton */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-40 rounded" />
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex gap-4 items-center">
                <Skeleton className="w-16 h-16 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-4 w-2/3 rounded" />
                </div>
                <Skeleton className="w-20 h-8 rounded" />
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
