import { Routes } from '@angular/router';
import { ProfileShell } from './profile-shell/profile-shell';
import { Profile } from './profile-view/profile';
import { UpdateStudentPage } from './update-student/update-student.page';
import { CreateCompetencyPage } from './language-competencies/create-competency/create-competency.page';
import { UpdateCompetencyPage } from './language-competencies/update-competency/update-competency.page';
import { LanguageCompetencyTable } from './language-competencies/language-competency-table/language-competency-table';

export const PROFILE_ROUTES: Routes = [
  {
    path: '',
    component: ProfileShell,
    children: [
      { path: '', redirectTo: 'view', pathMatch: 'full' },
      { path: 'view', component: Profile, title: 'Profile view' },
      { path: 'update', component: UpdateStudentPage, title: 'Profile form' },
      {
        path: 'language-competencies',
        children: [
          { path: '', component: LanguageCompetencyTable },
          { path: 'create', component: CreateCompetencyPage },
          { path: 'update/:competencyID', component: UpdateCompetencyPage },
        ],
      },
    ],
  },
];
