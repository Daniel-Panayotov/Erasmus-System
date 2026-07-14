import { Routes } from '@angular/router';
import { UpdateContactPage } from './update-contact-page/update-contact.page';
import { ContactsShell } from './contacts-shell';
import { CreateContactPage } from './create-contact-page/create-contact.page';
import { ContactsTable } from './tables/contacts-table';
import { administration } from '../administration.paths';
import { ContactsCreateShell } from './contacts-create-shell';
import { formGuard } from '../../../core/guards/form.guard';

const routeTree = administration.contacts;

export const CONTACT_ROUTES: Routes = [
  {
    path: routeTree.segment,
    component: ContactsShell,
    children: [
      { path: '', redirectTo: 'view', pathMatch: 'full' },
      { path: routeTree.view.segment, component: ContactsTable },
      {
        path: routeTree.create.segment,
        component: ContactsCreateShell,
        canDeactivate: [formGuard],
        children: [{ path: '', component: CreateContactPage }],
      },
      {
        path: ':contactID',
        children: [
          {
            path: routeTree.contactID(':contactID').update.segment,
            component: UpdateContactPage,
            canDeactivate: [formGuard],
          },
        ],
      },
    ],
  },
];
