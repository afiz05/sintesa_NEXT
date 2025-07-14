/**
 * Bansos-specific filters for inquiry-bansos
 */

import BaseFilter from "./BaseFilter";

/**
 * Jenis Bansos Filter
 */
export class JenisBansosFilter extends BaseFilter {
  constructor() {
    super("kdjenis_transaksi", "jenis_bansos", {
      schema: "dbref",
      table: "t_jenis_bansos",
      alias: "k",
      nameField: "jenis_transaksi",
      hasYear: false,
      joinCondition: "a.kdjenis_transaksi=k.kdjenis_transaksi",
    });
  }

  /**
   * Build filter conditions for Jenis Bansos
   * @param {object} inquiryState - Complete inquiry state
   * @returns {object} - Filter result
   */
  buildFromState(inquiryState) {
    const {
      jenisbansos: isEnabled,
      bansostype: pilihValue,
      bansoskondisi: kondisiValue,
      katabansos: kataValue,
      bansosradio: radio,
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
 * Status Transaksi Filter
 */
export class StatusTransaksiFilter extends BaseFilter {
  constructor() {
    super("return_code", "status_transaksi", {
      schema: "dbref",
      table: "t_return_status",
      alias: "dd",
      nameField: "nmreturn",
      hasYear: false,
      joinCondition: "a.return_code=dd.return_code",
    });
  }

  /**
   * Build filter conditions for Status Transaksi
   * @param {object} inquiryState - Complete inquiry state
   * @returns {object} - Filter result
   */
  buildFromState(inquiryState) {
    const {
      statustransaksi: isEnabled,
      statusvalue: pilihValue,
      statuskondisi: kondisiValue,
      katastatus: kataValue,
      statusradio: radio,
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
 * Kecamatan Filter
 */
export class KecamatanFilter extends BaseFilter {
  constructor() {
    super("kdkec", "kecamatan", {
      schema: "dbref",
      table: "t_kecamatan",
      alias: "h",
      nameField: "nmkec",
      hasYear: false,
      joinCondition:
        "a.kdprov=h.kdprov and a.kdkabkota=h.kdkabkota and a.kdkec=h.kdkec",
    });
  }

  /**
   * Build filter conditions for Kecamatan
   * @param {object} inquiryState - Complete inquiry state
   * @returns {object} - Filter result
   */
  buildFromState(inquiryState) {
    const {
      kecamatan: isEnabled,
      kecamatanvalue: pilihValue,
      kecamatankondisi: kondisiValue,
      katakecamatan: kataValue,
      kecamatanradio: radio,
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
 * Desa Filter
 */
export class DesaFilter extends BaseFilter {
  constructor() {
    super("kddesa", "desa", {
      schema: "dbref",
      table: "t_desa",
      alias: "ii",
      nameField: "nmdesa",
      hasYear: false,
      joinCondition:
        "a.kdprov=ii.kdprov and a.kdkabkota=ii.kdkabkota and a.kdkec=ii.kdkec and a.kddesa=ii.kddesa",
    });
  }

  /**
   * Build filter conditions for Desa
   * @param {object} inquiryState - Complete inquiry state
   * @returns {object} - Filter result
   */
  buildFromState(inquiryState) {
    const {
      desa: isEnabled,
      desavalue: pilihValue,
      desakondisi: kondisiValue,
      katadesa: kataValue,
      desaradio: radio,
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
