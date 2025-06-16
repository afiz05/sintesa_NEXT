"use client";

// Type definitions for Kementerian Query Generation
export interface KementerianQueryParams {
  // Switch state
  kementerianEnabled: boolean;

  // Form data
  kementerian: Set<string>;
  kementerianTampilan: string;
  cutOff?: string;

  // Report type
  selectedJenisLaporan: string;
}

export interface KementerianQueryConfig {
  selectColumns: string[];
  groupByColumns: string[];
  whereConditions: string[];
  needsJoin: boolean;
  joinType: "LEFT" | "INNER" | "NONE";
  mainTable: string;
  joinTable?: string;
  joinCondition?: string;
}

export class KementerianQueryGenerator {
  /**
   * Generate SQL query specifically for Kementerian-related queries
   */
  static generateQuery(params: KementerianQueryParams): string {
    const {
      kementerianEnabled,
      kementerian,
      kementerianTampilan,
      cutOff,
      selectedJenisLaporan,
    } = params;

    // Handle "Pagu Realisasi" report type
    if (selectedJenisLaporan === "Pagu Realisasi") {
      return this.generatePaguRealisasiQuery(params);
    }

    // Handle other report types
    return this.generateStandardQuery(params);
  }

  /**
   * Generate query configuration for Pagu Realisasi report
   */
  private static generatePaguRealisasiQuery(
    params: KementerianQueryParams
  ): string {
    const { kementerianEnabled, kementerian, kementerianTampilan, cutOff } =
      params;

    // Check if kementerian tampilan is "jangan_tampilkan" - return empty query
    if (kementerianEnabled && kementerianTampilan === "jangan_tampilkan") {
      return "SELECT 'No data to display' AS message";
    }

    const config = this.buildPaguRealisasiConfig(params);

    return this.buildQueryFromConfig(config, params);
  }

  /**
   * Generate query configuration for standard reports
   */
  private static generateStandardQuery(params: KementerianQueryParams): string {
    const config = this.buildStandardConfig(params);

    return this.buildQueryFromConfig(config, params);
  }

  /**
   * Build configuration for Pagu Realisasi queries
   */
  private static buildPaguRealisasiConfig(
    params: KementerianQueryParams
  ): KementerianQueryConfig {
    const { kementerianEnabled, kementerian, kementerianTampilan } = params;

    let selectColumns: string[] = [];
    let groupByColumns: string[] = [];
    let whereConditions: string[] = [];
    let needsJoin = false;
    let joinType: "LEFT" | "INNER" | "NONE" = "NONE";
    let mainTable = "monev2025.pagu_real_detail_harian_2025 a";
    let joinTable = "";
    let joinCondition = "";

    // Default case: if kementerian switch is not enabled, show kddept
    if (!kementerianEnabled) {
      selectColumns.push("a.kddept");
      groupByColumns.push("a.kddept");
    } else {
      // When kementerian switch is enabled, we want to show all departments
      needsJoin = true;
      joinType = "LEFT";
      joinTable = "dbref.t_dept_2023 b";
      joinCondition = "a.kddept = b.kddept";

      // Handle tampilan options when kementerian switch is enabled
      switch (kementerianTampilan) {
        case "kode":
          selectColumns.push("b.kddept");
          groupByColumns.push("b.kddept");
          break;
        case "uraian":
          selectColumns.push("b.nmdept");
          groupByColumns.push("b.nmdept");
          break;
        case "kode_uraian":
          selectColumns.push("b.kddept", "b.nmdept");
          groupByColumns.push("b.kddept", "b.nmdept");
          break;
        default:
          // Fallback to kode if tampilan not set
          selectColumns.push("b.kddept");
          groupByColumns.push("b.kddept");
      }
    }

    // Add the financial columns
    selectColumns.push(
      "ROUND(SUM(a.pagu)/1,0) AS PAGU_DIPA",
      "ROUND(SUM(a.real1 + a.real2 + a.real3 + a.real4 + a.real5 + a.real6 + a.real7 + a.real8 + a.real9 + a.real10 + a.real11 + a.real12)/1,0) AS REALISASI",
      "ROUND(SUM(a.blokir)/1,0) AS BLOKIR"
    );

    // Add WHERE conditions for specific kementerian selection
    if (kementerian.size > 0) {
      const kementerianList = Array.from(kementerian);
      const kementerianFilter = kementerianList
        .map((k: string) => `'${k}'`)
        .join(", ");
      whereConditions.push(`a.kddept IN (${kementerianFilter})`);
    }

    return {
      selectColumns,
      groupByColumns,
      whereConditions,
      needsJoin,
      joinType,
      mainTable,
      joinTable,
      joinCondition,
    };
  }

