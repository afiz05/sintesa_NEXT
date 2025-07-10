/**
 * Modular Query Builder
 * Replaces the monolithic useQueryBuilder with a clean, modular approach
 *
 * Updated Jenlap Structure (1-12):
 * 1. Proyek Nasional (PN) - kdpn, kdpp, kdkp, kdproy with monthly breakdown
 * 2. DIPA APBN - pagu_apbn, pagu_dipa, realisasi, blokir
 * 3. Pagu Realisasi Blokir - standard pagu, realisasi, blokir
 * 4. Inflasi - inf_intervensi, inf_pengeluaran with monthly breakdown
 * 5. Stunting - STUN_INTERVENSI with monthly breakdown
 * 6. Kemiskinan - kemiskinan_ekstrim with monthly breakdown
 * 7. Blokir Bulanan - monthly blokir breakdown
 * 8. Volume Output Kegiatan (Data Caput) - satuan, volume, monthly physical progress
 * 9. Ketahanan Pangan - pangan with monthly breakdown
 * 10. Reserved for Future Use - default structure with special filter support
 * 11. MBG (Makan Bergizi Gratis) - mbg with monthly breakdown
 * 12. Swasembada Pangan - swasembada with monthly breakdown and special WHERE condition
 */

import FilterBuilder from "./FilterBuilder";

class QueryBuilder {
  constructor() {
    this.filterBuilder = new FilterBuilder();
  }

  /**
   * Build dynamic FROM and SELECT clauses for inquiry-rkakl (jenlap = 1 only)
   * @param {object} params - Query parameters
   * @returns {object} - { dynamicFrom, dynamicSelect }
   */
  buildDynamicFromAndSelect(params) {
    const { thang, pembulatan } = params;

    // Check if any of the special filters are enabled that require the full detail table
    const specialFiltersEnabled = this.hasSpecialFiltersEnabled(params);

    // inquiry-rkakl table selection logic:
    // - Use m_detail_harian_${thang} when Sub-output, Komponen, Sub-komponen, or Item filters are enabled
    // - Use m_detail_harian_part_${thang} for other cases
    const tableName = specialFiltersEnabled
      ? "m_detail_harian"
      : "m_detail_harian_part";
    const dynamicFrom = `monev${thang}.${tableName}_${thang} a`;

    // Build priority columns dynamically based on Jenis Tampilan radio values
    const priorityColumns = this.buildJenlap1PriorityColumns(params);
    // Handle empty priorityColumns to avoid leading comma
    const priorityPrefix = priorityColumns ? `${priorityColumns}, ` : "";
    // inquiry-rkakl uses simple pagu and blokir columns with pembulatan divider
    const dynamicSelect = `${priorityPrefix}ROUND(SUM(a.pagu) / ${pembulatan}, 0) AS pagu, ROUND(SUM(a.blokir) / ${pembulatan}, 0) AS blokir`;

    return { dynamicFrom, dynamicSelect };
  }

  /**
   * Check if any special filters are enabled that require the full detail table
   * @param {object} params - Query parameters
   * @returns {boolean} - True if special filters are enabled
   */
  hasSpecialFiltersEnabled(params) {
    // Special filters that require m_detail_harian_${thang} table:
    // - Sub-output (kdsoutput)
    // - Komponen (kdkomponen)
    // - Sub-komponen (kdskomponen)
    // - Item (kditem)
    return !!(
      params.kdsoutput ||
      params.kdkomponen ||
      params.kdskomponen ||
      params.kditem
    );
  }

  /**
   * Build priority columns for jenlap=1 based on Jenis Tampilan radio values
   * @param {object} params - Query parameters including radio values
   * @returns {string} - Comma-separated column list
   */
  buildJenlap1PriorityColumns(params) {
    // Priority columns are no longer used in inquiry-rkakl
    // Return empty string to remove a.kdpn, a.kdpp, a.kdkp, a.kdproy from SELECT
    return "";
  }

  /**
   * Build JOIN clauses for jenlap=1 based on Jenis Tampilan radio values
   * @param {object} params - Query parameters including radio values and thang
   * @returns {string} - JOIN clauses
   */
  buildJenlap1JoinClauses(params) {
    // Priority JOINs are no longer used in inquiry-rkakl
    // Return empty string to remove priority table JOINs
    return "";
  }

