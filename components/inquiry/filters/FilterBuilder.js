/**
 * Filter Builder - Orchestrates all filter modules
 * Provides a unified interface to build all filters
 */

// Import all filter modules
import {
  DepartmentFilter,
  UnitFilter,
  DekonFilter,
  SatkerFilter,
} from "./DepartmentFilter";
import {
  ProvinsiFilter,
  KabkotaFilter,
  KanwilFilter,
  KppnFilter,
} from "./LocationFilter";
import {
  FungsiFilter,
  SubFungsiFilter,
  ProgramFilter,
  KegiatanFilter,
  OutputFilter,
  SubOutputFilter,
} from "./ProgramFilter";
import { AkunFilter, SumberDanaFilter, RegisterFilter } from "./AccountFilter";
import {
  PronasFilter,
  PropresFilter,
  KegiatanPrioritasFilter,
  PrioritasFilter,
  TemaFilter,
  MegaProjectFilter,
} from "./PriorityFilter";
import {
  InflasiFilter,
  StuntingFilter,
  KemiskinanFilter,
  PemiluFilter,
  IknFilter,
  PanganFilter,
  BlokirFilter,
  SpecialGroupingFilter,
} from "./SpecialFilter";

class FilterBuilder {
  constructor() {
    // Initialize all filter instances
    this.filters = {
      // Department & Organization
      department: new DepartmentFilter(),
      unit: new UnitFilter(),
      dekon: new DekonFilter(),
      satker: new SatkerFilter(),

      // Location
      provinsi: new ProvinsiFilter(),
      kabkota: new KabkotaFilter(),
      kanwil: new KanwilFilter(),
      kppn: new KppnFilter(),

      // Program Structure
      fungsi: new FungsiFilter(),
      subfungsi: new SubFungsiFilter(),
      program: new ProgramFilter(),
      kegiatan: new KegiatanFilter(),
      output: new OutputFilter(),
      suboutput: new SubOutputFilter(),

      // Account
      akun: new AkunFilter(),
      sdana: new SumberDanaFilter(),
      register: new RegisterFilter(),

      // Priority Programs
      pronas: new PronasFilter(),
      propres: new PropresFilter(),
      kegiatanprioritas: new KegiatanPrioritasFilter(),
      prioritas: new PrioritasFilter(),
      tema: new TemaFilter(),
      megaproject: new MegaProjectFilter(),

      // Special Filters (jenlap-specific)
      inflasi: new InflasiFilter(),
      stunting: new StuntingFilter(),
      kemiskinan: new KemiskinanFilter(),
      pemilu: new PemiluFilter(),
      ikn: new IknFilter(),
      pangan: new PanganFilter(),
      blokir: new BlokirFilter(),
      specialgrouping: new SpecialGroupingFilter(),
    };
  }

  /**
   * Build all enabled filters from inquiry state
   * @param {object} inquiryState - Complete inquiry state
   * @returns {object} - Aggregated filter results
   */
  buildAllFilters(inquiryState) {
    const result = {
      columns: [],
      joinClauses: [],
      groupBy: [],
      whereConditions: [],
    };

    // Only build filters that are enabled (except blokir and specialgrouping, which are jenlap-specific)
    Object.entries(this.filters).forEach(([key, filter]) => {
      let enabled = false;
      if (key === "blokir") {
        // Only enable blokir for jenlap 6
        enabled = inquiryState.jenlap === 6;
      } else {
        enabled = this.isFilterEnabled(key, inquiryState);
      }

      if (!enabled) return;
      try {
        const filterResult = filter.buildFromState(inquiryState);

        if (filterResult.columns.length > 0) {
          result.columns.push(...filterResult.columns);
        }
        if (filterResult.joinClause) {
          result.joinClauses.push(filterResult.joinClause);
        }
        if (filterResult.groupBy.length > 0) {
          result.groupBy.push(...filterResult.groupBy);
        }
        if (filterResult.whereConditions.length > 0) {
          result.whereConditions.push(...filterResult.whereConditions);
        }
      } catch (error) {
        console.warn(`Error building ${key} filter:`, error);
      }
    });

    // Remove duplicates and optimize
    result.columns = [...new Set(result.columns)];
    result.joinClauses = this.optimizeJoins(result.joinClauses);
    result.groupBy = [...new Set(result.groupBy)];
    result.whereConditions = result.whereConditions.filter(
      (condition) => condition && condition.trim() !== ""
    );

    return result;
  }

  /**
   * Build specific filter by name
   * @param {string} filterName - Name of the filter
   * @param {object} inquiryState - Complete inquiry state
   * @returns {object} - Filter result
   */
  buildFilter(filterName, inquiryState) {
    const filter = this.filters[filterName];
    if (!filter) {
      throw new Error(`Filter '${filterName}' not found`);
    }

    return filter.buildFromState(inquiryState);
  }

