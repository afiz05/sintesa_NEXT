"use client";
import { useState, useEffect } from "react";
import { getSQL } from "../SQL";

export default function useQueryBuilder(inquiryState) {
  const {
    thang,
    jenlap,
    cutoff,
    pembulatan,

    // Filter values
    dept,
    kdunit,
    dekon,
    prov,
    kabkota,
    kanwil,
    kppn,
    satker,
    fungsi,
    sfungsi,
    program,
    giat,
    output,
    soutput,
    akun,
    sdana,
    register,

    // Radio states
    deptradio,
    unitradio,
    dekonradio,
    provradio,
    kabkotaradio,
    kanwilradio,
    kppnradio,
    satkerradio,
    fungsiradio,
    subfungsiradio,
    programradio,
    kegiatanradio,
    outputradio,
    soutputradio,
    akunradio,
    sdanaradio,
    registerradio,

    // SQL state
    setFrom,
    setSelect,
    setSql,
  } = inquiryState;

  // Build the SQL query based on the current state
  const buildQuery = () => {
    // Determine the base table based on report type and year
    let fromClause = "";
    let selectClause = "";
    let whereClause = "";
    let groupByClause = "";
    let orderByClause = "";

    // Set the base table
    if (jenlap === "1") {
      // APBN report
      fromClause = `monev${thang}.pagu_real_detail_harian_${thang} a`;
      selectClause = `, round(sum(a.pagu),0) as PAGU`;
    } else if (jenlap === "2") {
      // Realization report
      fromClause = `monev${thang}.pagu_real_detail_harian_${thang} a`;
      selectClause = `, round(sum(a.pagu),0) as PAGU, round(sum(a.real1),0) as REALISASI, round(sum(a.blokir) ,0) as BLOKIR`;
    } else if (jenlap === "3") {
      // Monthly report
      fromClause = `monev${thang}.pagu_real_detail_harian_${thang} a`;
      selectClause = `, round(sum(a.pagu),0) as PAGU, round(sum(a.real1),0) as JAN, round(sum(a.real2),0) as FEB, round(sum(a.real3),0) as MAR, round(sum(a.real4),0) as APR, round(sum(a.real5),0) as MEI, round(sum(a.real6),0) as JUN, round(sum(a.real7),0) as JUL, round(sum(a.real8),0) as AGS, round(sum(a.real9),0) as SEP, round(sum(a.real10),0) as OKT, round(sum(a.real11),0) as NOV, round(sum(a.real12),0) as DES`;
    } else if (jenlap === "4") {
      // Blocked funds report
      fromClause = `monev${thang}.pagu_real_detail_harian_${thang} a`;
      selectClause = `, round(sum(a.pagu),0) as PAGU, round(sum(a.blokir),0) as BLOKIR`;
    }

    // Apply rounding based on pembulatan
    if (pembulatan === "1") {
      // No change, already in rupiah
    } else if (pembulatan === "2") {
      // In thousands
      selectClause = selectClause.replace(/round\(sum\(a\./g, "round(sum(a.");
      selectClause = selectClause.replace(/,0\)/g, "/1000,0)");
    } else if (pembulatan === "3") {
      // In millions
      selectClause = selectClause.replace(/round\(sum\(a\./g, "round(sum(a.");
      selectClause = selectClause.replace(/,0\)/g, "/1000000,0)");
    } else if (pembulatan === "4") {
      // In billions
      selectClause = selectClause.replace(/round\(sum\(a\./g, "round(sum(a.");
      selectClause = selectClause.replace(/,0\)/g, "/1000000000,0)");
    }

    // Build the WHERE clause based on filters
    const conditions = [];

    // Department filter
    if (dept !== "XX" && dept !== "000") {
      conditions.push(`a.kddept = '${dept}'`);
    }

    // Unit filter
    if (kdunit !== "XX") {
      conditions.push(`a.kdunit = '${kdunit}'`);
    }

    // Dekon filter
    if (dekon !== "XX") {
      conditions.push(`a.kddekon = '${dekon}'`);
    }

    // Province filter
    if (prov !== "XX") {
      conditions.push(`a.kdprov = '${prov}'`);
    }

    // Kabkota filter
    if (kabkota !== "XX") {
      conditions.push(`a.kdkabkota = '${kabkota}'`);
    }

    // Kanwil filter
    if (kanwil !== "XX") {
      conditions.push(`a.kdkanwil = '${kanwil}'`);
    }

    // KPPN filter
    if (kppn !== "XX") {
      conditions.push(`a.kdkppn = '${kppn}'`);
    }

    // Satker filter
    if (satker !== "XX") {
      conditions.push(`a.kdsatker = '${satker}'`);
    }

    // Function filter
    if (fungsi !== "XX") {
      conditions.push(`a.kdfungsi = '${fungsi}'`);
    }

    // Sub-function filter
    if (sfungsi !== "XX") {
      conditions.push(`a.kdsfungsi = '${sfungsi}'`);
    }

    // Program filter
    if (program !== "XX") {
      conditions.push(`a.kdprogram = '${program}'`);
    }

    // Activity filter
    if (giat !== "XX") {
      conditions.push(`a.kdgiat = '${giat}'`);
    }

    // Output filter
    if (output !== "XX") {
      conditions.push(`a.kdoutput = '${output}'`);
    }

    // Sub-output filter
    if (soutput !== "XX") {
      conditions.push(`a.kdsoutput = '${soutput}'`);
    }

    // Account filter
    if (akun !== "XX") {
      conditions.push(`a.kdakun = '${akun}'`);
    }

    // Funding source filter
    if (sdana !== "XX") {
      conditions.push(`a.kdsdana = '${sdana}'`);
    }

    // Register filter
    if (register !== "XX") {
      conditions.push(`a.kdregister = '${register}'`);
    }

    // Cut-off filter
    if (cutoff && cutoff !== "12") {
      conditions.push(`a.bulan <= '${cutoff}'`);
    }

    // Combine conditions
    if (conditions.length > 0) {
      whereClause = `WHERE ${conditions.join(" AND ")}`;
    }

    // Build GROUP BY clause based on selected display options
    const groupByColumns = [];

    // Department grouping
    if (deptradio !== "4") {
      if (deptradio === "1") {
        groupByColumns.push("a.kddept, b.nmdept");
        selectClause = "a.kddept, b.nmdept" + selectClause;
        fromClause += " LEFT JOIN dbref.t_dept_2023 b ON a.kddept = b.kddept";
      } else if (deptradio === "2") {
        groupByColumns.push("a.kddept");
        selectClause = "a.kddept" + selectClause;
      } else if (deptradio === "3") {
        groupByColumns.push("b.nmdept");
        selectClause = "b.nmdept" + selectClause;
        fromClause += " LEFT JOIN dbref.t_dept_2023 b ON a.kddept = b.kddept";
      }
    }

    // Unit grouping
    if (unitradio !== "4") {
      if (unitradio === "1") {
        groupByColumns.push("a.kdunit, c.nmunit");
        selectClause += ", a.kdunit, c.nmunit";
        fromClause += " LEFT JOIN dbref.t_unit_2025 c ON a.kdunit = c.kdunit";
      } else if (unitradio === "2") {
        groupByColumns.push("a.kdunit");
        selectClause += ", a.kdunit";
      } else if (unitradio === "3") {
        groupByColumns.push("c.nmunit");
        selectClause += ", c.nmunit";
        fromClause += " LEFT JOIN dbref.t_unit_2025 c ON a.kdunit = c.kdunit";
      }
    }

    // Add similar blocks for other filters...

    // Build the final GROUP BY clause
    if (groupByColumns.length > 0) {
      groupByClause = `GROUP BY ${groupByColumns.join(", ")}`;
    }

    // Build ORDER BY clause
    if (groupByColumns.length > 0) {
      orderByClause = `ORDER BY ${groupByColumns[0]}`;
    }

    // Combine all parts into the final SQL query
    const finalQuery = `
      SELECT ${selectClause}
      FROM ${fromClause}
      ${whereClause}
      ${groupByClause}
      ${orderByClause}
    `.trim();

    // Update state with the new query parts
    setFrom(fromClause);
    setSelect(selectClause);
    setSql(finalQuery);

    return finalQuery;
  };

  // Generate SQL preview without executing
  const generateSqlPreview = () => {
    return buildQuery();
  };

  return {
    buildQuery,
    generateSqlPreview,
  };
}
