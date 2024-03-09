import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DeletionService } from 'src/app/services/deletion.service';
import { PaginationService } from 'src/app/services/pagination.service';
import { PaginationComponent } from 'src/app/shared/components/pagination/pagination.component';
import { Faculty } from 'src/app/types/faculty';
import { searchValue } from 'src/app/types/searchFormValue';
import { PopupAdminFormComponent } from 'src/app/shared/components/popup-admin-form/popup-admin-form.component';
import { AdminPopupService } from 'src/app/services/admin-menu-services/admin-popup.service';

@Component({
  selector: 'app-faculties',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    PaginationComponent,
    PopupAdminFormComponent,
  ],
  templateUrl: './faculties.component.html',
  styleUrl: './faculties.component.css',
})
export class FacultiesComponent {
  adminModule: string = 'faculties';

  popupForm: FormGroup = {} as any;

  constructor(
    private paginationService: PaginationService,
    private fb: FormBuilder,
    private deletionService: DeletionService,
    private popupService: AdminPopupService
  ) {}

  /* Bind functions */

  async changePage(pageNumber: number, searching: boolean): Promise<void> {
    await this.paginationService.changePage.bind(
      this.paginationService, // original context
      pageNumber,
      searching,
      this.searchFieldForm.value as searchValue,
      this.adminModule
    )();
  }

  async deleteField(id: string): Promise<void> {
    await this.deletionService.onDelete.bind(
      this.deletionService,
      id,
      this.adminModule,
      this.changePage.bind(this, 1, this.getIsSearchActive())
    )();
  }

  /* Setup getters */

  /* pagination getters */

  getFaculties(): [Faculty] {
    return this.paginationService.documents;
  }

  getIsSearchActive(): boolean {
    return this.paginationService.isSearchActive;
  }

  /* search form */

  searchFieldForm = this.fb.group({
    search: [''],
    select: ['', Validators.required],
  });

  getChildPopupForm(popupForm: FormGroup) {
    this.popupForm = popupForm;
  }

  togglePopup(isEdit: boolean, i: number) {
    this.popupService.togglePopup(isEdit, i, this.popupForm, this.adminModule);
  }

  /* popup form getters */

  get isPopupVisible(): boolean {
    return this.popupService.isPopupVisible;
  }
  get isPopupEdit(): boolean {
    return this.popupService.isPopupEdit;
  }
  get popupIndex(): number {
    return this.popupService.popupIndex;
  }
  get popupError(): string {
    return this.popupService.popupError;
  }
}
