/**
 * Inquiry-UPTUP Filter Builder - For Outstanding UP/TUP reports
 * Handles 8 filters: Bulan (always on), Kementerian, Eselon I, Kewenangan,
 * Kanwil, KPPN, Satker, and Akun
 */

// Import the required filter modules
import {
  DepartmentFilter,
  UnitFilter,
  DekonFilter,
  SatkerFilter,
} from "./DepartmentFilter";
import { KanwilFilter, KppnFilter } from "./LocationFilter";
import { AkunFilter } from "./AccountFilter";

class InquiryUptupFilterBuilder {
  constructor() {
    // Initialize only the 7 optional filter instances (Bulan handled separately)
    this.filters = {
      // Department & Organization (4 filters)
      department: new DepartmentFilter(), // Kementerian
      unit: new UnitFilter(), // Eselon I
      dekon: new DekonFilter(), // Kewenangan
      satker: new SatkerFilter(), // Satker

      // Location (2 filters)
      kanwil: new KanwilFilter(), // Kanwil
      kppn: new KppnFilter(), // KPPN

      // Account (1 filter)
      akun: new AkunFilter(), // Akun
    };

    // Map filter keys to inquiry state keys
    this.filterStateMap = {
      department: "kddept",
      unit: "unit",
      dekon: "kddekon",
      kanwil: "kdkanwil",
      kppn: "kdkppn",
      satker: "kdsatker",
      akun: "kdakun",
    };
  }

  /**
   * Check if a specific filter is enabled
   * @param {string} filterKey - The filter key
   * @param {object} inquiryState - Inquiry state
   * @returns {boolean} - Whether filter is enabled
   */
  isFilterEnabled(filterKey, inquiryState) {
    const stateKey = this.filterStateMap[filterKey];
    const isEnabled = stateKey ? inquiryState[stateKey] === true : false;

    console.log(`🔍 isFilterEnabled ${filterKey}:`, {
      stateKey,
      stateValue: inquiryState[stateKey],
      isEnabled,
    });

    return isEnabled;
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
      throw new Error(`UPTUP Filter ${filterKey} not found`);
    }

    // Use buildFromState method which properly extracts filter parameters
    return filter.buildFromState
      ? filter.buildFromState(inquiryState)
      : filter.build(inquiryState);
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
    };

    // Build the 7 optional filters if they are enabled
    Object.entries(this.filters).forEach(([key, filter]) => {
      const enabled = this.isFilterEnabled(key, inquiryState);

      console.log(`🔍 UPTUP Filter ${key}:`, {
        enabled,
        stateKey: this.filterStateMap[key],
      });

      if (enabled) {
        try {
          // Use buildFromState method which properly extracts filter parameters
          const filterResult = filter.buildFromState
            ? filter.buildFromState(inquiryState)
            : filter.build(inquiryState);

          console.log(`✅ UPTUP Filter ${key} result:`, {
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
          console.warn(`❌ Error building UPTUP filter ${key}:`, error);
        }
      }
    });

    // Remove duplicates and optimize
    result.columns = [...new Set(result.columns)];
    result.joinClauses = [...new Set(result.joinClauses)];
    result.groupBy = [...new Set(result.groupBy)];

    console.log("🔍 UPTUP buildAllFilters final result:", result);

    return result;
  }

  /**
   * Optimize JOIN clauses by removing duplicates and ordering
   * @param {array} joinClauses - Array of JOIN clauses
   * @returns {array} - Optimized JOIN clauses
   */
  optimizeJoins(joinClauses) {
    // Remove duplicates and empty joins
    const uniqueJoins = [
      ...new Set(joinClauses.filter((join) => join && join.trim())),
    ];

    // Sort joins by dependency (basic optimization)
    return uniqueJoins.sort((a, b) => {
      // Prioritize LEFT JOINs and sort by table names
      const aIsLeft = a.includes("LEFT JOIN");
      const bIsLeft = b.includes("LEFT JOIN");

      if (aIsLeft && !bIsLeft) return -1;
      if (!aIsLeft && bIsLeft) return 1;

      return a.localeCompare(b);
    });
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
      totalFilters: Object.keys(this.filters).length + 1, // +1 for Bulan (always enabled)
      enabledFilters: enabledFilters.length + 1, // +1 for Bulan (always enabled)
      enabledFilterNames: ["bulan", ...enabledFilters], // Include Bulan as always enabled
      disabledFilters: Object.keys(this.filters).length - enabledFilters.length,
    };
  }

  /**
   * Get all available filters (7 optional + 1 always-on Bulan)
   * @returns {array} - Array of filter names
   */
  getAvailableFilters() {
    return ["bulan", ...Object.keys(this.filters)];
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

    // For UPTUP, we always have at least Bulan filter enabled
    if (stats.enabledFilters === 1) {
      recommendations.push(
        "Only Bulan filter is active. Consider adding more filters for specific analysis."
      );
    }

    // Check if too many filters are enabled (performance concern)
    if (stats.enabledFilters > 6) {
      recommendations.push(
        "Consider reducing the number of active filters for better performance."
      );
    }

    // Check specific filter combinations for UPTUP
    if (inquiryState.kddept && inquiryState.unit && inquiryState.kdsatker) {
      recommendations.push(
        "Using Kementerian, Eselon I, and Satker together provides very specific UP/TUP filtering."
      );
    }

    if (inquiryState.kdkanwil && inquiryState.kdkppn) {
      recommendations.push(
        "Using both Kanwil and KPPN filters provides location-specific UP/TUP analysis."
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

export default InquiryUptupFilterBuilder;