  /**
   * Build GROUP BY fields for jenlap=1 based on Jenis Tampilan radio values
   * @param {object} params - Query parameters including radio values
   * @returns {string[]} - Array of GROUP BY fields
   */
  buildJenlap1GroupBy(params) {
    // Priority GROUP BY fields are no longer used in inquiry-rkakl
    // Return empty array to remove a.kdpn, a.kdpp, a.kdkp, a.kdproy from GROUP BY
    return [];
  }

  /**
   * Remove duplicate JOIN clauses
   * @param {string} joinClause - Combined JOIN clauses
   * @returns {string} - Deduplicated JOIN clauses
   */
  deduplicateJoins(joinClause) {
    if (!joinClause || joinClause.trim() === "") {
      return "";
    }

    // Split by LEFT JOIN and filter out empty parts
    const joins = joinClause
      .split(" LEFT JOIN ")
      .filter((part) => part.trim() !== "");
    const uniqueJoins = new Set();

    joins.forEach((join) => {
      if (join.trim() !== "") {
        // Normalize the join by removing extra spaces
        const normalizedJoin = join.trim().replace(/\s+/g, " ");
        uniqueJoins.add(normalizedJoin);
      }
    });

    // Reconstruct the JOIN clause
    if (uniqueJoins.size === 0) {
      return "";
    }

    return " LEFT JOIN " + Array.from(uniqueJoins).join(" LEFT JOIN ");
  }

  /**
   * Remove duplicate GROUP BY fields
   * @param {string[]} groupByFields - Array of GROUP BY fields
   * @returns {string[]} - Deduplicated GROUP BY fields
   */
  deduplicateGroupByFields(groupByFields) {
    if (!groupByFields || groupByFields.length === 0) {
      return [];
    }

    // Use Set to remove duplicates while preserving order with Array.from
    const uniqueFields = new Set();
    const result = [];

    groupByFields.forEach((field) => {
      if (field && field.trim() !== "") {
        // Normalize the field by removing extra spaces and converting to consistent case
        const normalizedField = field.trim().replace(/\s+/g, " ");
        const lowerField = normalizedField.toLowerCase();

        if (!uniqueFields.has(lowerField)) {
          uniqueFields.add(lowerField);
          result.push(normalizedField);
        }
      }
    });

    return result;
  }

  /**
   * Build complete SQL query from inquiry state
   * @param {object} inquiryState - Complete inquiry state
   * @returns {string} - Complete SQL query
   */
  buildQuery(inquiryState) {
    // Build dynamic FROM and SELECT
    const { dynamicFrom, dynamicSelect } =
      this.buildDynamicFromAndSelect(inquiryState);

    // Build all filters
    const filterResult = this.filterBuilder.buildAllFilters(inquiryState);

    // Build WHERE clause with access control
    let whereClause = this.filterBuilder.buildWhereClause(inquiryState);

    // No special WHERE conditions needed for jenlap = 1 anymore
    // Priority filters (kdpn, kdpp, kdkp, kdproy) are no longer used

    // Build final SELECT clause - since jenlap is always "1" (Pagu dan Blokir)
    // Combine base filter columns with priority columns
    let finalSelectClause = "";
    if (filterResult.columns.length > 0) {
      finalSelectClause =
        filterResult.columns.join(", ") + ", " + dynamicSelect;
    } else {
      finalSelectClause = dynamicSelect;
    }

    // Build GROUP BY clause - since jenlap is always "1" (Pagu dan Blokir)
    // Add priority fields to GROUP BY based on what's actually selected (Proyek Nasional)
    let groupByClause = "";
    const groupByFields = [...filterResult.groupBy];

    // Build GROUP BY based on the selected columns in dynamicSelect
    const priorityGroupBy = this.buildJenlap1GroupBy(inquiryState);
    if (priorityGroupBy.length > 0) {
      // For jenlap=1, use priority GROUP BY fields instead of adding to existing ones
      groupByFields.length = 0; // Clear existing group by fields
      groupByFields.push(...priorityGroupBy);
    }

    // Deduplicate GROUP BY fields to prevent duplicates
    const deduplicatedGroupByFields =
      this.deduplicateGroupByFields(groupByFields);

    if (deduplicatedGroupByFields.length > 0) {
      groupByClause = `GROUP BY ${deduplicatedGroupByFields.join(", ")}`;
    }

    // Combine JOIN clauses - since jenlap is always "1" (Pagu dan Blokir)
    // Add priority table JOINs based on Jenis Tampilan radio values
    let joinClause = filterResult.joinClauses.join("");

    const jenlap1Joins = this.buildJenlap1JoinClauses(inquiryState);
    joinClause += jenlap1Joins;

    // Remove duplicate JOINs
    joinClause = this.deduplicateJoins(joinClause);

    // Build final query
    const finalQuery = `
      SELECT ${finalSelectClause}
      FROM ${dynamicFrom}${joinClause}
      ${whereClause}
      ${groupByClause}
    `.trim();

    return finalQuery;
  }

