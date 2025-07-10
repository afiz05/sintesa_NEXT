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

    // jenlap = 8: Volume Output Kegiatan (Data Caput) - uses pagu_output table
    const jenlap8Select = `, a.sat as satuan, SUM(vol) AS vol, sum(${paguField}) as pagu, sum(real1) as rjan, sum(persen1) as pjan, sum(realfisik1) as rpjan, sum(real2) as rfeb, sum(persen2) as pfeb, sum(realfisik2) as rpfeb, sum(real3) as rmar, sum(persen3) as pmar, sum(realfisik3) as rpmar, sum(real4) as rapr, sum(persen4) as papr, sum(realfisik4) as rpapr, sum(real5) as rmei, sum(persen5) as pmei, sum(realfisik5) as rpmei, sum(real6) as rjun, sum(persen6) as pjun, sum(realfisik6) as rpjun, sum(real7) as rjul, sum(persen7) as pjul, sum(realfisik7) as rpjul, sum(real8) as rags, sum(persen8) as pags, sum(realfisik8) as rpags, sum(real9) as rsep, sum(persen9) as psep, sum(realfisik9) as rpsep, sum(real10) as rokt, sum(persen10) as pokt, sum(realfisik10) as rpokt, sum(real11) as rnov, sum(persen11) as pnov, sum(realfisik11) as rpnov, sum(real12) as rdes, sum(persen12) as pdes, sum(realfisik12) as rpdes, os, a.ket`;

    // jenlap = 9: Pergerakan Blokir Bulanan per Jenis (kdblokir, nmblokir + monthly blokir breakdown)
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

    switch (jenlap) {
      case "1":
        // Belanja - using new table with rencana and realisasi columns
        dynamicFrom = `monev${thang}.rencana_real_harian_output_${thang}_new a`;
        dynamicSelect = `, ROUND(SUM(a.pagu)/${pembulatan}, 0) AS pagu, ROUND(sum(renc1)/${pembulatan}, 0) as renc1, ROUND(sum(real1)/${pembulatan}, 0) as real1, ROUND(sum(renc2)/${pembulatan}, 0) as renc2, ROUND(sum(real2)/${pembulatan}, 0) as real2, ROUND(sum(renc3)/${pembulatan}, 0) as renc3, ROUND(sum(real3)/${pembulatan}, 0) as real3, ROUND(sum(renc4)/${pembulatan}, 0) as renc4, ROUND(sum(real4)/${pembulatan}, 0) as real4, ROUND(sum(renc5)/${pembulatan}, 0) as renc5, ROUND(sum(real5)/${pembulatan}, 0) as real5, ROUND(sum(renc6)/${pembulatan}, 0) as renc6, ROUND(sum(real6)/${pembulatan}, 0) as real6, ROUND(sum(renc7)/${pembulatan}, 0) as renc7, ROUND(sum(real7)/${pembulatan}, 0) as real7, ROUND(sum(renc8)/${pembulatan}, 0) as renc8, ROUND(sum(real8)/${pembulatan}, 0) as real8, ROUND(sum(renc9)/${pembulatan}, 0) as renc9, ROUND(sum(real9)/${pembulatan}, 0) as real9, ROUND(sum(renc10)/${pembulatan}, 0) as renc10, ROUND(sum(real10)/${pembulatan}, 0) as real10, ROUND(sum(renc11)/${pembulatan}, 0) as renc11, ROUND(sum(real11)/${pembulatan}, 0) as real11, ROUND(sum(renc12)/${pembulatan}, 0) as renc12, ROUND(sum(real12)/${pembulatan}, 0) as real12`;
        break;
      case "2":
        // Penerimaan Negara Bukan Pajak - using new PNBP table with month-named columns
        dynamicFrom = `monev${thang}.pnbp_rencana_${thang} a`;
        dynamicSelect = `, ROUND(SUM(rencjan)/${pembulatan}, 0) AS renc1, ROUND(SUM(realjan)/${pembulatan}, 0) AS real1, ROUND(SUM(rencfeb)/${pembulatan}, 0) AS renc2, ROUND(SUM(realfeb)/${pembulatan}, 0) AS real2, ROUND(SUM(rencmar)/${pembulatan}, 0) AS renc3, ROUND(SUM(realmar)/${pembulatan}, 0) AS real3, ROUND(SUM(rencapr)/${pembulatan}, 0) AS renc4, ROUND(SUM(realapr)/${pembulatan}, 0) AS real4, ROUND(SUM(rencmei)/${pembulatan}, 0) AS renc5, ROUND(SUM(realmei)/${pembulatan}, 0) AS real5, ROUND(SUM(rencjun)/${pembulatan}, 0) AS renc6, ROUND(SUM(realjun)/${pembulatan}, 0) AS real6, ROUND(SUM(rencjul)/${pembulatan}, 0) AS renc7, ROUND(SUM(realjul)/${pembulatan}, 0) AS real7, ROUND(SUM(rencags)/${pembulatan}, 0) AS renc8, ROUND(SUM(realags)/${pembulatan}, 0) AS real8, ROUND(SUM(rencsep)/${pembulatan}, 0) AS renc9, ROUND(SUM(realsep)/${pembulatan}, 0) AS real9, ROUND(SUM(rencokt)/${pembulatan}, 0) AS renc10, ROUND(SUM(realokt)/${pembulatan}, 0) AS real10, ROUND(SUM(rencnov)/${pembulatan}, 0) AS renc11, ROUND(SUM(realnov)/${pembulatan}, 0) AS real11, ROUND(SUM(rencdes)/${pembulatan}, 0) AS renc12, ROUND(SUM(realdes)/${pembulatan}, 0) AS real12`;
        break;
      default:
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

    // No special WHERE conditions needed for basic Belanja/PNBP inquiry

    // Build final SELECT clause
    let finalSelectClause = "";

    // Standard handling for all jenlap values (1 or 2)
    if (filterResult.columns.length > 0) {
      finalSelectClause = filterResult.columns.join(", ") + dynamicSelect;
    } else {
      finalSelectClause = dynamicSelect.substring(1); // Remove leading comma
    }

    // Build GROUP BY clause
    let groupByClause = "";
    const groupByFields = [...filterResult.groupBy];

    // Standard GROUP BY handling for all jenlap values (1 or 2)
    // Use the filter-selected columns for grouping - no special handling needed

    // Deduplicate GROUP BY fields to prevent duplicates like a.mbg appearing twice
    const deduplicatedGroupByFields =
      this.deduplicateGroupByFields(groupByFields);

    if (deduplicatedGroupByFields.length > 0) {
      groupByClause = `GROUP BY ${deduplicatedGroupByFields.join(", ")}`;
    }

    // Combine JOIN clauses
    let joinClause = filterResult.joinClauses.join("");

    // Standard JOIN handling for all jenlap values (1 or 2)
    // Use the filter-generated JOINs - no special handling needed

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

    // Special validation for jenlap = 4 (Inflasi)
    if (
      query.includes("A.inf_intervensi") &&
      query.includes("A.inf_pengeluaran")
    ) {
      if (
        !query.includes(
          "A.inf_intervensi <> 'NULL' or A.inf_pengeluaran <> 'NULL'"
        )
      ) {
        warnings.push(
          "Jenlap 4 query should filter for non-NULL inflasi values"
        );
      }
      if (!query.includes("GROUP BY A.inf_intervensi,A.inf_pengeluaran")) {
        warnings.push(
          "Jenlap 4 query should group by inf_intervensi, inf_pengeluaran"
        );
      }
    }

    // Special validation for jenlap = 5 (Stunting)
    if (query.includes("A.STUN_INTERVENSI")) {
      if (!query.includes("A.STUN_INTERVENSI IS NOT NULL")) {
        warnings.push(
          "Jenlap 5 query should filter for non-NULL stunting values"
        );
      }
      if (!query.includes("GROUP BY A.STUN_INTERVENSI")) {
        warnings.push("Jenlap 5 query should group by STUN_INTERVENSI");
      }
      if (
        !query.includes("a_pagu_real_bkpk_dja_") ||
        !query.includes("_stunting")
      ) {
        warnings.push("Jenlap 5 query should use stunting table");
      }
      // Check if specific stunting selection is properly formatted
      if (
        query.includes("A.STUN_INTERVENSI = '") &&
        !query.includes("IS NOT NULL AND A.STUN_INTERVENSI = '")
      ) {
        warnings.push(
          "Jenlap 5 query should include both NOT NULL and specific selection conditions"
        );
      }
    }

    // Special validation for jenlap = 6 (Kemiskinan)
    if (query.includes("a.kemiskinan_ekstrim")) {
      if (!query.includes("a.kemiskinan_ekstrim <> 'NULL'")) {
        warnings.push(
          "Jenlap 6 query should filter for non-NULL kemiskinan values"
        );
      }
      if (!query.includes("GROUP BY a.kemiskinan_ekstrim")) {
        warnings.push("Jenlap 6 query should group by kemiskinan_ekstrim");
      }
      if (!query.includes("a_pagu_real_bkpk_dja_")) {
        warnings.push("Jenlap 6 query should use bkpk_dja table");
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

  /**
   * Build inflasi columns for jenlap=4 based on Jenis Tampilan radio values
   * @param {object} params - Query parameters including radio values
   * @returns {string} - Comma-separated column list
   */
  buildJenlap4InflasiColumns(params) {
    const { inflasiradio, infintervensiradio, jenistampilanradio } = params;
    const columns = [];

    // Use the correct parameter name - inflasiradio from InflasiFilter component
    const radioValue =
      inflasiradio || infintervensiradio || jenistampilanradio || "1";

    // inf_intervensi columns based on radio value
    if (radioValue && radioValue !== "4") {
      // Not "Jangan Tampilkan"
      switch (radioValue) {
        case "1": // Kode only
          columns.push("A.inf_intervensi");
          break;
        case "2": // Kode + Uraian
          columns.push("A.inf_intervensi", "rip.ur_inf_pengeluaran");
          break;
        case "3": // Uraian only
          columns.push("rip.ur_inf_pengeluaran");
          break;
      }
    } else {
      // Default: show kode only
      columns.push("A.inf_intervensi");
    }

    // Always include inf_pengeluaran for now (could be extended with radio control)
    columns.push("A.inf_pengeluaran");

    return columns.join(",");
  }

  /**
   * Build JOIN clauses for jenlap=4 based on Jenis Tampilan radio values
   * @param {object} params - Query parameters including radio values and thang
   * @returns {string} - JOIN clauses
   */
  buildJenlap4JoinClauses(params) {
    const { thang, inflasiradio, infintervensiradio, jenistampilanradio } =
      params;
    const joins = [];

    // Use the correct parameter name - inflasiradio from InflasiFilter component
    const radioValue =
      inflasiradio || infintervensiradio || jenistampilanradio || "1";

    // inf_pengeluaran JOIN if uraian is needed
    if (radioValue && (radioValue === "2" || radioValue === "3")) {
      joins.push(
        ` LEFT JOIN DBREF.REF_INF_PENGELUARAN rip ON A.inf_pengeluaran=rip.inf_pengeluaran`
      );
    }

    return joins.join("");
  }

  /**
   * Build GROUP BY fields for jenlap=4 based on Jenis Tampilan radio values
   * @param {object} params - Query parameters including radio values
   * @returns {string[]} - Array of GROUP BY fields
   */
  buildJenlap4GroupBy(params) {
    const { inflasiradio, infintervensiradio, jenistampilanradio } = params;
    const groupByFields = [];

    // Use the correct parameter name - inflasiradio from InflasiFilter component
    const radioValue =
      inflasiradio || infintervensiradio || jenistampilanradio || "1";

    // inf_intervensi grouping based on radio selection
    if (radioValue && radioValue !== "4") {
      switch (radioValue) {
        case "1": // Kode only
          groupByFields.push("A.inf_intervensi");
          break;
        case "2": // Kode + Uraian
          groupByFields.push("A.inf_intervensi", "rip.ur_inf_pengeluaran");
          break;
        case "3": // Uraian only
          groupByFields.push("rip.ur_inf_pengeluaran");
          break;
      }
    } else {
      // Default: group by kode only
      groupByFields.push("A.inf_intervensi");
    }

    // Always group by inf_pengeluaran
    groupByFields.push("A.inf_pengeluaran");

    return groupByFields;
  }

  /**
   * Build stunting columns for jenlap=5 based on Jenis Tampilan radio values
   * @param {object} params - Query parameters including radio values
   * @returns {string} - Comma-separated column list
   */
  buildJenlap5StuntingColumns(params) {
    const { stuntingradio, jenistampilanradio } = params;
    const columns = [];

    // Use the correct parameter name - stuntingradio from StuntingFilter component
    const radioValue = stuntingradio || jenistampilanradio || "1";

    // STUN_INTERVENSI columns based on radio value
    if (radioValue && radioValue !== "4") {
      // Not "Jangan Tampilkan"
      switch (radioValue) {
        case "1": // Kode only
          columns.push("A.STUN_INTERVENSI");
          break;
        case "2": // Kode + Uraian
          columns.push("A.STUN_INTERVENSI", "rst.ur_stun_intervensi");
          break;
        case "3": // Uraian only
          columns.push("rst.ur_stun_intervensi");
          break;
      }
    } else {
      // Default: show kode only
      columns.push("A.STUN_INTERVENSI");
    }

    return columns.join(",");
  }

  /**
   * Build JOIN clauses for jenlap=5 based on Jenis Tampilan radio values
   * @param {object} params - Query parameters including radio values and thang
   * @returns {string} - JOIN clauses
   */
  buildJenlap5JoinClauses(params) {
    const { thang, stuntingradio, jenistampilanradio } = params;
    const joins = [];

    // Use the correct parameter name - stuntingradio from StuntingFilter component
    const radioValue = stuntingradio || jenistampilanradio || "1";

    // stun_intervensi JOIN if uraian is needed
    if (radioValue && (radioValue === "2" || radioValue === "3")) {
      joins.push(
        ` LEFT JOIN DBREF.REF_STUNTING_INTERVENSI rst ON A.STUN_INTERVENSI=rst.stun_intervensi`
      );
    }

    return joins.join("");
  }

  /**
   * Build GROUP BY fields for jenlap=5 based on Jenis Tampilan radio values
   * @param {object} params - Query parameters including radio values
   * @returns {string[]} - Array of GROUP BY fields
   */
  buildJenlap5GroupBy(params) {
    const { stuntingradio, jenistampilanradio } = params;
    const groupByFields = [];

    // Use the correct parameter name - stuntingradio from StuntingFilter component
    const radioValue = stuntingradio || jenistampilanradio || "1";

    // STUN_INTERVENSI grouping based on radio selection
    if (radioValue && radioValue !== "4") {
      switch (radioValue) {
        case "1": // Kode only
          groupByFields.push("A.STUN_INTERVENSI");
          break;
        case "2": // Kode + Uraian
          groupByFields.push("A.STUN_INTERVENSI", "rst.ur_stun_intervensi");
          break;
        case "3": // Uraian only
          groupByFields.push("rst.ur_stun_intervensi");
          break;
      }
    } else {
      // Default: group by kode only
      groupByFields.push("A.STUN_INTERVENSI");
    }

    return groupByFields;
  }
}

export default QueryBuilder;
