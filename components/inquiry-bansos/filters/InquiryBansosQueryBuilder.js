/**
 * Inquiry-Bansos Query Builder - For Realisasi Bansos reports
 * Supports 1 jenlap option and 10 filters with akumulatif/non-akumulatif options
 */

import InquiryBansosFilterBuilder from "./InquiryBansosFilterBuilder";

class InquiryBansosQueryBuilder {
  constructor() {
    this.filterBuilder = new InquiryBansosFilterBuilder();
  }

  /**
   * Build complete SQL query for inquiry-bansos
   * @param {object} inquiryState - Complete inquiry state
   * @returns {string} - Complete SQL query
   */
  buildQuery(inquiryState) {
    try {
      const startTime = performance.now();

      const selectClause = this.buildSelectClause(inquiryState);
      const fromClause = this.buildFromClause(inquiryState);
      const joinClause = this.buildJoinClause(inquiryState);
      const whereClause = this.buildWhereClause(inquiryState);
      const groupByClause = this.buildGroupByClause(inquiryState);
      const orderByClause = this.buildOrderByClause(inquiryState);

      const query = [
        selectClause,
        fromClause,
        joinClause,
        whereClause,
        groupByClause,
        orderByClause,
      ]
        .filter((clause) => clause && clause.trim() !== "")
        .join(" ");

      const endTime = performance.now();
      console.log(
        `🚀 Bansos Query built in ${(endTime - startTime).toFixed(2)}ms`
      );

      return query;
    } catch (error) {
      console.error("Error building Bansos query:", error);
      return "";
    }
  }

  /**
   * Build SELECT clause
   * @param {object} inquiryState - Inquiry state
   * @returns {string} - SELECT clause
   */
  buildSelectClause(inquiryState) {
    const filterResult = this.filterBuilder.buildAllFilters(inquiryState);

    console.log(
      "🔍 buildSelectClause - filterResult.columns:",
      filterResult.columns
    );

    // Get filter columns
    const filterColumns = filterResult.columns || [];

    // Add TAHAP column for bansos
    const baseColumns = ["a.tahap AS TAHAP"];

    // Build month columns based on akumulatif setting
    const monthColumns = this.buildMonthColumns(inquiryState);

    // Combine all columns
    const allColumns = [...filterColumns, ...baseColumns, ...monthColumns];

    console.log("🔍 buildSelectClause - allColumns:", allColumns);

    const selectClause = `SELECT ${allColumns.join(", ")}`;
    console.log("🔍 buildSelectClause - final SELECT:", selectClause);

    return selectClause;
  }

  /**
   * Build month columns based on akumulatif setting
   * @param {object} inquiryState - Inquiry state
   * @returns {string[]} - Array of month column expressions
   */
  buildMonthColumns(inquiryState) {
    const { akumulatif } = inquiryState;
    const columns = [];

    if (akumulatif === "1") {
      // Akumulatif - progressive cumulative sums
      for (let i = 1; i <= 12; i++) {
        // Build cumulative JML sum
        const jmlParts = [];
        for (let j = 1; j <= i; j++) {
          jmlParts.push(`JML${j}`);
        }
        const jmlSum = jmlParts.length > 1 
          ? `(${jmlParts.map(part => `SUM(${part})`).join(" + ")})` 
          : `SUM(${jmlParts[0]})`;
        
        // Build cumulative REAL sum
        const realParts = [];
        for (let j = 1; j <= i; j++) {
          realParts.push(`REAL${j}`);
        }
        const realSum = realParts.length > 1 
          ? `(${realParts.map(part => `SUM(${part})`).join(" + ")}) / 1` 
          : `SUM(${realParts[0]}) / 1`;

        columns.push(`${jmlSum} AS JML${i}`);
        columns.push(`${realSum} AS REAL${i}`);
      }
    } else {
      // Non-akumulatif - simple SUM aggregations
      for (let i = 1; i <= 12; i++) {
        columns.push(`SUM(JML${i}) AS JML${i}`);
        columns.push(`SUM(REAL${i})/1 AS REAL${i}`);
      }
    }

    return columns;
  }

  /**
   * Build FROM clause
   * @param {object} inquiryState - Inquiry state
   * @returns {string} - FROM clause
   */
  buildFromClause(inquiryState) {
    const { thang } = inquiryState;
    return `FROM monev${thang}.bansos_pkh_bulanan a`;
  }

