// Query Generation Module Index
// This module provides modular query generation for different filter types

import {
  KementerianQueryGenerator,
  type KementerianQueryParams,
  type KementerianQueryConfig,
} from "./KementerianQueryGenerator";

import {
  EselonIQueryGenerator,
  type EselonIQueryParams,
  type EselonIQueryConfig,
} from "./EselonIQueryGenerator";

import {
  CombinedQueryGenerator,
  type CombinedQueryParams,
  type CombinedQueryConfig,
} from "./CombinedQueryGenerator";

import {
  CutOffQueryGenerator,
  type CutOffQueryParams,
} from "./CutOffQueryGenerator";

export {
  KementerianQueryGenerator,
  type KementerianQueryParams,
  type KementerianQueryConfig,
  EselonIQueryGenerator,
  type EselonIQueryParams,
  type EselonIQueryConfig,
  CombinedQueryGenerator,
  type CombinedQueryParams,
  type CombinedQueryConfig,
  CutOffQueryGenerator,
  type CutOffQueryParams,
};

// TODO: Add other query generators as needed
// export { SatkerQueryGenerator } from './SatkerQueryGenerator';

// Central query orchestrator
export interface QueryGeneratorParams {
  // Switches
  switches: {
    kementerian: boolean;
    eselonI: boolean;
    satker: boolean;
    cutOff: boolean;
    [key: string]: boolean;
  };

  // Form state
  formState: {
    kementerian: Set<string>;
    kementerianTampilan: string;
    eselonI: Set<string>;
    eselonTampilan: string;
    satker: Set<string>;
    satkerTampilan: string;
    cutOff: string;
    selectedTahun?: string;
    selectedPembulatan?: string;
    [key: string]: any;
  };

  // Report type
  selectedJenisLaporan: string;
  selectedTahun?: string;
  selectedPembulatan?: string;
}

/**
 * Main query orchestrator that delegates to specific generators
 * This will replace the monolithic generateSQLQuery function
 */
export class QueryOrchestrator {
  static generateQuery(params: QueryGeneratorParams): string {
    const {
      switches,
      formState,
      selectedJenisLaporan,
      selectedTahun,
      selectedPembulatan,
    } = params;

    // Note: CutOff is no longer treated as an independent query generator
    // Instead, it will apply filtering to whatever other query is generated
    // If only cutoff is selected with no other filters, fall through to basic query    // Handle kementerian queries
    if (switches.kementerian) {
      return KementerianQueryGenerator.generateQuery({
        kementerianEnabled: switches.kementerian,
        kementerian: formState.kementerian,
        kementerianTampilan: formState.kementerianTampilan,
        cutOff: formState.cutOff,
        selectedJenisLaporan,
        selectedTahun: selectedTahun || formState.selectedTahun || "2025",
        selectedPembulatan:
          selectedPembulatan || formState.selectedPembulatan || "Rupiah",
      });
    } // Generate basic query
    let query =
      "SELECT * FROM monev2025.pagu_real_detail_harian_2025 LIMIT 100";

    // Apply cutoff filter - always applied regardless of switch state
    if (formState.cutOff) {
      query = CutOffQueryGenerator.addCutOffFilter(query, {
        cutOffEnabled: true, // Always enabled for filtering
        cutOff: formState.cutOff,
        selectedJenisLaporan,
        selectedTahun: selectedTahun || formState.selectedTahun || "2025",
        selectedPembulatan:
          selectedPembulatan || formState.selectedPembulatan || "Rupiah",
      });
    }

    return query;
  }
}
