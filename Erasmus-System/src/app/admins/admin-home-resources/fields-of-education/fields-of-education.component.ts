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

@Component({
  selector: 'app-fields-of-education',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './fields-of-education.component.html',
  styleUrl: './fields-of-education.component.css',
})
export class FieldsOfEducationComponent implements OnInit {
  //popup form values
  errorAddingField: boolean = false;
  isPopupVisible: boolean = false;
  isPopupEdit: boolean = false;
  popupIndex: number = 0; // -1 for "add" | index > 0 for edit

  constructor(
    private fieldsService: FieldsOfEducationService,
    private cookieService: CookieService,
    private fb: FormBuilder,
    private paginationService: PaginationService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.changePage(1, false, this.searchFieldForm);
  }

  async changePage(
    pageNumber: number,
    searching: boolean,
    searchForm: FormGroup
  ): Promise<void> {
    await this.paginationService.changePage(pageNumber, searching, searchForm);
  }

  getFields(): [Fields] {
    return this.paginationService.fields;
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

      await this.changePage(1, this.getIsSearchActive(), this.searchFieldForm);
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

    this.errorAddingField = false;
    this.isPopupEdit = isEdit;
    this.isPopupVisible = !this.isPopupVisible;
  }

  async popupFormAction(): Promise<void> {
    const { code, name } = this.popupFieldForm.value;

    if (!code || !name || !parseInt(code)) {
      this.errorAddingField = true;
      return;
    }
    if (code.length != 3 || !validationRegex.fieldName.exec(name)) {
      this.errorAddingField = true;
      return;
    }

    const authCookie = this.cookieService.get(environment.authCookieName);

    try {
      switch (this.isPopupEdit) {
        case true:
          await this.fieldsService.updateOne(
            authCookie,
            { code, name },
            this.paginationService.fields[this.popupIndex]._id
          );

          break;

        case false:
          await this.fieldsService.createOne(authCookie, {
            code,
            name,
          });

          break;
      }

      await this.changePage(1, this.getIsSearchActive(), this.searchFieldForm);

      this.togglePopup(this.isPopupEdit, this.popupIndex);
    } catch (err) {
      this.errorAddingField = true;
    }
  }
}
