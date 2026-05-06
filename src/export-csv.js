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

export function buildTransactionsCsv(rows) {
  const header = transactionsToCsvHeader(rows);
  const body = transactionsToCsvRows(rows);
  return [header, body].filter(Boolean).join('\n');
}

export function downloadCsv(csvContent, filename = 'fintrack-transactions.csv') {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = filename;
  link.style.display = 'none';

  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function downloadTransactionsCsv(rows, filename) {
  const csvContent = buildTransactionsCsv(rows);
  downloadCsv(csvContent, filename);
}
