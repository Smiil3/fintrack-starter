import { seedTransactions } from '../../src/seed.js';
import { transactionsToCsvHeader } from '../../src/export-csv.js';

describe('export csv', () => {
  it('Une fonction qui prend un tableau de transactions et retourne une chaîne CSV avec une ligne d’en-tête', () => {
    //Given
    const data = [...seedTransactions];

    //When
    const result = transactionsToCsvHeader(data);

    //Then
    expect(result).toEqual('id,date,label,amount,type,currency,category');
  });

  it('Chaque transaction devient une ligne CSV (date, libellé, montant, catégorie)', () => {});

  it('Les transactions hors du mois en cours sont filtrées', () => {});

  it('Les caractères spéciaux (virgules, guillemets) sont échappés selon la norme RFC 4180', () => {});

  it('Un tableau vide retourne juste l’en-tête CSV.', () => {});
});
