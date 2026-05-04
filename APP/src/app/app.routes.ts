import { Routes } from '@angular/router';
import { Home } from './components/core/home/home';
import { NotFound } from './components/core/not-found/not-found';

export const routes: Routes = [
  { path: '', component: Home, title: 'Home page' },
  { path: '**', component: NotFound, title: 'Not found' },
];
