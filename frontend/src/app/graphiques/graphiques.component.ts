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
    const bfslength = this.search.filter(x => x.algorithm == 'BFS').length;
    const dfslength = this.search.filter(x => x.algorithm == 'DFS').length;
    const dijkstralength = this.search.filter(x => x.algorithm =='Djikstra').length;
    const aEtoilelength = this.search.filter(x => x.algorithm == 'A\*').length;
 
    return toSingleData({'Nombre de BFS': bfslength,
      'Nombre de DFS': dfslength,
      'Nombre de A*': aEtoilelength,
      'Nombre de Djisktra': dijkstralength
    })
  }

  format2(){
    const search_a_plus_200 = this.search.filter(x => x.grid_width * x.grid_height> 200);
    const bfs = search_a_plus_200.filter(x => x.algorithm =='BFS')
    const bfstime = bfs.reduce((accumulator, current) => accumulator + current.time_ns, 0) / bfs.length ;
    const dfs = search_a_plus_200.filter(x => x.algorithm =='DFS')
    const dfstime = dfs.reduce((accumulator, current) => accumulator + current.time_ns, 0) / dfs.length;
    const dijkstra = search_a_plus_200.filter(x => x.algorithm =='Djikstra')
    const dijkstratime = dijkstra.reduce((accumulator, current) => accumulator + current.time_ns, 0) / dijkstra.length;
    const aEtoile = search_a_plus_200.filter(x => x.algorithm =='A\*')
    const aEtoiletime = aEtoile.reduce((accumulator, current) => accumulator + current.time_ns, 0) / aEtoile.length;

    return toSingleData({'Temps moyen BFS': bfstime,
      'Temps moyen DFS': dfstime,
      'Temps moyen A*': aEtoiletime,
      'Temps moyen Djisktra': dijkstratime
    })
  }

  format3(){
    const search_a_plus_10 = this.search.filter(x => Math.sqrt((x.start[0] - x.end[0])^2 + (x.start[1] - x.end[1])^2));
    const bfs = search_a_plus_10.filter(x => x.algorithm =='BFS')
    const bfsnodes = bfs.reduce((accumulator, current) => accumulator + current.visited_nodes, 0) / bfs.length ;
    const dfs = search_a_plus_10.filter(x => x.algorithm =='DFS')
    const dfsnodes = dfs.reduce((accumulator, current) => accumulator + current.visited_nodes, 0) / dfs.length;
    const dijkstra = search_a_plus_10.filter(x => x.algorithm =='Djikstra')
    const dijkstranodes = dijkstra.reduce((accumulator, current) => accumulator + current.visited_nodes, 0) / dijkstra.length;
    const aEtoile = search_a_plus_10.filter(x => x.algorithm =='A\*')
    const aEtoilenodes = aEtoile.reduce((accumulator, current) => accumulator + current.visited_nodes, 0) / aEtoile.length;

    return toSingleData({'Noeuds visités BFS': bfsnodes,
      'Noeuds visités DFS': dfsnodes,
      'Noeuds visités A*': aEtoilenodes,
      'Noeuds visités Djisktra': dijkstranodes
    })
  }
  
}
