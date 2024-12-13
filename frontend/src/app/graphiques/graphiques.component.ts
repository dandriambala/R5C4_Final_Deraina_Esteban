import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NumberCardModule } from '@swimlane/ngx-charts';
type Search = {
  "id": number,
  "algorithm": "DFS" | "BFS" | "Djikstra" | "A\*",
  "grid_width": number,
 
 
  "grid_height": number,
  "start": [
    number,
    number
  ],
  "end": [
    number,
    number
  ],
  "move_type": "diagonal" | "orthogonal",
  "path_length": number,
  "visited_nodes": number,
  "time_ns": number
 }
 type SingleData = {
  value: number;
  name: string;
  }[];
  
  
   
  type MultipleData = {
  name: string;
  series: SingleData;
  }[];
 function toSingleData(data: Record<string, number>): SingleData {
  return Object.entries(data).map(([name, value]) => ({ name, value }));
  }

 function toMultipleData(serie: string, data: any): MultipleData {
  return [
  {
  name: serie,
  series: toSingleData(data),
  },
  ];
  }

@Component({
  selector: 'app-graphiques',
  standalone: true,
  imports: [NumberCardModule],
  templateUrl: './graphiques.component.html',
  styleUrl: './graphiques.component.css'
})

export class GraphiquesComponent {
  search: Search[] = []; 
  //Cartes chiffres clés . Il faut afficher dans ces cartes le nombre d'entrées pour chaque algorithme
  //ex: BFS - 15 / DFS - 30 / etc.

  constructor(private readonly http: HttpClient) {}

  ngOnInit() {
    this.http.get<Search[]>('http://localhost:5000/searches').subscribe((data) => (this.search = data));
    
  }
  private format(){
    return this.search
  }
}
