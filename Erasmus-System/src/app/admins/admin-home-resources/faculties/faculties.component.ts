import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PaginationComponent } from 'src/app/shared/components/pagination/pagination.component';
import { PopupAdminFormComponent } from 'src/app/shared/components/popup-admin-form/popup-admin-form.component';
import { AdminViewComponent } from 'src/app/shared/components/admin-view/admin-view.component';
import { adminSectionString } from 'src/app/types/apiEnvironmentTypes';

@Component({
  selector: 'app-faculties',
  standalone: true,
  imports: [PaginationComponent, PopupAdminFormComponent, AdminViewComponent],
  templateUrl: './faculties.component.html',
  styleUrl: './faculties.component.css',
})
export class FacultiesComponent {
  adminModule: adminSectionString = 'faculties';
  sectionName: string = 'Faculties';

  searchForm = {} as FormGroup;
  popupForm = {} as FormGroup;

  receiveSearchForm(searchForm: FormGroup) {
    this.searchForm = searchForm;
  }

  receivePopumForm(popupForm: FormGroup) {
    this.popupForm = popupForm;
  }
}
