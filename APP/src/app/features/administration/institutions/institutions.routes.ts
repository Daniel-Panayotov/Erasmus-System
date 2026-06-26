import { Routes } from '@angular/router';
import { InstitutionsShell } from './institutions-shell';
import { UpdateInstitutionPage } from './update-institution-page/update-institution.page';
import { CreateInstitutionPage } from './create-institution-page/create-institution.page';

export const INSTITUTIONS_ROUTES: Routes = [
  {
    path: '',
    component: InstitutionsShell,
    children: [
      { path: 'create', component: CreateInstitutionPage },
      { path: ':institutionID/update', component: UpdateInstitutionPage },
    ],
  },
];
