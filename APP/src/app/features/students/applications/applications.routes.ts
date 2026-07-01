import { Routes } from '@angular/router';
import { ApplicationForm } from '../shared/application-form/application.form';
import { studentsTree } from '../student.paths';

const routeTree = studentsTree.studentID(':studentID').applications;

export const APPLICATIONS_ROUTES: Routes = [
  {
    path: '',
    children: [{ path: routeTree.create.segment, component: ApplicationForm }],
  },
];

// students/:studentID/applications/create
// students/:studentID/applications/:applicationID/view
// students/:studentID/applications/:applicationID/update
// students/:studentID/applications/:applicationID/experiences
// students/:studentID/applications/:applicationID/experiences/create
// students/:studentID/applications/:applicationID/experiences/update/:experienceID