  /**
   * Get list of available filters
   * @returns {string[]} - Array of filter names
   */
  getAvailableFilters() {
    return Object.keys(this.filters);
  }

  /**
   * Check if a specific filter is enabled in the inquiry state
   * @param {string} filterName - Name of the filter
   * @param {object} inquiryState - Complete inquiry state
   * @returns {boolean} - Whether the filter is enabled
   */
  isFilterEnabled(filterName, inquiryState) {
    const enabledFields = {
      department: "kddept",
      unit: "unit",
      dekon: "kddekon",
      satker: "kdsatker",
      provinsi: "kdlokasi",
      kabkota: "kdkabkota",
      kanwil: "kdkanwil",
      kppn: "kdkppn",
      fungsi: "kdfungsi",
      subfungsi: "kdsfungsi",
      program: "kdprogram",
      kegiatan: "kdgiat",
      output: "kdoutput",
      suboutput: "kdsoutput",
      akun: "kdakun",
      sdana: "kdsdana",
      register: "kdregister",
      pronas: "KdPN",
      propres: "KdPP",
      kegiatanprioritas: "KdKegPP",
      prioritas: "KdPRI",
      tema: "KdTema",
      megaproject: "KdMP",
    };

    const enabledField = enabledFields[filterName];
    return enabledField ? Boolean(inquiryState[enabledField]) : false;
  }

  /**
   * Optimize JOIN clauses by removing duplicates
   * @param {string[]} joinClauses - Array of JOIN clauses
   * @returns {string[]} - Optimized JOIN clauses
   */
  optimizeJoins(joinClauses) {
    // Remove duplicates and empty joins
    const uniqueJoins = [...new Set(joinClauses)].filter(
      (join) => join && join.trim() !== ""
    );

    // Sort joins for consistent ordering
    return uniqueJoins.sort();
  }

  /**
   * Build role-based access control conditions
   * @param {object} inquiryState - Complete inquiry state
   * @returns {string} - Access control WHERE clause
   */
  buildAccessControl(inquiryState) {
    const { role, kodekppn, kodekanwil } = inquiryState;

    if (role === "3" && kodekppn) {
      return `a.kdkppn = '${kodekppn}'`;
    } else if (role === "2" && kodekanwil) {
      return `a.kdkanwil = '${kodekanwil}'`;
    }

    return "";
  }

  /**
   * Build complete WHERE clause including access control
   * @param {object} inquiryState - Complete inquiry state
   * @returns {string} - Complete WHERE clause
   */
  buildWhereClause(inquiryState) {
    const filterResult = this.buildAllFilters(inquiryState);
    const accessControl = this.buildAccessControl(inquiryState);

    const conditions = [...filterResult.whereConditions];
    if (accessControl) {
      conditions.push(accessControl);
    }

    if (conditions.length === 0) {
      return "";
    }

    return `WHERE ${conditions.join(" AND ")}`;
  }

  /**
   * Validate filter configuration
   * @param {object} inquiryState - Complete inquiry state
   * @returns {object} - Validation result
   */
  validateFilters(inquiryState) {
    const errors = [];
    const warnings = [];

    // Check for conflicting filter combinations
    const enabledFilters = this.getAvailableFilters().filter((name) =>
      this.isFilterEnabled(name, inquiryState)
    );

    // Performance warnings for too many filters
    if (enabledFilters.length > 10) {
      warnings.push(
        `High number of filters enabled (${enabledFilters.length}). Consider reducing for better performance.`
      );
    }

    // Check for missing required dependencies
    if (
      this.isFilterEnabled("unit", inquiryState) &&
      !this.isFilterEnabled("department", inquiryState)
    ) {
      warnings.push(
        "Unit filter is enabled but Department filter is not. Consider enabling Department filter for better context."
      );
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      enabledFilters,
    };
  }

  /**
   * Get filter statistics
   * @param {object} inquiryState - Complete inquiry state
   * @returns {object} - Filter statistics
   */
  getFilterStats(inquiryState) {
    const filterResult = this.buildAllFilters(inquiryState);
    const validation = this.validateFilters(inquiryState);

    return {
      totalFilters: Object.keys(this.filters).length,
      enabledFilters: validation.enabledFilters.length,
      enabledFilterNames: validation.enabledFilters,
      columnsCount: filterResult.columns.length,
      joinsCount: filterResult.joinClauses.length,
      whereConditionsCount: filterResult.whereConditions.length,
      groupByCount: filterResult.groupBy.length,
      validation,
    };
  }
}

export default FilterBuilder;
