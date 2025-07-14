import BaseFilter from "./BaseFilter";

/**
 * Fungsi Filter Handler
 */
class FungsiFilter extends BaseFilter {
  constructor() {
    super("kdfungsi", "fungsi", {
      schema: "dbref",
      table: "t_fungsi",
      alias: "f",
      nameField: "nmfungsi",
      hasYear: true,
      joinCondition: "a.kdfungsi=f.kdfungsi",
    });
  }

  buildFromState(inquiryState) {
    const {
      kdfungsi: isEnabled,
      fungsi: pilihValue,
      fungsikondisi: kondisiValue,
      katafungsi: kataValue,
      fungsiradio: radio,
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
 * Sub Fungsi Filter Handler
 */
class SubFungsiFilter extends BaseFilter {
  constructor() {
    super("kdsfung", "subfungsi", {
      schema: "dbref",
      table: "t_sfung",
      alias: "sf",
      nameField: "nmsfung",
      hasYear: true,
      joinCondition: "a.kdfungsi=sf.kdfungsi AND a.kdsfung=sf.kdsfung",
    });
  }

  buildFromState(inquiryState) {
    const {
      kdsfungsi: isEnabled,
      sfungsi: pilihValue,
      subfungsikondisi: kondisiValue,
      katasubfungsi: kataValue,
      subfungsiradio: radio,
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
 * Program Filter Handler
 */
class ProgramFilter extends BaseFilter {
  constructor() {
    super("kdprogram", "program", {
      schema: "dbref",
      table: "t_program",
      alias: "pr",
      nameField: "nmprogram",
      hasYear: true,
      joinCondition:
        "a.kddept=pr.kddept AND a.kdunit=pr.kdunit AND a.kdprogram=pr.kdprogram",
    });
  }

  buildFromState(inquiryState) {
    const {
      kdprogram: isEnabled,
      program: pilihValue,
      programkondisi: kondisiValue,
      kataprogram: kataValue,
      programradio: radio,
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
 * Kegiatan Filter Handler
 */
class KegiatanFilter extends BaseFilter {
  constructor() {
    super("kdgiat", "kegiatan", {
      schema: "dbref",
      table: "t_giat",
      alias: "g",
      nameField: "nmgiat",
      hasYear: true,
      joinCondition:
        "a.kddept=g.kddept AND a.kdunit=g.kdunit AND a.kdprogram=g.kdprogram AND a.kdgiat=g.kdgiat",
    });
  }

  buildFromState(inquiryState) {
    const {
      kdgiat: isEnabled,
      giat: pilihValue,
      giatkondisi: kondisiValue,
      katagiat: kataValue,
      kegiatanradio: radio,
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
 * Output Filter Handler
 */
class OutputFilter extends BaseFilter {
  constructor() {
    super("kdoutput", "output", {
      schema: "dbref",
      table: "t_output",
      alias: "o",
      nameField: "nmoutput",
      hasYear: true,
      joinCondition:
        "a.kddept=o.kddept AND a.kdunit=o.kdunit AND a.kdprogram=o.kdprogram AND a.kdgiat=o.kdgiat AND a.kdoutput=o.kdoutput",
    });
  }

  buildFromState(inquiryState) {
    const {
      kdoutput: isEnabled,
      output: pilihValue,
      outputkondisi: kondisiValue,
      kataoutput: kataValue,
      outputradio: radio,
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
 * Sub Output Filter Handler
 */
class SubOutputFilter extends BaseFilter {
  constructor() {
    super("kdsoutput", "suboutput", {
      schema: "dbref",
      table: "t_soutput",
      alias: "so",
      nameField: "nmsoutput",
      hasYear: true,
      joinCondition:
        "a.kddept=so.kddept AND a.kdunit=so.kdunit AND a.kdprogram=so.kdprogram AND a.kdgiat=so.kdgiat AND a.kdoutput=so.kdoutput AND a.kdsoutput=so.kdsoutput",
    });
  }

  buildFromState(inquiryState) {
    const {
      kdsoutput: isEnabled,
      soutput: pilihValue,
      soutputkondisi: kondisiValue,
      katasoutput: kataValue,
      soutputradio: radio,
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
  FungsiFilter,
  SubFungsiFilter,
  ProgramFilter,
  KegiatanFilter,
  OutputFilter,
  SubOutputFilter,
};
export default ProgramFilter;
