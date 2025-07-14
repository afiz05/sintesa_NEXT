import BaseFilter from "./BaseFilter";

/**
 * Fungsi Filter Handler
 */
class FungsiFilter extends BaseFilter {
  constructor() {
    super("kdfungsi", "fungsi", {
      schema: "dbref",
      table: "t_fungsi",
      alias: "f",
      nameField: "nmfungsi",
      hasYear: true,
      joinCondition: "a.kdfungsi=f.kdfungsi",
    });
  }

  buildFromState(inquiryState) {
    const {
      kdfungsi: isEnabled,
      fungsi: pilihValue,
      fungsikondisi: kondisiValue,
      katafungsi: kataValue,
      fungsiradio: radio,
      thang,
    } = inquiryState;

    return this.build(
      {
        isEnabled,
        radio,
        pilihValue,
        kondisiValue,
        kataValue,
      },
      thang
    );
  }
}

/**
 * Sub Fungsi Filter Handler
 */
class SubFungsiFilter extends BaseFilter {
  constructor() {
    super("kdsfung", "subfungsi", {
      schema: "dbref",
      table: "t_sfung",
      alias: "sf",
      nameField: "nmsfung",
      hasYear: true,
      joinCondition: "a.kdfungsi=sf.kdfungsi AND a.kdsfung=sf.kdsfung",
    });
  }

  buildFromState(inquiryState) {
    const {
      kdsfungsi: isEnabled,
      sfungsi: pilihValue,
      subfungsikondisi: kondisiValue,
      katasubfungsi: kataValue,
      subfungsiradio: radio,
      thang,
    } = inquiryState;

    return this.build(
      {
        isEnabled,
        radio,
        pilihValue,
        kondisiValue,
        kataValue,
      },
      thang
    );
  }
}

/**
 * Program Filter Handler
 */
class ProgramFilter extends BaseFilter {
  constructor() {
    super("kdprogram", "program", {
      schema: "dbref",
      table: "t_program",
      alias: "pr",
      nameField: "nmprogram",
      hasYear: true,
      joinCondition:
        "a.kddept=pr.kddept AND a.kdunit=pr.kdunit AND a.kdprogram=pr.kdprogram",
    });
  }

  buildFromState(inquiryState) {
    const {
      kdprogram: isEnabled,
      program: pilihValue,
      programkondisi: kondisiValue,
      kataprogram: kataValue,
      programradio: radio,
      thang,
    } = inquiryState;

    return this.build(
      {
        isEnabled,
        radio,
        pilihValue,
        kondisiValue,
        kataValue,
      },
      thang
    );
  }
}

/**
 * Kegiatan Filter Handler
 */
class KegiatanFilter extends BaseFilter {
  constructor() {
    super("kdgiat", "kegiatan", {
      schema: "dbref",
      table: "t_giat",
      alias: "g",
      nameField: "nmgiat",
      hasYear: true,
      joinCondition:
        "a.kddept=g.kddept AND a.kdunit=g.kdunit AND a.kdprogram=g.kdprogram AND a.kdgiat=g.kdgiat",
    });
  }

  buildFromState(inquiryState) {
    const {
      kdgiat: isEnabled,
      giat: pilihValue,
      giatkondisi: kondisiValue,
      katagiat: kataValue,
      kegiatanradio: radio,
      thang,
    } = inquiryState;

    return this.build(
      {
        isEnabled,
        radio,
        pilihValue,
        kondisiValue,
        kataValue,
      },
      thang
    );
  }
}

/**
 * Output Filter Handler
 */
class OutputFilter extends BaseFilter {
  constructor() {
    super("kdoutput", "output", {
      schema: "dbref",
      table: "t_output",
      alias: "o",
      nameField: "nmoutput",
      hasYear: true,
      joinCondition:
        "a.kddept=o.kddept AND a.kdunit=o.kdunit AND a.kdprogram=o.kdprogram AND a.kdgiat=o.kdgiat AND a.kdoutput=o.kdoutput",
    });
  }

  buildFromState(inquiryState) {
    const {
      kdoutput: isEnabled,
      output: pilihValue,
      outputkondisi: kondisiValue,
      kataoutput: kataValue,
      outputradio: radio,
      thang,
    } = inquiryState;

    return this.build(
      {
        isEnabled,
        radio,
        pilihValue,
        kondisiValue,
        kataValue,
      },
      thang
    );
  }
}

/**
 * Sub Output Filter Handler
 */
