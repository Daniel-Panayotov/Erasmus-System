import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { FacultiesService } from 'src/app/services/admin-menu-services/faculties.service';
import { DeletionService } from 'src/app/services/deletion.service';
import { PaginationService } from 'src/app/services/pagination.service';
import { environment } from 'src/app/shared/environments/environment';
import { facultiesRegex } from 'src/app/shared/environments/validationEnvironment';
import { PaginationComponent } from 'src/app/shared/pagination/pagination.component';
import { Faculty } from 'src/app/types/faculty';
import { searchValue } from 'src/app/types/searchFormValue';

@Component({
  selector: 'app-faculties',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, PaginationComponent],
  templateUrl: './faculties.component.html',
  styleUrl: './faculties.component.css',
})
export class FacultiesComponent {
  popupError: string = '';
  isPopupVisible: boolean = false;
  isPopupEdit: boolean = false;
  popupIndex: number = 0;

  adminModule: string = 'faculties';
  constructor(
    private facultiesService: FacultiesService,
    private cookieService: CookieService,
    private paginationService: PaginationService,
    private fb: FormBuilder,
    private deletionService: DeletionService
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

  //popup form section

  popupFieldForm = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.pattern(facultiesRegex.facultyName)],
    ],
    coordinator: [
      '',
      [Validators.required, Validators.pattern(facultiesRegex.personName)],
    ],
  });

  togglePopup(isEdit: boolean, i: number): void {
    if (!this.isPopupVisible) {
      this.popupIndex = i;
    }
    if (this.isPopupVisible && i != this.popupIndex) {
      return;
    }

    this.popupFieldForm.reset();

    if (isEdit && !this.isPopupVisible) {
      const values = {
        name: this.getFaculties()[i].name,
        coordinator: this.getFaculties()[i].coordinator,
      };

      this.popupFieldForm.setValue(values);
    }

    this.popupError = '';
    this.isPopupEdit = isEdit;
    this.isPopupVisible = !this.isPopupVisible;
  }

  async popupFormAction(): Promise<void> {
    const { coordinator, name } = this.popupFieldForm.value;

    if (!name || !facultiesRegex.facultyName.exec(name)) {
      this.popupError = 'Invalid name';
      return;
    }

    if (!coordinator || !facultiesRegex.facultyName.exec(coordinator)) {
      this.popupError = 'Invalid coordinator Name';
      return;
    }

    const authCookie = this.cookieService.get(environment.authCookieName);

    try {
      switch (this.isPopupEdit) {
        case true:
          await this.facultiesService.updateOne(
            authCookie,
            { coordinator, name },
            this.getFaculties()[this.popupIndex]._id
          );

          break;

        case false:
          await this.facultiesService.createOne(authCookie, {
            coordinator,
            name,
          });

          break;
      }

      await this.changePage(1, this.getIsSearchActive());

      this.togglePopup(this.isPopupEdit, this.popupIndex);
    } catch (err: any) {
      const { message } = await err.json();
      this.popupError = message;
    }
  }
}
