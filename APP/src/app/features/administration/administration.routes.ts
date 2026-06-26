import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';
import { CONTACT_ROUTES } from './contacts/contact.routes';
import { INSTITUTIONS_ROUTES } from './institutions/institutions.routes';

export const ADMINISTRATION_ROUTES: Routes = [
  {
    path: 'administration',
    canActivateChild: [authGuard],
    children: [
      { path: 'contacts', children: CONTACT_ROUTES },
      { path: 'institutions', children: INSTITUTIONS_ROUTES },
    ],
  },
];

// SUBJECTS
//
// administration/new/subjects - shell, redirect to /create
// administration/new/subjects/create - form
// administration/new/subjects/faculties - data-table-view
// administration/new/subjects/disciplines - data-table-view
//
// administration/subjects - shell - redirect to /view
// administration/subjects/view - data table
// administration/subjects/:subjectID/update - form
// administration/subjects/:subjectID/faculties - data table - one
// administration/subjects/:subjectID/disciplines - data table - multi
//
// DISCIPLINES
//
// administration/new/disciplines - shell, redirect to /create
// administration/new/disciplines/create - form
// administration/new/disciplines/subjects - data table - multi
// administration/new/disciplines/faculties - data table - one
//
// administration/disciplines - shell - redirect to /view
// administration/disciplines/view - data table
// administration/disciplines/:disciplineID/update - form
// administration/disciplines/:disciplineID/subjects - data table - multi
// administration/disciplines/:disciplineID/faculties - data table - one
//
//  FACULTIES
//
// administration/new/faculties - shell, redirect to /create
// administration/new/faculties/create - form
// administration/new/faculties/subjects     - data table - multi
// administration/new/faculties/disciplines  - data table - multi
// administration/new/faculties/institutions - data table - one
//
// administration/faculties - shell - redirect to /view
// administration/faculties/view - data table
// administration/faculties/:facultyID/update - form
// administration/faculties/:facultyID/subjects - data table - multi
// administration/faculties/:facultyID/disciplines - data table - multi
// administration/faculties/:facultyID/institutions - data table - one
//
//  INSTITUTIONS
//
// administration/institutions
// administration/institutions/view
// administration/institutions/create
// administration/institutions/create/contacts
// administration/institutions/create/faculties
// administration/institutions/:institutionID/update - form
// administration/institutions/:institutionID/contacts - data table - multi
// administration/institutions/:institutionID/faculties - data table - multi
//
//  CONTACTS
//
// administration/contacts
// administration/contacts/view
// administration/contacts/create
// administration/contacts/create/institutions
// administration/contacts/:contactID/update
// administration/contacts/:contactID/institutions
