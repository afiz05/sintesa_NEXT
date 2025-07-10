import BaseFilter from "./BaseFilter";

/**
 * Akun Filter Handler
 */
class AkunFilter extends BaseFilter {
  constructor() {
    super("kdakun", "akun", {
      schema: "dbref",
      table: "t_akun",
      alias: "ak",
      nameField: "nmakun",
      hasYear: true,
      joinCondition: "a.kdakun=ak.kdakun",
    });
  }

  buildFromState(inquiryState) {
    const {
      kdakun: isEnabled,
      akun: pilihValue,
      akunkondisi: kondisiValue,
      kataakun: kataValue,
      akunradio: radio,
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

    // Special: If 'Kode BKPK' or 'Jenis Belanja' is selected, customize SELECT, GROUP BY, and filter logic
    if (isEnabled && (pilihValue === "BKPK" || pilihValue === "JENBEL")) {
      // Use 4 for BKPK, 2 for JENBEL
      const leftLen = pilihValue === "BKPK" ? 4 : 2;
      // Build default, but override columns, groupBy, joinClause, and whereConditions
      const result = this.build(
        {
          isEnabled: true,
          radio,
          pilihValue: "", // no value, so no whereCondition
          kondisiValue: "",
          kataValue: "",
        },
        thang
      );
      if (pilihValue === "BKPK") {
        const bkpkTable = `dbref.t_bkpk_${thang}`;
        if (radio === "3") {
          result.columns = ["bk.nmbkpk"];
          result.joinClause = ` LEFT JOIN ${bkpkTable} bk ON LEFT(a.kdakun,${leftLen}) = bk.kdbkpk`;
          result.groupBy = [`LEFT(a.kdakun,${leftLen})`];
        } else if (radio === "2") {
          result.columns = [`LEFT(a.kdakun,${leftLen}) AS kdbkpk`, "bk.nmbkpk"];
          result.joinClause = ` LEFT JOIN ${bkpkTable} bk ON LEFT(a.kdakun,${leftLen}) = bk.kdbkpk`;
          result.groupBy = [`LEFT(a.kdakun,${leftLen})`];
        } else {
          result.columns = [`LEFT(a.kdakun,${leftLen}) AS kdbkpk`];
          result.groupBy = [`LEFT(a.kdakun,${leftLen})`];
          result.joinClause = "";
        }
        // Custom filter for kondisi (akunkondisi)
        if (kondisiValue && /^[0-9]+$/.test(kondisiValue)) {
          const n = kondisiValue.length;
          result.whereConditions = [
            `LEFT(a.kdakun,${n}) IN ('${kondisiValue}')`,
          ];
        }
        // Custom filter for kata (bk.nmbkpk)
        if (kataValue && kataValue.trim() !== "") {
          result.whereConditions = [`bk.nmbkpk LIKE '%${kataValue.trim()}%'`];
        }
      } else if (pilihValue === "JENBEL") {
        const gbkpkTable = `dbref.t_gbkpk_${thang}`;
        if (radio === "3") {
          result.columns = ["gb.nmgbkpk"];
          result.joinClause = ` LEFT JOIN ${gbkpkTable} gb ON LEFT(a.kdakun,${leftLen}) = gb.kdgbkpk`;
          result.groupBy = [`LEFT(a.kdakun,${leftLen})`];
        } else if (radio === "2") {
          result.columns = [
            `LEFT(a.kdakun,${leftLen}) AS kdgbkpk`,
            "gb.nmgbkpk",
          ];
          result.joinClause = ` LEFT JOIN ${gbkpkTable} gb ON LEFT(a.kdakun,${leftLen}) = gb.kdgbkpk`;
          result.groupBy = [`LEFT(a.kdakun,${leftLen})`];
        } else {
          result.columns = [`LEFT(a.kdakun,${leftLen}) AS kdgbkpk`];
          result.groupBy = [`LEFT(a.kdakun,${leftLen})`];
          result.joinClause = "";
        }
        // Custom filter for kondisi (akunkondisi)
        if (kondisiValue && /^[0-9]+$/.test(kondisiValue)) {
          const n = kondisiValue.length;
          result.whereConditions = [
            `LEFT(a.kdakun,${n}) IN ('${kondisiValue}')`,
          ];
        }
        // Custom filter for kata (gb.nmgbkpk)
        if (kataValue && kataValue.trim() !== "") {
          result.whereConditions = [`gb.nmgbkpk LIKE '%${kataValue.trim()}%'`];
        }
      }
      return result;
    }

    // If 'Kode Akun' (AKUN) is selected, skip whereCondition but keep columns
    if (
      isEnabled &&
      (pilihValue === "AKUN" || !pilihValue) &&
      !kondisiValue &&
      !kataValue
    ) {
      // Pass isEnabled true, but pilihValue empty so build() only returns columns
      return this.build(
        {
          isEnabled: true,
          radio,
          pilihValue: "", // no value, so no whereCondition
          kondisiValue: "",
          kataValue: "",
        },
        thang
      );
    }

    // Custom: if user enters a value in akunkondisi, use LEFT(a.kdakun, N) IN (...)
    if (isEnabled && kondisiValue && /^[0-9]+$/.test(kondisiValue)) {
      const n = kondisiValue.length;
      const whereCondition = `LEFT(a.kdakun,${n}) IN ('${kondisiValue}')`;
      // Call build, but override whereConditions
      const result = this.build(
        {
          isEnabled,
          radio,
          pilihValue: "", // ignore pilihValue for this case
          kondisiValue: "", // prevent default whereCondition
          kataValue,
        },
        thang
      );
      // Inject custom whereCondition
      return {
        ...result,
        whereConditions: [whereCondition],
      };
    }

    // Custom: if user enters a value in kataValue, use ak.nmakun LIKE '%kataValue%'
    if (isEnabled && kataValue && kataValue.trim() !== "") {
      const whereCondition = `ak.nmakun LIKE '%${kataValue.trim()}%'`;
      const result = this.build(
        {
          isEnabled,
          radio,
          pilihValue: "", // ignore pilihValue for this case
          kondisiValue: "", // prevent default whereCondition
          kataValue,
        },
        thang
      );
      return {
        ...result,
        whereConditions: [whereCondition],
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
 * Sumber Dana Filter Handler
 */
class SumberDanaFilter extends BaseFilter {
  constructor() {
    super("kdsdana", "sdana", {
      schema: "dbref",
      table: "t_sdana",
      alias: "sd",
      nameField: "nmsdana",
      hasYear: true,
      joinCondition: "a.kdsdana=sd.kdsdana",
    });
  }

  buildFromState(inquiryState) {
    const {
      kdsdana: isEnabled,
      sdana: pilihValue,
      sdanakondisi: kondisiValue,
      opsikatasdana: kataValue,
      sdanaradio: radio,
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
 * Register Filter Handler
 */
class RegisterFilter extends BaseFilter {
  constructor() {
    super("kdregister", "register", {
      schema: "dbref",
      table: "t_register",
      alias: "r",
      nameField: "nmregister",
      hasYear: true,
      joinCondition: "a.kdregister=r.kdregister",
    });
  }

  buildFromState(inquiryState) {
    const {
      kdregister: isEnabled,
      register: pilihValue,
      registerkondisi: kondisiValue,
      opsikataregister: kataValue,
      registerradio: radio,
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

export { AkunFilter, SumberDanaFilter, RegisterFilter };
export default AkunFilter;
