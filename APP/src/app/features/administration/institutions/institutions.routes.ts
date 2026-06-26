import { Routes } from '@angular/router';
import { InstitutionsShell } from './institutions-shell';
import { UpdateInstitutionPage } from './update-institution-page/update-institution.page';
import { CreateInstitutionPage } from './create-institution-page/create-institution.page';
import { InstitutionsTable } from './institutions-table';

export const INSTITUTIONS_ROUTES: Routes = [
  {
    path: '',
    component: InstitutionsShell,
    children: [
      { path: '', redirectTo: 'view', pathMatch: 'full' },
      { path: 'view', component: InstitutionsTable },
      { path: 'create', component: CreateInstitutionPage },
      { path: ':institutionID/update', component: UpdateInstitutionPage },
    ],
  },
];
