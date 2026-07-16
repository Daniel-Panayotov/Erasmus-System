import { Routes } from '@angular/router';
import { administration } from '../administration.paths';
import { UniversityShell } from './university-shell';
import { UniversityTable } from './tables/university-table/university-table';
import { CreateUniversityPage } from './create-university-page/create-university-page';
import { UniversityCreateShell } from './university-create-shell';
import { formGuard } from '../../../core/guards/form.guard';
import { UpdateUniversityPage } from './update-university-page/update-university-page';

const routeTree = administration.universities;

export const UNIVERSITY_ROUTES: Routes = [
  {
    path: routeTree.segment,
    component: UniversityShell,
    children: [
      { path: '', redirectTo: 'view', pathMatch: 'full' },
      { path: routeTree.view.segment, component: UniversityTable },
      {
        path: routeTree.create.segment,
        component: UniversityCreateShell,
        canDeactivate: [formGuard],
        children: [{ path: '', component: CreateUniversityPage }],
      },
      {
        path: ':universityID',
        children: [
          {
            path: routeTree.universityID(':universityID').update.segment,
            component: UpdateUniversityPage,
            canDeactivate: [formGuard],
          },
        ],
      },
    ],
  },
];
