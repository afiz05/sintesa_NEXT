export default function Loading() {
  return (
    <div className="h-full lg:px-6 pt-4">
      {/* Header Section Skeleton */}
      <div className="flex flex-col gap-2 pt-2 px-4 lg:px-0 max-w-[90rem] mx-auto w-full">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
          <div>
            <div className="h-8 md:h-10 w-80 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <div className="w-full sm:w-44 lg:w-52 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
            <div className="w-full sm:w-44 lg:w-52 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
          </div>
        </div>

        {/* Quick Stats Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mt-4 md:mt-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="border-none shadow-sm bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-lg"
            >
              <div className="p-3 md:p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-200 dark:bg-gray-600 rounded-xl flex-shrink-0 animate-pulse" />
                    <div className="min-w-0 flex-1 space-y-2">
                      <div className="h-3 w-20 bg-gray-200 dark:bg-gray-600 rounded animate-pulse" />
                      <div className="h-5 w-24 bg-gray-200 dark:bg-gray-600 rounded animate-pulse" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <div className="h-4 w-4 bg-gray-200 dark:bg-gray-600 rounded animate-pulse" />
                    <div className="h-3 w-8 bg-gray-200 dark:bg-gray-600 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Grid Skeleton */}
      <div className="flex flex-col gap-6 pt-6 px-4 lg:px-0 max-w-[90rem] mx-auto w-full">
        {/* Three Card Row Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-12 gap-6">
          {/* Overall Summary Skeleton */}
          <div className="border-none shadow-sm bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 lg:col-span-6 xl:col-span-2 rounded-lg">
            <div className="p-4 md:p-6">
              <div className="text-center space-y-3 md:space-y-4">
                <div className="mx-auto w-16 h-16 md:w-20 md:h-20 bg-gray-200 dark:bg-gray-600 rounded-full animate-pulse" />
                <div className="space-y-2">
                  <div className="h-6 md:h-8 w-16 mx-auto bg-gray-200 dark:bg-gray-600 rounded animate-pulse" />
                  <div className="h-3 md:h-4 w-32 mx-auto bg-gray-200 dark:bg-gray-600 rounded animate-pulse" />
                </div>
                <div className="h-2 w-full bg-gray-200 dark:bg-gray-600 rounded-full animate-pulse" />
                <div className="grid grid-cols-2 gap-2 md:gap-4 pt-2">
                  <div className="text-center space-y-1">
                    <div className="h-3 w-12 mx-auto bg-gray-200 dark:bg-gray-600 rounded animate-pulse" />
                    <div className="h-4 w-8 mx-auto bg-gray-200 dark:bg-gray-600 rounded animate-pulse" />
                  </div>
                  <div className="text-center space-y-1">
                    <div className="h-3 w-16 mx-auto bg-gray-200 dark:bg-gray-600 rounded animate-pulse" />
                    <div className="h-4 w-12 mx-auto bg-gray-200 dark:bg-gray-600 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ministry Performance Skeleton */}
          <div className="border-none shadow-sm bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 lg:col-span-6 xl:col-span-4 rounded-lg">
            <div className="pb-3 md:pb-4 px-4 md:px-6 pt-4 md:pt-6">
              <div className="flex justify-between items-center w-full">
                <div className="h-5 md:h-6 w-40 bg-gray-200 dark:bg-gray-600 rounded animate-pulse" />
                <div className="h-4 w-20 bg-gray-200 dark:bg-gray-600 rounded animate-pulse" />
              </div>
            </div>
            <div className="pt-0 px-4 md:px-6 pb-4 md:pb-6">
              <div className="space-y-2 md:space-y-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="p-2 md:p-3 bg-slate-100 dark:bg-slate-600 rounded-lg space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <div className="h-4 w-40 bg-gray-200 dark:bg-gray-500 rounded animate-pulse" />
                      <div className="h-6 w-12 bg-gray-200 dark:bg-gray-500 rounded-full animate-pulse" />
                    </div>
                    <div className="h-3 w-32 bg-gray-200 dark:bg-gray-500 rounded animate-pulse" />
                    <div className="h-2 w-full bg-gray-200 dark:bg-gray-500 rounded-full animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chart Skeleton */}
          <div className="border-none shadow-sm bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 lg:col-span-12 xl:col-span-6 rounded-lg">
            <div className="pb-2 px-4 md:px-6 pt-4 md:pt-6">
              <div className="flex flex-col gap-2 w-full">
                <div className="h-5 md:h-6 w-48 bg-gray-200 dark:bg-gray-600 rounded animate-pulse" />
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <div className="h-3 md:h-4 w-40 bg-gray-200 dark:bg-gray-600 rounded animate-pulse" />
                  <div className="h-6 w-20 bg-gray-200 dark:bg-gray-600 rounded-full animate-pulse" />
                </div>
              </div>
            </div>
            <div className="pt-0 px-2 pb-2">
              <div className="h-[200px] md:h-[280px] w-full flex items-center justify-center">
                <div className="h-full w-full bg-gray-200 dark:bg-gray-600 rounded-lg animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities Skeleton */}
          <div className="border-none shadow-sm bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-lg">
            <div className="pb-3 md:pb-4 px-4 md:px-6 pt-4 md:pt-6">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-gray-200 dark:bg-gray-600 rounded animate-pulse" />
                <div className="h-5 md:h-6 w-32 bg-gray-200 dark:bg-gray-600 rounded animate-pulse" />
              </div>
            </div>
            <div className="pt-0 px-4 md:px-6 pb-4 md:pb-6">
              <div className="space-y-3 md:space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="h-4 w-4 bg-gray-200 dark:bg-gray-600 rounded flex-shrink-0 mt-1 animate-pulse" />
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="h-4 w-48 bg-gray-200 dark:bg-gray-600 rounded animate-pulse" />
                      <div className="h-3 w-24 bg-gray-200 dark:bg-gray-600 rounded animate-pulse" />
                      <div className="flex justify-between items-center">
                        <div className="h-3 w-20 bg-gray-200 dark:bg-gray-600 rounded animate-pulse" />
                        <div className="h-3 w-16 bg-gray-200 dark:bg-gray-600 rounded animate-pulse" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="my-4">
                <div className="h-px w-full bg-gray-200 dark:bg-gray-600 rounded animate-pulse" />
              </div>
              <div className="h-8 w-full bg-gray-200 dark:bg-gray-600 rounded-lg animate-pulse" />
            </div>
          </div>

          {/* Quick Actions Skeleton */}
          <div className="border-none shadow-sm bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-lg">
            <div className="pb-3 md:pb-4 px-4 md:px-6 pt-4 md:pt-6">
              <div className="h-5 md:h-6 w-24 bg-gray-200 dark:bg-gray-600 rounded animate-pulse" />
            </div>
            <div className="pt-0 space-y-3 px-4 md:px-6 pb-4 md:pb-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="h-8 w-full bg-gray-200 dark:bg-gray-600 rounded-lg animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
