/**
 * Base Filter Class
 * Contains common filter logic that all specific filters extend from
 */
class BaseFilter {
  constructor(fieldName, tableName, referenceTable = null) {
    this.fieldName = fieldName;
    this.tableName = tableName;
    this.referenceTable = referenceTable;
  }

  /**
   * Build column selection based on radio button value
   * @param {string} radio - Radio button value ("1" = code, "2" = code+text, "3" = text)
   * @param {string} thang - Year parameter
   * @returns {object} - { columns: [], joinClause: string, groupBy: [] }
   */
  buildColumns(radio, thang = "") {
    const result = {
      columns: [],
      joinClause: "",
      groupBy: [],
    };

    if (!radio) return result;

    const codeField = `a.${this.fieldName}`;
    const textField = this.referenceTable
      ? `${this.referenceTable.alias}.${this.referenceTable.nameField}`
      : null;

    switch (radio) {
      case "1": // Code only
        result.columns.push(codeField);
        result.groupBy.push(codeField);
        break;

      case "2": // Code + Text
        result.columns.push(codeField);
        if (textField) {
          result.columns.push(textField);
          result.joinClause = this.buildJoinClause(thang);
        }
        result.groupBy.push(codeField);
        break;

      case "3": // Text only
        if (textField) {
          result.columns.push(textField);
          result.joinClause = this.buildJoinClause(thang);
        }
        result.groupBy.push(codeField);
        break;
    }

    return result;
  }

  /**
   * Build JOIN clause for reference table
   * @param {string} thang - Year parameter
   * @returns {string} - JOIN clause
   */
  buildJoinClause(thang = "") {
    if (!this.referenceTable) return "";

    const yearSuffix = this.referenceTable.hasYear ? `_${thang}` : "";
    const tableName = `${this.referenceTable.schema}.${this.referenceTable.table}${yearSuffix}`;

    return ` LEFT JOIN ${tableName} ${this.referenceTable.alias} ON ${this.referenceTable.joinCondition}`;
  }

  /**
   * Build WHERE conditions based on filter type
   * @param {object} filterData - Filter configuration
   * @returns {string[]} - Array of WHERE conditions
   */
  buildWhereConditions(filterData) {
    const conditions = [];
    const {
      pilihValue,
      kondisiValue,
      kataValue,
      opsiType,
      defaultValues = [
        "XXX",
        "000",
        "XX",
        "00",
        "XXXX",
        "0000",
        "XXXXXX",
        "000000",
      ],
    } = filterData;

    // Priority: 1. kata (keyword), 2. kondisi (conditions), 3. pilih (select)
    if (kataValue && kataValue.trim() !== "") {
      const textField = this.referenceTable
        ? `${this.referenceTable.alias}.${this.referenceTable.nameField}`
        : `a.${this.fieldName}`;
      conditions.push(`${textField} LIKE '%${kataValue}%'`);
    } else if (kondisiValue && kondisiValue.trim() !== "") {
      conditions.push(this.parseKondisiConditions(kondisiValue));
    } else if (pilihValue && !defaultValues.includes(pilihValue)) {
      conditions.push(`a.${this.fieldName} = '${pilihValue}'`);
    }

    return conditions.filter(
      (condition) => condition && condition.trim() !== ""
    );
  }

  /**
   * Parse kondisi (conditions) input with advanced operators
   * @param {string} kondisiValue - Conditions string
   * @returns {string} - WHERE condition
   */
  parseKondisiConditions(kondisiValue) {
    if (!kondisiValue || kondisiValue.trim() === "") return "";

    const fieldName = `a.${this.fieldName}`;

    // Handle NOT IN conditions (starting with !)
    if (kondisiValue.substring(0, 1) === "!") {
      const cleanValue = kondisiValue.substring(1);
      const values = cleanValue
        .split(",")
        .map((val) => val.trim())
        .filter((val) => val !== "");

      if (values.length > 0) {
        const formattedValues = values.map((val) => `'${val}'`).join(",");
        return `${fieldName} NOT IN (${formattedValues})`;
      }
    }
    // Handle LIKE conditions (containing %)
    else if (kondisiValue.includes("%")) {
      return `${fieldName} LIKE '${kondisiValue}'`;
    }
    // Handle range conditions (containing -)
    else if (kondisiValue.includes("-") && !kondisiValue.includes(",")) {
      const [start, end] = kondisiValue.split("-").map((val) => val.trim());
      if (start && end) {
        return `${fieldName} BETWEEN '${start}' AND '${end}'`;
      }
    }
    // Handle standard IN conditions
    else {
      const values = kondisiValue
        .split(",")
        .map((val) => val.trim())
        .filter((val) => val !== "");

      if (values.length > 0) {
        const formattedValues = values.map((val) => `'${val}'`).join(",");
        return `${fieldName} IN (${formattedValues})`;
      }
    }

    return "";
  }

  /**
   * Main method to build complete filter
   * @param {object} filterState - Complete filter state
   * @param {string} thang - Year parameter
   * @returns {object} - Complete filter result
   */
  build(filterState, thang = "") {
    const { isEnabled, radio, pilihValue, kondisiValue, kataValue, opsiType } =
      filterState;

    const result = {
      columns: [],
      joinClause: "",
      groupBy: [],
      whereConditions: [],
    };

    // Only build if filter is enabled
    if (!isEnabled) return result;

    // Build columns and joins
    const columnResult = this.buildColumns(radio, thang);
    result.columns = columnResult.columns;
    result.joinClause = columnResult.joinClause;
    result.groupBy = columnResult.groupBy;

    // Special handling for kata (keyword) filters
    // When using kata filter, we need the descriptive column and JOIN regardless of radio setting
    if (kataValue && kataValue.trim() !== "" && this.referenceTable) {
      const textField = `${this.referenceTable.alias}.${this.referenceTable.nameField}`;

      // Add JOIN if not already present
      if (!result.joinClause) {
        result.joinClause = this.buildJoinClause(thang);
      }

      // Add descriptive column to SELECT if not already present
      if (!result.columns.includes(textField)) {
        result.columns.push(textField);
      }
    }

    // Build WHERE conditions
    result.whereConditions = this.buildWhereConditions({
      pilihValue,
      kondisiValue,
      kataValue,
      opsiType,
    });

    return result;
  }
}

export default BaseFilter;
