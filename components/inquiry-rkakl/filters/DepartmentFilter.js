import BaseFilter from "./BaseFilter";

/**
 * Department Filter Handler
 */
class DepartmentFilter extends BaseFilter {
  constructor() {
    super("kddept", "department", {
      schema: "dbref",
      table: "t_dept",
      alias: "b",
      nameField: "nmdept",
      hasYear: true,
      joinCondition: "a.kddept=b.kddept",
    });
  }

  /**
   * Build department filter from inquiry state
   * @param {object} inquiryState - Full inquiry state
   * @returns {object} - Filter result
   */
  buildFromState(inquiryState) {
    const {
      kddept: isEnabled,
      dept: pilihValue,
      deptkondisi: kondisiValue,
      katadept: kataValue,
      deptradio: radio,
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
 * Unit Filter Handler
 */
class UnitFilter extends BaseFilter {
  constructor() {
    super("kdunit", "unit", {
      schema: "dbref",
      table: "t_unit",
      alias: "c",
      nameField: "nmunit",
      hasYear: true,
      joinCondition: "a.kddept=c.kddept AND a.kdunit=c.kdunit",
    });
  }

  buildFromState(inquiryState) {
    const {
      unit: isEnabled,
      kdunit: pilihValue,
      unitkondisi: kondisiValue,
      kataunit: kataValue,
      unitradio: radio,
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
 * Dekonsentrasi Filter Handler
 */
class DekonFilter extends BaseFilter {
  constructor() {
    super("kddekon", "dekonsentrasi", {
      schema: "dbref",
      table: "t_dekon",
      alias: "d",
      nameField: "nmdekon",
      hasYear: true,
      joinCondition: "a.kddekon=d.kddekon",
    });
  }

  buildFromState(inquiryState) {
    const {
      kddekon: isEnabled,
      dekon: pilihValue,
      dekonkondisi: kondisiValue,
      katadekon: kataValue,
      dekonradio: radio,
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
 * Satker Filter Handler
 */
class SatkerFilter extends BaseFilter {
  constructor() {
    super("kdsatker", "satker", {
      schema: "dbref",
      table: "t_satker",
      alias: "s",
      nameField: "nmsatker",
      hasYear: true,
      joinCondition:
        "a.kddept=s.kddept AND a.kdunit=s.kdunit AND a.kdsatker=s.kdsatker",
    });
  }

  buildFromState(inquiryState) {
    const {
      kdsatker: isEnabled,
      satker: pilihValue,
      satkerkondisi: kondisiValue,
      katasatker: kataValue,
      satkerradio: radio,
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

export { DepartmentFilter, UnitFilter, DekonFilter, SatkerFilter };
export default DepartmentFilter;
