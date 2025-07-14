/**
 * Inquiry-Kontrak Query Builder - Simplified for inquiry-kontrak requirements
 * Only supports 2 jenlap options and 11 filters
 */

import InquiryKontrakFilterBuilder from "./InquiryKontrakFilterBuilder";

class InquiryKontrakQueryBuilder {
  constructor() {
    this.filterBuilder = new InquiryKontrakFilterBuilder();
  }

  /**
   * Build complete SQL query for inquiry-kontrak
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
      console.log(`🚀 Query built in ${(endTime - startTime).toFixed(2)}ms`);

      return query.trim();
    } catch (error) {
      console.error("Error building query:", error);
      return "";
    }
  }

  /**
   * Get base table based on jenlap
   * @param {object} inquiryState - Inquiry state
   * @returns {string} - Base table name
   */
  getBaseTable(inquiryState) {
    const { jenlap, thang } = inquiryState;

    // inquiry-kontrak only supports 2 jenlap options
    // Both jenlap 1 and 2 now use the same table structure
    switch (jenlap) {
      case "1": // Data Semua Kontrak
        return `monev${thang}.pa_kontrak_${thang}_baru`;
      case "2": // Data Kontrak Valas (now uses same table with currency filter)
        return `monev${thang}.pa_kontrak_${thang}_baru`;
      default:
        return `monev${thang}.pa_kontrak_${thang}_baru`;
    }
  }

  /**
   * Build SELECT clause
   * @param {object} inquiryState - Inquiry state
   * @returns {string} - SELECT clause
   */
  buildSelectClause(inquiryState) {
    const { jenlap, pembulatan } = inquiryState;

    // Get filter columns
    const filterResult = this.filterBuilder.buildAllFilters(inquiryState);
    const filterColumns = filterResult.columns;

    console.log("🔍 buildSelectClause - filterResult:", filterResult);
    console.log("🔍 buildSelectClause - filterColumns:", filterColumns);

    if (jenlap === "1") {
      // Data Semua Kontrak - use the new contract-specific columns
      const baseColumns = [
        "a.nokontrak",
        "a.tgkontrak",
        "a.tgterima",
        "a.termin_ke",
        "a.tgljatuhtempo as tgljatuhtempo_termin",
        "a.tgljatuhtempo",
        "a.deskripsi",
      ];

      // Combine filter columns first, then base columns
      const allColumns = [...new Set([...filterColumns, ...baseColumns])];

      console.log("🔍 buildSelectClause - baseColumns:", baseColumns);
      console.log("🔍 buildSelectClause - allColumns:", allColumns);

      // Add aggregation columns with proper rounding and CONVERT for MySQL
      const aggregationColumns = [
        `ROUND(SUM(CONVERT(a.pagu, SIGNED))/${pembulatan},0) AS PAGU_KONTRAK`,
        `ROUND(SUM(a.realisasi)/${pembulatan},0) AS REALISASI_KONTRAK`,
      ];

      const finalSelectClause = `SELECT ${allColumns.join(
        ", "
      )}, ${aggregationColumns.join(", ")}`;
      console.log("🔍 buildSelectClause - final SELECT:", finalSelectClause);

      return finalSelectClause;
    } else {
      // Data Kontrak Valas - use new contract-specific structure with currency
      const baseColumns = [
        "a.currency",
        "a.kurs_user",
        "a.nokontrak",
        "a.tgkontrak",
        "a.tgterima",
        "a.termin_ke",
        "a.tgljatuhtempo as tgljatuhtempo_termin",
        "a.tgljatuhtempo",
        "a.deskripsi",
      ];

      // Combine filter columns first, then base columns
      const allColumns = [...new Set([...filterColumns, ...baseColumns])];

      console.log(
        "🔍 buildSelectClause - baseColumns (jenlap=2):",
        baseColumns
      );
      console.log("🔍 buildSelectClause - allColumns (jenlap=2):", allColumns);

      // Add aggregation columns with proper rounding and CONVERT for MySQL
      const aggregationColumns = [
        `ROUND(SUM(CONVERT(a.pagu, SIGNED))/${pembulatan},0) AS PAGU_KONTRAK`,
        `ROUND(SUM(a.realisasi)/${pembulatan},0) AS REALISASI_KONTRAK`,
      ];

      const finalSelectClause = `SELECT ${allColumns.join(
        ", "
      )}, ${aggregationColumns.join(", ")}`;
      console.log(
        "🔍 buildSelectClause - final SELECT (jenlap=2):",
        finalSelectClause
      );

      return finalSelectClause;
    }
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
    const { jenlap, thang } = inquiryState;

    // Base conditions - different for each jenlap
    const baseConditions = [];

    if (jenlap === "1") {
      // Data Semua Kontrak - no thang condition needed as it's in table name
      // Add any specific conditions for contract data if needed
    } else if (jenlap === "2") {
      // Data Kontrak Valas - no thang condition needed as it's in table name
      // Currency filter will be added in jenlap-specific conditions
    } else {
      // Default case - no base conditions
    }

    // Add jenlap-specific conditions
    const jenlapConditions = this.getJenlapConditions(inquiryState);
    if (jenlapConditions.length > 0) {
      baseConditions.push(...jenlapConditions);
    }

    // Get filter conditions
    const filterResult = this.filterBuilder.buildAllFilters(inquiryState);
    const filterConditions = filterResult.whereConditions;

    // Combine all conditions
    const allConditions = [...baseConditions, ...filterConditions];

    return allConditions.length > 0
      ? `WHERE ${allConditions.join(" AND ")}`
      : "";
  }

