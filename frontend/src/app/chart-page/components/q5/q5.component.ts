import { Component, Input } from '@angular/core';
import { BarChartModule } from '@swimlane/ngx-charts';
import { DataFromJson, SingleData } from '../../../types';
import { GraphService } from '../../../graph.service';

/**
5. Analyse par destination

Montrez les destinations les plus populaires en termes de volume de voyages.
 */

@Component({
  selector: 'app-q5',
  standalone: true,
  templateUrl: './q5.component.html',
  imports: [BarChartModule],
})
export class Q5Component {
  @Input({ required: true }) data: DataFromJson = [];

  result: SingleData = [];
  view: [number, number] = [1200, 500];
  xAxisLabel = 'Nombre de passagers';
  yAxisLabel = 'Destination';

  constructor(private readonly graphService: GraphService) {}

  ngOnInit() {
    this.result = this.format();
  }

  // On met format en privé, pour indiquer clairement que cette méthode ne doit pas être utilisée dans le template
  private format() {
    // 1. Mapper uniqueemnt les destinations
    const destinations = this.data.map(({ destination }) => destination);
    // 2. Regrouper les destinations par unique valeur -- puisque chaque entrée de data représente un voyage
    const groupedByDestination =
      this.graphService.groupByUniqueValue(destinations);

    // On obtiendra donc en sortie le nombre de voyages par destination
    return this.graphService.toSingleData(groupedByDestination);
  }
}
