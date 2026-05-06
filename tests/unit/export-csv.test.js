import { todayMinus } from '../../src/seed.js';
import { transactionsToCsvHeader, transactionsToCsvRows } from '../../src/export-csv.js';

describe('given transaction data, when exporting CSV, then the file follows the expected rules', () => {
  it('given transactions exist, when building the CSV header, then it returns the expected header line', () => {
    //Given
    const data = [
      {
        id: 1,
        date: todayMinus(28),
        label: 'Salaire',
        amount: 2400,
        type: 'credit',
        currency: 'EUR',
        category: 'revenu',
      },
      {
        id: 2,
        date: todayMinus(27),
        label: 'Loyer',
        amount: 850,
        type: 'debit',
        currency: 'EUR',
        category: 'logement',
      },
    ];
    //When
    const result = transactionsToCsvHeader(data);
    //Then
    expect(result).toEqual('id,date,label,amount,type,currency,category');
  });
  it('given current-month transactions, when building CSV rows, then each transaction becomes one CSV line', () => {
    //Given
    const date = new Date().toISOString();
    const data = [
      {
        id: 1,
        date: date,
        label: 'Salaire',
        amount: 2400,
        type: 'credit',
        currency: 'EUR',
        category: 'revenu',
      },
      {
        id: 2,
        date: date,
        label: 'Loyer',
        amount: 850,
        type: 'debit',
        currency: 'EUR',
        category: 'logement',
      },
    ];
    //When
    const result = transactionsToCsvRows(data);
    //Then
    expect(result).toEqual(
      `1,${date},Salaire,2400,credit,EUR,revenu\n2,${date},Loyer,850,debit,EUR,logement`,
    );
  });
  it('given an old transaction and a recent one, when building CSV rows, then it excludes the old transaction', () => {
    //Given
    const date = new Date().toISOString();
    const data = [
      {
        id: 1,
        date: date,
        label: 'Salaire',
        amount: 2400,
        type: 'credit',
        currency: 'EUR',
        category: 'revenu',
      },
      {
        id: 2,
        date: new Date('01/01/2026').toISOString(),
        label: 'Loyer',
        amount: 850,
        type: 'debit',
        currency: 'EUR',
        category: 'logement',
      },
    ];
    //When
    const result = transactionsToCsvRows(data);
    //Then
    expect(result).toEqual(`1,${date},Salaire,2400,credit,EUR,revenu`);
  });
  it('given a label with commas and quotes, when building CSV rows, then it escapes values according to RFC 4180', () => {
    //Given
    const date = new Date().toISOString();
    const data = [
      {
        id: 1,
        date: date,
        label: 'Courses, "bio"',
        amount: 42,
        type: 'debit',
        currency: 'EUR',
        category: 'alimentation',
      },
    ];
    //When
    const result = transactionsToCsvRows(data);
    //Then
    expect(result).toEqual(`1,${date},"Courses, ""bio""",42,debit,EUR,alimentation`);
  });
});
