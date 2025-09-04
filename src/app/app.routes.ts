import { Routes } from '@angular/router';

import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { MoviesComponent } from './components/pages/movies/movies.component';

export const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'movies',
        component: MoviesComponent,
      },
     
];
