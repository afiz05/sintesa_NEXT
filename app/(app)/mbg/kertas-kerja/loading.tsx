"use client";
import { Card, CardBody, Skeleton } from "@heroui/react";

export default function KertasKerjaLoading() {
  return (
    <div className="my-3 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <Skeleton className="h-9 w-64 rounded-lg" />
          <Skeleton className="h-4 w-96 rounded-lg" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-48 rounded-lg" />
        </div>
      </div>{" "}
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index}>
            <CardBody className="p-4">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <div className="space-y-1">
                  <Skeleton className="h-3 w-16 rounded" />
                  <Skeleton className="h-6 w-8 rounded" />
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
      {/* Filters and Search */}
      <Card>
        <CardBody className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-48 rounded-lg" />
          </div>
        </CardBody>
      </Card>
      {/* Kertas Kerja List */}
      <div className="grid grid-cols-1 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardBody className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3">
                    <Skeleton className="h-5 w-5 rounded mt-1" />
                    <div className="flex-1">
                      <Skeleton className="h-6 w-3/4 rounded-lg mb-2" />
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Skeleton className="h-3 w-3 rounded" />
                          <Skeleton className="h-3 w-24 rounded" />
                        </div>
                        <Skeleton className="h-3 w-1 rounded" />
                        <Skeleton className="h-3 w-32 rounded" />
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-1">
                          <Skeleton className="h-3 w-16 rounded" />
                          <Skeleton className="h-3 w-10 rounded" />
                        </div>
                        <Skeleton className="h-2 w-full rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-8 w-20 rounded-lg" />
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
