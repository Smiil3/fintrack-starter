import { todayMinus } from './seed.js';

function escapeCsvValue(value) {
  const stringValue = String(value);
  if (/[",\n\r]/.test(stringValue)) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
}

export function transactionsToCsvHeader(rows) {
  if (!rows.length) return '';
  const headers = Object.keys(rows[0]);
  return headers.join(',');
}

export function transactionsToCsvRows(rows) {
  if (!rows.length) return '';
  const rowsString = [];
  for (const row of rows) {
    if (new Date(row.date).getTime() > new Date(todayMinus(30)).getTime()) {
      const rowString = Object.values(row).map(escapeCsvValue);
      rowsString.push(rowString.join(','));
    }
  }
  return rowsString.join('\n');
}
