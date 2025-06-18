/**
 * CutOffQueryGenerator - Add month-based cutoff filter to existing queries
 *
 * This generator modifies existing queries to include cutoff filters that sum
 * realization data (real1-real12) only up to a selected month.
 * For example:
 * - If "februari" is selected, it will sum only real1 + real2
 * - If "maret" is selected, it will sum real1 + real2 + real3
 *
 * This does NOT create separate cutoff columns but adds filtering logic
 * to the main query and provides information for modal display.
 *
 * Example Usage:
 * ```typescript
 * const cutoffInfo = CutOffQueryGenerator.getCutOffInfo("februari");
 * const modifiedQuery = CutOffQueryGenerator.addCutOffFilter(baseQuery, {
 *   cutOffEnabled: true,
 *   cutOff: "februari",
 *   selectedJenisLaporan: "Pagu Realisasi"
 * });
 * ```
 */

"use client";

// Type definitions for Cut Off Query Generation
export interface CutOffQueryParams {
  // Switch state
  cutOffEnabled: boolean;

  // Form data
  cutOff: string; // Selected month (januari, februari, etc.)

  // Report type
  selectedJenisLaporan: string;
  selectedTahun: string;
  selectedPembulatan: string;
}

export interface CutOffInfo {
  month: string;
  monthLabel: string;
  columnIndex: number;
  columnName: string;
  sumExpression: string;
  description: string;
}

export class CutOffQueryGenerator {
  /**
   * Generate dynamic table name based on selected year
   */
  private static getTableName(selectedTahun: string): string {
    return `monev${selectedTahun}.pagu_real_detail_harian_${selectedTahun}`;
  }

  /**
   * Get rounding divisor and format based on pembulatan selection
   */
  private static getRoundingConfig(selectedPembulatan: string): {
    divisor: number;
    formatSuffix: string;
  } {
    switch (selectedPembulatan.toLowerCase()) {
      case "rupiah":
        return { divisor: 1, formatSuffix: "" };
      case "ribu":
        return { divisor: 1000, formatSuffix: " (Ribu)" };
      case "juta":
        return { divisor: 1000000, formatSuffix: " (Juta)" };
      case "miliar":
        return { divisor: 1000000000, formatSuffix: " (Miliar)" };
      case "triliun":
        return { divisor: 1000000000000, formatSuffix: " (Triliun)" };
      default:
        return { divisor: 1, formatSuffix: "" };
    }
  }

  /**
   * Apply rounding to monetary columns in SELECT clause
   */
  private static applyRounding(
    columnName: string,
    selectedPembulatan: string
  ): string {
    const { divisor } = this.getRoundingConfig(selectedPembulatan);

    if (divisor === 1) {
      return columnName;
    }

    return `ROUND(${columnName} / ${divisor}, 2)`;
  }

  // Mapping from month names to real column numbers
  static readonly MONTH_TO_REAL_COLUMN = {
    januari: 1,
    februari: 2,
    maret: 3,
    april: 4,
    mei: 5,
    juni: 6,
    juli: 7,
    agustus: 8,
    september: 9,
    oktober: 10,
    november: 11,
    desember: 12,
  };

  static readonly MONTH_LABELS = {
    januari: "Januari",
    februari: "Februari",
    maret: "Maret",
    april: "April",
    mei: "Mei",
    juni: "Juni",
    juli: "Juli",
    agustus: "Agustus",
    september: "September",
    oktober: "Oktober",
    november: "November",
    desember: "Desember",
  };

  /**
   * Get detailed cutoff information for modal display
   */
  static getCutOffInfo(cutOff: string): CutOffInfo {
    if (!cutOff || !(cutOff in this.MONTH_TO_REAL_COLUMN)) {
      return {
        month: "",
        monthLabel: "",
        columnIndex: 12,
        columnName: "real12",
        sumExpression:
          "real1 + real2 + real3 + real4 + real5 + real6 + real7 + real8 + real9 + real10 + real11 + real12",
        description: "Periode Cut-Off Data s.d. Desember (seluruh periode)",
      };
    }

    const columnIndex =
      this.MONTH_TO_REAL_COLUMN[
        cutOff as keyof typeof this.MONTH_TO_REAL_COLUMN
      ];
    const monthLabel =
      this.MONTH_LABELS[cutOff as keyof typeof this.MONTH_LABELS];
    const columnName = `real${columnIndex}`;

    // Generate sum expression up to cutoff month
    const realColumns = [];
    for (let i = 1; i <= columnIndex; i++) {
      realColumns.push(`real${i}`);
    }
    const sumExpression = realColumns.join(" + ");
    return {
      month: cutOff,
      monthLabel,
      columnIndex,
      columnName,
      sumExpression,
      description: `Periode Cut-Off Data s.d. ${monthLabel}`,
    };
  }

  /**
   * Add cutoff filter to existing query
   * This modifies realization sum expressions to only include months up to cutoff
   */
  static addCutOffFilter(baseQuery: string, params: CutOffQueryParams): string {
    if (!params.cutOffEnabled || !params.cutOff) {
      return baseQuery;
    }

    const cutOffInfo = this.getCutOffInfo(params.cutOff);

    // Replace any sum expressions for realization with cutoff-aware versions
    let modifiedQuery = baseQuery;

    // Common patterns to replace with cutoff-aware versions
    const patterns = [
      // Replace full year sum with cutoff sum
      /SUM\(real1 \+ real2 \+ real3 \+ real4 \+ real5 \+ real6 \+ real7 \+ real8 \+ real9 \+ real10 \+ real11 \+ real12\)/g,
      // Replace any variation with all real columns
      /SUM\(real[1-9][0-2]?(?:\s*\+\s*real[1-9][0-2]?)*\)/g,
    ];

    patterns.forEach((pattern) => {
      modifiedQuery = modifiedQuery.replace(
        pattern,
        `SUM(${cutOffInfo.sumExpression})`
      );
    });

    return modifiedQuery;
  }
  // The generateQuery method has been removed as cutoff should only be used
  // as a filter on existing queries, not as an independent query generator

  /**
   * Validate cut off selection
   */
  static validateCutOff(cutOff: string): boolean {
    return cutOff in this.MONTH_TO_REAL_COLUMN;
  }

  /**
   * Get available months for cut off selection
   */
  static getAvailableMonths(): Array<{
    key: string;
    label: string;
    columnIndex: number;
  }> {
    return Object.entries(this.MONTH_TO_REAL_COLUMN).map(([month, index]) => ({
      key: month,
      label: this.MONTH_LABELS[month as keyof typeof this.MONTH_LABELS],
      columnIndex: index,
    }));
  }

  /**
   * Get cutoff summary for display in components
   */
  static getCutOffSummary(cutOff: string): string {
    if (!cutOff) return "";

    const info = this.getCutOffInfo(cutOff);
    return info.description;
  }
}

export default CutOffQueryGenerator;
