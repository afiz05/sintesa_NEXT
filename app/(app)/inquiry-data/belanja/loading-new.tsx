"use client";

import React from "react";
import { Card, CardBody, CardHeader, Skeleton } from "@heroui/react";

export default function BelanjaLoading() {
  return (
    <div className="my-3 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      {/* Header Section Skeleton */}
      <div className="flex justify-between items-center">
        <div>
          <Skeleton className="h-8 w-32 rounded-lg mb-2" />
          <Skeleton className="h-4 w-72 rounded" />
        </div>
        <div className="flex gap-2 items-center">
          <Skeleton className="h-5 w-5 rounded" />
          <Skeleton className="h-4 w-40 rounded" />
        </div>
      </div>

      {/* Stats Cards Skeleton - matches gradient cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card
            key={i}
            className="bg-gradient-to-br from-default-50 to-default-100"
          >
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

      {/* Main Content Grid - 2 columns like Belanja */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-40 rounded" />
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-3 bg-default-50 rounded-lg"
                >
                  <Skeleton className="h-4 w-24 rounded" />
                  <Skeleton className="h-5 w-16 rounded" />
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32 rounded" />
          </CardHeader>
          <CardBody>
            <div className="text-center py-8">
              <Skeleton className="w-12 h-12 rounded mx-auto mb-4" />
              <Skeleton className="h-4 w-64 rounded mx-auto" />
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Recent Activity Section */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-36 rounded" />
        </CardHeader>
        <CardBody>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg">
                <Skeleton className="w-2 h-2 rounded-full" />
                <div className="flex-1 space-y-1">
                  <Skeleton className="h-4 w-48 rounded" />
                  <Skeleton className="h-3 w-32 rounded" />
                </div>
                <Skeleton className="h-4 w-16 rounded" />
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
