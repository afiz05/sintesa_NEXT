export interface ProvinceData {
  id: string;
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  zoom: number;
  mbgData?: {
    totalProgram: number;
    realisasi: number;
    persentase: number;
  };
}

export const INDONESIA_CENTER = {
  lat: -2.5489,
  lng: 118.0149,
};

export const INDONESIA_PROVINCES: ProvinceData[] = [
  {
    id: "aceh",
    name: "Aceh",
    coordinates: { lat: 4.695135, lng: 96.7493993 },
    zoom: 8,
    mbgData: { totalProgram: 1200, realisasi: 950, persentase: 79.2 },
  },
  {
    id: "sumut",
    name: "Sumatera Utara",
    coordinates: { lat: 2.1153547, lng: 99.5450974 },
    zoom: 7,
    mbgData: { totalProgram: 2300, realisasi: 1890, persentase: 82.2 },
  },
  {
    id: "sumbar",
    name: "Sumatera Barat",
    coordinates: { lat: -0.7399397, lng: 100.8000051 },
    zoom: 8,
    mbgData: { totalProgram: 1100, realisasi: 890, persentase: 80.9 },
  },
  {
    id: "riau",
    name: "Riau",
    coordinates: { lat: 0.2933469, lng: 101.7068294 },
    zoom: 7,
    mbgData: { totalProgram: 1400, realisasi: 1120, persentase: 80.0 },
  },
  {
    id: "jambi",
    name: "Jambi",
    coordinates: { lat: -1.4851831, lng: 102.4380581 },
    zoom: 8,
    mbgData: { totalProgram: 980, realisasi: 780, persentase: 79.6 },
  },
  {
    id: "sumsel",
    name: "Sumatera Selatan",
    coordinates: { lat: -3.3194374, lng: 103.914399 },
    zoom: 7,
    mbgData: { totalProgram: 1600, realisasi: 1320, persentase: 82.5 },
  },
  {
    id: "bengkulu",
    name: "Bengkulu",
    coordinates: { lat: -3.7928451, lng: 102.2607641 },
    zoom: 8,
    mbgData: { totalProgram: 720, realisasi: 580, persentase: 80.6 },
  },
  {
    id: "lampung",
    name: "Lampung",
    coordinates: { lat: -4.5585849, lng: 105.4068079 },
    zoom: 8,
    mbgData: { totalProgram: 1500, realisasi: 1230, persentase: 82.0 },
  },
  {
    id: "babel",
    name: "Kepulauan Bangka Belitung",
    coordinates: { lat: -2.7410513, lng: 106.4405872 },
    zoom: 9,
    mbgData: { totalProgram: 450, realisasi: 360, persentase: 80.0 },
  },
  {
    id: "kepri",
    name: "Kepulauan Riau",
    coordinates: { lat: 3.9456514, lng: 108.1428669 },
    zoom: 8,
    mbgData: { totalProgram: 680, realisasi: 550, persentase: 80.9 },
  },
  {
    id: "dki",
    name: "DKI Jakarta",
    coordinates: { lat: -6.211544, lng: 106.845172 },
    zoom: 11,
    mbgData: { totalProgram: 3200, realisasi: 2850, persentase: 89.1 },
  },
  {
    id: "jabar",
    name: "Jawa Barat",
    coordinates: { lat: -6.9147444, lng: 107.6098106 },
    zoom: 8,
    mbgData: { totalProgram: 4500, realisasi: 3780, persentase: 84.0 },
  },
  {
    id: "jateng",
    name: "Jawa Tengah",
    coordinates: { lat: -7.150975, lng: 110.1402594 },
    zoom: 8,
    mbgData: { totalProgram: 3800, realisasi: 3200, persentase: 84.2 },
  },
  {
    id: "diy",
    name: "DI Yogyakarta",
    coordinates: { lat: -7.8753849, lng: 110.4262088 },
    zoom: 10,
    mbgData: { totalProgram: 890, realisasi: 750, persentase: 84.3 },
  },
  {
    id: "jatim",
    name: "Jawa Timur",
    coordinates: { lat: -7.5360639, lng: 112.2384017 },
    zoom: 8,
    mbgData: { totalProgram: 4200, realisasi: 3570, persentase: 85.0 },
  },
  {
    id: "banten",
    name: "Banten",
    coordinates: { lat: -6.4058172, lng: 106.0640179 },
    zoom: 9,
    mbgData: { totalProgram: 1800, realisasi: 1520, persentase: 84.4 },
  },
  {
    id: "bali",
    name: "Bali",
    coordinates: { lat: -8.4095178, lng: 115.188916 },
    zoom: 9,
    mbgData: { totalProgram: 980, realisasi: 850, persentase: 86.7 },
  },
  {
    id: "ntb",
    name: "Nusa Tenggara Barat",
    coordinates: { lat: -8.6529334, lng: 117.3616476 },
    zoom: 8,
    mbgData: { totalProgram: 1200, realisasi: 960, persentase: 80.0 },
  },
  {
    id: "ntt",
    name: "Nusa Tenggara Timur",
    coordinates: { lat: -8.6573819, lng: 121.0793705 },
    zoom: 7,
    mbgData: { totalProgram: 1100, realisasi: 850, persentase: 77.3 },
  },
  {
    id: "kalbar",
    name: "Kalimantan Barat",
    coordinates: { lat: -0.2787808, lng: 111.4752851 },
    zoom: 7,
    mbgData: { totalProgram: 1300, realisasi: 1040, persentase: 80.0 },
  },
  {
    id: "kalteng",
    name: "Kalimantan Tengah",
    coordinates: { lat: -1.6814878, lng: 113.3823545 },
    zoom: 7,
    mbgData: { totalProgram: 890, realisasi: 720, persentase: 80.9 },
  },
  {
    id: "kalsel",
    name: "Kalimantan Selatan",
    coordinates: { lat: -3.0926415, lng: 115.2837585 },
    zoom: 8,
    mbgData: { totalProgram: 1150, realisasi: 940, persentase: 81.7 },
  },
  {
    id: "kaltim",
    name: "Kalimantan Timur",
    coordinates: { lat: 1.6406296, lng: 116.419389 },
    zoom: 7,
    mbgData: { totalProgram: 980, realisasi: 800, persentase: 81.6 },
  },
  {
    id: "kalut",
    name: "Kalimantan Utara",
    coordinates: { lat: 3.0730929, lng: 116.0413889 },
    zoom: 8,
    mbgData: { totalProgram: 650, realisasi: 520, persentase: 80.0 },
  },
  {
    id: "sulut",
    name: "Sulawesi Utara",
    coordinates: { lat: 1.2966829, lng: 124.8455904 },
    zoom: 8,
    mbgData: { totalProgram: 780, realisasi: 640, persentase: 82.1 },
  },
  {
    id: "sulteng",
    name: "Sulawesi Tengah",
    coordinates: { lat: -1.4300254, lng: 121.4456179 },
    zoom: 7,
    mbgData: { totalProgram: 890, realisasi: 720, persentase: 80.9 },
  },
  {
    id: "sulsel",
    name: "Sulawesi Selatan",
    coordinates: { lat: -3.6687994, lng: 119.9740534 },
    zoom: 7,
    mbgData: { totalProgram: 2100, realisasi: 1750, persentase: 83.3 },
  },
  {
    id: "sultengg",
    name: "Sulawesi Tenggara",
    coordinates: { lat: -4.14491, lng: 122.174605 },
    zoom: 8,
    mbgData: { totalProgram: 890, realisasi: 720, persentase: 80.9 },
  },
  {
    id: "gorontalo",
    name: "Gorontalo",
    coordinates: { lat: 0.6999372, lng: 122.4467238 },
    zoom: 9,
    mbgData: { totalProgram: 450, realisasi: 370, persentase: 82.2 },
  },
  {
    id: "sulbar",
    name: "Sulawesi Barat",
    coordinates: { lat: -2.8441371, lng: 119.2320784 },
    zoom: 8,
    mbgData: { totalProgram: 520, realisasi: 420, persentase: 80.8 },
  },
  {
    id: "maluku",
    name: "Maluku",
    coordinates: { lat: -3.2384616, lng: 130.1452734 },
    zoom: 7,
    mbgData: { totalProgram: 680, realisasi: 550, persentase: 80.9 },
  },
  {
    id: "malut",
    name: "Maluku Utara",
    coordinates: { lat: 1.5709993, lng: 127.8087693 },
    zoom: 7,
    mbgData: { totalProgram: 480, realisasi: 390, persentase: 81.3 },
  },
  {
    id: "papua",
    name: "Papua",
    coordinates: { lat: -4.269928, lng: 138.0803529 },
    zoom: 6,
    mbgData: { totalProgram: 890, realisasi: 680, persentase: 76.4 },
  },
  {
    id: "papuabar",
    name: "Papua Barat",
    coordinates: { lat: -1.3361154, lng: 133.1747162 },
    zoom: 7,
    mbgData: { totalProgram: 520, realisasi: 400, persentase: 76.9 },
  },
  {
    id: "papuasel",
    name: "Papua Selatan",
    coordinates: { lat: -7.013056, lng: 139.477778 },
    zoom: 7,
    mbgData: { totalProgram: 420, realisasi: 320, persentase: 76.2 },
  },
  {
    id: "papuateng",
    name: "Papua Tengah",
    coordinates: { lat: -3.977778, lng: 136.127778 },
    zoom: 7,
    mbgData: { totalProgram: 380, realisasi: 290, persentase: 76.3 },
  },
  {
    id: "papuapeg",
    name: "Papua Pegunungan",
    coordinates: { lat: -4.06, lng: 138.95 },
    zoom: 7,
    mbgData: { totalProgram: 350, realisasi: 270, persentase: 77.1 },
  },
  {
    id: "papuabardaya",
    name: "Papua Barat Daya",
    coordinates: { lat: -1.69, lng: 132.73 },
    zoom: 7,
    mbgData: { totalProgram: 290, realisasi: 220, persentase: 75.9 },
  },
];
