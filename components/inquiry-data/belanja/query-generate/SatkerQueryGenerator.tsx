// Satker Query Generator
// Handles Satker (Work Unit) specific query generation with hierarchical structure
// Supports both single-filter and multi-filter (combination) scenarios

import { CutOffQueryGenerator } from "./CutOffQueryGenerator";

export interface SatkerQueryParams {
  satkerEnabled: boolean;
  satker: Set<string>;
  satkerTampilan: string;
  cutOff: string;
  selectedJenisLaporan: string;
  selectedTahun: string;
  selectedPembulatan: string;
}

export interface SatkerQueryConfig {
  selectColumns: string[];
  groupByColumns: string[];
  whereConditions: string[];
  needsJoin: boolean;
  joinType: "LEFT" | "INNER" | "NONE";
  mainTable: string;
  joinTable: string;
  joinCondition: string;
  joinClauses?: string[]; // For multi-filter scenarios
}

// Extended interface for multi-filter combinations involving Satker
export interface SatkerCombinedQueryParams extends SatkerQueryParams {
  // Additional filter states for combinations
  kementerianEnabled?: boolean;
  kementerian?: Set<string>;
  kementerianTampilan?: string;
  eselonIEnabled?: boolean;
  eselonI?: Set<string>;
  eselonITampilan?: string;
}

export class SatkerQueryGenerator {
  private static readonly SATKER_REFERENCE_TABLE = "dbref.t_satker_2025";
  private static readonly KEMENTERIAN_REFERENCE_TABLE = "dbref.t_dept_2023";
  private static readonly ESELON_REFERENCE_TABLE = "dbref.t_unit_2025";

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
   * Main entry point - supports both single and multi-filter scenarios
   */
  static generateQuery(
    params: SatkerQueryParams | SatkerCombinedQueryParams,
    customConfig: Partial<SatkerQueryConfig> = {}
  ): string {
    const {
      satkerEnabled,
      satker,
      satkerTampilan,
      cutOff,
      selectedJenisLaporan,
    } = params;
    console.log("🔧 Satker Query Generator Input:", {
      satkerEnabled,
      satker: Array.from(satker),
      satkerSize: satker.size,
      satkerTampilan,
      cutOff,
      selectedJenisLaporan,
      selectedTahun: params.selectedTahun,
      selectedPembulatan: params.selectedPembulatan,
    }); // Validate input
    if (!satkerEnabled) {
      throw new Error("Satker is not enabled");
    }

    // Note: We don't return early for "jangan_tampilkan" anymore
    // Instead, we handle it in the config builders to generate proper queries

    // Detect if this is part of a multi-filter scenario
    const isMultiFilter = this.isMultiFilterScenario(params);

    if (isMultiFilter) {
      return this.generateCombinedQuery(params as SatkerCombinedQueryParams);
    }

    // Single satker filter scenario
    const isPaguRealisasi = selectedJenisLaporan === "Pagu Realisasi";

    let config: SatkerQueryConfig;
    if (isPaguRealisasi) {
      config = this.buildPaguRealisasiConfig(params);
    } else {
      config = this.buildStandardConfig(params);
    }

    // Apply custom config overrides
    config = { ...config, ...customConfig };

    // Build the final query
    const finalQuery = this.buildQueryFromConfig(config, params);

    console.log("✅ Satker Query Generated:", finalQuery);
    return finalQuery;
  }

  /**
   * Detect if this is a multi-filter scenario
   */
  private static isMultiFilterScenario(
    params: SatkerQueryParams | SatkerCombinedQueryParams
  ): boolean {
    const combinedParams = params as SatkerCombinedQueryParams;
    return !!(
      combinedParams.kementerianEnabled || combinedParams.eselonIEnabled
    );
  }

