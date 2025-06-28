import BaseFilter from "./BaseFilter";

/**
 * Pronas (PN) Filter Handler
 */
class PronasFilter extends BaseFilter {
  constructor() {
    super("kdpn", "pronas", {
      schema: "dbref",
      table: "t_pn",
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
      table: "t_pp",
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
 * Kegiatan Propres (KegPP) Filter Handler
 */
class KegiatanPropresFilter extends BaseFilter {
  constructor() {
    super("kdkegpp", "kegpropres", {
      schema: "dbref",
      table: "t_kegpp",
      alias: "kpp",
      nameField: "nmkegpp",
      hasYear: true,
      joinCondition: "a.kdkegpp=kpp.kdkegpp",
    });
  }

  buildFromState(inquiryState) {
    const {
      KdKegPP: isEnabled,
      KegPP: pilihValue,
      KegPPkondisi: kondisiValue,
      opsikataKegPP: kataValue,
      kegppradio: radio,
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
 * Prioritas (PRI) Filter Handler
 */
class PrioritasFilter extends BaseFilter {
  constructor() {
    super("kdpri", "prioritas", {
      schema: "dbref",
      table: "t_pri",
      alias: "pri",
      nameField: "nmpri",
      hasYear: true,
      joinCondition: "a.kdpri=pri.kdpri",
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
      hasYear: true,
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
  KegiatanPropresFilter,
  PrioritasFilter,
  TemaFilter,
  MegaProjectFilter,
};
export default PronasFilter;
