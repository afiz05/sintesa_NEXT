/**
 * Inquiry-UPTUP Query Builder - For Outstanding UP/TUP reports
 * Supports 1 jenlap option and 8 filters including month cutoff
 */

import InquiryUptupFilterBuilder from "./InquiryUptupFilterBuilder";

class InquiryUptupQueryBuilder {
  constructor() {
    this.filterBuilder = new InquiryUptupFilterBuilder();
  }

  /**
   * Build complete SQL query for inquiry-uptup
   * @param {object} inquiryState - Complete inquiry state
   * @returns {string} - Complete SQL query
   */
  buildQuery(inquiryState) {
    const startTime = performance.now();

    try {
      // Build base query components
      const baseTable = this.getBaseTable(inquiryState);
      const selectClause = this.buildSelectClause(inquiryState);
      const fromClause = this.buildFromClause(inquiryState, baseTable);
      const whereClause = this.buildWhereClause(inquiryState);
      const groupByClause = this.buildGroupByClause(inquiryState);
      const orderByClause = this.buildOrderByClause(inquiryState);

      // Combine all parts
      const query = `${selectClause} ${fromClause} ${whereClause} ${groupByClause} ${orderByClause}`;

      const endTime = performance.now();
      console.log(
        `🚀 UPTUP Query built in ${(endTime - startTime).toFixed(2)}ms`
      );

      return query.trim();
    } catch (error) {
      console.error("Error building UPTUP query:", error);
      return "";
    }
  }

  /**
   * Get base table based on jenlap
   * @param {object} inquiryState - Inquiry state
   * @returns {string} - Base table name
   */
  getBaseTable(inquiryState) {
    const { thang } = inquiryState;

    // inquiry-uptup only supports 1 jenlap option - Outstanding UP/TUP
    return `monev${thang}.pa_up_${thang}_outstanding`;
  }

  /**
   * Build SELECT clause
   * @param {object} inquiryState - Inquiry state
   * @returns {string} - SELECT clause
   */
  buildSelectClause(inquiryState) {
    const { pembulatan } = inquiryState;

    // Get filter columns
    const filterResult = this.filterBuilder.buildAllFilters(inquiryState);
    const filterColumns = filterResult.columns;

    console.log("🔍 buildSelectClause - filterResult:", filterResult);
    console.log("🔍 buildSelectClause - filterColumns:", filterColumns);

    // Outstanding UP/TUP - use the new UP/TUP-specific columns
    const baseColumns = [
      // Add any specific columns for UP/TUP if needed
      // For now, using filter columns only
    ];

    // Combine filter columns first, then base columns
    const allColumns = [...new Set([...filterColumns, ...baseColumns])];

    console.log("🔍 buildSelectClause - baseColumns:", baseColumns);
    console.log("🔍 buildSelectClause - allColumns:", allColumns);

    // Add aggregation columns with proper rounding
    const aggregationColumns = [
      `ROUND(SUM(a.rupiah)/${pembulatan},0) AS rupiah`,
    ];

    const finalSelectClause = `SELECT ${
      allColumns.length > 0 ? allColumns.join(", ") + ", " : ""
    }${aggregationColumns.join(", ")}`;
    console.log("🔍 buildSelectClause - final SELECT:", finalSelectClause);

    return finalSelectClause;
  }

  /**
   * Build FROM clause with necessary joins
   * @param {object} inquiryState - Inquiry state
   * @param {string} baseTable - Base table name
   * @returns {string} - FROM clause
   */
  buildFromClause(inquiryState, baseTable) {
    const filterResult = this.filterBuilder.buildAllFilters(inquiryState);
    const joinClauses = this.filterBuilder.optimizeJoins(
      filterResult.joinClauses
    );

    let fromClause = `FROM ${baseTable} a`;

    if (joinClauses.length > 0) {
      fromClause += ` ${joinClauses.join(" ")}`;
    }

    return fromClause;
  }

