import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { FacultiesService } from 'src/app/services/admin-menu-services/faculties.service';
import { PaginationService } from 'src/app/services/pagination.service';
import { environment } from 'src/app/shared/environments/environment';
import { globalRegex } from 'src/app/shared/environments/validationEnvironment';
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
export class FacultiesComponent implements OnInit {
  adminModule: string = 'faculties';
  constructor(
    private facultiesService: FacultiesService,
    private cookieService: CookieService,
    private paginationService: PaginationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.changePage(1, false);
  }

  /* Setup getters */

  async changePage(pageNumber: number, searching: boolean): Promise<void> {
    await this.paginationService.changePage.bind(
      this.paginationService, // original context
      pageNumber,
      searching,
      this.searchFieldForm.value as searchValue,
      this.adminModule
    )();
  }

  getFields(): [Faculty] {
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

  /* DELETE */

  async onDelete(id: string): Promise<void> {
    const isSure = window.confirm('Would you like to delete this field?');

    if (!isSure || !globalRegex.docId.exec(id)) {
      return;
    }

    const authCookie = this.cookieService.get(environment.authCookieName);

    try {
      await this.facultiesService.deleteOne(authCookie, id);

      await this.changePage(1, this.getIsSearchActive());
    } catch (err) {}
  }
}
