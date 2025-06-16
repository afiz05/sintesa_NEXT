export const formatRibuanFromString = (value: string): string => {
  if (!value || isNaN(Number(value))) return "-";
  const num = Number(value);
  return `${num.toLocaleString("id-ID")} `;
};

export const formatTriliunFromString = (value: string): string => {
  if (!value || isNaN(Number(value))) return "-";
  const num = Number(value) / 1_000_000_000_000;
  const rounded = Math.round(num * 10) / 10; // Bulatkan ke 1 angka di belakang koma
  return `${rounded.toLocaleString("id-ID", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })} T`;
};
