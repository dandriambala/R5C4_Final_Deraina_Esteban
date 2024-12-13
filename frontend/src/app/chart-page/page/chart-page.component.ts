import { Component } from '@angular/core';
import { Q1Component } from '../components/q1/q1.component';
import { DataFromJson } from '../../types';
import { Q2Component } from '../components/q2/q2.component';
import { Q3Component } from '../components/q3/q3.component';
import { Q4Component } from '../components/q4/q4.component';
import { Q5Component } from '../components/q5/q5.component';
import { Q7Component } from '../components/q7/q7.component';
import jsonData from '../../../assets/space_travel_data.json';
import { Q6Component } from '../components/q6/q6.component';

@Component({
  selector: 'app-chart-page',
  standalone: true,
  imports: [
    Q1Component,
    Q2Component,
    Q3Component,
    Q4Component,
    Q5Component,
    Q6Component,
    Q7Component,
  ], // La page servant juste à afficher les enfants, elle ne gère que leur import et chaque enfant importera le module de chart dont il a besoin
  templateUrl: './chart-page.component.html',
})
export class ChartPageComponent {
  data = jsonData as DataFromJson; // On cast le JSON en DataFromJson pour éviter les erreurs de type
}
