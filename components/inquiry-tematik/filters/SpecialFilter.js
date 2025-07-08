/**
 * Special Filters for jenlap = 7 (Priority Programs)
 * Handles: Inflasi, Stunting, Kemiskinan, Pemilu, IKN, Pangan
 * Based on original SQL.jsx jenlap = 6 logic
 */

import BaseFilter from "./BaseFilter";

/**
 * Inflasi Filter - Handles inflation intervention filters
 */
export class InflasiFilter extends BaseFilter {
  constructor() {
    super("inflasi");
  }

  buildFromState(inquiryState) {
    const { jenlap, Inflasi, inflasiradio, opsiInflasi } = inquiryState;

    // Only activate this filter for jenlap 6, never for jenlap 7
    if (jenlap !== "6") {
      return this.getEmptyResult();
    }

    const result = this.getEmptyResult();

    // FUNGSI KDINFLASI - Based on original jenlap = 6 logic
    if (inflasiradio === "1" && Inflasi !== "XX") {
      result.columns.push("a.inf_intervensi", "a.inf_pengeluaran");
      result.groupBy.push("a.inf_intervensi", "a.inf_pengeluaran");
    }

    if (inflasiradio === "2" && Inflasi !== "XX") {
      result.columns.push(
        "a.inf_intervensi",
        "bb.ur_inf_intervensi",
        "a.inf_pengeluaran",
        "inf.ur_inf_pengeluaran"
      );
      result.joinClause =
        " LEFT JOIN dbref.ref_inf_intervensi bb ON a.inf_intervensi=bb.inf_intervensi" +
        " LEFT JOIN dbref.ref_inf_pengeluaran inf on a.inf_pengeluaran=inf.inf_pengeluaran";
      result.groupBy.push("a.inf_intervensi", "a.inf_pengeluaran");
    }

    if (inflasiradio === "3" && Inflasi !== "XX") {
      result.columns.push("bb.ur_inf_intervensi", "inf.ur_inf_pengeluaran");
      result.joinClause =
        " LEFT JOIN dbref.ref_inf_intervensi bb ON a.inf_intervensi=bb.inf_intervensi" +
        " LEFT JOIN dbref.ref_inf_pengeluaran inf on a.inf_pengeluaran=inf.inf_pengeluaran";
      result.groupBy.push("a.inf_intervensi", "a.inf_pengeluaran");
    }

    if (inflasiradio === "4") {
      result.columns = [];
    }

    // Filter condition when opsiInflasi is set
    if (opsiInflasi === "pilihInflasi" && Inflasi !== "XX") {
      if (Inflasi && Inflasi !== "00") {
        result.whereConditions.push(
          "(a.inf_intervensi <> 'NULL' OR a.inf_pengeluaran <> 'NULL')"
        );
      }
    }

    return result;
  }
}

/**
 * Stunting Filter - Handles stunting intervention filters
 */
export class StuntingFilter extends BaseFilter {
  constructor() {
    super("stunting");
  }

  buildFromState(inquiryState) {
    const { jenlap, Stunting, stuntingradio } = inquiryState;

    // Only activate this filter for jenlap 6, never for jenlap 7
    if (jenlap !== "6") {
      return this.getEmptyResult();
    }

    const result = this.getEmptyResult();

    // FUNGSI KDSTUNTING - Based on original jenlap = 6 logic
    if (stuntingradio === "1" && Stunting !== "XX") {
      result.columns.push("a.stun_intervensi");
      result.groupBy.push("a.stun_intervensi");
    }

    if (stuntingradio === "2" && Stunting !== "XX") {
      result.columns.push("a.stun_intervensi", "stun.ur_stun_intervensi");
      result.joinClause =
        " LEFT JOIN dbref.ref_stunting_intervensi stun ON a.stun_intervensi=stun.stun_intervensi";
      result.groupBy.push("a.stun_intervensi");
    }

    if (stuntingradio === "3" && Stunting !== "XX") {
      result.columns.push("stun.ur_stun_intervensi");
      result.joinClause =
        " LEFT JOIN dbref.ref_stunting_intervensi stun ON a.stun_intervensi=stun.stun_intervensi";
      result.groupBy.push("a.stun_intervensi");
    }

    if (stuntingradio === "4") {
      result.columns = [];
    }

    // Note: opsiStunting field doesn't exist in state, removing filter condition
    // TODO: Add opsiStunting to state if needed for filtering by specific stunting intervention

    return result;
  }
}

/**
 * Kemiskinan Filter - Handles extreme poverty filters
 */
export class KemiskinanFilter extends BaseFilter {
  constructor() {
    super("kemiskinan");
  }

