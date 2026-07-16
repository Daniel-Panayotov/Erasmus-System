import { Component, computed, inject, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CanDeactivateFormInterface } from '../../../core/guards/form.guard';
import { UniversityStore } from './university.store';

@Component({
  selector: 'app-university-create-shell',
  imports: [RouterOutlet],
  template: '<router-outlet/>',
})
export class UniversityCreateShell implements OnDestroy, CanDeactivateFormInterface {
  private universityStore = inject(UniversityStore);

  canDeactivate = computed(() => {
    return !this.universityStore.drafts.universityModel();
  });

  ngOnDestroy(): void {
    this.universityStore.resetDrafts();
  }
}
