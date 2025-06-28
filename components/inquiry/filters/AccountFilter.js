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
      opsikataakun: kataValue,
      akunradio: radio,
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
