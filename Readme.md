# R5C4 - Examen final

Votre professeur tyrannique (et légèrement frauduleux) a décidé d'utiliser vos talents de spécialistes en données (et en développement web)
pour vous faire réaliser du travail d'analyse et d'affichage d'un vieux projet inutilisé.

Le site https://tlouvet.github.io/PathVisualizer/ permet d'explorer différents algorithmes de recherche de chemin dans une grille.
La grille peut être considérée comme une simple matrice de taille m\*n, c'est à dire contenant m lignes composées de n colonnes.
Par exemple une grille de 4 lignes par 3 colonnes contient toujours 12 cases.

A chaque fois qu'une recherche est effectuée, des informations sont collectées, sur l'algorithme utilisé, le type de déplacement, etc.
Le but est simple, vérifier que les différents algorithmes sont bien implémentés et comparer leur temps d'exécution.

Voici un exemple de représentation des données provenant du fichier `searches.json`

```json
[
  {
    "id": 1,
    "algorithm": "Djikstra",
    "grid_width": 10,
    "grid_height": 10,
    "move_type": "orthogonal",
    "start": [0, 0],
    "end": [9, 9],
    "path_length": 18,
    "visited_nodes": 100,
    "time_ns": 1500
  }
]
```

Les propriétés ont la signification suivante:

- id: numéro de l'enregistrement
- algorithm: l'algorithme utilisé pour la résolution de la recherche
- grid_width: le nombre de cases en largeur
- grid_height: le nombre de cases en hauteur
- move_type: le type de déplacement sur la grille, 4 ou 8 directions
- start: les coordonnées x,y du point de départ
- end: les coordonnées x,y du point d'arrivée
- path_length: la longueur du chemin trouvé par l'algorithme
- visited_nodes: le nombre de cases que l'algorithme à vérifié avant de livrer son résultat
- time_ns: le temps mesuré en nanosecondes d'exécution de l'algorithme

Il existe pour l'algorithme 4 valeurs possibles:

- DFS
- BFS
- Djikstra
- A\*

Pour le type de déplacement, il existe deux valeurs, représentant respectivement 4 et 8 directions:

- orthogonal
- diagonal

## Objectifs

### Backend

- Créer l'application avec Flask
- Faire en sorte qu'elle puisse se connecter avec un front Angular en local, positionné sur le port 4200

- Une route permettant de récupérer de manière paginée les données du fichier `searches.json`.
  - Je vous autorise à faire la pagination en frontend et à tout renvoyer car nous n'avons pas eu le temps de voir le fonctionnement des observables et que vous risquez d'avoir du mal à les implémenter. Toutefois, il faudra quand même envoyer dans la requête les éléments de query permettant un traitement ultérieur (c'est à dire que vous devez quand même parser la query en back, même si vous vous ne vous en servez pas)
- Une route permettant de récupérer toutes les données du fichier `searches.json`, qui sera utilisée pour la visualisation

- 3 routes supplémentaires (une pour la création d'une donnée, une pour la modification et une pour la suppression ) qui se contenteront de renvoyer un dictionnaire ayant une seule propriété `error` avec pour valeur `Method not implrmented`, ainsi que le code de retour adéquat -- N'implémentez pas la logique pour ces routes (sauf si l'examen est trop facile bien sûr)

### Frontend

- Créer une application Angular v17
- Créer un type représentant une recherche
- Il y a 3 pages disponibles, reliées par une navigation commune:

  1. Page d'accueil

  - Mettez un titre et un paragraphe de lorem ipsum sur la page

  1. Page visualisation "liste paginée"

  - La page affiche les données sous forme de liste, a raison de 30 entrées par page
  - Deux boutons permettent d'aller à la page suivante ou de revenir à la précédente
  - En cours on n'a pas vu le fonctionnement des observables en détail, donc il certainement préférable que vous fassiez la gestion de la pagination en front en appelant une seule fois l'API (mais vous pouvez tenter de gérer ça en back si vous finissez vite et qu'il reste du temps)
  - Même si vous ne l'utilisez pas, envoyez dans la query de la requête les éléments normalement utiles à la pagination

  1. Page visualisation "graphiques"

  - Cette page affiche des éléments graphiques venant de ngx charts :
    1. Cartes chiffres clés . Il faut afficher dans ces cartes le nombre d'entrées pour chaque algorithme
    - ex: BFS - 15 / DFS - 30 / etc.
    1. Un graphique qui compare les temps moyen de résolution par catégorie d'algorithme. **Attention, on ne gardera que les données où la grille comportait strictement plus que 200 cases**
    1. Un graphique qui compare le nombre moyen de noeuds visités par algorithme. **Ici on ne gardera que les données où la distance euclidienne entre le start et le end est supérieure à 10** (Distance Euclidienne = sqrt((x2 - x1)^2 + (y2 - y1)^2))

- N'oubliez pas de faire des composants

### Extras

Seront également pris en compte les points suivants:

- Documentation pour chaque application (installation, lancement, versions...) et facilité de lancement
- Lisibilité du code (respect des normes, langue uniforme, nommage de fonctions et variables)
- Eléments d'architecture (séparation des fichiers, utilisation des outils fournis par les frameworks, respect de REST)
- Style de l'application front

### Conseils pour la réalisation

- Le back est la partie la plus simple à mettre en place, commencez par définir vos routes (attention au respect de REST) et faites les implémentations
- Assurez vous que vous arrivez à connecter les applis

- Vous maîtrisez normalement la navigation, mettez en place vos pages rapidement
- Les deux dernières pages sont un mix entre les deux derniers TP pour la gestion des données et l'affichage. Prenez-en une chacun et faites votre impl

- Une doc simple = 10 minutes de travail et 1 point gagné facilement
