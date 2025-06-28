const fs = require("fs");
const path = require("path");

const filterDir =
  "D:\\sintesaNEXT\\components\\inquiry\\components\\FilterGroups";

// List of filter files to process (exclude already implemented ones)
const filterFiles = [
  "AkunFilter.jsx",
  "DekonFilter.jsx",
  "FungsiFilter.jsx",
  "KabkotaFilter.jsx",
  "KanwilFilter.jsx",
  "KegiatanFilter.jsx",
  "KppnFilter.jsx",
  "LokasiFilter.jsx",
  "OutputFilter.jsx",
  "ProgramFilter.jsx",
  "RegisterFilter.jsx",
  "SubfungsiFilter.jsx",
  "SuboutputFilter.jsx",
  "SumberDanaFilter.jsx",
];

// Function to add smart filtering logic to a filter component
function updateFilterComponent(filePath) {
  try {
    let content = fs.readFileSync(filePath, "utf8");

    // Skip if already has smart filtering logic
    if (
      content.includes("hasKataFilter") ||
      content.includes("hasKondisiFilter")
    ) {
      console.log(
        `⏭️  Skipping ${path.basename(filePath)} - already has smart filtering`
      );
      return;
    }

    // Extract the filter name from filename (e.g., UnitFilter -> unit)
    const fileName = path.basename(filePath, ".jsx");
    const filterName = fileName.replace("Filter", "").toLowerCase();

    // Determine the appropriate variable names based on common patterns
    let kondisiVar,
      kataVar,
      pilihVar,
      setKondisiVar,
      setKataVar,
      setPilihVar,
      clearValue;

    // Map filter names to their state variables
    const variableMap = {
      akun: {
        kondisi: "akunkondisi",
        kata: "opsikataakun",
        pilih: "akun",
        setKondisi: "setAkunkondisi",
        setKata: "setOpsikataakun",
        setPilih: "setAkun",
        clear: "XXX",
      },
      dekon: {
        kondisi: "dekonkondisi",
        kata: "katadekon",
        pilih: "dekon",
        setKondisi: "setDekonkondisi",
        setKata: "setKatadekon",
        setPilih: "setDekon",
        clear: "XXX",
      },
      fungsi: {
        kondisi: "fungsikondisi",
        kata: "katafungsi",
        pilih: "fungsi",
        setKondisi: "setFungsikondisi",
        setKata: "setKatafungsi",
        setPilih: "setFungsi",
        clear: "00",
      },
      lokasi: {
        kondisi: "lokasikondisi",
        kata: "katalokasi",
        pilih: "prov",
        setKondisi: "setLokasikondisi",
        setKata: "setKatalokasi",
        setPilih: "setProv",
        clear: "XX",
      },
      kabkota: {
        kondisi: "kabkotakondisi",
        kata: "katakabkota",
        pilih: "kabkota",
        setKondisi: "setKabkotakondisi",
        setKata: "setKatakabkota",
        setPilih: "setKabkota",
        clear: "XX",
      },
      kanwil: {
        kondisi: "kanwilkondisi",
        kata: "katakanwil",
        pilih: "kanwil",
        setKondisi: "setKanwilkondisi",
        setKata: "setKatakanwil",
        setPilih: "setKanwil",
        clear: "XX",
      },
      kppn: {
        kondisi: "kppnkondisi",
        kata: "katakppn",
        pilih: "kppn",
        setKondisi: "setKppnkondisi",
        setKata: "setKatakppn",
        setPilih: "setKppn",
        clear: "XX",
      },
      subfungsi: {
        kondisi: "subfungsikondisi",
        kata: "katasubfungsi",
        pilih: "sfungsi",
        setKondisi: "setSubfungsikondisi",
        setKata: "setKatasubfungsi",
        setPilih: "setSfungsi",
        clear: "00",
      },
      program: {
        kondisi: "programkondisi",
        kata: "kataprogram",
        pilih: "program",
        setKondisi: "setProgramkondisi",
        setKata: "setKataprogram",
        setPilih: "setProgram",
        clear: "XXX",
      },
      kegiatan: {
        kondisi: "giatkondisi",
        kata: "katagiat",
        pilih: "giat",
        setKondisi: "setGiatkondisi",
        setKata: "setKatagiat",
        setPilih: "setGiat",
        clear: "XXX",
      },
      output: {
        kondisi: "outputkondisi",
        kata: "kataoutput",
        pilih: "output",
        setKondisi: "setOutputkondisi",
        setKata: "setKataoutput",
        setPilih: "setOutput",
        clear: "XXX",
      },
      suboutput: {
        kondisi: "soutputkondisi",
        kata: "katasoutput",
        pilih: "soutput",
        setKondisi: "setSoutputkondisi",
        setKata: "setKatasoutput",
        setPilih: "setSoutput",
        clear: "XXX",
      },
      sumberdana: {
        kondisi: "sdanakondisi",
        kata: "katasdana",
        pilih: "sdana",
        setKondisi: "setSdanakondisi",
        setKata: "setKatasdana",
        setPilih: "setSdana",
        clear: "XXX",
      },
      register: {
        kondisi: "registerkondisi",
        kata: "kataregister",
        pilih: "register",
        setKondisi: "setRegisterkondisi",
        setKata: "setKataregister",
        setPilih: "setRegister",
        clear: "XXX",
      },
    };

    const vars = variableMap[filterName];
    if (!vars) {
      console.log(
        `⚠️  No variable mapping found for ${filterName}, skipping...`
      );
      return;
    }

    // Add Button import if not present
    if (!content.includes("Button,")) {
      content = content.replace(
        /import.*{([^}]+)}.*from "@heroui\/react";/,
        (match, imports) => {
          if (!imports.includes("Button")) {
            const cleanImports = imports
              .split(",")
              .map((i) => i.trim())
              .filter((i) => i);
            cleanImports.unshift("Button");
            return match.replace(imports, cleanImports.join(", "));
          }
          return match;
        }
      );
    }

    // Add smart filtering variables after the destructuring
    const destructuringRegex = /const\s*{[\s\S]*?}\s*=\s*inquiryState[^;]*;?/;
    if (destructuringRegex.test(content)) {
      content = content.replace(destructuringRegex, (match) => {
        // Ensure the destructuring ends with a semicolon
        const cleanMatch = match.endsWith(";") ? match : match + ";";
        return (
          cleanMatch +
          `\n\n  // Determine which filter type is currently active (priority order)
  const hasKataFilter = ${vars.kata} && ${vars.kata}.trim() !== "";
  const hasKondisiFilter = ${vars.kondisi} && ${vars.kondisi}.trim() !== "";
  const hasPilihFilter = ${vars.pilih} && ${vars.pilih} !== "XXX" && ${vars.pilih} !== "XX" && ${vars.pilih} !== "${vars.clear}";

  // Disable other inputs based on active filter
  const isPilihDisabled = hasKataFilter || hasKondisiFilter;
  const isKondisiDisabled = hasKataFilter || hasPilihFilter;
  const isKataDisabled = hasKondisiFilter || hasPilihFilter;`
        );
      });
    }

    console.log(`✅ Updated ${fileName} with smart filtering logic`);
    fs.writeFileSync(filePath, content);
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
  }
}

// Process all filter files
console.log("🚀 Starting batch filter update...\n");

filterFiles.forEach((file) => {
  const filePath = path.join(filterDir, file);
  if (fs.existsSync(filePath)) {
    updateFilterComponent(filePath);
  } else {
    console.log(`⚠️  File not found: ${file}`);
  }
});

console.log("\n✨ Batch filter update completed!");
