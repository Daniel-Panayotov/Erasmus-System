import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';

export const INSTITUTION_ROUTES: Routes = [
  {
    path: 'institutions',
    canActivateChild: [authGuard],
    children: [],
  },
];
