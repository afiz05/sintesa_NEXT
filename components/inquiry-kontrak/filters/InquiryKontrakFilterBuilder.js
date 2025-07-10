/**
 * Inquiry-Kontrak Filter Builder - Simplified for 12 required filters only
 * Only handles: Kementerian, Eselon I, Kewenangan, Kanwil, KPPN, Satker,
 * Program, Kegiatan, Output/KRO, Sumber Dana, Akun, and Jenis Kontrak
 */

// Import only the required filter modules
import {
  DepartmentFilter,
  UnitFilter,
  DekonFilter,
  SatkerFilter,
} from "./DepartmentFilter";
import { KanwilFilter, KppnFilter } from "./LocationFilter";
import { ProgramFilter, KegiatanFilter, OutputFilter } from "./ProgramFilter";
import { AkunFilter, SumberDanaFilter } from "./AccountFilter";
import JenisKontrakFilter from "./JenisKontrakFilter";

class InquiryKontrakFilterBuilder {
  constructor() {
    // Initialize only the 12 required filter instances
    this.filters = {
      // Department & Organization (4 filters)
      department: new DepartmentFilter(), // Kementerian
      unit: new UnitFilter(), // Eselon I
      dekon: new DekonFilter(), // Kewenangan
      satker: new SatkerFilter(), // Satker

      // Location (2 filters)
      kanwil: new KanwilFilter(), // Kanwil
      kppn: new KppnFilter(), // KPPN

      // Program Structure (3 filters)
      program: new ProgramFilter(), // Program
      kegiatan: new KegiatanFilter(), // Kegiatan
      output: new OutputFilter(), // Output/KRO

      // Account (2 filters)
      akun: new AkunFilter(), // Akun
      sdana: new SumberDanaFilter(), // Sumber Dana

      // Contract Type (1 filter)
      jeniskontrak: new JenisKontrakFilter(), // Jenis Kontrak
    };

    // Map filter keys to inquiry state keys
    this.filterStateMap = {
      department: "kddept",
      unit: "unit",
      dekon: "kddekon",
      kanwil: "kdkanwil",
      kppn: "kdkppn",
      satker: "kdsatker",
      program: "kdprogram",
      kegiatan: "kdgiat",
      output: "kdoutput",
      akun: "kdakun",
      sdana: "kdsdana",
      jeniskontrak: "kdjeniskontrak",
    };
  }

  /**
   * Build all enabled filters from inquiry state
   * @param {object} inquiryState - Complete inquiry state
   * @returns {object} - Aggregated filter results
   */
  buildAllFilters(inquiryState) {
    const result = {
      columns: [],
      joinClauses: [],
      groupBy: [],
      whereConditions: [],
    }; // Build only the 12 required filters if they are enabled
    Object.entries(this.filters).forEach(([key, filter]) => {
      const enabled = this.isFilterEnabled(key, inquiryState);

      console.log(`🔍 Filter ${key}:`, {
        enabled,
        stateKey: this.filterStateMap[key],
      });

      if (enabled) {
        try {
          // Use buildFromState method which properly extracts filter parameters
          const filterResult = filter.buildFromState
            ? filter.buildFromState(inquiryState)
            : filter.build(inquiryState);

          console.log(`✅ Filter ${key} result:`, {
            columns: filterResult.columns,
            joinClause: filterResult.joinClause,
            whereConditions: filterResult.whereConditions,
            groupBy: filterResult.groupBy,
          });

          // Merge results
          if (filterResult.columns) {
            result.columns.push(...filterResult.columns);
          }
          if (filterResult.joinClause) {
            result.joinClauses.push(filterResult.joinClause);
          }
          if (filterResult.groupBy) {
            result.groupBy.push(...filterResult.groupBy);
          }
          if (
            filterResult.whereConditions &&
            filterResult.whereConditions.length > 0
          ) {
            result.whereConditions.push(...filterResult.whereConditions);
          }
        } catch (error) {
          console.warn(`❌ Error building filter ${key}:`, error);
        }
      }
    });

    // Remove duplicates and optimize
    result.columns = [...new Set(result.columns)];
    result.joinClauses = [...new Set(result.joinClauses)];
    result.groupBy = [...new Set(result.groupBy)];

    return result;
  }

  /**
   * Check if a specific filter is enabled
   * @param {string} filterKey - The filter key
   * @param {object} inquiryState - Inquiry state
   * @returns {boolean} - Whether filter is enabled
   */
  isFilterEnabled(filterKey, inquiryState) {
    const stateKey = this.filterStateMap[filterKey];
    return stateKey ? inquiryState[stateKey] === true : false;
  }

  /**
   * Build a specific filter only
   * @param {string} filterKey - The filter to build
   * @param {object} inquiryState - Inquiry state
   * @returns {object} - Filter result
   */
  buildFilter(filterKey, inquiryState) {
    const filter = this.filters[filterKey];
    if (!filter) {
      throw new Error(`Filter ${filterKey} not found`);
    }

    // Use buildFromState method which properly extracts filter parameters
    return filter.buildFromState
      ? filter.buildFromState(inquiryState)
      : filter.build(inquiryState);
  }

  /**
   * Get filter statistics
   * @param {object} inquiryState - Inquiry state
   * @returns {object} - Filter statistics
   */
  getFilterStats(inquiryState) {
    const enabledFilters = Object.keys(this.filters).filter((key) =>
      this.isFilterEnabled(key, inquiryState)
    );

    return {
      totalFilters: Object.keys(this.filters).length,
      enabledFilters: enabledFilters.length,
      enabledFilterNames: enabledFilters,
      disabledFilters: Object.keys(this.filters).length - enabledFilters.length,
    };
  }

  /**
   * Get all available filters (only the 11 required ones)
   * @returns {array} - Array of filter names
   */
  getAvailableFilters() {
    return Object.keys(this.filters);
  }

  /**
   * Optimize join clauses by removing duplicates and redundant joins
   * @param {array} joinClauses - Array of join clauses
   * @returns {array} - Optimized join clauses
   */
  optimizeJoins(joinClauses) {
    // Remove exact duplicates
    const uniqueJoins = [...new Set(joinClauses)];

    // Sort by table dependencies (basic optimization)
    const sortedJoins = uniqueJoins.sort((a, b) => {
      // Put base table joins first
      if (a.includes("LEFT JOIN ref_")) return -1;
      if (b.includes("LEFT JOIN ref_")) return 1;
      return 0;
    });

    return sortedJoins;
  }

  /**
   * Validate filter configuration
   * @param {object} inquiryState - Inquiry state
   * @returns {object} - Validation result
   */
  validateConfiguration(inquiryState) {
    const stats = this.getFilterStats(inquiryState);
    const warnings = [];
    const recommendations = [];

    // Check if no filters are enabled
    if (stats.enabledFilters === 0) {
      warnings.push("No filters are enabled. Results may be too broad.");
    }

    // Check if too many filters are enabled (performance concern)
    if (stats.enabledFilters > 8) {
      recommendations.push(
        "Consider reducing the number of active filters for better performance."
      );
    }

    // Check specific filter combinations
    if (inquiryState.kddept && inquiryState.unit && inquiryState.kdsatker) {
      recommendations.push(
        "Using Kementerian, Eselon I, and Satker together provides very specific filtering."
      );
    }

    return {
      isValid: warnings.length === 0,
      warnings,
      recommendations,
      stats,
    };
  }
}

export default InquiryKontrakFilterBuilder;
