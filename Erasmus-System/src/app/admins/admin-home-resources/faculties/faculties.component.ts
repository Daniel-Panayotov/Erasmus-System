import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { FacultiesService } from 'src/app/services/admin-menu-services/faculties.service';
import { DeletionService } from 'src/app/services/deletion.service';
import { PaginationService } from 'src/app/services/pagination.service';
import { environment } from 'src/app/shared/environments/environment';
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
}
