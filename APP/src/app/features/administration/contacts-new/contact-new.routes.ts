import { Routes } from '@angular/router';
import { CreateContactPage } from './create-contact-page/create-contact.page';
import { ContactsNewShell } from './contacts-new-shell/contacts-new-shell';

export const CONTACT_NEW_ROUTES: Routes = [
  {
    path: '',
    component: ContactsNewShell,
    children: [{ path: 'create', component: CreateContactPage }, { path: 'institutions' }],
  },
];
