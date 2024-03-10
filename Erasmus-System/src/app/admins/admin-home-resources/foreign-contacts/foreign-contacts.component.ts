import { Component } from '@angular/core';
import { PaginationComponent } from 'src/app/shared/components/pagination/pagination.component';
import { PopupAdminFormComponent } from 'src/app/shared/components/popup-admin-form/popup-admin-form.component';

@Component({
  selector: 'app-foreign-contacts',
  standalone: true,
  imports: [PaginationComponent, PopupAdminFormComponent],
  templateUrl: './foreign-contacts.component.html',
  styleUrl: './foreign-contacts.component.css',
})
export class ForeignContactsComponent {}
