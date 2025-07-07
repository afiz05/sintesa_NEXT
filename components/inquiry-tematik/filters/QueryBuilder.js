/**
 * Modular Query Builder
 * Replaces the monolithic useQueryBuilder with a clean, modular approach
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
        console.log("📊 Using jenlap 1 (Proyek Nasional - PN)");
        console.log("🔍 Jenlap 1 Radio Values:", {
          pnradio: params.pnradio,
          ppradio: params.ppradio,
          kegiatanprioritasradio: params.kegiatanprioritasradio,
          priradio: params.priradio,
        });
        dynamicFrom = `monev${thang}.a_pagu_real_bkpk_dja_${thang} a`;
        // For jenlap=1, we need to build priority columns dynamically based on Jenis Tampilan radio values
        const priorityColumns = this.buildJenlap1PriorityColumns(params);
        console.log("🔍 Built priority columns:", priorityColumns);
        dynamicSelect = `${priorityColumns}, ROUND(sum(a.pagu)/${pembulatan},0) AS PAGU, ROUND(SUM(real1)/${pembulatan},0) AS JAN, ROUND(SUM(real2)/${pembulatan}, 0) AS FEB, ROUND(SUM(real3)/${pembulatan}, 0) AS MAR, ROUND(SUM(real4)/${pembulatan}, 0) AS APR, ROUND(SUM(real5)/${pembulatan}, 0) AS MEI, ROUND(SUM(real6)/${pembulatan}, 0) AS JUN, ROUND(SUM(real7)/${pembulatan}, 0) AS JUL, ROUND(SUM(real8)/${pembulatan}, 0) AS AGS, ROUND(SUM(real9)/${pembulatan}, 0) AS SEP, ROUND(SUM(real10)/${pembulatan}, 0) AS OKT, ROUND(SUM(real11)/${pembulatan}, 0) AS NOV, ROUND(SUM(real12)/${pembulatan}, 0) AS DES, ROUND(SUM(a.blokir) /${pembulatan},0) AS BLOKIR`;
        break;
      case "2":
        console.log("📊 Using jenlap 2 (DIPA APBN)");
        dynamicFrom = fromapbn;
        dynamicSelect = paguapbn + pagudipa + realapbn + blokir;
        break;
      case "3":
        console.log("📊 Using jenlap 3 (Pagu Realisasi Blokir)");
        dynamicFrom = tanggal ? historicalTable : currentTable;
        dynamicSelect = pagu + selectClause + blokir;
        break;
      case "4":
        console.log("📊 Using jenlap 4 (Realisasi Bulanan)");
        dynamicFrom = tanggal ? historicalTable : currentTable;
        dynamicSelect =
          jenlap === "4" && akumulatif === "1"
            ? pagu + realbulananakumulatif + blokir
            : pagu + realbulanan + blokir;
        break;
      case "5":
        console.log("📊 Using jenlap 5 (Pagu Bulanan)");
        dynamicFrom = fromBulanan;
        dynamicSelect = realBulanan;
        break;
      case "6":
        console.log("📊 Using jenlap 6 (Blokir Bulanan)");
        dynamicFrom = fromBulanan;
        dynamicSelect = blokirBulanan;
        break;
      case "7":
        console.log("📊 Using jenlap 7 (Volume Output Kegiatan - Data Caput)");
        dynamicFrom = fromcaput;
        dynamicSelect = jenlap6Select;
        break;
      case "8":
        console.log("📊 Using jenlap 8 (Pergerakan Blokir Bulanan per Jenis)");
        dynamicFrom = fromJnsblokir;
        dynamicSelect = blokirBulananSelect;
        break;
      case "9":
        console.log("📊 Using jenlap 9 (Reserved for Future Use)");
        dynamicFrom = currentTable;
        dynamicSelect = pagu + blokir;
        break;
      case "10":
        console.log("📊 Using jenlap 10 (Reserved for Future Use)");
        dynamicFrom = currentTable;
        dynamicSelect = pagu + blokir;
        break;
      case "11":
        console.log("📊 Using jenlap 11 (Reserved for Future Use)");
        dynamicFrom = currentTable;
        dynamicSelect = pagu + blokir;
        break;
      case "12":
        console.log("📊 Using jenlap 12 (Reserved for Future Use)");
        dynamicFrom = currentTable;
        dynamicSelect = pagu + blokir;
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
   * Build priority columns for jenlap=1 based on Jenis Tampilan radio values
   * @param {object} params - Query parameters including radio values
   * @returns {string} - Comma-separated column list
   */
  buildJenlap1PriorityColumns(params) {
    const { thang, pnradio, ppradio, kegiatanprioritasradio, priradio } =
      params;
    const columns = [];

    // PN (Proyek Nasional) columns based on pnradio
    if (pnradio && pnradio !== "4") {
      // Not "Jangan Tampilkan"
      switch (pnradio) {
        case "1": // Kode only
          columns.push("a.kdpn");
          break;
        case "2": // Kode + Uraian
          columns.push("a.kdpn", "pn.nmpn");
          break;
        case "3": // Uraian only
          columns.push("pn.nmpn");
          break;
      }
    }

    // PP (Propres) columns based on ppradio
    if (ppradio && ppradio !== "4") {
      // Not "Jangan Tampilkan"
      switch (ppradio) {
        case "1": // Kode only
          columns.push("a.kdpp");
          break;
        case "2": // Kode + Uraian
          columns.push("a.kdpp", "pp.nmpp");
          break;
        case "3": // Uraian only
          columns.push("pp.nmpp");
          break;
      }
    }

    // KP (Kegiatan Prioritas) columns based on kegiatanprioritasradio
    if (kegiatanprioritasradio && kegiatanprioritasradio !== "4") {
      // Not "Jangan Tampilkan"
      switch (kegiatanprioritasradio) {
        case "1": // Kode only
          columns.push("a.kdkp");
          break;
        case "2": // Kode + Uraian
          columns.push("a.kdkp", "pg.nmkp");
          break;
        case "3": // Uraian only
          columns.push("pg.nmkp");
          break;
      }
    }

    // PRI (Prioritas) columns based on priradio
    if (priradio && priradio !== "4") {
      // Not "Jangan Tampilkan"
      switch (priradio) {
        case "1": // Kode only
          columns.push("a.kdproy");
          break;
        case "2": // Kode + Uraian
          columns.push("a.kdproy", "pri.nmproy");
          break;
        case "3": // Uraian only
          columns.push("pri.nmproy");
          break;
      }
    }

    // If no columns are selected, we still need at least the code columns for proper grouping
    if (columns.length === 0) {
      columns.push("a.kdpn", "a.kdpp", "a.kdkp", "a.kdproy");
    }

    return columns.join(",");
  }

  /**
   * Build JOIN clauses for jenlap=1 based on Jenis Tampilan radio values
   * @param {object} params - Query parameters including radio values and thang
   * @returns {string} - JOIN clauses
   */
  buildJenlap1JoinClauses(params) {
    const { thang, pnradio, ppradio, kegiatanprioritasradio, priradio } =
      params;
    const joins = [];

    // PN (Proyek Nasional) JOIN if needed
    if (pnradio && (pnradio === "2" || pnradio === "3")) {
      joins.push(` LEFT JOIN dbref.t_prinas_${thang} pn ON a.kdpn=pn.kdpn`);
    }

    // PP (Propres) JOIN if needed
    if (ppradio && (ppradio === "2" || ppradio === "3")) {
      joins.push(` LEFT JOIN dbref.t_priprog_${thang} pp ON a.kdpp=pp.kdpp`);
    }

    // KP (Kegiatan Prioritas) JOIN if needed
    if (
      kegiatanprioritasradio &&
      (kegiatanprioritasradio === "2" || kegiatanprioritasradio === "3")
    ) {
      joins.push(
        ` LEFT JOIN dbref.t_prigiat_${thang} pg ON a.kdkp=pg.kdkp AND a.kdpp=pg.kdpp AND a.kdpn=pg.kdpn`
      );
    }

    // PRI (Prioritas) JOIN if needed
    if (priradio && (priradio === "2" || priradio === "3")) {
      joins.push(
        ` LEFT JOIN dbref.t_priproy_${thang} pri ON a.kdproy=pri.kdproy`
      );
    }

    return joins.join("");
  }

  /**
   * Build GROUP BY fields for jenlap=1 based on Jenis Tampilan radio values
   * @param {object} params - Query parameters including radio values
   * @returns {string[]} - Array of GROUP BY fields
   */
  buildJenlap1GroupBy(params) {
    const { pnradio, ppradio, kegiatanprioritasradio, priradio } = params;
    const groupByFields = [];

    // Always group by the code fields for proper aggregation
    groupByFields.push("a.kdpn", "a.kdpp", "a.kdkp", "a.kdproy");

    // Note: For text fields, we typically don't need to add them to GROUP BY
    // unless they're part of the aggregate calculation, which they usually aren't
    // The code fields are sufficient for grouping, and text fields come via JOINs

    return groupByFields;
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

    // Debug logging for jenlap=1
    if (inquiryState.jenlap === "1") {
      console.log("🔍 Jenlap 1 Filter Debug:", {
        filterColumns: filterResult.columns,
        filterJoins: filterResult.joinClauses,
        filterGroupBy: filterResult.groupBy,
        filterWhereConditions: filterResult.whereConditions,
      });
    }

    // Build WHERE clause with access control
    let whereClause = this.filterBuilder.buildWhereClause(inquiryState);

    // Debug logging for WHERE clause
    if (inquiryState.jenlap === "1") {
      console.log("🔍 WHERE Clause Debug:", {
        originalWhereClause: whereClause,
        filterWhereConditions: filterResult.whereConditions,
      });
    }

    // Special handling for jenlap = 1: Add default WHERE condition for kdpn
    if (inquiryState.jenlap === "1") {
      const defaultCondition = "a.kdpn <>'00'";
      if (
        whereClause &&
        whereClause.trim() !== "" &&
        !whereClause.includes("WHERE")
      ) {
        whereClause = `WHERE ${defaultCondition} AND (${whereClause.replace(
          /^WHERE\s*/i,
          ""
        )})`;
      } else if (whereClause && whereClause.includes("WHERE")) {
        whereClause = whereClause.replace(
          /WHERE\s*/i,
          `WHERE ${defaultCondition} AND `
        );
      } else {
        whereClause = `WHERE ${defaultCondition}`;
      }
    }

    // Build final SELECT clause
    let finalSelectClause = "";

    // Special handling for jenlap = 1: Combine base filter columns with priority columns
    if (inquiryState.jenlap === "1") {
      // For jenlap = 1, combine base filter columns with dynamicSelect
      if (filterResult.columns.length > 0) {
        finalSelectClause =
          filterResult.columns.join(", ") + ", " + dynamicSelect;
        console.log(
          "🔍 Jenlap 1 Final SELECT (with filters):",
          finalSelectClause
        );
      } else {
        finalSelectClause = dynamicSelect;
        console.log(
          "🔍 Jenlap 1 Final SELECT (no filters):",
          finalSelectClause
        );
      }
    } else {
      // For other jenlap values, combine filter columns with dynamic select
      if (filterResult.columns.length > 0) {
        finalSelectClause = filterResult.columns.join(", ") + dynamicSelect;
      } else {
        finalSelectClause = dynamicSelect.substring(1); // Remove leading comma
      }
    }

    // Build GROUP BY clause
    let groupByClause = "";
    const groupByFields = [...filterResult.groupBy];

    console.log("🔍 Initial groupByFields:", groupByFields);

    // Special handling for jenlap = 1: Add priority fields to GROUP BY based on what's actually selected (Proyek Nasional)
    if (inquiryState.jenlap === "1") {
      console.log("📊 Adding priority fields to GROUP BY for jenlap 1");

      // Build GROUP BY based on the selected columns in dynamicSelect
      const priorityGroupBy = this.buildJenlap1GroupBy(inquiryState);
      if (priorityGroupBy.length > 0) {
        // For jenlap=1, use priority GROUP BY fields instead of adding to existing ones
        groupByFields.length = 0; // Clear existing group by fields
        groupByFields.push(...priorityGroupBy);
      }
    }

    // Special handling for jenlap = 7: Add sat, os, ket to GROUP BY (Volume Output Kegiatan - Data Caput)
    if (inquiryState.jenlap === "7") {
      console.log("📊 Adding sat, os, ket to GROUP BY for jenlap 7");
      groupByFields.push("a.sat", "a.os", "a.ket");
    }

    // Special handling for jenlap = 8: Add kdblokir to GROUP BY for blokir breakdown (Pergerakan Blokir Bulanan per Jenis)
    if (inquiryState.jenlap === "8") {
      console.log("📊 Adding kdblokir to GROUP BY for jenlap 8");
      groupByFields.push("a.kdblokir");
    }

    console.log("🔍 Final groupByFields:", groupByFields);

    if (groupByFields.length > 0) {
      groupByClause = `GROUP BY ${groupByFields.join(", ")}`;
    }

    // Combine JOIN clauses
    let joinClause = filterResult.joinClauses.join("");

    // Special handling for jenlap = 1: Add priority table JOINs based on Jenis Tampilan radio values
    if (inquiryState.jenlap === "1") {
      const jenlap1Joins = this.buildJenlap1JoinClauses(inquiryState);
      console.log("🔍 Original joinClause:", joinClause);
      console.log("🔍 Jenlap1 joins:", jenlap1Joins);
      joinClause += jenlap1Joins;

      // Remove duplicate JOINs
      const originalJoinClause = joinClause;
      joinClause = this.deduplicateJoins(joinClause);
      console.log("🔍 Before deduplication:", originalJoinClause);
      console.log("🔍 After deduplication:", joinClause);
    }

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

    // Special validation for jenlap = 1 (Proyek Nasional)
    if (query.includes("a_pagu_real_bkpk_dja_")) {
      if (!query.includes("a.kdpn")) {
        warnings.push("Jenlap 1 query should include kdpn field");
      }
      if (!query.includes("a.kdpn <>'00'")) {
        warnings.push("Jenlap 1 query should filter out kdpn='00'");
      }
      if (!query.includes("GROUP BY a.kdpn,a.kdpp,a.kdkp,a.kdproy")) {
        warnings.push(
          "Jenlap 1 query should group by kdpn, kdpp, kdkp, kdproy"
        );
      }
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
