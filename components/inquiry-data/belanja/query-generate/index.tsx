// Query Generation Module Index
// This module provides modular query generation for different filter types

import {
  KementerianQueryGenerator,
  type KementerianQueryParams,
  type KementerianQueryConfig,
} from "./KementerianQueryGenerator";

export {
  KementerianQueryGenerator,
  type KementerianQueryParams,
  type KementerianQueryConfig,
};

// TODO: Add other query generators as needed
// export { EselonQueryGenerator } from './EselonQueryGenerator';
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
    [key: string]: any;
  };

  // Report type
  selectedJenisLaporan: string;
}

/**
 * Main query orchestrator that delegates to specific generators
 * This will replace the monolithic generateSQLQuery function
 */
export class QueryOrchestrator {
  static generateQuery(params: QueryGeneratorParams): string {
    const { switches, formState, selectedJenisLaporan } = params;

    // For now, we only handle kementerian queries
    // Other generators will be added incrementally

    if (switches.kementerian) {
      return KementerianQueryGenerator.generateQuery({
        kementerianEnabled: switches.kementerian,
        kementerian: formState.kementerian,
        kementerianTampilan: formState.kementerianTampilan,
        cutOff: formState.cutOff,
        selectedJenisLaporan,
      });
    }

    // Fallback to basic query for non-kementerian cases
    // TODO: Implement other generators and remove this fallback
    return "SELECT * FROM monev2025.pagu_real_detail_harian_2025 LIMIT 100";
  }
}
