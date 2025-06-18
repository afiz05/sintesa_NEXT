"use client";
import React, { useState, useEffect, useMemo, useContext } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  Chip,
  Input,
  Select,
  SelectItem,
  Pagination,
  Card,
  CardBody,
} from "@heroui/react";
import {
  Search,
  Download,
  RefreshCw,
  Database,
  FileText,
  Filter,
  X,
} from "lucide-react";
import { useToast } from "@/components/context/ToastContext";
import Encrypt from "@/utils/Encrypt";
import MyContext from "@/utils/Contex";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}
interface PerformaTerbesarData {
  kddept: string;
  nmdept: string;
  pagu: number;
  realisasi: number;
  persen: number;
}
const ModalPerforma: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [dataDipa, setDataDipa] = useState<PerformaTerbesarData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();
  const context = useContext(MyContext);

  const { token, axiosJWT, statusLogin } = context! as {
    token: string;
    axiosJWT: any;
    statusLogin: any;
  };

  const getData = async () => {
    const encodedQuery = encodeURIComponent(
      `SELECT 
  prk.kddept,
  td.nmdept,
  SUM(prk.pagu) AS pagu,
  SUM(prk.realisasi) AS realisasi,
  SUM(prk.realisasi) / NULLIF(SUM(prk.pagu), 0) * 100 AS persen
FROM dashboard.pagu_real_kl prk
LEFT JOIN dbref.t_dept_2025 td
  ON prk.kddept = td.kddept
WHERE prk.thang = '2022' group by prk.kddept
ORDER BY pagu DESC`
    );
    const cleanedQuery = decodeURIComponent(encodedQuery)
      .replace(/\n/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    const encryptedQuery = Encrypt(cleanedQuery);

    try {
      setLoading(true);
      setError(null);

      const response = await axiosJWT.post(
        `${process.env.NEXT_PUBLIC_GET_REFERENSI}`,
        { query: encryptedQuery },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json, text/plain, */*",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const resultData = response.data.result || [];
      setDataDipa(resultData);
    } catch (err: any) {
      const { status, data } = err.response || {};
      setDataDipa([]); // Explicitly set empty array on error
      showToast("Terjadi Permasalahan Koneksi atau Server Backend", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      hideCloseButton={true}
      size="5xl"
      scrollBehavior="inside"
      classNames={{
        base: "max-h-[90vh] max-w-[95vw]",
        backdrop: "bg-black/60",
        wrapper: "flex items-center justify-center p-4",
        body: "p-0",
        header: "border-b border-gray-200 dark:border-gray-700",
        footer: "border-t border-gray-200 dark:border-gray-700",
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Detail Performa Kementerian/ Lembaga
        </ModalHeader>{" "}
        <ModalBody>
          {loading ? (
            <Table
              aria-label="Loading Performa Kementerian/Lembaga data"
              className="min-w-full"
              removeWrapper
              classNames={{
                th: "text-center py-2 bg-gray-100 dark:bg-gray-900 sticky top-0 z-10",
                td: "py-2",
              }}
            >
              <TableHeader>
                <TableColumn className="w-12">No.</TableColumn>
                <TableColumn> Kementerian </TableColumn>
                <TableColumn className="w-36">Pagu</TableColumn>
                <TableColumn className="w-36">Realisasi</TableColumn>
                <TableColumn className="w-28">Persentase</TableColumn>
              </TableHeader>
              <TableBody>
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <TableRow key={`skeleton-${index}`} className="border-b">
                      <TableCell className="text-center">
                        <div className="h-4 w-4 mx-auto rounded-md bg-gray-200 dark:bg-gray-700 animate-pulse" />
                      </TableCell>
                      <TableCell>
                        <div className="h-4 w-full max-w-[300px] rounded-md bg-gray-200 dark:bg-gray-700 animate-pulse" />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="h-4 w-28 ml-auto rounded-md bg-gray-200 dark:bg-gray-700 animate-pulse" />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="h-4 w-28 ml-auto rounded-md bg-gray-200 dark:bg-gray-700 animate-pulse" />
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="h-6 w-20 mx-auto rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          ) : error ? (
            <div className="text-center text-danger p-4">{error}</div>
          ) : (
            <Table
              aria-label="Performa Kementerian/Lembaga data table"
              className="min-w-full"
              removeWrapper
              classNames={{
                th: "text-center py-2 bg-gray-100 dark:bg-gray-900 sticky top-0 z-10",
                td: "py-2",
              }}
            >
              <TableHeader>
                <TableColumn className="w-12">No.</TableColumn>
                <TableColumn>Nama Kementerian (Kode)</TableColumn>
                <TableColumn className="w-36">Pagu</TableColumn>
                <TableColumn className="w-36">Realisasi</TableColumn>
                <TableColumn className="w-28">Persentase</TableColumn>
              </TableHeader>
              <TableBody emptyContent="Tidak ada data yang tersedia">
                {dataDipa.map((item, index) => (
                  <TableRow key={index} className="border-b">
                    <TableCell className="text-center">{index + 1}</TableCell>
                    <TableCell>
                      <div>
                        <span className="font-medium">{item.nmdept}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                          ({item.kddept})
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {new Intl.NumberFormat("id-ID", {
                        maximumFractionDigits: 0,
                      }).format(item.pagu)}
                    </TableCell>
                    <TableCell className="text-right">
                      {new Intl.NumberFormat("id-ID", {
                        maximumFractionDigits: 0,
                      }).format(item.realisasi)}
                    </TableCell>
                    <TableCell className="text-center">
                      <Chip
                        size="sm"
                        color={
                          Number(item.persen) >= 90
                            ? "success"
                            : Number(item.persen) >= 70
                            ? "warning"
                            : "danger"
                        }
                      >
                        {typeof item.persen === "number"
                          ? item.persen.toFixed(2)
                          : Number(item.persen).toFixed(2)}
                        %
                      </Chip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </ModalBody>{" "}
        <ModalFooter>
          <Button
            size="sm"
            color="danger"
            onPress={onClose}
            startContent={<X size={16} />}
          >
            Tutup
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalPerforma;
