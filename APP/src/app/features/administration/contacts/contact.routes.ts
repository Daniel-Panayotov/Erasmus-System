import { Routes } from '@angular/router';
import { UpdateContactPage } from './update-contact-page/update-contact.page';
import { ContactsViewTable } from './contacts-view-table/contacts-view-table';
import { ContactsShell } from './contacts-shell';

export const CONTACT_ROUTES: Routes = [
  {
    path: '',
    component: ContactsShell,
    children: [
      { path: '', redirectTo: 'view', pathMatch: 'full' },
      { path: 'view', component: ContactsViewTable },
      { path: ':contactID/update', component: UpdateContactPage },
      // { path: ':contactID/institutions', component: UpdateContactPage },
    ],
  },
];
