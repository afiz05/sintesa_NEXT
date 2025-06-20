// Combined Query Generator - EFFICIENT VERSION
// Handles multiple switches (filters) working together in a scalable way
// Uses direct SUM without CASE WHEN conditions for optimal performance

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
import {
  SatkerQueryGenerator,
  type SatkerQueryParams,
} from "./SatkerQueryGenerator";

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

    if (switches.satker) {
      return SatkerQueryGenerator.generateQuery({
        satkerEnabled: switches.satker,
        satker: formState.satker,
        satkerTampilan: formState.satkerTampilan,
        cutOff: formState.cutOff,
        selectedJenisLaporan,
        selectedTahun,
        selectedPembulatan,
      });
    }

    throw new Error("Unknown single filter combination");
  }

  /**
   * Handle multiple filter scenarios (the main innovation)
   */
  private static handleMultipleFilters(params: CombinedQueryParams): string {
    const { switches, formState, selectedJenisLaporan } = params;

    // Check for filter combinations (excluding cutOff from count)
    const nonCutOffActiveFilters = Object.keys(switches).filter(
      (k) => switches[k] && k !== "cutOff"
    );

    // Two-filter combinations
    if (nonCutOffActiveFilters.length === 2) {
      if (switches.kementerian && switches.eselonI) {
        return this.generateKementerianEselonQuery(params);
      }

      if (switches.kementerian && switches.satker) {
        return this.generateKementerianSatkerQuery(params);
      }

      if (switches.eselonI && switches.satker) {
        return this.generateEselonSatkerQuery(params);
      }
    }

    // Three-filter combination
    if (nonCutOffActiveFilters.length === 3) {
      if (switches.kementerian && switches.eselonI && switches.satker) {
        return this.generateKementerianEselonSatkerQuery(params);
      }
    }

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
   * Generate query for Kementerian + Satker combination
   */
  private static generateKementerianSatkerQuery(
    params: CombinedQueryParams
  ): string {
    const { formState, selectedJenisLaporan } = params;

    console.log("🔄 Generating Kementerian + Satker combined query");

    // Determine if this is a Pagu Realisasi query
    const isPaguRealisasi = selectedJenisLaporan === "Pagu Realisasi";

    let config: CombinedQueryConfig;
    if (isPaguRealisasi) {
      config = this.buildKementerianSatkerPaguRealisasiConfig(params);
    } else {
      config = this.buildKementerianSatkerStandardConfig(params);
    }

    return this.buildQueryFromConfig(config, params);
  }

  /**
   * Generate query for EselonI + Satker combination
   */
  private static generateEselonSatkerQuery(
    params: CombinedQueryParams
  ): string {
    const { formState, selectedJenisLaporan } = params;

    console.log("🔄 Generating EselonI + Satker combined query");

    // Determine if this is a Pagu Realisasi query
    const isPaguRealisasi = selectedJenisLaporan === "Pagu Realisasi";

    let config: CombinedQueryConfig;
    if (isPaguRealisasi) {
      config = this.buildEselonSatkerPaguRealisasiConfig(params);
    } else {
      config = this.buildEselonSatkerStandardConfig(params);
    }

    return this.buildQueryFromConfig(config, params);
  }

  /**
   * Generate query for Kementerian + EselonI + Satker combination
   */
  private static generateKementerianEselonSatkerQuery(
    params: CombinedQueryParams
  ): string {
    const { formState, selectedJenisLaporan } = params;

    console.log("🔄 Generating Kementerian + EselonI + Satker combined query");

    // Determine if this is a Pagu Realisasi query
    const isPaguRealisasi = selectedJenisLaporan === "Pagu Realisasi";

    let config: CombinedQueryConfig;
    if (isPaguRealisasi) {
      config = this.buildKementerianEselonSatkerPaguRealisasiConfig(params);
    } else {
      config = this.buildKementerianEselonSatkerStandardConfig(params);
    }

    return this.buildQueryFromConfig(config, params);
  }

  /**
   * Build configuration for Kementerian + EselonI Pagu Realisasi queries
   * EFFICIENT APPROACH: Uses direct SUM without CASE WHEN conditions
   */
  private static buildKementerianEselonPaguRealisasiConfig(
    params: CombinedQueryParams
  ): CombinedQueryConfig {
    const { formState, selectedTahun } = params;
    let selectColumns: string[] = [];
    let groupByColumns: string[] = [];
    let whereConditions: string[] = ["1=1"];
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
    }

    // Handle EselonI display
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
    }

    // Get realization sum expression based on cutoff month
    let realisasiCondition = "";
    if (formState.cutOff) {
      const cutOffInfo = CutOffQueryGenerator.getCutOffInfo(formState.cutOff);
      realisasiCondition = `a.${cutOffInfo.sumExpression}`;
    } else {
      realisasiCondition =
        "a.real1 + a.real2 + a.real3 + a.real4 + a.real5 + a.real6 + a.real7 + a.real8 + a.real9 + a.real10 + a.real11 + a.real12";
    }

    // EFFICIENT APPROACH: Use direct SUM without CASE conditions
    // The WHERE clause will handle the filtering
    selectColumns.push(
      `${this.applyRounding(
        "SUM(a.pagu)",
        params.selectedPembulatan
      )} AS PAGU_DIPA`,
      `${this.applyRounding(
        `SUM(${realisasiCondition})`,
        params.selectedPembulatan
      )} AS REALISASI`,
      `${this.applyRounding(
        "SUM(a.blokir)",
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
   * Build configuration for Kementerian + Satker Pagu Realisasi queries
   * EFFICIENT APPROACH: Uses direct SUM without CASE WHEN conditions
   */
  private static buildKementerianSatkerPaguRealisasiConfig(
    params: CombinedQueryParams
  ): CombinedQueryConfig {
    const { formState, selectedTahun } = params;
    let selectColumns: string[] = [];
    let groupByColumns: string[] = [];
    let whereConditions: string[] = ["1=1"];
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
    }

    // Handle Satker display
    if (formState.satkerTampilan !== "jangan_tampilkan") {
      switch (formState.satkerTampilan) {
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
        "LEFT JOIN dbref.t_satker_2025 d ON a.kdsatker = d.kdsatker AND a.kdunit = d.kdunit AND a.kddept = d.kddept"
      );
    }

    // Get realization sum expression based on cutoff month
    let realisasiCondition = "";
    if (formState.cutOff) {
      const cutOffInfo = CutOffQueryGenerator.getCutOffInfo(formState.cutOff);
      realisasiCondition = `a.${cutOffInfo.sumExpression}`;
    } else {
      realisasiCondition =
        "a.real1 + a.real2 + a.real3 + a.real4 + a.real5 + a.real6 + a.real7 + a.real8 + a.real9 + a.real10 + a.real11 + a.real12";
    }

    // EFFICIENT APPROACH: Use direct SUM without CASE conditions
    // The WHERE clause will handle the filtering
    selectColumns.push(
      `${this.applyRounding(
        "SUM(a.pagu)",
        params.selectedPembulatan
      )} AS PAGU_DIPA`,
      `${this.applyRounding(
        `SUM(${realisasiCondition})`,
        params.selectedPembulatan
      )} AS REALISASI`,
      `${this.applyRounding(
        "SUM(a.blokir)",
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
    if (formState.satker.size > 0) {
      const satkerList = Array.from(formState.satker)
        .map((k) => `'${k}'`)
        .join(", ");
      whereConditions.push(`a.kdsatker IN (${satkerList})`);
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
   * Build configuration for EselonI + Satker Pagu Realisasi queries
   * EFFICIENT APPROACH: Uses direct SUM without CASE WHEN conditions
   */
  private static buildEselonSatkerPaguRealisasiConfig(
    params: CombinedQueryParams
  ): CombinedQueryConfig {
    const { formState, selectedTahun } = params;
    let selectColumns: string[] = [];
    let groupByColumns: string[] = [];
    let whereConditions: string[] = ["1=1"];
    let joinClauses: string[] = [];

    const mainTable = `${this.getTableName(selectedTahun)} a`;

    // Handle EselonI display
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
    }

    // Handle Satker display
    if (formState.satkerTampilan !== "jangan_tampilkan") {
      switch (formState.satkerTampilan) {
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
        "LEFT JOIN dbref.t_satker_2025 d ON a.kdsatker = d.kdsatker AND a.kdunit = d.kdunit AND a.kddept = d.kddept"
      );
    }

    // Get realization sum expression based on cutoff month
    let realisasiCondition = "";
    if (formState.cutOff) {
      const cutOffInfo = CutOffQueryGenerator.getCutOffInfo(formState.cutOff);
      realisasiCondition = `a.${cutOffInfo.sumExpression}`;
    } else {
      realisasiCondition =
        "a.real1 + a.real2 + a.real3 + a.real4 + a.real5 + a.real6 + a.real7 + a.real8 + a.real9 + a.real10 + a.real11 + a.real12";
    }

    // EFFICIENT APPROACH: Use direct SUM without CASE conditions
    // The WHERE clause will handle the filtering
    selectColumns.push(
      `${this.applyRounding(
        "SUM(a.pagu)",
        params.selectedPembulatan
      )} AS PAGU_DIPA`,
      `${this.applyRounding(
        `SUM(${realisasiCondition})`,
        params.selectedPembulatan
      )} AS REALISASI`,
      `${this.applyRounding(
        "SUM(a.blokir)",
        params.selectedPembulatan
      )} AS BLOKIR`
    );

    // Add WHERE conditions for selections
    if (formState.eselonI.size > 0) {
      const eselonIList = Array.from(formState.eselonI)
        .map((k) => `'${k}'`)
        .join(", ");
      whereConditions.push(`a.kdunit IN (${eselonIList})`);
    }
    if (formState.satker.size > 0) {
      const satkerList = Array.from(formState.satker)
        .map((k) => `'${k}'`)
        .join(", ");
      whereConditions.push(`a.kdsatker IN (${satkerList})`);
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
   * Build configuration for Kementerian + EselonI + Satker Pagu Realisasi queries
   * EFFICIENT APPROACH: Uses direct SUM without CASE WHEN conditions
   */
  private static buildKementerianEselonSatkerPaguRealisasiConfig(
    params: CombinedQueryParams
  ): CombinedQueryConfig {
    const { formState, selectedTahun } = params;
    let selectColumns: string[] = [];
    let groupByColumns: string[] = [];
    let whereConditions: string[] = ["1=1"];
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
    }

    // Handle EselonI display
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
    }

    // Handle Satker display
    if (formState.satkerTampilan !== "jangan_tampilkan") {
      switch (formState.satkerTampilan) {
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
        "LEFT JOIN dbref.t_satker_2025 d ON a.kdsatker = d.kdsatker AND a.kdunit = d.kdunit AND a.kddept = d.kddept"
      );
    }

    // Get realization sum expression based on cutoff month
    let realisasiCondition = "";
    if (formState.cutOff) {
      const cutOffInfo = CutOffQueryGenerator.getCutOffInfo(formState.cutOff);
      realisasiCondition = `a.${cutOffInfo.sumExpression}`;
    } else {
      realisasiCondition =
        "a.real1 + a.real2 + a.real3 + a.real4 + a.real5 + a.real6 + a.real7 + a.real8 + a.real9 + a.real10 + a.real11 + a.real12";
    }

    // EFFICIENT APPROACH: Use direct SUM without CASE conditions
    // The WHERE clause will handle the filtering
    selectColumns.push(
      `${this.applyRounding(
        "SUM(a.pagu)",
        params.selectedPembulatan
      )} AS PAGU_DIPA`,
      `${this.applyRounding(
        `SUM(${realisasiCondition})`,
        params.selectedPembulatan
      )} AS REALISASI`,
      `${this.applyRounding(
        "SUM(a.blokir)",
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
    if (formState.satker.size > 0) {
      const satkerList = Array.from(formState.satker)
        .map((k) => `'${k}'`)
        .join(", ");
      whereConditions.push(`a.kdsatker IN (${satkerList})`);
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
    }

    // Handle EselonI columns
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
   * Build configuration for Kementerian + Satker standard queries
   */
  private static buildKementerianSatkerStandardConfig(
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
    }

    // Handle Satker columns
    if (
      formState.satkerTampilan &&
      formState.satkerTampilan !== "jangan_tampilkan"
    ) {
      switch (formState.satkerTampilan) {
        case "kode":
          selectColumns.push("a.kdsatker");
          break;
        case "uraian":
          selectColumns.push("d.nmsatker");
          joinClauses.push(
            "LEFT JOIN dbref.t_satker_2025 d ON a.kdsatker = d.kdsatker AND a.kdunit = d.kdunit AND a.kddept = d.kddept"
          );
          break;
        case "kode_uraian":
          selectColumns.push("a.kdsatker", "d.nmsatker");
          joinClauses.push(
            "LEFT JOIN dbref.t_satker_2025 d ON a.kdsatker = d.kdsatker AND a.kdunit = d.kdunit AND a.kddept = d.kddept"
          );
          break;
      }
    }

    // If no specific columns, show all
    if (selectColumns.length === 0) {
      selectColumns.push("*");
    } // Add WHERE conditions for selections
    if (formState.kementerian.size > 0) {
      const kementerianList = Array.from(formState.kementerian)
        .map((k) => `'${k}'`)
        .join(", ");
      whereConditions.push(`a.kddept IN (${kementerianList})`);
    }
    if (formState.satker.size > 0) {
      const satkerList = Array.from(formState.satker)
        .map((k) => `'${k}'`)
        .join(", ");
      whereConditions.push(`a.kdsatker IN (${satkerList})`);
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
   * Build configuration for EselonI + Satker standard queries
   */
  private static buildEselonSatkerStandardConfig(
    params: CombinedQueryParams
  ): CombinedQueryConfig {
    const { formState, selectedTahun } = params;

    let selectColumns: string[] = [];
    let whereConditions: string[] = ["1=1"];
    let joinClauses: string[] = [];

    const mainTable = `${this.getTableName(selectedTahun)} a`;

    // Handle EselonI columns
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

    // Handle Satker columns
    if (
      formState.satkerTampilan &&
      formState.satkerTampilan !== "jangan_tampilkan"
    ) {
      switch (formState.satkerTampilan) {
        case "kode":
          selectColumns.push("a.kdsatker");
          break;
        case "uraian":
          selectColumns.push("d.nmsatker");
          joinClauses.push(
            "LEFT JOIN dbref.t_satker_2025 d ON a.kdsatker = d.kdsatker AND a.kdunit = d.kdunit AND a.kddept = d.kddept"
          );
          break;
        case "kode_uraian":
          selectColumns.push("a.kdsatker", "d.nmsatker");
          joinClauses.push(
            "LEFT JOIN dbref.t_satker_2025 d ON a.kdsatker = d.kdsatker AND a.kdunit = d.kdunit AND a.kddept = d.kddept"
          );
          break;
      }
    }

    // If no specific columns, show all
    if (selectColumns.length === 0) {
      selectColumns.push("*");
    }

    // Add WHERE conditions for selections
    if (formState.eselonI.size > 0) {
      const eselonIList = Array.from(formState.eselonI)
        .map((k) => `'${k}'`)
        .join(", ");
      whereConditions.push(`a.kdunit IN (${eselonIList})`);
    }
    if (formState.satker.size > 0) {
      const satkerList = Array.from(formState.satker)
        .map((k) => `'${k}'`)
        .join(", ");
      whereConditions.push(`a.kdsatker IN (${satkerList})`);
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
   * Build configuration for Kementerian + EselonI + Satker standard queries
   */
  private static buildKementerianEselonSatkerStandardConfig(
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
    }

    // Handle EselonI columns
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

    // Handle Satker columns
    if (
      formState.satkerTampilan &&
      formState.satkerTampilan !== "jangan_tampilkan"
    ) {
      switch (formState.satkerTampilan) {
        case "kode":
          selectColumns.push("a.kdsatker");
          break;
        case "uraian":
          selectColumns.push("d.nmsatker");
          joinClauses.push(
            "LEFT JOIN dbref.t_satker_2025 d ON a.kdsatker = d.kdsatker AND a.kdunit = d.kdunit AND a.kddept = d.kddept"
          );
          break;
        case "kode_uraian":
          selectColumns.push("a.kdsatker", "d.nmsatker");
          joinClauses.push(
            "LEFT JOIN dbref.t_satker_2025 d ON a.kdsatker = d.kdsatker AND a.kdunit = d.kdunit AND a.kddept = d.kddept"
          );
          break;
      }
    } // If no specific columns, show all
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
    if (formState.satker.size > 0) {
      const satkerList = Array.from(formState.satker)
        .map((k) => `'${k}'`)
        .join(", ");
      whereConditions.push(`a.kdsatker IN (${satkerList})`);
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
    console.warn("Using generic multi-filter fallback");
    let query = `SELECT * FROM ${this.getTableName(
      params.selectedTahun
    )} WHERE 1=1;`;

    // Apply cutoff filtering - always applied regardless of switch state
    if (params.formState.cutOff) {
      query = CutOffQueryGenerator.addCutOffFilter(query, {
        cutOffEnabled: true,
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
   */
  private static generateBasicQuery(params: CombinedQueryParams): string {
    let query = `SELECT * FROM ${this.getTableName(
      params.selectedTahun
    )} WHERE 1=1;`;

    // Apply cutoff filtering - always applied regardless of switch state
    if (params.formState.cutOff) {
      query = CutOffQueryGenerator.addCutOffFilter(query, {
        cutOffEnabled: true,
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
    const {
      selectColumns,
      groupByColumns,
      whereConditions,
      joinClauses,
      mainTable,
    } = config;

    let query = `SELECT ${selectColumns.join(", ")} FROM ${mainTable}`;

    // Add joins
    if (joinClauses.length > 0) {
      query += ` ${joinClauses.join(" ")}`;
    }

    // Add WHERE conditions
    if (whereConditions.length > 0) {
      query += ` WHERE ${whereConditions.join(" AND ")}`;
    }

    // Add GROUP BY if needed
    if (groupByColumns.length > 0) {
      query += ` GROUP BY ${groupByColumns.join(", ")}`;
    }

    query += ";";

    // Apply cutoff filtering - always applied regardless of switch state
    if (params.formState.cutOff) {
      query = CutOffQueryGenerator.addCutOffFilter(query, {
        cutOffEnabled: true,
        cutOff: params.formState.cutOff,
        selectedJenisLaporan: params.selectedJenisLaporan,
        selectedTahun: params.selectedTahun,
        selectedPembulatan: params.selectedPembulatan,
      });
    }

    return query;
  }

  /**
   * Get supported filter combinations
   */
  static getSupportedCombinations(): string[] {
    return [
      "kementerian only",
      "eselonI only",
      "satker only",
      "kementerian + eselonI",
      "kementerian + satker",
      "eselonI + satker",
      "kementerian + eselonI + satker",
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
      return ["kementerian", "eselonI", "satker"].includes(activeFilters[0]);
    }

    // Two-filter combinations
    if (activeFilters.length === 2) {
      const hasKementerian = activeFilters.includes("kementerian");
      const hasEselon = activeFilters.includes("eselonI");
      const hasSatker = activeFilters.includes("satker");

      return (
        (hasKementerian && hasEselon) ||
        (hasKementerian && hasSatker) ||
        (hasEselon && hasSatker)
      );
    }

    // Three-filter combination
    if (activeFilters.length === 3) {
      return (
        activeFilters.includes("kementerian") &&
        activeFilters.includes("eselonI") &&
        activeFilters.includes("satker")
      );
    }

    return false;
  }
}
