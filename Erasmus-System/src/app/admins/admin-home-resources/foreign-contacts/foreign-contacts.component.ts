import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AdminViewComponent } from 'src/app/shared/components/admin-view/admin-view.component';
import { PaginationComponent } from 'src/app/shared/components/pagination/pagination.component';
import { PopupAdminFormComponent } from 'src/app/shared/components/popup-admin-form/popup-admin-form.component';

@Component({
  selector: 'app-foreign-contacts',
  standalone: true,
  imports: [PaginationComponent, PopupAdminFormComponent, AdminViewComponent],
  templateUrl: './foreign-contacts.component.html',
  styleUrl: './foreign-contacts.component.css',
})
export class ForeignContactsComponent {
  adminModule: string = 'foreignContacts';
  sectionName: string = 'Foreign Contacts';

  searchForm: FormGroup = {} as any;
  popupForm: FormGroup = {} as any;

  receiveSearchForm(searchForm: FormGroup) {
    this.searchForm = searchForm;
  }

  receivePopupForm(popupForm: FormGroup) {
    this.popupForm = popupForm;
  }
}