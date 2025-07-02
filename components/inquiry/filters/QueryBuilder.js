/**
 * Modular Query Builder
 * Replaces the monolithic useQueryBuilder with a clean, modular approach
 */

import FilterBuilder from "./FilterBuilder";

class QueryBuilder {
  constructor() {
    this.filterBuilder = new FilterBuilder();
  }

  /**
   * Build dynamic FROM and SELECT clauses based on jenlap and other parameters
   * @param {object} params - Query parameters
   * @returns {object} - { dynamicFrom, dynamicSelect }
   */
  buildDynamicFromAndSelect(params) {
    const { thang, jenlap, cutoff, tanggal, akumulatif, pembulatan } = params;

    // Base table names (from original logic)
    const fromapbn = `monev${thang}.pagu_real_detail_harian_dipa_apbn_${thang} a`;
    const fromBulanan = `monev${thang}.pagu_real_detail_bulan_${thang} a`;
    const fromcaput =
      thang >= "2021"
        ? `monev${thang}.pagu_output_${thang}_new a`
        : `monev${thang}.pagu_output_${thang}_new a`;
    const fromJnsblokir = `monev${thang}.pa_pagu_blokir_akun_${thang}_bulanan a`;

    // Generate cutoff-based realizations
    const validCutoff =
      parseInt(cutoff) >= 1 && parseInt(cutoff) <= 12 ? parseInt(cutoff) : 12;
    let realColumns = "";
    for (let i = 1; i <= validCutoff; i++) {
      realColumns += `real${i}`;
      if (i !== validCutoff) realColumns += "+ ";
    }

    // Build SELECT clauses - use pagu_apbn for jenlap=1, pagu for others
    const paguField = jenlap === "1" ? "a.pagu_apbn" : "a.pagu";
    const pagu = `, ROUND(SUM(${paguField})/${pembulatan},0) AS PAGU`;
    const paguapbn = `, ROUND(SUM(${paguField})/${pembulatan},0) AS PAGU_APBN`;
    const pagudipa = `, ROUND(SUM(a.pagu_dipa)/${pembulatan},0) AS PAGU_DIPA`;
    const blokir = `, ROUND(SUM(a.blokir)/${pembulatan},0) AS BLOKIR`;
    const selectClause = `, ROUND(SUM(${realColumns})/${pembulatan},0) AS REALISASI`;
    const realapbn = `, ROUND(SUM(real1+real2+real3+real4+real5+real6+real7+real8+real9+real10+real11+real12)/${pembulatan},0) AS REALISASI`;

    // Monthly columns for jenlap=3
    const monthLabels = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MEI",
      "JUN",
      "JUL",
      "AGS",
      "SEP",
      "OKT",
      "NOV",
      "DES",
    ];
    let realbulanan = "";
    let realbulananakumulatif = "";
    let realBulanan = "";
    let blokirBulanan = "";

    for (let i = 1; i <= 12; i++) {
      const monthName = monthLabels[i - 1];
      if (i <= validCutoff) {
        // Monthly realization
        realbulanan += `, ROUND(SUM(real${i})/${pembulatan},0) AS ${monthName}`;

        // Accumulated monthly
        let accumulatedRealCols = "";
        for (let j = 1; j <= i; j++) {
          accumulatedRealCols += `real${j}`;
          if (j < i) accumulatedRealCols += "+";
        }
        realbulananakumulatif += `, ROUND(SUM(${accumulatedRealCols})/${pembulatan},0) AS ${monthName}`;

        // Pagu Bulanan
        realBulanan += `, ROUND(sum(pagu${i})/${pembulatan}, 0) AS ${monthName}`;

        // Blokir Bulanan
        blokirBulanan += `, ROUND(sum(blokir${i})/${pembulatan}, 0) AS ${monthName}`;
      } else {
        realbulanan += `, 0 AS ${monthName}`;
        realbulananakumulatif += `, 0 AS ${monthName}`;
        realBulanan += `, 0 AS ${monthName}`;
        blokirBulanan += `, 0 AS ${monthName}`;
      }
    }

    // Special cases
    const selectcaput = `, ROUND(SUM(${paguField})/${pembulatan},0) AS PAGU, ROUND(SUM(${realColumns})/${pembulatan},0) AS REALISASI`;
    const blokircaput = `, ROUND(SUM(a.blokir)/${pembulatan},0) AS BLOKIR`;
    const jnsblokirBulanan = `, a.kdblokir, ROUND(SUM(a.blokir)/${pembulatan},0) AS BLOKIR`;

