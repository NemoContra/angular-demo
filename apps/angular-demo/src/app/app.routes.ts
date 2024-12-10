import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./routes/pokemon-search/pokemon-search.component'),
  },
];
