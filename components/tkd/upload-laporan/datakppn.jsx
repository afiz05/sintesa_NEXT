"use client";
import React, { useState, useContext, useEffect } from "react";
import MyContext from "../../../utils/Context";
import { Button, Tabs, Tab, Card, CardBody } from "@heroui/react";
import { Upload, FileText, BarChart3, Building2 } from "lucide-react";

// import { Loading2 } from "../../layout/LoadingTable";
import { handleHttpError } from "../../notifikasi/toastError";
import moment from "moment";

import LkModal from "./LkModal";
import Monev from "./monev";
import ModalMonev from "./ModalMonev";
import MonevKanwil from "./monevkanwil";
import LaporanKeuangan from "./lk";
import LaporanKeuanganList from "./LaporanKeuanganList";
import LaporanMonevList from "./LaporanMonevList";

export default function DataKppn() {
  const { role, nmrole, axiosJWT, token, iduser, setUrl } =
    useContext(MyContext);

  // State untuk toggle antara komponen
  const [selectedTab, setSelectedTab] = useState("laporan-keuangan");
  const [showModalKanwil, setShowModalKanwil] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Set default view berdasarkan role
  useEffect(() => {
    if (role === "2") {
      setSelectedTab("laporan-monev-kanwil");
    } else {
      setSelectedTab("laporan-keuangan");
    }
  }, [role]);

  const handleRekam = async () => {
    setShowModal(true);
  };

  const handleRekamMonevKanwil = async () => {
    setShowModalKanwil(true);
  };

  const handleCloseKanwil = () => {
    setShowModalKanwil(false);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const renderActiveComponent = () => {
    switch (selectedTab) {
      case "laporan-keuangan":
        return <LaporanKeuanganList key="lk-component" />;
      case "laporan-monev":
        return <LaporanMonevList key="monev-component" />;
      case "laporan-monev-kanwil":
        return <MonevKanwil key="monevkanwil-component" cekMonev={true} />;
      default:
        return <LaporanKeuanganList key="default-component" />;
    }
  };

  return (
    <div className="w-full max-w-[100vw] p-3 sm:p-6 overflow-hidden box-border">
      {/* Header with Upload Buttons */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">
            Laporan Transfer Daerah
          </h1>
          <nav className="text-sm text-gray-600 mt-1">
            <span>TKD</span> / <span className="text-gray-800">Upload</span>
          </nav>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
          {role !== "2" && (
            <Button
              color="primary"
              startContent={<Upload size={16} />}
              onPress={handleRekam}
              className="w-full sm:w-auto"
              size="sm"
            >
              <span className="hidden sm:inline">Laporan KPPN</span>
              <span className="sm:hidden">KPPN</span>
            </Button>
          )}
          {role !== "3" && (
            <Button
              color="success"
              startContent={<Upload size={16} />}
              onPress={handleRekamMonevKanwil}
              className="w-full sm:w-auto"
              size="sm"
            >
              <span className="hidden sm:inline">Laporan Kanwil</span>
              <span className="sm:hidden">Kanwil</span>
            </Button>
          )}
        </div>
      </div>

      {/* Tabs and Content */}
      <div className="mb-4">
        <Tabs
          selectedKey={selectedTab}
          onSelectionChange={(key) => setSelectedTab(key)}
          variant="solid"
          color="default"
          size="lg"
          fullWidth
          classNames={{
            tabList: "w-full flex flex-col sm:flex-row gap-1 sm:gap-0",
            tab: "flex-1 min-h-[48px] sm:min-h-auto",
            panel: "w-full",
          }}
        >
          {role !== "2" && (
            <>
              <Tab
                key="laporan-keuangan"
                title={
                  <div className="flex items-center gap-1 sm:gap-2">
                    <FileText size={14} className="sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm">
                      <span className="hidden sm:inline">
                        Laporan Keuangan KPPN
                      </span>
                      <span className="sm:hidden">Keuangan</span>
                    </span>
                  </div>
                }
              />
              <Tab
                key="laporan-monev"
                title={
                  <div className="flex items-center gap-1 sm:gap-2">
                    <BarChart3 size={14} className="sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm">
                      <span className="hidden sm:inline">
                        Laporan Monev KPPN
                      </span>
                      <span className="sm:hidden">Monev KPPN</span>
                    </span>
                  </div>
                }
              />
            </>
          )}
          {role !== "3" && (
            <Tab
              key="laporan-monev-kanwil"
              title={
                <div className="flex items-center gap-1 sm:gap-2">
                  <Building2 size={14} className="sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm">
                    <span className="hidden sm:inline">
                      Laporan Monev Kanwil
                    </span>
                    <span className="sm:hidden">Monev Kanwil</span>
                  </span>
                </div>
              }
            />
          )}
        </Tabs>
      </div>

      {/* Content Container */}
      <Card className="w-full max-w-[calc(100vw-1.5rem)] sm:max-w-[calc(100vw-3rem)] min-w-0 shadow-sm border-2">
        <CardBody className="p-4 sm:p-6">
          {/* Render Active Component */}
          {renderActiveComponent()}
        </CardBody>
      </Card>

      {/* Modals */}
      {showModal && <LkModal show={showModal} onHide={handleClose} />}
      {showModalKanwil && (
        <ModalMonev show={showModalKanwil} onHide={handleCloseKanwil} />
      )}
    </div>
  );
}
