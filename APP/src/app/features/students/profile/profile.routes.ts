import { Routes } from '@angular/router';
import { ProfileShell } from './profile-shell/profile-shell';
import { Profile } from './profile-view/profile';
import { UpdateStudentPage } from './student-forms/update-student-page/update-student.page';
import { CreateCompetencyPage } from './language-competency-forms/create-competency-page/create-competency.page';
import { UpdateCompetencyPage } from './language-competency-forms/update-competency-page/update-competency.page';
import { LanguageCompetencyTable } from './language-competency-table/language-competency-table';

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
