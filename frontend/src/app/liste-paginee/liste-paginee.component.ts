import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

@Component({
  selector: 'app-liste-paginee',
  standalone: true,
  imports: [],
  templateUrl: './liste-paginee.component.html',
  styleUrl: './liste-paginee.component.css'
})
export class ListePagineeComponent {
  searches: any[] = [];
  currentPage: number = 1;
  maxPage: number = 1;
  pageSize: number = 30;
  paginatedSearches: Search[] = [];


  constructor(private readonly http: HttpClient) { }

  ngOnInit() {
    this.http.get<Search[]>('http://localhost:5000/searches')
      .subscribe((data) => {
        this.searches = data
        this.maxPage = Math.ceil(this.searches.length / this.pageSize);
        this.updatePagination();
      })
  }

  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.searches.length);
    this.paginatedSearches = this.searches.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.maxPage) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }
}
