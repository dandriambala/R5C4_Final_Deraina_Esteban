import { Component, Input } from '@angular/core';
import { DataFromJson, SingleData } from '../../../types';
import { NumberCardModule } from '@swimlane/ngx-charts';
import { GraphService } from '../../../graph.service';

/**
 * 2. Analyse par classe de voyage (cartes conseillées)
    
    Comparez les performances et les volumes pour chaque classe de voyage :

  - Nombre de voyages : Répartition entre les classes "eco", "premios", et "business".
  - Prix moyen par classe : Quel est le coût moyen pour chaque classe ?
  - Satisfaction par classe : Les passagers de quelle classe sont les plus satisfaits ?
 */
@Component({
  selector: 'app-q2',
  standalone: true,
  imports: [NumberCardModule],
  templateUrl: './q2.component.html',
})
export class Q2Component {
  @Input({ required: true }) data: DataFromJson = [];

  result: SingleData = [];
  view: [number, number] = [1200, 400];

  constructor(private readonly graphService: GraphService) {}

  ngOnInit() {
    this.result = this.format();
  }

  // On met format en privé, pour indiquer clairement que cette méthode ne doit pas être utilisée dans le template
  private format() {
    const eco = this.data.filter(({ travelClass }) => travelClass === 'eco');
    const premios = this.data.filter(
      ({ travelClass }) => travelClass === 'premios'
    );
    const business = this.data.filter(
      ({ travelClass }) => travelClass === 'business'
    );

    return this.graphService.toSingleData({
      'Nombre Voyages Eco': eco.length,
      'Nombre Voyages Premios': premios.length,
      'Nombre Voyages Business': business.length,
      'Prix Moyen Eco': this.graphService.avg(eco.map(({ price }) => price)), // { price } est un destructuring de l'objet passé en paramètre
      'Prix Moyen Premios': this.graphService.avg(
        premios.map(({ price }) => price) // Ca revient à faire premios.map((voyage) => voyage.price)
      ),
      'Prix Moyen Business': this.graphService.avg(
        business.map(({ price }) => price) // On récupère directement la proriété qui nous intéresse
      ),
      'Note Moyenne Eco': this.graphService.avg(eco.map(({ rate }) => rate)),
      'Note Moyenne Premios': this.graphService.avg(
        premios.map(({ rate }) => rate)
      ),
      'Note Moyenne Business': this.graphService.avg(
        business.map(({ rate }) => rate)
      ),
    });
  }
}
