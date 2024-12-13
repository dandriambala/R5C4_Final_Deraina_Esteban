import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ChartPageComponent } from './chart-page/page/chart-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'liste-paginee',
    component: ChartPageComponent,
  },
  {
    path: 'visualisation',
    component: ChartPageComponent,
  },
];
