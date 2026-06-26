import { Routes } from '@angular/router';
import { CreateStudentPage } from './create-student/create-student.page';
import { ProfileNewShell } from './profile-new-shell';
import { DraftCompetencyTable } from './language-competencies/draft-language-competency-table/draft-competency-table';
import { DraftCreateCompetencyPage } from './language-competencies/draft-create-competency/draft-create-competency.page';
import { DraftUpdateCompetencyPage } from './language-competencies/draft-update-competency/draft-update-competency.page';

export const PROFILE_NEW_ROUTES: Routes = [
  {
    path: '',
    component: ProfileNewShell,
    children: [
      { path: 'profile', component: CreateStudentPage },
      { path: 'language-competencies', component: DraftCompetencyTable },
      { path: 'language-competencies/create', component: DraftCreateCompetencyPage },
      {
        path: 'language-competencies/update/:competencyIndex',
        component: DraftUpdateCompetencyPage,
      },
    ],
  },
];
