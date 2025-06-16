// Test file to demonstrate the modular query generation
// This is for development/testing purposes only

import { KementerianQueryGenerator } from "./KementerianQueryGenerator";

// Example usage of the modular query generator
export function testKementerianQueries() {
  console.log("🧪 Testing KementerianQueryGenerator");

  // Test 1: Pagu Realisasi with kode tampilan
  const test1 = KementerianQueryGenerator.generateQuery({
    kementerianEnabled: true,
    kementerian: new Set(["01", "02"]),
    kementerianTampilan: "kode",
    selectedJenisLaporan: "Pagu Realisasi",
  });
  console.log("Test 1 - Pagu Realisasi (kode):", test1);

  // Test 2: Standard query with uraian tampilan
  const test2 = KementerianQueryGenerator.generateQuery({
    kementerianEnabled: true,
    kementerian: new Set(["01"]),
    kementerianTampilan: "uraian",
    selectedJenisLaporan: "Standard",
  });
  console.log("Test 2 - Standard (uraian):", test2);

  // Test 3: Jangan tampilkan
  const test3 = KementerianQueryGenerator.generateQuery({
    kementerianEnabled: true,
    kementerian: new Set(["01"]),
    kementerianTampilan: "jangan_tampilkan",
    selectedJenisLaporan: "Pagu Realisasi",
  });
  console.log("Test 3 - Jangan tampilkan:", test3);

  // Test 4: Validation
  const validation = KementerianQueryGenerator.validateParams({
    kementerianEnabled: true,
    kementerian: new Set(["01"]),
    kementerianTampilan: "invalid_option",
    selectedJenisLaporan: "Standard",
  });
  console.log("Test 4 - Validation:", validation);

  // Test 5: Query explanation
  const explanation = KementerianQueryGenerator.getQueryExplanation({
    kementerianEnabled: true,
    kementerian: new Set(["01", "02"]),
    kementerianTampilan: "kode_uraian",
    selectedJenisLaporan: "Pagu Realisasi",
  });
  console.log("Test 5 - Explanation:", explanation);
}

// Export for potential use in development console
export { KementerianQueryGenerator };
