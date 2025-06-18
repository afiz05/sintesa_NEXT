// Combined Query Generator
// Handles multiple switches (filters) working together in a scalable way

import {
  KementerianQueryGenerator,
  type KementerianQueryParams,
} from "./KementerianQueryGenerator";
import {
  EselonIQueryGenerator,
  type EselonIQueryParams,
} from "./EselonIQueryGenerator";
import {
  CutOffQueryGenerator,
  type CutOffQueryParams,
} from "./CutOffQueryGenerator";

export interface CombinedQueryParams {
  // Switch states
  switches: {
    kementerian: boolean;
    eselonI: boolean;
    satker: boolean;
    cutOff: boolean;
    [key: string]: boolean;
  };

  // Form state data
  formState: {
    kementerian: Set<string>;
    kementerianTampilan: string;
    eselonI: Set<string>;
    eselonTampilan: string;
    satker: Set<string>;
    satkerTampilan: string;
    cutOff: string;
    [key: string]: any;
  };

  // Report settings
  selectedJenisLaporan: string;
  selectedTahun: string;
  selectedPembulatan: string;
}

export interface CombinedQueryConfig {
  selectColumns: string[];
  groupByColumns: string[];
  whereConditions: string[];
  needsJoin: boolean;
  joinClauses: string[];
  mainTable: string;
  orderByColumns?: string[];
}

export class CombinedQueryGenerator {
  private static readonly DEFAULT_TABLE_PREFIX = "monev";
  private static readonly DEFAULT_TABLE_SUFFIX = ".pagu_real_detail_harian_";

