import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
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
  @Input() searchForm: FormGroup = {} as any;
  @Input() adminModule: string = '';
  constructor(private paginationService: PaginationService) {}

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
}
