import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { FacultiesService } from 'src/app/services/admin-menu-services/faculties.service';
import { PaginationService } from 'src/app/services/pagination.service';
import { Faculty } from 'src/app/types/faculty';
import { searchValue } from 'src/app/types/searchFormValue';

@Component({
  selector: 'app-faculties',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './faculties.component.html',
  styleUrl: './faculties.component.css',
})
export class FacultiesComponent implements OnInit {
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
      'faculties'
    )();
  }

  getFields(): [Faculty] {
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
}