    // jenlap = 6: Volume Output Kegiatan (PN) - Data Caput (uses pagu_output table)
    const jenlap6Select = `, a.sat as satuan, SUM(vol) AS vol, sum(${paguField}) as pagu, sum(real1) as rjan, sum(persen1) as pjan, sum(realfisik1) as rpjan, sum(real2) as rfeb, sum(persen2) as pfeb, sum(realfisik2) as rpfeb, sum(real3) as rmar, sum(persen3) as pmar, sum(realfisik3) as rpmar, sum(real4) as rapr, sum(persen4) as papr, sum(realfisik4) as rpapr, sum(real5) as rmei, sum(persen5) as pmei, sum(realfisik5) as rpmei, sum(real6) as rjun, sum(persen6) as pjun, sum(realfisik6) as rpjun, sum(real7) as rjul, sum(persen7) as pjul, sum(realfisik7) as rpjul, sum(real8) as rags, sum(persen8) as pags, sum(realfisik8) as rpags, sum(real9) as rsep, sum(persen9) as psep, sum(realfisik9) as rpsep, sum(real10) as rokt, sum(persen10) as pokt, sum(realfisik10) as rpokt, sum(real11) as rnov, sum(persen11) as pnov, sum(realfisik11) as rpnov, sum(real12) as rdes, sum(persen12) as pdes, sum(realfisik12) as rpdes, os, a.ket`;

    // jenlap = 7: Pergerakan Blokir Bulanan per Jenis (kdblokir, nmblokir + monthly blokir breakdown)
    const blokirBulananSelect = `, a.kdblokir, a.nmblokir${blokirBulanan}`;

    // Historical tables
    const monthNames = [
      "",
      "januari",
      "februari",
      "maret",
      "april",
      "mei",
      "juni",
      "juli",
      "agustus",
      "september",
      "oktober",
      "november",
      "desember",
    ];
    const historicalTable = `dbhistori.pagu_real_detail_harian_${
      monthNames[parseInt(cutoff)]
    }_${thang} a`;
    const currentTable = `monev${thang}.pagu_real_detail_harian_${thang} a`;

    // Main switch logic
    let dynamicFrom = "";
    let dynamicSelect = "";

    // Debug logging to check jenlap value
    console.log("🔍 QueryBuilder Debug:", {
      jenlap,
      jenlapType: typeof jenlap,
    });

    switch (jenlap) {
      case "1":
        console.log("📊 Using jenlap 1 (DIPA APBN)");
        dynamicFrom = fromapbn;
        dynamicSelect = paguapbn + pagudipa + realapbn + blokir;
        break;
      case "2":
        console.log("📊 Using jenlap 2 (Pagu Realisasi Blokir)");
        dynamicFrom = tanggal ? historicalTable : currentTable;
        dynamicSelect = pagu + selectClause + blokir;
        break;
      case "3":
        console.log("📊 Using jenlap 3 (Realisasi Bulanan)");
        dynamicFrom = tanggal ? historicalTable : currentTable;
        dynamicSelect =
          jenlap === "3" && akumulatif === "1"
            ? pagu + realbulananakumulatif + blokir
            : pagu + realbulanan + blokir;
        break;
      case "4":
        console.log("📊 Using jenlap 4 (Pagu Bulanan)");
        dynamicFrom = fromBulanan;
        dynamicSelect = realBulanan;
        break;
      case "5":
        console.log("📊 Using jenlap 5 (Blokir Bulanan)");
        dynamicFrom = fromBulanan;
        dynamicSelect = blokirBulanan;
        break;
      case "6":
        console.log("📊 Using jenlap 6 (Volume Output Kegiatan - Data Caput)");
        dynamicFrom = fromcaput;
        dynamicSelect = jenlap6Select;
        break;
      case "7":
        console.log("📊 Using jenlap 7 (Pergerakan Blokir Bulanan per Jenis)");
        dynamicFrom = fromJnsblokir;
        dynamicSelect = blokirBulananSelect;
        break;
      default:
        console.log("📊 Using default jenlap");
        dynamicFrom = currentTable;
        dynamicSelect = pagu + blokir;
        break;
    }

    return { dynamicFrom, dynamicSelect };
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
    const whereClause = this.filterBuilder.buildWhereClause(inquiryState);

    // Build final SELECT clause
    let finalSelectClause = "";
    if (filterResult.columns.length > 0) {
      finalSelectClause = filterResult.columns.join(", ") + dynamicSelect;
    } else {
      finalSelectClause = dynamicSelect.substring(1); // Remove leading comma
    }

    // Build GROUP BY clause
    let groupByClause = "";
    const groupByFields = [...filterResult.groupBy];

    console.log("🔍 Initial groupByFields:", groupByFields);

    // Special handling for jenlap = 6: Add sat, os, ket to GROUP BY (Volume Output Kegiatan - Data Caput)
    if (inquiryState.jenlap === "6") {
      console.log("📊 Adding sat, os, ket to GROUP BY for jenlap 6");
      groupByFields.push("a.sat", "a.os", "a.ket");
    }

    // Special handling for jenlap = 7: Add kdblokir to GROUP BY for blokir breakdown (Pergerakan Blokir Bulanan per Jenis)
    if (inquiryState.jenlap === "7") {
      console.log("📊 Adding kdblokir to GROUP BY for jenlap 7");
      groupByFields.push("a.kdblokir");
    }

    console.log("🔍 Final groupByFields:", groupByFields);

    if (groupByFields.length > 0) {
      groupByClause = `GROUP BY ${groupByFields.join(", ")}`;
    }

    // Combine JOIN clauses
    const joinClause = filterResult.joinClauses.join("");

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
