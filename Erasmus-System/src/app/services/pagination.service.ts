import { Injectable } from '@angular/core';
import { environment } from '../shared/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { FieldsOfEducationService } from './admin-menu-services/fields-of-education.service';
import { Fields } from 'src/app/types/fields';
import { FormGroup } from '@angular/forms';
import { validationRegex } from '../shared/environments/validationEnvironment';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  private _fields: [Fields] = [] as unknown as [Fields]; //variable to hold the fields data
  //pagination values
  private _pageCountToIterate: number = 0;
  private _pageCount: number = 0;
  private _page: number = 1;
  //search values
  private _isSearchActive: boolean = false;
  private _searchParams: any = {};

  constructor(
    private cookieService: CookieService,
    private fieldsService: FieldsOfEducationService
  ) {}

  async changePage(
    pageNumber: number,
    searching: boolean,
    searchForm: FormGroup
  ): Promise<void> {
    // check if page is valid
    if (pageNumber < 1 || (pageNumber > this._pageCount && pageNumber != 1)) {
      return;
    }
    this._page = pageNumber;
    try {
      await this.getFields(searching, searchForm);
    } catch (err) {}
  }

  private async getFields(
    searching: boolean,
    searchForm: FormGroup
  ): Promise<void> {
    const authCookie = this.cookieService.get(environment.authCookieName);
    this._page = searching == this._isSearchActive ? this._page : 1;
    let data;
    let response;

    try {
      switch (searching) {
        case true:
          if (this._page == 1) {
            this._searchParams = searchForm.value;
          }
          const { select, search } = this._searchParams;

          //validate unput
          if (
            (select != 'code' && select != 'name') ||
            typeof search != 'string' ||
            !validationRegex.formFieldNameSearch.exec(search)
          ) {
            break;
          }

          response = await this.fieldsService.getPageByParam(
            authCookie,
            this._searchParams,
            this._page
          );

          data = await response.json();
          break;
        case false:
          response = await this.fieldsService.getPage(authCookie, this._page);

          data = await response.json();
          break;
      }

      const { fields, docCount } = data;

      this._fields = fields;

      const pages = Math.ceil(docCount / 10);
      this.calcPages(pages);
    } catch (err) {}

    this._isSearchActive = searching;
  }

  /* algorithm for the pagination numbers */
  private calcPages(pages: number): void {
    this._pageCount = pages;
    //x = the number of pages displayed below and including the page we are on
    const x = this._page < 6 ? this._page : 5;
    //y = the number of pages displayed above the current page
    const y = pages - x < 5 ? pages - x : 4;

    //the number of pages display with numbers for pagination
    this._pageCountToIterate = x + y;
  }

  get fields(): [Fields] {
    return JSON.parse(JSON.stringify(this._fields));
  }
  get pageCountToIterate(): number {
    return this._pageCountToIterate;
  }
  get pageCount(): number {
    return this._pageCount;
  }
  get page(): number {
    return this._page;
  }
  get isSearchActive(): boolean {
    return this._isSearchActive;
  }
}
