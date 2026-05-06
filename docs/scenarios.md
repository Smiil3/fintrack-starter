# Scénarios BDD - Exportation CSV

## Scénario 1 : Générer l'en-tête CSV

Étant donné une liste de transactions avec les champs id, date, label, amount, type, currency, category  
Quand l'utilisateur demande la génération de l'en-tête du CSV  
Alors le système retourne une ligne avec tous les noms de colonnes séparés par des virgules

## Scénario 2 : Convertir les transactions en lignes CSV

Étant donné une liste de transactions valides du mois en cours  
Quand l'utilisateur exporte les transactions en CSV  
Alors chaque transaction devient une ligne avec ses données séparées par des virgules  
Et chaque ligne est séparée par un retour à la ligne

## Scénario 3 : Filtrer les transactions hors du mois en cours

Étant donné une liste de transactions contenant des transactions du mois en cours et d'anciens mois  
Quand l'utilisateur exporte les transactions en CSV  
Alors seules les transactions des 30 derniers jours sont incluses  
Et les transactions plus anciennes que 30 jours sont exclues

## Scénario 4 : Échapper les caractères spéciaux (RFC 4180)

Étant donné une transaction contenant des caractères spéciaux (virgules, guillemets, retours à la ligne)  
Quand l'utilisateur exporte la transaction en CSV  
Alors le libellé est entouré de guillemets doubles  
Et les guillemets internes sont doublés selon la norme RFC 4180

## Scénario 5 : Retourner un CSV complet avec en-tête et données

Étant donné une liste de transactions valides  
Quand l'utilisateur exporte les transactions en CSV complet  
Alors la première ligne contient l'en-tête des colonnes  
Et les lignes suivantes contiennent les données des transactions  
Et l'ensemble est fusionné en un seul contenu CSV

