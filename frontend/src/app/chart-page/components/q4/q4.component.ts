import { Component, Input } from '@angular/core';
import { PieChartModule } from '@swimlane/ngx-charts';
import { DataFromJson, SingleData } from '../../../types';
import { GraphService } from '../../../graph.service';

/**
4. Analyse par compagnie

Affichez le nombre total de voyages réalisés par chaque compagnie pour visualiser leur part de marché.
 */

@Component({
  selector: 'app-q4',
  standalone: true,
  templateUrl: './q4.component.html',
  imports: [PieChartModule],
})
export class Q4Component {
  @Input({ required: true }) data: DataFromJson = [];

  result: SingleData = [];
  view: [number, number] = [1200, 400];
  legendTitle = 'Compagnies';

  // Je mets un any ici pour éviter une erreur de compilation, la doc n'est pas à jour
  // Si vous voulez la version complète, référez vous aux slides du cours sur la préesntation de données
  // Mais vous n'avez besoin que de ça pour afficher sur le graphique
  schemes: any = {
    domain: ['#FCD0A1', '#B1B695', '#A690A4', '#5E4B56', '#AFD2E9'],
  };

  constructor(private readonly graphService: GraphService) {}

  ngOnInit() {
    this.result = this.format();
  }

  // On met format en privé, pour indiquer clairement que cette méthode ne doit pas être utilisée dans le template
  private format() {
    // 1. Mapper uniquement les compagnies
    const companies = this.data.map(({ company }) => company);
    // 2. Regrouper les compagnies par unique valeur -- puisque chaque entrée de data représente un voyage
    const groupedByCompany = this.graphService.groupByUniqueValue(companies);

    // On obtiendra donc en sortie le nombre de voyages par compagnie
    return this.graphService.toSingleData(groupedByCompany);
  }
}
