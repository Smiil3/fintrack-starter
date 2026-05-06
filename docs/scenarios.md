# Scénarios BDD — Export CSV

Le BDD permet d’écrire des scénarios lisibles par un non-développeur, tout en gardant la philosophie du TDD.
On peut le faire sans installer Cucumber : il suffit d’adapter les titres de `describe` et `it` pour qu’ils ressemblent à des phrases Given / When / Then.

## Scénario : Générer l’en-tête du CSV
Étant donné une liste de transactions contenant les champs `id`, `date`, `label`, `amount`, `type`, `currency` et `category`
Quand l’application prépare l’export CSV
Alors la première ligne du fichier contient exactement `id,date,label,amount,type,currency,category`

## Scénario : Convertir chaque transaction en une ligne CSV
Étant donné deux transactions valides du mois en cours
Quand l’application prépare les lignes du CSV
Alors chaque transaction devient une ligne CSV avec les champs dans le bon ordre

## Scénario : Ignorer les transactions trop anciennes
Étant donné une transaction récente et une transaction datant de plus de 30 jours
Quand l’application prépare les lignes du CSV
Alors la transaction trop ancienne n’apparaît pas dans le fichier exporté

## Scénario : Échapper les virgules et les guillemets
Étant donné une transaction dont le libellé contient une virgule et des guillemets
Quand l’application prépare les lignes du CSV
Alors la valeur est échappée selon la norme RFC 4180

## Scénario : Télécharger le fichier CSV depuis l’interface
Étant donné un ensemble de transactions prêtes à être exportées
Quand l’utilisateur clique sur « Télécharger le CSV »
Alors le navigateur télécharge un fichier nommé `fintrack-transactions.csv`

