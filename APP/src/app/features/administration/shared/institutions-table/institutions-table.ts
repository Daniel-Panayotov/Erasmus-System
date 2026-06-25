import { Component, input } from '@angular/core';
import { Column, DataTable } from '../../../../shared/components/data-tables/data-table/data-table';
import { Button } from '../../../../shared/models/data-table.model';
import { InstitutionData } from '../../models/institution.model';

@Component({
  selector: 'app-institutions-table',
  imports: [DataTable],
  templateUrl: './institutions-table.html',
})
export class InstitutionsTable {
  institutions = input.required<InstitutionData[]>();
  buttons = input.required<Button<any>[]>();

  columns: Column[] = [
    { label: 'ID', field: 'institutionID' },
    { label: 'Code', field: 'code' },
    { label: 'Name', field: 'name' },
    { label: 'Address', field: 'address' },
  ];
}