class SubOutputFilter extends BaseFilter {
  constructor() {
    super("kdsoutput", "suboutput", {
      schema: "dbref",
      table: "t_soutput",
      alias: "so",
      nameField: "nmsoutput",
      hasYear: true,
      joinCondition:
        "a.kddept=so.kddept AND a.kdunit=so.kdunit AND a.kdprogram=so.kdprogram AND a.kdgiat=so.kdgiat AND a.kdoutput=so.kdoutput AND a.kdsoutput=so.kdsoutput",
    });
  }

  buildFromState(inquiryState) {
    const {
      kdsoutput: isEnabled,
      soutput: pilihValue,
      soutputkondisi: kondisiValue,
      katasoutput: kataValue,
      soutputradio: radio,
      thang,
    } = inquiryState;

    return this.build(
      {
        isEnabled,
        radio,
        pilihValue,
        kondisiValue,
        kataValue,
      },
      thang
    );
  }
}

/**
 * Komponen Filter Handler
 */
class KomponenFilter extends BaseFilter {
  constructor() {
    super("kdkmpnen", "komponen", {
      schema: "dbref",
      table: "dipa_kmpnen",
      alias: "ab",
      nameField: "urkmpnen",
      hasYear: true,
      joinCondition:
        "a.kdsatker=ab.kdsatker AND a.kddept=ab.kddept AND a.kdunit=ab.kdunit AND a.kdprogram=ab.kdprogram AND a.kdgiat=ab.kdgiat AND a.kdoutput=ab.kdoutput AND a.kdsoutput=ab.kdsoutput AND a.kdkmpnen=ab.kdkmpnen",
    });
  }

  /**
   * Override buildJoinClause to use last 2 digits of year for dipa_kmpnen table
   * @param {string} thang - Year parameter (e.g., "2025")
   * @returns {string} - JOIN clause
   */
  buildJoinClause(thang = "") {
    if (!this.referenceTable) return "";

    // Use last 2 digits of year for dipa_kmpnen table
    const yearSuffix = this.referenceTable.hasYear ? `_${thang.slice(-2)}` : "";
    const tableName = `${this.referenceTable.schema}.${this.referenceTable.table}${yearSuffix}`;

    return ` LEFT JOIN ${tableName} ${this.referenceTable.alias} ON ${this.referenceTable.joinCondition}`;
  }

  buildFromState(inquiryState) {
    const {
      kdkomponen: isEnabled,
      komponen: pilihValue,
      komponenkondisi: kondisiValue,
      katakomponen: kataValue,
      komponenradio: radio,
      thang,
    } = inquiryState;

    // Universal: If Jenis Tampilan is 'Jangan Tampilkan' (radio === '4'), return empty result (no-op)
    if (isEnabled && radio === "4") {
      return {
        columns: [],
        groupBy: [],
        joinClause: "",
        whereConditions: [],
      };
    }

    return this.build(
      {
        isEnabled,
        radio,
        pilihValue,
        kondisiValue,
        kataValue,
      },
      thang
    );
  }
}

/**
 * Sub Komponen Filter Handler
 */
class SubKomponenFilter extends BaseFilter {
  constructor() {
    super("kdskmpnen", "subkomponen", {
      schema: "dbref",
      table: "dipa_skmpnen",
      alias: "ac",
      nameField: "urskmpnen",
      hasYear: true,
      joinCondition:
        "a.kdsatker=ac.kdsatker AND a.kddept=ac.kddept AND a.kdunit=ac.kdunit AND a.kdprogram=ac.kdprogram AND a.kdgiat=ac.kdgiat AND a.kdoutput=ac.kdoutput AND a.kdsoutput=ac.kdsoutput AND a.kdkmpnen=ac.kdkmpnen AND a.kdskmpnen=ac.kdskmpnen",
    });
  }

  /**
   * Override buildJoinClause to use last 2 digits of year for dipa_skmpnen table
   * @param {string} thang - Year parameter (e.g., "2025")
   * @returns {string} - JOIN clause
   */
  buildJoinClause(thang = "") {
    if (!this.referenceTable) return "";

    // Use last 2 digits of year for dipa_skmpnen table
    const yearSuffix = this.referenceTable.hasYear ? `_${thang.slice(-2)}` : "";
    const tableName = `${this.referenceTable.schema}.${this.referenceTable.table}${yearSuffix}`;

    return ` LEFT JOIN ${tableName} ${this.referenceTable.alias} ON ${this.referenceTable.joinCondition}`;
  }

