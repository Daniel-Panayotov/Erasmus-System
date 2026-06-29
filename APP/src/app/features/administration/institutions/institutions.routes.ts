import { Routes } from '@angular/router';
import { InstitutionsShell } from './institutions-shell';
import { UpdateInstitutionPage } from './update-institution-page/update-institution.page';
import { CreateInstitutionPage } from './create-institution-page/create-institution.page';
import { InstitutionsTable } from './tables/institutions-table';
import { CreateInstitutionContactsTable } from './tables/create-institution-contacts-tables';

export const INSTITUTIONS_ROUTES: Routes = [
  {
    path: '',
    component: InstitutionsShell,
    children: [
      { path: '', redirectTo: 'view', pathMatch: 'full' },
      { path: 'view', component: InstitutionsTable },
      { path: 'create', component: CreateInstitutionPage },
      { path: 'create/contacts', component: CreateInstitutionContactsTable },
      // { path: 'create/faculties', component: CreateInstitutionPage },
      { path: ':institutionID/update', component: UpdateInstitutionPage },
      // { path: ':institutionID/contacts', component: UpdateInstitutionPage },
      // { path: ':institutionID/faculties', component: UpdateInstitutionPage },
    ],
  },
];
