import { Component, Input } from '@angular/core';
import { BarChartModule } from '@swimlane/ngx-charts';
import { DataFromJson, SingleData } from '../../../types';
import { GraphService } from '../../../graph.service';

/**
 * 3. Analyse des motifs d’insatisfaction
 *  
    Identifiez les motifs d’insatisfaction les plus fréquents parmi les passagers ayant donné une note négative.
    (là où satisfied est false)
 */

@Component({
  selector: 'app-q3',
  standalone: true,
  templateUrl: './q3.component.html',
  imports: [BarChartModule],
})
export class Q3Component {
  @Input({ required: true }) data: DataFromJson = [];

  result: SingleData = [];
  view: [number, number] = [1200, 500];
  xAxisLabel = "Motifs d'insatisfaction";
  yAxisLabel = 'Nombre de passagers';

  constructor(private readonly graphService: GraphService) {}

  ngOnInit() {
    this.result = this.format();
  }

  // On met format en privé, pour indiquer clairement que cette méthode ne doit pas être utilisée dans le template
  private format() {
    // 1. Récupérer les passagers insatisfaits
    const unsatisfied = this.data.filter(({ satisfied }) => !satisfied);
    // 2. Mapper uniquement les motifs d'insatisfaction
    const motives = unsatisfied.map(({ motive }) => motive);
    // 3. Regrouper les motifs d'insatisfaction par unique valeur
    const groupedByMotive = this.graphService.groupByUniqueValue(motives);

    return this.graphService.toSingleData(groupedByMotive);
  }
}
