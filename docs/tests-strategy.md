1. Qu’est-ce qu’un test unitaire ? Donne un exemple tiré de FinTrack.

Un test unitaire vérifie une toute petite unité de code (souvent une fonction), isolée du reste de l’application.
Dans FinTrack, un bon exemple serait de tester une fonction de src/calculator.js qui calcule un total :
entrée : une liste de transactions
sortie attendue : la somme correcte
Sans UI, sans base de données, sans navigation, juste la logique pure.

2. Qu’est-ce qu’un test d’intégration ? Quand préférer un test d’intégration à plusieurs tests
   unitaires ?

Un test d’intégration vérifie que plusieurs unités fonctionnent correctement ensemble.
On préfère un test d’intégration quand le risque vient surtout des interactions :
- format de données qui circule entre modules
- enchaînement d’actions utilisateur + mise à jour d’interface
- régressions qui n’apparaissent pas dans des fonctions testées isolément
Exemple FinTrack : tester que l’ajout d’une transaction dans src/App.jsx met bien à jour l’affichage du solde via la logique de src/calculator.js.

3. Qu’est-ce qu’un test E2E ? Quel est son principal défaut ?

Un test E2E simule un vrai parcours utilisateur dans l’application complète.
Exemple : “ouvrir l’app, ajouter une dépense, vérifier que le solde et la liste affichent la bonne valeur”.
Son principal défaut : il est lent et complexe par rapport aux autres types de tests, donc plus coûteux à maintenir.

4. Si tu devais répartir 100 tests sur FinTrack, combien d’unitaires, combien d’intégrations,
   combien de E2E ? Justifie

Si on suit la pyramide :

70 tests unitaires
25 tests d’intégration
5 tests E2E

Justification :
- beaucoup d’unitaires pour sécuriser rapidement la logique métier
- un bon bloc d’intégration pour couvrir les flux entre composants
- peu de E2E, réservés aux parcours critiques
