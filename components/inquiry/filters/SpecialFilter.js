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

    if (jenlap !== "7") {
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
    const { jenlap, Stunting, stuntingradio, opsiStunting } = inquiryState;

    if (jenlap !== "7") {
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

    // Filter condition when opsiStunting is set
    if (opsiStunting === "pilihStunting" && Stunting !== "XX") {
      if (Stunting && Stunting !== "00") {
        result.whereConditions.push(`a.stun_intervensi = '${Stunting}'`);
      }
    }

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
    const { jenlap, Miskin, miskinradio, opsiMiskin } = inquiryState;

    if (jenlap !== "7") {
      return this.getEmptyResult();
    }

    const result = this.getEmptyResult();

    // FUNGSI KEMISKINAN EKSTRIM - Based on original jenlap = 6 logic
    if (miskinradio === "1" && Miskin !== "XX") {
      result.columns.push("a.kemiskinan_ekstrim");
      result.groupBy.push("a.kemiskinan_ekstrim");
    }

    if (miskinradio === "2" && Miskin !== "XX") {
      result.columns.push(
        "a.kemiskinan_ekstrim",
        "(CASE WHEN a.kemiskinan_ekstrim = 'TRUE' THEN 'Belanja Kemiskinan Esktrim' WHEN a.kemiskinan_ekstrim <> 'TRUE' THEN 'Bukan Kemiskinan Ekstrim' END) AS ur_kemiskinan_ekstrim"
      );
      result.groupBy.push("a.kemiskinan_ekstrim");
    }

    if (miskinradio === "3" && Miskin !== "XX") {
      result.columns.push(
        "(CASE WHEN a.kemiskinan_ekstrim = 'TRUE' THEN 'Belanja Kemiskinan Esktrim' WHEN a.kemiskinan_ekstrim <> 'TRUE' THEN 'Bukan Kemiskinan Ekstrim' END) AS ur_kemiskinan_ekstrim"
      );
      result.groupBy.push("a.kemiskinan_ekstrim");
    }

    if (miskinradio === "4") {
      result.columns = [];
    }

    // Filter condition when opsiMiskin is set
    if (opsiMiskin === "pilihMiskin" && Miskin !== "XX") {
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
    const { jenlap, Pemilu, pemiluradio, opsiPemilu } = inquiryState;

    if (jenlap !== "7") {
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

    // Filter condition when opsiPemilu is set
    if (opsiPemilu === "pilihPemilu" && Pemilu !== "XX") {
      if (Pemilu && Pemilu !== "00") {
        result.whereConditions.push(`a.pemilu = '${Pemilu}'`);
      }
    }

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

    if (jenlap !== "7") {
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
    if (opsiIkn === "pilihIkn" && Ikn !== "XX") {
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
    const { jenlap, Pangan, panganradio, opsiPangan } = inquiryState;

    if (jenlap !== "7") {
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

    // Filter condition when opsiPangan is set
    if (opsiPangan === "pilihPangan" && Pangan !== "XX") {
      if (Pangan && Pangan !== "00") {
        result.whereConditions.push(`a.pangan = '${Pangan}'`);
      }
    }

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
