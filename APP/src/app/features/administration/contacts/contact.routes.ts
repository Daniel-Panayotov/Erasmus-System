import { Routes } from '@angular/router';
import { UpdateContactPage } from './update-contact-page/update-contact.page';

export const CONTACT_ROUTES: Routes = [
  {
    path: '',
    // component: Shell
    children: [{ path: ':contactID/update', component: UpdateContactPage }],
  },
];
