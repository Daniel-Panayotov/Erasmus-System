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
  errorAddingField: boolean = false;
  isPopupVisible: boolean = false;
  isPopupEdit: boolean = false;
  popupEditIndex: number = 0;
  page: number = 1;
  pageCount: number = 0;

  constructor(
    private fieldsService: FieldsOfEducationService,
    private cookieService: CookieService,
    private fb: FormBuilder
  ) {}

  async ngOnInit(): Promise<void> {
    this.getFieldsForPage();
  }

  //get all fields and add them to the global variable
  async getFieldsForPage(): Promise<void> {
    const authCookie = this.cookieService.get(environment.authCookieName);
    try {
      const response = await this.fieldsService.getAllForPage(
        authCookie,
        this.page
      );
      const { fields, count } = await response.json();
      this.fields = fields;

      /* algorithm for the pagination numbers */
      //the number of all pages
      const pages = Math.ceil(count / 10);
      //x = the number of pages displayed below and including the page we are on
      const x = this.page < 6 ? this.page : 5;
      //y = the number of pages displayed above the current page
      const y = pages - x < 5 ? pages - x : 4;

      //the number of pages display with numbers for pagination
      this.pageCount = x + y;
    } catch (err) {}
  }

  async onDelete(id: string, index: number): Promise<void> {
    const isSure = window.confirm('Would you like to delete this field?');

    if (!isSure) {
      return;
    }

    const authCookie = this.cookieService.get(environment.authCookieName);

    try {
      await this.fieldsService.deleteOneField(authCookie, id);
      //ensure field is deleted from the array
      this.fields.splice(index, 1);
    } catch (err) {}
  }

  //search form

  searchFieldForm = this.fb.group({
    search: [''],
    select: ['name', Validators.required],
  });

  async searchField(): Promise<void> {
    const { search, select } = this.searchFieldForm.value;

    if ((select != 'code' && select != 'name') || typeof search != 'string') {
      return;
    }

    const authCookie = this.cookieService.get(environment.authCookieName);

    try {
      const response = await this.fieldsService.getOneByParam(authCookie, {
        search,
        select,
      });
      const data = await response.json();
      this.fields = data;
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

  //reset state when toggling
  toggleAddPopup(): void {
    //check if its in edit mode
    if (this.isPopupVisible && this.isPopupEdit) {
      return;
    }
    this.popupFieldForm.reset();
    //reset state to be add popup
    this.errorAddingField = false;
    this.isPopupEdit = false;
    this.isPopupVisible = !this.isPopupVisible;
  }

  toggleEditPopup(i: number): void {
    //check if the action was triggered by correct edit button
    if (
      (this.isPopupVisible && this.popupEditIndex != i) ||
      //popup is add
      (!this.isPopupEdit && this.isPopupVisible)
    ) {
      return;
    }
    this.popupFieldForm.reset();

    // set the initial value
    const values = {
      code: this.fields[i].code,
      name: this.fields[i].name,
    };

    this.popupFieldForm.setValue(values);

    //reset state to be edit popup
    this.popupEditIndex = i;
    this.errorAddingField = false;
    this.isPopupEdit = true;
    this.isPopupVisible = !this.isPopupVisible;
  }

  async editField(): Promise<void> {
    const { code, name } = this.popupFieldForm.value;

    if (!code || !name) {
      return;
    }

    if (code.length != 3 || name.length < 5) {
      return;
    }

    const authCookie = this.cookieService.get(environment.authCookieName);

    try {
      const response = await this.fieldsService.updateOne(
        authCookie,
        {
          code,
          name,
        },
        this.fields[this.popupEditIndex]._id
      );
      const data = await response.json();

      //fix values of field
      this.fields[this.popupEditIndex].name = name;
      this.fields[this.popupEditIndex].code = code;

      //reset form
      this.isPopupVisible = !this.isPopupVisible;
      this.errorAddingField = false;
      this.popupFieldForm.reset();
    } catch (err) {
      this.errorAddingField = true;
    }
  }

  async addField(): Promise<void> {
    const { code, name } = this.popupFieldForm.value;

    if (!code || !name) {
      return;
    }

    if (code.length != 3 || name.length < 5) {
      return;
    }

    const authCookie = this.cookieService.get(environment.authCookieName);

    try {
      const response = await this.fieldsService.addOneField(authCookie, {
        code,
        name,
      });
      const data = await response.json();
      //display add data and sort by code - ascending
      this.fields.push(data);
      this.fields.sort((a, b) => {
        return a.code.localeCompare(b.code);
      });
      this.toggleAddPopup();
    } catch (err) {
      this.errorAddingField = true;
    }
  }
}
