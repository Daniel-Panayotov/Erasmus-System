import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { FieldsOfEducationService } from 'src/app/services/admin-menu-services/fields-of-education.service';
import { DeletionService } from 'src/app/services/deletion.service';
import { PaginationService } from 'src/app/services/pagination.service';
import { environment } from 'src/app/shared/environments/environment';
import {
  fieldsRegex,
  globalRegex,
} from 'src/app/shared/environments/validationEnvironment';
import { PaginationComponent } from 'src/app/shared/pagination/pagination.component';
import { Fields } from 'src/app/types/fields';
import { searchValue } from 'src/app/types/searchFormValue';

@Component({
  selector: 'app-fields-of-education',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PaginationComponent],
  templateUrl: './fields-of-education.component.html',
  styleUrl: './fields-of-education.component.css',
})
export class FieldsOfEducationComponent implements OnInit {
  adminModule: string = 'fields';
  //popup form values
  popupError: string = '';
  isPopupVisible: boolean = false;
  isPopupEdit: boolean = false;
  popupIndex: number = 0;

  constructor(
    private fieldsService: FieldsOfEducationService,
    private cookieService: CookieService,
    private fb: FormBuilder,
    private paginationService: PaginationService,
    private deletionService: DeletionService
  ) {}

  async ngOnInit(): Promise<void> {}

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

  getFields(): [Fields] {
    return this.paginationService.documents;
  }

  getIsSearchActive(): boolean {
    return this.paginationService.isSearchActive;
  }

  /* search form */

  searchFieldForm = this.fb.group({
    search: [''],
    select: ['name', Validators.required],
  });

  //popup form section

  popupFieldForm = this.fb.group({
    code: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(3)],
    ],
    name: ['', [Validators.required, Validators.minLength(4)]],
  });

  /* Index is set to differentiate betweens clicked buttons.
   * Allow only the clicked button to hide the popup.
   * Index for "Add" = -1 | Indexes for "Edit" >= 0
   */

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
        code: this.getFields()[i].code,
        name: this.getFields()[i].name,
      };

      this.popupFieldForm.setValue(values);
    }

    this.popupError = '';
    this.isPopupEdit = isEdit;
    this.isPopupVisible = !this.isPopupVisible;
  }

  async popupFormAction(): Promise<void> {
    const { code, name } = this.popupFieldForm.value;

    if (!name || !fieldsRegex.fieldName.exec(name)) {
      this.popupError = 'Invalid name';
      return;
    }

    if (!code || code.length != 3 || !parseInt(code)) {
      this.popupError = 'Code must be 3 digits';
      return;
    }

    const authCookie = this.cookieService.get(environment.authCookieName);

    try {
      switch (this.isPopupEdit) {
        case true:
          await this.fieldsService.updateOne(
            authCookie,
            { code, name },
            this.getFields()[this.popupIndex]._id
          );

          break;

        case false:
          await this.fieldsService.createOne(authCookie, {
            code,
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
