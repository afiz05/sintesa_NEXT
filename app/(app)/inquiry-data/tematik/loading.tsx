"use client";
import React from "react";
import { Card, CardBody, CardHeader, Skeleton } from "@heroui/react";

export default function TematikLoading() {
  return (
    <div className="my-3 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      {/* Header Section Skeleton */}
      <div className="flex justify-between items-center">
        <div>
          <Skeleton className="h-8 w-40 rounded-lg mb-2" />
          <Skeleton className="h-4 w-80 rounded" />
        </div>
      </div>

      {/* Stats Cards Skeleton */}
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
                  <Skeleton className="h-3 w-20 rounded" />
                  <Skeleton className="h-6 w-16 rounded" />
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Main Content Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Programs */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-40 rounded" />
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="border-l-4 border-default-200 pl-4 py-2"
                  >
                    <Skeleton className="h-5 w-48 rounded mb-2" />
                    <Skeleton className="h-4 w-64 rounded mb-2" />
                    <Skeleton className="h-2 w-full rounded-full mb-1" />
                    <Skeleton className="h-3 w-24 rounded" />
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-36 rounded" />
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Skeleton className="w-3 h-3 rounded-full mt-1" />
                    <div className="flex-1">
                      <Skeleton className="h-5 w-56 rounded mb-1" />
                      <Skeleton className="h-4 w-48 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Right Column - Status & Budget */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32 rounded" />
            </CardHeader>
            <CardBody>
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <Skeleton className="h-4 w-16 rounded" />
                    <Skeleton className="h-6 w-8 rounded-full" />
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-36 rounded" />
            </CardHeader>
            <CardBody>
              <div className="space-y-3">
                <div className="text-center">
                  <Skeleton className="h-8 w-24 rounded mx-auto mb-1" />
                  <Skeleton className="h-4 w-20 rounded mx-auto" />
                </div>
                <Skeleton className="h-3 w-full rounded-full" />
                <Skeleton className="h-4 w-24 rounded mx-auto" />
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