  buildFromState(inquiryState) {
    const { jenlap, Miskin, kemiskinanradio, opsiKemiskinan } = inquiryState;

    // Only activate this filter for jenlap 6, never for jenlap 7
    if (jenlap !== "6") {
      return this.getEmptyResult();
    }

    const result = this.getEmptyResult();

    // FUNGSI KEMISKINAN EKSTRIM - Based on original jenlap = 6 logic
    if (kemiskinanradio === "1" && Miskin !== "XX") {
      result.columns.push("a.kemiskinan_ekstrim");
      result.groupBy.push("a.kemiskinan_ekstrim");
    }

    if (kemiskinanradio === "2" && Miskin !== "XX") {
      result.columns.push(
        "a.kemiskinan_ekstrim",
        "(CASE WHEN a.kemiskinan_ekstrim = 'TRUE' THEN 'Belanja Kemiskinan Esktrim' WHEN a.kemiskinan_ekstrim <> 'TRUE' THEN 'Bukan Kemiskinan Ekstrim' END) AS ur_kemiskinan_ekstrim"
      );
      result.groupBy.push("a.kemiskinan_ekstrim");
    }

    if (kemiskinanradio === "3" && Miskin !== "XX") {
      result.columns.push(
        "(CASE WHEN a.kemiskinan_ekstrim = 'TRUE' THEN 'Belanja Kemiskinan Esktrim' WHEN a.kemiskinan_ekstrim <> 'TRUE' THEN 'Bukan Kemiskinan Ekstrim' END) AS ur_kemiskinan_ekstrim"
      );
      result.groupBy.push("a.kemiskinan_ekstrim");
    }

    if (kemiskinanradio === "4") {
      result.columns = [];
    }

    // Filter condition when opsiKemiskinan is set
    if (opsiKemiskinan === "pilihKemiskinan" && Miskin !== "XX") {
      if (Miskin && Miskin !== "00") {
        result.whereConditions.push(`a.kemiskinan_ekstrim = '${Miskin}'`);
      }
    }

    return result;
  }
}

/**
 * Pemilu Filter - Handles election budget filters
 */
export class PemiluFilter extends BaseFilter {
  constructor() {
    super("pemilu");
  }

  buildFromState(inquiryState) {
    const { jenlap, Pemilu, pemiluradio } = inquiryState;

    // Only activate this filter for jenlap 6, never for jenlap 7
    if (jenlap !== "6") {
      return this.getEmptyResult();
    }

    const result = this.getEmptyResult();

    // FUNGSI BELANJA PEMILU - Based on original jenlap = 6 logic
    if (pemiluradio === "1" && Pemilu !== "XX") {
      result.columns.push("a.pemilu");
      result.groupBy.push("a.pemilu");
    }

    if (pemiluradio === "2" && Pemilu !== "XX") {
      result.columns.push(
        "a.pemilu",
        "(CASE WHEN a.pemilu = 'TRUE' THEN 'Belanja Pemilu' WHEN a.pemilu <> 'TRUE' THEN 'Bukan Belanja Pemilu' END) AS ur_belanja_pemilu"
      );
      result.groupBy.push("a.pemilu");
    }

    if (pemiluradio === "3" && Pemilu !== "XX") {
      result.columns.push(
        "(CASE WHEN a.pemilu = 'TRUE' THEN 'Belanja Pemilu' WHEN a.pemilu <> 'TRUE' THEN 'Bukan Belanja Pemilu' END) AS ur_belanja_pemilu"
      );
      result.groupBy.push("a.pemilu");
    }

    if (pemiluradio === "4") {
      result.columns = [];
    }

    // Note: opsiPemilu field doesn't exist in state, removing filter condition
    // TODO: Add opsiPemilu to state if needed for filtering by specific election type

    return result;
  }
}

/**
 * IKN Filter - Handles IKN (Ibu Kota Nusantara) budget filters
 */
export class IknFilter extends BaseFilter {
  constructor() {
    super("ikn");
  }

  buildFromState(inquiryState) {
    const { jenlap, Ikn, iknradio, opsiIkn } = inquiryState;

    // Only activate this filter for jenlap 6, never for jenlap 7
    if (jenlap !== "6") {
      return this.getEmptyResult();
    }

    const result = this.getEmptyResult();

    // FUNGSI BELANJA IKN - Based on original jenlap = 6 logic
    if (iknradio === "1" && Ikn !== "XX") {
      result.columns.push("a.ikn");
      result.groupBy.push("a.ikn");
    }

    if (iknradio === "2" && Ikn !== "XX") {
      result.columns.push(
        "a.ikn",
        "(CASE WHEN a.ikn = 'TRUE' THEN 'Belanja IKN' WHEN a.ikn <> 'TRUE' THEN 'Bukan Belanja IKN' END) AS ur_belanja_ikn"
      );
      result.groupBy.push("a.ikn");
    }

    if (iknradio === "3" && Ikn !== "XX") {
      result.columns.push(
        "(CASE WHEN a.ikn = 'TRUE' THEN 'Belanja IKN' WHEN a.ikn <> 'TRUE' THEN 'Bukan Belanja IKN' END) AS ur_belanja_ikn"
      );
      result.groupBy.push("a.ikn");
    }

    if (iknradio === "4") {
      result.columns = [];
    }

    // Filter condition when opsiIkn is set
    if (opsiIkn === "pilihikn" && Ikn !== "XX") {
      if (Ikn && Ikn !== "00") {
        result.whereConditions.push(`a.ikn = '${Ikn}'`);
      }
    }

    return result;
  }
}

