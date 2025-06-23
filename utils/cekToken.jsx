"use client";

import { useContext, useEffect, useState } from "react";
import MyContext from "./Context";

export const CekToken = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const context = useContext(MyContext);

  if (!context) {
    throw new Error("CekToken must be used within MyContextProvider");
  }

  const { axiosJWT, token } = context;
  console.log(token);

  const checkStatus = async () => {
    // Cek apakah token bearer sudah tersedia
    if (!token) {
      // Token belum tersedia, tunggu
      return;
    }

    try {
      const response = await axiosJWT.get(`${process.env.NEXT_PUBLIC_STATUS}`, {
        withCredentials: true,
      });

      if (response.data.status === "OK") {
        setIsReady(true);
      } else {
        window.location.href = "/v3/next/offline";
      }
    } catch (error) {
      window.location.href = "/v3/next/offline";
    }
  };

  useEffect(() => {
    checkStatus();
  }, [token]); // Jalankan ulang ketika token berubah

  if (!isReady) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <p className="text-lg font-medium">Memeriksa status server...</p>
          <p className="text-sm text-gray-500">Mohon tunggu sebentar...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