  /**
   * Build WHERE clause
   * @param {object} inquiryState - Inquiry state
   * @returns {string} - WHERE clause
   */
  buildWhereClause(inquiryState) {
    const { cutoff } = inquiryState;

    // Base conditions
    const baseConditions = [];

    // Always add month cutoff condition for UP/TUP (since cutoff filter is always enabled)
    if (cutoff && cutoff !== "0") {
      const cutoffCondition = `a.bulan <= ${cutoff}`;
      baseConditions.push(cutoffCondition);
      console.log("🔍 UPTUP Query - Adding cutoff condition:", cutoffCondition);
    }

    // Get filter conditions
    const filterResult = this.filterBuilder.buildAllFilters(inquiryState);
    const filterConditions = filterResult.whereConditions;

    // Combine all conditions
    const allConditions = [...baseConditions, ...filterConditions];

    console.log("🔍 UPTUP Query - All WHERE conditions:", allConditions);

    return allConditions.length > 0
      ? `WHERE ${allConditions.join(" AND ")}`
      : "";
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

    // Outstanding UP/TUP - group by filter columns only
    const filterGroupBy = filterResult.groupBy || [];

    console.log("🔍 buildGroupByClause - filterGroupBy:", filterGroupBy);

    const finalGroupBy =
      filterGroupBy.length > 0 ? `GROUP BY ${filterGroupBy.join(", ")}` : "";
    console.log("🔍 buildGroupByClause - final GROUP BY:", finalGroupBy);

    return finalGroupBy;
  }

  /**
   * Build ORDER BY clause
   * @param {object} inquiryState - Inquiry state
   * @returns {string} - ORDER BY clause (disabled - returns empty string)
   */
  buildOrderByClause(inquiryState) {
    // ORDER BY disabled for inquiry-uptup - return empty string
    return "";
  }

  /**
   * Generate SQL preview without executing
   * @param {object} inquiryState - Inquiry state
   * @returns {object} - SQL components
   */
  generateSqlPreview(inquiryState) {
    const baseTable = this.getBaseTable(inquiryState);
    const selectClause = this.buildSelectClause(inquiryState);
    const fromClause = this.buildFromClause(inquiryState, baseTable);
    const whereClause = this.buildWhereClause(inquiryState);
    const groupByClause = this.buildGroupByClause(inquiryState);
    const orderByClause = this.buildOrderByClause(inquiryState);

    return {
      selectClause,
      fromClause,
      whereClause,
      groupByClause,
      orderByClause,
      fullQuery:
        `${selectClause} ${fromClause} ${whereClause} ${groupByClause} ${orderByClause}`.trim(),
    };
  }

  /**
   * Validate query before execution
   * @param {string} query - SQL query to validate
   * @returns {object} - Validation result
   */
  validateQuery(query) {
    const warnings = [];
    const errors = [];

    // Basic validation
    if (!query || typeof query !== "string") {
      errors.push("Query is empty or invalid");
      return { isValid: false, errors, warnings };
    }

    // Check for required clauses
    if (!query.includes("SELECT")) {
      errors.push("Query missing SELECT clause");
    }
    if (!query.includes("FROM")) {
      errors.push("Query missing FROM clause");
    }

    // Performance warnings
    if (query.length > 10000) {
      warnings.push("Query is very long, may impact performance");
    }

    const joinCount = (query.match(/JOIN/g) || []).length;
    if (joinCount > 10) {
      warnings.push(`Query has ${joinCount} joins, may impact performance`);
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      stats: {
        queryLength: query.length,
        joinCount,
        hasGroupBy: query.includes("GROUP BY"),
        hasOrderBy: query.includes("ORDER BY"),
      },
    };
  }

  /**
   * Get query performance metrics
   * @param {object} inquiryState - Inquiry state
   * @returns {object} - Performance metrics
   */
  getQueryPerformanceMetrics(inquiryState) {
    const startTime = performance.now();

    try {
      const filterStats = this.filterBuilder.getFilterStats(inquiryState);
      const validation = this.filterBuilder.validateConfiguration(inquiryState);
      const query = this.buildQuery(inquiryState);
      const queryValidation = this.validateQuery(query);

      const endTime = performance.now();
      const buildTime = endTime - startTime;

      return {
        buildTime,
        filterStats,
        validation,
        queryValidation,
        recommendations: [
          ...validation.recommendations,
          ...queryValidation.warnings,
        ],
      };
    } catch (error) {
      return {
        buildTime: performance.now() - startTime,
        error: error.message,
        filterStats: { enabledFilters: 0 },
        validation: { isValid: false, warnings: [error.message] },
        recommendations: ["Fix query building errors before proceeding"],
      };
    }
  }
}

export default InquiryUptupQueryBuilder;
