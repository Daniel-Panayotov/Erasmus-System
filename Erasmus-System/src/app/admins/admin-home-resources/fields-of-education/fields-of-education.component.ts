import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FieldsOfEducationService } from 'src/app/services/fields-of-education.service';
import { environment } from 'src/app/shared/environments/environment';
import { Fields } from 'src/app/types/fields';

@Component({
  selector: 'app-fields-of-education',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './fields-of-education.component.html',
  styleUrl: './fields-of-education.component.css',
})
export class FieldsOfEducationComponent implements OnInit {
  fields: [Fields] = [] as unknown as [Fields]; //variable to hold the fields data
  //popup form values
  errorAddingField: boolean = false;
  isPopupVisible: boolean = false;
  isPopupEdit: boolean = false;
  popupIndex: number = 0; // -1 for "add" | index > 0 for edit
  //pagination values
  pageCountToIterate: number = 0;
  pageCount: number = 0;
  page: number = 1;
  //search values
  isSearchActive: boolean = false;
  searchParams: any = {};

  constructor(
    private fieldsService: FieldsOfEducationService,
    private cookieService: CookieService,
    private fb: FormBuilder
  ) {}

  async ngOnInit(): Promise<void> {
    this.changePage(1, false);
  }

  async changePage(pageNumber: number, searching: boolean): Promise<void> {
    // check if page is valid
    if (pageNumber < 1 || (pageNumber > this.pageCount && pageNumber != 1)) {
      return;
    }
    this.page = pageNumber;
    try {
      await this.getFields(searching);
    } catch (err) {}
  }

  async getFields(searching: boolean): Promise<void> {
    const authCookie = this.cookieService.get(environment.authCookieName);
    this.page = searching == this.isSearchActive ? this.page : 1;
    let data;
    let response;

    try {
      switch (searching) {
        case true:
          if (this.page == 1) {
            this.searchParams = this.searchFieldForm.value;
          }
          const { select, search } = this.searchParams;

          //validate unput
          if (
            (select != 'code' && select != 'name') ||
            typeof search != 'string' ||
            search == ''
          ) {
            break;
          }

          response = await this.fieldsService.getPageByParam(
            authCookie,
            this.searchParams,
            this.page
          );

          data = await response.json();
          break;
        case false:
          response = await this.fieldsService.getPage(authCookie, this.page);

          data = await response.json();
          break;
      }

      const { fields, docCount } = data;

      this.fields = fields;

      const pages = Math.ceil(docCount / 10);
      this.calcPages(pages);
    } catch (err) {}

    this.isSearchActive = searching;
  }

  /* algorithm for the pagination numbers */
  calcPages(pages: number): void {
    this.pageCount = pages;
    //x = the number of pages displayed below and including the page we are on
    const x = this.page < 6 ? this.page : 5;
    //y = the number of pages displayed above the current page
    const y = pages - x < 5 ? pages - x : 4;

    //the number of pages display with numbers for pagination
    this.pageCountToIterate = x + y;
  }

  /* search form */

  searchFieldForm = this.fb.group({
    search: [''],
    select: ['name', Validators.required],
  });

  /* DELETE */

  async onDelete(id: string, index: number): Promise<void> {
    const isSure = window.confirm('Would you like to delete this field?');

    if (!isSure) {
      return;
    }

    const authCookie = this.cookieService.get(environment.authCookieName);

    try {
      await this.fieldsService.deleteOne(authCookie, id);

      await this.changePage(this.page, this.isSearchActive);
    } catch (err) {}
  }

  //popup form section

  popupFieldForm = this.fb.group({
    code: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(3)],
    ],
    name: ['', [Validators.required, Validators.minLength(5)]],
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
        code: this.fields[i].code,
        name: this.fields[i].name,
      };

      this.popupFieldForm.setValue(values);
    }

    this.errorAddingField = false;
    this.isPopupEdit = isEdit;
    this.isPopupVisible = !this.isPopupVisible;
  }

  async popupFormAction(): Promise<void> {
    const { code, name } = this.popupFieldForm.value;

    if (!code || !name) {
      return;
    }
    if (code.length != 3 || name.length < 5) {
      return;
    }

    const authCookie = this.cookieService.get(environment.authCookieName);

    try {
      switch (this.isPopupEdit) {
        case true:
          await this.fieldsService.updateOne(
            authCookie,
            { code, name },
            this.fields[this.popupIndex]._id
          );

          break;

        case false:
          await this.fieldsService.createOne(authCookie, {
            code,
            name,
          });

          break;
      }

      await this.changePage(this.page, this.isSearchActive);

      this.togglePopup(this.isPopupEdit, this.popupIndex);
    } catch (err) {
      this.errorAddingField = true;
    }
  }
}