  /**
   * Generate dynamic table name based on selected year
   */
  private static getTableName(selectedTahun: string): string {
    return `${this.DEFAULT_TABLE_PREFIX}${selectedTahun}${this.DEFAULT_TABLE_SUFFIX}${selectedTahun}`;
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
   * Main entry point for combined query generation
   */
  static generateQuery(params: CombinedQueryParams): string {
    const {
      switches,
      formState,
      selectedJenisLaporan,
      selectedTahun,
      selectedPembulatan,
    } = params;
    console.log("🔧 Combined Query Generator Input:", {
      switches,
      activeFilters: Object.keys(switches).filter((key) => switches[key]),
      selectedJenisLaporan,
      selectedTahun,
      selectedPembulatan,
    });

    // Detect which combination of switches are active (excluding cutOff for routing)
    const activeFilters = Object.keys(switches).filter(
      (key) => switches[key] && key !== "cutOff"
    );

    // Route to appropriate generator based on active switches (cutOff is applied regardless)
    if (activeFilters.length === 1) {
      return this.handleSingleFilter(params);
    } else if (activeFilters.length > 1) {
      return this.handleMultipleFilters(params);
    } else {
      // No filters active - return basic query (cutOff will still be applied if present)
      return this.generateBasicQuery(params);
    }
  }
  /**
   * Handle single filter scenarios (delegate to specific generators)
   */
  private static handleSingleFilter(params: CombinedQueryParams): string {
    const {
      switches,
      formState,
      selectedJenisLaporan,
      selectedTahun,
      selectedPembulatan,
    } = params;

    if (switches.kementerian) {
      return KementerianQueryGenerator.generateQuery({
        kementerianEnabled: switches.kementerian,
        kementerian: formState.kementerian,
        kementerianTampilan: formState.kementerianTampilan,
        cutOff: formState.cutOff,
        selectedJenisLaporan,
        selectedTahun,
        selectedPembulatan,
      });
    }
    if (switches.eselonI) {
      return EselonIQueryGenerator.generateQuery({
        eselonIEnabled: switches.eselonI,
        eselonI: formState.eselonI,
        eselonITampilan: formState.eselonTampilan,
        cutOff: formState.cutOff,
        selectedJenisLaporan,
        selectedTahun,
        selectedPembulatan,
      });
    }

    // Add other single filters here as needed
    // if (switches.satker) { ... }

    throw new Error("Unknown single filter combination");
  }

  /**
   * Handle multiple filter scenarios (the main innovation)
   */
  private static handleMultipleFilters(params: CombinedQueryParams): string {
    const { switches, formState, selectedJenisLaporan } = params; // Check for Kementerian + EselonI combination (excluding cutOff from count)
    const nonCutOffActiveFilters = Object.keys(switches).filter(
      (k) => switches[k] && k !== "cutOff"
    );
    if (
      switches.kementerian &&
      switches.eselonI &&
      nonCutOffActiveFilters.length === 2
    ) {
      return this.generateKementerianEselonQuery(params);
    }

    // Future combinations can be added here:
    // if (switches.kementerian && switches.satker) { ... }
    // if (switches.eselonI && switches.satker) { ... }
    // if (switches.kementerian && switches.eselonI && switches.satker) { ... }

    // Fallback for complex combinations not yet implemented
    console.warn(
      "Complex filter combination not yet implemented, falling back to basic logic"
    );
    return this.generateGenericMultiFilterQuery(params);
  }

  /**
   * Generate query for Kementerian + EselonI combination
   */
  private static generateKementerianEselonQuery(
    params: CombinedQueryParams
  ): string {
    const { formState, selectedJenisLaporan } = params;

    console.log("🔄 Generating Kementerian + EselonI combined query");

    // Determine if this is a Pagu Realisasi query
    const isPaguRealisasi = selectedJenisLaporan === "Pagu Realisasi";

    let config: CombinedQueryConfig;
    if (isPaguRealisasi) {
      config = this.buildKementerianEselonPaguRealisasiConfig(params);
    } else {
      config = this.buildKementerianEselonStandardConfig(params);
    }

    return this.buildQueryFromConfig(config, params);
  }
  /**
   * Build configuration for Kementerian + EselonI Pagu Realisasi queries
   */
  private static buildKementerianEselonPaguRealisasiConfig(
    params: CombinedQueryParams
  ): CombinedQueryConfig {
    const { formState, selectedTahun } = params;
    let selectColumns: string[] = [];
    let groupByColumns: string[] = [];
    let whereConditions: string[] = ["1=1"]; // Start with default condition
    let joinClauses: string[] = [];

    const mainTable = `${this.getTableName(selectedTahun)} a`;

    // Handle Kementerian display
    if (formState.kementerianTampilan !== "jangan_tampilkan") {
      switch (formState.kementerianTampilan) {
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
      joinClauses.push("LEFT JOIN dbref.t_dept_2023 b ON a.kddept = b.kddept");
    } // Handle EselonI display
    if (formState.eselonTampilan !== "jangan_tampilkan") {
      switch (formState.eselonTampilan) {
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
        "LEFT JOIN dbref.t_unit_2025 c ON a.kdunit = c.kdunit AND a.kddept = c.kddept"
      );
    } // Add financial columns for Pagu Realisasi with proper filtering
    // Only sum amounts where both kementerian and eselon conditions are met
    let paguCondition = "a.pagu"; // Get realization sum expression based on cutoff month - always applied
    // When switch is off: uses current month automatically set in form
    // When switch is on: uses user-selected month
    let realisasiCondition = "";
    if (formState.cutOff) {
      const cutOffInfo = CutOffQueryGenerator.getCutOffInfo(formState.cutOff);
      realisasiCondition = `a.${cutOffInfo.sumExpression}`;
    } else {
      // Fallback to full year if no cutoff selected (shouldn't happen now)
      realisasiCondition =
        "a.real1 + a.real2 + a.real3 + a.real4 + a.real5 + a.real6 + a.real7 + a.real8 + a.real9 + a.real10 + a.real11 + a.real12";
    }

    let blokirCondition = "a.blokir";

    // Add conditional filtering for proper kementerian-eselon matching
    const conditionalFilters: string[] = [];

    if (formState.kementerian.size > 0) {
      const kementerianList = Array.from(formState.kementerian)
        .map((k) => `'${k}'`)
        .join(", ");
      conditionalFilters.push(`a.kddept IN (${kementerianList})`);
    }

    if (formState.eselonI.size > 0) {
      const eselonIList = Array.from(formState.eselonI)
        .map((k) => `'${k}'`)
        .join(", ");
      conditionalFilters.push(`a.kdunit IN (${eselonIList})`);
    }

    // If both filters are active, use conditional SUM to ensure proper matching
    if (conditionalFilters.length > 1) {
      const conditionClause = conditionalFilters.join(" AND ");
      paguCondition = `CASE WHEN ${conditionClause} THEN a.pagu ELSE 0 END`;
      realisasiCondition = `CASE WHEN ${conditionClause} THEN ${realisasiCondition} ELSE 0 END`;
      blokirCondition = `CASE WHEN ${conditionClause} THEN a.blokir ELSE 0 END`;
    }
    selectColumns.push(
      `${this.applyRounding(
        `SUM(${paguCondition})`,
        params.selectedPembulatan
      )} AS PAGU_DIPA`,
      `${this.applyRounding(
        `SUM(${realisasiCondition})`,
        params.selectedPembulatan
      )} AS REALISASI`,
      `${this.applyRounding(
        `SUM(${blokirCondition})`,
        params.selectedPembulatan
      )} AS BLOKIR`
    );

    // Add WHERE conditions for selections
    if (formState.kementerian.size > 0) {
      const kementerianList = Array.from(formState.kementerian)
        .map((k) => `'${k}'`)
        .join(", ");
      whereConditions.push(`a.kddept IN (${kementerianList})`);
    }
    if (formState.eselonI.size > 0) {
      const eselonIList = Array.from(formState.eselonI)
        .map((k) => `'${k}'`)
        .join(", ");
      whereConditions.push(`a.kdunit IN (${eselonIList})`);
    }

    return {
      selectColumns,
      groupByColumns,
      whereConditions,
      needsJoin: joinClauses.length > 0,
      joinClauses,
      mainTable,
    };
  }
  /**
   * Build configuration for Kementerian + EselonI standard queries
   */
  private static buildKementerianEselonStandardConfig(
    params: CombinedQueryParams
  ): CombinedQueryConfig {
    const { formState, selectedTahun } = params;

    let selectColumns: string[] = [];
    let whereConditions: string[] = ["1=1"];
    let joinClauses: string[] = [];

    const mainTable = `${this.getTableName(selectedTahun)} a`;

    // Handle Kementerian columns
    if (
      formState.kementerianTampilan &&
      formState.kementerianTampilan !== "jangan_tampilkan"
    ) {
      switch (formState.kementerianTampilan) {
        case "kode":
          selectColumns.push("a.kddept");
          break;
        case "uraian":
          selectColumns.push("b.nmdept");
          joinClauses.push(
            "LEFT JOIN dbref.t_dept_2023 b ON a.kddept = b.kddept"
          );
          break;
        case "kode_uraian":
          selectColumns.push("a.kddept", "b.nmdept");
          joinClauses.push(
            "LEFT JOIN dbref.t_dept_2023 b ON a.kddept = b.kddept"
          );
          break;
      }
    } // Handle EselonI columns
    if (
      formState.eselonTampilan &&
      formState.eselonTampilan !== "jangan_tampilkan"
    ) {
      switch (formState.eselonTampilan) {
        case "kode":
          selectColumns.push("a.kdunit");
          break;
        case "uraian":
          selectColumns.push("c.nmunit");
          joinClauses.push(
            "LEFT JOIN dbref.t_unit_2025 c ON a.kdunit = c.kdunit AND a.kddept = c.kddept"
          );
          break;
        case "kode_uraian":
          selectColumns.push("a.kdunit", "c.nmunit");
          joinClauses.push(
            "LEFT JOIN dbref.t_unit_2025 c ON a.kdunit = c.kdunit AND a.kddept = c.kddept"
          );
          break;
      }
    }

    // If no specific columns, show all
    if (selectColumns.length === 0) {
      selectColumns.push("*");
    }

    // Add WHERE conditions for selections
    if (formState.kementerian.size > 0) {
      const kementerianList = Array.from(formState.kementerian)
        .map((k) => `'${k}'`)
        .join(", ");
      whereConditions.push(`a.kddept IN (${kementerianList})`);
    }
    if (formState.eselonI.size > 0) {
      const eselonIList = Array.from(formState.eselonI)
        .map((k) => `'${k}'`)
        .join(", ");
      whereConditions.push(`a.kdunit IN (${eselonIList})`);
    }

    return {
      selectColumns,
      groupByColumns: [],
      whereConditions,
      needsJoin: joinClauses.length > 0,
      joinClauses,
      mainTable,
    };
  }
  /**
   * Generic multi-filter query for complex combinations
   */
  private static generateGenericMultiFilterQuery(
    params: CombinedQueryParams
  ): string {
    // This would be a more complex implementation for handling
    // arbitrary combinations of filters
    // For now, return a basic query with warning
    console.warn("Using generic multi-filter fallback");
    let query = `SELECT * FROM ${this.getTableName(
      params.selectedTahun
    )} WHERE 1=1;`;

    // Apply cutoff filtering - always applied regardless of switch state
    if (params.formState.cutOff) {
      query = CutOffQueryGenerator.addCutOffFilter(query, {
        cutOffEnabled: true, // Always enabled for filtering
        cutOff: params.formState.cutOff,
        selectedJenisLaporan: params.selectedJenisLaporan,
        selectedTahun: params.selectedTahun,
        selectedPembulatan: params.selectedPembulatan,
      });
    }

    return query;
  }
  /**
   * Basic query when no filters are active
   */ private static generateBasicQuery(params: CombinedQueryParams): string {
    const { selectedTahun } = params;
    let query = `SELECT * FROM ${this.getTableName(selectedTahun)} WHERE 1=1;`;

    // Apply cutoff filtering - always applied regardless of switch state
    if (params.formState.cutOff) {
      query = CutOffQueryGenerator.addCutOffFilter(query, {
        cutOffEnabled: true, // Always enabled for filtering
        cutOff: params.formState.cutOff,
        selectedJenisLaporan: params.selectedJenisLaporan,
        selectedTahun: params.selectedTahun,
        selectedPembulatan: params.selectedPembulatan,
      });
    }

    return query;
  }

  /**
   * Build final SQL query from configuration
   */
  private static buildQueryFromConfig(
    config: CombinedQueryConfig,
    params: CombinedQueryParams
  ): string {
    const { formState, switches } = params;

    // Build SELECT clause
    const selectClause = config.selectColumns.join(", ");

    // Build FROM clause with JOINs
    let fromClause = config.mainTable;
    if (config.needsJoin && config.joinClauses.length > 0) {
      fromClause += " " + config.joinClauses.join(" ");
    }

    // Build WHERE clause
    let whereConditions = [...config.whereConditions];
    const whereClause = whereConditions.join(" AND ");

    // Build GROUP BY clause
    let groupByClause = "";
    if (config.groupByColumns.length > 0) {
      groupByClause = ` GROUP BY ${config.groupByColumns.join(", ")}`;
    }

    // Build ORDER BY clause (optional)
    let orderByClause = "";
    if (config.orderByColumns && config.orderByColumns.length > 0) {
      orderByClause = ` ORDER BY ${config.orderByColumns.join(", ")}`;
    }

    // Construct final query - only add WHERE if there are meaningful conditions
    let query = `SELECT ${selectClause} FROM ${fromClause}`;
    if (whereConditions.length > 0) {
      // Filter out default "1=1" if there are other conditions
      const meaningfulConditions = whereConditions.filter(
        (condition) => condition !== "1=1"
      );
      if (meaningfulConditions.length > 0) {
        query += ` WHERE ${meaningfulConditions.join(" AND ")}`;
      }
    }
    query += `${groupByClause}${orderByClause};`; // Apply cutoff filtering to the final query - always applied regardless of switch state
    if (formState.cutOff) {
      query = CutOffQueryGenerator.addCutOffFilter(query, {
        cutOffEnabled: true, // Always enabled for filtering
        cutOff: formState.cutOff,
        selectedJenisLaporan: params.selectedJenisLaporan,
        selectedTahun: params.selectedTahun,
        selectedPembulatan: params.selectedPembulatan,
      });
    }

    console.log("✅ Combined Query Generated:", query);
    return query;
  }

  /**
   * Get supported filter combinations
   */
  static getSupportedCombinations(): string[] {
    return [
      "kementerian only",
      "eselonI only",
      "kementerian + eselonI",
      // Future combinations:
      // "kementerian + satker",
      // "eselonI + satker",
      // "kementerian + eselonI + satker"
    ];
  }
  /**
   * Check if a filter combination is supported
   */
  static isCombinationSupported(switches: Record<string, boolean>): boolean {
    const activeFilters = Object.keys(switches).filter(
      (key) => switches[key] && key !== "cutOff"
    );

    // Single filters (excluding cutOff)
    if (activeFilters.length === 1) {
      return ["kementerian", "eselonI"].includes(activeFilters[0]);
    }

    // Multiple filters (excluding cutOff)
    if (activeFilters.length === 2) {
      return (
        activeFilters.includes("kementerian") &&
        activeFilters.includes("eselonI")
      );
    }

    // More complex combinations not yet supported
    return false;
  }
}

// Types are already exported above with the interfaces
