"use client";

import { CutOffQueryGenerator } from "./CutOffQueryGenerator";

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
  selectedTahun: string;
  selectedPembulatan: string;
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
   * Generate dynamic table name based on selected year
   */
  private static getTableName(selectedTahun: string): string {
    return `monev${selectedTahun}.pagu_real_detail_harian_${selectedTahun}`;
  }

  /**
   * Get rounding divisor and format based on pembulatan selection
   */
  private static getRoundingConfig(selectedPembulatan: string): {
    divisor: number;
    formatSuffix: string;
  } {
    switch (selectedPembulatan.toLowerCase()) {
      case "rupiah":
        return { divisor: 1, formatSuffix: "" };
      case "ribu":
        return { divisor: 1000, formatSuffix: " (Ribu)" };
      case "juta":
        return { divisor: 1000000, formatSuffix: " (Juta)" };
      case "miliar":
        return { divisor: 1000000000, formatSuffix: " (Miliar)" };
      case "triliun":
        return { divisor: 1000000000000, formatSuffix: " (Triliun)" };
      default:
        return { divisor: 1, formatSuffix: "" };
    }
  }

  /**
   * Apply rounding to monetary columns in SELECT clause
   */
  private static applyRounding(
    columnName: string,
    selectedPembulatan: string
  ): string {
    const { divisor } = this.getRoundingConfig(selectedPembulatan);

    if (divisor === 1) {
      return columnName;
    }

    return `ROUND(${columnName} / ${divisor}, 2)`;
  }

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
    const {
      kementerianEnabled,
      kementerian,
      kementerianTampilan,
      cutOff,
      selectedTahun,
      selectedPembulatan,
    } = params;

    let selectColumns: string[] = [];
    let groupByColumns: string[] = [];
    let whereConditions: string[] = [];
    let needsJoin = false;
    let joinType: "LEFT" | "INNER" | "NONE" = "NONE";
    let mainTable = `${this.getTableName(selectedTahun)} a`;
    let joinTable = "";
    let joinCondition = "";

    // Default case: if kementerian switch is not enabled, show kddept
    if (!kementerianEnabled) {
      selectColumns.push("a.kddept");
      groupByColumns.push("a.kddept");
    } else {
      // When kementerian switch is enabled, handle different display options
      switch (kementerianTampilan) {
        case "kode":
          selectColumns.push("b.kddept");
          groupByColumns.push("b.kddept");
          needsJoin = true;
          joinType = "LEFT";
          joinTable = "dbref.t_dept_2023 b";
          joinCondition = "a.kddept = b.kddept";
          break;
        case "uraian":
          selectColumns.push("b.nmdept");
          groupByColumns.push("b.nmdept");
          needsJoin = true;
          joinType = "LEFT";
          joinTable = "dbref.t_dept_2023 b";
          joinCondition = "a.kddept = b.kddept";
          break;
        case "kode_uraian":
          selectColumns.push("b.kddept", "b.nmdept");
          groupByColumns.push("b.kddept", "b.nmdept");
          needsJoin = true;
          joinType = "LEFT";
          joinTable = "dbref.t_dept_2023 b";
          joinCondition = "a.kddept = b.kddept";
          break;
        default:
          // Fallback to kode if tampilan not set
          selectColumns.push("b.kddept");
          groupByColumns.push("b.kddept");
          needsJoin = true;
          joinType = "LEFT";
          joinTable = "dbref.t_dept_2023 b";
          joinCondition = "a.kddept = b.kddept";
      }
    }

    // Get realization sum expression based on cutoff month - always applied
    let realisasiExpression = "";
    if (cutOff) {
      const cutOffInfo = CutOffQueryGenerator.getCutOffInfo(cutOff);
      realisasiExpression = `a.${cutOffInfo.sumExpression}`;
    } else {
      // Fallback to full year if no cutoff provided (shouldn't happen now)
      realisasiExpression =
        "a.real1 + a.real2 + a.real3 + a.real4 + a.real5 + a.real6 + a.real7 + a.real8 + a.real9 + a.real10 + a.real11 + a.real12";
    }

    // Add the financial columns with cutoff-aware realization sum and pembulatan rounding
    selectColumns.push(
      `${this.applyRounding("SUM(a.pagu)", selectedPembulatan)} AS PAGU_DIPA`,
      `${this.applyRounding(
        `SUM(${realisasiExpression})`,
        selectedPembulatan
      )} AS REALISASI`,
      `${this.applyRounding("SUM(a.blokir)", selectedPembulatan)} AS BLOKIR`
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
    const {
      kementerianEnabled,
      kementerian,
      kementerianTampilan,
      cutOff,
      selectedTahun,
    } = params;

    let selectColumns: string[] = [];
    let whereConditions: string[] = ["1=1"];
    let needsJoin = false;
    let joinType: "LEFT" | "INNER" | "NONE" = "NONE";
    let mainTable = this.getTableName(selectedTahun);
    let joinTable = "";
    let joinCondition = "";

    // Add default columns
    selectColumns.push("*");

    // Add WHERE conditions for specific kementerian selection
    if (kementerian.size > 0) {
      const kementerianList = Array.from(kementerian);
      const kementerianFilter = kementerianList
        .map((k: string) => `'${k}'`)
        .join(", ");
      whereConditions.push(`kddept IN (${kementerianFilter})`);
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

      // Apply cutoff filter if specified
      if (params.cutOff) {
        query = CutOffQueryGenerator.addCutOffFilter(query, {
          cutOffEnabled: true,
          cutOff: params.cutOff,
          selectedJenisLaporan: params.selectedJenisLaporan,
          selectedTahun: params.selectedTahun,
          selectedPembulatan: params.selectedPembulatan,
        });
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
               LEFT JOIN ${KementerianQueryGenerator.getTableName(
                 params.selectedTahun
               )} a ON b.kddept = a.kddept
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

    // Apply cutoff filter if specified
    if (params.cutOff) {
      query = CutOffQueryGenerator.addCutOffFilter(query, {
        cutOffEnabled: true,
        cutOff: params.cutOff,
        selectedJenisLaporan: params.selectedJenisLaporan,
        selectedTahun: params.selectedTahun,
        selectedPembulatan: params.selectedPembulatan,
      });
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
