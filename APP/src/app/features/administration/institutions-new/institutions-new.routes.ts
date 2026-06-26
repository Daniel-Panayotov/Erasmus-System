import { Routes } from '@angular/router';
import { InstitutionsNewShell } from './institutions-new-shell';
import { CreateInstitutionPage } from './create-institution-page/create-institution.page';

export const INSTITUTIONS_NEW_ROUTES: Routes = [
  {
    path: '',
    component: InstitutionsNewShell,
    children: [{ path: 'create', component: CreateInstitutionPage }],
  },
];
