import { Component, computed, inject, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InstitutionsStore } from './institutions.store';
import { CanDeactivateFormInterface } from '../../../core/guards/form.guard';

@Component({
  selector: 'app-institutions-create-shell',
  imports: [RouterOutlet],
  template: '<router-outlet/>',
})
export class InstitutionsCreateShell implements OnDestroy, CanDeactivateFormInterface {
  private institutionsStore = inject(InstitutionsStore);

  canDeactivate = computed(() => {
    return (
      !this.institutionsStore.drafts.institutionModel() &&
      this.institutionsStore.drafts.contacts().length == 0
    );
  });

  ngOnDestroy(): void {
    this.institutionsStore.resetDrafts();
  }
}
