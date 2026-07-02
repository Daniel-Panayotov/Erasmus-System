import { inject, Signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanDeactivateFn } from '@angular/router';
import { FormDialog } from '../../shared/components/form-dialog/form-dialog';
import { map } from 'rxjs';

export interface CanDeactivateFormInterface {
  canDeactivate: Signal<boolean>;
}

export const formGuard: CanDeactivateFn<CanDeactivateFormInterface> = (
  component,
  route,
  state,
  nextState,
) => {
  const dialog = inject(MatDialog);
  if (component.canDeactivate()) return true;

  const ref = dialog.open(FormDialog);
  return ref.afterClosed().pipe(map((res) => !!res));
};
