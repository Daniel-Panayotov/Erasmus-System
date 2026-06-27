import { Routes } from '@angular/router';
import { UpdateContactPage } from './update-contact-page/update-contact.page';
import { ContactsShell } from './contacts-shell';
import { CreateContactPage } from './create-contact-page/create-contact.page';
import { ContactsTable } from './contacts-table';
import { InstitutionsBaseTable } from '../shared/institutions-table/institutions-base-table';

export const CONTACT_ROUTES: Routes = [
  {
    path: '',
    component: ContactsShell,
    children: [
      { path: '', redirectTo: 'view', pathMatch: 'full' },
      { path: 'view', component: ContactsTable },
      { path: 'create', component: CreateContactPage },
      { path: 'create/institutions', component: InstitutionsBaseTable },
      { path: ':contactID/update', component: UpdateContactPage },
      // { path: ':contactID/institutions', component: UpdateContactPage },
    ],
  },
];
