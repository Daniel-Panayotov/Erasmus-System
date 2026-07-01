import { Routes } from '@angular/router';
import { Home } from './layout/home/home';
import { NotFound } from './layout/not-found/not-found';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: Home, title: 'Home page' },
  {
    path: '',
    loadChildren: () =>
      import('./features/students/students.routes').then((m) => m.STUDENTS_ROUTES),
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/administration/administration.routes').then(
        (m) => m.ADMINISTRATION_ROUTES,
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/authentication/authentication.routes').then(
        (m) => m.AUTHENTICATION_ROUTES,
      ),
  },
  { path: '**', component: NotFound, title: 'Not found' },
];
