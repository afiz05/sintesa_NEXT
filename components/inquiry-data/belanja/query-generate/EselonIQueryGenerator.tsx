// EselonI Query Generator
// Modular query generation for EselonI-specific filters and displays

import { CutOffQueryGenerator } from "./CutOffQueryGenerator";

export interface EselonIQueryParams {
  eselonIEnabled: boolean;
  eselonI: Set<string>;
  eselonITampilan: string;
  cutOff: string;
  selectedJenisLaporan: string;
  selectedTahun: string;
  selectedPembulatan: string;
}

export interface EselonIQueryConfig {
  selectColumns: string[];
  groupByColumns: string[];
  whereConditions: string[];
  needsJoin: boolean;
  joinType: "LEFT" | "INNER" | "NONE";
  mainTable: string;
  joinTable: string;
  joinCondition: string;
}

export class EselonIQueryGenerator {
  private static readonly ESELON_REFERENCE_TABLE = "dbref.t_unit_2025"; // Updated to use t_unit_2025

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
   * Generates SQL query for EselonI-specific filtering and display
   */
  static generateQuery(
    params: EselonIQueryParams,
    customConfig: Partial<EselonIQueryConfig> = {}
  ): string {
    const {
      eselonIEnabled,
      eselonI,
      eselonITampilan,
      cutOff,
      selectedJenisLaporan,
    } = params;

    console.log("🔧 EselonI Query Generator Input:", {
      eselonIEnabled,
      eselonI: Array.from(eselonI),
      eselonITampilan,
      cutOff,
      selectedJenisLaporan,
    });

    // Validate input
    if (!eselonIEnabled) {
      throw new Error("EselonI is not enabled");
    }

    // Check if eselonI tampilan is "jangan_tampilkan" - return empty query
    if (eselonIEnabled && eselonITampilan === "jangan_tampilkan") {
      return "SELECT 'No data to display' AS message";
    }

    // Determine if this is a Pagu Realisasi query (similar to Kementerian logic)
    const isPaguRealisasi = selectedJenisLaporan === "Pagu Realisasi";

    let config: EselonIQueryConfig;
    if (isPaguRealisasi) {
      config = this.buildPaguRealisasiConfig(params);
    } else {
      config = this.buildStandardConfig(params);
    }

    // Apply custom config overrides
    config = { ...config, ...customConfig };

    // Build the final query
    const finalQuery = this.buildQueryFromConfig(config, params);

    console.log("✅ EselonI Query Generated:", finalQuery);
    return finalQuery;
  }
  /**
   * Build configuration for Pagu Realisasi queries
   */
  private static buildPaguRealisasiConfig(
    params: EselonIQueryParams
  ): EselonIQueryConfig {
    const {
      eselonIEnabled,
      eselonI,
      eselonITampilan,
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
    let joinCondition = ""; // Default case: if eselonI switch is not enabled, show kdunit
    if (!eselonIEnabled) {
      selectColumns.push("a.kdunit");
      groupByColumns.push("a.kdunit");
    } else {
      // When eselonI switch is enabled, handle different display options
      needsJoin = true;
      joinType = "LEFT";
      joinTable = `${this.ESELON_REFERENCE_TABLE} b`;
      joinCondition = "a.kdunit = b.kdunit AND a.kddept = b.kddept";

      // Handle tampilan options when eselonI switch is enabled
      switch (eselonITampilan) {
        case "kode":
          selectColumns.push("b.kdunit");
          groupByColumns.push("b.kdunit");
          break;
        case "uraian":
          selectColumns.push("b.nmunit");
          groupByColumns.push("b.nmunit");
          break;
        case "kode_uraian":
          selectColumns.push("b.kdunit", "b.nmunit");
          groupByColumns.push("b.kdunit", "b.nmunit");
          break;
        default:
          // Fallback to kode if tampilan not set
          selectColumns.push("b.kdunit");
          groupByColumns.push("b.kdunit");
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
    } // Add the financial columns for Pagu Realisasi with cutoff-aware realization sum and pembulatan rounding
    selectColumns.push(
      `${this.applyRounding("SUM(a.pagu)", selectedPembulatan)} AS PAGU_DIPA`,
      `${this.applyRounding(
        `SUM(${realisasiExpression})`,
        selectedPembulatan
      )} AS REALISASI`,
      `${this.applyRounding("SUM(a.blokir)", selectedPembulatan)} AS BLOKIR`
    ); // Add WHERE conditions for specific eselonI selection
    if (eselonI.size > 0) {
      const eselonIList = Array.from(eselonI);
      const eselonIFilter = eselonIList.map((k: string) => `'${k}'`).join(", ");
      whereConditions.push(`a.kdunit IN (${eselonIFilter})`);
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
    params: EselonIQueryParams
  ): EselonIQueryConfig {
    const { eselonIEnabled, eselonI, eselonITampilan, selectedTahun } = params;

    let selectColumns: string[] = [];
    let whereConditions: string[] = ["1=1"];
    let groupByColumns: string[] = [];
    let needsJoin = false;
    let joinType: "LEFT" | "INNER" | "NONE" = "NONE";
    let mainTable = this.getTableName(selectedTahun);
    let joinTable = "";
    let joinCondition = ""; // Handle EselonI columns based on switch AND tampilan setting
    if (
      eselonIEnabled &&
      eselonITampilan &&
      eselonITampilan !== "jangan_tampilkan"
    ) {
      switch (eselonITampilan) {
        case "kode":
          selectColumns.push("kdunit");
          break;
        case "uraian":
          selectColumns.push("b.nmunit");
          needsJoin = true;
          joinType = "LEFT";
          joinTable = this.ESELON_REFERENCE_TABLE;
          joinCondition = "a.kdunit = b.kdunit AND a.kddept = b.kddept";
          mainTable = `${this.getTableName(selectedTahun)} a`;
          joinTable = `${this.ESELON_REFERENCE_TABLE} b`;
          break;
        case "kode_uraian":
          selectColumns.push("a.kdunit", "b.nmunit");
          needsJoin = true;
          joinType = "LEFT";
          joinTable = this.ESELON_REFERENCE_TABLE;
          joinCondition = "a.kdunit = b.kdunit AND a.kddept = b.kddept";
          mainTable = `${this.getTableName(selectedTahun)} a`;
          joinTable = `${this.ESELON_REFERENCE_TABLE} b`;
          break;
      } // Add WHERE condition only if specific eselonI are selected
      if (eselonI.size > 0) {
        const eselonIList = Array.from(eselonI);
        const eselonIFilter = eselonIList
          .map((k: string) => `'${k}'`)
          .join(", ");
        const prefix = needsJoin ? "a." : "";
        whereConditions.push(`${prefix}kdunit IN (${eselonIFilter})`);
      }
    } else if (!eselonIEnabled || eselonITampilan === "jangan_tampilkan") {
      // When eselonI switch is OFF or tampilan is "jangan_tampilkan", show all columns
      selectColumns.push("*");
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
   * Build the final SQL query from configuration
   */
  private static buildQueryFromConfig(
    config: EselonIQueryConfig,
    params: EselonIQueryParams
  ): string {
    const { cutOff, selectedJenisLaporan } = params;

    // Build SELECT clause
    const selectClause = config.selectColumns.join(", ");

    // Build FROM clause with potential JOINs
    let fromClause = config.mainTable;
    if (config.needsJoin && config.joinType !== "NONE") {
      fromClause += ` ${config.joinType} JOIN ${config.joinTable} ON ${config.joinCondition}`;
    }

    // Build WHERE clause
    let whereConditions = [...config.whereConditions];

    // Add cut-off date filtering
    if (cutOff && cutOff !== "semua") {
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

      const monthNumber = cutOffMap[cutOff.toLowerCase()];
      if (monthNumber) {
        const prefix = config.needsJoin ? "a." : "";
        whereConditions.push(`MONTH(${prefix}tanggal) <= ${monthNumber}`);
      }
    }

    // Add jenis laporan filtering (if applicable)
    if (
      selectedJenisLaporan &&
      selectedJenisLaporan !== "semua" &&
      selectedJenisLaporan !== "Pagu Realisasi"
    ) {
      const prefix = config.needsJoin ? "a." : "";
      whereConditions.push(
        `${prefix}jenis_laporan = '${selectedJenisLaporan}'`
      );
    } // Build GROUP BY clause
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

    return query;
  }

  /**
   * Validates query parameters
   */
  static validateParams(params: EselonIQueryParams): boolean {
    const { eselonIEnabled, eselonI, eselonITampilan } = params;

    if (!eselonIEnabled) {
      console.error("EselonI must be enabled for query generation");
      return false;
    }

    if (!eselonITampilan) {
      console.error("EselonI tampilan preference is required");
      return false;
    }

    const validTampilan = ["kode", "kode_uraian", "uraian", "jangan_tampilkan"];
    if (!validTampilan.includes(eselonITampilan)) {
      console.error(`Invalid eselonITampilan: ${eselonITampilan}`);
      return false;
    }

    return true;
  }

  /**
   * Gets example usage patterns
   */
  static getExamples(): Record<string, EselonIQueryParams> {
    return {
      "Show all EselonI codes": {
        eselonIEnabled: true,
        eselonI: new Set<string>(),
        eselonITampilan: "kode",
        cutOff: "semua",
        selectedJenisLaporan: "semua",
        selectedTahun: "2025",
        selectedPembulatan: "rupiah",
      },
      "Show specific EselonI with descriptions": {
        eselonIEnabled: true,
        eselonI: new Set(["01", "02", "03"]),
        eselonITampilan: "kode_uraian",
        cutOff: "juni",
        selectedJenisLaporan: "pagu",
        selectedTahun: "2025",
        selectedPembulatan: "juta",
      },
      "Hide EselonI in results": {
        eselonIEnabled: true,
        eselonI: new Set(["01"]),
        eselonITampilan: "jangan_tampilkan",
        cutOff: "semua",
        selectedJenisLaporan: "semua",
        selectedTahun: "2025",
        selectedPembulatan: "rupiah",
      },
      "Pagu Realisasi with EselonI grouping": {
        eselonIEnabled: true,
        eselonI: new Set<string>(),
        eselonITampilan: "kode_uraian",
        cutOff: "desember",
        selectedJenisLaporan: "Pagu Realisasi",
        selectedTahun: "2025",
        selectedPembulatan: "miliar",
      },
    };
  }
}

// Types are already exported above with the interfaces
