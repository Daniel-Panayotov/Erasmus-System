import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PaginationComponent } from 'src/app/shared/components/pagination/pagination.component';
import { PopupAdminFormComponent } from 'src/app/shared/components/popup-admin-form/popup-admin-form.component';
import { AdminViewComponent } from 'src/app/shared/components/admin-view/admin-view.component';

@Component({
  selector: 'app-faculties',
  standalone: true,
  imports: [PaginationComponent, PopupAdminFormComponent, AdminViewComponent],
  templateUrl: './faculties.component.html',
  styleUrl: './faculties.component.css',
})
export class FacultiesComponent {
  adminModule: string = 'faculties';
  sectionName: string = 'Faculties';

  searchForm: FormGroup = {} as any;
  popupForm: FormGroup = {} as any;

  receiveSearchForm(searchForm: FormGroup) {
    this.searchForm = searchForm;
  }

  receivePopumForm(popupForm: FormGroup) {
    this.popupForm = popupForm;
  }
}
