import {
  AfterViewInit,
  Component,
  computed,
  effect,
  input,
  output,
  signal,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { RouterLink } from '@angular/router';
import { Button } from '../../../models/data-table.model';

export interface Column {
  label: string;
  field: string;
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
    CdkDropList,
    CdkDrag,
  ],
  templateUrl: './data-table.html',
  styleUrl: './data-table.css',
})
export class DataTable implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSignal = input.required<any[]>();
  columns = input.required<Column[]>();
  buttons = input<Button<any>[]>();
  onDrop = output<CdkDragDrop<string[]>>();
  clickedOut = output<any | null>();

  tableSource = new MatTableDataSource<any>([]);
  dropListSource: any[] = [];

  headerDefs = computed(() => this.columns().map((col) => col.field));
  clickedRow = signal<any | null>(null);

  constructor() {
    effect(() => {
      this.tableSource.data = this.dataSignal();
      this.dropListSource = this.dataSignal();
    });
  }

  ngAfterViewInit() {
    this.tableSource.paginator = this.paginator;
    this.tableSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableSource.filter = filterValue.trim().toLowerCase();

    if (this.tableSource.paginator) this.tableSource.paginator.firstPage();
  }

  drop(event: CdkDragDrop<string[]>) {
    this.onDrop.emit(event);
  }

  selectRow(row: any) {
    if (this.clickedRow() == row) this.clickedRow.set(null);
    else this.clickedRow.set(row);

    this.clickedOut.emit(this.clickedRow());
  }
}
