import { Routes } from '@angular/router';
import { InstitutionsShell } from './institutions-shell';
import { UpdateInstitutionPage } from './update-institution-page/update-institution.page';

export const INSTITUTIONS_ROUTES: Routes = [
  {
    path: '',
    component: InstitutionsShell,
    children: [{ path: ':institutionID/update', component: UpdateInstitutionPage }],
  },
];
