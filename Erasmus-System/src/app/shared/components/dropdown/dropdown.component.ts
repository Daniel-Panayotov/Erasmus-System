import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  HostListener,
  AfterViewInit,
} from '@angular/core';
import { adminRecordUnion } from 'src/app/types/adminDocs';
import { docProperty, refProps } from 'src/app/types/docProperties';
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
export class DropdownComponent implements AfterViewInit {
  @Input({ required: true }) property = [] as unknown as [string, docProperty];
  @Input({ required: true }) form = {} as FormGroup;
  @Input({ required: true }) refDocs: refDocs = {};
  @Input({ required: false }) isInEditPopupForm: boolean = false;
  filteredRefDocs: refDocs = {};

  @ViewChild('fakeInputContainer') fakeFormInputContainer = {} as ElementRef;
  @ViewChild('fakeInput') fakeFormInput = {} as ElementRef;
  @ViewChild('formControl') formInput = {} as ElementRef;
  isSearchUlVisible: boolean = false;

  ngAfterViewInit(): void {
    if (this.refDocs[this.property[0]])
      this.filterControlValues(this.fakeFormInput, this.property);

    if (this.isInEditPopupForm) {
      this.fakeFormInput.nativeElement.value = this.generateStartingEditValue(
        this.formInput.nativeElement.value
      );
    }
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    try {
      //could throw
      if (
        !this.fakeFormInputContainer.nativeElement.contains(event.target) &&
        this.isSearchUlVisible
      ) {
        this.toggleSelectLi();
      }
    } catch (err) {}
  }

  toggleSelectLi(): void {
    this.isSearchUlVisible = !this.isSearchUlVisible;
  }

  generateStartingEditValue(fakeInputValue: string) {
    const docs = this.refDocs[this.property[1].isRef!.apiSection];
    let inputValue = '';

    for (let i = 0; i < docs.length; i++) {
      if (
        docs[i][this.property[1].isRef!.properties.mainProp] == fakeInputValue
      ) {
        this.property[1].isRef?.properties.propsList.map((v) => {
          inputValue += docs[i][v] + ' ';
        });
      }
    }
    inputValue = inputValue.trim();

    return inputValue;
  }

  /* When value of input that contains list of referenced values changes
   * Filter the values based on the input
   * and display them as suggestions
   */
  filterControlValues(
    formFakeInput: ElementRef,
    property: [string, docProperty]
  ): void {
    const value: string = formFakeInput.nativeElement.value;
    const docs = this.refDocs[property[1].isRef!.apiSection];

    const filteredDocs: adminRecordUnion[] = [];

    for (let doc of docs) {
      //check each property if 1+
      for (let i = 0; i < property[1].isRef!.properties.propsList.length; i++) {
        if (
          (doc[property[1].isRef!.properties.propsList[i]] as string)
            .toLowerCase()
            .includes(value.toLocaleLowerCase())
        ) {
          filteredDocs.push(doc);
          break;
        }
      }
    }

    this.filteredRefDocs[property[1].isRef!.apiSection] = filteredDocs;
  }

  /* When li is clicked update formControl value
   * and update button name to reflect value
   */
  changeSelectValue(record: adminRecordUnion, refProps: refProps): void {
    //get form values
    const values = this.form.value;
    const intendedValue = record[refProps.properties.mainProp];

    //set form values
    values[refProps.assignPropTo] = intendedValue;
    this.form.setValue(values);

    //create string user views
    let selectValue = '';

    //concatanate desired values to string
    for (let i = 0; i < refProps.properties.propsList.length; i++) {
      selectValue += record[refProps.properties.propsList[i]] + ' ';
    }
    this.fakeFormInput.nativeElement.value = selectValue;

    this.toggleSelectLi();
  }
}
