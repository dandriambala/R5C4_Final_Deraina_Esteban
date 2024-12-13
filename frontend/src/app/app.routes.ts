import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { GraphiquesComponent } from './graphiques/graphiques.component';
import { ListePagineeComponent } from './liste-paginee/liste-paginee.component';

export const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'liste-paginee',
    component: ListePagineeComponent,
  },
  {
    path: 'graphiques',
    component: GraphiquesComponent,
  }
];
