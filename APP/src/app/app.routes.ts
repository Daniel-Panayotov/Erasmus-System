import { Routes } from '@angular/router';
import { Home } from './layout/home/home';
import { NotFound } from './layout/not-found/not-found';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home, title: 'Home page' },
  {
    path: 'users',
    loadChildren: () => import('./features/users/users.routes').then((m) => m.USERS_ROUTES),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/authentication/authentication.routes').then(
        (m) => m.AUTHENTICATION_ROUTES,
      ),
  },
  { path: '**', component: NotFound, title: 'Not found' },
];
