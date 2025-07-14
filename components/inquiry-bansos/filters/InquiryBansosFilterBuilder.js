/**
 * Inquiry-Bansos Filter Builder - For Realisasi Bansos reports
 * Handles 10 filters: Jenis Bansos, Kementerian, Eselon I, Kewenangan,
 * Satker, Provinsi, Kabkota, Kecamatan, Desa, and Status Transaksi
 */

// Import the required filter modules
import {
  DepartmentFilter,
  UnitFilter,
  DekonFilter,
  SatkerFilter,
} from "./DepartmentFilter";
import { ProvinsiFilter, KabkotaFilter } from "./BansosLocationFilter";
import {
  JenisBansosFilter,
  StatusTransaksiFilter,
  KecamatanFilter,
  DesaFilter,
} from "./BansosFilter";

class InquiryBansosFilterBuilder {
  constructor() {
    // Initialize the 10 bansos filter instances
    this.filters = {
      // Bansos-specific filters
      jenisbansos: new JenisBansosFilter(), // Jenis Bansos
      
      // Department & Organization (4 filters)
      department: new DepartmentFilter(), // Kementerian
      unit: new UnitFilter(), // Eselon I
      dekon: new DekonFilter(), // Kewenangan
      satker: new SatkerFilter(), // Satker

      // Location (4 filters)
      provinsi: new ProvinsiFilter(), // Provinsi
      kabkota: new KabkotaFilter(), // Kabupaten/Kota
      kecamatan: new KecamatanFilter(), // Kecamatan
      desa: new DesaFilter(), // Desa

      // Status (1 filter)
      statustransaksi: new StatusTransaksiFilter(), // Status Transaksi
    };

    // Map filter keys to inquiry state keys
    this.filterStateMap = {
      jenisbansos: "jenisbansos",
      department: "kddept",
      unit: "unit",
      dekon: "kddekon",
      satker: "kdsatker",
      provinsi: "provinsi",
      kabkota: "kabkota",
      kecamatan: "kecamatan",
      desa: "desa",
      statustransaksi: "statustransaksi",
    };
  }

  /**
   * Check if a specific filter is enabled
   * @param {string} filterKey - The filter key
   * @param {object} inquiryState - Inquiry state
   * @returns {boolean} - Whether the filter is enabled
   */
  isFilterEnabled(filterKey, inquiryState) {
    const stateKey = this.filterStateMap[filterKey];
    if (!stateKey) {
      console.warn(`Unknown filter key: ${filterKey}`);
      return false;
    }

    const isEnabled = Boolean(inquiryState[stateKey]);

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
      throw new Error(`Bansos Filter ${filterKey} not found`);
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

    // Build the 10 bansos filters if they are enabled
    Object.entries(this.filters).forEach(([key, filter]) => {
      const enabled = this.isFilterEnabled(key, inquiryState);

      console.log(`🔍 Bansos Filter ${key}:`, {
        enabled,
        stateKey: this.filterStateMap[key],
      });

      if (enabled) {
        try {
          const filterResult = this.buildFilter(key, inquiryState);

          console.log(`✅ Filter ${key} result:`, filterResult);

          // Aggregate results
          if (filterResult.columns) {
            result.columns.push(...filterResult.columns);
          }
          if (filterResult.joinClause) {
            result.joinClauses.push(filterResult.joinClause);
          }
          if (filterResult.groupBy) {
            result.groupBy.push(...filterResult.groupBy);
          }
          if (filterResult.whereConditions) {
            result.whereConditions.push(...filterResult.whereConditions);
          }
        } catch (error) {
          console.error(`❌ Error building filter ${key}:`, error);
        }
      }
    });

    console.log("🔍 buildAllFilters final result:", result);
    return result;
  }

  /**
   * Get filter performance metrics
   * @param {object} inquiryState - Inquiry state
   * @returns {object} - Performance metrics
   */
  getFilterMetrics(inquiryState) {
    const enabledFilters = Object.keys(this.filters).filter((key) =>
      this.isFilterEnabled(key, inquiryState)
    );

    return {
      totalFilters: Object.keys(this.filters).length,
      enabledFilters: enabledFilters.length,
      enabledFilterNames: enabledFilters,
      filterUtilization: (enabledFilters.length / Object.keys(this.filters).length) * 100,
    };
  }

  /**
   * Validate filter configuration
   * @param {object} inquiryState - Inquiry state
   * @returns {object} - Validation result
   */
  validateFilters(inquiryState) {
    const warnings = [];
    const recommendations = [];
    const stats = this.getFilterMetrics(inquiryState);

    // Check for common issues
    if (stats.enabledFilters === 0) {
      warnings.push("No filters are enabled - query may return too much data");
    }

    if (stats.enabledFilters > 5) {
      recommendations.push(
        "Consider reducing the number of active filters for better performance"
      );
    }

    // Check for missing required state
    Object.entries(this.filterStateMap).forEach(([filterKey, stateKey]) => {
      if (this.isFilterEnabled(filterKey, inquiryState)) {
        if (!inquiryState[stateKey]) {
          warnings.push(`Filter ${filterKey} is enabled but ${stateKey} is missing`);
        }
      }
    });

    return {
      isValid: warnings.length === 0,
      warnings,
      recommendations,
      stats,
    };
  }
}

export default InquiryBansosFilterBuilder;
