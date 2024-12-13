import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NumberCardModule } from '@swimlane/ngx-charts';
import { BarChartModule } from '@swimlane/ngx-charts';

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
  

 function toSingleData(data: Record<string, number>): SingleData {
  return Object.entries(data).map(([name, value]) => ({ name, value }));
  }

@Component({
  selector: 'app-graphiques',
  standalone: true,
  imports: [NumberCardModule, BarChartModule],
  templateUrl: './graphiques.component.html',
  styleUrl: './graphiques.component.css'
})

export class GraphiquesComponent {
  //Cartes chiffres clés . Il faut afficher dans ces cartes le nombre d'entrées pour chaque algorithme
  //ex: BFS - 15 / DFS - 30 / etc.
  resultQ1 : SingleData = [];

  //Un graphique qui compare les temps moyen de résolution par catégorie d'algorithme. 
  //**Attention, on ne gardera que les données où la grille comportait strictement plus que 200 cases**
  resultQ2 : SingleData = [];

  //Un graphique qui compare le nombre moyen de noeuds visités par algorithme. 
  //**Ici on ne gardera que les données où la distance euclidienne entre le start et le end est supérieure à 10** 
  //(Distance Euclidienne = sqrt((x2 - x1)^2 + (y2 - y1)^2))
  
  resultQ3 : SingleData = [];

  view: [number, number] = [800, 400];
  xAxisLabel = "Algorithmes";
  yAxisLabel = "Temps d\'execution (ms)";
  xAxisLabel2 = "Algorithmes";
  yAxisLabel2 = "Nb noeuds visités";
  search: Search[] = []; 
  
  bfsNom: string='';
  dfsNom: string='';
  dijkstra: string='';
  aEtoile: string='';

  constructor(private readonly http: HttpClient) {}

  ngOnInit() {
    this.http.get<Search[]>('http://localhost:5000/searches')
      .subscribe((data) => {
        this.search = data;
        this.resultQ1 = this.format1()
        this.resultQ2 = this.format2()
        this.resultQ3 = this.format3()
      });

  }

  format1(){
    const bfsLength = this.search.filter(x => x.algorithm == 'BFS').length;
    const dfsLength = this.search.filter(x => x.algorithm == 'DFS').length;
    const dijkstraLength = this.search.filter(x => x.algorithm =='Djikstra').length;
    const aEtoileLength = this.search.filter(x => x.algorithm == 'A\*').length;
 
    return toSingleData({'Nombre de BFS': bfsLength,
      'Nombre de DFS': dfsLength,
      'Nombre de A*': aEtoileLength,
      'Nombre de Djisktra': dijkstraLength
    })
  }

  format2(){
    const searchAPlus200 = this.search.filter(x => x.grid_width * x.grid_height> 200);
    const bfs = searchAPlus200.filter(x => x.algorithm =='BFS')
    const bfsTime = bfs.reduce((accumulator, current) => accumulator + current.time_ns, 0) / bfs.length ;
    const dfs = searchAPlus200.filter(x => x.algorithm =='DFS')
    const dfsTime = dfs.reduce((accumulator, current) => accumulator + current.time_ns, 0) / dfs.length;
    const dijkstra = searchAPlus200.filter(x => x.algorithm =='Djikstra')
    const dijkstraTime = dijkstra.reduce((accumulator, current) => accumulator + current.time_ns, 0) / dijkstra.length;
    const aEtoile = searchAPlus200.filter(x => x.algorithm =='A\*')
    const aEtoileTime = aEtoile.reduce((accumulator, current) => accumulator + current.time_ns, 0) / aEtoile.length;

    return toSingleData({'Temps moyen BFS': bfsTime,
      'Temps moyen DFS': dfsTime,
      'Temps moyen A*': aEtoileTime,
      'Temps moyen Djisktra': dijkstraTime
    })
  }

  format3(){
    const searchAPlus10 = this.search.filter(x => Math.sqrt((x.start[0] - x.end[0])^2 + (x.start[1] - x.end[1])^2));
    const bfs = searchAPlus10.filter(x => x.algorithm =='BFS')
    const bfsNodes = bfs.reduce((accumulator, current) => accumulator + current.visited_nodes, 0) / bfs.length ;
    const dfs = searchAPlus10.filter(x => x.algorithm =='DFS')
    const dfsNodes = dfs.reduce((accumulator, current) => accumulator + current.visited_nodes, 0) / dfs.length;
    const dijkstra = searchAPlus10.filter(x => x.algorithm =='Djikstra')
    const dijkstraNodes = dijkstra.reduce((accumulator, current) => accumulator + current.visited_nodes, 0) / dijkstra.length;
    const aEtoile = searchAPlus10.filter(x => x.algorithm =='A\*')
    const aEtoileNodes = aEtoile.reduce((accumulator, current) => accumulator + current.visited_nodes, 0) / aEtoile.length;

    return toSingleData({'Noeuds visités BFS': bfsNodes,
      'Noeuds visités DFS': dfsNodes,
      'Noeuds visités A*': aEtoileNodes,
      'Noeuds visités Djisktra': dijkstraNodes
    })
  }
  
}
