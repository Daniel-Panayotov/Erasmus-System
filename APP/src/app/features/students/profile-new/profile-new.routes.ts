import { Routes } from '@angular/router';
import { CreateStudentPage } from './create-student/create-student.page';

export const PROFILE_NEW_ROUTES: Routes = [
  {
    path: '',
    //   component: ProfileNewShell
    children: [
      { path: 'profile', component: CreateStudentPage },
      //   { path: 'language-competencies', component: LanguageCompetencyTable },
      //   { path: 'language-competencies/create', component: CreateCompetencyPage },
    ],
  },
];
