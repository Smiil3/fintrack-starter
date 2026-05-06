import { todayMinus } from '../../src/seed.js';
import { transactionsToCsvHeader, transactionsToCsvRows } from '../../src/export-csv.js';
describe('export csv', () => {
  it('Une fonction qui prend un tableau de transactions et retourne une chaîne CSV avec une ligne d’en-tête', () => {
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
  it('Chaque transaction devient une ligne CSV (date, libellé, montant, catégorie)', () => {
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
  it('Les transactions hors du mois en cours sont filtrées', () => {
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
  it('Les caractères spéciaux (virgules, guillemets) sont échappés selon la norme RFC 4180', () => {
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
