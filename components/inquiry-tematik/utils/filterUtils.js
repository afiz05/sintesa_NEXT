import kdoutputData from "../../../data/Kdoutput.json";

/**
 * Get filtered data based on parent selections
 * This function provides hierarchical filtering for program -> kegiatan -> output -> suboutput -> komponen -> subkomponen
 */

// Utility function to get unique values from array of objects
const getUniqueValues = (data, key, nameKey) => {
  const unique = new Map();
  data.forEach((item) => {
    if (item[key] && !unique.has(item[key])) {
      unique.set(item[key], {
        value: item[key],
        label: item[nameKey] || item[key],
      });
    }
  });
  return Array.from(unique.values());
};

/**
 * Get programs based on department and unit selection
 */
export const getFilteredPrograms = (dept, kdunit) => {
  let filteredData = kdoutputData;

  if (dept && dept !== "XX") {
    filteredData = filteredData.filter((item) => item.kddept === dept);
  }

  if (kdunit && kdunit !== "XX") {
    filteredData = filteredData.filter((item) => item.kdunit === kdunit);
  }

  return getUniqueValues(filteredData, "kdprogram", "nmprogram");
};

/**
 * Get activities (kegiatan) based on department, unit, and program selection
 */
export const getFilteredKegiatan = (dept, kdunit, program) => {
  let filteredData = kdoutputData;

  if (dept && dept !== "XX") {
    filteredData = filteredData.filter((item) => item.kddept === dept);
  }

  if (kdunit && kdunit !== "XX") {
    filteredData = filteredData.filter((item) => item.kdunit === kdunit);
  }

  if (program && program !== "XX") {
    filteredData = filteredData.filter((item) => item.kdprogram === program);
  }

  return getUniqueValues(filteredData, "kdgiat", "nmgiat");
};

/**
 * Get outputs based on department, unit, program, and kegiatan selection
 */
export const getFilteredOutputs = (dept, kdunit, program, kegiatan) => {
  let filteredData = kdoutputData;

  if (dept && dept !== "XX") {
    filteredData = filteredData.filter((item) => item.kddept === dept);
  }

  if (kdunit && kdunit !== "XX") {
    filteredData = filteredData.filter((item) => item.kdunit === kdunit);
  }

  if (program && program !== "XX") {
    filteredData = filteredData.filter((item) => item.kdprogram === program);
  }

  if (kegiatan && kegiatan !== "XX") {
    filteredData = filteredData.filter((item) => item.kdgiat === kegiatan);
  }

  return getUniqueValues(filteredData, "kdoutput", "nmoutput");
};

// Note: Since there's no child data for suboutput, komponen, and subkomponen,
// these filters will use the existing component logic without parent-child filtering
