import React, { useContext, useEffect, useState } from "react";
import { Card, Spinner, Button, Tooltip } from "@heroui/react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import MyContext from "@/utils/Context";
import Encrypt from "@/utils/Random";
import { useToast } from "@/components/context/ToastContext";

export default function TayangAdk({ kdsatker, tahun }) {
  const context = useContext(MyContext);
  const { token, axiosJWT } = context || {};
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataError, setDataError] = useState("");
  const [error2, setError2] = useState("");
  const { showToast } = useToast();

  useEffect(() => {
    if (kdsatker) {
      getData();
    }
    // eslint-disable-next-line
  }, [kdsatker, tahun]);

  const getData = async () => {
    setLoading(true);
    setDataError("");
    const encodedQuery = encodeURIComponent(
      `SELECT kddept,kdunit,kdsatker,kddekon,norev,tg,jam,size,nmfile,folder,fileorpdf FROM monev${tahun}.ftp_dipa_list_${tahun} WHERE kdsatker='${kdsatker}' 
       ORDER BY tg ASC;`
    );
    const cleanedQuery = decodeURIComponent(encodedQuery)
      .replace(/\n/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    try {
      const response = await axiosJWT.post(
        `${process.env.NEXT_PUBLIC_GET_ADK}`,
        { query: Encrypt(cleanedQuery) }
      );
      setData(response.data.result);
      // console.log(cleanedQuery);
    } catch (error) {
      const { status, data } = error.response || {};

      showToast(data && data.error, "error");
      setDataError(
        (data && data.error) ||
          "Terjadi Permasalahan Koneksi atau Server Backend"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (file, folder, tahun) => {
    const fileUrl = `${process.env.NEXT_PUBLIC_SOCKET}/file/download_adk?nmfile=${file}&folder=${folder}&tahun=${tahun}`;
    try {
      const response = await axiosJWT.get(fileUrl, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
      link.setAttribute("download", file);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      setError2("Terjadi kesalahan saat mendownload file. Silakan coba lagi.");
    }
  };

  // Fungsi format tanggal Indonesia
  function formatTanggalIndo(tgl) {
    if (!tgl) return "";
    const [y, m, d] = tgl.split("-");
    if (!y || !m || !d) return tgl;
    return `${d}/${m}/${y.slice(-2)}`;
  }

  if (dataError) {
    return (
      <Card className="w-full">
        <div className="p-4 text-center text-red-600 dark:text-red-400">
          {dataError}
        </div>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card className="w-full flex items-center justify-center min-h-[200px]">
        <Spinner size="lg" color="primary" />
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <div className="p-4">
        <h5 className="text-lg font-bold mb-4 text-blue-700 dark:text-blue-200">
          DIPA TA. {tahun || "2025"}
        </h5>
        <div className="overflow-auto rounded-lg border border-blue-100 dark:border-gray-700 bg-white/60 dark:bg-gray-900/60 shadow-inner min-h-[360px] max-h-[360px]">
          <table className="min-w-full text-sm">
            <thead className="bg-blue-100 dark:bg-gray-800/80 text-blue-800 dark:text-blue-200 font-semibold">
              <tr className="text-center">
                <th className="px-3 py-2">#</th>
                <th className="px-3 py-2"> File</th>
                <th className="px-3 py-2">Revisi </th>

                <th className="px-3 py-2">Tgl</th>
                <th className="px-3 py-2">Download</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((column, index) => (
                  <tr
                    key={index}
                    className="border-b border-blue-50 dark:border-gray-800 text-center"
                  >
                    <td className="px-3 py-2">{index + 1}</td>
                    <td className="px-3 py-2">
                      <Tooltip
                        content={
                          <span className="block max-w-xs whitespace-pre-line break-words text-sm font-mono text-white px-2 py-1 transition-colors duration-300">
                            {column.nmfile}
                          </span>
                        }
                        placement="top"
                        className="bg-orange-400 dark:bg-orange-500 border border-white shadow-lg rounded-lg transition-all duration-300"
                      >
                        <span className="cursor-pointer text-blue-700 dark:text-blue-200 transition-colors duration-300 hover:text-orange-500 focus:text-orange-500">
                          {column.nmfile.length > 10
                            ? column.nmfile.slice(0, 10) + "..."
                            : column.nmfile}
                        </span>
                      </Tooltip>
                    </td>
                    <td className="px-3 py-2">{column.norev}</td>

                    <td className="px-3 py-2">
                      {formatTanggalIndo(column.tg)}
                    </td>
                    <td className="px-3 py-2">
                      <Tooltip
                        content="Download"
                        placement="top"
                        className="bg-orange-400 text-white dark:bg-orange-500 border border-white shadow-lg rounded-lg transition-all duration-300"
                      >
                        <Button
                          isIconOnly
                          size="sm"
                          color="primary"
                          variant="flat"
                          onClick={() =>
                            handleDownload(
                              column.nmfile,
                              column.folder,
                              tahun || "2025"
                            )
                          }
                        >
                          <ArrowDownTrayIcon className="w-5 h-5" />
                        </Button>
                      </Tooltip>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-8 text-gray-400 dark:text-gray-500"
                  >
                    Tidak ada data file ADK untuk satker ini.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {error2 && (
          <div className="mt-4 text-red-600 dark:text-red-400 text-center text-sm">
            {error2}
          </div>
        )}
      </div>
    </Card>
  );
}
