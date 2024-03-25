import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';
import { adminRecordUnion } from 'src/app/types/adminDocs';
import { docProperty } from 'src/app/types/docProperties';
import { refDocs } from '../popup-admin-form/popup-admin-form.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
})
export class DropdownComponent {
  @Input({ required: true }) property = [] as unknown as [string, docProperty];
  @Input({ required: true }) form = {} as FormGroup;
  @Input({ required: true }) refDocs: refDocs = {};
  filteredRefDocs: refDocs = {};

  @ViewChild('formControl') formRefControl = {} as ElementRef;
  isSearchUlVisible: boolean = false;

  /*
   */
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    try {
      if (
        this.formRefControl.nativeElement != event.target &&
        this.isSearchUlVisible
      ) {
        this.toggleSelectLi();
      }
    } catch (err) {}
  }

  toggleSelectLi(): void {
    this.isSearchUlVisible = !this.isSearchUlVisible;
  }

  /* When value of input that contains list of referenced values changes
   * Filter the values based on the input
   * and display them as suggestions
   */
  filterControlValues(
    formInput: ElementRef,
    property: [string, docProperty]
  ): void {
    const value: string = formInput.nativeElement.value;
    const docs = this.refDocs[property[1].isRef![1]];

    const filteredDocs: adminRecordUnion[] = [];

    for (let doc of docs) {
      if (
        doc[property[1].isRef![0]]
          .toLowerCase()
          .includes(value.toLocaleLowerCase())
      ) {
        filteredDocs.push(doc);
      }
    }

    this.filteredRefDocs[property[1].isRef![1]] = filteredDocs;
  }

  /* When li is clicked update formControl value
   * and update button name to reflect value
   */
  changeSelectValue(value: string, control: string): void {
    const values = this.form.value;
    values[control] = value;

    this.form.setValue(values);

    this.toggleSelectLi();
  }
}