  /**
   * Get jenlap-specific conditions
   * @param {object} inquiryState - Inquiry state
   * @returns {array} - Array of jenlap conditions
   */
  getJenlapConditions(inquiryState) {
    const { jenlap } = inquiryState;

    switch (jenlap) {
      case "1": // Data Semua Kontrak
        return []; // No additional conditions needed
      case "2": // Data Kontrak Valas
        return ["a.currency<>'IDR'"]; // Filter for non-IDR currency contracts only
      default:
        return [];
    }
  }

  /**
   * Build GROUP BY clause
   * @param {object} inquiryState - Inquiry state
   * @returns {string} - GROUP BY clause
   */
  buildGroupByClause(inquiryState) {
    const { jenlap } = inquiryState;
    const filterResult = this.filterBuilder.buildAllFilters(inquiryState);

    console.log(
      "🔍 buildGroupByClause - filterResult.groupBy:",
      filterResult.groupBy
    );

    if (jenlap === "1") {
      // Data Semua Kontrak - group by contract-specific columns
      const baseGroupBy = [
        "a.nokontrak",
        "a.tgkontrak",
        "a.tgterima",
        "a.termin_ke",
        "tgljatuhtempo_termin",
        "a.tgljatuhtempo",
        "a.deskripsi",
      ];

      // Add filter grouping first, then base grouping
      const filterGroupBy = filterResult.groupBy || [];

      // Combine filter grouping first, then base grouping
      const allGroupBy = [...new Set([...filterGroupBy, ...baseGroupBy])];

      console.log("🔍 buildGroupByClause - baseGroupBy:", baseGroupBy);
      console.log("🔍 buildGroupByClause - filterGroupBy:", filterGroupBy);
      console.log("🔍 buildGroupByClause - allGroupBy:", allGroupBy);

      const finalGroupBy =
        allGroupBy.length > 0 ? `GROUP BY ${allGroupBy.join(", ")}` : "";
      console.log("🔍 buildGroupByClause - final GROUP BY:", finalGroupBy);

      return finalGroupBy;
    } else {
      // Data Kontrak Valas - use new contract-specific grouping with currency
      const baseGroupBy = [
        "a.currency",
        "a.kurs_user",
        "a.nokontrak",
        "a.tgkontrak",
        "a.tgterima",
        "a.termin_ke",
        "tgljatuhtempo_termin",
        "a.tgljatuhtempo",
        "a.deskripsi",
      ];

      // Add filter grouping first, then base grouping
      const filterGroupBy = filterResult.groupBy || [];

      // Combine filter grouping first, then base grouping
      const allGroupBy = [...new Set([...filterGroupBy, ...baseGroupBy])];

      console.log(
        "🔍 buildGroupByClause - baseGroupBy (jenlap=2):",
        baseGroupBy
      );
      console.log(
        "🔍 buildGroupByClause - filterGroupBy (jenlap=2):",
        filterGroupBy
      );
      console.log("🔍 buildGroupByClause - allGroupBy (jenlap=2):", allGroupBy);

      const finalGroupBy =
        allGroupBy.length > 0 ? `GROUP BY ${allGroupBy.join(", ")}` : "";
      console.log(
        "🔍 buildGroupByClause - final GROUP BY (jenlap=2):",
        finalGroupBy
      );

      return finalGroupBy;
    }
  }

  /**
   * Build ORDER BY clause
   * @param {object} inquiryState - Inquiry state
   * @returns {string} - ORDER BY clause (disabled - returns empty string)
   */
  buildOrderByClause(inquiryState) {
    // ORDER BY disabled for inquiry-kontrak - return empty string
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

export default InquiryKontrakQueryBuilder;
