import { Routes } from '@angular/router';
import { UpdateContactPage } from './update-contact-page/update-contact.page';
import { ContactsShell } from './contacts-shell';
import { CreateContactPage } from './create-contact-page/create-contact.page';
import { ContactsTable } from './tables/contacts-table';
import { CreateContactInstitutionsTable } from './tables/create-contact-institution-tables';
import { UpdateContactInstitutionsTable } from './tables/update-contact-institution-tables';

export const CONTACT_ROUTES: Routes = [
  {
    path: '',
    component: ContactsShell,
    children: [
      { path: '', redirectTo: 'view', pathMatch: 'full' },
      { path: 'view', component: ContactsTable },
      { path: 'create', component: CreateContactPage },
      { path: 'create/institutions', component: CreateContactInstitutionsTable },
      { path: ':contactID/update', component: UpdateContactPage },
      { path: ':contactID/institutions', component: UpdateContactInstitutionsTable },
    ],
  },
];
