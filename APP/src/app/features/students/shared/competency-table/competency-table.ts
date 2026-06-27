import { Component, input } from '@angular/core';
import { Column, DataTable } from '../../../../shared/components/data-table/data-table';
import { LanguageCompetencyData } from '../../models/language-competency.model';
import { Button } from '../../../../shared/models/data-table.model';

@Component({
  selector: 'app-competency-table',
  imports: [DataTable],
  templateUrl: './competency-table.html',
})
export class CompetencyTable {
  competencies = input.required<LanguageCompetencyData[]>();
  buttons = input.required<Button<any>[]>();

  columns: Column[] = [
    { label: 'ID', field: 'languageCompetencyID' },
    { label: 'Language', field: 'language' },
    { label: 'Can Follow Lectures', field: 'canFollowLectures' },
    { label: 'Can Follow Lectures With Lessons', field: 'canFollowLecturesWithLessons' },
  ];
}
