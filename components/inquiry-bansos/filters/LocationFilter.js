import BaseFilter from "./BaseFilter";

/**
 * Provinsi Filter Handler
 */
class ProvinsiFilter extends BaseFilter {
  constructor() {
    super("kdlokasi", "provinsi", {
      schema: "dbref",
      table: "t_lokasi",
      alias: "p",
      nameField: "nmlokasi",
      hasYear: true,
      joinCondition: "a.kdlokasi=p.kdlokasi",
    });
  }

  buildFromState(inquiryState) {
    const {
      kdlokasi: isEnabled,
      prov: pilihValue,
      lokasikondisi: kondisiValue,
      katalokasi: kataValue,
      locradio: radio,
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
 * Kabupaten/Kota Filter Handler
 */
class KabkotaFilter extends BaseFilter {
  constructor() {
    super("kdkabkota", "kabkota", {
      schema: "dbref",
      table: "t_kabkota",
      alias: "kk",
      nameField: "nmkabkota",
      hasYear: true,
      joinCondition: "a.kdlokasi=kk.kdlokasi AND a.kdkabkota=kk.kdkabkota",
    });
  }

  buildFromState(inquiryState) {
    const {
      kdkabkota: isEnabled,
      kabkota: pilihValue,
      kabkotakondisi: kondisiValue,
      katakabkota: kataValue,
      kabkotaradio: radio,
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
 * Kanwil Filter Handler
 */
class KanwilFilter extends BaseFilter {
  constructor() {
    super("kdkanwil", "kanwil", {
      schema: "dbref",
      table: "t_kanwil",
      alias: "kw",
      nameField: "nmkanwil",
      hasYear: true,
      joinCondition: "a.kdkanwil=kw.kdkanwil",
    });
  }

  buildFromState(inquiryState) {
    const {
      kdkanwil: isEnabled,
      kanwil: pilihValue,
      kanwilkondisi: kondisiValue,
      katakanwil: kataValue,
      kanwilradio: radio,
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
 * KPPN Filter Handler
 */
class KppnFilter extends BaseFilter {
  constructor() {
    super("kdkppn", "kppn", {
      schema: "dbref",
      table: "t_kppn",
      alias: "kp",
      nameField: "nmkppn",
      hasYear: true,
      joinCondition: "a.kdkppn=kp.kdkppn",
    });
  }

  buildFromState(inquiryState) {
    const {
      kdkppn: isEnabled,
      kppn: pilihValue,
      kppnkondisi: kondisiValue,
      katakppn: kataValue,
      kppnradio: radio,
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

export { ProvinsiFilter, KabkotaFilter, KanwilFilter, KppnFilter };
export default ProvinsiFilter;
