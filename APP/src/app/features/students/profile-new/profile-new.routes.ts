import { Routes } from '@angular/router';
import { CreateStudentPage } from './create-student/create-student.page';
import { ProfileNewShell } from './profile-new-shell';
import { DraftCompetencyTable } from './language-competencies/draft-language-competency-table/draft-competency-table';
import { DraftCreateCompetencyPage } from './language-competencies/draft-create-competency/draft-create-competency.page';
import { DraftUpdateCompetencyPage } from './language-competencies/draft-update-competency/draft-update-competency.page';
import { studentsTree } from '../student.paths';

const routeTree = studentsTree.new.userID(':userID');

export const PROFILE_NEW_ROUTES: Routes = [
  {
    path: '',
    component: ProfileNewShell,
    children: [
      { path: routeTree.profile.segment, component: CreateStudentPage },
      {
        path: routeTree.language_competencies.segment,
        children: [
          { path: '', component: DraftCompetencyTable },
          {
            path: routeTree.language_competencies.create.segment,
            component: DraftCreateCompetencyPage,
          },
          {
            path: routeTree.language_competencies.update.segment,
            children: [{ path: ':competencyIndex', component: DraftUpdateCompetencyPage }],
          },
        ],
      },
    ],
  },
];
