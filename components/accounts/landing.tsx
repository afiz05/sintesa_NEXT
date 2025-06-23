"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import React, {
  useContext,
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
  useMemo,
} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import MyContext from "@/utils/Context";
import Encrypt from "@/utils/Encrypt";
import { useToast } from "../context/ToastContext";

// Enhanced loading spinner component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg mx-4 my-2 border border-blue-100 dark:border-blue-800">
    <div className="flex items-center space-x-4">
      <div className="relative">
        <div className="w-8 h-8 border-4 border-blue-200 dark:border-blue-700 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-8 h-8 border-4 border-transparent border-r-indigo-600 dark:border-r-indigo-400 rounded-full animate-spin animate-reverse"></div>
      </div>
      <div className="flex space-x-1">
        <div className="w-2.5 h-2.5 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce shadow-sm"></div>
        <div
          className="w-2.5 h-2.5 bg-indigo-600 dark:bg-indigo-400 rounded-full animate-bounce shadow-sm"
          style={{ animationDelay: "0.1s" }}
        ></div>
        <div
          className="w-2.5 h-2.5 bg-purple-600 dark:bg-purple-400 rounded-full animate-bounce shadow-sm"
          style={{ animationDelay: "0.2s" }}
        ></div>
      </div>
      <div className="text-center">
        <span className="text-blue-700 dark:text-blue-300 font-semibold text-sm block">
          Loading data berikutnya...
        </span>
        <span className="text-blue-500 dark:text-blue-400 text-xs">
          Mohon tunggu sebentar
        </span>
      </div>
    </div>
  </div>
);

const LIMIT = 50;

