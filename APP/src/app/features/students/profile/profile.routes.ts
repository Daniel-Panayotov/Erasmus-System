import { Routes } from '@angular/router';
import { ProfileShell } from './profile-shell';
import { Profile } from './profile-view/profile';
import { UpdateStudentPage } from './update-student/update-student.page';
import { CreateCompetencyPage } from './language-competencies/create-competency/create-competency.page';
import { LanguageCompetencyTable } from './language-competencies/language-competency-table/language-competency-table';
import { UpdateCompetencyPage } from './language-competencies/update-competency/update-competency.page';
import { studentsTree } from '../student.paths';

const routeTree = studentsTree.studentID(':studentID').profile;

export const PROFILE_ROUTES: Routes = [
  {
    path: '',
    component: ProfileShell,
    children: [
      { path: '', redirectTo: 'view', pathMatch: 'full' },
      { path: routeTree.view.segment, component: Profile, title: 'Profile view' },
      { path: routeTree.update.segment, component: UpdateStudentPage, title: 'Profile form' },
      {
        path: routeTree.language_competencies.segment,
        children: [
          { path: '', component: LanguageCompetencyTable },
          { path: routeTree.language_competencies.create.segment, component: CreateCompetencyPage },
          {
            path: routeTree.language_competencies.update.segment,
            children: [{ path: ':competencyID', component: UpdateCompetencyPage }],
          },
        ],
      },
    ],
  },
];
