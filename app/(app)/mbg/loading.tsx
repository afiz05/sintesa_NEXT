"use client";

import React from "react";
import { Card, CardBody, CardHeader, Skeleton } from "@heroui/react";

export default function MBGLoading() {
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
        {Array.from({ length: 4 }).map((_, index) => (
          <Card
            key={index}
            className="bg-gradient-to-br from-default-50 to-default-100"
          >
            <CardBody className="p-6">
              <div className="flex items-center gap-3">
                <Skeleton className="w-12 h-12 rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-3 w-16 rounded" />
                  <Skeleton className="h-6 w-12 rounded" />
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Chart Section Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-4">
            <div className="flex justify-between items-center w-full">
              <Skeleton className="h-5 w-40 rounded" />
              <Skeleton className="h-8 w-24 rounded-lg" />
            </div>
          </CardHeader>
          <CardBody>
            <Skeleton className="h-[300px] w-full rounded-lg" />
          </CardBody>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <div className="flex justify-between items-center w-full">
              <Skeleton className="h-5 w-36 rounded" />
              <Skeleton className="h-8 w-20 rounded-lg" />
            </div>
          </CardHeader>
          <CardBody>
            <Skeleton className="h-[300px] w-full rounded-lg" />
          </CardBody>
        </Card>
      </div>

      {/* Performance Table Skeleton */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center w-full">
            <Skeleton className="h-5 w-44 rounded" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-20 rounded-lg" />
              <Skeleton className="h-8 w-24 rounded-lg" />
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div className="space-y-3">
            {/* Table Header */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-3 bg-default-50 rounded-lg">
              <Skeleton className="h-4 w-24 rounded" />
              <Skeleton className="h-4 w-20 rounded" />
              <Skeleton className="h-4 w-16 rounded" />
              <Skeleton className="h-4 w-18 rounded" />
              <Skeleton className="h-4 w-14 rounded" />
            </div>

            {/* Table Rows */}
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-5 gap-4 p-3 border-b border-divider"
              >
                <Skeleton className="h-4 w-32 rounded" />
                <Skeleton className="h-4 w-24 rounded" />
                <Skeleton className="h-4 w-20 rounded" />
                <Skeleton className="h-4 w-16 rounded" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Bottom Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card className="xl:col-span-2">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-center w-full">
              <Skeleton className="h-5 w-48 rounded" />
              <Skeleton className="h-8 w-28 rounded-lg" />
            </div>
          </CardHeader>
          <CardBody>
            <Skeleton className="h-[250px] w-full rounded-lg" />
          </CardBody>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <Skeleton className="h-5 w-36 rounded" />
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Skeleton className="w-3 h-3 rounded-full" />
                  <div className="flex-1 space-y-1">
                    <Skeleton className="h-3 w-24 rounded" />
                    <Skeleton className="h-2 w-full rounded-full" />
                  </div>
                  <Skeleton className="h-4 w-8 rounded" />
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
