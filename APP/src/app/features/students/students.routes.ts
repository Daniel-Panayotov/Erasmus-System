import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';
import { PROFILE_ROUTES } from './profile/profile.routes';
import { APPLICATIONS_ROUTES } from './applications/applications.routes';
import { PROFILE_NEW_ROUTES } from './profile-new/profile-new.routes';
import { studentsTree } from './student.paths';

const routeTree = studentsTree;

export const STUDENTS_ROUTES: Routes = [
  {
    path: routeTree.segment.replace('/', ''),
    canActivateChild: [authGuard],
    children: [
      {
        path: routeTree.new.segment,
        children: [{ path: ':userID', children: PROFILE_NEW_ROUTES }],
      },
      {
        path: ':studentID',
        children: [
          {
            path: routeTree.studentID(':studentID').applications.segment,
            children: APPLICATIONS_ROUTES,
          },
          {
            path: routeTree.studentID(':studentID').profile.segment,
            children: PROFILE_ROUTES,
          },
        ],
      },
    ],
  },
];
