/**
 * Modern useQueryBuilder Hook - Simplified for Inquiry-UPTUP
 *
 * This is a streamlined version that only handles the 8 required filters
 * and 1 jenlap option for inquiry-uptup.
 */

"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import { InquiryUptupQueryBuilder } from "../filters";

export default function useQueryBuilder(inquiryState) {
  const [queryCache, setQueryCache] = useState({});

  // Initialize query builder instance
  const queryBuilder = useMemo(() => new InquiryUptupQueryBuilder(), []);

  // Extract key state for dependency tracking (only the 8 required filters for inquiry-uptup)
  const {
    thang,
    jenlap,
    pembulatan,
    cutoff,
    cutoffFilter,
    // Only the 8 required filter switches
    kddept,
    unit,
    kddekon,
    kdkanwil,
    kdkppn,
    kdsatker,
    kdakun,
    // Filter values and conditions for the 8 required filters
    dept,
    kdunit,
    dekon,
    kanwil,
    kppn,
    satker,
    akun,
    // Filter kondisi for advanced filtering
    deptkondisi,
    unitkondisi,
    dekonkondisi,
    kanwilkondisi,
    kppnkondisi,
    satkerkondisi,
    akunkondisi,
    // Radio states for the 8 required filters
    deptradio,
    unitradio,
    dekonradio,
    kanwilradio,
    kppnradio,
    satkerradio,
    akunradio,
    // Filter state setters
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
   * Debug filter behavior for inquiry-uptup
   */
  const debugFilter = (filterName) => {
    const filterResult = buildFilter(filterName);
    const isEnabled = isFilterEnabled(filterName);

    console.log(`🔍 Debug Filter: ${filterName}`, {
      isEnabled,
      columns: filterResult.columns,
      joinClause: filterResult.joinClause,
      whereConditions: filterResult.whereConditions,
      groupBy: filterResult.groupBy,
    });

    return { filterName, isEnabled, ...filterResult };
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

        console.log("📊 Query Stats:", {
          buildTime: `${metrics.buildTime.toFixed(2)}ms`,
          enabledFilters: metrics.filterStats.enabledFilters,
          queryLength: metrics.validation.stats.queryLength,
          joinCount: metrics.validation.stats.joinCount,
        });
      } catch (error) {
        console.warn("Error getting query performance metrics:", error);
      }
    }
  }, [
    thang,
    jenlap,
    pembulatan,
    cutoff,
    cutoffFilter,
    kddept,
    unit,
    kddekon,
    kdkanwil,
    kdkppn,
    kdsatker,
    kdakun,
  ]); // Only track the 8 required filters

  // Backward compatibility methods (adapted for inquiry-uptup)
  const legacyMethods = {
    generateSqlPreview,
    generateOptimizedSql: () => buildQuery, // Same as buildQuery in new version
    parseAdvancedConditions: (kondisiValue, fieldName) => {
      // Simplified for inquiry-uptup - delegate to filter builder
      try {
        return queryBuilder.filterBuilder.filters.department.parseKondisiConditions(
          kondisiValue
        );
      } catch (error) {
        console.warn("Error parsing advanced conditions:", error);
        return [];
      }
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

    // Performance
    getCachedQuery,
    setCachedQuery,
    clearQueryCache,

    // Backward compatibility
    ...legacyMethods,
  };
}
