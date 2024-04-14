import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { PaginationService } from 'src/app/services/pagination.service';
import { generalAdminComponentInputs } from 'src/app/types/adminDocs';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent implements OnInit {
  private paginationService = inject(PaginationService);

  @Input({ required: true }) componentInputs =
    {} as generalAdminComponentInputs;

  ngOnInit(): void {}

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