  /**
   * Build JOIN clause
   * @param {object} inquiryState - Inquiry state
   * @returns {string} - JOIN clause
   */
  buildJoinClause(inquiryState) {
    const filterResult = this.filterBuilder.buildAllFilters(inquiryState);

    console.log(
      "🔍 buildJoinClause - filterResult.joinClauses:",
      filterResult.joinClauses
    );

    const joinClauses = filterResult.joinClauses || [];
    const finalJoinClause = joinClauses.join(" ");

    console.log("🔍 buildJoinClause - final JOIN:", finalJoinClause);

    return finalJoinClause;
  }

  /**
   * Build WHERE clause
   * @param {object} inquiryState - Inquiry state
   * @returns {string} - WHERE clause
   */
  buildWhereClause(inquiryState) {
    const filterResult = this.filterBuilder.buildAllFilters(inquiryState);

    console.log(
      "🔍 buildWhereClause - filterResult.whereConditions:",
      filterResult.whereConditions
    );

    const whereConditions = filterResult.whereConditions || [];

    // No cutoff conditions for bansos - only filter conditions
    const finalWhereClause =
      whereConditions.length > 0 ? `WHERE ${whereConditions.join(" AND ")}` : "";

    console.log("🔍 buildWhereClause - final WHERE:", finalWhereClause);

    return finalWhereClause;
  }

  /**
   * Build GROUP BY clause
   * @param {object} inquiryState - Inquiry state
   * @returns {string} - GROUP BY clause
   */
  buildGroupByClause(inquiryState) {
    const filterResult = this.filterBuilder.buildAllFilters(inquiryState);

    console.log(
      "🔍 buildGroupByClause - filterResult.groupBy:",
      filterResult.groupBy
    );

    // Bansos - group by filter columns and TAHAP
    const filterGroupBy = filterResult.groupBy || [];
    const baseGroupBy = ["a.tahap"];

    // Combine filter and base group by columns
    const allGroupBy = [...new Set([...filterGroupBy, ...baseGroupBy])];

    console.log("🔍 buildGroupByClause - allGroupBy:", allGroupBy);

    const finalGroupBy =
      allGroupBy.length > 0 ? `GROUP BY ${allGroupBy.join(", ")}` : "";
    console.log("🔍 buildGroupByClause - final GROUP BY:", finalGroupBy);

    return finalGroupBy;
  }

  /**
   * Build ORDER BY clause
   * @param {object} inquiryState - Inquiry state
   * @returns {string} - ORDER BY clause (disabled - returns empty string)
   */
  buildOrderByClause(inquiryState) {
    // ORDER BY disabled for inquiry-bansos - return empty string
    return "";
  }

  /**
   * Generate SQL preview for debugging
   * @param {object} inquiryState - Inquiry state
   * @returns {object} - SQL preview components
   */
  generateSqlPreview(inquiryState) {
    return {
      selectClause: this.buildSelectClause(inquiryState),
      fromClause: this.buildFromClause(inquiryState),
      joinClause: this.buildJoinClause(inquiryState),
      whereClause: this.buildWhereClause(inquiryState),
      groupByClause: this.buildGroupByClause(inquiryState),
      orderByClause: this.buildOrderByClause(inquiryState),
    };
  }

  /**
   * Get query performance metrics
   * @param {object} inquiryState - Inquiry state
   * @returns {object} - Performance metrics
   */
  getQueryPerformanceMetrics(inquiryState) {
    const startTime = performance.now();
    const query = this.buildQuery(inquiryState);
    const endTime = performance.now();

    const filterMetrics = this.filterBuilder.getFilterMetrics(inquiryState);
    const validation = this.filterBuilder.validateFilters(inquiryState);

    return {
      buildTime: endTime - startTime,
      queryLength: query.length,
      filterStats: filterMetrics,
      validation,
      recommendations: this.getQueryOptimizationRecommendations(inquiryState),
    };
  }

  /**
   * Get query optimization recommendations
   * @param {object} inquiryState - Inquiry state
   * @returns {string[]} - Array of recommendations
   */
  getQueryOptimizationRecommendations(inquiryState) {
    const recommendations = [];
    const filterMetrics = this.filterBuilder.getFilterMetrics(inquiryState);

    if (filterMetrics.enabledFilters === 0) {
      recommendations.push("Add filters to improve query performance");
    }

    if (filterMetrics.enabledFilters > 6) {
      recommendations.push("Consider reducing filters for better performance");
    }

    return recommendations;
  }
}

export default InquiryBansosQueryBuilder;
