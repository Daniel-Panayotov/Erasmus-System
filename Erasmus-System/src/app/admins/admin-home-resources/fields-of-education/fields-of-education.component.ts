import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { FieldsOfEducationService } from 'src/app/services/admin-menu-services/fields-of-education.service';
import { PaginationService } from 'src/app/services/pagination.service';
import { environment } from 'src/app/shared/environments/environment';
import { validationRegex } from 'src/app/shared/environments/validationEnvironment';
import { Fields } from 'src/app/types/fields';
import { searchValue } from 'src/app/types/searchFormValue';

@Component({
  selector: 'app-fields-of-education',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './fields-of-education.component.html',
  styleUrl: './fields-of-education.component.css',
})
export class FieldsOfEducationComponent implements OnInit {
  //popup form values
  popupError: string = '';
  isPopupVisible: boolean = false;
  isPopupEdit: boolean = false;
  popupIndex: number = 0;

  constructor(
    private fieldsService: FieldsOfEducationService,
    private cookieService: CookieService,
    private fb: FormBuilder,
    private paginationService: PaginationService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.changePage(1, false);
  }

  /* Setup getters */

  async changePage(pageNumber: number, searching: boolean): Promise<void> {
    await this.paginationService.changePage.bind(
      this.paginationService, // original context
      pageNumber,
      searching,
      this.searchFieldForm.value as searchValue,
      'fields'
    )();
  }

  getFields(): [Fields] {
    return this.paginationService.documents;
  }

  getPageCountToIterate(): number {
    return this.paginationService.pageCountToIterate;
  }

  getPageCount(): number {
    return this.paginationService.pageCount;
  }

  getPage(): number {
    return this.paginationService.page;
  }

  getIsSearchActive(): boolean {
    return this.paginationService.isSearchActive;
  }

  /* search form */

  searchFieldForm = this.fb.group({
    search: [''],
    select: ['name', Validators.required],
  });

  /* DELETE */

  async onDelete(id: string): Promise<void> {
    const isSure = window.confirm('Would you like to delete this field?');

    if (!isSure || !validationRegex.docId.exec(id)) {
      return;
    }

    const authCookie = this.cookieService.get(environment.authCookieName);

    try {
      await this.fieldsService.deleteOne(authCookie, id);

      await this.changePage(1, this.getIsSearchActive());
    } catch (err) {}
  }

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

    if (!name || !validationRegex.fieldName.exec(name)) {
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