  /**
   * Validate query before execution
   * @param {string} query - SQL query to validate
   * @returns {object} - Validation result
   */
  validateQuery(query) {
    const errors = [];
    const warnings = [];

    if (!query || query.trim() === "") {
      errors.push("Query is empty");
    }

    if (!query.includes("FROM")) {
      errors.push("Query missing FROM clause");
    }

    if (!query.includes("SELECT")) {
      errors.push("Query missing SELECT clause");
    }

    // Special validation for jenlap = 1 (inquiry-rkakl)
    if (
      query.includes("m_detail_harian_part_") ||
      query.includes("m_detail_harian_")
    ) {
      // Basic validation for inquiry-rkakl table structure
      if (!query.includes("pagu") || !query.includes("blokir")) {
        warnings.push("Jenlap 1 query should include pagu and blokir columns");
      }
    }

    // inquiry-rkakl only uses jenlap = 1 (Pagu dan Blokir)
    // No validation needed for other jenlap values

    // Check for potentially dangerous patterns
    const dangerousPatterns = [
      /;\s*drop\s+table/i,
      /;\s*delete\s+from/i,
      /;\s*update\s+.*\s+set/i,
      /union\s+select/i,
    ];

    dangerousPatterns.forEach((pattern) => {
      if (pattern.test(query)) {
        errors.push("Potentially dangerous SQL pattern detected");
      }
    });

    // Performance warnings
    const joinCount = (query.match(/LEFT JOIN/gi) || []).length;
    if (joinCount > 10) {
      warnings.push(`High number of JOINs (${joinCount}). Query may be slow.`);
    }

    const whereConditions = (query.match(/AND|OR/gi) || []).length;
    if (whereConditions > 15) {
      warnings.push(
        `High number of WHERE conditions (${whereConditions}). Query may be slow.`
      );
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      stats: {
        queryLength: query.length,
        joinCount,
        whereConditions,
      },
    };
  }

  /**
   * Get query performance metrics
   * @param {object} inquiryState - Complete inquiry state
   * @returns {object} - Performance metrics
   */
  getQueryPerformanceMetrics(inquiryState) {
    const startTime = performance.now();
    const query = this.buildQuery(inquiryState);
    const endTime = performance.now();

    const validation = this.validateQuery(query);
    const filterStats = this.filterBuilder.getFilterStats(inquiryState);

    return {
      query,
      buildTime: endTime - startTime,
      validation,
      filterStats,
      recommendations: this.generatePerformanceRecommendations(
        validation,
        filterStats
      ),
    };
  }

  /**
   * Generate performance recommendations
   * @param {object} validation - Query validation result
   * @param {object} filterStats - Filter statistics
   * @returns {string[]} - Array of recommendations
   */
  generatePerformanceRecommendations(validation, filterStats) {
    const recommendations = [];

    if (filterStats.enabledFilters > 8) {
      recommendations.push(
        "Consider reducing the number of active filters for better performance"
      );
    }

    if (validation.stats.joinCount > 8) {
      recommendations.push(
        "High number of table JOINs detected. Consider using indexed columns"
      );
    }

    if (validation.stats.queryLength > 5000) {
      recommendations.push(
        "Query is very long. Consider breaking it into smaller queries"
      );
    }

    if (filterStats.whereConditionsCount > 12) {
      recommendations.push(
        "Many WHERE conditions detected. Ensure proper indexing on filtered columns"
      );
    }

    return recommendations;
  }

  /**
   * Generate SQL preview without building full query
   * @param {object} inquiryState - Complete inquiry state
   * @returns {object} - SQL preview components
   */
  generateSqlPreview(inquiryState) {
    const { dynamicFrom, dynamicSelect } =
      this.buildDynamicFromAndSelect(inquiryState);
    const filterResult = this.filterBuilder.buildAllFilters(inquiryState);
    const whereClause = this.filterBuilder.buildWhereClause(inquiryState);

    return {
      fromClause: dynamicFrom,
      selectClause: dynamicSelect,
      columns: filterResult.columns,
      joinClauses: filterResult.joinClauses,
      whereClause: whereClause,
      groupBy: filterResult.groupBy,
      filterStats: this.filterBuilder.getFilterStats(inquiryState),
    };
  }
}

export default QueryBuilder;
