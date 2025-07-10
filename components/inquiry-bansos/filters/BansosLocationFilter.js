/**
 * Location-specific filters for inquiry-bansos (Provinsi, Kabkota)
 */

import BaseFilter from "./BaseFilter";

/**
 * Provinsi Filter
 */
export class ProvinsiFilter extends BaseFilter {
  constructor() {
    super("kdprov", "provinsi", {
      schema: "dbref",
      table: "t_provinsi",
      alias: "e",
      nameField: "nmprov",
      hasYear: false,
      joinCondition: "a.kdprov=e.kdprov",
    });
  }

  /**
   * Build filter conditions for Provinsi
   * @param {object} inquiryState - Complete inquiry state
   * @returns {object} - Filter result
   */
  buildFromState(inquiryState) {
    const {
      provinsi: isEnabled,
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
 * Kabupaten/Kota Filter
 */
export class KabkotaFilter extends BaseFilter {
  constructor() {
    super("kdkabkota", "kabkota", {
      schema: "dbref",
      table: "t_kabkota_bansos",
      alias: "f",
      nameField: "nmkabkota",
      hasYear: false,
      joinCondition: "a.kdprov=f.kdprov AND a.kdkabkota=f.kdkabkota",
    });
  }

  /**
   * Build filter conditions for Kabupaten/Kota
   * @param {object} inquiryState - Complete inquiry state
   * @returns {object} - Filter result
   */
  buildFromState(inquiryState) {
    const {
      kabkota: isEnabled,
      kabkotavalue: pilihValue,
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
