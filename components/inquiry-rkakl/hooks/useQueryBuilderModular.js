/**
 * Modern useQueryBuilder Hook - Modular and Scalable
 *
 * This replaces the 1800+ line monolithic query builder with a clean,
 * modular approach using separate filter classes.
 *
 * Updated Jenlap Structure (1-12):
 * 1. Proyek Nasional (PN) - kdpn, kdpp, kdkp, kdproy with monthly breakdown
 * 2. DIPA APBN - pagu_apbn, pagu_dipa, realisasi, blokir
 * 3. Pagu Realisasi Blokir - standard pagu, realisasi, blokir
 * 4. Realisasi Bulanan - monthly breakdown with akumulatif option
 * 5. Pagu Bulanan - monthly pagu breakdown
 * 6. Blokir Bulanan - monthly blokir breakdown
 * 7. Volume Output Kegiatan (Data Caput) - satuan, volume, monthly physical progress
 * 8. Pergerakan Blokir Bulanan per Jenis - kdblokir, nmblokir, monthly breakdown
 * 9-12. Reserved for Future Use - default structure with special filter support
 */

"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import { QueryBuilder } from "../filters";

export default function useQueryBuilder(inquiryState) {
  const [queryCache, setQueryCache] = useState({});

  // Initialize query builder instance
  const queryBuilder = useMemo(() => new QueryBuilder(), []);

  // Extract key state for dependency tracking
  const {
    thang,
    jenlap,
    cutoff,
    tanggal,
    akumulatif,
    pembulatan,
    // Filter switches and values are automatically handled by the filter modules
    setFrom,
    setSelect,
    setSql,
  } = inquiryState;

  /**
   * Build the complete SQL query
   */
  const buildQuery = () => {
    try {
      const query = queryBuilder.buildQuery(inquiryState);

      // Update state components for backward compatibility
      const preview = queryBuilder.generateSqlPreview(inquiryState);
      setFrom && setFrom(preview.fromClause);
      setSelect && setSelect(preview.selectClause);
      setSql && setSql(query);

      return query;
    } catch (error) {
      console.error("Error building query:", error);
      return "";
    }
  };

  /**
   * Get query performance metrics
   */
  const getQueryPerformanceMetrics = () => {
    return queryBuilder.getQueryPerformanceMetrics(inquiryState);
  };

  /**
   * Generate SQL preview without full execution
   */
  const generateSqlPreview = () => {
    return queryBuilder.generateSqlPreview(inquiryState);
  };

  /**
   * Validate current query
   */
  const validateQuery = (query = buildQuery) => {
    return queryBuilder.validateQuery(query);
  };

  /**
   * Get filter statistics
   */
  const getFilterStats = () => {
    return queryBuilder.filterBuilder.getFilterStats(inquiryState);
  };

  /**
   * Check if specific filter is enabled
   */
  const isFilterEnabled = (filterName) => {
    return queryBuilder.filterBuilder.isFilterEnabled(filterName, inquiryState);
  };

  /**
   * Get all available filters
   */
  const getAvailableFilters = () => {
    return queryBuilder.filterBuilder.getAvailableFilters();
  };

  /**
   * Build specific filter only
   */
  const buildFilter = (filterName) => {
    return queryBuilder.filterBuilder.buildFilter(filterName, inquiryState);
  };

  /**
   * Debug filter behavior
   */
  const debugFilter = (filterName) => {
    const filterResult = buildFilter(filterName);
    const isEnabled = isFilterEnabled(filterName);

    return { filterName, isEnabled, ...filterResult };
  };

  /**
   * Debug special filters for jenlap = 7 and 8 (updated from old 6 and 7)
   */
  const debugSpecialFilters = () => {
    const { jenlap } = inquiryState;

    if (jenlap === "1") {
      // jenlap = 1: Proyek Nasional - special handling for kdpn, kdpp, kdkp, kdproy

      return [];
    } else if (jenlap === "7") {
      // jenlap = 7: Volume Output Kegiatan - Data Caput (formerly jenlap = 6)

      return [];
    } else if (jenlap === "8") {
      // jenlap = 8: Pergerakan Blokir Bulanan per Jenis (formerly jenlap = 7)
      return debugFilter("blokir");
    } else if (parseInt(jenlap) >= 9 && parseInt(jenlap) <= 12) {
      // jenlap = 9-12: Reserved for future use - may use special filters
      const specialFilters = [
        "inflasi",
        "stunting",
        "kemiskinan",
        "pemilu",
        "ikn",
        "pangan",
        "specialgrouping",
      ];

      return specialFilters.map((filterName) => debugFilter(filterName));
    }

    return [];
  };

  /**
   * Get query complexity analysis
   */
  const analyzeQueryComplexity = () => {
    const metrics = getQueryPerformanceMetrics();
    const stats = getFilterStats();

    return {
      complexity: {
        low:
          stats.enabledFilters <= 3 && metrics.validation.stats.joinCount <= 3,
        medium:
          stats.enabledFilters <= 6 && metrics.validation.stats.joinCount <= 6,
        high:
          stats.enabledFilters > 6 || metrics.validation.stats.joinCount > 6,
      },
      metrics,
      stats,
      recommendations: metrics.recommendations,
    };
  };

  /**
   * Cache queries for performance
   */
  const getCachedQuery = (cacheKey) => {
    return queryCache[cacheKey];
  };

  const setCachedQuery = (cacheKey, query) => {
    setQueryCache((prev) => ({
      ...prev,
      [cacheKey]: {
        query,
        timestamp: Date.now(),
      },
    }));
  };

  /**
   * Clear query cache
   */
  const clearQueryCache = () => {
    setQueryCache({});
  };

  // Log performance metrics in development
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      try {
        const metrics = getQueryPerformanceMetrics();

        if (metrics.validation.warnings.length > 0) {
          console.warn(
            "⚠️ Query Builder Warnings:",
            metrics.validation.warnings
          );
        }

        if (metrics.recommendations.length > 0) {
          console.info(
            "💡 Query Builder Recommendations:",
            metrics.recommendations
          );
        }
      } catch (error) {
        console.warn("Error getting query performance metrics:", error);
      }
    }
  }, [thang, jenlap, cutoff, tanggal, akumulatif, pembulatan]); // Use specific dependencies instead of buildQuery

  // Backward compatibility methods (matching original useQueryBuilder interface)
  const legacyMethods = {
    generateSqlPreview,
    generateOptimizedSql: () => buildQuery, // Same as buildQuery in new version
    parseAdvancedConditions: (kondisiValue, fieldName) => {
      // Delegate to BaseFilter logic
      const baseFilter =
        new queryBuilder.filterBuilder.filters.department.constructor();
      return baseFilter.parseKondisiConditions(kondisiValue);
    },
    optimizeGroupBy: (columns, groupFields) => {
      return [...new Set(groupFields)].filter((group) =>
        columns.some((col) => col.includes(group) || group.includes("a."))
      );
    },
    optimizeJoins: (joinClause) => {
      return queryBuilder.filterBuilder.optimizeJoins(
        Array.isArray(joinClause) ? joinClause : [joinClause]
      );
    },
    validateQuery,
    getQueryPerformanceMetrics,
    getQueryStats: getFilterStats, // Renamed but same functionality
  };

  /**
   * Debug and test specific jenlap configuration
   */
  const debugJenlap = (jenlapValue) => {
    const testState = { ...inquiryState, jenlap: jenlapValue };
    const query = queryBuilder.buildQuery(testState);
    const validation = queryBuilder.validateQuery(query);
    const preview = queryBuilder.generateSqlPreview(testState);

    return {
      jenlapValue,
      query,
      validation,
      preview,
    };
  };

  /**
   * Test all jenlap configurations (1-12)
   */
  const testAllJenlaps = () => {
    const results = {};
    for (let i = 1; i <= 12; i++) {
      results[i] = debugJenlap(i.toString());
    }
    return results;
  };

  return {
    // Core functionality - Return both string value and function for compatibility
    buildQuery: buildQuery, // The memoized query string
    getBuildQuery: () => buildQuery, // Function that returns the query

    // Analysis and debugging
    generateSqlPreview,
    validateQuery,
    getQueryPerformanceMetrics,
    getFilterStats,
    analyzeQueryComplexity,

    // Filter management
    isFilterEnabled,
    getAvailableFilters,
    buildFilter,
    debugFilter,
    debugSpecialFilters,

    // Jenlap testing and debugging
    debugJenlap,
    testAllJenlaps,

    // Performance
    getCachedQuery,
    setCachedQuery,
    clearQueryCache,

    // Backward compatibility
    ...legacyMethods,
  };
}
