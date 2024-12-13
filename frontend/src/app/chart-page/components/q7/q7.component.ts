import { Component, Input } from '@angular/core';
import { LineChartModule } from '@swimlane/ngx-charts';
import { DataFromJson, MultipleData } from '../../../types';
import { GraphService } from '../../../graph.service';

/**
8. Évolution temporelle 

Suivez l’évolution du nombre de passagers au fil des jours. Comparez également les tendances pour chaque compagnie au sein de la même visualisation.

Ici on voulait particulièrement utiliser un linechart

La question est un peu plus difficile puisqu'il faut jonglet avec la donnée temporelle, et la donnée par compagnie
*/
@Component({
  selector: 'app-q7',
  standalone: true,
  templateUrl: './q7.component.html',
  imports: [LineChartModule],
})
export class Q7Component {
  @Input({ required: true }) data: DataFromJson = [];

  // Un Line chart est obligatoirement un MultipleData type [{name: string, series: {name: string, value: number}[]}]
  result: MultipleData = [];
  view: [number, number] = [1200, 600];
  xAxisLabel = 'Jour';
  yAxisLabel = 'Nombre de passagers';
  legendTitle = 'Compagnies';
  scheme: any = {
    domain: ['#FF0000', '#00FFF0', '#0000FF', '#0FF00F', '#FF00FF'],
  };

  constructor(private readonly graphService: GraphService) {}

  ngOnInit() {
    this.result = this.format();
  }

  private format() {
    /* 
     La question est "quelles sont les différentes catégories de ce multidata" ? C'est à dire, quelles sont les différentes lignes
     Dans notre cas, ce sont les compagnies, donc on va nécessairement regrouper les données par compagnie à un moment dans un objet type:
     [{"name": "Compagnie 1", series: [{name: "date1", value: 10}, {name: "date2", value: 20}, ...]}]

     Series est un single data, qui va regrouper date: nombre de passagers
    */
    const datesAndCompanies = this.data.map(({ date, company }) => ({
      date: date.split('-')[2], // la date est au format yy-mm-dd et seul le jour nous intéresse puisque qu'on travaille sur les données d'un seul mois
      company,
    }));

    // L'idée c'est de filter par compagnie
    // Notez que c'est presque la même chose que notre service graphService.groupByUniqueValue
    // simplement au lieu d'un nombre on a une liste
    const groupedByCompany = datesAndCompanies.reduce<Record<string, any[]>>(
      (acc, { date, company }) => {
        if (!acc[company]) {
          acc[company] = [];
        }
        acc[company].push(date);
        return acc;
      },
      {}
    );
    // Arrivé ici, on a un objet qui ressemble à { "Compagnie 1": ["date1", "date2", ...], "Compagnie 2": ["date1", "date2", ...] }

    // il nous reste donc "juste" à compter le nombre de dates pour chaque compagnie
    const multipleData = Object.entries(groupedByCompany).map(
      ([company, dates]) => {
        const groupedByDate = this.graphService.groupByUniqueValue(dates);
        return this.graphService.toMultipleData(company, groupedByDate);
      }
    );

    /*Une dernière modification à faire, notre variable multipleData est en fait un tableau de multipleData, soit un tableau de tableau
     Ceci dû à la façon dont toMultipleData est construit (on pourrait aussi changer l'implémentation de la fonction - ce qui serait mieux - 
     Mais pour faire avec les inputs que je vous avais initialement donné, je ne vais pas le faire)
    ex de valeur pour multipleData tel que retourné par les lignes précédentes: 
    [ 
      [
        {
          name: "Compagnie 1",
          series: [{name: "date1", value: 10},{name: "date2", value: 20}, ...]
        }
      ],
      [
        {
          name: "Compagnie 2", 
          series: [{name: "date1", value: 10}, {name: "date2", value: 20}, ...]
        }
      ] 
    ]
    
    Pour avoir un type MultipleData, il faut que ce soit un tableau de la forme: 
    [
      { 
        name: "Compagnie 1", 
        series: [{name: "date1", value: 10},{name: "date2", value: 20}, ...]
      },
      { 
        name: "Compagnie 2", 
        series: [{name: "date1", value: 10}, {name: "date2", value: 20}, ...]
      }
    ]

    On doit donc passer de MultipleData[] à MultipleData, et on peut le faire en dépliant le tableau
    JS nous propose .flat() qui va s'occuper de tout mettre au même niveau	
    Si vous voulez la doc entière de la fonction: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat 
    */
    const final = multipleData.flat();

    return final;
  }
}