  /**
   * Build configuration for standard queries
   */
  private static buildStandardConfig(
    params: KementerianQueryParams
  ): KementerianQueryConfig {
    const { kementerianEnabled, kementerian, kementerianTampilan, cutOff } =
      params;

    let selectColumns: string[] = [];
    let whereConditions: string[] = ["1=1"];
    let needsJoin = false;
    let joinType: "LEFT" | "INNER" | "NONE" = "NONE";
    let mainTable = "monev2025.pagu_real_detail_harian_2025";
    let joinTable = "";
    let joinCondition = "";

    // Handle Kementerian columns based on switch AND tampilan setting
    if (
      kementerianEnabled &&
      kementerianTampilan &&
      kementerianTampilan !== "jangan_tampilkan"
    ) {
      switch (kementerianTampilan) {
        case "kode":
          selectColumns.push("kddept");
          break;
        case "uraian":
          selectColumns.push("nmdept");
          needsJoin = true;
          joinType = "LEFT";
          joinTable = "dbref.t_dept_2023";
          joinCondition = "a.kddept = b.kddept";
          break;
        case "kode_uraian":
          selectColumns.push("kddept", "nmdept");
          needsJoin = true;
          joinType = "LEFT";
          joinTable = "dbref.t_dept_2023";
          joinCondition = "a.kddept = b.kddept";
          break;
      }

      // Add WHERE condition only if specific kementerian are selected
      if (kementerian.size > 0) {
        const kementerianList = Array.from(kementerian);
        const kementerianFilter = kementerianList
          .map((k: string) => `'${k}'`)
          .join(", ");
        whereConditions.push(`kddept IN (${kementerianFilter})`);
      }
    }

    // Add cutOff filter only if value is set
    if (cutOff) {
      whereConditions.push(`cut_off = '${cutOff}'`);
    }

    // If no specific columns are selected, use SELECT *
    if (selectColumns.length === 0) {
      selectColumns.push("*");
    }

    return {
      selectColumns,
      groupByColumns: [], // Will be determined in buildQueryFromConfig
      whereConditions,
      needsJoin,
      joinType,
      mainTable,
      joinTable,
      joinCondition,
    };
  }

  /**
   * Build final SQL query from configuration
   */
  private static buildQueryFromConfig(
    config: KementerianQueryConfig,
    params: KementerianQueryParams
  ): string {
    const {
      selectColumns,
      groupByColumns,
      whereConditions,
      needsJoin,
      joinType,
      mainTable,
      joinTable,
      joinCondition,
    } = config;

    const { selectedJenisLaporan, kementerianEnabled, kementerian } = params;

    let query = "";

    // Handle Pagu Realisasi special case
    if (selectedJenisLaporan === "Pagu Realisasi") {
      if (needsJoin) {
        // Use data table as main table and LEFT JOIN with reference table
        query = `SELECT ${selectColumns.join(", ")} 
                 FROM ${mainTable}
                 ${joinType} JOIN ${joinTable} ON ${joinCondition}`;
      } else {
        // Simple query when kementerian switch is not enabled
        query = `SELECT ${selectColumns.join(", ")} 
                 FROM ${mainTable}`;
      }

      // Add WHERE conditions
      if (whereConditions.length > 0) {
        query += ` WHERE ${whereConditions.join(" AND ")}`;
      }

      // Add GROUP BY
      if (groupByColumns.length > 0) {
        query += ` GROUP BY ${groupByColumns.join(", ")}`;
      }

      return query;
    }

    // Handle standard queries
    const showAllDepartments = kementerianEnabled;

    if (showAllDepartments) {
      // Use reference table as main table and LEFT JOIN with data table to show all departments
      let departmentFilter = "";

      if (kementerian.size > 0) {
        // If specific departments are selected, filter by them
        const departmentList = Array.from(kementerian);
        departmentFilter = `WHERE b.kddept IN (${departmentList
          .map((d) => `'${d}'`)
          .join(", ")})`;
      }

      // Adjust select columns for LEFT JOIN scenario
      const selectColumns_prefixed = selectColumns
        .map((col) => {
          if (col === "*") return "a.*";
          if (col === "kddept") return "b.kddept";
          if (col === "nmdept") return "b.nmdept";
          return `a.${col}`;
        })
        .join(", ");

      query = `SELECT ${selectColumns_prefixed} 
               FROM dbref.t_dept_2023 b
               LEFT JOIN monev2025.pagu_real_detail_harian_2025 a ON b.kddept = a.kddept
               ${departmentFilter}`;
    } else {
      // Standard simple query
      const selectClause = selectColumns.join(", ");
      const whereClause = whereConditions.join(" AND ");

      if (needsJoin) {
        query = `SELECT ${selectClause} 
                 FROM ${mainTable} a
                 ${joinType} JOIN ${joinTable} b ON ${joinCondition}
                 WHERE ${whereClause}`;
      } else {
        query = `SELECT ${selectClause} 
                 FROM ${mainTable} 
                 WHERE ${whereClause}`;
      }
    }

    return query;
  }

  /**
   * Validate query parameters
   */
  static validateParams(params: KementerianQueryParams): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    // Check if kementerian is enabled but no tampilan is set
    if (params.kementerianEnabled && !params.kementerianTampilan) {
      errors.push(
        "Kementerian tampilan must be set when kementerian is enabled"
      );
    }

    // Check for valid tampilan options
    const validTampilan = ["kode", "uraian", "kode_uraian", "jangan_tampilkan"];
    if (
      params.kementerianTampilan &&
      !validTampilan.includes(params.kementerianTampilan)
    ) {
      errors.push("Invalid kementerian tampilan option");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Get query explanation/description
   */
  static getQueryExplanation(params: KementerianQueryParams): string {
    const {
      kementerianEnabled,
      kementerianTampilan,
      kementerian,
      selectedJenisLaporan,
    } = params;

    if (!kementerianEnabled) {
      return "Basic query without kementerian filtering";
    }

    if (kementerianTampilan === "jangan_tampilkan") {
      return "Kementerian data will not be displayed";
    }

    let explanation = `Query with kementerian ${kementerianTampilan} display`;

    if (kementerian.size > 0) {
      explanation += ` for ${kementerian.size} selected department(s)`;
    } else {
      explanation += " for all departments";
    }

    if (selectedJenisLaporan === "Pagu Realisasi") {
      explanation += " - Pagu Realisasi report format";
    }

    return explanation;
  }
}

export default KementerianQueryGenerator;
