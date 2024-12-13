import { Component, Input } from '@angular/core';
import { PieChartModule } from '@swimlane/ngx-charts';
import { DataFromJson, SingleData } from '../../../types';
import { GraphService } from '../../../graph.service';

/**
7. Proportion de satisfaction (et vous noterez au passage que je ne sais pas compter)

Affichez la proportion de voyageurs satisfaits en fonction de différents critères :

- Par compagnie
- Par genre
- Par destination

Rien qu'on n'ait déjà vu dans les questions précédentes, c'était juste pour pratiquer.
Profitons en pour essayer quelques composants comme le pie-grid ou le advanced pie chart
*/
@Component({
  selector: 'app-q6',
  standalone: true,
  templateUrl: './q6.component.html',
  imports: [PieChartModule],
})
export class Q6Component {
  @Input({ required: true }) data: DataFromJson = [];

  resultByCompany: SingleData = [];
  resultByGender: SingleData = [];
  resultByDestination: SingleData = [];

  view: [number, number] = [1200, 300];

  constructor(private readonly graphService: GraphService) {}

  ngOnInit() {
    this.resultByCompany = this.formatCompany();
    this.resultByGender = this.formatGender();
    this.resultByDestination = this.formatDestination();
  }

  private formatCompany() {
    const satisfied = this.data.filter(({ satisfied }) => satisfied);
    const companies = satisfied.map(({ company }) => company);
    const groupedByCompany = this.graphService.groupByUniqueValue(companies);
    return this.graphService.toSingleData(groupedByCompany);
  }

  private formatGender() {
    const satisfied = this.data.filter(({ satisfied }) => satisfied);
    const genderOnly = satisfied.map(({ gender }) => gender);
    const groupedByGender = this.graphService.groupByUniqueValue(genderOnly);
    return this.graphService.toSingleData(groupedByGender);
  }

  private formatDestination() {
    const satisfied = this.data.filter(({ satisfied }) => satisfied);
    const destinations = satisfied.map(({ destination }) => destination);
    const groupedByDestination =
      this.graphService.groupByUniqueValue(destinations);
    return this.graphService.toSingleData(groupedByDestination);
  }
}