const User = forwardRef<{ reloadData: () => void }, any>((props, ref) => {
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const { showToast } = useToast();
  const context = useContext(MyContext);

  const { token, axiosJWT } = context!;

  const fetchData = async (pageNum: number) => {
    const offset = (pageNum - 1) * LIMIT;

    const query = `
      SELECT id,username,name,email,role,kdkanwil,kdkppn,kdlokasi,active,status_update FROM v3_next.users order by role desc LIMIT ${LIMIT} OFFSET ${offset} 
    `;

    const encryptedQuery = Encrypt(query.trim());

    try {
      const res = await axiosJWT.post(
        process.env.NEXT_PUBLIC_GET_USERS ?? "",
        { query: encryptedQuery },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = res.data.result || [];

      if (result.length < LIMIT) setHasMore(false);

      if (pageNum === 1) {
        // First load - replace all data
        setData(result);
      } else {
        // Subsequent loads - append new data
        setData((prev) => [...prev, ...result]);
      }
      setIsInitialLoading(false);
    } catch (err: any) {
      const { data } = err.response || {};
      showToast(data && data.error, "error");
      setHasMore(false);
      setIsInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, []); // Only run on mount

  // Filter data based on search term
  const filteredDataMemo = useMemo(() => {
    if (!searchTerm.trim()) {
      return data;
    } else {
      return data.filter(
        (user) =>
          user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.role?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }, [data, searchTerm]);

  // Update filteredData when memo changes
  useEffect(() => {
    setFilteredData(filteredDataMemo);
  }, [filteredDataMemo]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);

    // Reset scroll position to top when searching
    if (newSearchTerm.trim()) {
      const scrollableDiv = document.getElementById("scrollableDiv");
      if (scrollableDiv) {
        scrollableDiv.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const loadMore = () => {
    if (searchTerm.trim()) {
      // Don't load more when searching
      return;
    }
    const nextPage = page + 1;
    fetchData(nextPage);
    setPage(nextPage);
  };

  const reloadData = () => {
    // Reset scroll position to top
    const scrollableDiv = document.getElementById("scrollableDiv");
    if (scrollableDiv) {
      scrollableDiv.scrollTo({ top: 0, behavior: "smooth" });
    }

    setData([]);
    setFilteredData([]);
    setSearchTerm("");
    setPage(1);
    setHasMore(true);
    setIsInitialLoading(true);
    fetchData(1);
  };

  // Expose reloadData to parent via ref
  useImperativeHandle(ref, () => ({
    reloadData,
  }));

  const columns = [
    // { name: "ID", uid: "id" },
    { name: "Username", uid: "username" },
    { name: "Name", uid: "name" },
    { name: "Email", uid: "email" },
    { name: "Role", uid: "role" },
    { name: "Kanwil", uid: "kdkanwil" },
    { name: "KPPN", uid: "kdkppn" },
    { name: "Lokasi", uid: "kdlokasi" },
    { name: "Active", uid: "active" },
    { name: "Status", uid: "status_update" },
  ];

  return (
    <div className="w-full bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden animate-fade-in">
      {/* Compact Header with Search and Actions */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-700 dark:via-indigo-700 dark:to-purple-700 px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Left side - Title and Search */}
          <div className="flex items-center space-x-4">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Cari username, nama, email..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-64 px-3 py-1.5 text-sm bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/20 transition-all duration-200"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <svg
                  className="w-4 h-4 text-white/70"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Right side - Action Buttons */}
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1.5 text-xs font-medium bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-200 flex items-center space-x-1">
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>Tambah User</span>
            </button>
            <button className="px-3 py-1.5 text-xs font-medium bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-200 flex items-center space-x-1">
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              <span>Export</span>
            </button>
            <button
              onClick={reloadData}
              className="px-3 py-1.5 text-xs font-medium bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-200 flex items-center space-x-1"
            >
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>

      <div
        className="relative bg-gray-50/30 dark:bg-gray-800/30"
        style={{ height: "70vh" }}
      >
        {/* Sticky Header - Outside of scroll container */}
        <div className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-lg">
          <div className="grid grid-cols-9 gap-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-700 dark:via-indigo-700 dark:to-purple-700 border-b-2 border-blue-500 dark:border-blue-400">
            {columns.map((col) => (
              <div
                key={col.uid}
                className="py-3 px-6 text-center border-r border-white/20 dark:border-white/10 last:border-r-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-sm"
              >
                <div className="flex justify-center items-center w-full">
                  <span className="text-white font-semibold text-sm">
                    {col.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scrollable Content */}
        <div
          id="scrollableDiv"
          style={{ height: "calc(70vh - 78px)", overflow: "auto" }}
          className="bg-white dark:bg-gray-900 text-center text-normal"
        >
          <InfiniteScroll
            dataLength={data.length}
            next={loadMore}
            hasMore={hasMore && !searchTerm.trim()}
            loader={<LoadingSpinner />}
            scrollableTarget="scrollableDiv"
          >
            {/* Table Body Content */}
            <div className="divide-y divide-gray-100">
              {isInitialLoading ? (
                // Show skeleton rows
                Array.from({ length: LIMIT }).map((_, index) => (
                  <div
                    key={`skeleton-${index}`}
                    className="grid grid-cols-9 gap-0 animate-pulse bg-white dark:bg-gray-900 py-2"
                  >
                    {columns.map((col, idx) => (
                      <div key={idx} className="px-6 py-1">
                        <div className="w-full h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-md animate-shimmer"></div>
                      </div>
                    ))}
                  </div>
                ))
              ) : filteredData.length === 0 && searchTerm ? (
                // No search results
                <div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
                  <svg
                    className="w-16 h-16 mb-4 text-gray-300 dark:text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <h3 className="text-lg font-medium mb-2">
                    Tidak ada hasil ditemukan
                  </h3>
                  <p className="text-sm">
                    Coba gunakan kata kunci pencarian yang berbeda
                  </p>
                  <p className="text-xs mt-1">Pencarian: "{searchTerm}"</p>
                </div>
              ) : (
                filteredData.map((user, idx) => (
                  <div
                    key={`user-${user.id}-${user.username}-${idx}`}
                    className="grid grid-cols-9 gap-0 items-center group bg-white dark:bg-gray-900 hover:bg-gradient-to-r hover:from-blue-50/80 hover:to-indigo-50/60 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20 transition-all duration-300 border-b border-gray-100/60 dark:border-gray-700/60 hover:shadow-md hover:scale-[1.001] cursor-pointer py-2"
                  >
                    {/* Username */}
                    <div className="px-2 py-1 text-center break-words whitespace-normal text-gray-700 dark:text-gray-300 group-hover:text-blue-800 dark:group-hover:text-blue-400 transition-colors duration-300 flex items-center justify-center min-h-[40px] overflow-wrap-anywhere">
                      <span className="break-all text-wrap">
                        {user.username}
                      </span>
                    </div>

                    {/* Name */}
                    <div className="px-2 py-1 text-center break-words whitespace-normal text-gray-700 dark:text-gray-300 group-hover:text-blue-800 dark:group-hover:text-blue-400 transition-colors duration-300 flex items-center justify-center min-h-[40px] overflow-wrap-anywhere">
                      <span className="break-words text-wrap">{user.name}</span>
                    </div>

                    {/* Email */}
                    <div className="px-2 py-1 text-center break-words whitespace-normal text-gray-700 dark:text-gray-300 group-hover:text-blue-800 dark:group-hover:text-blue-400 transition-colors duration-300 flex items-center justify-center min-h-[40px] overflow-wrap-anywhere">
                      <span className="break-all text-wrap">{user.email}</span>
                    </div>

                    {/* Role */}
                    <div className="px-6 flex items-center justify-center min-h-[40px]">
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 text-purple-800 dark:text-purple-300 group-hover:from-purple-200 group-hover:to-pink-200 dark:group-hover:from-purple-800/70 dark:group-hover:to-pink-800/70 transition-all duration-300 shadow-sm break-words">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 dark:bg-purple-400 mr-2 flex-shrink-0"></div>
                        <span className="break-words text-wrap">
                          {user.role}
                        </span>
                      </span>
                    </div>

                    {/* Kanwil */}
                    <div className="px-2 py-1 text-center break-words whitespace-normal text-gray-700 dark:text-gray-300 group-hover:text-blue-800 dark:group-hover:text-blue-400 transition-colors duration-300 flex items-center justify-center min-h-[40px] overflow-wrap-anywhere">
                      <span className="break-words text-wrap">
                        {user.kdkanwil}
                      </span>
                    </div>

                    {/* KPPN */}
                    <div className="px-6 text-gray-700 dark:text-gray-300 group-hover:text-blue-800 dark:group-hover:text-blue-400 transition-colors duration-300 font-medium flex items-center justify-center min-h-[40px] overflow-wrap-anywhere">
                      <span className="break-words text-wrap text-center">
                        {user.kdkppn}
                      </span>
                    </div>

                    {/* Lokasi */}
                    <div className="px-6 text-gray-700 dark:text-gray-300 group-hover:text-blue-800 dark:group-hover:text-blue-400 transition-colors duration-300 font-medium flex items-center justify-center min-h-[40px] overflow-wrap-anywhere">
                      <span className="break-words text-wrap text-center">
                        {user.kdlokasi}
                      </span>
                    </div>

                    {/* Active Status */}
                    <div className="px-6 flex items-center justify-center min-h-[40px]">
                      <span
                        className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 shadow-sm hover:shadow-md break-words ${
                          user.active
                            ? "bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/50 dark:to-emerald-900/50 text-green-800 dark:text-green-300 group-hover:from-green-200 group-hover:to-emerald-200 dark:group-hover:from-green-800/70 dark:group-hover:to-emerald-800/70"
                            : "bg-gradient-to-r from-red-100 to-rose-100 dark:from-red-900/50 dark:to-rose-900/50 text-red-800 dark:text-red-300 group-hover:from-red-200 group-hover:to-rose-200 dark:group-hover:from-red-800/70 dark:group-hover:to-rose-800/70"
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full mr-2 shadow-sm flex-shrink-0 ${
                            user.active
                              ? "bg-green-500 dark:bg-green-400 animate-pulse"
                              : "bg-red-500 dark:bg-red-400"
                          }`}
                        ></div>
                        <span className="break-words text-wrap">
                          {user.active ? "Active" : "Inactive"}
                        </span>
                      </span>
                    </div>

                    {/* Status Update */}
                    <div className="px-6 flex items-center justify-center min-h-[40px]">
                      <span
                        className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 shadow-sm hover:shadow-md break-words ${
                          user.status_update
                            ? "bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/50 dark:to-cyan-900/50 text-blue-800 dark:text-blue-300 group-hover:from-blue-200 group-hover:to-cyan-200 dark:group-hover:from-blue-800/70 dark:group-hover:to-cyan-800/70"
                            : "bg-gradient-to-r from-gray-100 to-slate-100 dark:from-gray-700 dark:to-slate-700 text-gray-600 dark:text-gray-400 group-hover:from-gray-200 group-hover:to-slate-200 dark:group-hover:from-gray-600 dark:group-hover:to-slate-600"
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full mr-2 shadow-sm flex-shrink-0 ${
                            user.status_update
                              ? "bg-blue-500 dark:bg-blue-400 animate-pulse"
                              : "bg-gray-400 dark:bg-gray-500"
                          }`}
                        ></div>
                        <span className="break-words text-wrap">
                          {user.status_update ? "Updated" : "Pending"}
                        </span>
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
});

User.displayName = "User";

export default User;
