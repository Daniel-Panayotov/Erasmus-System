import { WritableSignal } from '@angular/core';
import { Button } from '../models/data-table.model';

export const createButton = <T>(url: () => string[]): Button<T> => ({
  label: 'Create',
  url,
});

export const updateButton = <T>(url: (row: T | null) => string[]): Button<T> => ({
  label: 'Update',
  url,
  disabled: (row) => !row(),
});

export const deleteButton = <T>(handler: (row: WritableSignal<T | null>) => void): Button<T> => ({
  label: 'Delete',
  handler,
  disabled: (row) => !row(),
});
