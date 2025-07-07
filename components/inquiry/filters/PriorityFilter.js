import BaseFilter from "./BaseFilter";

/**
 * Pronas (PN) Filter Handler
 */
class PronasFilter extends BaseFilter {
  constructor() {
    super("kdpn", "pronas", {
      schema: "dbref",
      table: "t_prinas",
      alias: "pn",
      nameField: "nmpn",
      hasYear: true,
      joinCondition: "a.kdpn=pn.kdpn",
    });
  }

  buildFromState(inquiryState) {
    const {
      KdPN: isEnabled,
      PN: pilihValue,
      PNkondisi: kondisiValue,
      opsikataPN: kataValue,
      pnradio: radio,
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
 * Propres (PP) Filter Handler
 */
class PropresFilter extends BaseFilter {
  constructor() {
    super("kdpp", "propres", {
      schema: "dbref",
      table: "t_priprog",
      alias: "pp",
      nameField: "nmpp",
      hasYear: true,
      joinCondition: "a.kdpp=pp.kdpp",
    });
  }

  buildFromState(inquiryState) {
    const {
      KdPP: isEnabled,
      PP: pilihValue,
      PPkondisi: kondisiValue,
      opsikataPP: kataValue,
      ppradio: radio,
      thang,
    } = inquiryState;

    // Handle composite PP value (e.g., "01-01" should become "01")
    let processedPilihValue = pilihValue;
    if (pilihValue && pilihValue.includes("-")) {
      processedPilihValue = pilihValue.split("-")[1]; // Get the part after the dash
      console.log(
        `PropresFilter (inquiry) - Extracted PP from composite value: "${pilihValue}" -> "${processedPilihValue}"`
      );
    }

    return this.build(
      {
        isEnabled,
        radio,
        pilihValue: processedPilihValue,
        kondisiValue,
        kataValue,
      },
      thang
    );
  }
}

/**
 * Kegiatan Prioritas (KP) Filter Handler
 */
class KegiatanPrioritasFilter extends BaseFilter {
  constructor() {
    super("kdkp", "kegiatanprioritas", {
      schema: "dbref",
      table: "t_prigiat", // Base table name, year will be appended
      alias: "pg",
      nameField: "nmkp",
      hasYear: true,
      joinCondition: "a.kdkp=pg.kdkp AND a.kdpp=pg.kdpp AND a.kdpn=pg.kdpn",
    });
  }

  buildFromState(inquiryState) {
    const {
      KdKegPP: isEnabled,
      kegiatanprioritas: pilihValue,
      kegiatanprioritasradio: radio,
      thang,
    } = inquiryState;
    const kondisiValue = undefined;
    const kataValue = undefined;

    // DEBUG: Log the state values
    console.log("🔍 KegiatanPrioritasFilter DEBUG:", {
      isEnabled,
      pilihValue,
      radio,
      thang,
      timestamp: new Date().toISOString(),
    });

    const result = this.build(
      {
        isEnabled,
        radio,
        pilihValue,
        kondisiValue,
        kataValue,
      },
      thang
    );

    // DEBUG: Log the result
    console.log("🔍 KegiatanPrioritasFilter RESULT:", result);

    // SPECIAL HANDLING: For Kegiatan Prioritas, we always need the JOIN clause when enabled,
    // even if pilihValue is "00" (Semua) and radio is "4" (Jangan Tampilkan)
    // This ensures the table is included in the query structure for proper filtering
    if (isEnabled && !result.joinClause) {
      result.joinClause = this.buildJoinClause(thang);
      console.log("🔍 KegiatanPrioritasFilter FORCED JOIN:", result.joinClause);
    }

    return result;
  }
}

/**
 * Prioritas (PRI) Filter Handler
 */
class PrioritasFilter extends BaseFilter {
  constructor() {
    super("kdproy", "prioritas", {
      schema: "dbref",
      table: "t_priproy",
      alias: "pri",
      nameField: "nmproy",
      hasYear: true,
      joinCondition: "a.kdproy=pri.kdproy",
    });
  }

  buildFromState(inquiryState) {
    const {
      KdPRI: isEnabled,
      PRI: pilihValue,
      PRIkondisi: kondisiValue,
      opsikataPRI: kataValue,
      priradio: radio,
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
 * Tema Filter Handler
 */
class TemaFilter extends BaseFilter {
  constructor() {
    super("kdtema", "tema", {
      schema: "dbref",
      table: "t_tema",
      alias: "tm",
      nameField: "nmtema",
      hasYear: true,
      joinCondition: "a.kdtema=tm.kdtema",
    });
  }

  buildFromState(inquiryState) {
    const {
      KdTema: isEnabled,
      Tema: pilihValue,
      Temakondisi: kondisiValue,
      opsikataTema: kataValue,
      temaradio: radio,
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
 * Mega Project (MP) Filter Handler
 */
class MegaProjectFilter extends BaseFilter {
  constructor() {
    super("kdmp", "megaproject", {
      schema: "dbref",
      table: "t_mp",
      alias: "mp",
      nameField: "nmmp",
      hasYear: false, // Exception: t_mp table doesn't use year suffix
      joinCondition: "a.kdmp=mp.kdmp",
    });
  }

  buildFromState(inquiryState) {
    const {
      KdMP: isEnabled,
      MP: pilihValue,
      MPkondisi: kondisiValue,
      opsikataMP: kataValue,
      mpradio: radio,
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

export {
  PronasFilter,
  PropresFilter,
  KegiatanPrioritasFilter,
  PrioritasFilter,
  TemaFilter,
  MegaProjectFilter,
};
export default PronasFilter;
