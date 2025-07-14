"use client";

import MyContext from "@/utils/Context";
import Encrypt from "@/utils/Encrypt";
import { useContext } from "react";

// Utility function untuk mapping data dari database ke format SatkerItem
const mapDbToSatkerItem = (dbItem) => ({
  id: dbItem.kdsatker,
  kode: dbItem.kdsatker,
  nama: dbItem.nmsatker,
  kdsatker: dbItem.kdsatker,
  nmsatker: dbItem.nmsatker,
  email: dbItem.email,
  kddept: dbItem.kddept,
  nmdept: dbItem.nmdept,
  kdunit: dbItem.kdunit,
  nmunit: dbItem.nmunit,
  kddekon: dbItem.kddekon,
  nmdekon: dbItem.nmdekon,
  kdkanwil: dbItem.kdkanwil,
  nmkanwil: dbItem.nmkanwil,
  kdkppn: dbItem.kdkppn,
  nmkppn: dbItem.nmkppn,
  thang: dbItem.thang,
  kpa: dbItem.kpa,
  bendahara: dbItem.bendahara,
  ppspm: dbItem.ppspm,
  npwp: dbItem.npwp,
  statusblu: dbItem.statusblu,
  kdjendok: dbItem.kdjendok,
  level: dbItem.kddept,
  alamat: `${dbItem.kdunit}`,
});

export const useSatkerService = () => {
  const context = useContext(MyContext);
  const { token, axiosJWT } = context || {};

  const cariSatker = async (kataPencarian) => {
    const query = `
        select kdsatker,nmsatker,kddept,kdunit from dbref.t_satker_2025 
        where kdsatker like '%${kataPencarian}%' or nmsatker like '%${kataPencarian}%'
        order by kdsatker limit 10;
      `;
    const cleanedQuery = query.replace(/\n/g, " ").replace(/\s+/g, " ").trim();

    try {
      const response = await axiosJWT.post(
        process.env.NEXT_PUBLIC_GET_REFERENSI,
        { query: Encrypt(cleanedQuery) }
      );

      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      //   console.log(query);

      // Map data dari response ke format SatkerItem
      const mappedData = response.data.result.map((item) =>
        mapDbToSatkerItem(item)
      );

      return mappedData;
    } catch (error) {
      console.error("Error dalam cariSatker:", error);
      throw new Error("Gagal mencari data satker");
    }
  };

  const ambilDetailSatker = async (idSatker) => {
    const query = `
    SELECT a.thang,a.kdjendok,a.kdsatker,c.kdkppn,b.nmsatker,a.kddept,d.nmdept,g.kdkanwil,a.kdunit,e.nmunit,
    a.kddekon,a.kdlokasi,c.nmkppn,a.kpa,a.bendahara,a.ppspm,f.nmdekon,g.nmkanwil,a.npwp,a.statusblu,
    a.email FROM dbdipa25.d_kpa a LEFT JOIN dbref.t_satker_2025 b ON a.kdsatker=b.kdsatker AND a.kddept=b.kddept 
    AND a.kdunit=b.kdunit LEFT JOIN dbref.t_kppn_2023 c ON b.kdkppn=c.kdkppn LEFT JOIN dbref.t_dept_2025 d 
    ON b.kddept=d.kddept LEFT JOIN dbref.t_unit_2025 e ON a.kddept=e.kddept AND b.kdunit=e.kdunit 
    LEFT JOIN dbref.t_dekon_2025 f ON a.kddekon=f.kddekon LEFT JOIN dbref.t_kanwil_2014 g 
    ON c.kdkanwil=g.kdkanwil WHERE a.kdsatker='${idSatker}' GROUP BY a.kdsatker ORDER BY a.kdsatker limit 1;
      
      `;
    const cleanedQuery = query.replace(/\n/g, " ").replace(/\s+/g, " ").trim();

    try {
      const response = await axiosJWT.post(
        process.env.NEXT_PUBLIC_GET_REFERENSI,
        { query: Encrypt(cleanedQuery) }
      );

      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (response.data.result.length === 0) {
        return null;
      }
      //   console.log("Response data:", response.data);

      // Map data pertama dari response ke format SatkerItem
      const mappedData = mapDbToSatkerItem(response.data.result[0]);
      return mappedData;
    } catch (error) {
      throw new Error("Gagal mengambil detail satker");
    }
  };

  return {
    cariSatker,
    ambilDetailSatker,
  };
};
