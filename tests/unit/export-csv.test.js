import { todayMinus } from '../../src/seed.js';
import { transactionsToCsvHeader, transactionsToCsvRows } from '../../src/export-csv.js';
describe('export csv', () => {
  it('given a list of transactions, when generating CSV header, then returns all column names separated by commas', () => {
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
  it('given valid transactions from current month, when exporting to CSV rows, then each transaction becomes a line with comma-separated values', () => {
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
  it('given transactions from current month and older months, when exporting to CSV rows, then only transactions from last 30 days are included', () => {
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
  it('given a transaction with special characters like commas and quotes, when exporting to CSV rows, then special characters are escaped according to RFC 4180', () => {
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
