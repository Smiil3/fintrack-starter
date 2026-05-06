export function transactionsToCsvHeader(rows) {
  if (!rows.length) return '';
  const headers = Object.keys(rows[0]);
  return headers.join(',');
}
