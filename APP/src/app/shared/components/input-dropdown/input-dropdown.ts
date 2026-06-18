import { Component, input, signal } from '@angular/core';
import { DropDownItem } from '../../models/input-dropdown.models';

@Component({
  selector: 'app-input-dropdown',
  imports: [],
  templateUrl: './input-dropdown.html',
  styleUrl: './input-dropdown.css',
})
export class InputDropdown {
  label = input.required<string>();
  getItemName = input.required<() => string>();

  staticItemList = input.required<[]>();

  private _showDropdown = signal(true);

  items = ['hi', 'bye'];

  get showDropdown() {
    return this._showDropdown.asReadonly();
  }
}
