import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PaginationService } from 'src/app/services/pagination.service';
import { searchValue } from 'src/app/types/searchFormValue';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent implements OnInit {
  private paginationService = inject(PaginationService);

  @Input({ required: true }) searchForm = {} as FormGroup;
  @Input({ required: true }) adminModule: string = '';

  ngOnInit(): void {
    this.changePage(1, false);
  }

  async changePage(pageNumber: number, searching: boolean): Promise<void> {
    await this.paginationService.changePage.bind(
      this.paginationService, // original context
      pageNumber,
      searching,
      this.searchForm.value as searchValue,
      this.adminModule
    )();
  }

  get pageCountToIterate(): number {
    return this.paginationService.pageCountToIterate;
  }

  get pageCount(): number {
    return this.paginationService.pageCount;
  }

  get page(): number {
    return this.paginationService.page;
  }

  get isSearchActive(): boolean {
    return this.paginationService.isSearchActive;
  }
}
