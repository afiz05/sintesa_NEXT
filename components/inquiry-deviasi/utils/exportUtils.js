// Utility for robust CSV export
export function exportToCSV(data, filename = "data.csv") {
  if (!data || !data.length) return;
  const replacer = (key, value) =>
    value === null || value === undefined ? "" : value;
  const header = Object.keys(data[0]);
  const csv = [
    header.join(","),
    ...data.map((row) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(",")
    ),
  ].join("\r\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Utility for robust Excel export using xlsx
export async function exportToExcel(data, filename = "data.xlsx") {
  if (!data || !data.length) return;
  const xlsx = await import("xlsx");
  const ws = xlsx.utils.json_to_sheet(data);
  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
  const wbout = xlsx.write(wb, { bookType: "xlsx", type: "array" });
  const blob = new Blob([wbout], { type: "application/octet-stream" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Utility for robust JSON export
export function exportToJSON(data, filename = "data.json") {
  if (!data || !data.length) return;
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Utility for robust Text export (pretty-printed JSON as .txt)
export function exportToText(data, filename = "data.txt") {
  if (!data || !data.length) return;
  const textContent = JSON.stringify(data, null, 2);
  const blob = new Blob([textContent], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Utility for robust PDF export using jsPDF and autoTable
export async function exportToPDF(data, filename = "data.pdf") {
  if (!data || !data.length) return;
  const jsPDF = (await import("jspdf")).default;
  const autoTable = (await import("jspdf-autotable")).default;
  const doc = new jsPDF();
  const header = Object.keys(data[0]);
  const rows = data.map((row) => header.map((field) => row[field]));
  autoTable(doc, {
    head: [header],
    body: rows,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [41, 128, 185] },
  });
  doc.save(filename);
}
