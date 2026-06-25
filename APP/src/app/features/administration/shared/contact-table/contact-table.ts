import { Component, input } from '@angular/core';
import { Column, DataTable } from '../../../../shared/components/data-tables/data-table/data-table';
import { Button } from '../../../../shared/models/data-table.model';
import { ContactData } from '../../models/contact.model';

@Component({
  selector: 'app-contact-table',
  imports: [DataTable],
  templateUrl: './contact-table.html',
})
export class ContactTable {
  contacts = input.required<ContactData[]>();
  buttons = input.required<Button<any>[]>();

  columns: Column[] = [
    { label: 'ID', field: 'contactID' },
    { label: 'First name', field: 'firstName' },
    { label: 'Last name', field: 'lastName' },
    { label: 'Phone', field: 'phone' },
    { label: 'Email', field: 'email' },
  ];
}
