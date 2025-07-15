"use client";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  Card,
  CardBody,
  CardHeader,
  Select,
  SelectItem,
  Chip,
  Button,
} from "@heroui/react";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import { MapPin, BarChart3, TrendingUp, Users } from "lucide-react";
import {
  INDONESIA_PROVINCES,
  INDONESIA_CENTER,
  ProvinceData,
} from "../../../data/indonesia-provinces";
import { useGoogleMaps } from "../../../contexts/GoogleMapsContext";

const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

const darkMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#353535" }] }, // Brighter land
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [{ color: "#3d3d3d" }],
  }, // Brighter island
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#212121" }] },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [{ color: "#757575" }],
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9e9e9e" }],
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#bdbdbd" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#757575" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#232323" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#616161" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#1b1b1b" }],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [{ color: "#2c2c2c" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#8a8a8a" }],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [{ color: "#373737" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#3c3c3c" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212121" }],
  },
  {
    featureType: "road.local",
    elementType: "geometry",
    stylers: [{ color: "#212121" }],
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [{ color: "#757575" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#000000" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#3d3d3d" }],
  },
];

const defaultMapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: true,
};

export const PetaMbg = () => {
  const { resolvedTheme } = useTheme();
  const [selectedProvince, setSelectedProvince] = useState<ProvinceData | null>(
    null
  );
  const [selectedDropdownValue, setSelectedDropdownValue] =
    useState<string>("nasional");
  const [infoWindowPosition, setInfoWindowPosition] =
    useState<google.maps.LatLng | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  // Use Google Maps context
  const { isLoaded, loadError } = useGoogleMaps();

  const mapCenter = useMemo(() => {
    if (selectedProvince) {
      return selectedProvince.coordinates;
    }
    return INDONESIA_CENTER;
  }, [selectedProvince]);

  const mapZoom = useMemo(() => {
    if (selectedProvince) {
      return selectedProvince.zoom;
    }
    return 5;
  }, [selectedProvince]);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // Effect to update map when province selection changes
  useEffect(() => {
    if (map && selectedProvince) {
      map.panTo(selectedProvince.coordinates);
      map.setZoom(selectedProvince.zoom);
    } else if (map && !selectedProvince) {
      map.panTo(INDONESIA_CENTER);
      map.setZoom(5);
    }
  }, [map, selectedProvince]);

  const handleProvinceSelect = (keys: any) => {
    // Handle both single selection and set selection
    const provinceId =
      typeof keys === "string" ? keys : String(Array.from(keys)[0]);

    if (!provinceId || provinceId === "undefined") return;

    setSelectedDropdownValue(provinceId);

    if (provinceId === "nasional") {
      setSelectedProvince(null);
      setInfoWindowPosition(null);
      console.log("Selected: Nasional view");
      return;
    }

    const province = INDONESIA_PROVINCES.find((p) => p.id === provinceId);
    if (province) {
      setSelectedProvince(province);
      setInfoWindowPosition(null);

      // Debug logging
      console.log(
        "Selected province:",
        province.name,
        province.coordinates,
        "zoom:",
        province.zoom
      );
    }
  };

  const handleMarkerClick = (province: ProvinceData) => {
    setInfoWindowPosition(
      new google.maps.LatLng(province.coordinates.lat, province.coordinates.lng)
    );
    setSelectedProvince(province);
  };

  const resetView = () => {
    setSelectedProvince(null);
    setSelectedDropdownValue("nasional");
    setInfoWindowPosition(null);
    // The useEffect will handle the map reset
  };

  // Create dropdown options
  const dropdownOptions = [
    { key: "nasional", label: "Nasional (Semua Provinsi)" },
    ...INDONESIA_PROVINCES.map((province) => ({
      key: province.id,
      label: province.name,
    })),
  ];

  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 85) return "success";
    if (percentage >= 80) return "warning";
    return "danger";
  };

  if (loadError) {
    return (
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <MapPin className="text-primary" size={20} />
            <h3 className="text-lg font-semibold">
              Peta Distribusi MBG per Provinsi
            </h3>
          </div>
        </CardHeader>
        <CardBody>
          <div className="h-[400px] flex items-center justify-center text-default-500">
            <div className="text-center">
              <MapPin size={48} className="mx-auto mb-2 opacity-50" />
              <p>Gagal memuat peta</p>
              <p className="text-xs mt-2 text-default-400">
                Periksa konfigurasi Google Maps API Key
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    );
  }

  if (!isLoaded) {
    return (
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <MapPin className="text-primary" size={20} />
            <h3 className="text-lg font-semibold">
              Peta Distribusi MBG per Provinsi
            </h3>
          </div>
        </CardHeader>
        <CardBody>
          <div className="h-[400px] flex items-center justify-center text-default-500">
            <div className="text-center">
              <MapPin size={48} className="mx-auto mb-2 opacity-50" />
              <p>Memuat peta...</p>
            </div>
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2 flex-shrink-0">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <MapPin className="text-primary" size={16} />
            <h3 className="text-base font-semibold">
              Peta Distribusi MBG per Provinsi
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <Select
              placeholder="Pilih Provinsi"
              className="w-64"
              size="sm"
              selectedKeys={[selectedDropdownValue]}
              onSelectionChange={handleProvinceSelect}
            >
              {dropdownOptions.map((option) => (
                <SelectItem key={option.key}>{option.label}</SelectItem>
              ))}
            </Select>
            <Button
              size="sm"
              variant="flat"
              onClick={resetView}
              className="min-w-fit"
            >
              Reset
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="pt-0 flex-1">
        <div className="space-y-3">
          {selectedProvince ? (
            <div className="bg-default-100 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-base">
                    {selectedProvince.name}
                  </h4>
                  <p className="text-xs text-default-600">
                    Informasi Program MBG
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="text-center">
                    <div className="flex items-center gap-1 text-xs text-default-600">
                      <Users size={12} />
                      <span>Total Program</span>
                    </div>
                    <p className="font-semibold">
                      {selectedProvince.mbgData?.totalProgram.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-1 text-xs text-default-600">
                      <BarChart3 size={12} />
                      <span>Realisasi</span>
                    </div>
                    <p className="font-semibold">
                      {selectedProvince.mbgData?.realisasi.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-1 text-xs text-default-600">
                      <TrendingUp size={12} />
                      <span>Persentase</span>
                    </div>
                    <Chip
                      size="sm"
                      color={getPerformanceColor(
                        selectedProvince.mbgData?.persentase || 0
                      )}
                      variant="flat"
                    >
                      {selectedProvince.mbgData?.persentase}%
                    </Chip>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-default-100 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-base">
                    Nasional (Semua Provinsi)
                  </h4>
                  <p className="text-xs text-default-600">
                    Ringkasan Program MBG Seluruh Indonesia
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="text-center">
                    <div className="flex items-center gap-1 text-xs text-default-600">
                      <Users size={12} />
                      <span>Total Program</span>
                    </div>
                    <p className="font-semibold">
                      {INDONESIA_PROVINCES.reduce(
                        (total, province) =>
                          total + (province.mbgData?.totalProgram || 0),
                        0
                      ).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-1 text-xs text-default-600">
                      <BarChart3 size={12} />
                      <span>Realisasi</span>
                    </div>
                    <p className="font-semibold">
                      {INDONESIA_PROVINCES.reduce(
                        (total, province) =>
                          total + (province.mbgData?.realisasi || 0),
                        0
                      ).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-1 text-xs text-default-600">
                      <TrendingUp size={12} />
                      <span>Persentase</span>
                    </div>
                    <Chip
                      size="sm"
                      color={getPerformanceColor(
                        Math.round(
                          (INDONESIA_PROVINCES.reduce(
                            (total, province) =>
                              total + (province.mbgData?.realisasi || 0),
                            0
                          ) /
                            INDONESIA_PROVINCES.reduce(
                              (total, province) =>
                                total + (province.mbgData?.totalProgram || 0),
                              0
                            )) *
                            100
                        )
                      )}
                      variant="flat"
                    >
                      {Math.round(
                        (INDONESIA_PROVINCES.reduce(
                          (total, province) =>
                            total + (province.mbgData?.realisasi || 0),
                          0
                        ) /
                          INDONESIA_PROVINCES.reduce(
                            (total, province) =>
                              total + (province.mbgData?.totalProgram || 0),
                            0
                          )) *
                          100
                      )}
                      %
                    </Chip>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="relative rounded-xl overflow-hidden">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={mapCenter}
              zoom={mapZoom}
              onLoad={onLoad}
              onUnmount={onUnmount}
              options={{
                ...defaultMapOptions,
                styles: resolvedTheme === "dark" ? darkMapStyle : undefined,
              }}
            >
              {/* ...existing code for markers and InfoWindow... */}
              {INDONESIA_PROVINCES.map((province) => (
                <Marker
                  key={province.id}
                  position={province.coordinates}
                  onClick={() => handleMarkerClick(province)}
                  title={province.name}
                />
              ))}

              {infoWindowPosition && selectedProvince && (
                <InfoWindow
                  position={infoWindowPosition}
                  onCloseClick={() => setInfoWindowPosition(null)}
                >
                  <div className="p-2 min-w-48">
                    <h3 className="font-semibold text-base mb-2">
                      {selectedProvince.name}
                    </h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Total Program:</span>
                        <span className="font-medium">
                          {selectedProvince.mbgData?.totalProgram.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Realisasi:</span>
                        <span className="font-medium">
                          {selectedProvince.mbgData?.realisasi.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Persentase:</span>
                        <span
                          className={`font-medium px-2 py-1 rounded text-xs ${
                            (selectedProvince.mbgData?.persentase || 0) >= 85
                              ? "bg-green-100 text-green-800"
                              : (selectedProvince.mbgData?.persentase || 0) >=
                                80
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {selectedProvince.mbgData?.persentase}%
                        </span>
                      </div>
                    </div>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
