import {
  AfterViewInit,
  Component,
  computed,
  effect,
  input,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LanguageCompetencyBase } from '../../../../features/students/models/language-competency.model';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

export interface Column {
  label: string;
  field: string;
}

export interface Button {
  label: string;
  url?: (row?: any | null) => string[];
  handler?: (row: WritableSignal<any | null>) => void;
  disable: boolean;
}

@Component({
  selector: 'app-data-table',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './data-table.html',
  styleUrl: './data-table.css',
})
export class DataTable implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSignal = input.required<any[]>();
  columns = input.required<Column[]>();

  buttons = input.required<Button[]>();

  headerDefs = computed(() => this.columns().map((col) => col.field));
  dataSource = new MatTableDataSource<LanguageCompetencyBase>([]);
  clickedRow = signal<LanguageCompetencyBase | null>(null);

  constructor() {
    effect(() => {
      this.dataSource.data = this.dataSignal();
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }

  selectRow(row: any) {
    if (this.clickedRow() == row) this.clickedRow.set(null);
    else this.clickedRow.set(row);
  }
}