/**
 * Pangan Filter - Handles food security budget filters
 */
export class PanganFilter extends BaseFilter {
  constructor() {
    super("pangan");
  }

  buildFromState(inquiryState) {
    const { jenlap, Pangan, panganradio } = inquiryState;

    // Only activate this filter for jenlap 6, never for jenlap 7
    if (jenlap !== "6") {
      return this.getEmptyResult();
    }

    const result = this.getEmptyResult();

    // FUNGSI BELANJA KETAHANAN PANGAN - Based on original jenlap = 6 logic
    if (panganradio === "1" && Pangan !== "XX") {
      result.columns.push("a.pangan");
      result.groupBy.push("a.pangan");
    }

    if (panganradio === "2" && Pangan !== "XX") {
      result.columns.push(
        "a.pangan",
        "(CASE WHEN a.pangan = 'TRUE' THEN 'Ketahanan Pangan' WHEN a.pangan <> 'TRUE' THEN 'Bukan Ketahanan Pangan' END) AS ur_belanja_pangan"
      );
      result.groupBy.push("a.pangan");
    }

    if (panganradio === "3" && Pangan !== "XX") {
      result.columns.push(
        "(CASE WHEN a.pangan = 'TRUE' THEN 'Ketahanan Pangan' WHEN a.pangan <> 'TRUE' THEN 'Bukan Ketahanan Pangan' END) AS ur_belanja_pangan"
      );
      result.groupBy.push("a.pangan");
    }

    if (panganradio === "4") {
      result.columns = [];
    }

    // Note: opsiPangan field doesn't exist in state, removing filter condition
    // TODO: Add opsiPangan to state if needed for filtering by specific food security type

    return result;
  }
}

/**
 * Blokir Filter - Handles block type filters for jenlap = 6
 */
export class BlokirFilter extends BaseFilter {
  constructor() {
    super("blokir");
  }

  buildFromState(inquiryState) {
    const { jenlap, thang } = inquiryState;

    if (jenlap !== "6") {
      return this.getEmptyResult();
    }

    const result = this.getEmptyResult();

    // KODE JENIS BLOKIR - Based on original jenlap = 7 logic
    result.columns.push("a.kdblokir", "a.nmblokir");
    result.groupBy.push("a.kdblokir");

    return result;
  }
}

/**
 * Special grouping logic for jenlap = 7 (original jenlap = 6)
 */
export class SpecialGroupingFilter extends BaseFilter {
  constructor() {
    super("specialgrouping");
  }

  buildFromState(inquiryState) {
    const { jenlap, thang } = inquiryState;

    if (jenlap !== "7") {
      return this.getEmptyResult();
    }

    const result = this.getEmptyResult();

    // PENAMBAHAN GROUPING DATA CAPAIAN OUTPUT
    if (thang >= "2021") {
      result.groupBy.push("a.sat", "a.os", "a.ket");
    } else {
      result.groupBy.push("a.sat");
    }

    return result;
  }
}

/**
 * MBG Filter - Handles MBG (Makan Bergizi Gratis) budget filters for jenlap = 11
 */
export class MBGFilter extends BaseFilter {
  constructor() {
    super("mbg");
  }

  buildFromState(inquiryState) {
    const { jenlap, mbg, mbgradio } = inquiryState;

    // Only activate this filter for jenlap 11
    if (jenlap !== "11") {
      return this.getEmptyResult();
    }

    const result = this.getEmptyResult();

    // MBG columns based on mbgradio
    if (mbgradio === "1" && mbg !== "XX") {
      // Kode only
      result.columns.push("A.MBG");
      result.groupBy.push("A.MBG");
    } else if (mbgradio === "2" && mbg !== "XX") {
      // Kode + Uraian
      result.columns.push("A.MBG", "mbg.nmmbg");
      result.joinClause = ` LEFT JOIN DBREF.T_MBG mbg ON A.MBG=mbg.kdmbg`;
      result.groupBy.push("A.MBG");
    } else if (mbgradio === "3" && mbg !== "XX") {
      // Uraian only
      result.columns.push("mbg.nmmbg");
      result.joinClause = ` LEFT JOIN DBREF.T_MBG mbg ON A.MBG=mbg.kdmbg`;
      result.groupBy.push("A.MBG");
    } else if (mbgradio === "4") {
      // Jangan Tampilkan - don't add any columns but still group by MBG for proper aggregation
      result.groupBy.push("A.MBG");
    } else {
      // Default: group by MBG
      result.columns.push("A.MBG");
      result.groupBy.push("A.MBG");
    }

    // Add WHERE condition when specific MBG is selected
    if (mbg && mbg !== "XX" && mbg !== "00") {
      result.whereConditions.push(`A.MBG = '${mbg}'`);
    }

    return result;
  }
}