  buildFromState(inquiryState) {
    const {
      kdskomponen: isEnabled,
      skomponen: pilihValue,
      skomponenkondisi: kondisiValue,
      kataskomponen: kataValue,
      skomponenradio: radio,
      thang,
    } = inquiryState;

    // Universal: If Jenis Tampilan is 'Jangan Tampilkan' (radio === '4'), return empty result (no-op)
    if (isEnabled && radio === "4") {
      return {
        columns: [],
        groupBy: [],
        joinClause: "",
        whereConditions: [],
      };
    }

    return this.build(
      {
        isEnabled,
        radio,
        pilihValue,
        kondisiValue,
        kataValue,
      },
      thang
    );
  }
}

/**
 * Item Filter Handler
 */
class ItemFilter extends BaseFilter {
  constructor() {
    super("noitem", "item", {
      // Item doesn't use a reference table for names - it uses CONCAT for nmitem
      schema: null,
      table: null,
      alias: null,
      nameField: null,
      hasYear: false,
      joinCondition: null,
    });
  }

  buildFromState(inquiryState) {
    const {
      kditem: isEnabled,
      item: pilihValue,
      itemkondisi: kondisiValue,
      kataitem: kataValue,
      itemradio: radio,
      thang,
    } = inquiryState;

    const result = {
      columns: [],
      joinClause: "",
      groupBy: [],
      whereConditions: [],
    };

    // Only build if filter is enabled
    if (!isEnabled) return result;

    // Universal: If Jenis Tampilan is 'Jangan Tampilkan' (radio === '4'), return empty result (no-op)
    if (radio === "4") {
      return result;
    }

    // Build columns based on radio selection
    if (radio === "1") {
      // Kode only
      result.columns.push("a.noitem");
      result.groupBy.push("a.noitem");
    } else if (radio === "2") {
      // Kode Uraian
      result.columns.push("a.noitem");
      result.columns.push(`CONCAT(
        CONVERT(a.nmitem USING utf8),
        ' ( VOL : ',
        a.volkeg,
        ' ',
        CONVERT(a.satkeg USING utf8),
        ' x ',
        FORMAT(a.hargasat, 0),
        ')'
      ) AS nmitem`);
      result.groupBy.push("a.noitem");
    } else if (radio === "3") {
      // Uraian only
      result.columns.push(`CONCAT(
        CONVERT(a.nmitem USING utf8),
        ' ( VOL : ',
        a.volkeg,
        ' ',
        CONVERT(a.satkeg USING utf8),
        ' x ',
        FORMAT(a.hargasat, 0),
        ')'
      ) AS nmitem`);
      result.groupBy.push("a.noitem");
    }

    // Build WHERE conditions manually since Item doesn't use reference table
    const conditions = [];

    // Priority: 1. kata (keyword), 2. kondisi (conditions), 3. pilih (select)
    if (kataValue && kataValue.trim() !== "") {
      conditions.push(`a.nmitem LIKE '%${kataValue}%'`);
    } else if (kondisiValue && kondisiValue.trim() !== "") {
      // Parse kondisi conditions manually for Item filter
      let kondisiCondition = kondisiValue.trim();
      if (kondisiCondition.startsWith("!")) {
        // NOT IN condition
        const values = kondisiCondition
          .substring(1)
          .split(",")
          .map((v) => `'${v.trim()}'`)
          .join(",");
        conditions.push(`a.noitem NOT IN (${values})`);
      } else if (kondisiCondition.includes(",")) {
        // IN condition
        const values = kondisiCondition
          .split(",")
          .map((v) => `'${v.trim()}'`)
          .join(",");
        conditions.push(`a.noitem IN (${values})`);
      } else {
        // Single value condition
        conditions.push(`a.noitem = '${kondisiCondition}'`);
      }
    } else if (pilihValue && !["XXX", "XX", "00"].includes(pilihValue)) {
      conditions.push(`a.noitem = '${pilihValue}'`);
    }

    result.whereConditions = conditions.filter(
      (condition) => condition && condition.trim() !== ""
    );

    return result;
  }
}

export {
  FungsiFilter,
  SubFungsiFilter,
  ProgramFilter,
  KegiatanFilter,
  OutputFilter,
  SubOutputFilter,
  KomponenFilter,
  SubKomponenFilter,
  ItemFilter,
};
export default ProgramFilter;
