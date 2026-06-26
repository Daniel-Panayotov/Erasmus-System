import { Component, input } from '@angular/core';
import { Tab, TabGroup } from '../tab-group/tab-group';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-page-shell',
  imports: [TabGroup, RouterOutlet],
  templateUrl: './page-shell.html',
})
export class PageShell {
  tabs = input.required<Tab[]>();
}
