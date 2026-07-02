import { Routes } from '@angular/router';
import { InstitutionsShell } from './institutions-shell';
import { UpdateInstitutionPage } from './update-institution-page/update-institution.page';
import { CreateInstitutionPage } from './create-institution-page/create-institution.page';
import { InstitutionsTable } from './tables/institutions-table';
import { CreateInstitutionContactsTable } from './tables/create-institution-contacts-tables';
import { UpdateInstitutionContactsTable } from './tables/update-institution-contacts-tables';
import { administration } from '../administration.paths';
import { InstitutionsCreateShell } from './institutions-create-shell';
import { formGuard } from '../../../core/guards/form.guard';

const routeTree = administration.institutions;

export const INSTITUTIONS_ROUTES: Routes = [
  {
    path: routeTree.segment,
    component: InstitutionsShell,
    children: [
      { path: '', redirectTo: 'view', pathMatch: 'full' },
      { path: routeTree.view.segment, component: InstitutionsTable },
      {
        path: routeTree.create.segment,
        component: InstitutionsCreateShell,
        canDeactivate: [formGuard],
        children: [
          { path: '', component: CreateInstitutionPage },
          { path: routeTree.create.contacts.segment, component: CreateInstitutionContactsTable },
          // { path: routeTree.create.faculties.segment, component: CreateInstitutionPage },
        ],
      },
      {
        path: ':institutionID',
        children: [
          {
            path: routeTree.institutionID(':institutionID').update.segment,
            component: UpdateInstitutionPage,
            canDeactivate: [formGuard],
          },
          {
            path: routeTree.institutionID(':institutionID').contacts.segment,
            component: UpdateInstitutionContactsTable,
          },
          // { path: ':institutionID/faculties', component: UpdateInstitutionPage },
        ],
      },
    ],
  },
];
