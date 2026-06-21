import { Component, effect, inject, input, signal, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LanguageCompetencyBase } from '../../../features/students/models/language-competency.form.model';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LanguageCompetencyAPI } from '../../../features/students/services/language-competency.api.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, EMPTY, map } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { studentsPaths } from '../../../features/students/students.paths';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-related-table-view',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './related-table-view.html',
  styleUrl: './related-table-view.css',
})
export class RelatedTableView {
  private competenciesAPI = inject(LanguageCompetencyAPI);

  studentID = input.required<string>();
  competenciesResource = rxResource({
    params: () => ({ studentID: this.studentID() }),
    stream: ({ params }) =>
      this.competenciesAPI
        .GetAll(parseInt(params.studentID))
        .pipe(map((v) => v.body as LanguageCompetencyBase[])),
  });

  columnsToDisplay = [
    'languageCompetencyID',
    'language',
    'canFollowLectures',
    'canFollowLecturesWithLessons',
  ];
  dataSource = new MatTableDataSource<LanguageCompetencyBase>([]);

  clickedRow = signal<LanguageCompetencyBase | null>(null);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    effect(() => {
      if (this.competenciesResource.hasValue()) {
        this.dataSource.data = this.competenciesResource.value();
      } else this.dataSource.data = [];
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

  selectRow(row: LanguageCompetencyBase) {
    if (this.clickedRow() == row) this.clickedRow.set(null);
    else this.clickedRow.set(row);
  }

  deleteCompetency() {
    if (!this.clickedRow()) return;

    this.competenciesAPI
      .Delete(this.clickedRow()?.languageCompetencyID!)
      .pipe(catchError((err) => EMPTY))
      .subscribe((res) => {
        this.competenciesResource.reload();
        this.clickedRow.set(null);
      });
  }

  get studentsPaths() {
    return studentsPaths;
  }
}
