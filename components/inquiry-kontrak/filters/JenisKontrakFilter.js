import BaseFilter from "./BaseFilter";

/**
 * JenisKontrak Filter Handler
 * Simple filter for contract types without advanced options
 */
class JenisKontrakFilter extends BaseFilter {
  constructor() {
    super("jeniskontrak", "jeniskontrak", {
      schema: null, // No join table needed - filtering on base table column
      table: null,
      alias: null,
      nameField: null,
      hasYear: false,
      joinCondition: null,
    });
  }

  /**
   * Build jenis kontrak filter from inquiry state
   * @param {object} inquiryState - Full inquiry state
   * @returns {object} - Filter result
   */
  buildFromState(inquiryState) {
    const {
      kdjeniskontrak: isEnabled,
      jeniskontrakradio: radio,
      jeniskontrak: value,
    } = inquiryState;

    // If filter is not enabled, return empty result
    if (!isEnabled) {
      return {
        columns: [],
        joinClauses: [],
        whereConditions: [],
        groupBy: [],
      };
    }

    // Build WHERE condition and SELECT clause based on selected contract type
    const whereConditions = [];
    let columns = [];
    let groupBy = [];

    switch (radio) {
      case "SYC":
        // Single Year Contract - filter based on 16th character of 'can' field being '0'
        whereConditions.push("SUBSTR(a.can,16,1) = '0'");
        columns = [
          "(CASE WHEN SUBSTR(a.can,16,1) = '0' THEN 'SYC' WHEN SUBSTR(a.can,16,1) <> '0' THEN 'MYC' END) AS tipe_kontrak",
        ];
        groupBy = ["tipe_kontrak"];
        break;
      case "MYC":
        // Multi Year Contract - filter based on 16th character of 'can' field being not '0'
        whereConditions.push("SUBSTR(a.can,16,1) <> '0'");
        columns = [
          "(CASE WHEN SUBSTR(a.can,16,1) = '0' THEN 'SYC' WHEN SUBSTR(a.can,16,1) <> '0' THEN 'MYC' END) AS tipe_kontrak",
        ];
        groupBy = ["tipe_kontrak"];
        break;
      case "00":
      default:
        // Semua Status - show all with contract type classification
        columns = [
          "(CASE WHEN SUBSTR(a.can,16,1) = '0' THEN 'SYC' WHEN SUBSTR(a.can,16,1) <> '0' THEN 'MYC' END) AS tipe_kontrak",
        ];
        groupBy = ["tipe_kontrak"];
        break;
    }

    return {
      columns,
      joinClauses: [], // No joins needed for this filter
      whereConditions,
      groupBy,
    };
  }

  /**
   * Legacy build method for compatibility
   * @param {object} params - Filter parameters
   * @param {string} thang - Year parameter (not used for this filter)
   * @returns {object} - Filter result
   */
  build(params, thang = null) {
    const { isEnabled, radio } = params;

    if (!isEnabled) {
      return {
        columns: [],
        joinClauses: [],
        whereConditions: [],
        groupBy: [],
      };
    }

    const whereConditions = [];
    let columns = [];
    let groupBy = [];

    switch (radio) {
      case "SYC":
        whereConditions.push("SUBSTR(a.can,16,1) = '0'");
        columns = [
          "(CASE WHEN SUBSTR(a.can,16,1) = '0' THEN 'SYC' WHEN SUBSTR(a.can,16,1) <> '0' THEN 'MYC' END) AS tipe_kontrak",
        ];
        groupBy = ["tipe_kontrak"];
        break;
      case "MYC":
        whereConditions.push("SUBSTR(a.can,16,1) <> '0'");
        columns = [
          "(CASE WHEN SUBSTR(a.can,16,1) = '0' THEN 'SYC' WHEN SUBSTR(a.can,16,1) <> '0' THEN 'MYC' END) AS tipe_kontrak",
        ];
        groupBy = ["tipe_kontrak"];
        break;
      case "00":
      default:
        // Semua Status - show all with contract type classification
        columns = [
          "(CASE WHEN SUBSTR(a.can,16,1) = '0' THEN 'SYC' WHEN SUBSTR(a.can,16,1) <> '0' THEN 'MYC' END) AS tipe_kontrak",
        ];
        groupBy = ["tipe_kontrak"];
        break;
    }

    return {
      columns,
      joinClauses: [],
      whereConditions,
      groupBy,
    };
  }
}

export default JenisKontrakFilter;
