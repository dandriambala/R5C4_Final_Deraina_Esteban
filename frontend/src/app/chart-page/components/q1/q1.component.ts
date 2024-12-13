import { Component, Input } from '@angular/core';
import { NumberCardModule } from '@swimlane/ngx-charts';
import { DataFromJson, SingleData } from '../../../types';
import { GraphService } from '../../../graph.service';

/**
 * 1. Indicateurs clés (cartes)
 * Commencez par afficher des indicateurs clés pour avoir une vue d’ensemble des données :
 * - Nombre total de voyages : Combien de voyages ont été effectués ?
 * - Prix moyen : Quel est le prix moyen d’un voyage ?
 * - Note moyenne : Quelle est la satisfaction globale des passagers ?
 */

@Component({
  selector: 'app-q1',
  standalone: true,
  imports: [NumberCardModule], // N'oubliez pas d'importer le module correspondant pour afficher votre graphique
  templateUrl: './q1.component.html',
})
export class Q1Component {
  @Input({ required: true }) data: DataFromJson = [];

  /**
   * Pour injecter un service, vous l'appelez simplement dans le constructor
   *
   * Il n'est pas nécessaire de le mettre dans la liste d'imports du composant Angular
   * car le service est connu de l'application entière
   */
  constructor(private readonly graphService: GraphService) {}

  result: SingleData = []; // C'est là que vous mettez votre résultat formaté
  view: [number, number] = [1200, 300]; // Taille du graphique, respectez bien le format [largeur, hauteur]
  cardBG = 'black';

  // Notez que contrairement à la correction du TP Angular 1, on utilise ici ngOnInit car la donnée est directement disponible
  // dans Angular puisque provenant d'un fichier JSON interne et non d'une API externe
  ngOnInit() {
    this.result = this.format();
  }

  // On met format en privé, pour indiquer clairement que cette méthode ne doit pas être utilisée dans le template
  private format() {
    return this.graphService.toSingleData({
      'Nombre total de voyages': this.data.length,
      'Prix moyen': this.graphService.avg(this.data.map(({ price }) => price)),
      'Note moyenne': this.graphService.avg(this.data.map(({ rate }) => rate)),
    });
  }
}
