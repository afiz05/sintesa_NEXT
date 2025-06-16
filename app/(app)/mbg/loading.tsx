"use client";

import React from "react";
import { useTheme } from "next-themes";
import { Card, CardBody, CardHeader, Skeleton } from "@heroui/react";

export default function DashboardLoading({ key }: { key?: string }) {
  const { theme } = useTheme();

  // Theme-aware class function
  const getCardClasses = () => {
    const isDark = theme === "dark";
    return isDark
      ? "bg-gradient-to-br from-slate-800 to-slate-700"
      : "bg-gradient-to-br from-slate-100 to-slate-200";
  };

  const cardClasses = getCardClasses();
  return (
    <>
      <div className="h-full lg:px-6 pt-4">
        {/* Header Section Skeleton */}
        <div className="flex flex-col gap-2 pt-2 px-4 lg:px-0 max-w-[90rem] mx-auto w-full">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
            <div>
              {/* <Skeleton className="h-8 md:h-10 w-80 rounded-lg" /> */}
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              {key === "get-kddept" && (
                <Skeleton className="w-full sm:w-44 lg:w-52 h-10 rounded-lg" />
              )}
              {key === "get-kanwil" && (
                <Skeleton className="w-full sm:w-44 lg:w-52 h-10 rounded-lg" />
              )}
            </div>
          </div>
          {/* Quick Stats Cards Skeleton */}
          {key === "get-dipa" && (
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
          )}{" "}
          {key === "belanja-terbesar" && (
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
          )}
          {key === "performa-terbesar" && (
            <Card
              className={`border-none shadow-sm ${cardClasses} lg:col-span-6 xl:col-span-3`}
            >
              <CardHeader className="pb-2 px-4 md:px-6">
                <div className="flex justify-between items-center w-full">
                  <Skeleton className="h-4 w-32 rounded" />
                  <Skeleton className="h-3 w-16 rounded" />
                </div>
                LOADING
              </CardHeader>
              <CardBody className="pt-0 px-4 md:px-6">
                <div className="space-y-4">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-0.5 md:p-1 rounded-lg"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="mb-2">
                          <Skeleton className="h-3 w-24 rounded" />
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="relative flex-1">
                            <Skeleton className="h-5 w-full rounded-full" />
                          </div>
                          <Skeleton className="h-6 w-12 rounded-full" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
