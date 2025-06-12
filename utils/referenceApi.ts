import axios from "axios";

// Types for reference data
export interface DepartmentData {
  kddept: string;
  nmdept: string;
}

export interface SatkerData {
  kdsatker: string;
  nmsatker: string;
  kddept: string;
  kdunit?: string;
}

export interface EselonData {
  kdunit: string;
  nmunit: string;
  kddept: string;
}

export interface MasterDataResponse<T = any> {
  success: boolean;
  data: T[];
  error?: string;
  message?: string;
}

// API service for reference data
export class ReferenceApiService {
  // Get departments from t_dept_2023 table
  static async getDepartments(): Promise<DepartmentData[]> {
    try {
      // Make the API call to the new simple endpoint
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_LOCAL_MASTER_DEPARTMENTS}`,
        { withCredentials: true }
      );

      const data: MasterDataResponse<DepartmentData> = response.data;

      if (data.success) {
        return data.data || [];
      } else {
        throw new Error(data.error || "Failed to fetch departments");
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
      throw new Error("Failed to fetch departments");
    }
  }
  // Get work units (satker) based on selected departments and optionally eselon units
  static async getSatkerByDepartments(
    departments: string[],
    eselon?: string[]
  ): Promise<SatkerData[]> {
    try {
      if (departments.length === 0) return [];

      // Build query parameters
      let queryParams = `departments=${departments.join(",")}`;
      if (eselon && eselon.length > 0) {
        queryParams += `&eselon=${eselon.join(",")}`;
      }

      // Make the API call with departments and optional eselon as query parameters
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_LOCAL_MASTER_SATKER}?${queryParams}`,
        { withCredentials: true }
      );
      const data: MasterDataResponse<SatkerData> = response.data;

      if (data.success) {
        return data.data || [];
      } else {
        throw new Error(data.error || "Failed to fetch satker");
      }
    } catch (error) {
      console.error("Error fetching satker:", error);
      throw new Error("Failed to fetch satker data");
    }
  }

  // Get Eselon 1 (units) based on selected departments
  static async getEselonByDepartments(
    departments: string[]
  ): Promise<EselonData[]> {
    try {
      if (departments.length === 0) return [];

      // Make the API call with departments as query parameter
      const response = await axios.get(
        `${
          process.env.NEXT_PUBLIC_LOCAL_MASTER_ESELON
        }?departments=${departments.join(",")}`,
        { withCredentials: true }
      );
      const data: MasterDataResponse<EselonData> = response.data;

      if (data.success) {
        return data.data || [];
      } else {
        throw new Error(data.error || "Failed to fetch eselon 1");
      }
    } catch (error) {
      console.error("Error fetching eselon 1:", error);
      throw new Error("Failed to fetch eselon 1 data");
    }
  }
  // Get all work units (satker) without filtering by departments
  static async getAllSatker(eselon?: string[]): Promise<SatkerData[]> {
    try {
      // Try first with the 'all=true' parameter
      let queryParams = "all=true";
      if (eselon && eselon.length > 0) {
        queryParams += `&eselon=${eselon.join(",")}`;
      }

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_LOCAL_MASTER_SATKER}?${queryParams}`,
          { withCredentials: true }
        );
        const data: MasterDataResponse<SatkerData> = response.data;

        if (data.success) {
          return data.data || [];
        } else {
          throw new Error(data.error || "Failed to fetch all satker");
        }
      } catch (error) {
        // Fallback: get all departments first, then get satker for all departments
        console.log("Fallback: Getting all satker via departments");
        const departments = await this.getDepartments();
        const allDepartmentCodes = departments.map((dept) => dept.kddept);

        if (allDepartmentCodes.length > 0) {
          return await this.getSatkerByDepartments(allDepartmentCodes, eselon);
        } else {
          throw new Error("No departments available for satker loading");
        }
      }
    } catch (error) {
      console.error("Error fetching all satker:", error);
      throw new Error("Failed to fetch all satker data");
    }
  }
}
