import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AdminViewComponent } from 'src/app/shared/components/admin-view/admin-view.component';
import { PaginationComponent } from 'src/app/shared/components/pagination/pagination.component';
import { PopupAdminFormComponent } from 'src/app/shared/components/popup-admin-form/popup-admin-form.component';

@Component({
  selector: 'app-receiving-contacts',
  standalone: true,
  imports: [PaginationComponent, PopupAdminFormComponent, AdminViewComponent],
  templateUrl: './receiving-contacts.component.html',
  styleUrl: './receiving-contacts.component.css',
})
export class ReceivingContactsComponent {
  adminModule: string = 'receivingContacts';
  sectionName: string = 'Receiving Contacts';

  searchForm = {} as FormGroup;
  popupForm = {} as FormGroup;

  receiveSearchForm(searchForm: FormGroup) {
    this.searchForm = searchForm;
  }

  receivePopupForm(popupForm: FormGroup) {
    this.popupForm = popupForm;
  }
}