  /**
   * Generate query for multi-filter combinations involving Satker
   */
  static generateCombinedQuery(params: SatkerCombinedQueryParams): string {
    const { selectedJenisLaporan } = params;

    console.log("🔄 Generating combined query with Satker");

    // Determine if this is a Pagu Realisasi query
    const isPaguRealisasi = selectedJenisLaporan === "Pagu Realisasi";

    let config: SatkerQueryConfig;
    if (isPaguRealisasi) {
      config = this.buildCombinedPaguRealisasiConfig(params);
    } else {
      config = this.buildCombinedStandardConfig(params);
    }

    return this.buildQueryFromConfig(config, params);
  }

  /**
   * Build configuration for Pagu Realisasi queries
   */
  private static buildPaguRealisasiConfig(
    params: SatkerQueryParams
  ): SatkerQueryConfig {
    const {
      satkerEnabled,
      satker,
      satkerTampilan,
      cutOff,
      selectedTahun,
      selectedPembulatan,
    } = params;

    let selectColumns: string[] = [];
    let groupByColumns: string[] = [];
    let whereConditions: string[] = ["1=1"]; // Start with default condition
    let needsJoin = false;
    let joinType: "LEFT" | "INNER" | "NONE" = "NONE";
    let mainTable = `${this.getTableName(selectedTahun)} a`;
    let joinTable = "";
    let joinCondition = ""; // Default case: if satker switch is not enabled, show kdsatker
    if (!satkerEnabled) {
      selectColumns.push("a.kdsatker");
      groupByColumns.push("a.kdsatker");
    } else {
      // When satker switch is enabled, handle different display options
      switch (satkerTampilan) {
        case "kode":
          selectColumns.push("b.kdsatker");
          groupByColumns.push("b.kdsatker");
          needsJoin = true;
          joinType = "LEFT";
          joinTable = `${this.SATKER_REFERENCE_TABLE} b`;
          joinCondition = "a.kdsatker = b.kdsatker";
          break;
        case "uraian":
          selectColumns.push("b.nmsatker");
          groupByColumns.push("b.nmsatker");
          needsJoin = true;
          joinType = "LEFT";
          joinTable = `${this.SATKER_REFERENCE_TABLE} b`;
          joinCondition = "a.kdsatker = b.kdsatker";
          break;
        case "kode_uraian":
          selectColumns.push("b.kdsatker", "b.nmsatker");
          groupByColumns.push("b.kdsatker", "b.nmsatker");
          needsJoin = true;
          joinType = "LEFT";
          joinTable = `${this.SATKER_REFERENCE_TABLE} b`;
          joinCondition = "a.kdsatker = b.kdsatker";
          break;
        case "jangan_tampilkan":
          // Don't add any satker columns - will aggregate all data
          needsJoin = false;
          joinType = "NONE";
          joinTable = "";
          joinCondition = "";
          break;
        default:
          // Fallback to kode if tampilan not set
          selectColumns.push("b.kdsatker");
          groupByColumns.push("b.kdsatker");
          needsJoin = true;
          joinType = "LEFT";
          joinTable = `${this.SATKER_REFERENCE_TABLE} b`;
          joinCondition = "a.kdsatker = b.kdsatker";
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

    // Add the financial columns for Pagu Realisasi with cutoff-aware realization sum and pembulatan rounding
    selectColumns.push(
      `${this.applyRounding("SUM(a.pagu)", selectedPembulatan)} AS PAGU_DIPA`,
      `${this.applyRounding(
        `SUM(${realisasiExpression})`,
        selectedPembulatan
      )} AS REALISASI`,
      `${this.applyRounding("SUM(a.blokir)", selectedPembulatan)} AS BLOKIR`
    ); // Add WHERE conditions for specific satker selection
    if (satker.size > 0) {
      const satkerList = Array.from(satker);
      const satkerFilter = satkerList.map((k: string) => `'${k}'`).join(", ");
      whereConditions.push(`a.kdsatker IN (${satkerFilter})`);
    }
    // Note: When satker.size === 0, we don't add any satker filter,
    // which means the query will aggregate across all satker

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
   * Build configuration for combined Pagu Realisasi queries (multi-filter scenarios)
   */
  private static buildCombinedPaguRealisasiConfig(
    params: SatkerCombinedQueryParams
  ): SatkerQueryConfig {
    const {
      satkerEnabled,
      satker,
      satkerTampilan,
      kementerianEnabled,
      kementerian,
      kementerianTampilan,
      eselonIEnabled,
      eselonI,
      eselonITampilan,
      cutOff,
      selectedTahun,
      selectedPembulatan,
    } = params;

    let selectColumns: string[] = [];
    let groupByColumns: string[] = [];
    let whereConditions: string[] = ["1=1"];
    let joinClauses: string[] = [];

    const mainTable = `${this.getTableName(selectedTahun)} a`;

    // Handle Kementerian display (if enabled)
    if (kementerianEnabled && kementerianTampilan !== "jangan_tampilkan") {
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
      }
      joinClauses.push(
        `LEFT JOIN ${this.KEMENTERIAN_REFERENCE_TABLE} b ON a.kddept = b.kddept`
      );
    }

    // Handle EselonI display (if enabled)
    if (eselonIEnabled && eselonITampilan !== "jangan_tampilkan") {
      switch (eselonITampilan) {
        case "kode":
          selectColumns.push("c.kdunit");
          groupByColumns.push("c.kdunit");
          break;
        case "uraian":
          selectColumns.push("c.nmunit");
          groupByColumns.push("c.nmunit");
          break;
        case "kode_uraian":
          selectColumns.push("c.kdunit", "c.nmunit");
          groupByColumns.push("c.kdunit", "c.nmunit");
          break;
      }
      joinClauses.push(
        `LEFT JOIN ${this.ESELON_REFERENCE_TABLE} c ON a.kdunit = c.kdunit AND a.kddept = c.kddept`
      );
    }

    // Handle Satker display (always enabled in this context)
    if (satkerTampilan !== "jangan_tampilkan") {
      switch (satkerTampilan) {
        case "kode":
          selectColumns.push("d.kdsatker");
          groupByColumns.push("d.kdsatker");
          break;
        case "uraian":
          selectColumns.push("d.nmsatker");
          groupByColumns.push("d.nmsatker");
          break;
        case "kode_uraian":
          selectColumns.push("d.kdsatker", "d.nmsatker");
          groupByColumns.push("d.kdsatker", "d.nmsatker");
          break;
      }
      joinClauses.push(
        `LEFT JOIN ${this.SATKER_REFERENCE_TABLE} d ON a.kdsatker = d.kdsatker AND a.kdunit = d.kdunit AND a.kddept = d.kddept`
      );
    }

    // Get realization sum expression based on cutoff month
    let realisasiExpression = "";
    if (cutOff) {
      const cutOffInfo = CutOffQueryGenerator.getCutOffInfo(cutOff);
      realisasiExpression = `a.${cutOffInfo.sumExpression}`;
    } else {
      realisasiExpression =
        "a.real1 + a.real2 + a.real3 + a.real4 + a.real5 + a.real6 + a.real7 + a.real8 + a.real9 + a.real10 + a.real11 + a.real12";
    }

    // Build conditional filters for proper hierarchical matching
    const conditionalFilters: string[] = [];

    if (kementerianEnabled && kementerian && kementerian.size > 0) {
      const kementerianList = Array.from(kementerian)
        .map((k) => `'${k}'`)
        .join(", ");
      conditionalFilters.push(`a.kddept IN (${kementerianList})`);
    }

    if (eselonIEnabled && eselonI && eselonI.size > 0) {
      const eselonIList = Array.from(eselonI)
        .map((k) => `'${k}'`)
        .join(", ");
      conditionalFilters.push(`a.kdunit IN (${eselonIList})`);
    }

    if (satker.size > 0) {
      const satkerList = Array.from(satker)
        .map((k) => `'${k}'`)
        .join(", ");
      conditionalFilters.push(`a.kdsatker IN (${satkerList})`);
    }

    // Apply conditional SUM for proper hierarchical filtering
    let paguCondition = "a.pagu";
    let realisasiCondition = realisasiExpression;
    let blokirCondition = "a.blokir";

    if (conditionalFilters.length > 0) {
      const conditionClause = conditionalFilters.join(" AND ");
      paguCondition = `CASE WHEN ${conditionClause} THEN a.pagu ELSE 0 END`;
      realisasiCondition = `CASE WHEN ${conditionClause} THEN ${realisasiExpression} ELSE 0 END`;
      blokirCondition = `CASE WHEN ${conditionClause} THEN a.blokir ELSE 0 END`;
    }

    // Add financial columns with rounding
    selectColumns.push(
      `${this.applyRounding(
        `SUM(${paguCondition})`,
        selectedPembulatan
      )} AS PAGU_DIPA`,
      `${this.applyRounding(
        `SUM(${realisasiCondition})`,
        selectedPembulatan
      )} AS REALISASI`,
      `${this.applyRounding(
        `SUM(${blokirCondition})`,
        selectedPembulatan
      )} AS BLOKIR`
    );

    // Add WHERE conditions for selections
    whereConditions.push(...conditionalFilters);

    return {
      selectColumns,
      groupByColumns,
      whereConditions,
      needsJoin: joinClauses.length > 0,
      joinType: "LEFT",
      mainTable,
      joinTable: "", // Will be handled by joinClauses
      joinCondition: "", // Will be handled by joinClauses
      joinClauses,
    };
  }

  /**
   * Build configuration for combined standard queries (multi-filter scenarios)
   */
  private static buildCombinedStandardConfig(
    params: SatkerCombinedQueryParams
  ): SatkerQueryConfig {
    const {
      satkerEnabled,
      satker,
      satkerTampilan,
      kementerianEnabled,
      kementerian,
      kementerianTampilan,
      eselonIEnabled,
      eselonI,
      eselonITampilan,
      selectedTahun,
    } = params;

    let selectColumns: string[] = [];
    let whereConditions: string[] = ["1=1"];
    let joinClauses: string[] = [];

    const mainTable = `${this.getTableName(selectedTahun)} a`;

    // Handle Kementerian columns (if enabled)
    if (
      kementerianEnabled &&
      kementerianTampilan &&
      kementerianTampilan !== "jangan_tampilkan"
    ) {
      switch (kementerianTampilan) {
        case "kode":
          selectColumns.push("a.kddept");
          break;
        case "uraian":
          selectColumns.push("b.nmdept");
          joinClauses.push(
            `LEFT JOIN ${this.KEMENTERIAN_REFERENCE_TABLE} b ON a.kddept = b.kddept`
          );
          break;
        case "kode_uraian":
          selectColumns.push("a.kddept", "b.nmdept");
          joinClauses.push(
            `LEFT JOIN ${this.KEMENTERIAN_REFERENCE_TABLE} b ON a.kddept = b.kddept`
          );
          break;
      }
    }

    // Handle EselonI columns (if enabled)
    if (
      eselonIEnabled &&
      eselonITampilan &&
      eselonITampilan !== "jangan_tampilkan"
    ) {
      switch (eselonITampilan) {
        case "kode":
          selectColumns.push("a.kdunit");
          break;
        case "uraian":
          selectColumns.push("c.nmunit");
          joinClauses.push(
            `LEFT JOIN ${this.ESELON_REFERENCE_TABLE} c ON a.kdunit = c.kdunit AND a.kddept = c.kddept`
          );
          break;
        case "kode_uraian":
          selectColumns.push("a.kdunit", "c.nmunit");
          joinClauses.push(
            `LEFT JOIN ${this.ESELON_REFERENCE_TABLE} c ON a.kdunit = c.kdunit AND a.kddept = c.kddept`
          );
          break;
      }
    }

    // Handle Satker columns (always enabled in this context)
    if (satkerTampilan && satkerTampilan !== "jangan_tampilkan") {
      switch (satkerTampilan) {
        case "kode":
          selectColumns.push("a.kdsatker");
          break;
        case "uraian":
          selectColumns.push("d.nmsatker");
          joinClauses.push(
            `LEFT JOIN ${this.SATKER_REFERENCE_TABLE} d ON a.kdsatker = d.kdsatker AND a.kdunit = d.kdunit AND a.kddept = d.kddept`
          );
          break;
        case "kode_uraian":
          selectColumns.push("a.kdsatker", "d.nmsatker");
          joinClauses.push(
            `LEFT JOIN ${this.SATKER_REFERENCE_TABLE} d ON a.kdsatker = d.kdsatker AND a.kdunit = d.kdunit AND a.kddept = d.kddept`
          );
          break;
      }
    }

    // If no specific columns, show all
    if (selectColumns.length === 0) {
      selectColumns.push("*");
    }

    // Add WHERE conditions for selections
    if (kementerianEnabled && kementerian && kementerian.size > 0) {
      const kementerianList = Array.from(kementerian)
        .map((k) => `'${k}'`)
        .join(", ");
      whereConditions.push(`a.kddept IN (${kementerianList})`);
    }

    if (eselonIEnabled && eselonI && eselonI.size > 0) {
      const eselonIList = Array.from(eselonI)
        .map((k) => `'${k}'`)
        .join(", ");
      whereConditions.push(`a.kdunit IN (${eselonIList})`);
    }

    if (satker.size > 0) {
      const satkerList = Array.from(satker)
        .map((k) => `'${k}'`)
        .join(", ");
      whereConditions.push(`a.kdsatker IN (${satkerList})`);
    }

    return {
      selectColumns,
      groupByColumns: [],
      whereConditions,
      needsJoin: joinClauses.length > 0,
      joinType: "LEFT",
      mainTable,
      joinTable: "", // Will be handled by joinClauses
      joinCondition: "", // Will be handled by joinClauses
      joinClauses,
    };
  }
  /**
   * Build configuration for standard queries
   */
  private static buildStandardConfig(
    params: SatkerQueryParams
  ): SatkerQueryConfig {
    const { satker, selectedTahun } = params;

    let selectColumns: string[] = [];
    let whereConditions: string[] = ["1=1"];
    let needsJoin = false;
    let joinType: "LEFT" | "INNER" | "NONE" = "NONE";
    let mainTable = this.getTableName(selectedTahun);
    let joinTable = "";
    let joinCondition = "";

    // Add default columns (simplified like KementerianQueryGenerator)
    selectColumns.push("*");

    // Add WHERE conditions for specific satker selection
    if (satker.size > 0) {
      const satkerList = Array.from(satker);
      const satkerFilter = satkerList.map((k: string) => `'${k}'`).join(", ");
      whereConditions.push(`kdsatker IN (${satkerFilter})`);
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
   * Build the final SQL query from configuration
   */ private static buildQueryFromConfig(
    config: SatkerQueryConfig,
    params: SatkerQueryParams | SatkerCombinedQueryParams
  ): string {
    const { cutOff, selectedJenisLaporan } = params;

    console.log("🛠️ Building query from config:", {
      selectColumns: config.selectColumns,
      groupByColumns: config.groupByColumns,
      whereConditions: config.whereConditions,
      needsJoin: config.needsJoin,
      cutOff,
      selectedJenisLaporan,
    });

    // Build SELECT clause
    const selectClause = config.selectColumns.join(", ");

    if (!selectClause || selectClause.trim() === "") {
      console.error("❌ Empty SELECT clause detected!");
      throw new Error("Invalid query: Empty SELECT clause");
    }

    // Build FROM clause with potential JOINs
    let fromClause = config.mainTable;

    // Handle multi-filter scenarios with joinClauses
    if (config.joinClauses && config.joinClauses.length > 0) {
      fromClause += ` ${config.joinClauses.join(" ")}`;
    } else if (config.needsJoin && config.joinType !== "NONE") {
      // Handle single-filter scenarios with traditional join
      fromClause += ` ${config.joinType} JOIN ${config.joinTable} ON ${config.joinCondition}`;
    }

    // Build WHERE clause
    let whereConditions = [...config.whereConditions]; // Add cut-off date filtering (only for non-Pagu Realisasi queries)
    // For Pagu Realisasi, cutoff is already handled in the SUM expression
    if (
      cutOff &&
      cutOff !== "semua" &&
      selectedJenisLaporan !== "Pagu Realisasi"
    ) {
      const cutOffMap: Record<string, string> = {
        januari: "01",
        februari: "02",
        maret: "03",
        april: "04",
        mei: "05",
        juni: "06",
        juli: "07",
        agustus: "08",
        september: "09",
        oktober: "10",
        november: "11",
        desember: "12",
      };

      const monthCode = cutOffMap[cutOff.toLowerCase()];
      if (monthCode) {
        const prefix =
          config.needsJoin || config.joinClauses?.length ? "a." : "";
        whereConditions.push(`${prefix}cut_off = '${monthCode}'`);
      }
    }

    // Add jenis laporan filtering (if not "semua" and not Pagu Realisasi)
    if (
      selectedJenisLaporan &&
      selectedJenisLaporan !== "semua" &&
      selectedJenisLaporan !== "Pagu Realisasi"
    ) {
      const prefix = config.needsJoin || config.joinClauses?.length ? "a." : "";
      whereConditions.push(
        `${prefix}jenis_laporan = '${selectedJenisLaporan}'`
      );
    }

    // Build GROUP BY clause
    let groupByClause = "";
    if (config.groupByColumns.length > 0) {
      groupByClause = ` GROUP BY ${config.groupByColumns.join(", ")}`;
    }

    // Construct final query - only add WHERE if there are meaningful conditions
    let query = `SELECT ${selectClause} FROM ${fromClause}`;

    // Filter out default "1=1" if there are other conditions
    const meaningfulConditions = whereConditions.filter(
      (condition) => condition !== "1=1"
    );
    if (meaningfulConditions.length > 0) {
      query += ` WHERE ${meaningfulConditions.join(" AND ")}`;
    }
    query += `${groupByClause};`;

    console.log("✅ Final Satker Query Generated:", query);
    return query;
  }

  /**
   * Gets example usage patterns
   */
  static getExamples(): Record<string, SatkerQueryParams> {
    return {
      "Satker Code only": {
        satkerEnabled: true,
        satker: new Set(["123456"]),
        satkerTampilan: "kode",
        cutOff: "januari",
        selectedJenisLaporan: "semua",
        selectedTahun: "2025",
        selectedPembulatan: "rupiah",
      },
      "Satker Description only": {
        satkerEnabled: true,
        satker: new Set<string>(),
        satkerTampilan: "uraian",
        cutOff: "desember",
        selectedJenisLaporan: "semua",
        selectedTahun: "2025",
        selectedPembulatan: "miliar",
      },
      "Multiple Satker with Code and Description": {
        satkerEnabled: true,
        satker: new Set(["123456", "234567", "345678"]),
        satkerTampilan: "kode_uraian",
        cutOff: "juni",
        selectedJenisLaporan: "semua",
        selectedTahun: "2025",
        selectedPembulatan: "juta",
      },
      "Hide Satker in results": {
        satkerEnabled: true,
        satker: new Set(["123456"]),
        satkerTampilan: "jangan_tampilkan",
        cutOff: "semua",
        selectedJenisLaporan: "semua",
        selectedTahun: "2025",
        selectedPembulatan: "rupiah",
      },
      "Pagu Realisasi with Satker grouping": {
        satkerEnabled: true,
        satker: new Set<string>(),
        satkerTampilan: "kode_uraian",
        cutOff: "desember",
        selectedJenisLaporan: "Pagu Realisasi",
        selectedTahun: "2025",
        selectedPembulatan: "miliar",
      },
    };
  }
}
