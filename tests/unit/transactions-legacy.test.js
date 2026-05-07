import { processTransactions } from '../../src/transactions-legacy.js';

describe('transactions-legacy characterization tests', () => {
  it('applies default options when opts is empty and flags large debit after conversion', () => {
    const txs = [
      {
        id: 1,
        date: new Date().toISOString(),
        label: 'Test USD large debit',
        amount: 2000,
        type: 'debit',
        currency: 'USD',
      },
    ];

    const res = processTransactions(txs, {});
    // default threshold is 1000, USD->EUR rate is 0.92 -> 2000*0.92 = 1840 > 1000
    expect(res.transactions.length).toBe(1);
    expect(res.transactions[0].flagged).toBe(true);
    expect(res.warnings.length).toBeGreaterThan(0);
  });

  it('converts USD to EUR using hardcoded rate 0.92', () => {
    const txs = [
      {
        id: 2,
        date: new Date().toISOString(),
        label: 'Small USD debit',
        amount: 100,
        type: 'debit',
        currency: 'USD',
      },
    ];
    const res = processTransactions(txs, {
      currency: 'EUR',
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
    });
    expect(res.transactions[0].amount).toBeCloseTo(92); // 100 * 0.92
  });

  it('converts EUR to USD using hardcoded rate 1.08 when opts.currency is USD', () => {
    const txs = [
      {
        id: 3,
        date: new Date().toISOString(),
        label: 'EUR credit',
        amount: 100,
        type: 'credit',
        currency: 'EUR',
      },
    ];
    const res = processTransactions(txs, {
      currency: 'USD',
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
    });
    expect(res.transactions[0].amount).toBeCloseTo(108); // 100 * 1.08
  });

  it('converts GBP to EUR using hardcoded rate 1.17', () => {
    const txs = [
      {
        id: 4,
        date: new Date().toISOString(),
        label: 'GBP debit',
        amount: 100,
        type: 'debit',
        currency: 'GBP',
      },
    ];
    const res = processTransactions(txs, {
      currency: 'EUR',
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
    });
    expect(res.transactions[0].amount).toBeCloseTo(117); // 100 * 1.17
  });

  it('falls back to rate 1 for unknown currencies', () => {
    const txs = [
      {
        id: 5,
        date: new Date().toISOString(),
        label: 'XYZ debit',
        amount: 50,
        type: 'debit',
        currency: 'XYZ',
      },
    ];
    const res = processTransactions(txs, {
      currency: 'EUR',
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
    });
    expect(res.transactions[0].amount).toBe(50);
  });

  it('filters transactions by provided month and year', () => {
    const jan = new Date('2026-01-15').toISOString();
    const feb = new Date('2026-02-10').toISOString();
    const txs = [
      { id: 6, date: jan, label: 'Jan tx', amount: 10, type: 'debit', currency: 'EUR' },
      { id: 7, date: feb, label: 'Feb tx', amount: 20, type: 'debit', currency: 'EUR' },
    ];
    const res = processTransactions(txs, { currency: 'EUR', month: 1, year: 2026 }); // February (0-based?) the legacy expects 1 for Feb? keep as-is to reflect current behavior
    // current implementation uses Date#getMonth() which is 0-based; using month:1 should match Feb
    expect(res.transactions.length).toBe(1);
    expect(res.transactions[0].label.toLowerCase()).toContain('feb');
  });
});
