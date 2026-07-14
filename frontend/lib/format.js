/**
 * Format a value in PKR. Backend stores money as integer rupees,
 * so we don't divide by 100 here.
 */
const pkr = new Intl.NumberFormat("en-PK", {
  style: "currency",
  currency: "PKR",
  maximumFractionDigits: 0,
});

export function formatPKR(value) {
  if (value == null || Number.isNaN(value)) return "";
  return pkr.format(value);
}
